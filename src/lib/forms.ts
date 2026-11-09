/** Shared helpers for the site's forms (used by server actions and client components). */

export type FormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Record<string, string>
}

export const initialFormState: FormState = { status: 'idle' }

/** The exact consent wording shown next to each form — stored with every submission. */
export const CONSENT = {
  newsletter:
    'I agree to receive email from FARE Farms. My address is only used for these updates, never sold or shared, and I can unsubscribe at any time.',
  marketplace:
    'Email me marketplace updates. My address is only used for these updates, never sold or shared, and I can unsubscribe at any time.',
  volunteer:
    'I agree that FARE Farms can keep these details to contact me about volunteering. They are never shared, and I can ask for them to be deleted at any time.',
  contribute:
    'I understand my contribution will be reviewed with me before anything is published, that I choose how it is credited and who can see it, and that I can withdraw it at any time.',
  producer:
    'I agree that FARE Farms can keep these details to contact me about the marketplace. They are never shared, and I can ask for them to be deleted at any time.',
  event:
    'I agree that FARE Farms can use these details to manage my registration and contact me about this event. They are deleted after the event season.',
} as const

export const str = (fd: FormData, name: string, max = 500): string => {
  const v = fd.get(name)
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

/**
 * Spam protection without third-party trackers:
 * - a honeypot field humans never see ("website")
 * - a time trap: forms submitted < 3 seconds after rendering are almost always bots
 */
export const looksLikeSpam = (fd: FormData): boolean => {
  if (str(fd, 'website')) return true
  const started = Number(str(fd, 'started'))
  if (Number.isFinite(started) && started > 0) {
    const elapsed = Date.now() - started
    if (elapsed < 3000 || elapsed > 1000 * 60 * 60 * 24) return true
  }
  return false
}
