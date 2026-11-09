'use server'

import { CONSENT, type FormState, isEmail, looksLikeSpam, str } from '@/lib/forms'
import { getPayloadClient } from '@/lib/payload'
import type { EventDoc } from '@/lib/types'

/**
 * Server actions behind every public form. Submissions collections are closed to the public API,
 * so these actions are the only way in; they validate input, require consent, filter spam and
 * store the exact consent wording with a timestamp.
 */

const ok = (message: string): FormState => ({ status: 'success', message })
const fail = (errors: Record<string, string>, message = 'Please check the highlighted fields.'): FormState => ({
  status: 'error',
  message,
  errors,
})
const serverError = (): FormState => ({
  status: 'error',
  message: 'Something went wrong on our side. Please try again, or email hello@farefarms.ca.',
})

const consentStamp = (text: string) => ({ consentText: text, consentedAt: new Date().toISOString() })

/* ---------- Newsletter & marketplace updates ---------- */

export async function subscribe(_prev: FormState, fd: FormData): Promise<FormState> {
  const list = str(fd, 'list') === 'marketplace' ? 'marketplace' : 'newsletter'
  const doneMessage =
    list === 'marketplace' ? 'You’re on the list — we’ll email you when the marketplace opens.' : 'Thanks — you’re subscribed.'
  if (looksLikeSpam(fd)) return ok(doneMessage)

  const email = str(fd, 'email', 254).toLowerCase()
  const errors: Record<string, string> = {}
  if (!isEmail(email)) errors.email = 'Enter a valid email address.'
  if (!fd.get('consent')) errors.consent = 'Please confirm you’d like to receive these emails.'
  if (Object.keys(errors).length) return fail(errors)

  try {
    const payload = await getPayloadClient()
    const existing = await payload.find({ collection: 'subscribers', where: { email: { equals: email } }, limit: 1, overrideAccess: true })
    const doc = existing.docs[0] as { id: string | number; lists?: string[] } | undefined
    if (doc) {
      const lists = Array.from(new Set([...(doc.lists ?? []), list]))
      await payload.update({
        collection: 'subscribers',
        id: doc.id,
        data: { lists, unsubscribed: false, ...consentStamp(CONSENT[list]) } as never,
        overrideAccess: true,
      })
    } else {
      await payload.create({
        collection: 'subscribers',
        data: { email, lists: [list], ...consentStamp(CONSENT[list]) } as never,
        overrideAccess: true,
      })
    }
    return ok(doneMessage)
  } catch (error) {
    console.error('[fare] subscribe failed', error)
    return serverError()
  }
}

/* ---------- Volunteer ---------- */

export async function volunteer(_prev: FormState, fd: FormData): Promise<FormState> {
  const done = 'Thank you! Someone from the garden team will be in touch soon.'
  if (looksLikeSpam(fd)) return ok(done)

  const data = {
    name: str(fd, 'name', 120),
    email: str(fd, 'email', 254).toLowerCase(),
    phone: str(fd, 'phone', 40),
    role: str(fd, 'role', 120),
    message: str(fd, 'message', 2000),
  }
  const errors: Record<string, string> = {}
  if (!data.name) errors.name = 'Enter your name.'
  if (!isEmail(data.email)) errors.email = 'Enter a valid email address.'
  if (!fd.get('consent')) errors.consent = 'Please agree so we can contact you.'
  if (Object.keys(errors).length) return fail(errors)

  try {
    const payload = await getPayloadClient()
    await payload.create({ collection: 'volunteer-signups', data: { ...data, ...consentStamp(CONSENT.volunteer) } as never, overrideAccess: true })
    return ok(done)
  } catch (error) {
    console.error('[fare] volunteer failed', error)
    return serverError()
  }
}

/* ---------- Contribute knowledge ---------- */

const KINDS = ['recipe', 'story', 'growing', 'crop', 'other']
const SCOPES = ['public', 'community', 'archive']

export async function contribute(_prev: FormState, fd: FormData): Promise<FormState> {
  const done = 'Thank you for sharing. A member of our team will contact you to talk it through — nothing is published without your review.'
  if (looksLikeSpam(fd)) return ok(done)

  const data = {
    name: str(fd, 'name', 120),
    email: str(fd, 'email', 254).toLowerCase(),
    kind: KINDS.includes(str(fd, 'kind')) ? str(fd, 'kind') : 'other',
    description: str(fd, 'description', 4000),
    scope: SCOPES.includes(str(fd, 'scope')) ? str(fd, 'scope') : 'archive',
    attribution: str(fd, 'attribution') === 'anonymous' ? 'anonymous' : 'named',
  }
  const errors: Record<string, string> = {}
  if (!isEmail(data.email)) errors.email = 'Enter a valid email address so we can talk with you first.'
  if (data.description.length < 10) errors.description = 'Tell us a little about what you’d like to share.'
  if (!fd.get('consent')) errors.consent = 'Please confirm you understand how contributions are handled.'
  if (Object.keys(errors).length) return fail(errors)

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'knowledge-submissions',
      data: { ...data, ...consentStamp(CONSENT.contribute) } as never,
      overrideAccess: true,
    })
    return ok(done)
  } catch (error) {
    console.error('[fare] contribute failed', error)
    return serverError()
  }
}

