import type { Field } from 'payload'

import { staffOnlyField } from '@/access/roles'

export const REVIEW_STATUSES = [
  { label: 'Draft', value: 'draft' },
  { label: 'In review', value: 'in_review' },
  { label: 'Changes requested', value: 'changes_requested' },
  { label: 'Approved', value: 'approved' },
]

/** A list of verifiable sources. Every educational page must cite at least one before publishing. */
export const sourcesField: Field = {
  name: 'sources',
  type: 'array',
  labels: { singular: 'Source', plural: 'Sources' },
  admin: {
    description:
      'Verifiable references (books, archives, peer-reviewed papers, recorded interviews with consent). Required before publishing.',
  },
  fields: [
    { name: 'citation', type: 'text', required: true },
    { name: 'url', type: 'text', admin: { description: 'Optional link to the source.' } },
  ],
}

/**
 * Authorship and review metadata, shared by every educational content type.
 * Publishing is blocked until a contributor and reviewer are named, sources are listed
 * and a reviewer has approved the content (see hooks/publishGuards.ts).
 */
export const reviewGroup = (opts: { sources?: boolean } = {}): Field => ({
  name: 'review',
  type: 'group',
  label: 'Authorship & review',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'contributor',
          type: 'text',
          admin: { description: 'Author, community grower, elder or practitioner credited for this content.' },
        },
        {
          name: 'reviewerName',
          label: 'Reviewer',
          type: 'text',
          admin: { description: 'Name and role of the cultural or subject reviewer.' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'status',
          type: 'select',
          defaultValue: 'draft',
          options: REVIEW_STATUSES,
          admin: { description: 'Only reviewers and admins can mark content as approved.' },
        },
        { name: 'lastReviewed', type: 'date', admin: { date: { pickerAppearance: 'dayOnly' } } },
      ],
    },
    {
      name: 'reviewNotes',
      type: 'textarea',
      access: { read: staffOnlyField },
      admin: { description: 'Internal notes. Never shown on the site.' },
    },
    ...(opts.sources === false ? [] : [sourcesField]),
  ],
})
