import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { CSSProperties } from 'react'

import { EventTicket } from '@/components/cards'
import { JsonLd } from '@/components/JsonLd'
import { RichText } from '@/components/RichText'
import { Eyebrow, LinkArrow, Photo } from '@/components/ui'
import { shortDate } from '@/lib/format'
import { getProject, listEvents } from '@/lib/queries'
import { absoluteUrl, PROJECT_STATUS_LABELS } from '@/lib/site'

export const revalidate = 300

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const p = await getProject(slug)
  if (!p) return { title: 'Not found' }
  return { title: p.name, description: p.summary, alternates: { canonical: `/land-and-gardens/${p.slug}` } }
}

const PHASE: Record<string, { label: string; pill: string; bar: string }> = {
  complete: { label: 'Complete', pill: 'pill--forest', bar: 'var(--forest)' },
  underway: { label: 'Underway', pill: 'pill--marigold', bar: 'var(--marigold)' },
  upcoming: { label: 'Upcoming', pill: 'pill--clay', bar: 'var(--clay)' },
  future: { label: 'Future', pill: 'pill--outline', bar: 'var(--line)' },
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()
  const allEvents = await listEvents({ limit: 50 })
  const events = allEvents.filter((e) => e.project && e.project.id === project.id).slice(0, 3)
  const updates = (project.updates ?? []).filter((u) => u.verified).sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <article>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Place',
          name: project.name,
          description: project.summary,
          address: project.location,
          url: absoluteUrl(`/land-and-gardens/${project.slug}`),
        }}
      />
      <header className="theme-forest">
        <div className="container row" style={{ paddingBlock: 'clamp(40px, 5vw, 72px)', gap: '40px 64px' }}>
          <div className="stack" style={{ flex: '1 1 520px', minWidth: 0, gap: 20 }}>
            <nav aria-label="Breadcrumb" className="breadcrumb">
              <ol style={{ color: 'rgba(244,237,225,0.8)' }}>
                <li><Link href="/land-and-gardens" style={{ color: 'var(--marigold)' }}>Land &amp; Gardens</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{project.name}</li>
              </ol>
            </nav>
            <div className="row" style={{ gap: 10 }}>
              <span className="pill pill--marigold">{PROJECT_STATUS_LABELS[project.status] ?? project.status}</span>
              <span className="tiny" style={{ color: 'rgba(244,237,225,0.85)' }}>{project.location}</span>
            </div>
            <h1 className="h1">{project.name}</h1>
            <p className="lede">{project.summary}</p>
            <div className="row">
              <Link href="/get-involved" className="btn btn--primary">Take part at this site</Link>
            </div>
          </div>
          <div style={{ flex: '0 1 440px', minWidth: 0 }}>
            <Photo media={project.heroImage} arch dark height="clamp(320px, 34vw, 480px)" priority />
          </div>
        </div>
      </header>

      <section className="theme-cream section">
        <div className="container row" style={{ alignItems: 'flex-start', gap: '48px 72px' }}>
          <div className="stack" style={{ flex: '1 1 600px', minWidth: 0, gap: 32 }}>
            <RichText data={project.siteDescription} />
            {project.gallery?.length ? (
              <div className="grid" style={{ '--min': '220px' } as CSSProperties}>
                {project.gallery.map((g, i) => (
                  <Photo key={i} media={g.image} height="220px" />
                ))}
              </div>
            ) : null}
          </div>
          <aside className="stack" style={{ flex: '0 1 340px', minWidth: 0, gap: 16 }}>
            {project.visitInfo ? (
              <div className="card" style={{ padding: 24 }}>
                <h2 className="tiny" style={{ margin: '0 0 8px', color: 'var(--clay)', fontWeight: 600 }}>Visit</h2>
                <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{project.visitInfo}</p>
              </div>
            ) : null}
            {project.activities?.length ? (
              <div className="card" style={{ padding: 24 }}>
                <h2 className="tiny" style={{ margin: '0 0 8px', color: 'var(--clay)', fontWeight: 600 }}>Activities</h2>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {project.activities.map((a) => (
                    <li key={a.activity}>{a.activity}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {project.partners?.length ? (
              <div className="card" style={{ padding: 24 }}>
                <h2 className="tiny" style={{ margin: '0 0 8px', color: 'var(--clay)', fontWeight: 600 }}>Partners</h2>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {project.partners.map((p) => (
                    <li key={p.id}>{p.url ? <a href={p.url} rel="noopener noreferrer">{p.name}</a> : p.name}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      {project.roadmap?.length ? (
        <section className="theme-paper section" aria-labelledby="roadmap-title">
          <div className="container">
            <div className="split mt-section-head">
              <div className="split__main">
                <Eyebrow>Project roadmap</Eyebrow>
                <h2 id="roadmap-title" className="h2" style={{ fontSize: 'clamp(34px, 3.6vw, 52px)' }}>Watch it grow, phase by phase.</h2>
              </div>
              <LinkArrow href="/events?category=consultation">Join a consultation</LinkArrow>
            </div>
            <ol className="grid" style={{ listStyle: 'none', margin: 0, padding: 0, '--min': '240px' } as CSSProperties}>
              {project.roadmap.map((phase, i) => {
                const s = PHASE[phase.status] ?? PHASE.upcoming
                return (
                  <li key={phase.title} className="card stack" style={{ padding: 24, gap: 10, borderTop: `6px solid ${s.bar}` }}>
                    <span className="row" style={{ justifyContent: 'space-between' }}>
                      <span className="tiny" style={{ color: 'var(--clay)', fontWeight: 600 }}>{String(i + 1).padStart(2, '0')}</span>
                      <span className={`pill ${s.pill} tiny`}>{s.label}</span>
                    </span>
                    <h3 className="h4">{phase.title}</h3>
                    {phase.description ? <p className="small" style={{ margin: 0, color: 'var(--body-text)' }}>{phase.description}</p> : null}
                  </li>
                )
              })}
            </ol>
          </div>
        </section>
      ) : null}

      {updates.length ? (
        <section className="theme-cream section" aria-labelledby="updates-title">
          <div className="container">
            <h2 id="updates-title" className="h2" style={{ marginBottom: 32, fontSize: 'clamp(34px, 3.6vw, 52px)' }}>Field notes</h2>
            <ol className="rule-list">
              {updates.map((u) => (
                <li key={`${u.date}-${u.title}`} className="row" style={{ alignItems: 'baseline', gap: '8px 32px', padding: '22px 0' }}>
                  <span className="tiny" style={{ flex: '0 0 120px', color: 'var(--clay)', fontWeight: 600 }}>{shortDate(u.date)}</span>
                  <span className="stack" style={{ flex: '1 1 420px', gap: 4 }}>
                    <span className="h4">{u.title}</span>
                    {u.body ? <span className="body-muted">{u.body}</span> : null}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {events.length ? (
        <section className="theme-paper section" aria-labelledby="site-events-title">
          <div className="container stack" style={{ gap: 14 }}>
            <h2 id="site-events-title" className="h2" style={{ marginBottom: 20, fontSize: 'clamp(34px, 3.6vw, 52px)' }}>Coming up here</h2>
            {events.map((e) => (
              <EventTicket key={e.id} event={e} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}
