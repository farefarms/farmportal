import type { CollectionConfig } from 'payload'

import { isEditor, isStaff, staffOrPublished } from '@/access/roles'
import { reviewGroup } from '@/fields/review'
import { publishGuard } from '@/hooks/publishGuards'
import { revalidateCollection } from '@/hooks/revalidate'

/** Black farming histories on Our Roots — each profile needs sources and a credited image. */
export const People: CollectionConfig = {
  slug: 'people',
  labels: { singular: 'Historical profile', plural: 'Black farming histories' },
  admin: { useAsTitle: 'name', group: 'Knowledge', defaultColumns: ['name', 'years', 'review.status', '_status'] },
  access: { read: staffOrPublished, create: isStaff, update: isStaff, delete: isEditor },
  defaultSort: 'order',
  versions: { drafts: true, maxPerDoc: 25 },
  hooks: {
    beforeChange: [publishGuard({ requireReview: true, requireSources: true })],
    ...revalidateCollection(() => ['/our-roots']),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'years', type: 'text', admin: { description: 'e.g. 1839 – 1944' } },
        { name: 'role', type: 'text' },
      ],
    },
    { name: 'bio', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Use only images with a credit and permission.' } },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    reviewGroup(),
  ],
}