/* ---------- Marketplace producer interest ---------- */

export async function producerInterest(_prev: FormState, fd: FormData): Promise<FormState> {
  const done = 'Thank you — we’ll be in touch as the marketplace takes shape.'
  if (looksLikeSpam(fd)) return ok(done)

  const data = {
    name: str(fd, 'name', 120),
    business: str(fd, 'business', 160),
    email: str(fd, 'email', 254).toLowerCase(),
    location: str(fd, 'location', 120),
    category: str(fd, 'category', 120),
    description: str(fd, 'description', 3000),
  }
  const errors: Record<string, string> = {}
  if (!data.name) errors.name = 'Enter your name.'
  if (!data.business) errors.business = 'Enter your business or producer name.'
  if (!isEmail(data.email)) errors.email = 'Enter a valid email address.'
  if (!fd.get('consent')) errors.consent = 'Please agree so we can contact you.'
  if (Object.keys(errors).length) return fail(errors)

  try {
    const payload = await getPayloadClient()
    await payload.create({ collection: 'producer-interest', data: { ...data, ...consentStamp(CONSENT.producer) } as never, overrideAccess: true })
    return ok(done)
  } catch (error) {
    console.error('[fare] producerInterest failed', error)
    return serverError()
  }
}

/* ---------- Event registration ---------- */

export async function registerForEvent(_prev: FormState, fd: FormData): Promise<FormState> {
  if (looksLikeSpam(fd)) return ok('You’re registered. See you on the land!')

  const eventId = str(fd, 'eventId', 64)
  const name = str(fd, 'name', 120)
  const email = str(fd, 'email', 254).toLowerCase()
  const accessibilityNeeds = str(fd, 'accessibilityNeeds', 1000)
  const errors: Record<string, string> = {}
  if (!name) errors.name = 'Enter your name.'
  if (!isEmail(email)) errors.email = 'Enter a valid email address.'
  if (!fd.get('consent')) errors.consent = 'Please agree so we can manage your registration.'
  if (Object.keys(errors).length) return fail(errors)

  try {
    const payload = await getPayloadClient()
    // Read with public access: only published, confirmed events can take registrations.
    const idValue = /^\d+$/.test(eventId) ? Number(eventId) : eventId
    const found = await payload.find({
      collection: 'events',
      where: { id: { equals: idValue } },
      limit: 1,
      depth: 0,
      overrideAccess: false,
    })
    const event = found.docs[0] as unknown as EventDoc | undefined
    if (!event) return { status: 'error', message: 'This event isn’t open for registration.' }
    const closesAt = event.registration?.closesAt ? new Date(event.registration.closesAt) : null
    const ended = new Date(event.endsAt || event.startsAt).getTime() < Date.now()
    if (event.status === 'cancelled' || ended || event.registration?.enabled === false || (closesAt && closesAt < new Date())) {
      return { status: 'error', message: 'Registration for this event is closed.' }
    }

    const already = await payload.count({
      collection: 'event-registrations',
      where: { and: [{ event: { equals: event.id } }, { email: { equals: email } }, { status: { not_equals: 'cancelled' } }] },
      overrideAccess: true,
    })
    if (already.totalDocs > 0) return ok('You’re already registered for this event — see you there!')

    let status: 'registered' | 'waitlist' = 'registered'
    const capacity = event.registration?.capacity
    if (capacity && capacity > 0) {
      const taken = await payload.count({
        collection: 'event-registrations',
        where: { and: [{ event: { equals: event.id } }, { status: { equals: 'registered' } }] },
        overrideAccess: true,
      })
      if (taken.totalDocs >= capacity) status = 'waitlist'
    }

    await payload.create({
      collection: 'event-registrations',
      data: { event: event.id, name, email, accessibilityNeeds, status, ...consentStamp(CONSENT.event) } as never,
      overrideAccess: true,
    })
    return ok(
      status === 'waitlist'
        ? 'This event is full, so we’ve added you to the waitlist. We’ll email you if a spot opens.'
        : 'You’re registered. See you on the land!',
    )
  } catch (error) {
    console.error('[fare] registerForEvent failed', error)
    return serverError()
  }
}
