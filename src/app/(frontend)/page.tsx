import Link from 'next/link'
import type { CSSProperties } from 'react'

import { CropCard, EventTicket, SiteCard } from '@/components/cards'
import { JsonLd } from '@/components/JsonLd'
import { ArrowIcon, Eyebrow, Furrows, LinkArrow, Photo, SectionHead, SeedIcon } from '@/components/ui'
import { getHomePage, getMarketplace, getSiteSettings, listCrops, listEvents, listFeaturedResources, listProjects } from '@/lib/queries'
import { DESCRIPTION, RESOURCE_TYPE_LABELS, SITE_NAME, SITE_URL } from '@/lib/site'

export const revalidate = 300

const PILLARS = [
  { verb: 'Learn', text: 'Discover agricultural heritage.', cta: 'Knowledge Library', href: '/learn', color: 'c-forest' },
  { verb: 'Grow', text: 'Learn culturally meaningful growing practices.', cta: 'Growing guides', href: '/learn#growing-calendar', color: 'c-clay' },
  { verb: 'Preserve', text: 'Care for the land.', cta: 'Land stewardship', href: '/land-and-gardens#stewardship', color: 'c-marigold' },
  { verb: 'Share', text: 'Build community.', cta: 'Events & community', href: '/events', color: 'c-soil' },
]

const FOCUS = ['Agricultural knowledge', 'Food sovereignty', 'Cultural preservation', 'Community stewardship']

