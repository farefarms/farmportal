import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

import type { MediaDoc } from '@/lib/types'
import { Pollen } from './Pollen'

/* ---------- Icons (lucide geometry, decorative unless labelled) ---------- */

const ICONS = {
  'arrow-up-right': <><path d="M7 7h10v10" /><path d="M7 17 17 7" /></>,
  'arrow-right': <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  'arrow-down': <><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
  'map-pin': <><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></>,
  'calendar-plus': <><path d="M8 2v4" /><path d="M16 2v4" /><path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" /><path d="M3 10h18" /><path d="M16 19h6" /><path d="M19 16v6" /></>,
  quote: <><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" /><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" /></>,
  search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
  mail: <><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>,
  shield: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></>,
  sprout: <><path d="M7 20h10" /><path d="M10 20c5.5-2.5.8-6.4 3-10" /><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" /><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" /></>,
  shovel: <><path d="M2 22v-5l5-5 5 5-5 5z" /><path d="M9.5 14.5 16 8" /><path d="m17 2 5 5-.5.5a3.53 3.53 0 0 1-5 0a3.53 3.53 0 0 1 0-5L17 2" /></>,
  handshake: <><path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" /><path d="m21 3 1 11h-2" /><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" /><path d="M3 4h8" /></>,
  book: <><path d="M12 7v14" /><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" /></>,
  camera: <><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /><path d="M12 15V3" /></>,
  basket: <><path d="m15 11-1 9" /><path d="m19 11-4-7" /><path d="M2 11h20" /><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" /><path d="M4.5 15.5h15" /><path d="m5 11 4-7" /><path d="m9 11 1 9" /></>,
  heart: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
  mic: <><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><path d="M12 19v3" /></>,
} as const

export type IconName = keyof typeof ICONS

export const Icon = ({ name, size = 16, className, style }: { name: IconName; size?: number; className?: string; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} style={style}>
    {ICONS[name]}
  </svg>
)

/* ---------- Brand ---------- */

export const Logo = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="20" r="19" fill="var(--leaf)" />
    <path d="M8 29 Q20 25 32 29" stroke="var(--sun)" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M20 28 V15" stroke="var(--cream)" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 19 C14 19 11 15 11 10 C17 10 20 14 20 19Z" fill="var(--cream)" />
    <path d="M20 16 C25 16 29 13 29 8 C23 8 20 11 20 16Z" fill="var(--sun)" />
  </svg>
)

export const BrandMark = ({ size }: { size?: number }) => (
  <span className="brand">
    <Logo size={size} />
    <span className="brand__name">
      FARE Farms<span className="brand__dot">.</span>
    </span>
  </span>
)

/** The swaying sprout used between marquee words. */
export const SproutMark = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path d="M12 22 V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 14 C6 14 3 10 3 4 C9 4 12 8 12 14Z" fill="currentColor" />
    <path d="M12 11 C17 11 21 8 21 3 C16 3 12 6 12 11Z" fill="currentColor" opacity=".7" />
  </svg>
)

/* ---------- Type ---------- */

