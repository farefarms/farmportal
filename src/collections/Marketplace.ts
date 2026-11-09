import type { CollectionConfig } from 'payload'

import { isAdmin } from '@/access/roles'

/**
 * FUTURE MARKETPLACE (phase 2+). These collections are admin-only and are never queried by
 * the public site. There is deliberately no checkout code in this build: checkout stays off
 * until food/seed regulation, tax, privacy, payments, shipping, refunds and producer agreements
 * are reviewed and approved (brief: “Marketplace has no live checkout until operations and
 * compliance are approved”).
 */
export const Producers: CollectionConfig = {
  slug: 'producers',
  admin: { useAsTitle: 'name', group: 'Marketplace (future)', defaultColumns: ['name', 'location', 'status'] },
  access: { read: isAdmin, create: isAdmin, update: isAdmin, delete: isAdmin },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'interested',
      options: [
        { label: 'Interested', value: 'interested' },
        { label: 'Onboarding', value: 'onboarding' },
        { label: 'Agreement signed', value: 'agreement' },
        { label: 'Paused', value: 'paused' },
      ],
    },
    { name: 'location', type: 'text' },
    { name: 'contactEmail', type: 'email' },
    { name: 'story', type: 'textarea' },
    { name: 'agreementNotes', type: 'textarea' },
  ],
}

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    group: 'Marketplace (future)',
    defaultColumns: ['name', 'sku', 'category', 'producer'],
    description: 'Not shown on the site. Checkout stays off until operations and compliance are approved.',
  },
  access: { read: isAdmin, create: isAdmin, update: isAdmin, delete: isAdmin },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'sku', label: 'SKU', type: 'text', unique: true },
      ],
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Heritage seeds & growing kits', value: 'seeds' },
        { label: 'Culturally relevant food products', value: 'food' },
        { label: 'Gardening supplies & educational materials', value: 'supplies' },
        { label: 'FARE Farms merchandise', value: 'merch' },
        { label: 'Products from community growers, farmers & artisans', value: 'community' },
      ],
    },
    { name: 'producer', type: 'relationship', relationTo: 'producers' },
    { name: 'provenance', type: 'textarea' },
    {
      type: 'row',
      fields: [
        { name: 'price', type: 'number', min: 0, admin: { description: 'CAD' } },
        {
          name: 'taxClass',
          type: 'select',
          options: [
            { label: 'Zero-rated (basic groceries)', value: 'zero_rated' },
            { label: 'Taxable (GST/PST)', value: 'taxable' },
            { label: 'To be determined', value: 'tbd' },
          ],
        },
        { name: 'inventory', type: 'number', min: 0 },
      ],
    },
    {
      name: 'fulfillment',
      type: 'select',
      options: [
        { label: 'Local pickup', value: 'pickup' },
        { label: 'Shipping', value: 'shipping' },
        { label: 'Pickup or shipping', value: 'both' },
      ],
    },
    {
      name: 'regulatoryFlags',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Food safety / labelling review', value: 'food_safety' },
        { label: 'Seed regulation review', value: 'seed' },
        { label: 'Allergens', value: 'allergens' },
        { label: 'Import / phytosanitary', value: 'import' },
      ],
    },
    { name: 'educationalLinks', type: 'relationship', relationTo: ['crops', 'resources'], hasMany: true },
  ],
}
