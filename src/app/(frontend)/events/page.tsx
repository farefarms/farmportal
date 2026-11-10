import type { Metadata } from 'next'
import Link from 'next/link'

import { EventRow } from '@/components/cards'
import { Cta } from '@/components/Cta'
import { Btn, PageHero, SectionHead } from '@/components/ui'
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
      <PageHero
        id="ev-title"
        eyebrow="Events & Community"
        title="Come for the garden. *Stay for the people.*"
        intro="Workshops, harvest feasts, volunteer days, and youth labs — there’s always a reason to gather on the land."
      >
        <nav aria-label="On this page" className="row">
          <Btn href="#calendar" variant="sun" icon="arrow-down">
            See the calendar
          </Btn>
          <Btn href="/get-involved" variant="line-light">
            Volunteer
          </Btn>
        </nav>
      </PageHero>

      <section id="calendar" className="wrap sec" aria-labelledby="cal-title">
        <SectionHead
          eyebrow="Calendar"
          id="cal-title"
          title="What’s *happening.*"
          action={
            <Btn href={href({ past: !includePast })} variant="line" icon={null}>
              {includePast ? 'Hide past events' : 'Show past events'}
            </Btn>
          }
        />
        <nav aria-label="Filter by type" className="filters" style={{ marginBottom: '1.5rem' }}>
          <Link href={href({ category: '' })} className="filter" aria-current={!category ? 'true' : undefined}>
            All
          </Link>
          {Object.entries(EVENT_CATEGORY_LABELS).map(([key, label]) => (
            <Link key={key} href={href({ category: key })} className="filter" aria-current={category === key ? 'true' : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        {events.length ? (
          <ol className="events">
            {events.map((e) => (
              <EventRow key={e.id} event={e} />
            ))}
          </ol>
        ) : (
          <div className="empty">
            <p className="h-md">No confirmed events here yet.</p>
            <p className="lead lead--sm mt-3 mw-xl">New gatherings are posted as soon as dates and places are confirmed. Join the newsletter to hear first.</p>
          </div>
        )}
      </section>

      <Cta id="gi-title" title="Many hands make *a harvest.*" text="Volunteer on the land, partner with us, or contribute the knowledge you carry.">
        <Btn href="/get-involved" variant="cream">
          Get Involved
        </Btn>
        <Btn href="/get-involved#contribute" variant="line-light">
          Contribute knowledge
        </Btn>
      </Cta>
    </>
  )
}
