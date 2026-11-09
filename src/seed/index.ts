/**
 * Seeds the CMS with the content from the redesign so editors start from a full structure.
 *
 *   pnpm seed        → everything is created as UNPUBLISHED drafts / unconfirmed records.
 *                      Editors verify, review and publish in the admin (the brief's acceptance criteria).
 *   pnpm seed:demo   → LOCAL PREVIEW ONLY: publishes and confirms the same content so you can see the
 *                      site populated. Never run demo mode against the production database.
 *
 * Safe to run more than once: records are matched by slug/name and skipped if they exist.
 */
import { getPayload } from 'payload'

import config from '../payload.config'
import { paragraphs } from './lexical'

const DEMO = process.env.SEED_DEMO === 'true'
const status = DEMO ? 'published' : 'draft'
const ctx = { skipPublishGuards: true, disableRevalidate: true }

const payload = await getPayload({ config })

if (DEMO && process.env.NODE_ENV === 'production') {
  throw new Error('Refusing to run demo seed with NODE_ENV=production.')
}

type Data = Record<string, unknown>

async function upsert(collection: string, matchField: string, data: Data, opts: { drafts?: boolean } = {}) {
  const existing = await payload.find({
    collection: collection as never,
    where: { [matchField]: { equals: data[matchField] } },
    limit: 1,
    depth: 0,
    draft: true,
    overrideAccess: true,
  })
  if (existing.docs.length) {
    payload.logger.info(`• ${collection}: "${String(data[matchField])}" already exists — skipped`)
    return existing.docs[0] as { id: number | string }
  }
  const doc = await payload.create({
    collection: collection as never,
    data: (opts.drafts ? { ...data, _status: status } : data) as never,
    draft: opts.drafts ? !DEMO : undefined,
    overrideAccess: true,
    context: ctx,
  })
  payload.logger.info(`✓ ${collection}: created "${String(data[matchField])}"`)
  return doc as { id: number | string }
}

const demoReview = (extra: Data = {}) =>
  DEMO
    ? { contributor: 'Demo contributor', reviewerName: 'Demo reviewer', status: 'approved', reviewNotes: 'DEMO SEED — not reviewed. Replace before launch.', ...extra }
    : { status: 'in_review', ...extra }

/* ---------- Topics ---------- */

const topics = [
  ['African agricultural heritage', 'african-agricultural-heritage'],
  ['Heritage crops', 'heritage-crops'],
  ['Seed & food sovereignty', 'seed-and-food-sovereignty'],
  ['Regenerative growing', 'regenerative-growing'],
  ['Coastal BC growing', 'coastal-bc-growing'],
  ['Land stewardship', 'land-stewardship'],
  ['Community knowledge', 'community-knowledge'],
]
const topicIds: Record<string, number | string> = {}
for (const [i, [name, slug]] of topics.entries()) {
  const doc = await upsert('topics', 'slug', { name, slug, order: i })
  topicIds[slug] = doc.id
}

/* ---------- Crops ---------- */

const SOURCE_TODO = [{ citation: 'SOURCE NEEDED — add a published or archival reference before approval' }]

await upsert(
  'crops',
  'slug',
  {
    name: 'Okra',
    slug: 'okra',
    scientificName: 'Abelmoschus esculentus',
    order: 1,
    color: 'forest',
    summary: 'A warm-season pod crop domesticated in Africa, central to soups and stews across the continent and the diaspora.',
    regionalNames: [
      { name: 'Ilá', language: 'Yoruba' },
      { name: 'Ọkwụrụ', language: 'Igbo' },
      { name: 'Kubewa', language: 'Hausa' },
      { name: 'Bamia', language: 'Swahili' },
      { name: 'Gombo', language: 'French' },
    ],
    origin: 'Africa — West African and Ethiopian origins have both been proposed',
    family: 'Mallow family (Malvaceae)',
    season: 'warm',
    culturalContext: paragraphs(
      'Okra was domesticated in Africa and has long been grown across West Africa, the Sahel, and the Horn of Africa. It crossed the Atlantic with enslaved Africans and became part of foodways across the Caribbean and the Americas — the word “gumbo” is traced to Bantu words for okra.',
    ),
    culinaryUses: 'Okra soups and stews across West Africa, gumbo in Louisiana, callaloo in Trinidad and Tobago — and fried, pickled, or dried and ground to thicken soups.',
    growingZone: 'Coastal BC (Vancouver)',
    growingSummary: 'Best under cover; transplant in June',
    plantingSteps: [
      { title: 'Start indoors', body: 'Sow in pots 4–6 weeks before transplanting. Okra needs warm soil to germinate — a heat mat helps.' },
      { title: 'Transplant', body: 'Move out in June, once nights stay above about 10 °C. A greenhouse, hoop house, or your warmest, sunniest bed works best.' },
      { title: 'Tend', body: 'Water deeply, mulch, and feed with compost. Row cover helps on cool coastal nights.' },
      { title: 'Harvest', body: 'Pick pods young, about 5–10 cm long, every day or two to keep plants producing.' },
    ],
    seedSaving:
      'Leave a few healthy pods to mature and dry on the plant until they turn brown and split. Okra mostly self-pollinates, but bees can cross varieties — grow one variety, or bag a few flowers, to keep seed true. Store dry seed somewhere cool and dark.',
    review: demoReview({ sources: SOURCE_TODO }),
  },
  { drafts: true },
)

