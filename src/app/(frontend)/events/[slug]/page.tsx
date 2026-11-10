import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { CSSProperties } from 'react'

import { RegisterForm } from '@/components/forms/Forms'
import { JsonLd } from '@/components/JsonLd'
import { RichText } from '@/components/RichText'
import { Btn, Icon, PageHero } from '@/components/ui'
import { fullDate, isPast, timeRange } from '@/lib/format'
import { getEvent } from '@/lib/queries'
import { absoluteUrl, EVENT_CATEGORY_LABELS } from '@/lib/site'

export const revalidate = 120

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const e = await getEvent(slug)
  if (!e) return { title: 'Not found' }
  return { title: e.title, description: e.summary, alternates: { canonical: `/events/${e.slug}` } }
}

export default async function EventPage({ params }: { params: Params }) {
  const { slug } = await params
  const event = await getEvent(slug)
  if (!event) notFound()
  const past = isPast(event)
  const closesAt = event.registration?.closesAt ? new Date(event.registration.closesAt) : null
  const open = !past && event.status === 'scheduled' && event.registration?.enabled !== false && !(closesAt && closesAt < new Date())
  const status = event.status === 'cancelled' ? ' · Cancelled' : event.status === 'postponed' ? ' · Postponed' : past ? ' · Past event' : ''

  return (
    <article>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: event.title,
          description: event.summary,
          startDate: event.startsAt,
          ...(event.endsAt ? { endDate: event.endsAt } : {}),
          eventStatus:
            event.status === 'cancelled'
              ? 'https://schema.org/EventCancelled'
              : event.status === 'postponed'
                ? 'https://schema.org/EventPostponed'
                : 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          location: { '@type': 'Place', name: event.location, address: event.location },
          organizer: { '@type': 'Organization', name: 'FARE Farms', url: absoluteUrl('/') },
          url: absoluteUrl(`/events/${event.slug}`),
        }}
      />
      <PageHero
        id="event-title"
        compact
        eyebrow={`${EVENT_CATEGORY_LABELS[event.category] ?? event.category}${status}`}
        title={event.title}
        intro={event.summary}
        crumbs={[{ label: 'Events', href: '/events' }, { label: event.title }]}
      >
        <ul className="row" style={{ listStyle: 'none', margin: 0, padding: 0, '--gap': '0.75rem 1.75rem', fontSize: '1.0625rem' } as CSSProperties}>
          <li style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{fullDate(event.startsAt)}</li>
          <li className="row" style={{ '--gap': '0.5rem' } as CSSProperties}>
            <Icon name="clock" size={18} style={{ color: 'var(--sun)' }} />
            {timeRange(event.startsAt, event.endsAt)}
          </li>
          <li className="row" style={{ '--gap': '0.5rem' } as CSSProperties}>
            <Icon name="map-pin" size={18} style={{ color: 'var(--sun)' }} />
            {event.location}
          </li>
        </ul>
        {!past ? (
          <div className="row mt-8">
            {open ? (
              <Btn href="#register" variant="sun" icon="arrow-down">
                Count me in
              </Btn>
            ) : null}
            <Btn href={`/events/${event.slug}/ics`} variant="line-light" icon="calendar-plus">
              Add to calendar
            </Btn>
          </div>
        ) : null}
      </PageHero>

      <div className="wrap sec">
        <div className="split" style={{ alignItems: 'start' }}>
          <div className="stack" style={{ '--gap': '2rem', minWidth: 0 } as CSSProperties}>
            <div className="prose">
              <RichText data={event.description} />
            </div>
            {event.accessibility ? (
              <div className="notice">
                <span>
                  <strong style={{ fontWeight: 600 }}>Access: </strong>
                  {event.accessibility}
                </span>
              </div>
            ) : null}
            {event.project ? (
              <p>
                Part of{' '}
                <Link href={`/land-and-gardens/${event.project.slug}`} className="link">
                  {event.project.name}
                </Link>
                .
              </p>
            ) : null}
          </div>
          <section id="register" aria-labelledby="reg-title" className="form-panel" data-reveal>
            <h2 id="reg-title" className="h-md">
              {open ? 'Count me in' : 'Registration'}
            </h2>
            <div className="mt-6">
              {open ? (
                event.registration?.externalUrl ? (
                  <Btn href={event.registration.externalUrl} variant="leaf" rel="noopener noreferrer">
                    Register on the partner site
                  </Btn>
                ) : (
                  <RegisterForm eventId={String(event.id)} />
                )
              ) : (
                <p className="soft">
                  {past ? 'This event has passed.' : event.status === 'cancelled' ? 'This event has been cancelled.' : 'Registration is closed.'}{' '}
                  <Link href="/events" className="link">
                    See upcoming events
                  </Link>
                  .
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}
