import type { Metadata } from 'next'
import Link from 'next/link'
import type { CSSProperties } from 'react'

import { Eyebrow, Furrows, LinkArrow, Photo } from '@/components/ui'
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
      <section className="theme-forest furrows" aria-labelledby="roots-title">
        <Furrows />
        <div className="container row" style={{ paddingBlock: 'clamp(48px, 5vw, 80px) clamp(64px, 7vw, 96px)', gap: '48px 64px' }}>
          <div className="stack" style={{ flex: '1 1 600px', minWidth: 0, gap: 24 }}>
            <Eyebrow>Our roots</Eyebrow>
            <h1 id="roots-title" className="h1" style={{ display: 'flex', flexDirection: 'column', fontSize: 'clamp(40px, 4.2vw, 60px)', marginTop: -6 }}>
              <span>Rooted in Ancestral Knowledge.</span>
              <span className="accent">Growing Food Sovereignty.</span>
            </h1>
            <p className="lede">{DESCRIPTION}</p>
          </div>
          <div style={{ flex: '0 1 360px', minWidth: 0, position: 'relative', paddingTop: 24 }}>
            <span className="sun" aria-hidden="true" style={{ top: 0, right: -20, width: 150, height: 150 }} />
            <div style={{ position: 'relative' }}>
              <Photo arch dark height="clamp(320px, 30vw, 440px)" />
            </div>
          </div>
        </div>
      </section>

      <section className="theme-cream section" aria-labelledby="why-title">
        <div className="container row" style={{ alignItems: 'flex-start', gap: '28px 72px' }}>
          <div style={{ flex: '1 1 480px', minWidth: 0 }}>
            <Eyebrow>Why we exist</Eyebrow>
            <h2 id="why-title" className="h2">
              Land holds memory. <span className="accent">We help communities return to it.</span>
            </h2>
          </div>
          <div className="stack" style={{ flex: '1 1 440px', minWidth: 0, gap: 16, fontSize: 18, color: 'var(--body-text)' }}>
            <p style={{ margin: 0 }}>
              For many Black and diasporic families, farming is ancestral knowledge — carried across oceans, through displacement, and into cities where land access is rare. In Vancouver, places like Hogan’s Alley remind us how quickly community spaces can disappear.
            </p>
            <p style={{ margin: 0 }}>
              FARE Farms creates places where that knowledge can take root again: gardens, gathering spaces, and cultural landmarks that are designed with community, for community — while learning from the responsibilities of stewardship on Indigenous lands.
            </p>
          </div>
        </div>
      </section>

      <section className="theme-paper section" aria-labelledby="values-title">
        <div className="container">
          <h2 id="values-title" className="h2" style={{ marginBottom: 36, fontSize: 'clamp(34px, 3.6vw, 52px)' }}>Our values</h2>
          <div className="grid" style={{ '--min': '260px', '--gap': '32px' } as CSSProperties}>
            {VALUES.map((v, i) => (
              <div key={v.title} className="stack stat-rule" style={{ gap: 10 }}>
                <span className="tiny accent" style={{ fontWeight: 600 }}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className="h3" style={{ fontSize: 27 }}>{v.title}</h3>
                <p className="body-muted" style={{ margin: 0 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-soil section" aria-labelledby="hist-title">
        <div className="container">
          <div className="split mt-section-head">
            <div className="split__main">
              <Eyebrow>Black farming histories</Eyebrow>
              <h2 id="hist-title" className="h2">
                We stand on <span className="accent">their shoulders.</span>
              </h2>
            </div>
            <p className="split__side body-muted" style={{ fontSize: 18 }}>
              Black growers and community builders who shaped the soil — and the spaces we gather in.
            </p>
          </div>
          {people.length ? (
            <ol className="rule-list">
              {people.map((p) => (
                <li key={p.id} className="row" style={{ alignItems: 'flex-start', gap: '20px 40px', padding: '30px 0' }}>
                  <div style={{ flex: '0 0 104px' }}>
                    <Photo media={p.image} dark height="104px" showCredit={false} className="round" />
                  </div>
                  <div className="stack" style={{ flex: '0 1 260px', minWidth: 0, gap: 4 }}>
                    {p.years ? <span className="tiny accent" style={{ fontWeight: 600 }}>{p.years}</span> : null}
                    <h3 className="h3" style={{ fontSize: 30 }}>{p.name}</h3>
                    {p.role ? <span className="small body-muted">{p.role}</span> : null}
                  </div>
                  <div className="stack" style={{ flex: '1 1 380px', minWidth: 0, gap: 10 }}>
                    <p style={{ margin: 0, fontSize: 18 }}>{p.bio}</p>
                    {p.review?.sources?.length ? (
                      <p className="tiny" style={{ margin: 0, color: 'rgba(244,237,225,0.8)' }}>
                        Sources:{' '}
                        {p.review.sources.map((s, i) => (
                          <span key={`${s.citation}-${i}`}>
                            {i > 0 ? '; ' : ''}
                            {s.url ? (
                              <a href={s.url} rel="noopener noreferrer" style={{ color: 'var(--marigold)' }}>{s.citation}</a>
                            ) : (
                              s.citation
                            )}
                          </span>
                        ))}
                      </p>
                    ) : null}
                    {p.image?.credit ? <p className="tiny" style={{ margin: 0, color: 'rgba(244,237,225,0.8)' }}>Image: {p.image.credit}</p> : null}
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="body-muted">These profiles are being sourced and reviewed.</p>
          )}
        </div>
      </section>

      <section className="theme-cream section" aria-labelledby="heritage-title">
        <div className="container split" style={{ alignItems: 'center' }}>
          <div className="split__main stack" style={{ gap: 18, alignItems: 'flex-start' }}>
            <Eyebrow>In the Knowledge Library</Eyebrow>
            <h2 id="heritage-title" className="h2" style={{ fontSize: 'clamp(34px, 3.6vw, 52px)', marginTop: -18 }}>African agricultural heritage</h2>
            <p className="body-muted" style={{ fontSize: 18, maxWidth: 560 }}>
              Region-specific histories of African farming traditions — each article sourced, credited, and reviewed with the communities it describes.
            </p>
            <LinkArrow href={heritageTopic ? `/learn?topic=${heritageTopic.slug}#results` : '/learn'}>Explore heritage articles</LinkArrow>
          </div>
        </div>
      </section>

      {partners.length ? (
        <section className="theme-paper section" aria-labelledby="partners-title">
          <div className="container">
            <div className="split mt-section-head">
              <h2 id="partners-title" className="h2" style={{ fontSize: 'clamp(34px, 3.6vw, 52px)' }}>Growing with partners</h2>
              <Link href="/get-involved#partner" className="link-arrow">Become a partner</Link>
            </div>
            <ul className="grid" style={{ listStyle: 'none', margin: 0, padding: 0, '--min': '240px' } as CSSProperties}>
              {partners.map((p) => (
                <li key={p.id} className="card stack" style={{ padding: 22, gap: 12 }}>
                  {p.logo?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.logo.url} alt={p.logo.alt ?? `${p.name} logo`} style={{ height: 56, width: 'auto', objectFit: 'contain', alignSelf: 'flex-start' }} />
                  ) : null}
                  <span className="h4">{p.url ? <a href={p.url} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{p.name}</a> : p.name}</span>
                  {p.relationship ? <span className="tiny" style={{ color: 'var(--muted)' }}>{p.relationship}</span> : null}
                  {p.description ? <span className="small" style={{ color: 'var(--body-text)' }}>{p.description}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  )
}
