import type { Metadata } from 'next'
import type { CSSProperties } from 'react'

import { RecipeCard, StoryCard } from '@/components/cards'
import { Cta } from '@/components/Cta'
import { Btn, Eyebrow, Marquee, pad2, PageHero, SectionHead, Words } from '@/components/ui'
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

export default async function FoodCulturePage() {
  const [recipes, stories] = await Promise.all([listRecipes(), listStories()])

  return (
    <>
      <PageHero
        id="food-title"
        tone="clay"
        eyebrow="Food & Culture"
        title="Food is *culture.*"
        intro="Ancestral recipes, African and diasporic food traditions, oral histories, and cultural storytelling — connecting the practices we teach with the histories that give them meaning."
      >
        <nav aria-label="On this page" className="row">
          <Btn href="#recipes" variant="cream" icon="arrow-down">
            Recipes
          </Btn>
          <Btn href="#stories" variant="line-light" icon="arrow-down">
            Oral histories
          </Btn>
          <Btn href="#share" variant="line-light" icon="arrow-down">
            Share yours
          </Btn>
        </nav>
      </PageHero>

      <Marquee items={['Okra soup', 'Red-red', 'Callaloo', 'Millet porridge']} tilt />

      <section id="recipes" className="wrap sec" aria-labelledby="recipes-title">
        <SectionHead eyebrow="Ancestral recipes" id="recipes-title" title="Recipes from *our community.*" intro="Each recipe is shared by a community cook, credited to them, and linked to the crops it comes from." />
        {recipes.length ? (
          <div className="cols cols--3" style={{ '--gap': '3rem 1.5rem' } as CSSProperties}>
            {recipes.map((r, i) => (
              <RecipeCard key={r.id} recipe={r} index={i} />
            ))}
          </div>
        ) : (
          <div className="empty" data-reveal>
            <div className="split" style={{ alignItems: 'center' }}>
              <div>
                <p className="h-md">We’re gathering recipes.</p>
                <p className="lead lead--sm mt-4">
                  Okra soup, red-red, callaloo, millet porridge — if a dish carries your family’s story, we’d love to learn it with you.
                </p>
              </div>
              <div>
                <Btn href="/get-involved#contribute" variant="clay">
                  Share a recipe
                </Btn>
              </div>
            </div>
          </div>
        )}
      </section>

      <section id="stories" className="on-leaf grain sec" aria-labelledby="stories-title">
        <div className="mudcloth layer" aria-hidden="true" />
        <div className="wrap split">
          <div>
            <Eyebrow>Oral histories</Eyebrow>
            <Words id="stories-title" className="h-xl mt-6" text="Stories held *with care.*" />
            <p className="lead mt-6 mw-lg" data-reveal>
              Stories stay private until there is documented permission and a cultural review is complete.
            </p>
            <ol className="lines mt-10" data-reveal>
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <div className="lines__row">
                    <span className="lines__no">{pad2(i + 1)}</span>
                    <span>
                      <span className="lines__title" style={{ display: 'block' }}>
                        {s.title}
                      </span>
                      <span className="soft mt-1" style={{ display: 'block' }}>
                        {s.text}
                      </span>
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="stack" style={{ '--gap': '1.25rem', alignSelf: 'end' } as CSSProperties}>
            {stories.length ? (
              stories.slice(0, 3).map((s, i) => <StoryCard key={s.id} story={s} index={i} />)
            ) : (
              <figure className="quote quote--sun" data-reveal>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="quote__mark">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <path d="M12 19v3" />
                </svg>
                <p className="quote__text">The first oral histories are being recorded.</p>
                <figcaption className="quote__by">
                  <strong>Coming soon</strong> <span>— each one published only with the storyteller’s documented consent.</span>
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </section>

      <section id="foodways" className="wrap sec" aria-labelledby="foodways-title">
        <div className="split" style={{ alignItems: 'end' }}>
          <div>
            <Eyebrow>Cultural foodways</Eyebrow>
            <Words id="foodways-title" className="h-lg mt-6" text="From field to table, *across generations.*" />
          </div>
          <div className="stack" style={{ '--gap': '1.5rem', alignItems: 'flex-start' } as CSSProperties} data-reveal>
            <p className="lead">
              Essays on African and diasporic food traditions — how crops are grown, preserved, cooked, and shared — sourced and reviewed in the Knowledge Library.
            </p>
            <Btn href="/learn?topic=community-knowledge#results" variant="leaf">
              Explore the library
            </Btn>
          </div>
        </div>
      </section>

      <div id="share">
        <Cta id="share-title" tone="sun" title="Share a recipe *or a story.*" text="You choose how it’s credited and who can see it — and you can withdraw it at any time.">
          <Btn href="/get-involved#contribute" variant="soil">
            Contribute knowledge
          </Btn>
          <Btn href="/privacy" variant="line" icon={null}>
            How we handle consent
          </Btn>
        </Cta>
      </div>
    </>
  )
}
