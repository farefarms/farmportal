import type { Where } from 'payload'
import { cache } from 'react'

import { LAND_ACKNOWLEDGMENT } from '@/globals'
import { getPayloadClient } from './payload'
import { RESOURCE_TYPE_LABELS } from './site'
import type {
  CropDoc,
  EventDoc,
  GuideDoc,
  HomePageDoc,
  MarketplaceDoc,
  PartnerDoc,
  PersonDoc,
  ProjectDoc,
  RecipeDoc,
  ResourceDoc,
  SiteSettingsDoc,
  StoryDoc,
  TopicDoc,
} from './types'

/**
 * Every public query runs with `overrideAccess: false` so collection access control applies:
 * the public only ever receives published, confirmed and consented content.
 */
const PUBLIC = { overrideAccess: false, draft: false } as const

type FindArgs = { collection: string; where?: Where; sort?: string; limit?: number; depth?: number }

async function findDocs<T>({ collection, where, sort, limit = 100, depth = 1 }: FindArgs): Promise<T[]> {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: collection as never, where, sort, limit, depth, ...PUBLIC })
  return res.docs as unknown as T[]
}

async function findOne<T>(collection: string, slug: string, depth = 2): Promise<T | null> {
  const docs = await findDocs<T>({ collection, where: { slug: { equals: slug } }, limit: 1, depth })
  return docs[0] ?? null
}

async function findGlobal<T>(slug: string, fallback: T): Promise<T> {
  try {
    const payload = await getPayloadClient()
    const doc = await payload.findGlobal({ slug: slug as never, depth: 1, ...PUBLIC })
    return { ...fallback, ...(doc as unknown as T) }
  } catch (error) {
    console.error(`[fare] Could not load global "${slug}"`, error)
    return fallback
  }
}

/* ---------- Globals ---------- */

export const getSiteSettings = cache(() =>
  findGlobal<SiteSettingsDoc>('site-settings', {
    contactEmail: 'hello@farefarms.ca',
    gardenName: 'Trillium Park Garden',
    gardenAddress: 'False Creek Flats\nVancouver, BC',
    gardenHours: 'Saturdays 10 AM – 2 PM, and during events',
    landAcknowledgment: LAND_ACKNOWLEDGMENT,
    privacyContact: 'hello@farefarms.ca',
  }),
)
export const getHomePage = cache(() => findGlobal<HomePageDoc>('home-page', {}))
export const getMarketplace = cache(() => findGlobal<MarketplaceDoc>('marketplace-settings', {}))

/* ---------- Knowledge ---------- */

export const listTopics = cache(() => findDocs<TopicDoc>({ collection: 'topics', sort: 'order', depth: 0 }))
export const listCrops = cache(() => findDocs<CropDoc>({ collection: 'crops', sort: 'order', depth: 1 }))
export const getCrop = cache((slug: string) => findOne<CropDoc>('crops', slug))
export const getResource = cache((slug: string) => findOne<ResourceDoc>('resources', slug))
export const listPeople = cache(() => findDocs<PersonDoc>({ collection: 'people', sort: 'order', depth: 1 }))

export const listFeaturedResources = cache(async (limit = 3) => {
  const featured = await findDocs<ResourceDoc>({
    collection: 'resources',
    where: { featured: { equals: true } },
    sort: '-publishedAt',
    limit,
    depth: 0,
  })
  if (featured.length >= limit) return featured
  const latest = await findDocs<ResourceDoc>({ collection: 'resources', sort: '-publishedAt', limit, depth: 0 })
  const seen = new Set(featured.map((r) => r.id))
  return [...featured, ...latest.filter((r) => !seen.has(r.id))].slice(0, limit)
})

export type LibraryItem = {
  key: string
  kind: 'crop' | 'resource'
  title: string
  href: string
  type: string
  typeLabel: string
  topics: string[]
  summary: string
  meta?: string | null
  reviewer?: string | null
  contributor?: string | null
}

export type LibraryFilters = { q?: string; topic?: string; type?: string }

