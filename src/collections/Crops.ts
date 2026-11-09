import type { CollectionConfig } from 'payload'

import { isEditor, isStaff, staffOrPublished } from '@/access/roles'
import { reviewGroup } from '@/fields/review'
import { slugField } from '@/fields/slug'
import { publishGuard } from '@/hooks/publishGuards'
import { revalidateCollection } from '@/hooks/revalidate'

export const CARD_COLORS = [
  { label: 'Forest', value: 'forest' },
  { label: 'Clay', value: 'clay' },
  { label: 'Marigold', value: 'marigold' },
  { label: 'Soil', value: 'soil' },
  { label: 'Leaf', value: 'leaf' },
]

/** Heritage crop directory — one structured record per crop, editable without code changes. */
export const Crops: CollectionConfig = {
  slug: 'crops',
  labels: { singular: 'Crop profile', plural: 'Crop profiles' },
  admin: {
    useAsTitle: 'name',
    group: 'Knowledge',
    defaultColumns: ['name', 'scientificName', 'review.status', '_status'],
  },
  access: { read: staffOrPublished, create: isStaff, update: isStaff, delete: isEditor },
  defaultSort: 'order',
  versions: { drafts: true, maxPerDoc: 50 },
  hooks: {
    beforeChange: [publishGuard({ requireReview: true, requireSources: true })],
    ...revalidateCollection((doc) => ['/', '/learn', '/learn/crops', `/learn/crops/${doc.slug}`]),
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'scientificName', type: 'text', required: true },
      ],
    },
    slugField('name'),
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar', description: 'Lower numbers show first.' } },
    { name: 'color', type: 'select', defaultValue: 'forest', options: CARD_COLORS, admin: { position: 'sidebar' } },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            { name: 'summary', type: 'textarea', required: true, admin: { description: 'One or two sentences for cards and search results.' } },
            {
              name: 'regionalNames',
              type: 'array',
              labels: { singular: 'Regional name', plural: 'Regional names' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'name', type: 'text', required: true },
                    { name: 'language', type: 'text', required: true, admin: { description: 'Language or community' } },
                  ],
                },
              ],
            },
            { name: 'origin', type: 'text' },
            { name: 'family', type: 'text' },
            { name: 'season', type: 'select', options: [{ label: 'Warm-season', value: 'warm' }, { label: 'Cool-season', value: 'cool' }, { label: 'Perennial', value: 'perennial' }] },
            { name: 'heroImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Culture & food',
          fields: [
            { name: 'culturalContext', type: 'richText' },
            {
              name: 'communityContext',
              type: 'richText',
              admin: { description: 'Memories and practices shared by growers and elders — only with their consent and attribution.' },
            },
            { name: 'culinaryUses', type: 'textarea' },
          ],
        },
        {
          label: 'Growing',
          fields: [
            { name: 'growingZone', type: 'text', defaultValue: 'Coastal BC (Vancouver)' },
            { name: 'growingSummary', type: 'text', admin: { description: 'Short line, e.g. “Best under cover; transplant in June”.' } },
            {
              name: 'plantingSteps',
              type: 'array',
              labels: { singular: 'Step', plural: 'Planting steps' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
              ],
            },
            { name: 'seedSaving', type: 'textarea' },
          ],
        },
        {
          label: 'Related',
          fields: [
            { name: 'relatedResources', type: 'relationship', relationTo: 'resources', hasMany: true },
            {
              name: 'relatedProducts',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              admin: { description: 'Future marketplace products. Not shown until the marketplace opens.' },
            },
          ],
        },
      ],
    },
    reviewGroup(),
  ],
}
