import type { Metadata } from 'next'
import Link from 'next/link'
import type { CSSProperties } from 'react'

import { Eyebrow, Furrows, LinkArrow, Photo } from '@/components/ui'
import { listGuides, listProjects } from '@/lib/queries'
import { PRACTICE_LABELS, PROJECT_STATUS_LABELS } from '@/lib/site'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Land & Gardens',
  description: 'Our growing spaces support hands-on education, intergenerational learning, ecological care, and cultural connection.',
  alternates: { canonical: '/land-and-gardens' },
}

const PRINCIPLES = [
  'Reciprocal stewardship',
  'Ecological responsibility',
  'Indigenous sovereignty',
  'Sustainable growing practices',
  'Respectful knowledge exchange',
]

export default async function GardensPage() {
  const [projects, guides] = await Promise.all([listProjects(), listGuides()])

  return (
    <>
      <section className="theme-forest furrows" aria-labelledby="gardens-title">
        <Furrows />
        <div className="container stack" style={{ paddingBlock: 'clamp(48px, 5vw, 80px) clamp(56px, 6vw, 88px)', gap: 24 }}>
          <Eyebrow>Land &amp; gardens</Eyebrow>
          <h1 id="gardens-title" className="h1" style={{ maxWidth: 900, marginTop: -6 }}>
            Our gardens are <span className="accent">living classrooms.</span>
          </h1>
          <p className="lede">Our growing spaces support hands-on education, intergenerational learning, ecological care, and cultural connection.</p>
          <nav aria-label="On this page" className="row" style={{ gap: 10 }}>
            <a href="#sites" className="btn btn--outline btn--sm">Our sites</a>
            <a href="#stewardship" className="btn btn--outline btn--sm">Land stewardship</a>
          </nav>
        </div>
      </section>

      <section id="sites" className="theme-cream section" aria-labelledby="sites-title">
        <div className="container">
          <h2 id="sites-title" className="h2" style={{ marginBottom: 40 }}>Where we grow</h2>
          {projects.length ? (
            <div className="grid" style={{ '--min': '480px', '--gap': '40px 32px' } as CSSProperties}>
              {projects.map((p) => (
                <article key={p.id} className="stack" style={{ gap: 16 }}>
                  <Photo media={p.heroImage} height="300px" showCredit={false} />
                  <div className="row" style={{ gap: 10 }}>
                    <span className="pill pill--forest">{PROJECT_STATUS_LABELS[p.status] ?? p.status}</span>
                    <span className="tiny" style={{ color: 'var(--muted)' }}>{p.location}</span>
                  </div>
                  <h3 className="h3" style={{ fontSize: 30 }}>
                    <Link href={`/land-and-gardens/${p.slug}`} style={{ textDecoration: 'none' }}>{p.name}</Link>
                  </h3>
                  <p className="body-muted" style={{ margin: 0 }}>{p.summary}</p>
                  {p.activities?.length ? (
                    <p className="small" style={{ margin: 0 }}>
                      <strong style={{ fontWeight: 600 }}>Activities:</strong> {p.activities.map((a) => a.activity).join(', ')}
                    </p>
                  ) : null}
                  <LinkArrow href={`/land-and-gardens/${p.slug}`}>Visit the site page</LinkArrow>
                </article>
              ))}
            </div>
          ) : (
            <p className="body-muted">Site details are being confirmed with our partners.</p>
          )}
        </div>
      </section>

      <section id="stewardship" className="theme-soil section" aria-labelledby="stew-title">
        <div className="container row" style={{ alignItems: 'flex-start', gap: '40px 72px' }}>
          <div className="stack" style={{ flex: '1 1 520px', minWidth: 0, gap: 20 }}>
            <Eyebrow>Land stewardship</Eyebrow>
            <h2 id="stew-title" className="h2" style={{ marginTop: -18 }}>
              Afro-Indigenous <span className="accent">land stewardship</span>
            </h2>
            <p className="lede">Exploring relationships between African-descended communities, Indigenous peoples, and the land.</p>
            <ol className="rule-list" style={{ marginTop: 8 }}>
              {PRINCIPLES.map((p, i) => (
                <li key={p} className="row" style={{ alignItems: 'baseline', gap: 18, padding: '14px 0', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 23 }}>
                  <span className="tiny accent" style={{ fontFamily: 'var(--font-body)' }}>{String(i + 1).padStart(2, '0')}</span>
                  {p}
                </li>
              ))}
            </ol>
          </div>
          <div className="stack" style={{ flex: '0 1 420px', minWidth: 0, gap: 16 }}>
            <div role="note" className="panel" style={{ border: '2px solid var(--marigold)' }}>
              <h3 className="tiny accent" style={{ margin: '0 0 10px', fontWeight: 600 }}>How this section is built</h3>
              <p style={{ margin: 0 }}>
                This content is developed with community consultation. Nothing is published here without appropriate attribution, consent, and the cultural protocols agreed with the Nations and knowledge keepers involved.
              </p>
            </div>
            <h3 className="tiny" style={{ margin: '12px 0 0', color: 'rgba(244,237,225,0.8)', fontWeight: 500 }}>Stewardship guides</h3>
            {guides.length ? (
              <ul className="grid" style={{ listStyle: 'none', margin: 0, padding: 0, '--min': '160px', '--gap': '10px' } as CSSProperties}>
                {guides.map((g) => (
                  <li key={g.id}>
                    <Link href={`/land-and-gardens/stewardship/${g.slug}`} className="stack" style={{ gap: 4, padding: '16px 18px', borderRadius: 18, background: 'var(--soil-light)', textDecoration: 'none' }}>
                      <span className="h4" style={{ fontSize: 20 }}>{g.title}</span>
                      <span className="tiny" style={{ color: 'rgba(244,237,225,0.75)' }}>{PRACTICE_LABELS[g.practice] ?? g.practice}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="body-muted small">Guides on soil, water, biodiversity and reciprocal practice are in development.</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
