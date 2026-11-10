import type { Metadata } from 'next'
import Link from 'next/link'
import type { CSSProperties } from 'react'

import { CropCard, LibraryCard } from '@/components/cards'
import { Cta } from '@/components/Cta'
import { SeasonCalendar } from '@/components/SeasonCalendar'
import { Btn, Eyebrow, Icon, PageHero, SectionHead, Words } from '@/components/ui'
import { listCrops, listTopics, searchLibrary } from '@/lib/queries'
import { RESOURCE_TYPE_LABELS } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Knowledge Library',
  description:
    'Learn about African farming traditions, culturally significant crops, ancestral food practices, sustainable agriculture, and the connections between land, food, history, and identity.',
  alternates: { canonical: '/learn' },
}

type SearchParams = Promise<{ q?: string; topic?: string; type?: string }>

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? ''

export default async function LearnPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams
  const q = one(sp.q).slice(0, 100)
  const topic = one(sp.topic)
  const type = one(sp.type)

  const [topics, results, crops] = await Promise.all([listTopics(), searchLibrary({ q, topic, type }), listCrops()])
  const hrefWith = (next: Record<string, string>) => {
    const params = new URLSearchParams()
    const merged = { q, topic, type, ...next }
    for (const [k, v] of Object.entries(merged)) if (v) params.set(k, v)
    const s = params.toString()
    return s ? `/learn?${s}#results` : '/learn#results'
  }
  const filtering = Boolean(q || topic || type)

  return (
    <>
      <PageHero
        id="lib-title"
        eyebrow="Learn"
        title="Knowledge *Library.*"
        intro="Learn about African farming traditions, culturally significant crops, ancestral food practices, sustainable agriculture, and the connections between land, food, history, and identity."
      >
        <form action="/learn" method="get" role="search" aria-label="Search the Knowledge Library" className="search">
          {topic ? <input type="hidden" name="topic" value={topic} /> : null}
          <div className="search__q">
            <Icon name="search" size={20} />
            <label htmlFor="lib-q" className="sr-only">
              Search the library
            </label>
            <input id="lib-q" name="q" type="search" defaultValue={q} placeholder="Search okra, seed saving, compost…" />
          </div>
          <div className="search__type">
            <label htmlFor="lib-type" className="sr-only">
              Type of resource
            </label>
            <select id="lib-type" name="type" defaultValue={type}>
              <option value="">All types</option>
              <option value="crop">Crop profiles</option>
              {Object.entries(RESOURCE_TYPE_LABELS)
                .filter(([k]) => k !== 'crop')
                .map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
            </select>
          </div>
          <button type="submit" className="pill-btn">
            Search <Icon name="arrow-right" />
          </button>
        </form>
      </PageHero>

      <section id="results" className="wrap sec" aria-labelledby="results-title">
        <Eyebrow>Browse by topic</Eyebrow>
        <h2 id="results-title" className="sr-only">
          Library resources
        </h2>
        <nav aria-label="Filter by topic" className="filters mt-6">
          <Link href={hrefWith({ topic: '' })} className="filter" aria-current={!topic ? 'true' : undefined}>
            All topics
          </Link>
          {topics.map((t) => (
            <Link key={t.id} href={hrefWith({ topic: t.slug })} className="filter" aria-current={topic === t.slug ? 'true' : undefined}>
              {t.name}
            </Link>
          ))}
        </nav>
        <div className="toolbar">
          <p aria-live="polite" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem' }}>
            {results.length === 1 ? '1 resource' : `${results.length} resources`}
            {q ? <> for “{q}”</> : null}
          </p>
          <div className="row" style={{ '--gap': '1rem' } as CSSProperties}>
            <p className="small soft row" style={{ '--gap': '0.375rem' } as CSSProperties}>
              <Icon name="shield" size={15} /> Every resource lists its author, reviewer and sources.
            </p>
            {filtering ? (
              <Link href="/learn#results" className="link small">
                Clear filters
              </Link>
            ) : null}
          </div>
        </div>
        {results.length ? (
          <div className="cols cols--auto" style={{ '--min': '20rem' } as CSSProperties}>
            {results.map((item, i) => (
              <LibraryCard key={item.key} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="empty stack" style={{ alignItems: 'flex-start', '--gap': '1rem' } as CSSProperties}>
            <p className="h-md">Nothing here yet.</p>
            <p className="soft mw-xl">
              New articles are researched with community reviewers and appear here once they’re sourced and reviewed. Have something to add?
            </p>
            <div className="row">
              <Btn href="/learn#results" variant="line" icon={null}>
                Clear filters
              </Btn>
              <Btn href="/get-involved#contribute" variant="leaf">
                Suggest a topic
              </Btn>
            </div>
          </div>
        )}
      </section>

      <section className="on-leaf grain sec" aria-labelledby="crops-title">
        <div className="mudcloth layer" aria-hidden="true" />
        <div className="wrap">
          <SectionHead
            eyebrow="Heritage crop directory"
            id="crops-title"
            title="From seed *to story.*"
            intro="Crop profiles bring together origin, cultural context, coastal BC growing advice, culinary uses, and seed saving — each one sourced and reviewed."
            action={
              <Btn href="/learn/crops" variant="line-light">
                All crop profiles
              </Btn>
            }
          />
          {crops.length ? (
            <div className="cols cols--3">
              {crops.slice(0, 6).map((c, i) => (
                <CropCard key={c.id} crop={c} index={i} short />
              ))}
            </div>
          ) : (
            <p className="soft">The first crop profiles are in cultural review.</p>
          )}
        </div>
      </section>

      <section id="growing-calendar" className="wrap sec" aria-labelledby="year-title">
        <Eyebrow>Growing guides · coastal BC</Eyebrow>
        <Words id="year-title" className="h-xl mt-6" text="Follow the seasons *with us.*" style={{ marginBottom: '3rem' }} />
        <SeasonCalendar />
      </section>

      <Cta
        id="contrib-title"
        tone="leaf"
        title="Have knowledge *to share?*"
        text="Growers, elders, and cultural practitioners can contribute stories, recipes, and growing knowledge — reviewed with care and shared only with consent and attribution."
      >
        <Btn href="/get-involved#contribute" variant="sun">
          Contribute knowledge
        </Btn>
        <Btn href="/food-and-culture" variant="line-light">
          Food &amp; Culture
        </Btn>
      </Cta>
    </>
  )
}
