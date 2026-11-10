'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

import { mountSeedGame } from '@/lib/enhance/seedGame'
import { Icon, Words } from './ui'

/** "Every garden starts with one small act." — tap the soil to plant. */
export function SeedGame() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => (ref.current ? mountSeedGame(ref.current) : undefined), [])
  return (
    <div ref={ref} className="seed" data-seed-game>
      <div>
        <p className="label" style={{ color: 'var(--clay-ink)' }}>Try it — plant a seed</p>
        <Words className="h-lg mt-4" text="Every garden starts with *one small act.*" />
        <p className="lead lead--sm mt-5 mw-md" data-reveal>
          Tap the soil to plant. Watch what grows when many hands join in — that’s how a community garden begins.
        </p>
        <div className="seed__progress" data-reveal>
          <div className="seed__ring">
            <svg viewBox="0 0 36 36" aria-hidden="true">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--border)" strokeWidth="3" />
              <circle data-seed-ring cx="18" cy="18" r="15.5" fill="none" stroke="var(--leaf)" strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray="0 1" />
            </svg>
            <span className="seed__count" data-seed-count>
              0
            </span>
          </div>
          <div aria-live="polite">
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }} data-seed-status>
              Your plot is waiting
            </p>
            <p className="small soft" data-seed-sub>
              Plant 6 to grow a garden
            </p>
          </div>
        </div>
        <div className="row mt-6">
          <button type="button" className="pill-btn pill-btn--leaf" data-seed-plant>
            Plant a seed <Icon name="sprout" />
          </button>
          <button type="button" className="pill-btn" style={{ background: 'transparent', boxShadow: 'inset 0 0 0 1px rgb(30 26 22 / .25)', color: 'var(--soil)' }} data-seed-reset hidden>
            Start over
          </button>
        </div>
        <p className="seed__done" data-seed-done hidden>
          <Link href="/get-involved" className="link">
            Grow the real thing with us →
          </Link>
        </p>
      </div>
      <div className="grain" style={{ borderRadius: '2rem', overflow: 'hidden' }} data-reveal>
        <button type="button" className="seed__plot" data-seed-plot data-count="0" aria-label="Plant a seed in the garden plot">
          <span className="seed__sky" />
          <span className="seed__sun" />
          <span className="seed__soil furrows" />
          <span className="seed__ridge" />
          <span className="seed__hint">Tap anywhere in the soil</span>
        </button>
      </div>
    </div>
  )
}
