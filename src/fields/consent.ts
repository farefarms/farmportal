import type { Field } from 'payload'

import { staffOnlyField } from '@/access/roles'

export const CONSENT_SCOPES = [
  { label: 'Public — may be published on the website', value: 'public' },
  { label: 'Community only — shared at FARE Farms gatherings, not online', value: 'community' },
  { label: 'Archive only — kept privately, never shared', value: 'archive' },
]

/**
 * Consent record for community stories and recipes (brief: "contributor, consent scope, attribution,
 * media rights, review status, withdrawal contact"). Content stays private until consent is documented.
 */
export const consentGroup: Field = {
  name: 'consent',
  type: 'group',
  label: 'Consent & attribution',
  admin: {
    description: 'Nothing is published unless consent is documented, the scope is Public, and it has not been withdrawn.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'contributorName', type: 'text', required: true },
        {
          name: 'contributorContact',
          type: 'text',
          access: { read: staffOnlyField },
          admin: { description: 'Private. Never shown on the site.' },
        },
      ],
    },
    { name: 'scope', type: 'select', required: true, defaultValue: 'archive', options: CONSENT_SCOPES },
    {
      type: 'row',
      fields: [
        {
          name: 'documented',
          label: 'Consent documented',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'A signed or recorded consent is on file.' },
        },
        { name: 'consentDate', type: 'date', admin: { date: { pickerAppearance: 'dayOnly' } } },
        {
          name: 'consentReference',
          type: 'text',
          access: { read: staffOnlyField },
          admin: { description: 'Where the consent record is filed (private).' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'attribution',
          type: 'select',
          defaultValue: 'named',
          options: [
            { label: 'Full name', value: 'named' },
            { label: 'First name and initial', value: 'initials' },
            { label: 'Anonymous', value: 'anonymous' },
          ],
        },
        { name: 'attributionText', type: 'text', admin: { description: 'Exactly how the credit should read on the site.' } },
      ],
    },
    {
      name: 'mediaRights',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Audio', value: 'audio' },
        { label: 'Photographs', value: 'photo' },
        { label: 'Video', value: 'video' },
      ],
    },
    { name: 'withdrawalContact', type: 'text', defaultValue: 'hello@farefarms.ca' },
    {
      name: 'withdrawn',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Tick if the contributor has withdrawn consent. The item disappears from the site immediately.' },
    },
  ],
}

/** Publishing checks shared by stories and recipes. */
export const consentProblems = (data: Record<string, any>): string[] => {
  const consent = data?.consent ?? {}
  const problems: string[] = []
  if (!consent.documented) problems.push('record that consent is documented')
  if (consent.scope !== 'public') problems.push('only publish items whose consent scope is Public')
  if (consent.withdrawn) problems.push('unpublish — consent has been withdrawn')
  return problems
}
