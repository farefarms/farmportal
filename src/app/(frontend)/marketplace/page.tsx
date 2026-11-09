import type { Metadata } from 'next'
import type { CSSProperties } from 'react'

import { ProducerForm, SubscribeForm } from '@/components/forms/Forms'
import { Eyebrow, SectionHead } from '@/components/ui'
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

const CAT_COLORS = ['c-forest', 'c-clay', 'c-marigold', 'c-soil', 'c-leaf']

export default async function MarketplacePage() {
  const market = await getMarketplace()
  const categories = (market.categories ?? []).map((c) => c.label)
  const current = market.currentPhase ?? '1'

  return (
    <>
      <section id="updates" className="theme-soil" aria-labelledby="mk-title">
        <div className="container row" style={{ paddingBlock: 'clamp(48px, 5vw, 88px) clamp(56px, 6vw, 96px)', gap: '48px 72px' }}>
          <div className="stack" style={{ flex: '1 1 560px', minWidth: 0, gap: 22, alignItems: 'flex-start' }}>
            <span className="pill pill--marigold">Coming soon</span>
            <h1 id="mk-title" className="display" style={{ fontSize: 'clamp(52px, 6.4vw, 96px)', lineHeight: 0.98 }}>
              FARE <span className="accent">Marketplace</span>
            </h1>
            <p className="lede">{market.intro}</p>
            <p className="body-muted small" style={{ margin: 0 }}>We’re not taking orders yet — sign up to hear first when we open.</p>
            <div style={{ width: '100%', maxWidth: 560 }}>
              <SubscribeForm list="marketplace" dark idPrefix="mk" />
            </div>
          </div>
          <svg aria-hidden="true" width="320" height="320" viewBox="0 0 340 340" style={{ flex: '0 1 320px', maxWidth: '100%', height: 'auto' }}>
            <circle cx="170" cy="170" r="160" fill="none" stroke="#E3A93C" strokeWidth="2" />
            <circle cx="170" cy="170" r="104" fill="#E3A93C" />
            <path d="M170 228 V150" stroke="#1F4D35" strokeWidth="6" strokeLinecap="round" />
            <path d="M170 196 C144 196 126 180 126 156 C152 156 170 172 170 196 Z" fill="#1F4D35" />
            <path d="M170 172 C170 144 188 124 216 124 C216 150 198 172 170 172 Z" fill="#2D6146" />
          </svg>
        </div>
      </section>

      <section className="theme-cream section" aria-labelledby="find-title">
        <div className="container">
          <SectionHead
            eyebrow="What you’ll find"
            id="find-title"
            title="Rooted in learning."
            intro="Every product will link to what it teaches — crop profiles, growing guides, and the stories behind it — and support community growers and makers."
          />
          <ul className="grid" style={{ listStyle: 'none', margin: 0, padding: 0, '--min': '220px' } as CSSProperties}>
            {categories.map((c, i) => (
              <li key={c} className={`pillar ${CAT_COLORS[i % CAT_COLORS.length]}`} style={{ minHeight: 200 }}>
                <span className="tiny" style={{ fontWeight: 600 }}>{String(i + 1).padStart(2, '0')}</span>
                <span className="h4" style={{ fontSize: 24 }}>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="theme-paper section" aria-labelledby="road-title">
        <div className="container">
          <div className="split mt-section-head">
            <h2 id="road-title" className="h2 split__main" style={{ fontSize: 'clamp(34px, 3.6vw, 52px)' }}>How the marketplace will grow</h2>
            <p className="split__side body-muted">
              Checkout opens only once food and seed regulations, taxes, privacy, payments, shipping, refunds, and producer agreements are in place.
            </p>
          </div>
          <ol className="grid" style={{ listStyle: 'none', margin: 0, padding: 0, '--min': '240px' } as CSSProperties}>
            {PHASES.map((p) => {
              const now = p.n === current
              return (
                <li key={p.n} className={now ? 'panel theme-forest stack' : 'card panel stack'} style={{ gap: 10, padding: 24 }} aria-current={now ? 'step' : undefined}>
                  <span className="row" style={{ justifyContent: 'space-between' }}>
                    <span className="tiny" style={{ fontWeight: 600 }}>Phase {p.n}</span>
                    {now ? <span className="pill pill--marigold">Now</span> : null}
                  </span>
                  <h3 className="h4">{p.title}</h3>
                  <p className="small" style={{ margin: 0 }}>{p.text}</p>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section id="producers" className="theme-forest section" aria-labelledby="prod-title">
        <div className="container row" style={{ alignItems: 'flex-start', gap: '40px 72px' }}>
          <div className="stack" style={{ flex: '1 1 380px', minWidth: 0, gap: 18 }}>
            <Eyebrow>Producer interest</Eyebrow>
            <h2 id="prod-title" className="h2" style={{ marginTop: -18 }}>
              Grow or make something <span className="accent">we should carry?</span>
            </h2>
            <p className="lede">We’re building the marketplace with local growers, farmers, and artisans. Tell us about your work.</p>
          </div>
          <div className="card panel" style={{ flex: '1 1 520px', minWidth: 0 }}>
            <ProducerForm categories={categories} />
          </div>
        </div>
      </section>
    </>
  )
}
