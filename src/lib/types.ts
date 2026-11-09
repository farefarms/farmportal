/**
 * Front-end view types. Kept separate from the generated `payload-types.ts` so the site
 * compiles before types are generated; field names mirror the collection configs.
 */
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export type RichTextValue = DefaultTypedEditorState | null | undefined

export type MediaDoc = {
  id: number | string
  url?: string | null
  alt?: string | null
  credit?: string | null
  caption?: string | null
  mimeType?: string | null
  filename?: string | null
  width?: number | null
  height?: number | null
}

export type Source = { citation: string; url?: string | null }

export type Review = {
  contributor?: string | null
  reviewerName?: string | null
  status?: string | null
  lastReviewed?: string | null
  sources?: Source[] | null
}

export type TopicDoc = { id: number | string; name: string; slug: string; description?: string | null }

export type CropDoc = {
  id: number | string
  name: string
  slug: string
  scientificName: string
  summary: string
  color?: string | null
  regionalNames?: { name: string; language: string }[] | null
  origin?: string | null
  family?: string | null
  season?: string | null
  heroImage?: MediaDoc | null
  culturalContext?: RichTextValue
  communityContext?: RichTextValue
  culinaryUses?: string | null
  growingZone?: string | null
  growingSummary?: string | null
  plantingSteps?: { title: string; body: string }[] | null
  seedSaving?: string | null
  relatedResources?: ResourceDoc[] | null
  review?: Review | null
  updatedAt?: string
}

export type ResourceDoc = {
  id: number | string
  title: string
  slug: string
  type: string
  topics?: TopicDoc[] | null
  summary: string
  region?: string | null
  readingTime?: string | null
  heroImage?: MediaDoc | null
  historicalContext?: RichTextValue
  body?: RichTextValue
  videoUrl?: string | null
  file?: MediaDoc | null
  relatedCrops?: CropDoc[] | null
  relatedResources?: ResourceDoc[] | null
  featured?: boolean | null
  publishedAt?: string | null
  review?: Review | null
  updatedAt?: string
}

export type GuideDoc = {
  id: number | string
  title: string
  slug: string
  practice: string
  summary: string
  materials?: { item: string }[] | null
  steps?: { title: string; body: string }[] | null
  safety?: string | null
  ecologicalImpact?: string | null
  siteExample?: ProjectDoc | null
  protocolNote?: string | null
  review?: Review | null
}

export type Consent = {
  contributorName?: string | null
  attribution?: string | null
  attributionText?: string | null
  withdrawalContact?: string | null
}

export type RecipeDoc = {
  id: number | string
  title: string
  slug: string
  region?: string | null
  serves?: string | null
  time?: string | null
  summary: string
  image?: MediaDoc | null
  crops?: CropDoc[] | null
  ingredients?: { quantity?: string | null; item: string }[] | null
  steps?: { body: string }[] | null
  storyBehind?: RichTextValue
  consent?: Consent | null
  review?: Review | null
}

export type StoryDoc = {
  id: number | string
  title: string
  slug: string
  summary: string
  image?: MediaDoc | null
  body?: RichTextValue
  audio?: MediaDoc | null
  transcript?: RichTextValue
  relatedCrops?: CropDoc[] | null
  consent?: Consent | null
  review?: Review | null
}

export type PartnerDoc = {
  id: number | string
  name: string
  relationship?: string | null
  url?: string | null
  logo?: MediaDoc | null
  description?: string | null
}

export type ProjectDoc = {
  id: number | string
  name: string
  slug: string
  status: string
  location: string
  neighbourhood?: string | null
  summary: string
  siteDescription?: RichTextValue
  visitInfo?: string | null
  heroImage?: MediaDoc | null
  gallery?: { image: MediaDoc }[] | null
  activities?: { activity: string }[] | null
  partners?: PartnerDoc[] | null
  roadmap?: { title: string; description?: string | null; status: string }[] | null
  updates?: { date: string; title: string; body?: string | null; verified?: boolean | null }[] | null
}

export type EventDoc = {
  id: number | string
  title: string
  slug: string
  category: string
  status?: string | null
  startsAt: string
  endsAt?: string | null
  location: string
  project?: ProjectDoc | null
  summary: string
  description?: RichTextValue
  accessibility?: string | null
  registration?: {
    enabled?: boolean | null
    capacity?: number | null
    closesAt?: string | null
    externalUrl?: string | null
  } | null
}

export type PersonDoc = {
  id: number | string
  name: string
  years?: string | null
  role?: string | null
  bio: string
  image?: MediaDoc | null
  review?: Review | null
}

export type SiteSettingsDoc = {
  contactEmail: string
  gardenName?: string | null
  gardenAddress?: string | null
  gardenHours?: string | null
  landAcknowledgment: string
  privacyContact?: string | null
  social?: { label: string; url: string }[] | null
}

export type HomePageDoc = {
  headline?: 'culture' | 'ancestral' | null
  heroIntro?: string | null
  heroImage?: MediaDoc | null
  rootsBody?: string | null
  pillarsIntro?: string | null
  seedToStoryIntro?: string | null
  gardensIntro?: string | null
}

export type MarketplaceDoc = {
  intro?: string | null
  currentPhase?: string | null
  categories?: { label: string }[] | null
}
