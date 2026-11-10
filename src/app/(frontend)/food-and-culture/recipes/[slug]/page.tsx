import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { CSSProperties } from 'react'

import { JsonLd } from '@/components/JsonLd'
import { RichText } from '@/components/RichText'
import { Eyebrow, pad2, PageHero, Photo, PhotoCredit } from '@/components/ui'
import { getRecipe } from '@/lib/queries'
import { absoluteUrl } from '@/lib/site'

export const revalidate = 300

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const r = await getRecipe(slug)
  if (!r) return { title: 'Not found' }
  return { title: r.title, description: r.summary, alternates: { canonical: `/food-and-culture/recipes/${r.slug}` } }
}

export default async function RecipePage({ params }: { params: Params }) {
  const { slug } = await params
  const r = await getRecipe(slug)
  if (!r) notFound()
  const cook = r.consent?.attribution === 'anonymous' ? null : r.consent?.attributionText || r.consent?.contributorName

  return (
    <article>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Recipe',
          name: r.title,
          description: r.summary,
          url: absoluteUrl(`/food-and-culture/recipes/${r.slug}`),
          ...(cook ? { author: { '@type': 'Person', name: cook } } : {}),
          ...(r.region ? { recipeCuisine: r.region } : {}),
          ...(r.serves ? { recipeYield: r.serves } : {}),
          recipeIngredient: (r.ingredients ?? []).map((i) => [i.quantity, i.item].filter(Boolean).join(' ')),
          recipeInstructions: (r.steps ?? []).map((s) => ({ '@type': 'HowToStep', text: s.body })),
        }}
      />
      <PageHero
        id="recipe-title"
        compact
        tone="clay"
        eyebrow={r.region ? `Recipe · ${r.region}` : 'Recipe'}
        title={r.title}
        intro={r.summary}
        crumbs={[{ label: 'Recipes', href: '/food-and-culture#recipes' }, { label: r.title }]}
      >
        <div className="row" style={{ '--gap': '0.5rem 1.5rem', fontFamily: 'var(--font-display)', fontWeight: 600 } as CSSProperties}>
          <span>{cook ? `Shared by ${cook}` : 'Shared anonymously'}</span>
          {r.serves ? <span>Serves {r.serves}</span> : null}
          {r.time ? <span>{r.time}</span> : null}
        </div>
      </PageHero>

      <div className="wrap sec">
        <figure style={{ margin: '0 0 4rem' }} data-reveal>
          <div style={{ position: 'relative', aspectRatio: '21 / 9', borderRadius: '2rem', overflow: 'hidden' }}>
            <Photo media={r.image} tone="clay" art="bowl" priority style={{ position: 'absolute', inset: 0 }} />
          </div>
          <PhotoCredit media={r.image} />
        </figure>
        <div className="split" style={{ gridTemplateColumns: undefined }}>
          {r.ingredients?.length ? (
            <section aria-labelledby="ing-title">
              <div className="card card--muted card--lg">
                <Eyebrow>You’ll need</Eyebrow>
                <h2 id="ing-title" className="h-md mt-4">
                  Ingredients
                </h2>
                <ul className="lines mt-6">
                  {r.ingredients.map((i, idx) => (
                    <li key={`${i.item}-${idx}`} style={{ padding: '0.75rem 0' }}>
                      {i.quantity ? <strong style={{ fontWeight: 700 }}>{i.quantity} </strong> : null}
                      {i.item}
                    </li>
                  ))}
                </ul>
                {r.crops?.length ? (
                  <p className="small mt-6">
                    Learn about:{' '}
                    {r.crops.map((c, idx) => (
                      <span key={c.id}>
                        {idx > 0 ? ', ' : ''}
                        <Link href={`/learn/crops/${c.slug}`} className="link">
                          {c.name}
                        </Link>
                      </span>
                    ))}
                  </p>
                ) : null}
              </div>
            </section>
          ) : (
            <div />
          )}
          <div className="stack" style={{ '--gap': '3rem', minWidth: 0 } as CSSProperties}>
            {r.steps?.length ? (
              <section aria-labelledby="method-title">
                <Eyebrow>Method</Eyebrow>
                <h2 id="method-title" className="sr-only">
                  Method
                </h2>
                <ol className="lines mt-6">
                  {r.steps.map((s, idx) => (
                    <li key={idx}>
                      <div className="lines__row">
                        <span className="lines__no">{pad2(idx + 1)}</span>
                        <span className="lead lead--sm" style={{ color: 'var(--soil)' }}>
                          {s.body}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}
            {r.storyBehind ? (
              <section aria-labelledby="story-title">
                <Eyebrow>The story behind it</Eyebrow>
                <h2 id="story-title" className="sr-only">
                  The story behind it
                </h2>
                <div className="prose mt-6">
                  <RichText data={r.storyBehind} />
                </div>
              </section>
            ) : null}
            {r.consent?.withdrawalContact ? (
              <p className="small soft">Shared with consent. To ask about or withdraw this recipe, contact {r.consent.withdrawalContact}.</p>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}
