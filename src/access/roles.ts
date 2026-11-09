import type { Access, FieldAccess, PayloadRequest, Where } from 'payload'

/**
 * Editorial roles, from most to least trusted:
 * - admin:       everything, including users, submissions and the future marketplace
 * - editor:      create, edit and publish public content
 * - reviewer:    cultural / source review — the only role (besides admin) that can approve content
 * - contributor: create and edit drafts; cannot publish or approve
 */
export const ROLES = ['admin', 'editor', 'reviewer', 'contributor'] as const
export type Role = (typeof ROLES)[number]

type MaybeUser = { roles?: Role[] | null } | null | undefined

export const hasRole = (user: MaybeUser, ...roles: Role[]): boolean =>
  Boolean(user?.roles?.some((r) => roles.includes(r)))

export const userFromReq = (req: PayloadRequest): MaybeUser => req.user as MaybeUser

export const anyone: Access = () => true
export const nobody: Access = () => false
export const loggedIn: Access = ({ req }) => Boolean(req.user)

export const isAdmin: Access = ({ req }) => hasRole(userFromReq(req), 'admin')
export const isEditor: Access = ({ req }) => hasRole(userFromReq(req), 'admin', 'editor')
export const isStaff: Access = ({ req }) =>
  hasRole(userFromReq(req), 'admin', 'editor', 'reviewer', 'contributor')

export const isAdminField: FieldAccess = ({ req }) => hasRole(userFromReq(req), 'admin')
/** Private fields (contact details, internal notes) are never exposed through the public API. */
export const staffOnlyField: FieldAccess = ({ req }) =>
  hasRole(userFromReq(req), 'admin', 'editor', 'reviewer', 'contributor')
export const canApproveField: FieldAccess = ({ req }) =>
  hasRole(userFromReq(req), 'admin', 'reviewer')

/** Staff see drafts; the public only sees published documents. */
export const staffOrPublished: Access = ({ req }) => {
  if (hasRole(userFromReq(req), 'admin', 'editor', 'reviewer', 'contributor')) return true
  return { _status: { equals: 'published' } } as Where
}

/** Staff see everything; the public only sees published documents that have been confirmed. */
export const staffOrPublishedAndConfirmed: Access = ({ req }) => {
  if (hasRole(userFromReq(req), 'admin', 'editor', 'reviewer', 'contributor')) return true
  return {
    and: [{ _status: { equals: 'published' } }, { confirmed: { equals: true } }],
  } as Where
}
