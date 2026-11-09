import type { CollectionConfig } from 'payload'

import { hasRole, isAdmin, isAdminField, ROLES, userFromReq } from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'roles'],
    group: 'Settings',
  },
  auth: true,
  access: {
    admin: ({ req }) => hasRole(userFromReq(req), ...ROLES),
    create: isAdmin,
    delete: isAdmin,
    read: ({ req }) => {
      const user = req.user
      if (!user) return false
      if (hasRole(userFromReq(req), 'admin')) return true
      return { id: { equals: user.id } }
    },
    update: ({ req }) => {
      const user = req.user
      if (!user) return false
      if (hasRole(userFromReq(req), 'admin')) return true
      return { id: { equals: user.id } }
    },
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data
        const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true })
        // The very first account is the site owner.
        if (totalDocs === 0) return { ...data, roles: ['admin'] }
        if (!hasRole(userFromReq(req), 'admin')) return { ...data, roles: ['contributor'] }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['contributor'],
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Reviewer (cultural / sources)', value: 'reviewer' },
        { label: 'Contributor', value: 'contributor' },
      ],
      access: { update: isAdminField },
      admin: {
        description:
          'Contributors write drafts. Reviewers approve content and sources. Editors publish. Admins manage people, submissions and settings.',
      },
    },
  ],
}
