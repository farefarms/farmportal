import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { CSSProperties } from 'react'

import { JsonLd } from '@/components/JsonLd'
import { ProvenanceCard, SourcesList } from '@/components/Provenance'
import { RichText } from '@/components/RichText'
import { Eyebrow, LinkArrow, Photo } from '@/components/ui'
import { getCrop, listCrops } from '@/lib/queries'
import { absoluteUrl } from '@/lib/site'

export const revalidate = 300

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const crop = await getCrop(slug)
  if (!crop) return { title: 'Not found' }
  return {
    title: `${crop.name} (${crop.scientificName})`,
    description: crop.summary,
    alternates: { canonical: `/learn/crops/${crop.slug}` },
  }
}

const SEASON_LABEL: Record<string, string> = { warm: 'Warm-season annual', cool: 'Cool-season', perennial: 'Perennial' }

export default async function CropPage({ params }: { params: Params }) {
  const { slug } = await params
  const [crop, all] = await Promise.all([getCrop(slug), listCrops()])
  if (!crop) notFound()
  const index = all.findIndex((c) => c.id === crop.id)
  const others = all.filter((c) => c.id !== crop.id)

  const facts = [
    crop.origin ? { label: 'Origin', value: crop.origin } : null,
    crop.family ? { label: 'Family', value: crop.family } : null,
    crop.season ? { label: 'Season', value: SEASON_LABEL[crop.season] ?? crop.season } : null,
    crop.growingSummary ? { label: crop.growingZone || 'Coastal BC', value: crop.growingSummary } : null,
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <article>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: `${crop.name} — crop profile`,
          about: { '@type': 'Thing', name: crop.name, alternateName: crop.scientificName },
          description: crop.summary,
          url: absoluteUrl(`/learn/crops/${crop.slug}`),
          ...(crop.review?.contributor ? { author: { '@type': 'Person', name: crop.review.contributor } } : {}),
        }}
      />
      <div className="theme-cream">
        <div className="container" style={{ paddingTop: 28 }}>
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <ol>
              <li><Link href="/learn">Learn</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/learn/crops">Heritage crop directory</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{crop.name}</li>
            </ol>
          </nav>
        </div>
        <header className="container row" style={{ paddingBlock: '36px 56px', alignItems: 'stretch', gap: '40px 64px' }}>
          <div className="stack" style={{ flex: '1 1 560px', minWidth: 0, gap: 22 }}>
            <Eyebrow>Crop profile{index >= 0 ? ` · No. ${String(index + 1).padStart(2, '0')}` : ''}</Eyebrow>
            <div>
              <h1 className="display" style={{ fontSize: 'clamp(72px, 9vw, 132px)', lineHeight: 0.9, color: 'var(--forest)', marginTop: -10 }}>
                {crop.name}
              </h1>
              <p className="sci" style={{ margin: '14px 0 0', fontSize: 24, color: 'var(--body-text)' }}>{crop.scientificName}</p>
            </div>
            <p className="lede">{crop.summary}</p>
            {crop.regionalNames?.length ? (
              <div>
                <p className="tiny" style={{ margin: '0 0 10px', color: 'var(--muted)', fontWeight: 500 }}>Regional names</p>
                <ul className="row" style={{ listStyle: 'none', margin: 0, padding: 0, gap: 8 }}>
                  {crop.regionalNames.map((n) => (
                    <li key={`${n.name}-${n.language}`} className="card" style={{ padding: '8px 14px', borderRadius: 999, fontSize: 15 }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{n.name}</span> · {n.language}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {facts.length ? (
              <dl className="grid" style={{ margin: '8px 0 0', '--min': '220px', '--gap': '0 32px', borderTop: '2px solid var(--ink)' } as CSSProperties}>
                {facts.map((f) => (
                  <div key={f.label} style={{ padding: '14px 0', borderBottom: '1px solid var(--line)' }}>
                    <dt className="tiny" style={{ color: 'var(--muted)', fontWeight: 500 }}>{f.label}</dt>
                    <dd style={{ margin: '4px 0 0' }}>{f.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
          <div style={{ flex: '0 1 420px', minWidth: 0, position: 'relative' }}>
            <span className="sun" aria-hidden="true" style={{ top: -8, left: -20, width: 150, height: 150 }} />
            <div style={{ position: 'relative' }}>
              <Photo media={crop.heroImage} arch height="clamp(380px, 36vw, 520px)" priority />
            </div>
          </div>
        </header>
      </div>

      <div style={{ background: 'var(--card)', borderTop: '1px solid var(--line)' }}>
        <div className="container row section" style={{ alignItems: 'flex-start', gap: '48px 72px' }}>
          <div className="stack" style={{ flex: '1 1 620px', minWidth: 0, gap: 48 }}>
            {crop.culturalContext ? (
              <section aria-labelledby="ctx-title">
                <h2 id="ctx-title" className="h3" style={{ fontSize: 34, marginBottom: 14 }}>Cultural context</h2>
                <RichText data={crop.culturalContext} />
                {crop.communityContext ? <RichText data={crop.communityContext} /> : null}
              </section>
            ) : null}
            {crop.plantingSteps?.length ? (
              <section aria-labelledby="grow-title">
                <h2 id="grow-title" className="h3" style={{ fontSize: 34, marginBottom: 18 }}>Growing in {crop.growingZone || 'coastal BC'}</h2>
                <ol className="grid" style={{ listStyle: 'none', margin: 0, padding: 0, '--min': '280px', '--gap': '14px' } as CSSProperties}>
                  {crop.plantingSteps.map((s, i) => (
                    <li key={s.title} className="stack" style={{ gap: 6, padding: 20, borderRadius: 18, background: 'var(--cream)' }}>
                      <span className="tiny" style={{ color: 'var(--clay)', fontWeight: 600 }}>
                        {String(i + 1).padStart(2, '0')} · {s.title}
                      </span>
                      <span>{s.body}</span>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}
            {crop.culinaryUses ? (
              <section aria-labelledby="food-title" className="stack" style={{ gap: 14 }}>
                <h2 id="food-title" className="h3" style={{ fontSize: 34 }}>Culinary uses</h2>
                <p style={{ margin: 0, maxWidth: 680 }}>{crop.culinaryUses}</p>
                <LinkArrow href="/food-and-culture#recipes">Recipes in Food &amp; Culture</LinkArrow>
              </section>
            ) : null}
            {crop.seedSaving ? (
              <section aria-labelledby="save-title">
                <h2 id="save-title" className="h3" style={{ fontSize: 34, marginBottom: 14 }}>Seed saving</h2>
                <p style={{ margin: 0, maxWidth: 680 }}>{crop.seedSaving}</p>
              </section>
            ) : null}
            <SourcesList review={crop.review} />
          </div>
          <aside aria-label="Profile details" className="stack" style={{ flex: '0 1 340px', minWidth: 0, gap: 16 }}>
            <ProvenanceCard review={crop.review} extraRows={crop.growingZone ? [{ label: 'Growing advice for', value: crop.growingZone }] : []} />
            {crop.relatedResources?.length ? (
              <div className="card" style={{ padding: 24 }}>
                <h2 className="tiny" style={{ margin: '0 0 10px', color: 'var(--clay)', fontWeight: 600 }}>Related in the library</h2>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {crop.relatedResources.map((r) => (
                    <li key={r.id}>
                      <Link href={`/learn/${r.slug}`} className="h4" style={{ display: 'block', padding: '8px 0', fontSize: 19, textDecoration: 'none' }}>
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <Link href="/marketplace#updates" className="panel theme-soil stack" style={{ gap: 8, textDecoration: 'none', borderRadius: 22 }}>
              <span className="pill pill--marigold" style={{ alignSelf: 'flex-start' }}>Marketplace · coming soon</span>
              <span className="h4">Heritage {crop.name.toLowerCase()} seed</span>
              <span className="small" style={{ color: 'rgba(244,237,225,0.85)' }}>Get notified when seeds from community growers are available.</span>
            </Link>
          </aside>
        </div>
      </div>

      {others.length ? (
        <section className="theme-paper section--tight" aria-labelledby="more-title">
          <div className="container row" style={{ gap: '20px 40px' }}>
            <h2 id="more-title" className="h4" style={{ fontSize: 28 }}>More from the directory</h2>
            <ul className="row" style={{ listStyle: 'none', margin: 0, padding: 0, gap: 10 }}>
              {others.map((c) => (
                <li key={c.id}>
                  <Link href={`/learn/crops/${c.slug}`} className="btn btn--sm btn--dark">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </article>
  )
}
