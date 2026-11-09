import type { MetadataRoute } from 'next'

import { listCrops, listEvents, listGuides, listProjects, listRecipes, listStories, searchLibrary } from '@/lib/queries'
import { absoluteUrl } from '@/lib/site'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ['/', '/our-roots', '/learn', '/learn/crops', '/land-and-gardens', '/food-and-culture', '/events', '/get-involved', '/marketplace', '/privacy', '/accessibility']
  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({ url: absoluteUrl(p) }))

  try {
    const [library, crops, projects, guides, recipes, stories, events] = await Promise.all([
      searchLibrary({ type: '' }),
      listCrops(),
      listProjects(),
      listGuides(),
      listRecipes(),
      listStories(),
      listEvents({ includePast: true }),
    ])
    const resourceLinks = library.filter((i) => i.kind === 'resource').map((i) => i.href)
    const paths = [
      ...resourceLinks,
      ...crops.map((c) => `/learn/crops/${c.slug}`),
      ...projects.map((p) => `/land-and-gardens/${p.slug}`),
      ...guides.map((g) => `/land-and-gardens/stewardship/${g.slug}`),
      ...recipes.map((r) => `/food-and-culture/recipes/${r.slug}`),
      ...stories.map((s) => `/food-and-culture/stories/${s.slug}`),
      ...events.map((e) => `/events/${e.slug}`),
    ]
    entries.push(...paths.map((p) => ({ url: absoluteUrl(p) })))
  } catch (error) {
    console.error('[fare] sitemap: could not load content', error)
  }
  return entries
}
