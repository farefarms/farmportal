import type { CollectionConfig } from 'payload'

import { isEditor, isStaff } from '@/access/roles'
import { consentGroup, consentProblems } from '@/fields/consent'
import { reviewGroup } from '@/fields/review'
import { slugField } from '@/fields/slug'
import { publishGuard } from '@/hooks/publishGuards'
import { revalidateCollection } from '@/hooks/revalidate'
import { consentedPublicOnly } from './Stories'

/** Ancestral recipes, each credited to the cook who shared it and linked to its crops. */
export const Recipes: CollectionConfig = {
  slug: 'recipes',
  admin: { useAsTitle: 'title', group: 'Food & culture', defaultColumns: ['title', 'region', 'review.status', '_status'] },
  access: { read: consentedPublicOnly, create: isStaff, update: isStaff, delete: isEditor },
  versions: { drafts: true, maxPerDoc: 50 },
  hooks: {
    beforeChange: [publishGuard({ requireReview: true, extra: consentProblems })],
    ...revalidateCollection((doc) => ['/food-and-culture', `/food-and-culture/recipes/${doc.slug}`]),
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    {
      type: 'row',
      fields: [
        { name: 'region', type: 'text', admin: { description: 'e.g. Ghana, West Africa, the Caribbean' } },
        { name: 'serves', type: 'text' },
        { name: 'time', type: 'text' },
      ],
    },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'crops', type: 'relationship', relationTo: 'crops', hasMany: true },
    {
      name: 'ingredients',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'quantity', type: 'text' },
            { name: 'item', type: 'text', required: true },
          ],
        },
      ],
    },
    { name: 'steps', type: 'array', fields: [{ name: 'body', type: 'textarea', required: true }] },
    { name: 'storyBehind', label: 'The story behind it', type: 'richText' },
    consentGroup,
    reviewGroup({ sources: false }),
  ],
}
