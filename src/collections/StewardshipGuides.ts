import type { CollectionConfig } from 'payload'

import { isEditor, isStaff, staffOrPublished } from '@/access/roles'
import { reviewGroup } from '@/fields/review'
import { slugField } from '@/fields/slug'
import { publishGuard } from '@/hooks/publishGuards'
import { revalidateCollection } from '@/hooks/revalidate'

/**
 * Afro-Indigenous land stewardship guides. Developed with community consultation,
 * attribution and cultural protocols — the review gate applies before anything is published.
 */
export const StewardshipGuides: CollectionConfig = {
  slug: 'stewardship-guides',
  labels: { singular: 'Stewardship guide', plural: 'Stewardship guides' },
  admin: { useAsTitle: 'title', group: 'Land & gardens', defaultColumns: ['title', 'practice', 'review.status', '_status'] },
  access: { read: staffOrPublished, create: isStaff, update: isStaff, delete: isEditor },
  versions: { drafts: true, maxPerDoc: 50 },
  hooks: {
    beforeChange: [publishGuard({ requireReview: true, requireSources: true })],
    ...revalidateCollection((doc) => ['/land-and-gardens', `/land-and-gardens/stewardship/${doc.slug}`]),
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    {
      name: 'practice',
      type: 'select',
      required: true,
      options: [
        { label: 'Soil', value: 'soil' },
        { label: 'Water', value: 'water' },
        { label: 'Biodiversity', value: 'biodiversity' },
        { label: 'Reciprocal practice', value: 'reciprocal_practice' },
        { label: 'Other', value: 'other' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'materials', type: 'array', fields: [{ name: 'item', type: 'text', required: true }] },
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    { name: 'safety', type: 'textarea' },
    { name: 'ecologicalImpact', type: 'textarea' },
    { name: 'siteExample', type: 'relationship', relationTo: 'projects' },
    {
      name: 'protocolNote',
      type: 'textarea',
      admin: { description: 'Which Nations, knowledge keepers or partners were consulted, and any protocols for sharing this guide.' },
    },
    reviewGroup(),
  ],
}