const otherCrops = [
  { name: 'Cowpeas', slug: 'cowpeas', scientificName: 'Vigna unguiculata', color: 'clay', summary: 'Black-eyed peas and their relatives — a drought-tolerant legume grown across Africa and carried throughout the diaspora.' },
  { name: 'Amaranth', slug: 'amaranth', scientificName: 'Amaranthus spp.', color: 'marigold', summary: 'Grown for its nourishing leaves and seeds; known as callaloo in Jamaica.' },
  { name: 'Millet', slug: 'millet', scientificName: 'Pennisetum glaucum and other species', color: 'soil', summary: 'Hardy grains such as pearl millet, staples across the Sahel and beyond.' },
  { name: 'Sorghum', slug: 'sorghum', scientificName: 'Sorghum bicolor', color: 'leaf', summary: 'An African cereal grown for grain, syrup and fodder, prized for withstanding heat and drought.' },
]
for (const [i, c] of otherCrops.entries()) {
  await upsert('crops', 'slug', { ...c, order: i + 2, season: 'warm', review: demoReview({ sources: SOURCE_TODO }) }, { drafts: true })
}

/* ---------- Knowledge Library ---------- */

const resources = [
  { title: 'What Is Food Sovereignty?', type: 'primer', topic: 'seed-and-food-sovereignty', readingTime: '6 min read', summary: 'An introduction to food sovereignty: the right of communities to shape how their food is grown, shared and governed.' },
  { title: 'Starting a Community Plot', type: 'guide', topic: 'coastal-bc-growing', readingTime: '12 min read', summary: 'From finding land to the first season — a practical guide to starting a shared plot in Vancouver.' },
  { title: 'Composting in Small Spaces', type: 'how_to', topic: 'regenerative-growing', readingTime: '8 min read', summary: 'Build living soil on a balcony, in a yard or at a community plot.' },
  { title: 'Seeds of the Diaspora', type: 'story_series', topic: 'community-knowledge', readingTime: '5 parts', summary: 'Stories of the seeds families carried with them, told by the growers who keep them alive.' },
  { title: 'West Coast Growing Calendar', type: 'download', topic: 'coastal-bc-growing', readingTime: 'PDF', summary: 'A month-by-month planting calendar for culturally significant crops on the coast.' },
  { title: 'Land Access & Community Ownership', type: 'toolkit', topic: 'land-stewardship', readingTime: '20 min read', summary: 'Pathways to secure land for community growing, from licences to co-ownership.' },
]
for (const r of resources) {
  await upsert(
    'resources',
    'title',
    {
      title: r.title,
      type: r.type,
      topics: [topicIds[r.topic]],
      readingTime: r.readingTime,
      summary: r.summary,
      featured: ['What Is Food Sovereignty?', 'Starting a Community Plot', 'Seeds of the Diaspora'].includes(r.title),
      ...(DEMO ? { publishedAt: new Date().toISOString() } : {}),
      review: demoReview({ sources: SOURCE_TODO }),
    },
    { drafts: true },
  )
}

/* ---------- Black farming histories ---------- */

const people = [
  { name: 'Sylvia Stark', years: '1839 – 1944', role: 'Farmer · Salt Spring Island, BC', bio: 'Born enslaved in Missouri, Sylvia Stark became one of the first Black settlers of Salt Spring Island, BC, where she farmed the land for decades — a living symbol of resilience and rootedness on this coast.' },
  { name: 'Ernie King', years: '', role: 'Musician & community builder', bio: 'Ernie King ran the Harlem Nocturne, Vancouver’s Black-owned nightclub near Hogan’s Alley, creating a home for music and Black community life in the city.' },
  { name: 'George Washington Carver', years: '1864 – 1943', role: 'Agricultural scientist', bio: 'Agricultural scientist who championed crop rotation, soil restoration, and self-sufficiency for Black farmers.' },
  { name: 'Fannie Lou Hamer', years: '1917 – 1977', role: 'Organizer · Freedom Farm Cooperative', bio: 'Founded the Freedom Farm Cooperative in 1969, linking land access and food directly to dignity and political power.' },
]
for (const [i, p] of people.entries()) {
  await upsert('people', 'name', { ...p, order: i, review: demoReview({ sources: SOURCE_TODO }) }, { drafts: true })
}

/* ---------- Partners (unconfirmed until verified) ---------- */

const partnerIds: Record<string, number | string> = {}
for (const [i, name] of ['Museum of Vancouver', 'Vancouver Maritime Museum', 'Copley Community Orchard'].entries()) {
  const doc = await upsert('partners', 'name', { name, order: i, relationship: 'Site partner (to confirm)', confirmed: DEMO })
  partnerIds[name] = doc.id
}

