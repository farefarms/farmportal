import type { Metadata } from 'next'
import type { CSSProperties } from 'react'

import { Cta } from '@/components/Cta'
import { ContributeForm, VolunteerForm } from '@/components/forms/Forms'
import { Btn, Eyebrow, Icon, type IconName, pad2, PageHero, Words } from '@/components/ui'
import { getSiteSettings } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Get Involved',
  description: 'Volunteer on the land, partner with FARE Farms, or contribute recipes, stories and growing knowledge.',
  alternates: { canonical: '/get-involved' },
}

const PATHS: { label: string; href: string; icon: IconName }[] = [
  { label: 'Volunteer', href: '#volunteer', icon: 'shovel' },
  { label: 'Share knowledge', href: '#contribute', icon: 'mic' },
  { label: 'Partner', href: '#partner', icon: 'handshake' },
]

const ROLES = ['Weekly garden workdays', 'Event & kitchen crew', 'Youth mentorship', 'Skilled volunteering']

const CONTRIBUTE_STEPS = [
  'Tell us what you’d like to share.',
  'We talk with you about credit, consent and who can see it.',
  'A cultural reviewer checks it with you.',
  'It’s published only as you agreed — and you can withdraw it any time.',
]

export default async function GetInvolvedPage() {
  const settings = await getSiteSettings()
  return (
    <>
      <PageHero
        id="gi-title"
        eyebrow="Get Involved"
        title="Many hands make *a harvest.*"
        intro="Whether you have an afternoon, an organization, or knowledge to share — there’s a place for you in the garden."
      />

      <section className="wrap sec" aria-label="Ways to take part">
        <nav aria-label="Ways to take part" className="paths" data-reveal>
          {PATHS.map((p) => (
            <a key={p.href} href={p.href} className="path">
              <span className="path__icon">
                <Icon name={p.icon} size={24} />
              </span>
              <span className="path__label">{p.label}</span>
            </a>
          ))}
        </nav>

        <div id="volunteer" className="split mt-16" style={{ scrollMarginTop: '7rem' }}>
          <div>
            <Eyebrow>Volunteer</Eyebrow>
            <Words as="h2" id="vol-title" className="h-lg mt-6" text="Get your hands *in the soil.*" />
            <p className="lead mt-6" data-reveal>
              Join garden workdays, help at gatherings, mentor young growers, or lend skills like carpentry, design, and storytelling.
            </p>
            <ul className="boxes mt-8" data-reveal>
              {ROLES.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <section aria-labelledby="vol-title" className="form-panel" data-reveal>
            <VolunteerForm />
          </section>
        </div>
      </section>

      <section id="contribute" className="on-soil grain sec" aria-labelledby="k-title">
        <div className="mudcloth layer" style={{ '--o': 0.04 } as CSSProperties} aria-hidden="true" />
        <div className="wrap split">
          <div>
            <Eyebrow>Contribute knowledge</Eyebrow>
            <Words id="k-title" className="h-lg mt-6" text="Share what *you carry.*" />
            <p className="lead mt-6" data-reveal>
              Recipes, oral histories, and growing knowledge. Nothing is published until it has been reviewed with you.
            </p>
            <ol className="lines mt-10" data-reveal>
              {CONTRIBUTE_STEPS.map((s, i) => (
                <li key={s}>
                  <div className="lines__row">
                    <span className="lines__no">{pad2(i + 1)}</span>
                    <span style={{ fontSize: '1.125rem' }}>{s}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="card card--dark card--lg" data-reveal>
            <ContributeForm />
          </div>
        </div>
      </section>

      <div id="partner">
        <Cta
          id="partner-title"
          tone="leaf"
          title="Partner *with us.*"
          text="Organizations, schools, and institutions — let’s talk about co-creating programs, sites, and learning."
        >
          <Btn href={`mailto:${settings.contactEmail}?subject=Partnership%20with%20FARE%20Farms`} variant="sun" icon="mail">
            {settings.contactEmail}
          </Btn>
        </Cta>
      </div>
    </>
  )
}
