import Link from 'next/link'
import type { CSSProperties } from 'react'

import { dayOfMonth, isPast, monthShort, timeRange, weekday } from '@/lib/format'
import type { LibraryItem } from '@/lib/queries'
import { EVENT_CATEGORY_LABELS, PROJECT_STATUS_LABELS } from '@/lib/site'
import type { CropDoc, EventDoc, ProjectDoc, RecipeDoc, StoryDoc } from '@/lib/types'
import { Icon, pad2, Photo, type PhotoArt, type PhotoTone } from './ui'

const delay = (i: number, step = 0.08) => ({ '--d': `${(i % 3) * step}s` }) as CSSProperties

/* ---------- Crops: tall photo cards ---------- */

const CROP_TONE: Record<string, PhotoTone> = { forest: 'forest', clay: 'clay', marigold: 'sun', soil: 'soil', leaf: 'leaf' }
const CROP_ART: Record<string, PhotoArt> = { okra: 'pod', cowpeas: 'bean', 'black-eyed-peas': 'bean', amaranth: 'leafy', callaloo: 'leafy', millet: 'grain', sorghum: 'grain', fonio: 'grain' }

export const cropTone = (crop: Pick<CropDoc, 'color'>): PhotoTone => CROP_TONE[crop.color ?? 'forest'] ?? 'leaf'
export const cropArt = (crop: Pick<CropDoc, 'slug'>): PhotoArt => CROP_ART[crop.slug] ?? 'sprout'

export function CropCard({ crop, index, short = false }: { crop: CropDoc; index: number; short?: boolean }) {
  return (
    <Link href={`/learn/crops/${crop.slug}`} className={`tall${short ? ' tall--short' : ''}`} data-reveal style={delay(index)}>
      <Photo media={crop.heroImage} tone={cropTone(crop)} art={cropArt(crop)} />
      <span className="tall__shade" aria-hidden="true" />
      <span className="tall__no" aria-hidden="true">
        {pad2(index + 1)}
      </span>
      <div className="tall__body">
        <h3 className="tall__title">{crop.name}</h3>
        {crop.scientificName ? <span className="tall__sub">{crop.scientificName}</span> : null}
        {crop.summary ? <span className="tall__text">{crop.summary}</span> : null}
        <span className="tall__more">
          Read the profile <Icon name="arrow-right" />
        </span>
      </div>
    </Link>
  )
}

/* ---------- Knowledge Library card ---------- */

const TYPE_TAG: Record<string, string> = {
  crop: 'tag--leaf',
  article: 'tag--leaf',
  research: 'tag--leaf',
  guide: 'tag--clay',
  how_to: 'tag--clay',
  video: 'tag--clay',
  primer: '',
  toolkit: '',
  story_series: 'tag--soil',
  download: 'tag--muted',
}

export function LibraryCard({ item, index = 0 }: { item: LibraryItem; index?: number }) {
  const reviewLine =
    item.contributor && item.reviewer ? `By ${item.contributor} · Reviewed by ${item.reviewer}` : item.reviewer ? `Reviewed by ${item.reviewer}` : 'Sourced and reviewed'
  return (
    <Link href={item.href} className="lcard" data-reveal style={delay(index, 0.06)} data-type={item.type}>
      <span className="lcard__top">
        <span className={`tag ${TYPE_TAG[item.type] ?? 'tag--leaf'}`}>{item.typeLabel}</span>
        {item.meta ? <span className={`small soft${item.kind === 'crop' ? ' sci' : ''}`}>{item.meta}</span> : null}
      </span>
      <h3 className="lcard__title">{item.title}</h3>
      {item.topics.length ? <span className="kicker">{item.topics.join(' · ')}</span> : null}
      <span className="soft">{item.summary}</span>
      <span className="lcard__foot">
        <span>
          <Icon name="shield" size={15} />
          {reviewLine}
        </span>
        <span className="circle-btn" aria-hidden="true">
          <Icon name="arrow-up-right" />
        </span>
      </span>
    </Link>
  )
}

/* ---------- Events: calendar rows ---------- */

const CATEGORY_TAG: Record<string, string> = {
  workshop: '',
  gathering: 'tag--clay',
  volunteer: 'tag--leaf',
  youth: 'tag--soil',
  consultation: 'tag--muted',
}

