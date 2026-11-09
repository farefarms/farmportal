import type { CollectionConfig } from 'payload'

import { isEditor, isStaff, staffOrPublishedAndConfirmed } from '@/access/roles'
import { slugField } from '@/fields/slug'
import { publishGuard } from '@/hooks/publishGuards'
import { revalidateCollection } from '@/hooks/revalidate'

export const PROJECT_STATUSES = [
  { label: 'Planning', value: 'planning' },
  { label: 'In development', value: 'in_development' },
  { label: 'Active', value: 'active' },
  { label: 'Seasonal', value: 'seasonal' },
  { label: 'Paused', value: 'paused' },
]

/** Growing sites and community projects: Trillium Park, MOV, VMM, Copley Community Orchard, … */
export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Garden / project', plural: 'Gardens & projects' },
  admin: { useAsTitle: 'name', group: 'Land & gardens', defaultColumns: ['name', 'status', 'confirmed', '_status'] },
  access: { read: staffOrPublishedAndConfirmed, create: isStaff, update: isStaff, delete: isEditor },
  defaultSort: 'order',
  versions: { drafts: true, maxPerDoc: 50 },
  hooks: {
    beforeChange: [publishGuard({ requireConfirmed: true })],
    ...revalidateCollection((doc) => ['/', '/land-and-gardens', `/land-and-gardens/${doc.slug}`]),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    slugField('name'),
    {
      name: 'confirmed',
      label: 'Details confirmed',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Location, status and partner relationship have been verified with the site.' },
    },
    { name: 'status', type: 'select', required: true, defaultValue: 'planning', options: PROJECT_STATUSES, admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    {
      type: 'row',
      fields: [
        { name: 'location', type: 'text', required: true, admin: { description: 'e.g. Trillium Park, False Creek Flats' } },
        { name: 'neighbourhood', type: 'text' },
      ],
    },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'siteDescription', type: 'richText' },
    { name: 'visitInfo', type: 'textarea', admin: { description: 'Hours, access, what to bring.' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'gallery', type: 'array', fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }] },
    { name: 'activities', type: 'array', fields: [{ name: 'activity', type: 'text', required: true }] },
    { name: 'partners', type: 'relationship', relationTo: 'partners', hasMany: true },
    {
      name: 'roadmap',
      type: 'array',
      labels: { singular: 'Phase', plural: 'Roadmap phases' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'upcoming',
          options: [
            { label: 'Complete', value: 'complete' },
            { label: 'Underway', value: 'underway' },
            { label: 'Upcoming', value: 'upcoming' },
            { label: 'Future', value: 'future' },
          ],
        },
      ],
    },
    {
      name: 'updates',
      type: 'array',
      labels: { singular: 'Update', plural: 'Updates' },
      admin: { description: 'Only updates marked as verified appear on the site.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'date', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayOnly' } } },
            { name: 'title', type: 'text', required: true },
          ],
        },
        { name: 'body', type: 'textarea' },
        { name: 'verified', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
}
