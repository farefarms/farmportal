import Link from 'next/link'

import { dayOfMonth, isPast, monthShort, timeRange, weekday } from '@/lib/format'
import type { LibraryItem } from '@/lib/queries'
import { EVENT_CATEGORY_LABELS, PROJECT_STATUS_LABELS } from '@/lib/site'
import type { CropDoc, EventDoc, ProjectDoc } from '@/lib/types'
import { ArrowIcon, CalendarPlusIcon, ClockIcon, colorClass, Photo, PinIcon, ShieldIcon } from './ui'

/* ---------- Crop "seed packet" card ---------- */

export function CropCard({ crop, index }: { crop: CropDoc; index: number }) {
  return (
    <Link href={`/learn/crops/${crop.slug}`} className={`card card-link packet ${colorClass(crop.color)}`}>
      <span className="packet__band" aria-hidden="true">
        <svg width="120" height="128" viewBox="0 0 120 128">
          <path d="M60 6C92 36 92 92 60 122C28 92 28 36 60 6Z" fill="currentColor" fillOpacity="0.18" />
          <path d="M60 22V110" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" />
        </svg>
        <span className="packet__no">No. {String(index + 1).padStart(2, '0')}</span>
      </span>
      <span className="card__body" style={{ gap: 2 }}>
        <span className="h4" style={{ fontSize: 26 }}>{crop.name}</span>
        <span className="sci small" style={{ color: 'var(--muted)' }}>{crop.scientificName}</span>
        <span className="row tiny" style={{ marginTop: 12, gap: 6, color: 'var(--forest)', fontWeight: 600 }}>
          Read profile <ArrowIcon size={13} />
        </span>
      </span>
    </Link>
  )
}

/* ---------- Library resource card ---------- */

const TYPE_PILL: Record<string, string> = {
  crop: 'pill--forest',
  guide: 'pill--clay',
  how_to: 'pill--clay',
  primer: 'pill--marigold',
  toolkit: 'pill--marigold',
  story_series: 'pill--muted',
  download: 'pill--leaf',
  article: 'pill--forest',
  research: 'pill--leaf',
  video: 'pill--clay',
}

export function LibraryCard({ item }: { item: LibraryItem }) {
  const reviewLine =
    item.contributor && item.reviewer ? `By ${item.contributor} · Reviewed by ${item.reviewer}` : item.reviewer ? `Reviewed by ${item.reviewer}` : 'Sourced and reviewed'
  return (
    <Link href={item.href} className="card card-link" style={{ minHeight: 220 }}>
      <span className="card__body">
        <span className="row" style={{ justifyContent: 'space-between', gap: 8 }}>
          <span className={`pill ${TYPE_PILL[item.type] ?? 'pill--forest'}`}>{item.typeLabel}</span>
          {item.meta ? <span className={`tiny${item.kind === 'crop' ? ' sci' : ''}`} style={{ color: 'var(--muted)' }}>{item.meta}</span> : null}
        </span>
        <span className="h4" style={{ fontSize: 25 }}>{item.title}</span>
        {item.topics.length ? <span className="small" style={{ color: 'var(--clay)', fontWeight: 500 }}>{item.topics.join(' · ')}</span> : null}
        <span className="small" style={{ color: 'var(--body-text)' }}>{item.summary}</span>
        <span className="card__meta row" style={{ gap: 8 }}>
          <ShieldIcon />
          {reviewLine}
        </span>
      </span>
    </Link>
  )
}

/* ---------- Event ticket ---------- */

const CATEGORY_COLOR: Record<string, string> = {
  workshop: 'c-forest',
  gathering: 'c-clay',
  volunteer: 'c-marigold',
  youth: 'c-leaf',
  consultation: 'c-soil',
}

export function EventTicket({ event, headingLevel = 3 }: { event: EventDoc; headingLevel?: 2 | 3 }) {
  const past = isPast(event)
  const H = headingLevel === 2 ? 'h2' : 'h3'
  const statusLabel =
    event.status === 'cancelled' ? 'Cancelled' : event.status === 'postponed' ? 'Postponed' : past ? 'Past' : 'Upcoming'
  const canRegister = !past && event.status === 'scheduled' && event.registration?.enabled !== false
  return (
    <article className={`ticket ${CATEGORY_COLOR[event.category] ?? 'c-forest'}${past ? ' ticket--past' : ''}`}>
      <div className="ticket__date">
        <span className="ticket__day">{dayOfMonth(event.startsAt)}</span>
        <span className="tiny" style={{ fontWeight: 600 }}>{monthShort(event.startsAt)}</span>
      </div>
      <div className="ticket__main">
        <div className="row" style={{ gap: '8px 12px' }}>
          <span className={`pill ${past ? 'pill--muted' : `pill--${(CATEGORY_COLOR[event.category] ?? 'c-forest').slice(2)}`}`}>
            {EVENT_CATEGORY_LABELS[event.category] ?? event.category}
          </span>
          <span className="tiny" style={{ color: 'var(--muted)' }}>{weekday(event.startsAt)}</span>
          <span className="pill pill--outline tiny">{statusLabel}</span>
        </div>
        <H className="h3" style={{ margin: 0 }}>
          <Link href={`/events/${event.slug}`} style={{ textDecoration: 'none' }}>
            {event.title}
          </Link>
        </H>
        <p className="small" style={{ margin: 0, color: 'var(--body-text)' }}>{event.summary}</p>
      </div>
      <div className="ticket__side">
        <ul className="icon-list">
          <li>
            <ClockIcon />
            {timeRange(event.startsAt, event.endsAt)}
          </li>
          <li>
            <PinIcon />
            {event.location}
          </li>
        </ul>
        {!past ? (
          <div className="row" style={{ gap: 10 }}>
            <a href={`/events/${event.slug}/ics`} className="icon-btn" style={{ color: 'var(--ink)', borderColor: 'rgba(30,26,22,0.3)' }} aria-label={`Add ${event.title} to your calendar`}>
              <CalendarPlusIcon />
            </a>
            {canRegister ? (
              event.registration?.externalUrl ? (
                <a href={event.registration.externalUrl} className="btn btn--dark btn--sm" rel="noopener noreferrer">
                  Register
                </a>
              ) : (
                <Link href={`/events/${event.slug}#register`} className="btn btn--dark btn--sm">
                  Register
                </Link>
              )
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  )
}

/* ---------- Garden / project card ---------- */

export function SiteCard({ project, dark = false }: { project: ProjectDoc; dark?: boolean }) {
  return (
    <Link href={`/land-and-gardens/${project.slug}`} className="card-link stack" style={{ gap: 14, color: 'inherit' }}>
      <Photo media={project.heroImage} arch dark={dark} height="260px" showCredit={false} />
      <span className="pill pill--outline tiny" style={{ alignSelf: 'flex-start', color: dark ? 'var(--marigold)' : 'var(--forest)' }}>
        {PROJECT_STATUS_LABELS[project.status] ?? project.status}
      </span>
      <span className="h4" style={{ fontSize: 24 }}>{project.name}</span>
      <span className="tiny" style={{ color: dark ? 'rgba(244,237,225,0.8)' : 'var(--muted)' }}>{project.location}</span>
    </Link>
  )
}
