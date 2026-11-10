import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { CSSProperties } from 'react'

import { RichText } from '@/components/RichText'
import { PageHero, Photo, PhotoCredit } from '@/components/ui'
import { getStory } from '@/lib/queries'

export const revalidate = 300

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const s = await getStory(slug)
  if (!s) return { title: 'Not found' }
  return { title: s.title, description: s.summary, alternates: { canonical: `/food-and-culture/stories/${s.slug}` } }
}

export default async function StoryPage({ params }: { params: Params }) {
  const { slug } = await params
  const s = await getStory(slug)
  if (!s) notFound()
  const teller = s.consent?.attribution === 'anonymous' ? null : s.consent?.attributionText || s.consent?.contributorName

  return (
    <article>
      <PageHero
        id="story-title"
        compact
        tone="soil"
        eyebrow="Oral history"
        title={s.title}
        intro={s.summary}
        crumbs={[{ label: 'Oral histories', href: '/food-and-culture#stories' }, { label: s.title }]}
      >
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--sun)' }}>{teller ? `Told by ${teller}` : 'Shared anonymously'}</p>
      </PageHero>
      <div className="wrap wrap--narrow sec stack" style={{ '--gap': '2.5rem' } as CSSProperties}>
        {s.image ? (
          <figure style={{ margin: 0 }}>
            <div style={{ position: 'relative', aspectRatio: '16 / 10', borderRadius: '2rem', overflow: 'hidden' }}>
              <Photo media={s.image} tone="soil" art="voices" style={{ position: 'absolute', inset: 0 }} />
            </div>
            <PhotoCredit media={s.image} />
          </figure>
        ) : null}
        {s.audio?.url ? (
          <figure className="card card--muted" style={{ margin: 0 }}>
            <audio controls preload="none" src={s.audio.url} style={{ width: '100%' }}>
              Your browser doesn’t support audio playback. The transcript is below.
            </audio>
            <figcaption className="small soft mt-3">Audio recording — full transcript below.</figcaption>
          </figure>
        ) : null}
        <div className="prose">
          <RichText data={s.body} />
        </div>
        {s.transcript ? (
          <details className="card">
            <summary className="h-xs" style={{ cursor: 'pointer' }}>
              Transcript
            </summary>
            <div className="prose mt-6">
              <RichText data={s.transcript} />
            </div>
          </details>
        ) : null}
        <p className="small soft">
          Published with the storyteller’s documented consent and after cultural review.
          {s.consent?.withdrawalContact ? ` To ask about or withdraw this story, contact ${s.consent.withdrawalContact}.` : ''}
        </p>
      </div>
    </article>
  )
}
