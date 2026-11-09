import type { Field, FieldHook } from 'payload'

export const slugify = (value: string): string =>
  value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)

const formatSlug =
  (fallbackField: string): FieldHook =>
  ({ value, data }) => {
    if (typeof value === 'string' && value.trim().length > 0) return slugify(value)
    const source = data?.[fallbackField]
    if (typeof source === 'string' && source.trim().length > 0) return slugify(source)
    return value
  }

/** A unique, URL-safe slug that fills itself in from the title (or another field). */
export const slugField = (fallbackField = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'Used in the page address. Filled in automatically — change it only if you need to.',
  },
  hooks: { beforeValidate: [formatSlug(fallbackField)] },
})