/** Knowledge Library search: words in the query must all appear (case-insensitive) in a searchable field. */
export async function searchLibrary({ q = '', topic = '', type = '' }: LibraryFilters): Promise<LibraryItem[]> {
  const query = q.trim().slice(0, 100)
  const items: LibraryItem[] = []

  const wantResources = type !== 'crop'
  const wantCrops = (type === '' || type === 'crop') && (topic === '' || topic === 'heritage-crops')

  if (wantResources) {
    const and: Where[] = []
    if (topic) and.push({ 'topics.slug': { equals: topic } })
    if (type) and.push({ type: { equals: type } })
    if (query) {
      and.push({
        or: [{ title: { like: query } }, { summary: { like: query } }, { region: { like: query } }],
      })
    }
    const resources = await findDocs<ResourceDoc>({
      collection: 'resources',
      where: and.length ? { and } : undefined,
      sort: '-publishedAt',
      limit: 200,
      depth: 1,
    })
    for (const r of resources) {
      items.push({
        key: `resource-${r.id}`,
        kind: 'resource',
        title: r.title,
        href: `/learn/${r.slug}`,
        type: r.type,
        typeLabel: RESOURCE_TYPE_LABELS[r.type] ?? r.type,
        topics: (r.topics ?? []).map((t) => t.name),
        summary: r.summary,
        meta: r.readingTime,
        reviewer: r.review?.reviewerName,
        contributor: r.review?.contributor,
      })
    }
  }

  if (wantCrops) {
    const crops = await findDocs<CropDoc>({
      collection: 'crops',
      where: query
        ? {
            or: [
              { name: { like: query } },
              { scientificName: { like: query } },
              { summary: { like: query } },
              { 'regionalNames.name': { like: query } },
            ],
          }
        : undefined,
      sort: 'order',
      depth: 0,
    })
    for (const c of crops) {
      items.push({
        key: `crop-${c.id}`,
        kind: 'crop',
        title: c.name,
        href: `/learn/crops/${c.slug}`,
        type: 'crop',
        typeLabel: 'Crop profile',
        topics: ['Heritage crops'],
        summary: c.summary,
        meta: c.scientificName,
        reviewer: c.review?.reviewerName,
        contributor: c.review?.contributor,
      })
    }
  }
  return items
}

/* ---------- Land & gardens ---------- */

export const listProjects = cache(() => findDocs<ProjectDoc>({ collection: 'projects', sort: 'order', depth: 1 }))
export const getProject = cache((slug: string) => findOne<ProjectDoc>('projects', slug))
export const listGuides = cache(() => findDocs<GuideDoc>({ collection: 'stewardship-guides', sort: 'title', depth: 0 }))
export const getGuide = cache((slug: string) => findOne<GuideDoc>('stewardship-guides', slug))
export const listPartners = cache(() => findDocs<PartnerDoc>({ collection: 'partners', sort: 'order', depth: 1 }))

/* ---------- Food & culture ---------- */

export const listRecipes = cache(() => findDocs<RecipeDoc>({ collection: 'recipes', sort: 'title', depth: 1 }))
export const getRecipe = cache((slug: string) => findOne<RecipeDoc>('recipes', slug))
export const listStories = cache(() => findDocs<StoryDoc>({ collection: 'stories', sort: '-createdAt', depth: 1 }))
export const getStory = cache((slug: string) => findOne<StoryDoc>('stories', slug))

/* ---------- Events ---------- */

export type EventFilters = { category?: string; includePast?: boolean; limit?: number }

export async function listEvents({ category = '', includePast = false, limit = 100 }: EventFilters = {}) {
  const and: Where[] = []
  const now = new Date()
  const from = includePast ? new Date(now.getTime() - 1000 * 60 * 60 * 24 * 180) : now
  and.push({ or: [{ startsAt: { greater_than_equal: from.toISOString() } }, { endsAt: { greater_than_equal: from.toISOString() } }] })
  if (category) and.push({ category: { equals: category } })
  return findDocs<EventDoc>({ collection: 'events', where: { and }, sort: 'startsAt', limit, depth: 1 })
}

export const getEvent = cache((slug: string) => findOne<EventDoc>('events', slug))
