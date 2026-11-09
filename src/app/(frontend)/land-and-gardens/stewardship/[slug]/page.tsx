import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { CSSProperties } from 'react'

import { ProvenanceCard, SourcesList } from '@/components/Provenance'
import { Eyebrow } from '@/components/ui'
import { getGuide } from '@/lib/queries'
import { PRACTICE_LABELS } from '@/lib/site'

export const revalidate = 300

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const g = await getGuide(slug)
  if (!g) return { title: 'Not found' }
  return { title: g.title, description: g.summary, alternates: { canonical: `/land-and-gardens/stewardship/${g.slug}` } }
}

export default async function GuidePage({ params }: { params: Params }) {
  const { slug } = await params
  const g = await getGuide(slug)
  if (!g) notFound()

  return (
    <article>
      <header className="theme-soil">
        <div className="container stack" style={{ paddingBlock: 'clamp(40px, 5vw, 72px)', gap: 20 }}>
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <ol style={{ color: 'rgba(244,237,225,0.8)' }}>
              <li><Link href="/land-and-gardens#stewardship" style={{ color: 'var(--marigold)' }}>Land stewardship</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{g.title}</li>
            </ol>
          </nav>
          <Eyebrow>Stewardship guide · {PRACTICE_LABELS[g.practice] ?? g.practice}</Eyebrow>
          <h1 className="h1" style={{ marginTop: -8 }}>{g.title}</h1>
          <p className="lede">{g.summary}</p>
        </div>
      </header>
      <div style={{ background: 'var(--card)' }}>
        <div className="container row section" style={{ alignItems: 'flex-start', gap: '48px 72px' }}>
          <div className="stack" style={{ flex: '1 1 620px', minWidth: 0, gap: 40 }}>
            {g.protocolNote ? (
              <div role="note" className="notice">
                <span>
                  <strong style={{ fontWeight: 600 }}>Protocols for this guide: </strong>
                  {g.protocolNote}
                </span>
              </div>
            ) : null}
            {g.materials?.length ? (
              <section aria-labelledby="materials-title">
                <h2 id="materials-title" className="h3" style={{ marginBottom: 12 }}>Materials</h2>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {g.materials.map((m) => (
                    <li key={m.item}>{m.item}</li>
                  ))}
                </ul>
              </section>
            ) : null}
            {g.steps?.length ? (
              <section aria-labelledby="steps-title">
                <h2 id="steps-title" className="h3" style={{ marginBottom: 16 }}>Steps</h2>
                <ol className="grid" style={{ listStyle: 'none', margin: 0, padding: 0, '--min': '280px' } as CSSProperties}>
                  {g.steps.map((s, i) => (
                    <li key={s.title} className="stack" style={{ gap: 6, padding: 20, borderRadius: 18, background: 'var(--cream)' }}>
                      <span className="tiny" style={{ color: 'var(--clay)', fontWeight: 600 }}>{String(i + 1).padStart(2, '0')} · {s.title}</span>
                      <span>{s.body}</span>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}
            {g.safety ? (
              <section aria-labelledby="safety-title">
                <h2 id="safety-title" className="h3" style={{ marginBottom: 12 }}>Safety</h2>
                <p style={{ margin: 0 }}>{g.safety}</p>
              </section>
            ) : null}
            {g.ecologicalImpact ? (
              <section aria-labelledby="impact-title">
                <h2 id="impact-title" className="h3" style={{ marginBottom: 12 }}>Ecological impact</h2>
                <p style={{ margin: 0 }}>{g.ecologicalImpact}</p>
              </section>
            ) : null}
            <SourcesList review={g.review} />
          </div>
          <aside className="stack" style={{ flex: '0 1 340px', minWidth: 0, gap: 16 }}>
            <ProvenanceCard review={g.review} />
            {g.siteExample ? (
              <Link href={`/land-and-gardens/${g.siteExample.slug}`} className="card stack" style={{ padding: 24, gap: 6, textDecoration: 'none' }}>
                <span className="tiny" style={{ color: 'var(--clay)', fontWeight: 600 }}>See it in practice</span>
                <span className="h4">{g.siteExample.name}</span>
              </Link>
            ) : null}
          </aside>
        </div>
      </div>
    </article>
  )
}
