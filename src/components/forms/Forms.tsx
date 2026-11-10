'use client'

import { useActionState } from 'react'

import { contribute, producerInterest, registerForEvent, subscribe, volunteer } from '@/app/(frontend)/actions'
import { CONSENT, initialFormState } from '@/lib/forms'
import { Icon } from '../ui'
import { Consent, DataNotice, errorProps, Field, FormStatus, SpamTraps, SubmitButton } from './FormBits'

/* ---------- Email sign-up (newsletter or marketplace) ---------- */

export function SubscribeForm({ list = 'newsletter', dark = false, idPrefix = 'sub' }: { list?: 'newsletter' | 'marketplace'; dark?: boolean; idPrefix?: string }) {
  const [state, action, pending] = useActionState(subscribe, initialFormState)
  const emailId = `${idPrefix}-email`
  if (state.status === 'success') return <FormStatus state={state} />
  const invalid = Boolean(state.errors?.email)
  return (
    <form action={action} className={`form${dark ? ' form--dark' : ''}`} noValidate style={{ gap: '0.875rem' }}>
      <SpamTraps />
      <input type="hidden" name="list" value={list} />
      <label htmlFor={emailId} className="sr-only">
        Email address
      </label>
      <div className="pill-field" data-invalid={invalid || undefined}>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          {...errorProps(state, 'email', emailId)}
        />
        <button type="submit" className="pill-btn" disabled={pending}>
          {list === 'marketplace' ? 'Notify me' : 'Subscribe'} <Icon name="arrow-right" />
        </button>
      </div>
      {invalid ? (
        <span className="field-error" id={`${emailId}-error`}>
          {state.errors?.email}
        </span>
      ) : null}
      <Consent id={`${idPrefix}-consent`} text={CONSENT[list]} error={state.errors?.consent} />
      <DataNotice />
      <FormStatus state={state} />
    </form>
  )
}

/* ---------- Volunteer ---------- */

const ROLES = ['Weekly garden workdays', 'Event & kitchen crew', 'Youth mentorship', 'Skilled volunteering (carpentry, design, storytelling)']

export function VolunteerForm() {
  const [state, action, pending] = useActionState(volunteer, initialFormState)
  if (state.status === 'success') return <FormStatus state={state} />
  return (
    <form action={action} className="form" noValidate>
      <SpamTraps />
      <div className="form-grid">
        <Field id="v-name" label="Full name" error={state.errors?.name}>
          <input id="v-name" name="name" type="text" autoComplete="name" required {...errorProps(state, 'name', 'v-name')} />
        </Field>
        <Field id="v-email" label="Email" error={state.errors?.email}>
          <input id="v-email" name="email" type="email" autoComplete="email" required {...errorProps(state, 'email', 'v-email')} />
        </Field>
        <Field id="v-phone" label={<>Phone <span style={{ opacity: 0.75 }}>(optional)</span></>}>
          <input id="v-phone" name="phone" type="tel" autoComplete="tel" />
        </Field>
        <Field id="v-role" label="How would you like to help?">
          <select id="v-role" name="role" defaultValue={ROLES[0]}>
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field id="v-message" label={<>Anything we should know? <span style={{ opacity: 0.75 }}>(optional)</span></>}>
        <textarea id="v-message" name="message" rows={3} />
      </Field>
      <Consent id="v-consent" text={CONSENT.volunteer} error={state.errors?.consent} />
      <DataNotice />
      <FormStatus state={state} />
      <SubmitButton variant="clay" pending={pending}>
        Sign me up
      </SubmitButton>
    </form>
  )
}

/* ---------- Contribute knowledge ---------- */

