import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/JsonLd'
import { RichText } from '@/components/RichText'
import { Eyebrow, Photo } from '@/components/ui'
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
      <header className="theme-clay">
        <div className="container row" style={{ paddingBlock: 'clamp(40px, 5vw, 72px)', gap: '40px 64px' }}>
          <div className="stack" style={{ flex: '1 1 520px', minWidth: 0, gap: 18 }}>
            <nav aria-label="Breadcrumb" className="breadcrumb">
              <ol style={{ color: 'var(--cream)' }}>
                <li><Link href="/food-and-culture#recipes" style={{ color: 'var(--cream)' }}>Recipes</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{r.title}</li>
              </ol>
            </nav>
            {r.region ? <Eyebrow>{r.region}</Eyebrow> : null}
            <h1 className="h1">{r.title}</h1>
            <p className="lede">{r.summary}</p>
            <p style={{ margin: 0, fontWeight: 600 }}>{cook ? `Shared by ${cook}` : 'Shared anonymously'}</p>
            <div className="row" style={{ gap: 16, fontSize: 15 }}>
              {r.serves ? <span>Serves {r.serves}</span> : null}
              {r.time ? <span>{r.time}</span> : null}
            </div>
          </div>
          <div style={{ flex: '0 1 420px', minWidth: 0 }}>
            <Photo media={r.image} arch height="clamp(300px, 32vw, 440px)" priority />
          </div>
        </div>
      </header>
      <div style={{ background: 'var(--card)' }}>
        <div className="container row section" style={{ alignItems: 'flex-start', gap: '48px 72px' }}>
          {r.ingredients?.length ? (
            <section aria-labelledby="ing-title" style={{ flex: '0 1 340px', minWidth: 0 }}>
              <h2 id="ing-title" className="h3" style={{ marginBottom: 14 }}>Ingredients</h2>
              <ul className="rule-list">
                {r.ingredients.map((i, idx) => (
                  <li key={`${i.item}-${idx}`} style={{ padding: '10px 0' }}>
                    {i.quantity ? <strong style={{ fontWeight: 600 }}>{i.quantity} </strong> : null}
                    {i.item}
                  </li>
                ))}
              </ul>
              {r.crops?.length ? (
                <p className="small" style={{ marginTop: 18 }}>
                  Learn about:{' '}
                  {r.crops.map((c, idx) => (
                    <span key={c.id}>
                      {idx > 0 ? ', ' : ''}
                      <Link href={`/learn/crops/${c.slug}`} style={{ color: 'var(--forest)' }}>{c.name}</Link>
                    </span>
                  ))}
                </p>
              ) : null}
            </section>
          ) : null}
          <div className="stack" style={{ flex: '1 1 560px', minWidth: 0, gap: 40 }}>
            {r.steps?.length ? (
              <section aria-labelledby="method-title">
                <h2 id="method-title" className="h3" style={{ marginBottom: 14 }}>Method</h2>
                <ol style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {r.steps.map((s, idx) => (
                    <li key={idx}>{s.body}</li>
                  ))}
                </ol>
              </section>
            ) : null}
            {r.storyBehind ? (
              <section aria-labelledby="story-title">
                <h2 id="story-title" className="h3" style={{ marginBottom: 14 }}>The story behind it</h2>
                <RichText data={r.storyBehind} />
              </section>
            ) : null}
            {r.consent?.withdrawalContact ? (
              <p className="tiny" style={{ margin: 0, color: 'var(--muted)' }}>
                Shared with consent. To ask about or withdraw this recipe, contact {r.consent.withdrawalContact}.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}
