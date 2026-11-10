import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { CSSProperties } from 'react'

import { ProvenanceCard, SourcesList } from '@/components/Provenance'
import { Eyebrow, Icon, pad2, PageHero } from '@/components/ui'
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
      <PageHero
        id="guide-title"
        compact
        tone="soil"
        eyebrow={`Stewardship guide · ${PRACTICE_LABELS[g.practice] ?? g.practice}`}
        title={g.title}
        intro={g.summary}
        crumbs={[{ label: 'Land stewardship', href: '/land-and-gardens#stewardship' }, { label: g.title }]}
      />
      <div className="wrap sec">
        <div className="split split--aside">
          <div className="stack" style={{ '--gap': '3.5rem', minWidth: 0 } as CSSProperties}>
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
                <Eyebrow>You’ll need</Eyebrow>
                <h2 id="materials-title" className="h-md mt-4">
                  Materials
                </h2>
                <ul className="boxes mt-6">
                  {g.materials.map((m) => (
                    <li key={m.item}>{m.item}</li>
                  ))}
                </ul>
              </section>
            ) : null}
            {g.steps?.length ? (
              <section aria-labelledby="steps-title">
                <Eyebrow>How to</Eyebrow>
                <h2 id="steps-title" className="h-md mt-4">
                  Steps
                </h2>
                <ol className="steps steps--2 mt-8">
                  {g.steps.map((s, i) => (
                    <li key={s.title}>
                      <span className="steps__no">{pad2(i + 1)}</span>
                      <h3 className="steps__title">{s.title}</h3>
                      <p className="steps__body">{s.body}</p>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}
            {g.safety ? (
              <section aria-labelledby="safety-title" className="card card--muted card--lg">
                <h2 id="safety-title" className="h-sm">
                  Safety
                </h2>
                <p className="lead lead--sm mt-4">{g.safety}</p>
              </section>
            ) : null}
            {g.ecologicalImpact ? (
              <section aria-labelledby="impact-title">
                <Eyebrow>Why it matters</Eyebrow>
                <h2 id="impact-title" className="h-md mt-4">
                  Ecological impact
                </h2>
                <p className="lead lead--sm mt-5 mw-xl">{g.ecologicalImpact}</p>
              </section>
            ) : null}
            <SourcesList review={g.review} />
          </div>
          <aside className="stack" style={{ '--gap': '1rem', position: 'sticky', top: '6.5rem' } as CSSProperties}>
            <ProvenanceCard review={g.review} />
            {g.siteExample ? (
              <Link href={`/land-and-gardens/${g.siteExample.slug}`} className="card" style={{ display: 'block' }}>
                <span className="kicker">See it in practice</span>
                <span className="card__title mt-2 row" style={{ '--gap': '0.5rem' } as CSSProperties}>
                  {g.siteExample.name} <Icon name="arrow-up-right" />
                </span>
              </Link>
            ) : null}
          </aside>
        </div>
      </div>
    </article>
  )
}
