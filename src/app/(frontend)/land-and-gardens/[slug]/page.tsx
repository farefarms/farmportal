import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { CSSProperties } from 'react'

import { EventRow } from '@/components/cards'
import { Cta } from '@/components/Cta'
import { JsonLd } from '@/components/JsonLd'
import { RichText } from '@/components/RichText'
import { Btn, Eyebrow, pad2, PageHero, Photo, PhotoCredit, SectionHead } from '@/components/ui'
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

const PHASE: Record<string, { label: string; tag: string }> = {
  complete: { label: 'Complete', tag: 'tag--leaf' },
  underway: { label: 'Underway', tag: '' },
  upcoming: { label: 'Upcoming', tag: 'tag--clay' },
  future: { label: 'Future', tag: 'tag--line' },
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
      <PageHero
        id="project-title"
        compact
        eyebrow={`${PROJECT_STATUS_LABELS[project.status] ?? project.status}${project.location ? ` · ${project.location}` : ''}`}
        title={project.name}
        intro={project.summary}
        crumbs={[{ label: 'Land & Gardens', href: '/land-and-gardens' }, { label: project.name }]}
      >
        <div className="row">
          <Btn href="/get-involved" variant="sun">
            Take part at this site
          </Btn>
          {project.roadmap?.length ? (
            <Btn href="#roadmap" variant="line-light" icon="arrow-down">
              See the roadmap
            </Btn>
          ) : null}
        </div>
      </PageHero>

      <section className="wrap sec">
        <div className="split split--aside">
          <div className="stack" style={{ '--gap': '2.5rem', minWidth: 0 } as CSSProperties}>
            <figure style={{ margin: 0 }} data-reveal>
              <div style={{ position: 'relative', aspectRatio: '16 / 10', borderRadius: '2rem', overflow: 'hidden' }}>
                <Photo media={project.heroImage} tone="leaf" art="field" priority style={{ position: 'absolute', inset: 0 }} />
              </div>
              <PhotoCredit media={project.heroImage} />
            </figure>
            <div className="prose">
              <RichText data={project.siteDescription} />
            </div>
            {project.gallery?.length ? (
              <div className="cols cols--auto" style={{ '--min': '14rem' } as CSSProperties}>
                {project.gallery.map((g, i) => (
                  <figure key={i} style={{ margin: 0 }}>
                    <div style={{ position: 'relative', aspectRatio: '4 / 3', borderRadius: '1.5rem', overflow: 'hidden' }}>
                      <Photo media={g.image} style={{ position: 'absolute', inset: 0 }} />
                    </div>
                    <PhotoCredit media={g.image} />
                  </figure>
                ))}
              </div>
            ) : null}
          </div>
          <aside className="stack" style={{ '--gap': '1rem', position: 'sticky', top: '6.5rem' } as CSSProperties}>
            {project.visitInfo ? (
              <div className="card card--leaf grain">
                <h2 className="eyebrow">Visit</h2>
                <p className="mt-4" style={{ whiteSpace: 'pre-line' }}>
                  {project.visitInfo}
                </p>
              </div>
            ) : null}
            {project.activities?.length ? (
              <div className="card">
                <h2 className="eyebrow">Activities</h2>
                <ul className="chip-list mt-4" style={{ gap: '0.5rem' }}>
                  {project.activities.map((a) => (
                    <li key={a.activity} className="tag tag--muted" style={{ fontSize: '0.875rem', padding: '0.375rem 0.875rem' }}>
                      {a.activity}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {project.partners?.length ? (
              <div className="card">
                <h2 className="eyebrow">Partners</h2>
                <ul className="lines mt-4" style={{ border: 0 }}>
                  {project.partners.map((p) => (
                    <li key={p.id} style={{ padding: '0.75rem 0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem' }}>
                      {p.url ? (
                        <a href={p.url} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                          {p.name}
                        </a>
                      ) : (
                        p.name
                      )}
                      {p.relationship ? <span className="small soft" style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: 400 }}>{p.relationship}</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      {project.roadmap?.length ? (
        <section id="roadmap" className="on-leaf grain sec" aria-labelledby="roadmap-title">
          <div className="mudcloth layer" aria-hidden="true" />
          <div className="wrap">
            <SectionHead
              eyebrow="Project roadmap"
              id="roadmap-title"
              title="Watch it grow, *phase by phase.*"
              action={
                <Btn href="/events?category=consultation" variant="line-light">
                  Join a consultation
                </Btn>
              }
            />
            <ol className="cols cols--auto" style={{ listStyle: 'none', margin: 0, padding: 0, '--min': '15rem' } as CSSProperties}>
              {project.roadmap.map((phase, i) => {
                const s = PHASE[phase.status] ?? PHASE.upcoming
                return (
                  <li key={phase.title} className="person" data-reveal style={{ '--d': `${(i % 4) * 0.06}s` } as CSSProperties}>
                    <span className="row" style={{ justifyContent: 'space-between' }}>
                      <span className="person__years">Phase {pad2(i + 1)}</span>
                      <span className={`tag ${s.tag}`} style={s.tag === 'tag--line' ? { color: 'var(--cream)' } : undefined}>
                        {s.label}
                      </span>
                    </span>
                    <h3 className="person__name" style={{ fontSize: '1.5rem' }}>
                      {phase.title}
                    </h3>
                    {phase.description ? <p className="person__bio">{phase.description}</p> : null}
                  </li>
                )
              })}
            </ol>
          </div>
        </section>
      ) : null}

      {updates.length ? (
        <section className="wrap sec" aria-labelledby="updates-title">
          <Eyebrow id="updates-title">Field notes</Eyebrow>
          <ol className="lines mt-10">
            {updates.map((u) => (
              <li key={`${u.date}-${u.title}`}>
                <div className="lines__row" style={{ flexWrap: 'wrap' }}>
                  <span className="kicker" style={{ flex: '0 0 8rem' }}>
                    {shortDate(u.date)}
                  </span>
                  <span style={{ flex: '1 1 24rem' }}>
                    <span className="lines__title" style={{ display: 'block' }}>
                      {u.title}
                    </span>
                    {u.body ? <span className="soft mt-2" style={{ display: 'block' }}>{u.body}</span> : null}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {events.length ? (
        <section className="on-muted sec" aria-labelledby="site-events-title">
          <div className="wrap">
            <SectionHead
              eyebrow="Upcoming"
              id="site-events-title"
              title="Coming up *here.*"
              action={
                <Btn href="/events" variant="line">
                  Full calendar
                </Btn>
              }
            />
            <ol className="events">
              {events.map((e) => (
                <EventRow key={e.id} event={e} />
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <Cta title="Help this garden *take root.*" text="Volunteer on the land, join a consultation, or partner with us on this site.">
        <Btn href="/get-involved" variant="cream">
          Get Involved
        </Btn>
        <Link href="/land-and-gardens" className="btn btn--line-light btn--plain">
          <span>All sites</span>
        </Link>
      </Cta>
    </article>
  )
}
