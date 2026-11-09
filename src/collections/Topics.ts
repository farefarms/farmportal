import type { CollectionConfig } from 'payload'

import { anyone, isEditor } from '@/access/roles'
import { slugField } from '@/fields/slug'
import { revalidateCollection } from '@/hooks/revalidate'

export const Topics: CollectionConfig = {
  slug: 'topics',
  admin: { useAsTitle: 'name', group: 'Knowledge', defaultColumns: ['name', 'order'] },
  access: { read: anyone, create: isEditor, update: isEditor, delete: isEditor },
  defaultSort: 'order',
  hooks: revalidateCollection(() => ['/learn']),
  fields: [
    { name: 'name', type: 'text', required: true },
    slugField('name'),
    { name: 'description', type: 'textarea' },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
