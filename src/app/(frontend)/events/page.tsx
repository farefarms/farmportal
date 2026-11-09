import type { Metadata } from 'next'
import Link from 'next/link'

import { EventTicket } from '@/components/cards'
import { Eyebrow, Furrows } from '@/components/ui'
import { listEvents } from '@/lib/queries'
import { EVENT_CATEGORY_LABELS } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Events & Community',
  description: 'Workshops, harvest feasts, volunteer days, and youth labs — there’s always a reason to gather on the land.',
  alternates: { canonical: '/events' },
}

type SearchParams = Promise<{ category?: string; past?: string }>

export default async function EventsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams
  const category = typeof sp.category === 'string' && EVENT_CATEGORY_LABELS[sp.category] ? sp.category : ''
  const includePast = sp.past === '1'
  const events = await listEvents({ category, includePast })

  const href = (next: { category?: string; past?: boolean }) => {
    const params = new URLSearchParams()
    const c = next.category ?? category
    const p = next.past ?? includePast
    if (c) params.set('category', c)
    if (p) params.set('past', '1')
    const s = params.toString()
    return s ? `/events?${s}#calendar` : '/events#calendar'
  }

  return (
    <>
      <section className="theme-forest furrows" aria-labelledby="ev-title">
        <Furrows />
        <div className="container stack" style={{ paddingBlock: 'clamp(48px, 5vw, 80px) clamp(56px, 6vw, 88px)', gap: 24 }}>
          <Eyebrow>Events &amp; community</Eyebrow>
          <h1 id="ev-title" className="h1" style={{ maxWidth: 900, marginTop: -6 }}>
            Come for the garden. <span className="accent">Stay for the people.</span>
          </h1>
          <p className="lede">Workshops, harvest feasts, volunteer days, and youth labs — there’s always a reason to gather on the land.</p>
          <nav aria-label="On this page" className="row" style={{ gap: 10 }}>
            <a href="#calendar" className="btn btn--outline btn--sm">Calendar</a>
            <Link href="/get-involved" className="btn btn--outline btn--sm">Volunteer</Link>
            <Link href="/get-involved#contribute" className="btn btn--outline btn--sm">Contribute knowledge</Link>
          </nav>
        </div>
      </section>

      <section id="calendar" className="theme-cream section" aria-labelledby="cal-title">
        <div className="container">
          <div className="split" style={{ marginBottom: 24 }}>
            <h2 id="cal-title" className="h2">What’s happening</h2>
            <Link href={href({ past: !includePast })} className="link-arrow">
              {includePast ? 'Hide past events' : 'Show past events'}
            </Link>
          </div>
          <nav aria-label="Filter by type" className="filter-bar" style={{ paddingBottom: 20, marginBottom: 20, borderBottom: '2px solid var(--ink)' }}>
            <Link href={href({ category: '' })} className="filter-chip" aria-current={!category ? 'true' : undefined}>
              All
            </Link>
            {Object.entries(EVENT_CATEGORY_LABELS).map(([key, label]) => (
              <Link key={key} href={href({ category: key })} className="filter-chip" aria-current={category === key ? 'true' : undefined}>
                {label}
              </Link>
            ))}
          </nav>
          {events.length ? (
            <ol className="stack" style={{ listStyle: 'none', margin: 0, padding: 0, gap: 14 }}>
              {events.map((e) => (
                <li key={e.id}>
                  <EventTicket event={e} />
                </li>
              ))}
            </ol>
          ) : (
            <div className="empty stack" style={{ gap: 12, alignItems: 'flex-start' }}>
              <p className="h4" style={{ margin: 0 }}>No confirmed events here yet.</p>
              <p className="body-muted">New gatherings are posted as soon as dates and places are confirmed. Join the newsletter to hear first.</p>
            </div>
          )}
        </div>
      </section>

      <section className="theme-marigold section--tight" aria-labelledby="gi-title">
        <div className="container split" style={{ alignItems: 'center' }}>
          <div className="split__main">
            <h2 id="gi-title" className="display" style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: 1.05, marginBottom: 10 }}>
              Many hands make a harvest.
            </h2>
            <p style={{ margin: 0, fontSize: 18, maxWidth: 560 }}>Volunteer on the land, partner with us, or contribute the knowledge you carry.</p>
          </div>
          <Link href="/get-involved" className="btn btn--dark">Get involved</Link>
        </div>
      </section>
    </>
  )
}
