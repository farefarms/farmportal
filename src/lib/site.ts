export const SITE_NAME = 'FARE Farms'
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
export const POSITIONING = 'Rooted in Ancestral Knowledge. Growing Food Sovereignty.'
export const DESCRIPTION =
  'FARE Farms connects African-descended agricultural heritage, Indigenous land relationships, cultural foodways, and community-based growing practices to cultivate resilient and connected communities.'

/** Main navigation, from the redesign brief. */
export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Our Roots', href: '/our-roots' },
  { label: 'Learn', href: '/learn' },
  { label: 'Land & Gardens', href: '/land-and-gardens' },
  { label: 'Food & Culture', href: '/food-and-culture' },
  { label: 'Events & Community', href: '/events' },
  { label: 'Marketplace', href: '/marketplace' },
] as const

export const RESOURCE_TYPE_LABELS: Record<string, string> = {
  article: 'Heritage article',
  guide: 'Guide',
  how_to: 'How-to',
  primer: 'Primer',
  story_series: 'Story series',
  research: 'Research',
  video: 'Video',
  download: 'Download',
  toolkit: 'Toolkit',
  crop: 'Crop profile',
}

export const EVENT_CATEGORY_LABELS: Record<string, string> = {
  workshop: 'Workshop',
  gathering: 'Gathering',
  volunteer: 'Volunteer',
  youth: 'Youth',
  consultation: 'Consultation',
}

export const PROJECT_STATUS_LABELS: Record<string, string> = {
  planning: 'Planning',
  in_development: 'In development',
  active: 'Active',
  seasonal: 'Seasonal',
  paused: 'Paused',
}

export const PRACTICE_LABELS: Record<string, string> = {
  soil: 'Soil',
  water: 'Water',
  biodiversity: 'Biodiversity',
  reciprocal_practice: 'Reciprocal practice',
  other: 'Other',
}

export const absoluteUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