export function EventRow({ event, headingLevel = 3 }: { event: EventDoc; headingLevel?: 2 | 3 }) {
  const past = isPast(event)
  const H = headingLevel === 2 ? 'h2' : 'h3'
  const statusLabel = event.status === 'cancelled' ? 'Cancelled' : event.status === 'postponed' ? 'Postponed' : past ? 'Past' : null
  const canRegister = !past && event.status === 'scheduled' && event.registration?.enabled !== false
  return (
    <li className={`ev${past ? ' ev--past' : ''}`} data-reveal>
      <div className="ev__date">
        <span className="ev__day">{dayOfMonth(event.startsAt)}</span>
        <span className="ev__mon">{monthShort(event.startsAt)}</span>
      </div>
      <div>
        <div className="ev__meta">
          <span className={`tag ${past ? 'tag--muted' : (CATEGORY_TAG[event.category] ?? '')}`}>{EVENT_CATEGORY_LABELS[event.category] ?? event.category}</span>
          <span className="small soft">{weekday(event.startsAt)}</span>
          {statusLabel ? <span className="tag tag--line">{statusLabel}</span> : null}
        </div>
        <H className="ev__title">
          <Link href={`/events/${event.slug}`}>{event.title}</Link>
        </H>
        {event.summary ? <p className="ev__text">{event.summary}</p> : null}
        <div className="ev__facts">
          <span>
            <Icon name="clock" />
            {timeRange(event.startsAt, event.endsAt)}
          </span>
          <span>
            <Icon name="map-pin" />
            {event.location}
          </span>
        </div>
      </div>
      {!past ? (
        <div className="ev__actions">
          <a href={`/events/${event.slug}/ics`} className="circle-btn" aria-label={`Add ${event.title} to your calendar`}>
            <Icon name="calendar-plus" />
          </a>
          {canRegister ? (
            event.registration?.externalUrl ? (
              <a href={event.registration.externalUrl} className="pill-btn" rel="noopener noreferrer" aria-label={`Count me in — register for ${event.title}`}>
                Count me in
              </a>
            ) : (
              <Link href={`/events/${event.slug}#register`} className="pill-btn" aria-label={`Count me in — register for ${event.title}`}>
                Count me in
              </Link>
            )
          ) : null}
        </div>
      ) : (
        <div />
      )}
    </li>
  )
}

/* ---------- Gardens / projects: media cards ---------- */

const GARDEN_TONES: PhotoTone[] = ['leaf', 'clay', 'sun', 'soil']

export function GardenCard({ project, index = 0, small = false }: { project: ProjectDoc; index?: number; small?: boolean }) {
  return (
    <Link href={`/land-and-gardens/${project.slug}`} className="mcard" data-reveal style={delay(index)}>
      <div className="mcard__media">
        <Photo media={project.heroImage} tone={GARDEN_TONES[index % GARDEN_TONES.length]} art="field" />
      </div>
      <div className="mcard__row">
        <div>
          <p className="kicker">
            {PROJECT_STATUS_LABELS[project.status] ?? project.status}
            {project.location ? ` · ${project.location}` : ''}
          </p>
          <h3 className={`mcard__title${small ? ' mcard__title--sm' : ''}`}>{project.name}</h3>
          {project.summary ? <p className="mcard__text">{project.summary}</p> : null}
        </div>
        <span className="arrow-circle" aria-hidden="true">
          <Icon name="arrow-up-right" size={20} />
        </span>
      </div>
    </Link>
  )
}

/* ---------- Recipes ---------- */

const credit = (c?: { attribution?: string | null; attributionText?: string | null; contributorName?: string | null } | null) => {
  if (!c) return null
  if (c.attribution === 'anonymous') return 'Shared anonymously'
  return `Shared by ${c.attributionText || c.contributorName}`
}

export function RecipeCard({ recipe, index = 0 }: { recipe: RecipeDoc; index?: number }) {
  return (
    <Link href={`/food-and-culture/recipes/${recipe.slug}`} className="mcard" data-reveal style={delay(index)}>
      <div className="mcard__media">
        <Photo media={recipe.image} tone={(['clay', 'sun', 'leaf'] as PhotoTone[])[index % 3]} art="bowl" />
      </div>
      <div className="mcard__row">
        <div>
          {recipe.region ? <p className="kicker">{recipe.region}</p> : null}
          <h3 className="mcard__title mcard__title--sm">{recipe.title}</h3>
          {recipe.summary ? <p className="mcard__text">{recipe.summary}</p> : null}
          <p className="small soft mt-3">{credit(recipe.consent)}</p>
        </div>
        <span className="arrow-circle" aria-hidden="true">
          <Icon name="arrow-up-right" size={20} />
        </span>
      </div>
    </Link>
  )
}

/* ---------- Oral histories: quote cards ---------- */

const QUOTE_TONES = ['', 'quote--sun', 'quote--clay']

export function StoryCard({ story, index = 0 }: { story: StoryDoc; index?: number }) {
  return (
    <Link href={`/food-and-culture/stories/${story.slug}`} className={`quote ${QUOTE_TONES[index % 3]}`} data-reveal style={delay(index)}>
      <Icon name="quote" size={32} className="quote__mark" />
      <span className="quote__text">{story.summary || story.title}</span>
      <span className="quote__by">
        <strong>{story.title}</strong> <span>— {credit(story.consent)}</span>
      </span>
    </Link>
  )
}

export { credit as consentCredit }
