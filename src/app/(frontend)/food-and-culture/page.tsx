import type { Metadata } from 'next'
import Link from 'next/link'
import type { CSSProperties } from 'react'

import { ArrowIcon, Eyebrow, Photo, SectionHead } from '@/components/ui'
import { listRecipes, listStories } from '@/lib/queries'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Food & Culture',
  description: 'Ancestral recipes, African and diasporic food traditions, oral histories, and cultural storytelling.',
  alternates: { canonical: '/food-and-culture' },
}

const STEPS = [
  { title: 'Share', text: 'Record or write your story — on your own, or with a FARE Farms volunteer.' },
  { title: 'Choose your consent', text: 'Decide who can see it: the public, community members only, or the archive only.' },
  { title: 'Cultural review', text: 'A reviewer checks attribution, media rights, and cultural protocols with you.' },
  { title: 'Publish — or withdraw', text: 'Your story appears exactly as you agreed, and you can ask us to remove it at any time.' },
]

const credit = (c?: { attribution?: string | null; attributionText?: string | null; contributorName?: string | null } | null) => {
  if (!c) return null
  if (c.attribution === 'anonymous') return 'Shared anonymously'
  return `Shared by ${c.attributionText || c.contributorName}`
}

export default async function FoodCulturePage() {
  const [recipes, stories] = await Promise.all([listRecipes(), listStories()])

  return (
    <>
      <section className="theme-clay" aria-labelledby="food-title">
        <div className="container stack" style={{ paddingBlock: 'clamp(48px, 5vw, 80px) clamp(56px, 6vw, 88px)', gap: 24 }}>
          <Eyebrow>Food &amp; culture</Eyebrow>
          <h1 id="food-title" className="display" style={{ fontSize: 'clamp(52px, 6.4vw, 96px)', lineHeight: 0.98, marginTop: -6 }}>
            Food is culture.
          </h1>
          <p className="lede" style={{ maxWidth: 660 }}>
            Ancestral recipes, African and diasporic food traditions, oral histories, and cultural storytelling — connecting the practices we teach with the histories that give them meaning.
          </p>
          <nav aria-label="On this page" className="row" style={{ gap: 10 }}>
            <a href="#recipes" className="btn btn--outline btn--sm">Recipes</a>
            <a href="#stories" className="btn btn--outline btn--sm">Oral histories</a>
            <a href="#share" className="btn btn--outline btn--sm">Share yours</a>
          </nav>
        </div>
      </section>

      <section id="recipes" className="theme-cream section" aria-labelledby="recipes-title">
        <div className="container">
          <SectionHead eyebrow="Ancestral recipes" id="recipes-title" title="Recipes from our community" intro="Each recipe is shared by a community cook, credited to them, and linked to the crops it comes from." />
          {recipes.length ? (
            <div className="grid" style={{ '--min': '270px' } as CSSProperties}>
              {recipes.map((r) => (
                <Link key={r.id} href={`/food-and-culture/recipes/${r.slug}`} className="card card-link" style={{ overflow: 'hidden' }}>
                  <Photo media={r.image} height="170px" showCredit={false} />
                  <span className="card__body">
                    {r.region ? <span className="tiny" style={{ color: 'var(--clay)', fontWeight: 600 }}>{r.region}</span> : null}
                    <span className="h4" style={{ fontSize: 25 }}>{r.title}</span>
                    <span className="small" style={{ color: 'var(--body-text)' }}>{r.summary}</span>
                    <span className="card__meta">{credit(r.consent)}</span>
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty stack" style={{ gap: 12, alignItems: 'flex-start' }}>
              <p className="h4" style={{ margin: 0 }}>We’re gathering recipes.</p>
              <p className="body-muted" style={{ maxWidth: 620 }}>Okra soup, red-red, callaloo, millet porridge — if a dish carries your family’s story, we’d love to learn it with you.</p>
              <Link href="/get-involved#contribute" className="btn btn--dark">Share a recipe</Link>
            </div>
          )}
        </div>
      </section>

      <section id="stories" className="theme-paper section" aria-labelledby="stories-title">
        <div className="container row" style={{ alignItems: 'flex-start', gap: '48px 72px' }}>
          <div style={{ flex: '1 1 520px', minWidth: 0 }}>
            <Eyebrow>Oral histories</Eyebrow>
            <h2 id="stories-title" className="h2" style={{ marginBottom: 18 }}>
              Stories held <span className="accent">with care.</span>
            </h2>
            <p className="body-muted" style={{ fontSize: 18, maxWidth: 560, marginBottom: 32 }}>
              Stories stay private until there is documented permission and a cultural review is complete.
            </p>
            <ol className="rule-list" style={{ borderTop: '2px solid var(--ink)' }}>
              {STEPS.map((s, i) => (
                <li key={s.title} className="row" style={{ alignItems: 'flex-start', gap: 20, padding: '20px 0', flexWrap: 'nowrap' }}>
                  <span className="display accent" style={{ fontSize: 32, lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="stack" style={{ gap: 4 }}>
                    <span className="h4">{s.title}</span>
                    <span className="body-muted">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="stack" style={{ flex: '0 1 420px', minWidth: 0, gap: 14 }}>
            {stories.length ? (
              stories.slice(0, 4).map((s) => (
                <Link key={s.id} href={`/food-and-culture/stories/${s.slug}`} className="card card-link">
                  <span className="card__body">
                    <span className="h4">{s.title}</span>
                    <span className="small" style={{ color: 'var(--body-text)' }}>{s.summary}</span>
                    <span className="card__meta">{credit(s.consent)}</span>
                  </span>
                </Link>
              ))
            ) : (
              <div className="panel theme-forest stack" style={{ gap: 10 }}>
                <p className="h4" style={{ margin: 0 }}>The first oral histories are being recorded.</p>
                <p className="body-muted" style={{ margin: 0 }}>Each one is published only with the storyteller’s documented consent.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="foodways" className="theme-cream section--tight" aria-labelledby="foodways-title">
        <div className="container split" style={{ alignItems: 'center' }}>
          <div className="split__main">
            <Eyebrow>Cultural foodways</Eyebrow>
            <h2 id="foodways-title" className="h3" style={{ fontSize: 'clamp(30px, 3.2vw, 46px)', marginBottom: 12 }}>From field to table, across generations</h2>
            <p className="body-muted" style={{ fontSize: 18, maxWidth: 620 }}>
              Essays on African and diasporic food traditions — how crops are grown, preserved, cooked, and shared — sourced and reviewed in the Knowledge Library.
            </p>
          </div>
          <Link href="/learn?topic=community-knowledge#results" className="btn btn--forest">
            Explore the library <ArrowIcon size={17} />
          </Link>
        </div>
      </section>

      <section id="share" className="theme-marigold section" aria-labelledby="share-title">
        <div className="container split" style={{ alignItems: 'center' }}>
          <div className="split__main">
            <h2 id="share-title" className="display" style={{ fontSize: 'clamp(36px, 4.4vw, 64px)', lineHeight: 1.04, marginBottom: 12 }}>
              Share a recipe or a story.
            </h2>
            <p style={{ margin: 0, fontSize: 19, maxWidth: 560 }}>You choose how it’s credited and who can see it — and you can withdraw it at any time.</p>
          </div>
          <Link href="/get-involved#contribute" className="btn btn--dark">
            Contribute knowledge <ArrowIcon size={17} />
          </Link>
        </div>
      </section>
    </>
  )
}
