import type { Metadata } from 'next'
import Link from 'next/link'
import type { CSSProperties } from 'react'

import { GardenCard } from '@/components/cards'
import { Cta } from '@/components/Cta'
import { Btn, Eyebrow, Icon, pad2, PageHero, SectionHead, Words } from '@/components/ui'
import { listGuides, listProjects } from '@/lib/queries'
import { PRACTICE_LABELS } from '@/lib/site'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Land & Gardens',
  description: 'Our growing spaces support hands-on education, intergenerational learning, ecological care, and cultural connection.',
  alternates: { canonical: '/land-and-gardens' },
}

const PRINCIPLES = ['Reciprocal stewardship', 'Ecological responsibility', 'Indigenous sovereignty', 'Sustainable growing practices', 'Respectful knowledge exchange']

export default async function GardensPage() {
  const [projects, guides] = await Promise.all([listProjects(), listGuides()])

  return (
    <>
      <PageHero
        id="gardens-title"
        eyebrow="Land & Gardens"
        title="Our gardens are *living classrooms.*"
        intro="Our growing spaces support hands-on education, intergenerational learning, ecological care, and cultural connection."
      >
        <nav aria-label="On this page" className="row">
          <Btn href="#sites" variant="sun" icon="arrow-down">
            Our sites
          </Btn>
          <Btn href="#stewardship" variant="line-light" icon="arrow-down">
            Land stewardship
          </Btn>
        </nav>
      </PageHero>

      <section id="sites" className="wrap sec" aria-labelledby="sites-title">
        <SectionHead eyebrow="Where we grow" id="sites-title" title="Growing *landmarks* for generations." intro="Each site is designed with community and our partners. Details appear here once they’re confirmed." />
        {projects.length ? (
          <div className="cols cols--2" style={{ '--gap': '3.5rem 1.5rem' } as CSSProperties}>
            {projects.map((p, i) => (
              <GardenCard key={p.id} project={p} index={i} small />
            ))}
          </div>
        ) : (
          <p className="soft">Site details are being confirmed with our partners.</p>
        )}
      </section>

      <section id="stewardship" className="on-soil grain sec" aria-labelledby="stew-title">
        <div className="mudcloth layer" style={{ '--o': 0.04 } as CSSProperties} aria-hidden="true" />
        <div className="wrap split">
          <div>
            <Eyebrow>Land stewardship</Eyebrow>
            <Words id="stew-title" className="h-xl mt-6" text="Afro-Indigenous *land stewardship.*" />
            <p className="lead mt-6" data-reveal>
              Exploring relationships between African-descended communities, Indigenous peoples, and the land.
            </p>
            <ol className="lines mt-10" data-reveal>
              {PRINCIPLES.map((p, i) => (
                <li key={p}>
                  <span className="lines__row">
                    <span className="lines__no">{pad2(i + 1)}</span>
                    <span className="lines__title">{p}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="stack" style={{ '--gap': '1rem', alignSelf: 'end' } as CSSProperties} data-reveal>
            <div role="note" className="notice notice--line" style={{ padding: '1.5rem' }}>
              <span>
                <span className="label" style={{ display: 'block', color: 'var(--sun)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                  How this section is built
                </span>
                This content is developed with community consultation. Nothing is published here without appropriate attribution, consent, and the cultural protocols agreed with the Nations and knowledge keepers involved.
              </span>
            </div>
            <p className="label mt-4" style={{ fontSize: '0.75rem', color: 'rgb(244 237 225 / 0.8)' }}>
              Stewardship guides
            </p>
            {guides.length ? (
              <ul className="cols cols--2" style={{ listStyle: 'none', margin: 0, padding: 0, '--gap': '0.75rem' } as CSSProperties}>
                {guides.map((g) => (
                  <li key={g.id}>
                    <Link href={`/land-and-gardens/stewardship/${g.slug}`} className="card card--dark" style={{ padding: '1.25rem', display: 'block' }}>
                      <span className="card__title" style={{ fontSize: '1.25rem', display: 'block' }}>
                        {g.title}
                      </span>
                      <span className="small mt-2 row" style={{ color: 'var(--sun)', '--gap': '0.375rem' } as CSSProperties}>
                        {PRACTICE_LABELS[g.practice] ?? g.practice} <Icon name="arrow-up-right" size={14} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="soft small">Guides on soil, water, biodiversity and reciprocal practice are in development.</p>
            )}
          </div>
        </div>
      </section>

      <Cta />
    </>
  )
}
