import type { Access, CollectionConfig, Where } from 'payload'

import { hasRole, isEditor, ROLES, userFromReq } from '@/access/roles'
import { revalidateCollection } from '@/hooks/revalidate'

const staffOrConfirmed: Access = ({ req }) => {
  if (hasRole(userFromReq(req), ...ROLES)) return true
  return { confirmed: { equals: true } } as Where
}

/** Partner organizations. Only confirmed relationships are shown publicly. */
export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: { useAsTitle: 'name', group: 'Community', defaultColumns: ['name', 'relationship', 'confirmed'] },
  access: { read: staffOrConfirmed, create: isEditor, update: isEditor, delete: isEditor },
  defaultSort: 'order',
  hooks: revalidateCollection(() => ['/our-roots', '/land-and-gardens']),
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'confirmed',
      label: 'Partnership confirmed',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Confirmed in writing with the partner. Required before it appears on the site.' },
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    { name: 'relationship', type: 'text', admin: { description: 'e.g. Site host, Program partner, Funder' } },
    { name: 'url', type: 'text' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'description', type: 'textarea' },
  ],
}
