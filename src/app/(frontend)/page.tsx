import Link from 'next/link'
import type { CSSProperties } from 'react'

import { CropCard, EventRow, GardenCard, StoryCard } from '@/components/cards'
import { JsonLd } from '@/components/JsonLd'
import { Pollen } from '@/components/Pollen'
import { SeasonCalendar } from '@/components/SeasonCalendar'
import { SeedGame } from '@/components/SeedGame'
import { Btn, Eyebrow, Icon, Marquee, SectionHead, SproutMark, Words } from '@/components/ui'
import { getHomePage, getMarketplace, getSiteSettings, listCrops, listEvents, listFeaturedResources, listProjects, listStories } from '@/lib/queries'
import { DESCRIPTION, RESOURCE_TYPE_LABELS, SITE_NAME, SITE_URL } from '@/lib/site'

export const revalidate = 300

const PILLARS = [
  { verb: 'Learn', text: 'Discover agricultural heritage.', cta: 'Knowledge Library', href: '/learn' },
  { verb: 'Grow', text: 'Learn culturally meaningful growing practices.', cta: 'Growing guides', href: '/learn#growing-calendar' },
  { verb: 'Preserve', text: 'Care for the land.', cta: 'Land stewardship', href: '/land-and-gardens#stewardship' },
  { verb: 'Share', text: 'Build community.', cta: 'Events & community', href: '/events' },
]

const FOCUS = ['Agricultural Knowledge', 'Food Sovereignty', 'Cultural Preservation', 'Community Stewardship']

/** Sprouts along the horizon of the placeholder hero scene. */
const HorizonCrops = () => (
  <svg className="scene__crops" viewBox="0 0 1440 240" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    {Array.from({ length: 26 }, (_, i) => {
      const x = 20 + i * 56 + (i % 3) * 9
      const h = 70 + ((i * 37) % 90)
      const y = 240
      return (
        <g key={i} fill="currentColor">
          <path d={`M${x} ${y} V${y - h}`} stroke="currentColor" strokeWidth="4" />
          <path d={`M${x} ${y - h * 0.55} C${x - 30} ${y - h * 0.55} ${x - 44} ${y - h * 0.8} ${x - 44} ${y - h} C${x - 14} ${y - h} ${x} ${y - h * 0.8} ${x} ${y - h * 0.55}Z`} />
          <path d={`M${x} ${y - h * 0.75} C${x + 26} ${y - h * 0.75} ${x + 40} ${y - h * 0.95} ${x + 40} ${y - h - 16} C${x + 12} ${y - h - 16} ${x} ${y - h * 0.95} ${x} ${y - h * 0.75}Z`} opacity=".8" />
        </g>
      )
    })}
    <rect x="0" y="228" width="1440" height="12" fill="currentColor" />
  </svg>
)

