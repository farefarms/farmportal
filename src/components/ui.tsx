import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

import type { MediaDoc } from '@/lib/types'

/* ---------- Icons (decorative unless labelled) ---------- */

export const SeedIcon = ({ size = 13, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={(size * 14) / 20} height={size} viewBox="0 0 14 20" aria-hidden="true">
    <path d="M7 1C12 6 12 14 7 19C2 14 2 6 7 1Z" fill={color} />
  </svg>
)

export const ArrowIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
)

export const SearchIcon = ({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

export const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F4D35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F4D35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
)

export const CalendarPlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 10h18M12 13v5M9.5 15.5h5" />
  </svg>
)

export const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" />
  </svg>
)

export const Logo = () => (
  <svg width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="16" cy="16" r="15" fill="#E3A93C" />
    <path d="M16 25V14" stroke="#1F4D35" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M16 19c-4.6 0-7.2-2.8-7.2-6.6 4.3 0 7.2 2.7 7.2 6.6Z" fill="#1F4D35" />
    <path d="M16 15.4c0-4.3 2.7-7.1 7-7.1 0 4.1-2.7 7.1-7 7.1Z" fill="#1F4D35" />
  </svg>
)

/* ---------- Building blocks ---------- */

export const Eyebrow = ({ children, as: As = 'p' }: { children: ReactNode; as?: 'p' | 'h2' }) => (
  <As className="eyebrow">
    <SeedIcon />
    {children}
  </As>
)

export const LinkArrow = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link href={href} className="link-arrow">
    {children}
    <ArrowIcon />
  </Link>
)

/** The ploughed-field line motif used behind dark heroes. */
export const Furrows = ({ opacity = 0.07 }: { opacity?: number }) => (
  <svg className="furrows__lines" viewBox="0 0 1440 240" preserveAspectRatio="none" fill="none" stroke="#F4EDE1" strokeOpacity={opacity} strokeWidth="2" aria-hidden="true">
    <path d="M0 70 C360 10 1080 10 1440 70" />
    <path d="M0 110 C360 50 1080 50 1440 110" />
    <path d="M0 150 C360 90 1080 90 1440 150" />
    <path d="M0 190 C360 130 1080 130 1440 190" />
    <path d="M0 230 C360 170 1080 170 1440 230" />
  </svg>
)

type PhotoProps = {
  media?: MediaDoc | null
  arch?: boolean
  height?: string
  dark?: boolean
  className?: string
  showCredit?: boolean
  priority?: boolean
}

/**
 * A credited photograph, or — when none has been uploaded yet — a quiet decorative panel.
 * (The brief asks for verified project photography only, so the site never shows stock images.)
 */
export const Photo = ({ media, arch, height = '320px', dark, className, showCredit = true, priority }: PhotoProps) => {
  const style = {
    height,
    '--photo-bg': dark ? 'var(--forest-2)' : 'var(--paper-deep)',
  } as CSSProperties
  return (
    <figure style={{ margin: 0 }} className={className}>
      <div className={`photo${arch ? ' photo--arch' : ''}`} style={style}>
        {media?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={media.url} alt={media.alt ?? ''} loading={priority ? 'eager' : 'lazy'} />
        ) : (
          <svg className="photo__lines" viewBox="0 0 400 300" preserveAspectRatio="none" fill="none" stroke={dark ? '#F4EDE1' : '#1E1A16'} strokeOpacity={dark ? 0.12 : 0.09} strokeWidth="1.5" aria-hidden="true">
            <path d="M-20 140 Q200 100 420 140" />
            <path d="M-20 170 Q200 130 420 170" />
            <path d="M-20 200 Q200 160 420 200" />
            <path d="M-20 230 Q200 190 420 230" />
            <path d="M-20 260 Q200 220 420 260" />
          </svg>
        )}
      </div>
      {showCredit && media?.url && (media.caption || media.credit) ? (
        <figcaption className="photo-credit">
          {media.caption}
          {media.caption && media.credit ? ' · ' : ''}
          {media.credit ? `Photo: ${media.credit}` : ''}
        </figcaption>
      ) : null}
    </figure>
  )
}

export const SectionHead = ({
  eyebrow,
  title,
  intro,
  action,
  id,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  intro?: ReactNode
  action?: ReactNode
  id?: string
}) => (
  <div className="split mt-section-head">
    <div className="split__main">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="h2" id={id}>
        {title}
      </h2>
    </div>
    {intro || action ? (
      <div className="split__side stack" style={{ '--gap': '16px' } as CSSProperties}>
        {intro ? <p className="body-muted" style={{ fontSize: 18 }}>{intro}</p> : null}
        {action}
      </div>
    ) : null}
  </div>
)

export const colorClass = (color?: string | null) => `c-${color || 'forest'}`
