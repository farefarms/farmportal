import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/JsonLd'
import { ProvenanceCard, SourcesList } from '@/components/Provenance'
import { RichText } from '@/components/RichText'
import { Photo } from '@/components/ui'
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
      <header className="theme-cream">
        <div className="container stack" style={{ paddingBlock: '28px 48px', gap: 20 }}>
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <ol>
              <li><Link href="/learn">Learn</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{r.title}</li>
            </ol>
          </nav>
          <div className="row" style={{ gap: 10 }}>
            <span className="pill pill--forest">{typeLabel}</span>
            {(r.topics ?? []).map((t) => (
              <Link key={t.id} href={`/learn?topic=${t.slug}#results`} className="pill pill--outline tiny" style={{ textDecoration: 'none', color: 'var(--clay)' }}>
                {t.name}
              </Link>
            ))}
            {r.readingTime ? <span className="tiny" style={{ color: 'var(--muted)' }}>{r.readingTime}</span> : null}
          </div>
          <h1 className="h1" style={{ maxWidth: 960 }}>{r.title}</h1>
          <p className="lede" style={{ maxWidth: 760 }}>{r.summary}</p>
          {r.region ? <p className="tiny" style={{ margin: 0, color: 'var(--muted)' }}>Region / community: {r.region}</p> : null}
        </div>
      </header>

      <div className="theme-cream" style={{ background: 'var(--card)', borderTop: '1px solid var(--line)' }}>
        <div className="container row section" style={{ alignItems: 'flex-start', gap: '48px 72px' }}>
          <div className="stack" style={{ flex: '1 1 620px', minWidth: 0, gap: 40 }}>
            {r.heroImage ? <Photo media={r.heroImage} height="clamp(260px, 32vw, 440px)" /> : null}
            {video ? (
              <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: 22, overflow: 'hidden', background: 'var(--ink)' }}>
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
              <section aria-labelledby="history-title">
                <h2 id="history-title" className="h3" style={{ marginBottom: 14 }}>Historical context</h2>
                <RichText data={r.historicalContext} />
              </section>
            ) : null}
            <RichText data={r.body} />
            {r.file?.url ? (
              <a href={r.file.url} className="btn btn--forest" style={{ alignSelf: 'flex-start' }} download>
                Download {r.file.filename ?? 'file'}
              </a>
            ) : null}
            <SourcesList review={r.review} />
          </div>
          <aside aria-label="About this resource" className="stack" style={{ flex: '0 1 340px', minWidth: 0, gap: 16 }}>
            <ProvenanceCard review={r.review} />
            {r.relatedCrops?.length || r.relatedResources?.length ? (
              <div className="card" style={{ padding: 24 }}>
                <h2 className="tiny" style={{ margin: '0 0 10px', color: 'var(--clay)', fontWeight: 600 }}>Related in the library</h2>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {(r.relatedCrops ?? []).map((c) => (
                    <li key={`c-${c.id}`}>
                      <Link href={`/learn/crops/${c.slug}`} className="h4" style={{ display: 'block', padding: '8px 0', fontSize: 19, textDecoration: 'none' }}>
                        {c.name}
                      </Link>
                    </li>
                  ))}
                  {(r.relatedResources ?? []).map((x) => (
                    <li key={`r-${x.id}`}>
                      <Link href={`/learn/${x.slug}`} className="h4" style={{ display: 'block', padding: '8px 0', fontSize: 19, textDecoration: 'none' }}>
                        {x.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </article>
  )
}
