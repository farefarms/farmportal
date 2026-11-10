import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { CSSProperties } from 'react'

import { cropArt, cropTone } from '@/components/cards'
import { JsonLd } from '@/components/JsonLd'
import { ProvenanceCard, SourcesList } from '@/components/Provenance'
import { RichText } from '@/components/RichText'
import { Eyebrow, Icon, pad2, PageHero, Photo, PhotoCredit } from '@/components/ui'
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
      <PageHero
        id="crop-title"
        compact
        eyebrow={`Crop profile${index >= 0 ? ` · No. ${pad2(index + 1)}` : ''}`}
        title={crop.name}
        sub={crop.scientificName}
        intro={crop.summary}
        crumbs={[{ label: 'Learn', href: '/learn' }, { label: 'Crop directory', href: '/learn/crops' }, { label: crop.name }]}
      >
        {crop.regionalNames?.length ? (
          <div>
            <p className="label" style={{ fontSize: '0.75rem', color: 'var(--sun)' }}>
              Regional names
            </p>
            <ul className="chip-list mt-3" style={{ gap: '0.5rem' }}>
              {crop.regionalNames.map((n) => (
                <li key={`${n.name}-${n.language}`} className="chip" style={{ fontSize: '1rem', padding: '0.5rem 1rem', borderWidth: 1, borderColor: 'rgb(244 237 225 / 0.35)' }}>
                  {n.name}
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '0.875rem', color: 'rgb(244 237 225 / 0.8)' }}>{n.language}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {facts.length ? (
          <dl className="facts mt-10" style={{ maxWidth: '56rem' }}>
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </PageHero>

      <div className="wrap sec">
        <div className="split split--aside">
          <div className="stack" style={{ '--gap': '4rem', minWidth: 0 } as CSSProperties}>
            <figure style={{ margin: 0 }} data-reveal>
              <div style={{ position: 'relative', aspectRatio: '16 / 10', borderRadius: '2rem', overflow: 'hidden' }}>
                <Photo media={crop.heroImage} tone={cropTone(crop)} art={cropArt(crop)} priority style={{ position: 'absolute', inset: 0 }} />
              </div>
              <PhotoCredit media={crop.heroImage} />
            </figure>

            {crop.culturalContext ? (
              <section aria-labelledby="ctx-title">
                <Eyebrow>History &amp; meaning</Eyebrow>
                <h2 id="ctx-title" className="h-md mt-4">
                  Cultural context
                </h2>
                <div className="prose mt-6">
                  <RichText data={crop.culturalContext} />
                  {crop.communityContext ? <RichText data={crop.communityContext} /> : null}
                </div>
              </section>
            ) : null}

            {crop.plantingSteps?.length ? (
              <section aria-labelledby="grow-title">
                <Eyebrow>From seed to harvest</Eyebrow>
                <h2 id="grow-title" className="h-md mt-4">
                  Growing in {crop.growingZone || 'coastal BC'}
                </h2>
                <ol className="steps steps--2 mt-8">
                  {crop.plantingSteps.map((s, i) => (
                    <li key={s.title}>
                      <span className="steps__no">{pad2(i + 1)}</span>
                      <h3 className="steps__title">{s.title}</h3>
                      <p className="steps__body">{s.body}</p>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            {crop.culinaryUses ? (
              <section aria-labelledby="food-title">
                <Eyebrow>At the table</Eyebrow>
                <h2 id="food-title" className="h-md mt-4">
                  Culinary uses
                </h2>
                <p className="lead lead--sm mt-6 mw-xl">{crop.culinaryUses}</p>
                <p className="mt-4">
                  <Link href="/food-and-culture#recipes" className="link">
                    Recipes in Food &amp; Culture →
                  </Link>
                </p>
              </section>
            ) : null}

            {crop.seedSaving ? (
              <section aria-labelledby="save-title" className="card card--muted card--lg">
                <Eyebrow>Keep it going</Eyebrow>
                <h2 id="save-title" className="h-md mt-4">
                  Seed saving
                </h2>
                <p className="lead lead--sm mt-5">{crop.seedSaving}</p>
              </section>
            ) : null}

            <SourcesList review={crop.review} />
          </div>

          <aside aria-label="Profile details" className="stack" style={{ '--gap': '1rem', position: 'sticky', top: '6.5rem' } as CSSProperties}>
            <ProvenanceCard review={crop.review} extraRows={crop.growingZone ? [{ label: 'Growing advice for', value: crop.growingZone }] : []} />
            {crop.relatedResources?.length ? (
              <div className="card">
                <h2 className="eyebrow">Related</h2>
                <ul className="lines mt-4" style={{ border: 0 }}>
                  {crop.relatedResources.map((r) => (
                    <li key={r.id}>
                      <Link href={`/learn/${r.slug}`} className="lines__row" style={{ paddingBlock: '0.875rem' }}>
                        <span className="lines__title" style={{ fontSize: '1.125rem', flex: 1 }}>
                          {r.title}
                        </span>
                        <Icon name="arrow-up-right" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <Link href="/marketplace#updates" className="card card--soil grain" style={{ display: 'block' }}>
              <span className="tag">Marketplace · coming soon</span>
              <span className="card__title mt-4" style={{ display: 'block' }}>
                Heritage {crop.name.toLowerCase()} seed
              </span>
              <span className="soft mt-2 small" style={{ display: 'block' }}>
                Get notified when seeds from community growers are available.
              </span>
            </Link>
          </aside>
        </div>
      </div>

      {others.length ? (
        <section className="on-muted sec--tight" aria-labelledby="more-title">
          <div className="wrap row" style={{ '--gap': '1.25rem 2.5rem' } as CSSProperties}>
            <h2 id="more-title" className="h-sm">
              More from the directory
            </h2>
            <ul className="row" style={{ listStyle: 'none', margin: 0, padding: 0, '--gap': '0.625rem' } as CSSProperties}>
              {others.map((c) => (
                <li key={c.id}>
                  <Link href={`/learn/crops/${c.slug}`} className="filter">
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
