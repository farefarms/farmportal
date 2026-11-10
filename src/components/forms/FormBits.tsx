'use client'

import Link from 'next/link'
import { useEffect, useRef, type ReactNode } from 'react'

import type { FormState } from '@/lib/forms'
import { Icon } from '../ui'

/** Hidden spam traps: a honeypot field and a render timestamp (set after hydration). */
export function SpamTraps() {
  const started = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (started.current) started.current.value = String(Date.now())
  }, [])
  return (
    <>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input ref={started} type="hidden" name="started" defaultValue="" />
    </>
  )
}

export function Field({
  id,
  label,
  error,
  children,
  hint,
}: {
  id: string
  label: ReactNode
  error?: string
  hint?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {hint ? <span className="field-hint" id={`${id}-hint`}>{hint}</span> : null}
      {error ? (
        <span className="field-error" id={`${id}-error`}>
          {error}
        </span>
      ) : null}
    </div>
  )
}

/** Props for an input so screen readers announce its error. */
export const errorProps = (state: FormState, name: string, id: string) =>
  state.errors?.[name] ? { 'aria-invalid': true, 'aria-describedby': `${id}-error` } : {}

export function Consent({ id, text, error }: { id: string; text: string; error?: string }) {
  return (
    <div className="stack" style={{ gap: '0.25rem' }}>
      <label className="choice" htmlFor={id}>
        <input id={id} name="consent" type="checkbox" value="yes" required aria-invalid={error ? true : undefined} />
        <span>{text}</span>
      </label>
      {error ? <span className="field-error">{error}</span> : null}
    </div>
  )
}

export function DataNotice({ children }: { children?: ReactNode }) {
  return (
    <p className="data-notice">
      {children ?? 'We use these details only for this purpose, never sell or share them, and delete them on request.'}{' '}
      <Link href="/privacy">Privacy notice</Link>
    </p>
  )
}

export function FormStatus({ state }: { state: FormState }) {
  return (
    <div aria-live="polite" role="status">
      {state.status !== 'idle' && state.message ? (
        <p className={`form-status form-status--${state.status === 'success' ? 'success' : 'error'}`} style={{ margin: 0 }}>
          {state.message}
        </p>
      ) : null}
    </div>
  )
}

/** Pill submit button with the circular arrow badge. */
export function SubmitButton({ children, variant = 'leaf', pending }: { children: ReactNode; variant?: 'leaf' | 'sun' | 'clay' | 'soil'; pending?: boolean }) {
  return (
    <button type="submit" className={`btn btn--${variant} self-start`} disabled={pending} aria-disabled={pending || undefined}>
      <span>{pending ? 'Sending…' : children}</span>
      <span className="btn__icon">
        <Icon name="arrow-up-right" />
      </span>
    </button>
  )
}
