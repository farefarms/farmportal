import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { RegisterForm } from '@/components/forms/Forms'
import { JsonLd } from '@/components/JsonLd'
import { RichText } from '@/components/RichText'
import { CalendarPlusIcon, ClockIcon, Eyebrow, PinIcon } from '@/components/ui'
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
      <header className="theme-forest">
        <div className="container stack" style={{ paddingBlock: 'clamp(40px, 5vw, 72px)', gap: 18 }}>
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <ol style={{ color: 'rgba(244,237,225,0.8)' }}>
              <li><Link href="/events" style={{ color: 'var(--marigold)' }}>Events</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{event.title}</li>
            </ol>
          </nav>
          <Eyebrow>
            {EVENT_CATEGORY_LABELS[event.category] ?? event.category}
            {event.status === 'cancelled' ? ' · Cancelled' : event.status === 'postponed' ? ' · Postponed' : past ? ' · Past event' : ''}
          </Eyebrow>
          <h1 className="h1" style={{ marginTop: -8, maxWidth: 960 }}>{event.title}</h1>
          <p className="lede">{event.summary}</p>
          <ul className="row" style={{ listStyle: 'none', margin: 0, padding: 0, gap: '10px 28px', fontSize: 17 }}>
            <li><strong style={{ fontWeight: 600 }}>{fullDate(event.startsAt)}</strong></li>
            <li className="row" style={{ gap: 8 }}><ClockIcon />{timeRange(event.startsAt, event.endsAt)}</li>
            <li className="row" style={{ gap: 8 }}><PinIcon />{event.location}</li>
          </ul>
          {!past ? (
            <div className="row">
              <a href={`/events/${event.slug}/ics`} className="btn btn--outline btn--sm">
                <CalendarPlusIcon /> Add to calendar
              </a>
            </div>
          ) : null}
        </div>
      </header>

      <div className="theme-cream">
        <div className="container row section" style={{ alignItems: 'flex-start', gap: '48px 72px' }}>
          <div className="stack" style={{ flex: '1 1 560px', minWidth: 0, gap: 24 }}>
            <RichText data={event.description} />
            {event.accessibility ? (
              <div className="notice">
                <span>
                  <strong style={{ fontWeight: 600 }}>Access: </strong>
                  {event.accessibility}
                </span>
              </div>
            ) : null}
            {event.project ? (
              <p style={{ margin: 0 }}>
                Part of <Link href={`/land-and-gardens/${event.project.slug}`} style={{ color: 'var(--forest)', fontWeight: 600 }}>{event.project.name}</Link>.
              </p>
            ) : null}
          </div>
          <section id="register" aria-labelledby="reg-title" className="card stack" style={{ flex: '0 1 440px', minWidth: 0, padding: 'clamp(24px, 3vw, 32px)', gap: 16 }}>
            <h2 id="reg-title" className="h3">Register</h2>
            {open ? (
              event.registration?.externalUrl ? (
                <a href={event.registration.externalUrl} className="btn btn--dark" rel="noopener noreferrer">
                  Register on the partner site
                </a>
              ) : (
                <RegisterForm eventId={String(event.id)} />
              )
            ) : (
              <p className="body-muted" style={{ margin: 0 }}>
                {past ? 'This event has passed.' : event.status === 'cancelled' ? 'This event has been cancelled.' : 'Registration is closed.'}{' '}
                <Link href="/events" style={{ color: 'var(--forest)' }}>See upcoming events</Link>.
              </p>
            )}
          </section>
        </div>
      </div>
    </article>
  )
}
