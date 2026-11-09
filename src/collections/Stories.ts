import type { Access, CollectionConfig, Where } from 'payload'

import { hasRole, isEditor, isStaff, ROLES, userFromReq } from '@/access/roles'
import { consentGroup, consentProblems } from '@/fields/consent'
import { reviewGroup } from '@/fields/review'
import { slugField } from '@/fields/slug'
import { publishGuard } from '@/hooks/publishGuards'
import { revalidateCollection } from '@/hooks/revalidate'

/** Public visitors only ever see published stories with documented, public, non-withdrawn consent. */
export const consentedPublicOnly: Access = ({ req }) => {
  if (hasRole(userFromReq(req), ...ROLES)) return true
  return {
    and: [
      { _status: { equals: 'published' } },
      { 'consent.scope': { equals: 'public' } },
      { 'consent.documented': { equals: true } },
      { 'consent.withdrawn': { not_equals: true } },
    ],
  } as Where
}

/** Oral histories and community stories — private until permission is documented and culturally reviewed. */
export const Stories: CollectionConfig = {
  slug: 'stories',
  labels: { singular: 'Story / oral history', plural: 'Stories & oral histories' },
  admin: {
    useAsTitle: 'title',
    group: 'Food & culture',
    defaultColumns: ['title', 'consent.scope', 'review.status', '_status'],
  },
  access: { read: consentedPublicOnly, create: isStaff, update: isStaff, delete: isEditor },
  versions: { drafts: true, maxPerDoc: 50 },
  hooks: {
    beforeChange: [publishGuard({ requireReview: true, extra: consentProblems })],
    ...revalidateCollection((doc) => ['/food-and-culture', `/food-and-culture/stories/${doc.slug}`]),
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    { name: 'summary', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'body', type: 'richText' },
    { name: 'audio', type: 'upload', relationTo: 'media', admin: { description: 'Audio recording (only with audio rights).' } },
    { name: 'transcript', type: 'richText', admin: { description: 'Required alongside audio for accessibility.' } },
    { name: 'relatedCrops', type: 'relationship', relationTo: 'crops', hasMany: true },
    consentGroup,
    reviewGroup({ sources: false }),
  ],
}