export default async function HomePage() {
  const [home, settings, market, crops, resources, projects, events] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getMarketplace(),
    listCrops(),
    listFeaturedResources(3),
    listProjects(),
    listEvents({ limit: 3 }),
  ])
  const ancestral = home.headline === 'ancestral'

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
          description: DESCRIPTION,
          email: settings.contactEmail,
          areaServed: 'Vancouver, BC',
        }}
      />

      {/* Hero */}
      <section className="theme-forest furrows" aria-labelledby="hero-title">
        <Furrows />
        <div className="container row" style={{ paddingBlock: 'clamp(40px, 5vw, 72px) clamp(64px, 7vw, 104px)', gap: '48px 64px' }}>
          <div className="stack" style={{ flex: '1 1 560px', minWidth: 0, alignItems: 'flex-start', gap: 26 }}>
            <p className="eyebrow eyebrow--pill">
              <SeedIcon color="#E3A93C" /> Afro-Indigenous-centred land &amp; food initiative — Vancouver
            </p>
            <h1 id="hero-title" className={`display ${ancestral ? 'h1' : 'h1 h1--hero'}`} style={{ display: 'flex', flexDirection: 'column' }}>
              <span>{ancestral ? 'Rooted in Ancestral Knowledge.' : 'Rooted in Culture.'}</span>
              <span className="accent">{ancestral ? 'Growing Food Sovereignty.' : 'Growing Our Future.'}</span>
            </h1>
            <p className="lede">{home.heroIntro}</p>
            <div className="row">
              <Link href="/learn" className="btn btn--primary">
                Explore the Knowledge Library <ArrowIcon size={17} />
              </Link>
              <Link href="/get-involved" className="btn btn--outline">
                Get Involved
              </Link>
            </div>
          </div>
          <div style={{ flex: '0 1 420px', minWidth: 0, position: 'relative', paddingTop: 28 }}>
            <span className="sun" aria-hidden="true" style={{ top: 0, right: -24, width: 180, height: 180 }} />
            <div style={{ position: 'relative' }}>
              <Photo media={home.heroImage} arch dark height="clamp(380px, 38vw, 540px)" priority />
            </div>
          </div>
        </div>
      </section>

      {/* Focus band */}
      <div className="theme-marigold">
        <ul
          className="container row"
          aria-label="What we advance"
          style={{ listStyle: 'none', margin: '0 auto', paddingBlock: 22, justifyContent: 'center', gap: '10px 36px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(19px, 1.8vw, 25px)' }}
        >
          {FOCUS.map((f) => (
            <li key={f} className="row" style={{ gap: 14 }}>
              <SeedIcon size={16} color="#1F4D35" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Our roots run deep + Learn. Grow. Preserve. Share. */}
      <section className="theme-cream section" aria-labelledby="roots-title">
        <div className="container">
          <div className="split">
            <div className="split__main">
              <Eyebrow>Our roots</Eyebrow>
              <h2 id="roots-title" className="h2 h2--xl">
                Our roots <span className="accent">run deep.</span>
              </h2>
            </div>
            <div className="split__side stack" style={{ '--gap': '18px' } as CSSProperties}>
              <p className="body-muted" style={{ fontSize: 18 }}>{home.rootsBody}</p>
              <LinkArrow href="/our-roots">Read about our roots</LinkArrow>
            </div>
          </div>

          <div className="split" style={{ marginTop: 'clamp(56px, 6vw, 88px)', borderTop: '2px solid var(--ink)', paddingTop: 22, alignItems: 'baseline' }}>
            <h2 className="h3" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)' }}>Learn. Grow. Preserve. Share.</h2>
            <p className="body-muted" style={{ maxWidth: 560 }}>{home.pillarsIntro}</p>
          </div>
          <div className="grid" style={{ marginTop: 28, '--min': '250px' } as CSSProperties}>
            {PILLARS.map((p, i) => (
              <Link key={p.verb} href={p.href} className={`pillar ${p.color}`}>
                <span className="tiny" style={{ fontWeight: 600 }}>{String(i + 1).padStart(2, '0')}</span>
                <span className="stack" style={{ gap: 8 }}>
                  <span className="pillar__verb">{p.verb}</span>
                  <span style={{ fontSize: 16, lineHeight: 1.45 }}>{p.text}</span>
                  <span className="row" style={{ gap: 8, fontWeight: 600, fontSize: 15, marginTop: 6 }}>
                    {p.cta} <ArrowIcon size={15} />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* From seed to story */}
      <section className="theme-paper section" aria-labelledby="seed-title">
        <div className="container">
          <SectionHead eyebrow="Heritage crop directory" id="seed-title" title={<>From seed <span className="accent">to story.</span></>} intro={home.seedToStoryIntro} />
          {crops.length ? (
            <div className="grid" style={{ '--min': '200px' } as CSSProperties}>
              {crops.slice(0, 5).map((c, i) => (
                <CropCard key={c.id} crop={c} index={i} />
              ))}
            </div>
          ) : (
            <p className="body-muted">Crop profiles are being researched and reviewed with community growers. Check back soon.</p>
          )}
          {resources.length ? (
            <div className="row" style={{ marginTop: 48, alignItems: 'flex-start', gap: '24px 56px' }}>
              <div style={{ flex: '0 1 300px' }}>
                <h3 className="h4" style={{ fontSize: 26, marginBottom: 8 }}>Featured from the library</h3>
                <LinkArrow href="/learn">Browse the Knowledge Library</LinkArrow>
              </div>
              <ul className="rule-list" style={{ flex: '1 1 560px', minWidth: 0, '--rule': 'rgba(30,26,22,0.2)' } as CSSProperties}>
                {resources.map((r) => (
                  <li key={r.id}>
                    <Link href={`/learn/${r.slug}`} className="row" style={{ padding: '16px 0', gap: '8px 20px', textDecoration: 'none' }}>
                      <span className="tiny" style={{ flex: '0 0 120px', color: 'var(--clay)', fontWeight: 600 }}>{RESOURCE_TYPE_LABELS[r.type] ?? r.type}</span>
                      <span className="h4" style={{ flex: '1 1 260px', minWidth: 0 }}>{r.title}</span>
                      {r.readingTime ? <span className="tiny" style={{ color: 'var(--muted)' }}>{r.readingTime}</span> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {/* Living classrooms */}
      <section className="theme-forest section" aria-labelledby="gardens-title">
        <div className="container">
          <SectionHead
            eyebrow="Land & gardens"
            id="gardens-title"
            title={<>Our gardens are <span className="accent">living classrooms.</span></>}
            intro={home.gardensIntro}
            action={<LinkArrow href="/land-and-gardens">Explore Land &amp; Gardens</LinkArrow>}
          />
          {projects.length ? (
            <div className="grid" style={{ '--min': '250px', '--gap': '32px 20px' } as CSSProperties}>
              {projects.slice(0, 4).map((p) => (
                <SiteCard key={p.id} project={p} dark />
              ))}
            </div>
          ) : (
            <p className="body-muted">Site details are being confirmed with our partners.</p>
          )}
        </div>
      </section>

      {/* Events */}
      <section className="theme-cream section" aria-labelledby="events-title">
        <div className="container">
          <SectionHead eyebrow="Events & community" id="events-title" title="Gather on the land." action={<LinkArrow href="/events">Full calendar</LinkArrow>} />
          {events.length ? (
            <div className="stack" style={{ gap: 14 }}>
              {events.map((e) => (
                <EventTicket key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <p className="body-muted">New gatherings are being planned. Join the newsletter below to hear first.</p>
          )}
        </div>
      </section>

      {/* Marketplace teaser */}
      <section className="theme-soil section" aria-labelledby="market-title">
        <div className="container row" style={{ gap: '40px 72px' }}>
          <div className="stack" style={{ flex: '1 1 480px', minWidth: 0, alignItems: 'flex-start', gap: 22 }}>
            <span className="pill pill--marigold">Coming soon</span>
            <h2 id="market-title" className="h2 h2--xl">FARE Marketplace</h2>
            <p className="lede" style={{ maxWidth: 520 }}>{market.intro}</p>
            <div className="row">
              <Link href="/marketplace#updates" className="btn btn--primary">Get marketplace updates</Link>
              <Link href="/marketplace#producers" className="btn btn--outline">I’m a grower or maker</Link>
            </div>
          </div>
          <ul className="row" style={{ flex: '1 1 420px', minWidth: 0, listStyle: 'none', margin: 0, padding: 0, gap: 10 }}>
            {(market.categories ?? []).map((c) => (
              <li key={c.label} className="row" style={{ gap: 10, padding: '14px 20px', borderRadius: 999, border: '1px solid rgba(244,237,225,0.3)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 19 }}>
                <SeedIcon size={14} color="#E3A93C" />
                {c.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Get involved */}
      <section className="theme-marigold section" aria-labelledby="cta-title">
        <div className="container stack" style={{ alignItems: 'flex-start', gap: 22 }}>
          <h2 id="cta-title" className="display" style={{ fontSize: 'clamp(40px, 5vw, 76px)', lineHeight: 1.02, maxWidth: 900 }}>
            There’s room for you in the garden.
          </h2>
          <p style={{ margin: 0, fontSize: 19, maxWidth: 560 }}>Volunteer, partner, or contribute knowledge — every pair of hands helps something grow.</p>
          <div className="row">
            <Link href="/get-involved" className="btn btn--dark">
              Get Involved <ArrowIcon size={17} />
            </Link>
            <Link href="/get-involved#contribute" className="btn btn--outline">
              Share your knowledge
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
