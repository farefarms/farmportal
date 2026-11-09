import type { Metadata } from 'next'
import Link from 'next/link'
import type { CSSProperties } from 'react'

import { CropCard, LibraryCard } from '@/components/cards'
import { SeasonCalendar } from '@/components/SeasonCalendar'
import { ArrowIcon, Eyebrow, Furrows, SearchIcon, SectionHead } from '@/components/ui'
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
      <section className="theme-forest furrows" aria-labelledby="lib-title">
        <Furrows />
        <div className="container stack" style={{ paddingBlock: 'clamp(48px, 5vw, 80px) clamp(56px, 6vw, 88px)', gap: 24 }}>
          <Eyebrow>Learn</Eyebrow>
          <h1 id="lib-title" className="h1" style={{ marginTop: -6 }}>
            Knowledge <span className="accent">Library</span>
          </h1>
          <p className="lede" style={{ maxWidth: 680 }}>
            Learn about African farming traditions, culturally significant crops, ancestral food practices, sustainable agriculture, and the connections between land, food, history, and identity.
          </p>
          <form action="/learn" method="get" role="search" className="row" style={{ maxWidth: 860, marginTop: 8, alignItems: 'flex-end' }}>
            {topic ? <input type="hidden" name="topic" value={topic} /> : null}
            <div className="field" style={{ flex: '1 1 360px', minWidth: 0 }}>
              <label htmlFor="lib-q" style={{ color: 'rgba(244,237,225,0.85)' }}>Search the library</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
                  <SearchIcon size={20} color="#1F4D35" />
                </span>
                <input id="lib-q" name="q" type="search" defaultValue={q} placeholder="okra, seed saving, compost…" style={{ minHeight: 60, borderRadius: 999, paddingLeft: 54, border: 0 }} />
              </div>
            </div>
            <div className="field" style={{ flex: '0 1 220px' }}>
              <label htmlFor="lib-type" style={{ color: 'rgba(244,237,225,0.85)' }}>Type</label>
              <select id="lib-type" name="type" defaultValue={type} style={{ minHeight: 60, borderRadius: 999, border: 0 }}>
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
            <button type="submit" className="btn btn--primary" style={{ minHeight: 60 }}>
              Search
            </button>
          </form>
        </div>
      </section>

      <section id="results" className="theme-cream section" aria-labelledby="results-title">
        <div className="container">
          <h2 id="results-title" className="sr-only">
            Library resources
          </h2>
          <nav aria-label="Filter by topic" className="filter-bar">
            <Link href={hrefWith({ topic: '' })} className="filter-chip" aria-current={!topic ? 'true' : undefined}>
              All topics
            </Link>
            {topics.map((t) => (
              <Link key={t.id} href={hrefWith({ topic: t.slug })} className="filter-chip" aria-current={topic === t.slug ? 'true' : undefined}>
                {t.name}
              </Link>
            ))}
          </nav>
          <div className="row" style={{ justifyContent: 'space-between', margin: '28px 0 20px', paddingBottom: 14, borderBottom: '2px solid var(--ink)' }}>
            <p aria-live="polite" style={{ margin: 0, fontWeight: 600 }}>
              {results.length === 1 ? '1 resource' : `${results.length} resources`}
              {q ? <> for “{q}”</> : null}
            </p>
            <div className="row" style={{ gap: 16 }}>
              <p className="tiny" style={{ margin: 0, color: 'var(--muted)' }}>Every resource lists its author, reviewer and sources.</p>
              {filtering ? (
                <Link href="/learn#results" className="tiny" style={{ fontWeight: 600, color: 'var(--forest)' }}>
                  Clear filters
                </Link>
              ) : null}
            </div>
          </div>
          {results.length ? (
            <div className="grid" style={{ '--min': '300px' } as CSSProperties}>
              {results.map((item) => (
                <LibraryCard key={item.key} item={item} />
              ))}
            </div>
          ) : (
            <div className="empty stack" style={{ alignItems: 'flex-start', gap: 14 }}>
              <p className="h4" style={{ fontSize: 28, margin: 0 }}>Nothing here yet.</p>
              <p className="body-muted" style={{ maxWidth: 620 }}>
                New articles are researched with community reviewers and appear here once they’re sourced and reviewed. Have something to add?
              </p>
              <div className="row">
                <Link href="/learn#results" className="btn btn--outline">Clear filters</Link>
                <Link href="/get-involved#contribute" className="btn btn--dark">Suggest a topic</Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="theme-paper section" aria-labelledby="crops-title">
        <div className="container">
          <SectionHead
            eyebrow="Heritage crop directory"
            id="crops-title"
            title={<>From seed <span className="accent">to story.</span></>}
            intro="Crop profiles bring together origin, cultural context, coastal BC growing advice, culinary uses, and seed saving — each one sourced and reviewed."
            action={
              <Link href="/learn/crops" className="link-arrow">
                All crop profiles <ArrowIcon />
              </Link>
            }
          />
          {crops.length ? (
            <div className="grid" style={{ '--min': '200px' } as CSSProperties}>
              {crops.map((c, i) => (
                <CropCard key={c.id} crop={c} index={i} />
              ))}
            </div>
          ) : (
            <p className="body-muted">The first crop profiles are in cultural review.</p>
          )}
        </div>
      </section>

      <section id="growing-calendar" className="theme-forest section" aria-labelledby="year-title">
        <div className="container">
          <div style={{ marginBottom: 36 }}>
            <Eyebrow>Growing guides · coastal BC</Eyebrow>
            <h2 id="year-title" className="h2">Follow the seasons with us.</h2>
          </div>
          <SeasonCalendar />
        </div>
      </section>

      <section className="theme-cream section--tight" aria-labelledby="contrib-title">
        <div className="container split" style={{ alignItems: 'center' }}>
          <div className="split__main">
            <h2 id="contrib-title" className="h3" style={{ fontSize: 'clamp(30px, 3vw, 44px)', marginBottom: 10 }}>Have knowledge to share?</h2>
            <p className="body-muted" style={{ fontSize: 18, maxWidth: 640 }}>
              Growers, elders, and cultural practitioners can contribute stories, recipes, and growing knowledge — reviewed with care and shared only with consent and attribution.
            </p>
          </div>
          <Link href="/get-involved#contribute" className="btn btn--dark">
            Contribute knowledge <ArrowIcon size={17} />
          </Link>
        </div>
      </section>
    </>
  )
}
