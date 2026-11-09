const TZ = 'America/Vancouver'

const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-CA', { timeZone: TZ, ...opts })

export const dayOfMonth = (iso: string) => fmt({ day: '2-digit' }).format(new Date(iso))
export const monthShort = (iso: string) => fmt({ month: 'short' }).format(new Date(iso)).replace('.', '')
export const weekday = (iso: string) => fmt({ weekday: 'long' }).format(new Date(iso))
export const fullDate = (iso: string) => fmt({ weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(iso))
export const shortDate = (iso: string) => fmt({ month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(iso))

const time = (iso: string) =>
  fmt({ hour: 'numeric', minute: '2-digit', hour12: true })
    .format(new Date(iso))
    .replace(/\s?a\.m\./i, ' AM')
    .replace(/\s?p\.m\./i, ' PM')

export const timeRange = (start: string, end?: string | null) => (end ? `${time(start)} – ${time(end)}` : time(start))

export const isPast = (event: { startsAt: string; endsAt?: string | null }) =>
  new Date(event.endsAt || event.startsAt).getTime() < Date.now()

/** Two-digit step/index labels: 01, 02, … */
export const pad2 = (n: number) => String(n).padStart(2, '0')
