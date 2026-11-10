import type { Metadata } from 'next'
import type { CSSProperties } from 'react'

import { Cta } from '@/components/Cta'
import { Btn, Eyebrow, Marquee, PageHero, pad2, Photo, SectionHead, Words } from '@/components/ui'
import { listPartners, listPeople, listTopics } from '@/lib/queries'
import { DESCRIPTION } from '@/lib/site'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Our Roots',
  description: DESCRIPTION,
  alternates: { canonical: '/our-roots' },
}

const VALUES = [
  { title: 'Food Sovereignty', text: 'Communities deciding what they grow, eat, and share — on their own terms.' },
  { title: 'Cultural Preservation', text: 'Keeping heritage crops, recipes, music, and stories alive and visible.' },
  { title: 'Environmental Stewardship', text: 'Caring for soil, water, and pollinators with regenerative practices.' },
  { title: 'Collective Empowerment', text: 'Shared ownership, shared leadership, and shared harvests.' },
]

export default async function OurRootsPage() {
  const [people, partners, topics] = await Promise.all([listPeople(), listPartners(), listTopics()])
  const heritageTopic = topics.find((t) => t.slug === 'african-agricultural-heritage')

  return (
    <>
      <PageHero id="roots-title" eyebrow="Our Roots" title="Rooted in *ancestral knowledge.* Growing *food sovereignty.*" intro={DESCRIPTION} />

      <section className="wrap sec" aria-labelledby="why-title">
        <div className="split split--even" style={{ alignItems: 'center' }}>
          <div data-reveal style={{ position: 'relative', aspectRatio: '4 / 5', borderRadius: '2rem', overflow: 'hidden' }}>
            <Photo tone="clay" art="voices" style={{ position: 'absolute', inset: 0 }} />
          </div>
          <div>
            <Eyebrow>Why we exist</Eyebrow>
            <Words id="why-title" className="h-lg mt-6" text="Land holds *memory.* We help communities return to it." />
            <div className="stack mt-8" style={{ '--gap': '1.25rem' } as CSSProperties} data-reveal>
              <p className="lead lead--sm">
                For many Black and diasporic families, farming is ancestral knowledge — carried across oceans, through displacement, and into cities where land access is rare. In Vancouver, places like Hogan’s Alley remind us how quickly community spaces can disappear.
              </p>
              <p className="lead lead--sm">
                FARE Farms creates places where that knowledge can take root again: gardens, gathering spaces, and cultural landmarks designed with community, for community — while learning from the responsibilities of stewardship on Indigenous lands.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Marquee items={['Land', 'Food', 'Culture', 'Community', 'Heritage']} tone="soil" />

      <section className="wrap sec" aria-labelledby="values-title">
        <Eyebrow id="values-title">Our values</Eyebrow>
        <ul className="cells cells--2 mt-12" data-reveal>
          {VALUES.map((v, i) => (
            <li key={v.title} className="cell cell--lg cell--hover">
              <span className="cell__no">{pad2(i + 1)}</span>
              <h3 className="h-md mt-4">{v.title}</h3>
              <p className="soft mt-3 mw-md">{v.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="on-leaf grain sec" aria-labelledby="hist-title">
        <div className="mudcloth layer" aria-hidden="true" />
        <div className="wrap">
          <SectionHead
            eyebrow="We stand on their shoulders"
            id="hist-title"
            title="Black growers who *shaped the soil.*"
            intro="Growers, organizers and community builders whose work shaped the land — and the spaces we gather in. Each profile is sourced and reviewed."
          />
          {people.length ? (
            <div className="cols cols--2">
              {people.map((p, i) => (
                <article key={p.id} className="person" data-reveal style={{ '--d': `${(i % 2) * 0.08}s` } as CSSProperties}>
                  {p.years ? <p className="person__years">{p.years}</p> : null}
                  <h3 className="person__name">{p.name}</h3>
                  {p.role ? <p className="person__role">{p.role}</p> : null}
                  <p className="person__bio">{p.bio}</p>
                  {p.review?.sources?.length ? (
                    <p className="person__src">
                      Sources:{' '}
                      {p.review.sources.map((s, si) => (
                        <span key={`${s.citation}-${si}`}>
                          {si > 0 ? '; ' : ''}
                          {s.url ? (
                            <a href={s.url} rel="noopener noreferrer">
                              {s.citation}
                            </a>
                          ) : (
                            s.citation
                          )}
                        </span>
                      ))}
                    </p>
                  ) : null}
                  {p.image?.credit ? <p className="person__src">Image: {p.image.credit}</p> : null}
                </article>
              ))}
            </div>
          ) : (
            <p className="soft">These profiles are being sourced and reviewed.</p>
          )}
        </div>
      </section>

      <section className="wrap sec" aria-labelledby="heritage-title">
        <div className="split" style={{ alignItems: 'end' }}>
          <div>
            <Eyebrow>In the Knowledge Library</Eyebrow>
            <Words id="heritage-title" className="h-xl mt-6" text="African agricultural *heritage.*" />
          </div>
          <div className="stack" style={{ '--gap': '1.5rem', alignItems: 'flex-start' } as CSSProperties} data-reveal>
            <p className="lead">
              Region-specific histories of African farming traditions — each article sourced, credited, and reviewed with the communities it describes.
            </p>
            <Btn href={heritageTopic ? `/learn?topic=${heritageTopic.slug}#results` : '/learn'} variant="leaf">
              Explore heritage articles
            </Btn>
          </div>
        </div>
      </section>

      {partners.length ? (
        <section className="on-muted sec" aria-labelledby="partners-title">
          <div className="wrap">
            <SectionHead
              eyebrow="Partners"
              id="partners-title"
              title="Growing *together.*"
              action={
                <Btn href="/get-involved#partner" variant="line">
                  Become a partner
                </Btn>
              }
            />
            <ul className="cols cols--3" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {partners.map((p, i) => (
                <li key={p.id} className="card" data-reveal style={{ '--d': `${(i % 3) * 0.08}s` } as CSSProperties}>
                  {p.logo?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.logo.url} alt={p.logo.alt ?? `${p.name} logo`} style={{ height: 56, width: 'auto', objectFit: 'contain', marginBottom: '1.25rem' }} />
                  ) : null}
                  <h3 className="card__title">
                    {p.url ? (
                      <a href={p.url} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        {p.name}
                      </a>
                    ) : (
                      p.name
                    )}
                  </h3>
                  {p.relationship ? <p className="kicker mt-2">{p.relationship}</p> : null}
                  {p.description ? <p className="soft mt-3">{p.description}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <Cta />
    </>
  )
}