export default async function HomePage() {
  const [home, settings, market, crops, resources, projects, events, stories] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getMarketplace(),
    listCrops(),
    listFeaturedResources(3),
    listProjects(),
    listEvents({ limit: 3 }),
    listStories(),
  ])
  const ancestral = home.headline === 'ancestral'
  const lines = ancestral ? ['Rooted in', 'Ancestral Knowledge.', 'Growing Food Sovereignty.'] : ['Rooted in Culture.', 'Growing Our Future.']

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
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__bg" aria-hidden="true">
          {home.heroImage?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={home.heroImage.url} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div className="scene">
              <div className="scene__sun" />
              <div className="scene__field" />
              <HorizonCrops />
            </div>
          )}
          <div className="hero__shade" />
        </div>
        <Pollen />
        <div className="hero__content">
          <p className="tag-pill tag-pill--glass hero__fade">
            <span className="tag-pill__dot" aria-hidden="true" />
            Afro-Indigenous agricultural heritage · Vancouver
          </p>
          <h1 id="hero-title" className="hero__title h-hero">
            {lines.map((line, i) => (
              <span key={line}>
                <span className={i === 1 ? 'sunline' : undefined} style={{ '--i': i } as CSSProperties}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <div className="hero__foot hero__fade">
            <p className="hero__intro">{home.heroIntro}</p>
            <div className="row">
              <Btn href="/learn" variant="sun">
                Explore the Knowledge Library
              </Btn>
              <Btn href="/get-involved" variant="line-light">
                Get Involved
              </Btn>
            </div>
          </div>
        </div>
        <a href="#roots" className="hero__scroll">
          <Icon name="arrow-down" size={20} />
          <span className="sr-only">Scroll to introduction</span>
        </a>
      </section>

      <Marquee items={FOCUS} tilt />

      {/* Our roots run deep + Learn. Grow. Preserve. Share. */}
      <section id="roots" className="wrap sec" aria-labelledby="roots-title">
        <div className="split">
          <div>
            <Eyebrow>Our roots</Eyebrow>
            <Words id="roots-title" className="h-xl mt-6" text="Our roots *run deep.*" />
          </div>
          <div className="stack" style={{ justifyContent: 'flex-end', '--gap': '2rem' } as CSSProperties}>
            <p className="lead" data-reveal>
              {home.rootsBody}
            </p>
            <div data-reveal>
              <Btn href="/our-roots" variant="line">
                Read about our roots
              </Btn>
            </div>
          </div>
        </div>

        <div className="head mt-20" style={{ marginBottom: '2rem' }}>
          <h3 className="h-sm">Learn. Grow. Preserve. Share.</h3>
          <p className="soft mw-lg" data-reveal>
            {home.pillarsIntro}
          </p>
        </div>
        <ul className="cells cells--4" data-reveal>
          {PILLARS.map((p) => (
            <li key={p.verb} style={{ display: 'flex' }}>
              <Link href={p.href} className="cell" style={{ flex: 1 }}>
                <span className="cell__big">{p.verb}</span>
                <span className="mt-3 soft">{p.text}</span>
                <span className="cell__go">
                  {p.cta} <Icon name="arrow-up-right" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* From seed to story */}
      <section className="on-leaf grain sec" aria-labelledby="seed-title">
        <div className="mudcloth layer" aria-hidden="true" />
        <div className="wrap">
          <SectionHead
            eyebrow="Heritage crop directory"
            id="seed-title"
            title="From seed *to story.*"
            intro={home.seedToStoryIntro}
            action={
              <Btn href="/learn/crops" variant="line-light">
                All crop profiles
              </Btn>
            }
          />
          {crops.length ? (
            <div className="cols cols--3">
              {crops.slice(0, 3).map((c, i) => (
                <CropCard key={c.id} crop={c} index={i} />
              ))}
            </div>
          ) : (
            <p className="soft">Crop profiles are being researched and reviewed with community growers. Check back soon.</p>
          )}

          {resources.length ? (
            <div className="split mt-20" style={{ alignItems: 'start' }}>
              <div data-reveal>
                <p className="label" style={{ color: 'var(--sun)' }}>
                  From the Knowledge Library
                </p>
                <p className="h-sm mt-4">Sourced, credited and reviewed with community.</p>
                <div className="mt-6">
                  <Btn href="/learn" variant="sun">
                    Browse the library
                  </Btn>
                </div>
              </div>
              <ul className="lines" data-reveal>
                {resources.map((r, i) => (
                  <li key={r.id}>
                    <Link href={`/learn/${r.slug}`} className="lines__row">
                      <span className="lines__no">{String(i + 1).padStart(2, '0')}</span>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span className="small" style={{ color: 'var(--sun)', fontWeight: 600 }}>
                          {RESOURCE_TYPE_LABELS[r.type] ?? r.type}
                          {r.readingTime ? ` · ${r.readingTime}` : ''}
                        </span>
                        <span className="lines__title" style={{ display: 'block', marginTop: '0.25rem' }}>
                          {r.title}
                        </span>
                      </span>
                      <Icon name="arrow-up-right" size={20} style={{ alignSelf: 'center' }} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {/* Plant a seed */}
      <section className="wrap sec" aria-label="Plant a seed">
        <SeedGame />
      </section>

      {/* Living classrooms */}
      <section className="wrap sec sec--top0" aria-labelledby="gardens-title">
        <SectionHead
          eyebrow="Land & gardens"
          id="gardens-title"
          title="Our gardens are *living classrooms.*"
          intro={home.gardensIntro}
          action={
            <Btn href="/land-and-gardens" variant="line">
              All sites
            </Btn>
          }
        />
        {projects.length ? (
          <div className="cols cols--2" style={{ '--gap': '3rem 1.5rem' } as CSSProperties}>
            {projects.slice(0, 2).map((p, i) => (
              <GardenCard key={p.id} project={p} index={i} />
            ))}
          </div>
        ) : (
          <p className="soft">Site details are being confirmed with our partners.</p>
        )}
      </section>

      {/* The growing year */}
      <section id="growing-year" className="wrap sec sec--top0" aria-labelledby="year-title">
        <Eyebrow>The growing year</Eyebrow>
        <Words id="year-title" className="h-xl mt-6" text="Follow the seasons *with us.*" style={{ marginBottom: '3rem' }} />
        <SeasonCalendar />
      </section>

      {/* Events */}
      <section className="on-muted sec" aria-labelledby="events-title">
        <div className="wrap">
          <SectionHead
            eyebrow="Upcoming"
            id="events-title"
            title="Gather on *the land.*"
            action={
              <Btn href="/events" variant="line">
                Full calendar
              </Btn>
            }
          />
          {events.length ? (
            <ol className="events">
              {events.map((e) => (
                <EventRow key={e.id} event={e} />
              ))}
            </ol>
          ) : (
            <p className="soft">New gatherings are being planned. Join the newsletter below to hear first.</p>
          )}
        </div>
      </section>

      {/* Voices — only stories shared with documented consent */}
      {stories.length ? (
        <section className="wrap sec" aria-labelledby="voices-title">
          <Eyebrow id="voices-title">Voices from the garden</Eyebrow>
          <div className="cols cols--3 mt-12">
            {stories.slice(0, 3).map((s, i) => (
              <StoryCard key={s.id} story={s} index={i} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Marketplace teaser */}
      <section className="on-soil grain sec" aria-labelledby="market-title">
        <div className="mudcloth layer" style={{ '--o': 0.04 } as CSSProperties} aria-hidden="true" />
        <div className="wrap split" style={{ alignItems: 'end' }}>
          <div>
            <span className="tag">Coming soon</span>
            <Words id="market-title" className="h-xl mt-6" text="FARE *Marketplace*" />
            <p className="lead mt-6 mw-lg" data-reveal>
              {market.intro}
            </p>
            <div className="row mt-8" data-reveal>
              <Btn href="/marketplace#updates" variant="sun">
                Get marketplace updates
              </Btn>
              <Btn href="/marketplace#producers" variant="line-light">
                I’m a grower or maker
              </Btn>
            </div>
          </div>
          <ul className="chip-list" data-reveal style={{ color: 'var(--cream)' }}>
            {(market.categories ?? []).map((c) => (
              <li key={c.label} className="chip" style={{ fontSize: '1.0625rem' }}>
                <SproutMark className="marquee__sprout" />
                {c.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Get involved */}
      <div className="cta-wrap">
        <section className="cta grain" aria-labelledby="cta-title">
          <div className="mudcloth layer" style={{ '--o': 0.07 } as CSSProperties} aria-hidden="true" />
          <div className="cta__grid">
            <Words id="cta-title" className="h-cta" text="There’s room for you *in the garden.*" />
            <div className="stack" style={{ '--gap': '1.5rem' } as CSSProperties} data-reveal>
              <p className="cta__text">Volunteer, partner, or contribute knowledge — every pair of hands helps something grow.</p>
              <div className="row">
                <Btn href="/get-involved" variant="cream">
                  Get Involved
                </Btn>
                <Btn href="/get-involved#contribute" variant="line-light">
                  Share your knowledge
                </Btn>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
