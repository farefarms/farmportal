import type { CollectionConfig } from 'payload'

import { isEditor, isStaff, staffOrPublished } from '@/access/roles'
import { reviewGroup } from '@/fields/review'
import { slugField } from '@/fields/slug'
import { publishGuard } from '@/hooks/publishGuards'
import { revalidateCollection } from '@/hooks/revalidate'

export const RESOURCE_TYPES = [
  { label: 'Heritage article', value: 'article' },
  { label: 'Guide', value: 'guide' },
  { label: 'How-to', value: 'how_to' },
  { label: 'Primer', value: 'primer' },
  { label: 'Story series', value: 'story_series' },
  { label: 'Research', value: 'research' },
  { label: 'Video', value: 'video' },
  { label: 'Download', value: 'download' },
  { label: 'Toolkit', value: 'toolkit' },
]

/** Knowledge Library: heritage articles, guides, research, video and downloadable resources. */
export const Resources: CollectionConfig = {
  slug: 'resources',
  labels: { singular: 'Library resource', plural: 'Library resources' },
  admin: {
    useAsTitle: 'title',
    group: 'Knowledge',
    defaultColumns: ['title', 'type', 'review.status', '_status'],
  },
  access: { read: staffOrPublished, create: isStaff, update: isStaff, delete: isEditor },
  defaultSort: '-publishedAt',
  versions: { drafts: true, maxPerDoc: 50 },
  hooks: {
    beforeChange: [
      publishGuard({ requireReview: true, requireSources: true }),
      ({ data }) => {
        if (data?._status === 'published' && !data.publishedAt) return { ...data, publishedAt: new Date().toISOString() }
        return data
      },
    ],
    ...revalidateCollection((doc) => ['/', '/learn', `/learn/${doc.slug}`]),
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    { name: 'type', type: 'select', required: true, defaultValue: 'article', options: RESOURCE_TYPES, admin: { position: 'sidebar' } },
    { name: 'topics', type: 'relationship', relationTo: 'topics', hasMany: true, admin: { position: 'sidebar' } },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar', description: 'Show on the home page.' } },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
    { name: 'summary', type: 'textarea', required: true },
    {
      type: 'row',
      fields: [
        { name: 'region', label: 'Region / community', type: 'text' },
        { name: 'readingTime', type: 'text', admin: { description: 'e.g. “12 min read”, “5 parts”, “PDF”' } },
      ],
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    {
      name: 'historicalContext',
      type: 'richText',
      admin: { condition: (_, siblingData) => siblingData?.type === 'article' || siblingData?.type === 'research' },
    },
    { name: 'body', type: 'richText' },
    {
      name: 'videoUrl',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'video',
        description: 'Link to a captioned video (YouTube, Vimeo). Captions are required for accessibility.',
      },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      admin: { condition: (_, siblingData) => ['download', 'toolkit', 'research'].includes(siblingData?.type) },
    },
    { name: 'relatedCrops', type: 'relationship', relationTo: 'crops', hasMany: true },
    { name: 'relatedResources', type: 'relationship', relationTo: 'resources', hasMany: true },
    reviewGroup(),
  ],
}