/* ---------- Gardens & projects ---------- */

const trillium = await upsert(
  'projects',
  'slug',
  {
    name: 'Trillium Park — Ernie King Outdoor Amphitheatre & Garden',
    slug: 'trillium-park',
    status: 'in_development',
    confirmed: DEMO,
    order: 1,
    location: 'Trillium Park, False Creek Flats',
    neighbourhood: 'False Creek Flats',
    summary: 'A permanent food garden and a timber open-air stage for music, storytelling, and ceremony — reviving the spirit of community gathering that Hogan’s Alley once held.',
    visitInfo: 'Garden hours: Saturdays 10 AM – 2 PM, and during events.',
    activities: [{ activity: 'Garden workdays' }, { activity: 'Community consultations' }, { activity: 'Seasonal gatherings' }],
    roadmap: [
      { title: 'Temporary Garden Relocation', status: 'complete', description: 'Moving and protecting the existing garden while planning for permanence — keeping soil, plants, and community together through the transition.' },
      { title: 'Community Consultation', status: 'underway', description: 'Listening circles, design walks, and open houses so the people who will use the space shape what it becomes.' },
      { title: 'Long-Term Design', status: 'upcoming', description: 'Working with landscape architects, Black artists, and knowledge keepers to design the garden, amphitheatre, and gathering commons.' },
      { title: 'Construction & Planting', status: 'future', description: 'Building beds, the stage, accessible pathways, and planting the first permanent season — together.' },
    ],
  },
  { drafts: true },
)
const sites = [
  { name: 'Museum of Vancouver garden', slug: 'museum-of-vancouver', location: 'Museum of Vancouver, Vanier Park', partner: 'Museum of Vancouver' },
  { name: 'Vancouver Maritime Museum garden', slug: 'vancouver-maritime-museum', location: 'Vancouver Maritime Museum, Vanier Park', partner: 'Vancouver Maritime Museum' },
  { name: 'Copley Community Orchard', slug: 'copley-community-orchard', location: 'East Vancouver', partner: 'Copley Community Orchard' },
]
for (const [i, s] of sites.entries()) {
  await upsert(
    'projects',
    'slug',
    {
      name: s.name,
      slug: s.slug,
      status: 'planning',
      confirmed: DEMO,
      order: i + 2,
      location: s.location,
      summary: 'Site description to be written with our partner and confirmed before publishing.',
      partners: [partnerIds[s.partner]],
    },
    { drafts: true },
  )
}

/* ---------- Events (from the current site — confirm before publishing) ---------- */

const events = [
  { title: 'Seed Saving & Storytelling Circle', category: 'workshop', start: '2026-10-24T13:00:00-07:00', end: '2026-10-24T15:30:00-07:00', location: 'Trillium Park Garden', summary: 'Learn to harvest, dry, and store heirloom seeds while sharing the stories they carry.', site: true },
  { title: 'Harvest Feast & Potluck', category: 'gathering', start: '2026-10-31T17:00:00-07:00', end: '2026-10-31T20:00:00-07:00', location: 'Trillium Park', summary: 'Celebrate the season with food, music, and community. Bring a dish that tells your story.', site: true },
  { title: 'Fall Bed Prep Workday', category: 'volunteer', start: '2026-11-07T10:00:00-07:00', end: '2026-11-07T13:00:00-07:00', location: 'Trillium Park Garden', summary: 'Mulch, cover crops, and garlic planting. Tools, gloves, and snacks provided.', site: true },
  { title: 'Young Growers Lab', category: 'youth', start: '2026-11-14T11:00:00-07:00', end: '2026-11-14T13:00:00-07:00', location: 'Strathcona Community Space', summary: 'Hands-on growing, composting, and food science for ages 12–18.', site: false },
  { title: 'Trillium Park Design Open House', category: 'consultation', start: '2026-11-21T14:00:00-07:00', end: '2026-11-21T17:00:00-07:00', location: 'Trillium Park Fieldhouse', summary: 'See early concepts for the garden and Ernie King Amphitheatre and share your input.', site: true },
  { title: 'Winter Growing & Food Preservation', category: 'workshop', start: '2026-12-05T13:00:00-07:00', end: '2026-12-05T15:00:00-07:00', location: 'Community Kitchen', summary: 'Pickling, fermenting, and planning a cold-season garden on the West Coast.', site: false },
]
for (const e of events) {
  await upsert(
    'events',
    'title',
    {
      title: e.title,
      category: e.category,
      startsAt: new Date(e.start).toISOString(),
      endsAt: new Date(e.end).toISOString(),
      location: e.location,
      summary: e.summary,
      confirmed: DEMO,
      ...(e.site ? { project: trillium.id } : {}),
      registration: { enabled: true },
    },
    { drafts: true },
  )
}

payload.logger.info(
  DEMO
    ? 'Demo seed complete — content is published for LOCAL preview only.'
    : 'Seed complete — everything is a draft. Verify, review and publish in /admin.',
)
process.exit(0)
