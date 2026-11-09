import type { Metadata } from 'next'

import { ContributeForm, VolunteerForm } from '@/components/forms/Forms'
import { Eyebrow, Furrows } from '@/components/ui'
import { getSiteSettings } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Get Involved',
  description: 'Volunteer on the land, partner with FARE Farms, or contribute recipes, stories and growing knowledge.',
  alternates: { canonical: '/get-involved' },
}

export default async function GetInvolvedPage() {
  const settings = await getSiteSettings()
  return (
    <>
      <section className="theme-forest furrows" aria-labelledby="gi-title">
        <Furrows />
        <div className="container stack" style={{ paddingBlock: 'clamp(48px, 5vw, 80px) clamp(56px, 6vw, 88px)', gap: 24 }}>
          <Eyebrow>Get involved</Eyebrow>
          <h1 id="gi-title" className="h1" style={{ marginTop: -6 }}>
            Many hands make <span className="accent">a harvest.</span>
          </h1>
          <p className="lede">Whether you have an afternoon, an organization, or knowledge to share — there’s a place for you in the garden.</p>
          <nav aria-label="On this page" className="row" style={{ gap: 10 }}>
            <a href="#volunteer" className="btn btn--outline btn--sm">Volunteer</a>
            <a href="#contribute" className="btn btn--outline btn--sm">Contribute knowledge</a>
            <a href="#partner" className="btn btn--outline btn--sm">Partner with us</a>
          </nav>
        </div>
      </section>

      <section className="theme-paper section">
        <div className="container row" style={{ alignItems: 'stretch', gap: 20 }}>
          <section id="volunteer" aria-labelledby="vol-title" className="card panel stack" style={{ flex: '1 1 480px', minWidth: 0, gap: 18 }}>
            <h2 id="vol-title" className="h3" style={{ fontSize: 32 }}>Volunteer</h2>
            <p className="body-muted" style={{ margin: 0, color: 'var(--body-text)' }}>
              Join garden workdays, help at gatherings, mentor young growers, or lend skills like carpentry, design, and storytelling.
            </p>
            <VolunteerForm />
          </section>

          <section id="contribute" aria-labelledby="k-title" className="panel theme-soil stack" style={{ flex: '1 1 480px', minWidth: 0, gap: 18 }}>
            <h2 id="k-title" className="h3" style={{ fontSize: 32 }}>Contribute knowledge</h2>
            <p className="body-muted" style={{ margin: 0 }}>
              Share recipes, oral histories, and growing knowledge. Nothing is published until it has been reviewed with you.
            </p>
            <ContributeForm />
          </section>
        </div>

        <div className="container" style={{ marginTop: 20 }}>
          <section id="partner" aria-labelledby="partner-title" className="card panel split" style={{ alignItems: 'center' }}>
            <div className="split__main">
              <h2 id="partner-title" className="h3" style={{ marginBottom: 6 }}>Partner with us</h2>
              <p className="body-muted" style={{ margin: 0, color: 'var(--body-text)' }}>
                Organizations, schools, and institutions — let’s talk about co-creating programs, sites, and learning.
              </p>
            </div>
            <a href={`mailto:${settings.contactEmail}?subject=Partnership%20with%20FARE%20Farms`} className="btn btn--outline">
              {settings.contactEmail}
            </a>
          </section>
        </div>
      </section>
    </>
  )
}
