import type { Metadata } from 'next'
import type { CSSProperties } from 'react'

import { ProducerForm, SubscribeForm } from '@/components/forms/Forms'
import { Eyebrow, pad2, PageHero, SectionHead, SproutMark, Words } from '@/components/ui'
import { getMarketplace } from '@/lib/queries'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Marketplace — coming soon',
  description: 'A community-rooted marketplace for culturally meaningful foods, seeds, growing supplies, learning resources, and products from local growers and makers.',
  alternates: { canonical: '/marketplace' },
}

const PHASES = [
  { n: '1', title: 'Coming soon', text: 'Marketplace updates sign-up and producer interest.' },
  { n: '2', title: 'Curated catalogue', text: 'A first curated catalogue with producer profiles.' },
  { n: '3', title: 'Secure checkout', text: 'Checkout, tax, inventory, and fulfilment.' },
  { n: '4', title: 'Community marketplace', text: 'Multiple producers, approvals, commissions, and local pickup.' },
]

const CAT_BG = ['var(--leaf)', 'var(--clay)', 'var(--sun)', 'var(--soil)', '#2d6146']

export default async function MarketplacePage() {
  const market = await getMarketplace()
  const categories = (market.categories ?? []).map((c) => c.label)
  const current = market.currentPhase ?? '1'

  return (
    <>
      <PageHero id="mk-title" tone="soil" eyebrow="Coming soon" title="FARE *Marketplace.*" intro={market.intro}>
        <div id="updates" style={{ maxWidth: '34rem', scrollMarginTop: '8rem' }}>
          <p className="small" style={{ color: 'rgb(244 237 225 / 0.85)', marginBottom: '0.875rem' }}>
            We’re not taking orders yet — sign up to hear first when we open.
          </p>
          <SubscribeForm list="marketplace" dark idPrefix="mk" />
        </div>
      </PageHero>

      <section className="wrap sec" aria-labelledby="find-title">
        <SectionHead
          eyebrow="What you’ll find"
          id="find-title"
          title="Rooted in *learning.*"
          intro="Every product will link to what it teaches — crop profiles, growing guides, and the stories behind it — and support community growers and makers."
        />
        <ul className="cols cols--auto" style={{ listStyle: 'none', margin: 0, padding: 0, '--min': '13rem' } as CSSProperties}>
          {categories.map((c, i) => (
            <li
              key={c}
              className="grain"
              data-reveal
              style={
                {
                  '--d': `${(i % 5) * 0.06}s`,
                  minHeight: '15rem',
                  borderRadius: '2rem',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: CAT_BG[i % CAT_BG.length],
                  color: CAT_BG[i % CAT_BG.length] === 'var(--sun)' ? 'var(--soil)' : 'var(--cream)',
                } as CSSProperties
              }
            >
              <span className="row" style={{ justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.875rem' }}>{pad2(i + 1)}</span>
                <SproutMark className="marquee__sprout sprout--inherit" />
              </span>
              <span className="card__title">{c}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="on-muted sec" aria-labelledby="road-title">
        <div className="wrap">
          <SectionHead
            eyebrow="Roadmap"
            id="road-title"
            title="How the marketplace *will grow.*"
            intro="Checkout opens only once food and seed regulations, taxes, privacy, payments, shipping, refunds, and producer agreements are in place."
          />
          <ol className="cells cells--4" data-reveal>
            {PHASES.map((p) => {
              const now = p.n === current
              return (
                <li key={p.n} className="cell" aria-current={now ? 'step' : undefined} style={now ? { background: 'var(--leaf)', color: 'var(--cream)' } : undefined}>
                  <span className="row" style={{ justifyContent: 'space-between' }}>
                    <span className="cell__no" style={now ? { color: 'var(--sun)' } : undefined}>
                      Phase {p.n}
                    </span>
                    {now ? <span className="tag">Now</span> : null}
                  </span>
                  <h3 className="h-sm mt-6">{p.title}</h3>
                  <p className="mt-3" style={{ color: now ? 'rgb(244 237 225 / 0.85)' : 'var(--muted-fg)' }}>
                    {p.text}
                  </p>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section id="producers" className="on-leaf grain sec" aria-labelledby="prod-title">
        <div className="mudcloth layer" aria-hidden="true" />
        <div className="wrap split">
          <div>
            <Eyebrow>Producer interest</Eyebrow>
            <Words id="prod-title" className="h-lg mt-6" text="Grow or make something *we should carry?*" />
            <p className="lead mt-6" data-reveal>
              We’re building the marketplace with local growers, farmers, and artisans. Tell us about your work.
            </p>
          </div>
          <div className="form-panel" style={{ color: 'var(--soil)' }} data-reveal>
            <ProducerForm categories={categories} />
          </div>
        </div>
      </section>
    </>
  )
}
