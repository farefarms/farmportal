import type { CSSProperties, ReactNode } from 'react'

import { Btn, Words } from './ui'

/** The rounded closing call-to-action panel (clay by default). */
export function Cta({
  id = 'cta-title',
  title = 'There’s room for you *in the garden.*',
  text = 'Volunteer, partner, or contribute knowledge — every pair of hands helps something grow.',
  tone = 'clay',
  children,
}: {
  id?: string
  title?: string
  text?: ReactNode
  tone?: 'clay' | 'leaf' | 'sun'
  children?: ReactNode
}) {
  return (
    <div className="cta-wrap">
      <section className={`cta cta--${tone} grain`} aria-labelledby={id}>
        <div className="mudcloth layer" style={{ '--o': tone === 'sun' ? 0.1 : 0.07, color: tone === 'sun' ? 'var(--soil)' : undefined } as CSSProperties} aria-hidden="true" />
        <div className="cta__grid">
          <Words id={id} className="h-cta" text={title} />
          <div className="stack" style={{ '--gap': '1.5rem' } as CSSProperties} data-reveal>
            {text ? <p className="cta__text">{text}</p> : null}
            <div className="row">
              {children ?? (
                <>
                  <Btn href="/get-involved" variant={tone === 'sun' ? 'soil' : 'cream'}>
                    Get Involved
                  </Btn>
                  <Btn href="/events" variant={tone === 'sun' ? 'line' : 'line-light'}>
                    See events
                  </Btn>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
