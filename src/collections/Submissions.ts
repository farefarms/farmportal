import type { CollectionConfig } from 'payload'

import { hasRole, isAdmin, isEditor, nobody, userFromReq } from '@/access/roles'

/**
 * Everything people send through the website. Records are created only by the site's server actions
 * (create access is closed to the public API), and read only by staff who need them.
 */
const consentFields: CollectionConfig['fields'] = [
  { name: 'consentText', type: 'textarea', admin: { readOnly: true, description: 'The exact wording the person agreed to.' } },
  { name: 'consentedAt', type: 'date', admin: { readOnly: true } },
]

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: { useAsTitle: 'email', group: 'Submissions', defaultColumns: ['email', 'lists', 'createdAt'] },
  access: { read: isAdmin, create: nobody, update: isAdmin, delete: isAdmin },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true },
    {
      name: 'lists',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Garden newsletter', value: 'newsletter' },
        { label: 'Marketplace updates', value: 'marketplace' },
      ],
    },
    { name: 'unsubscribed', type: 'checkbox', defaultValue: false },
    ...consentFields,
  ],
}

export const VolunteerSignups: CollectionConfig = {
  slug: 'volunteer-signups',
  labels: { singular: 'Volunteer sign-up', plural: 'Volunteer sign-ups' },
  admin: { useAsTitle: 'name', group: 'Submissions', defaultColumns: ['name', 'role', 'createdAt'] },
  access: { read: isEditor, create: nobody, update: isEditor, delete: isAdmin },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'role', type: 'text' },
    { name: 'message', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Active volunteer', value: 'active' },
        { label: 'Closed', value: 'closed' },
      ],
    },
    ...consentFields,
  ],
}

export const KnowledgeSubmissions: CollectionConfig = {
  slug: 'knowledge-submissions',
  labels: { singular: 'Knowledge submission', plural: 'Knowledge submissions' },
  admin: {
    useAsTitle: 'name',
    group: 'Submissions',
    defaultColumns: ['name', 'kind', 'scope', 'status', 'createdAt'],
    description: 'Moderate here, then create a Story, Recipe or library draft with a documented consent record.',
  },
  access: {
    read: ({ req }) => hasRole(userFromReq(req), 'admin', 'editor', 'reviewer'),
    create: nobody,
    update: ({ req }) => hasRole(userFromReq(req), 'admin', 'editor', 'reviewer'),
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'email', type: 'email', required: true },
    {
      name: 'kind',
      type: 'select',
      options: [
        { label: 'Recipe', value: 'recipe' },
        { label: 'Oral history or story', value: 'story' },
        { label: 'Growing knowledge', value: 'growing' },
        { label: 'Crop information', value: 'crop' },
        { label: 'Something else', value: 'other' },
      ],
    },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'scope',
      label: 'Requested visibility',
      type: 'select',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Community only', value: 'community' },
        { label: 'Archive only', value: 'archive' },
      ],
    },
    {
      name: 'attribution',
      type: 'select',
      options: [
        { label: 'Use my name', value: 'named' },
        { label: 'Keep me anonymous', value: 'anonymous' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In conversation', value: 'in_conversation' },
        { label: 'Converted to content', value: 'converted' },
        { label: 'Declined / withdrawn', value: 'closed' },
      ],
    },
    { name: 'notes', type: 'textarea' },
    ...consentFields,
  ],
}

export const ProducerInterest: CollectionConfig = {
  slug: 'producer-interest',
  labels: { singular: 'Producer interest', plural: 'Producer interest' },
  admin: { useAsTitle: 'business', group: 'Submissions', defaultColumns: ['business', 'name', 'category', 'createdAt'] },
  access: { read: isEditor, create: nobody, update: isEditor, delete: isAdmin },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'business', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'location', type: 'text' },
    { name: 'category', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Added as producer', value: 'added' },
        { label: 'Not a fit right now', value: 'closed' },
      ],
    },
    ...consentFields,
  ],
}

export const EventRegistrations: CollectionConfig = {
  slug: 'event-registrations',
  labels: { singular: 'Event registration', plural: 'Event registrations' },
  admin: { useAsTitle: 'name', group: 'Submissions', defaultColumns: ['name', 'event', 'status', 'createdAt'] },
  access: { read: isEditor, create: nobody, update: isEditor, delete: isAdmin },
  fields: [
    { name: 'event', type: 'relationship', relationTo: 'events', required: true },
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'accessibilityNeeds', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'registered',
      options: [
        { label: 'Registered', value: 'registered' },
        { label: 'Waitlist', value: 'waitlist' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
    ...consentFields,
  ],
}
