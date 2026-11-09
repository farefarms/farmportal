import { APIError, type CollectionBeforeChangeHook } from 'payload'

import { hasRole, userFromReq } from '@/access/roles'

type Doc = Record<string, any>

type GuardOptions = {
  /** Contributor, reviewer and reviewer approval required to publish. */
  requireReview?: boolean
  /** At least one source required to publish. */
  requireSources?: boolean
  /** A `confirmed` checkbox must be ticked to publish (events, projects, partners). */
  requireConfirmed?: boolean
  /** Extra checks; return human-readable problems. */
  extra?: (data: Doc) => string[]
}

const joinList = (items: string[]) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`

/**
 * Enforces the brief's acceptance criteria at the CMS level:
 * - contributors can save drafts but never publish
 * - only reviewers and admins can approve
 * - educational content needs a contributor, a reviewer, approval and sources before publishing
 * - events, projects and partners must be marked as confirmed before they go live
 *
 * Seed scripts can bypass with `context: { skipPublishGuards: true }`.
 */
export const publishGuard =
  (opts: GuardOptions = {}): CollectionBeforeChangeHook =>
  ({ data, originalDoc, req, context }) => {
    if (context?.skipPublishGuards) return data

    const user = userFromReq(req)
    const review: Doc = data?.review ?? {}
    const previousStatus = (originalDoc as Doc | undefined)?.review?.status

    if (review.status === 'approved' && previousStatus !== 'approved' && !hasRole(user, 'admin', 'reviewer')) {
      throw new APIError('Only reviewers or admins can mark content as approved.', 403)
    }

    if (data?._status !== 'published') return data

    if (!hasRole(user, 'admin', 'editor', 'reviewer')) {
      throw new APIError('Contributors can save drafts but cannot publish. Ask an editor to publish this.', 403)
    }

    const problems: string[] = []
    if (opts.requireReview) {
      if (!review.contributor) problems.push('name a contributor')
      if (!review.reviewerName) problems.push('name a reviewer')
      if (review.status !== 'approved') problems.push('get reviewer approval')
    }
    if (opts.requireSources && !(Array.isArray(review.sources) && review.sources.length > 0)) {
      problems.push('add at least one verifiable source')
    }
    if (opts.requireConfirmed && !data?.confirmed) {
      problems.push('tick “Details confirmed” once the information has been verified')
    }
    if (opts.extra) problems.push(...opts.extra(data))

    if (problems.length > 0) {
      throw new APIError(`Before publishing, please ${joinList(problems)}.`, 400)
    }
    return data
  }