export const Eyebrow = ({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) => (
  <p className={`eyebrow ${className}`} id={id}>
    {children}
  </p>
)

type HeadingTag = 'h1' | 'h2' | 'h3' | 'p'

/**
 * A heading whose words rise into view. Wrap accent words in *asterisks*:
 * "Our roots *run deep.*" renders "run deep." in italic clay (sun on dark).
 */
export function Words({
  text,
  as: Tag = 'h2',
  className = '',
  id,
  instant = false,
  style,
}: {
  text: string
  as?: HeadingTag
  className?: string
  id?: string
  /** Animate on page load instead of on scroll (for heroes). */
  instant?: boolean
  style?: CSSProperties
}) {
  const plain = text.replace(/\*/g, '')
  const nodes: ReactNode[] = []
  let i = 0
  text.split('*').forEach((part, pi) => {
    const accent = pi % 2 === 1
    part.split(/(\s+)/).forEach((tok) => {
      if (!tok) return
      if (/^\s+$/.test(tok)) {
        nodes.push(' ')
        return
      }
      nodes.push(
        <span className="w" key={i}>
          <span className={accent ? 'acc' : undefined} style={{ '--i': i } as CSSProperties}>
            {tok}
          </span>
        </span>,
      )
      i += 1
    })
  })
  return (
    <Tag id={id} className={`words${instant ? ' words--instant' : ''} ${className}`} aria-label={Tag === 'p' ? undefined : plain} style={style}>
      <span aria-hidden={Tag === 'p' ? undefined : true}>{nodes}</span>
    </Tag>
  )
}

/* ---------- Buttons ---------- */

export type BtnVariant = 'sun' | 'leaf' | 'clay' | 'soil' | 'cream' | 'line' | 'line-light'

const isInternal = (href: string) => href.startsWith('/') && !href.startsWith('//')

export function Btn({
  href,
  children,
  variant = 'sun',
  icon = 'arrow-up-right',
  className = '',
  ...rest
}: {
  href: string
  children: ReactNode
  variant?: BtnVariant
  icon?: IconName | null
  className?: string
  rel?: string
  download?: boolean
  'aria-label'?: string
}) {
  const cls = `btn btn--${variant}${icon ? '' : ' btn--plain'} ${className}`
  const inner = (
    <>
      <span>{children}</span>
      {icon ? (
        <span className="btn__icon">
          <Icon name={icon} />
        </span>
      ) : null}
    </>
  )
  return isInternal(href) ? (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls} {...rest}>
      {inner}
    </a>
  )
}

/* ---------- Photos & placeholders ---------- */

export type PhotoTone = 'leaf' | 'clay' | 'sun' | 'soil' | 'forest' | 'muted'
export type PhotoArt = 'sprout' | 'pod' | 'bean' | 'leafy' | 'grain' | 'bowl' | 'voices' | 'field' | 'basket'

