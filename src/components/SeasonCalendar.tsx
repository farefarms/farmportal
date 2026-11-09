'use client'

import { useState } from 'react'

type Season = { key: string; label: string; heading: string; tasks: string[]; crops: string[] }

const SEASONS: Season[] = [
  { key: 'spring', label: 'Spring', heading: 'Wake the soil', tasks: ['Start seeds indoors', 'Build and amend beds', 'Plant peas, greens & potatoes'], crops: ['Collards', 'Peas', 'Radish', 'Potatoes'] },
  { key: 'summer', label: 'Summer', heading: 'Grow in abundance', tasks: ['Transplant warm crops', 'Water deep, mulch well', 'Harvest daily'], crops: ['Okra', 'Tomatoes', 'Callaloo', 'Beans'] },
  { key: 'fall', label: 'Fall', heading: 'Gather & save', tasks: ['Save seed from the strongest plants', 'Plant garlic', 'Sow cover crops'], crops: ['Squash', 'Sweet potatoes', 'Garlic', 'Kale'] },
  { key: 'winter', label: 'Winter', heading: 'Rest & plan', tasks: ['Compost and rest beds', 'Preserve the harvest', 'Plan next year with community'], crops: ['Kale', 'Leeks', 'Overwintering onions', 'Microgreens'] },
]

const ARCS: Record<string, { d: string; x: number; y: number }> = {
  spring: { d: 'M144.54 10.08 A130 130 0 0 1 269.92 135.46 L219.95 137.21 A80 80 0 0 0 142.79 60.05 Z', x: 214, y: 70 },
  summer: { d: 'M269.92 144.54 A130 130 0 0 1 144.54 269.92 L142.79 219.95 A80 80 0 0 0 219.95 142.79 Z', x: 214, y: 218 },
  fall: { d: 'M135.46 269.92 A130 130 0 0 1 10.08 144.54 L60.05 142.79 A80 80 0 0 0 137.21 219.95 Z', x: 66, y: 218 },
  winter: { d: 'M10.08 135.46 A130 130 0 0 1 135.46 10.08 L137.21 60.05 A80 80 0 0 0 60.05 137.21 Z', x: 66, y: 70 },
}

/** The month (Vancouver) decides which season opens first. */
const currentSeason = () => {
  const m = new Date().getMonth()
  if (m >= 2 && m <= 4) return 'spring'
  if (m >= 5 && m <= 7) return 'summer'
  if (m >= 8 && m <= 10) return 'fall'
  return 'winter'
}

export function SeasonCalendar() {
  const [active, setActive] = useState<string>(currentSeason)
  const season = SEASONS.find((s) => s.key === active) ?? SEASONS[2]
  return (
    <div className="stack" style={{ gap: 48 }}>
      <div role="group" aria-label="Choose a season" className="filter-bar">
        {SEASONS.map((s) => (
          <button key={s.key} type="button" className="filter-chip" aria-pressed={s.key === active} onClick={() => setActive(s.key)}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="row" style={{ alignItems: 'center', gap: '48px 80px' }}>
        <div style={{ flex: '0 1 300px', display: 'flex', justifyContent: 'center' }}>
          <svg className="season-wheel" width="300" height="300" viewBox="0 0 280 280" aria-hidden="true">
            {SEASONS.map((s) => {
              const on = s.key === active
              const arc = ARCS[s.key]
              return (
                <g key={s.key}>
                  <path d={arc.d} fill={on ? '#E3A93C' : 'rgba(244,237,225,0.10)'} />
                  <text x={arc.x} y={arc.y} textAnchor="middle" fontSize="12.5" fontWeight="500" fill={on ? '#1E1A16' : 'rgba(244,237,225,0.85)'} style={{ fontFamily: 'var(--font-body)' }}>
                    {s.label}
                  </text>
                </g>
              )
            })}
            <text x="140" y="148" textAnchor="middle" fontSize="30" fontWeight="700" fill="#F4EDE1" style={{ fontFamily: 'var(--font-display)' }}>
              {season.label}
            </text>
          </svg>
        </div>
        <div style={{ flex: '1 1 460px', minWidth: 0 }} aria-live="polite">
          <p className="eyebrow" style={{ marginBottom: 10 }}>{season.label} on the coast</p>
          <h3 className="h2" style={{ fontSize: 'clamp(34px, 3.4vw, 50px)', marginBottom: 20 }}>{season.heading}</h3>
          <ol className="rule-list" style={{ marginBottom: 32 }}>
            {season.tasks.map((t, i) => (
              <li key={t} className="row" style={{ alignItems: 'baseline', gap: 18, padding: '14px 0', fontSize: 19 }}>
                <span className="tiny accent" style={{ fontWeight: 600 }}>{String(i + 1).padStart(2, '0')}</span>
                {t}
              </li>
            ))}
          </ol>
          <p className="tiny" style={{ margin: '0 0 12px', color: 'rgba(244,237,225,0.8)', fontWeight: 500 }}>In the ground</p>
          <ul className="row" style={{ listStyle: 'none', margin: 0, padding: 0, gap: 8 }}>
            {season.crops.map((c) => (
              <li key={c} className="pill pill--outline" style={{ padding: '8px 16px', fontSize: 15 }}>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
