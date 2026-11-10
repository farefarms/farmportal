'use client'

import { useEffect, useRef } from 'react'

import { initSeasons } from '@/lib/enhance/season'
import { Icon } from './ui'

type Season = { key: string; label: string; heading: string; tasks: string[]; crops: string[] }

const SEASONS: Season[] = [
  { key: 'spring', label: 'Spring', heading: 'Wake the soil', tasks: ['Start seeds indoors', 'Build and amend beds', 'Plant peas, greens & potatoes'], crops: ['Collards', 'Peas', 'Radish', 'Potatoes'] },
  { key: 'summer', label: 'Summer', heading: 'Grow in abundance', tasks: ['Transplant warm crops', 'Water deep, mulch well', 'Harvest daily'], crops: ['Okra', 'Tomatoes', 'Callaloo', 'Beans'] },
  { key: 'fall', label: 'Fall', heading: 'Gather & save', tasks: ['Save seed from the strongest plants', 'Plant garlic', 'Sow cover crops'], crops: ['Squash', 'Sweet potatoes', 'Garlic', 'Kale'] },
  { key: 'winter', label: 'Winter', heading: 'Rest & plan', tasks: ['Compost and rest beds', 'Preserve the harvest', 'Plan next year with community'], crops: ['Kale', 'Leeks', 'Overwintering onions', 'Microgreens'] },
]

/** The month decides which season opens first. */
const currentSeason = () => {
  const m = new Date().getMonth()
  if (m >= 2 && m <= 4) return 'spring'
  if (m >= 5 && m <= 7) return 'summer'
  if (m >= 8 && m <= 10) return 'fall'
  return 'winter'
}

/** "The growing year" — a season switcher for coastal BC. */
export function SeasonCalendar() {
  const ref = useRef<HTMLDivElement>(null)
  const active = currentSeason()
  useEffect(() => (ref.current ? initSeasons(ref.current) : undefined), [])
  return (
    <div ref={ref} className="season grain" data-season={active} data-reveal>
      <div className="season__inner">
        <div className="season__tabs" role="group" aria-label="Choose a season">
          {SEASONS.map((s) => (
            <button key={s.key} type="button" className="season__tab" data-season-tab={s.key} aria-pressed={s.key === active}>
              {s.label}
            </button>
          ))}
        </div>
        <div aria-live="polite">
          {SEASONS.map((s) => (
            <div key={s.key} className="season__panel" data-season-panel={s.key} hidden={s.key !== active}>
              <div>
                <p className="season__kicker">{s.label} on the coast</p>
                <h3 className="season__title">{s.heading}</h3>
                <ul className="season__tasks">
                  {s.tasks.map((t) => (
                    <li key={t}>
                      <span className="tick" aria-hidden="true">
                        <Icon name="check" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="season__kicker">In the ground</p>
                <ul className="chip-list">
                  {s.crops.map((c) => (
                    <li key={c} className="chip">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
