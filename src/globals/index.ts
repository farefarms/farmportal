import type { GlobalConfig } from 'payload'

import { anyone, isAdmin, isEditor } from '@/access/roles'
import { revalidateGlobal } from '@/hooks/revalidate'

export const LAND_ACKNOWLEDGMENT =
  'We acknowledge that we grow on the unceded traditional territories of the xʷməθkʷəy̓əm (Musqueam), Sḵwx̱wú7mesh (Squamish), and səlilwətaɬ (Tsleil-Waututh) Nations.'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  admin: { group: 'Settings' },
  access: { read: anyone, update: isEditor },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: 'contactEmail', type: 'email', defaultValue: 'hello@farefarms.ca', required: true },
    { name: 'gardenName', type: 'text', defaultValue: 'Trillium Park Garden' },
    { name: 'gardenAddress', type: 'textarea', defaultValue: 'False Creek Flats\nVancouver, BC' },
    { name: 'gardenHours', type: 'text', defaultValue: 'Saturdays 10 AM – 2 PM, and during events' },
    { name: 'landAcknowledgment', type: 'textarea', defaultValue: LAND_ACKNOWLEDGMENT, required: true },
    {
      name: 'privacyContact',
      type: 'email',
      defaultValue: 'hello@farefarms.ca',
      admin: { description: 'Where people can ask to see, correct or delete their data.' },
    },
    {
      name: 'social',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home page',
  admin: { group: 'Settings' },
  access: { read: anyone, update: isEditor },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: 'headline',
      type: 'select',
      defaultValue: 'culture',
      options: [
        { label: 'Rooted in Culture. Growing Our Future.', value: 'culture' },
        { label: 'Rooted in Ancestral Knowledge. Growing Food Sovereignty.', value: 'ancestral' },
      ],
    },
    {
      name: 'heroIntro',
      type: 'textarea',
      defaultValue:
        'FARE Farms is an Afro-Indigenous-centred land and food initiative advancing agricultural knowledge, food sovereignty, cultural preservation, and community stewardship. Through community gardens, education, cultural exchange, and land-based learning, we create opportunities to reconnect with food, land, and ancestral knowledge.',
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    {
      name: 'rootsBody',
      label: 'Our roots run deep — text',
      type: 'textarea',
      defaultValue:
        'Food is more than nourishment. It carries memory, identity, resilience, and knowledge passed between generations. FARE Farms creates space to explore, preserve, and share agricultural traditions while learning from the responsibilities of stewardship on Indigenous lands.',
    },
    {
      name: 'pillarsIntro',
      type: 'text',
      defaultValue:
        'Discover agricultural heritage, learn culturally meaningful growing practices, care for the land, and build community.',
    },
    {
      name: 'seedToStoryIntro',
      type: 'textarea',
      defaultValue:
        'Every crop has a story. Explore the histories, growing practices, cultural significance, and food traditions connected to plants that nourish our communities.',
    },
    {
      name: 'gardensIntro',
      type: 'textarea',
      defaultValue:
        'Our growing spaces support hands-on education, intergenerational learning, ecological care, and cultural connection.',
    },
  ],
}

export const MarketplaceSettings: GlobalConfig = {
  slug: 'marketplace-settings',
  label: 'Marketplace',
  admin: {
    group: 'Marketplace (future)',
    description: 'Phase 1: coming-soon page, sign-up and producer interest. There is no checkout in this build.',
  },
  access: { read: anyone, update: isAdmin },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: 'intro',
      type: 'textarea',
      defaultValue:
        'We envision a community-rooted marketplace celebrating culturally meaningful foods, seeds, growing supplies, educational resources, and products created by local growers and makers.',
    },
    {
      name: 'currentPhase',
      type: 'select',
      defaultValue: '1',
      options: [
        { label: 'Phase 1 — Coming soon, sign-up, producer interest', value: '1' },
        { label: 'Phase 2 — Curated catalogue and producer profiles', value: '2' },
        { label: 'Phase 3 — Secure checkout, tax, inventory, fulfilment', value: '3' },
        { label: 'Phase 4 — Multi-producer marketplace, approvals, commissions, local pickup', value: '4' },
      ],
      admin: { description: 'Display only. Moving past phase 1 needs development work and a compliance sign-off.' },
    },
    {
      name: 'categories',
      type: 'array',
      defaultValue: [
        { label: 'Heritage seeds and growing kits' },
        { label: 'Culturally relevant food products' },
        { label: 'Gardening supplies and educational materials' },
        { label: 'FARE Farms merchandise' },
        { label: 'Products from community growers, farmers, and artisans' },
      ],
      fields: [{ name: 'label', type: 'text', required: true }],
    },
  ],
}
