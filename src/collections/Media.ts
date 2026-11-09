import type { CollectionConfig } from 'payload'

import { anyone, isEditor, isStaff } from '@/access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Settings', defaultColumns: ['filename', 'alt', 'credit', 'verified'] },
  access: {
    read: anyone,
    create: isStaff,
    update: isStaff,
    delete: isEditor,
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt text',
      type: 'text',
      required: true,
      admin: { description: 'Describe the image for people using screen readers. For files, describe the document.' },
    },
    {
      name: 'credit',
      type: 'text',
      admin: { description: 'Photographer, archive or creator. Shown with the image on the site.' },
    },
    { name: 'caption', type: 'text' },
    {
      name: 'verified',
      label: 'Verified project photograph',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Tick only when this image genuinely shows FARE Farms people, sites or work and permission to publish is on file.',
      },
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'application/pdf', 'audio/*', 'video/mp4'],
  },
}