const ART: Record<PhotoArt, ReactNode> = {
  sprout: (
    <>
      <path d="M100 196 V96" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M100 140 C58 140 30 112 30 66 C74 66 100 94 100 140Z" fill="currentColor" />
      <path d="M100 112 C142 112 172 86 172 40 C128 40 100 66 100 112Z" fill="currentColor" />
    </>
  ),
  pod: (
    <>
      <path d="M96 16 C150 52 162 132 112 192 C78 150 56 82 96 16Z" fill="currentColor" />
      <path d="M96 16 C108 80 112 140 112 192" stroke="var(--ph)" strokeWidth="5" fill="none" opacity=".5" />
      <path d="M96 16 C86 70 92 130 106 186" stroke="var(--ph)" strokeWidth="4" fill="none" opacity=".35" />
      <path d="M92 18 C88 10 92 4 100 2" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
    </>
  ),
  bean: (
    <>
      <path d="M40 110 C40 60 90 40 130 56 C170 72 176 120 150 150 C120 184 60 176 46 140 C42 130 40 120 40 110Z" fill="currentColor" />
      <ellipse cx="112" cy="96" rx="20" ry="13" fill="var(--ph)" opacity=".55" transform="rotate(-24 112 96)" />
      <ellipse cx="112" cy="96" rx="8" ry="5" fill="currentColor" transform="rotate(-24 112 96)" />
    </>
  ),
  leafy: (
    <>
      <path d="M100 196 C96 150 70 120 30 104 C40 150 64 182 100 196Z" fill="currentColor" />
      <path d="M100 196 C104 140 130 100 176 80 C170 140 140 180 100 196Z" fill="currentColor" />
      <path d="M100 196 C82 130 90 60 112 10 C134 70 126 140 100 196Z" fill="currentColor" />
    </>
  ),
  grain: (
    <>
      <path d="M100 198 V70" stroke="currentColor" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M100 150 C70 150 54 130 50 104" stroke="currentColor" strokeWidth="7" strokeLinecap="round" fill="none" />
      {Array.from({ length: 9 }, (_, k) => (
        <ellipse key={k} cx={k % 2 ? 112 : 88} cy={18 + k * 8} rx="12" ry="8" fill="currentColor" />
      ))}
    </>
  ),
  bowl: (
    <>
      <path d="M24 108 H176 C176 152 144 182 100 182 C56 182 24 152 24 108Z" fill="currentColor" />
      <path d="M70 90 C60 72 80 62 70 40 M100 90 C90 70 112 60 100 30 M130 90 C120 72 140 62 130 40" stroke="currentColor" strokeWidth="7" strokeLinecap="round" fill="none" />
    </>
  ),
  voices: (
    <>
      <circle cx="74" cy="76" r="34" fill="currentColor" />
      <circle cx="132" cy="92" r="28" fill="currentColor" opacity=".75" />
      <path d="M20 196 C20 150 44 124 74 124 C104 124 128 150 128 196Z" fill="currentColor" />
      <path d="M96 196 C100 160 114 134 132 134 C156 134 180 156 180 196Z" fill="currentColor" opacity=".75" />
    </>
  ),
  field: (
    <>
      <circle cx="150" cy="70" r="22" fill="currentColor" />
      <path d="M0 140 C50 122 120 118 200 132 V200 H0Z" fill="currentColor" opacity=".7" />
      <path d="M0 158 C60 142 130 140 200 152 M0 176 C60 160 130 158 200 170 M0 194 C60 178 130 176 200 188" stroke="var(--ph)" strokeWidth="3" fill="none" opacity=".7" />
      {Array.from({ length: 9 }, (_, k) => (
        <path key={k} d={`M${14 + k * 22} ${136 - (k % 2) * 3} v-14 m0 6 c-6 0 -9 -4 -9 -9 c6 0 9 4 9 9 m0 -4 c5 0 8 -3 8 -8 c-5 0 -8 3 -8 8`} stroke="currentColor" strokeWidth="2" fill="currentColor" />
      ))}
    </>
  ),
  basket: (
    <>
      <path d="M30 96 H170 L154 180 H46Z" fill="currentColor" />
      <path d="M60 96 C60 50 140 50 140 96" stroke="currentColor" strokeWidth="9" fill="none" />
      <path d="M44 124 H156 M50 152 H150" stroke="var(--ph)" strokeWidth="5" opacity=".5" />
    </>
  ),
}

/**
 * A verified photograph, or — until one is uploaded and verified — a designed placeholder panel.
 * (The brief asks for verified project photography only, so the site never shows stock images.)
 */
export function Photo({
  media,
  tone = 'leaf',
  art = 'sprout',
  label = true,
  className = '',
  priority,
  style,
}: {
  media?: MediaDoc | null
  tone?: PhotoTone
  art?: PhotoArt
  label?: boolean
  className?: string
  priority?: boolean
  style?: CSSProperties
}) {
  return (
    <div className={`photo photo--${tone} ${className}`} style={style}>
      {media?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={media.url} alt={media.alt ?? ''} loading={priority ? 'eager' : 'lazy'} decoding="async" />
      ) : (
        <div className="photo__ph" aria-hidden="true">
          <div className="furrows" />
          {art === 'field' ? (
            <svg className="photo__art photo__art--wide" viewBox="0 0 200 200" preserveAspectRatio="xMaxYMax slice">
              {ART.field}
            </svg>
          ) : (
            <svg className="photo__art" viewBox="0 0 200 200">
              {ART[art]}
            </svg>
          )}
          {label ? (
            <span className="photo__label">
              <Icon name="camera" size={12} /> Photo to come
            </span>
          ) : null}
        </div>
      )}
    </div>
  )
}

export const PhotoCredit = ({ media }: { media?: MediaDoc | null }) =>
  media?.url && (media.caption || media.credit) ? (
    <p className="photo__credit">
      {media.caption}
      {media.caption && media.credit ? ' · ' : ''}
      {media.credit ? `Photo: ${media.credit}` : ''}
    </p>
  ) : null

/* ---------- Sections ---------- */