export function ContributeForm() {
  const [state, action, pending] = useActionState(contribute, initialFormState)
  if (state.status === 'success') return <FormStatus state={state} />
  return (
    <form action={action} className="form form--dark" noValidate>
      <SpamTraps />
      <div className="form-grid">
        <Field id="k-name" label={<>Name <span style={{ opacity: 0.75 }}>(optional)</span></>}>
          <input id="k-name" name="name" type="text" autoComplete="name" />
        </Field>
        <Field id="k-email" label="Email" error={state.errors?.email}>
          <input id="k-email" name="email" type="email" autoComplete="email" required {...errorProps(state, 'email', 'k-email')} />
        </Field>
      </div>
      <Field id="k-kind" label="What would you like to share?">
        <select id="k-kind" name="kind" defaultValue="recipe">
          <option value="recipe">A recipe</option>
          <option value="story">An oral history or story</option>
          <option value="growing">Growing knowledge</option>
          <option value="crop">Information about a crop</option>
          <option value="other">Something else</option>
        </select>
      </Field>
      <Field id="k-description" label="Tell us a little about it" error={state.errors?.description}>
        <textarea id="k-description" name="description" rows={4} required {...errorProps(state, 'description', 'k-description')} />
      </Field>
      <div className="row" style={{ alignItems: 'flex-start', gap: '1rem 2rem' }}>
        <fieldset className="fieldset">
          <legend>Who can see it?</legend>
          <label className="choice"><input type="radio" name="scope" value="public" defaultChecked /> Public</label>
          <label className="choice"><input type="radio" name="scope" value="community" /> Community members only</label>
          <label className="choice"><input type="radio" name="scope" value="archive" /> Archive only</label>
        </fieldset>
        <fieldset className="fieldset">
          <legend>How should we credit you?</legend>
          <label className="choice"><input type="radio" name="attribution" value="named" defaultChecked /> Use my name</label>
          <label className="choice"><input type="radio" name="attribution" value="anonymous" /> Keep me anonymous</label>
        </fieldset>
      </div>
      <Consent id="k-consent" text={CONSENT.contribute} error={state.errors?.consent} />
      <DataNotice>We talk with you before anything is shared, record your consent, and remove your contribution whenever you ask.</DataNotice>
      <FormStatus state={state} />
      <SubmitButton variant="sun" pending={pending}>
        Submit for review
      </SubmitButton>
    </form>
  )
}

/* ---------- Marketplace producer interest ---------- */

export function ProducerForm({ categories }: { categories: string[] }) {
  const [state, action, pending] = useActionState(producerInterest, initialFormState)
  if (state.status === 'success') return <FormStatus state={state} />
  return (
    <form action={action} className="form" noValidate>
      <SpamTraps />
      <div className="form-grid">
        <Field id="p-name" label="Your name" error={state.errors?.name}>
          <input id="p-name" name="name" type="text" autoComplete="name" required {...errorProps(state, 'name', 'p-name')} />
        </Field>
        <Field id="p-business" label="Business or producer name" error={state.errors?.business}>
          <input id="p-business" name="business" type="text" autoComplete="organization" required {...errorProps(state, 'business', 'p-business')} />
        </Field>
        <Field id="p-email" label="Email" error={state.errors?.email}>
          <input id="p-email" name="email" type="email" autoComplete="email" required {...errorProps(state, 'email', 'p-email')} />
        </Field>
        <Field id="p-location" label="Where are you based?">
          <input id="p-location" name="location" type="text" autoComplete="address-level2" />
        </Field>
      </div>
      <Field id="p-category" label="Category">
        <select id="p-category" name="category">
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
          <option>Something else</option>
        </select>
      </Field>
      <Field id="p-description" label="What do you grow or make?">
        <textarea id="p-description" name="description" rows={3} />
      </Field>
      <Consent id="p-consent" text={CONSENT.producer} error={state.errors?.consent} />
      <DataNotice />
      <FormStatus state={state} />
      <SubmitButton variant="leaf" pending={pending}>
        Send my interest
      </SubmitButton>
    </form>
  )
}

/* ---------- Event registration ---------- */

export function RegisterForm({ eventId }: { eventId: string }) {
  const [state, action, pending] = useActionState(registerForEvent, initialFormState)
  if (state.status === 'success') return <FormStatus state={state} />
  return (
    <form action={action} className="form" noValidate>
      <SpamTraps />
      <input type="hidden" name="eventId" value={eventId} />
      <div className="form-grid">
        <Field id="r-name" label="Your name" error={state.errors?.name}>
          <input id="r-name" name="name" type="text" autoComplete="name" required {...errorProps(state, 'name', 'r-name')} />
        </Field>
        <Field id="r-email" label="Email" error={state.errors?.email}>
          <input id="r-email" name="email" type="email" autoComplete="email" required {...errorProps(state, 'email', 'r-email')} />
        </Field>
      </div>
      <Field id="r-access" label={<>Access needs <span style={{ opacity: 0.75 }}>(optional)</span></>}>
        <textarea id="r-access" name="accessibilityNeeds" rows={2} />
      </Field>
      <Consent id="r-consent" text={CONSENT.event} error={state.errors?.consent} />
      <DataNotice />
      <FormStatus state={state} />
      <SubmitButton variant="sun" pending={pending}>
        Count me in
      </SubmitButton>
    </form>
  )
}
