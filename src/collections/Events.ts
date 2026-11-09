import type { CollectionConfig } from 'payload'

import { isEditor, isStaff, staffOrPublishedAndConfirmed } from '@/access/roles'
import { slugField } from '@/fields/slug'
import { publishGuard } from '@/hooks/publishGuards'
import { revalidateCollection } from '@/hooks/revalidate'

export const EVENT_CATEGORIES = [
  { label: 'Workshop', value: 'workshop' },
  { label: 'Gathering', value: 'gathering' },
  { label: 'Volunteer', value: 'volunteer' },
  { label: 'Youth', value: 'youth' },
  { label: 'Consultation', value: 'consultation' },
]

export const Events: CollectionConfig = {
  slug: 'events',
  admin: { useAsTitle: 'title', group: 'Community', defaultColumns: ['title', 'startsAt', 'category', 'confirmed', '_status'] },
  access: { read: staffOrPublishedAndConfirmed, create: isStaff, update: isStaff, delete: isEditor },
  defaultSort: 'startsAt',
  versions: { drafts: true, maxPerDoc: 25 },
  hooks: {
    beforeChange: [publishGuard({ requireConfirmed: true })],
    ...revalidateCollection((doc) => ['/', '/events', `/events/${doc.slug}`]),
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    {
      name: 'confirmed',
      label: 'Details confirmed',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Date, time, place and hosts are confirmed. Required to publish.' },
    },
    { name: 'category', type: 'select', required: true, options: EVENT_CATEGORIES, admin: { position: 'sidebar' } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'scheduled',
      options: [
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Postponed', value: 'postponed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      type: 'row',
      fields: [
        { name: 'startsAt', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayAndTime' } } },
        { name: 'endsAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'location', type: 'text', required: true },
        { name: 'project', label: 'Site', type: 'relationship', relationTo: 'projects' },
      ],
    },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'description', type: 'richText' },
    { name: 'accessibility', type: 'textarea', admin: { description: 'Step-free access, washrooms, seating, ASL, etc.' } },
    {
      name: 'registration',
      type: 'group',
      fields: [
        { name: 'enabled', label: 'Take registrations on the site', type: 'checkbox', defaultValue: true },
        {
          type: 'row',
          fields: [
            { name: 'capacity', type: 'number', admin: { description: 'Leave empty for unlimited. Extra sign-ups join a waitlist.' } },
            { name: 'closesAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
          ],
        },
        { name: 'externalUrl', type: 'text', admin: { description: 'Use an external registration link instead.' } },
      ],
    },
  ],
}