export function SectionHead({
  eyebrow,
  title,
  intro,
  action,
  id,
  size = 'xl',
  className = '',
}: {
  eyebrow?: ReactNode
  title: string
  intro?: ReactNode
  action?: ReactNode
  id?: string
  size?: 'xl' | 'lg'
  className?: string
}) {
  return (
    <div className={`head ${className}`}>
      <div style={{ maxWidth: '50rem' }}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Words id={id} className={`h-${size}${eyebrow ? ' mt-6' : ''}`} text={title} />
      </div>
      {intro || action ? (
        <div className="head__side" data-reveal>
          {intro ? <p className="soft">{intro}</p> : null}
          {action}
        </div>
      ) : null}
    </div>
  )
}

export const Wave = ({ color = 'var(--cream)' }: { color?: string }) => (
  <svg className="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true" style={{ '--wave': color } as CSSProperties}>
    <path d="M0 80 L0 40 Q180 0 360 30 T720 34 T1080 26 T1440 40 L1440 80Z" fill="currentColor" />
  </svg>
)

export type Crumb = { label: string; href?: string }

/** The dark, grain-textured page opener used across the site. */
export function PageHero({
  id,
  eyebrow,
  title,
  sub,
  intro,
  tone = 'leaf',
  compact = false,
  crumbs,
  wave = 'var(--cream)',
  children,
}: {
  id: string
  eyebrow: ReactNode
  title: string
  /** A line directly under the title (e.g. a scientific name). */
  sub?: ReactNode
  intro?: ReactNode
  tone?: 'leaf' | 'soil' | 'clay'
  compact?: boolean
  crumbs?: Crumb[]
  wave?: string
  children?: ReactNode
}) {
  return (
    <section className={`page-hero page-hero--${tone}${compact ? ' page-hero--compact' : ''} grain`} aria-labelledby={id}>
      <div className="page-hero__bg layer" aria-hidden="true">
        <div className="mudcloth" style={{ '--o': 0.06 } as CSSProperties} />
        <div className="furrows" style={{ position: 'absolute', inset: '48% 0 0', color: 'var(--cream)', opacity: 0.6 }} />
      </div>
      <Pollen />
      <div className="page-hero__inner">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="crumbs hero__fade" style={{ marginBottom: '1.5rem' }}>
            <ol>
              {crumbs.map((c, i) => (
                <li key={`${c.label}-${i}`} style={{ display: 'contents' }}>
                  <span>
                    {c.href ? (
                      <Link href={c.href}>{c.label}</Link>
                    ) : (
                      <span aria-current="page">{c.label}</span>
                    )}
                  </span>
                  {i < crumbs.length - 1 ? <span aria-hidden="true">/</span> : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <p className="tag-pill hero__fade">
          <span className="tag-pill__dot" aria-hidden="true" />
          {eyebrow}
        </p>
        <Words as="h1" id={id} instant text={title} className={`page-hero__title h-page${compact ? ' h-page--sm' : ''}`} />
        {sub ? <p className="page-hero__sub hero__fade">{sub}</p> : null}
        {intro ? <p className="page-hero__intro hero__fade">{intro}</p> : null}
        {children ? <div className="page-hero__extra hero__fade">{children}</div> : null}
      </div>
      <Wave color={wave} />
    </section>
  )
}

/** A scrolling band of words with swaying sprouts between them. */
export function Marquee({ items, tone = 'sun', tilt = false }: { items: string[]; tone?: 'sun' | 'soil'; tilt?: boolean }) {
  const run = (copy: number) =>
    [...items, ...items].map((item, i) => (
      <span key={`${copy}-${i}`} className="marquee__item">
        <span className="marquee__word">{item}</span>
        <SproutMark className="marquee__sprout" />
      </span>
    ))
  return (
    <div className="marquee-clip">
      <div className={`marquee marquee--${tone}${tilt ? ' marquee--tilt' : ''}`}>
        <p className="sr-only">{items.join(' · ')}</p>
        <div className="marquee__viewport" aria-hidden="true">
          <div className="marquee__track">
            {run(0)}
            {run(1)}
          </div>
        </div>
      </div>
    </div>
  )
}

export const pad2 = (n: number) => String(n).padStart(2, '0')
