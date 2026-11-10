import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { CSSProperties } from 'react'

import { JsonLd } from '@/components/JsonLd'
import { ProvenanceCard, SourcesList } from '@/components/Provenance'
import { RichText } from '@/components/RichText'
import { Btn, Eyebrow, Icon, PageHero, Photo, PhotoCredit } from '@/components/ui'
import { getResource } from '@/lib/queries'
import { absoluteUrl, RESOURCE_TYPE_LABELS } from '@/lib/site'

export const revalidate = 300

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const r = await getResource(slug)
  if (!r) return { title: 'Not found' }
  return { title: r.title, description: r.summary, alternates: { canonical: `/learn/${r.slug}` } }
}

/** Turns a YouTube or Vimeo link into an embeddable, privacy-enhanced URL. */
const embedUrl = (url: string) => {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/)
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`
  const vimeo = url.match(/vimeo\.com\/(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?dnt=1`
  return null
}

export default async function ResourcePage({ params }: { params: Params }) {
  const { slug } = await params
  const r = await getResource(slug)
  if (!r) notFound()
  const typeLabel = RESOURCE_TYPE_LABELS[r.type] ?? r.type
  const video = r.videoUrl ? embedUrl(r.videoUrl) : null

  return (
    <article>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': r.type === 'video' ? 'VideoObject' : 'Article',
          headline: r.title,
          name: r.title,
          description: r.summary,
          url: absoluteUrl(`/learn/${r.slug}`),
          ...(r.review?.contributor ? { author: { '@type': 'Person', name: r.review.contributor } } : {}),
          ...(r.publishedAt ? { datePublished: r.publishedAt, uploadDate: r.publishedAt } : {}),
          ...(r.updatedAt ? { dateModified: r.updatedAt } : {}),
          ...(r.review?.sources?.length ? { citation: r.review.sources.map((s) => s.url || s.citation) } : {}),
        }}
      />
      <PageHero
        id="res-title"
        compact
        tone={r.type === 'story_series' ? 'soil' : 'leaf'}
        eyebrow={`${typeLabel}${r.readingTime ? ` · ${r.readingTime}` : ''}`}
        title={r.title}
        intro={r.summary}
        crumbs={[{ label: 'Learn', href: '/learn' }, { label: r.title }]}
      >
        <div className="row" style={{ '--gap': '0.5rem' } as CSSProperties}>
          {(r.topics ?? []).map((t) => (
            <Link key={t.id} href={`/learn?topic=${t.slug}#results`} className="filter" style={{ minHeight: '2.25rem', fontSize: '0.875rem' }}>
              {t.name}
            </Link>
          ))}
          {r.region ? <span className="small" style={{ color: 'rgb(244 237 225 / 0.85)', marginLeft: '0.5rem' }}>Region / community: {r.region}</span> : null}
        </div>
      </PageHero>

      <div className="wrap sec">
        <div className="split split--aside">
          <div className="stack" style={{ '--gap': '3rem', minWidth: 0 } as CSSProperties}>
            {r.heroImage ? (
              <figure style={{ margin: 0 }}>
                <div style={{ position: 'relative', aspectRatio: '16 / 10', borderRadius: '2rem', overflow: 'hidden' }}>
                  <Photo media={r.heroImage} style={{ position: 'absolute', inset: 0 }} />
                </div>
                <PhotoCredit media={r.heroImage} />
              </figure>
            ) : null}
            {video ? (
              <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: '2rem', overflow: 'hidden', background: 'var(--soil)' }}>
                <iframe
                  src={video}
                  title={r.title}
                  loading="lazy"
                  allow="encrypted-media; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                />
              </div>
            ) : null}
            {r.historicalContext ? (
              <section aria-labelledby="history-title" className="card card--muted card--lg">
                <Eyebrow>Before we begin</Eyebrow>
                <h2 id="history-title" className="h-md mt-4">
                  Historical context
                </h2>
                <div className="prose mt-5">
                  <RichText data={r.historicalContext} />
                </div>
              </section>
            ) : null}
            <div className="prose">
              <RichText data={r.body} />
            </div>
            {r.file?.url ? (
              <Btn href={r.file.url} variant="leaf" icon="download" download>
                Download {r.file.filename ?? 'file'}
              </Btn>
            ) : null}
            <SourcesList review={r.review} />
          </div>
          <aside aria-label="About this resource" className="stack" style={{ '--gap': '1rem', position: 'sticky', top: '6.5rem' } as CSSProperties}>
            <ProvenanceCard review={r.review} />
            {r.relatedCrops?.length || r.relatedResources?.length ? (
              <div className="card">
                <h2 className="eyebrow">Related</h2>
                <ul className="lines mt-4" style={{ border: 0 }}>
                  {(r.relatedCrops ?? []).map((c) => (
                    <li key={`c-${c.id}`}>
                      <Link href={`/learn/crops/${c.slug}`} className="lines__row" style={{ paddingBlock: '0.875rem' }}>
                        <span className="lines__title" style={{ fontSize: '1.125rem', flex: 1 }}>
                          {c.name}
                        </span>
                        <Icon name="arrow-up-right" />
                      </Link>
                    </li>
                  ))}
                  {(r.relatedResources ?? []).map((x) => (
                    <li key={`r-${x.id}`}>
                      <Link href={`/learn/${x.slug}`} className="lines__row" style={{ paddingBlock: '0.875rem' }}>
                        <span className="lines__title" style={{ fontSize: '1.125rem', flex: 1 }}>
                          {x.title}
                        </span>
                        <Icon name="arrow-up-right" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <Link href="/get-involved#contribute" className="card card--sun" style={{ display: 'block' }}>
              <span className="card__title" style={{ display: 'block' }}>
                Something to add or correct?
              </span>
              <span className="small mt-2" style={{ display: 'block' }}>
                Tell us — community knowledge keeps this library honest.
              </span>
            </Link>
          </aside>
        </div>
      </div>
    </article>
  )
}
