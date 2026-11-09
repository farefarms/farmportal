import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { RichText } from '@/components/RichText'
import { Eyebrow, Photo } from '@/components/ui'
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
      <header className="theme-paper">
        <div className="container stack" style={{ paddingBlock: 'clamp(40px, 5vw, 72px)', gap: 18, maxWidth: 960 }}>
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <ol>
              <li><Link href="/food-and-culture#stories">Oral histories</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{s.title}</li>
            </ol>
          </nav>
          <Eyebrow>Oral history</Eyebrow>
          <h1 className="h1" style={{ marginTop: -8 }}>{s.title}</h1>
          <p className="lede">{s.summary}</p>
          <p style={{ margin: 0, fontWeight: 600 }}>{teller ? `Told by ${teller}` : 'Shared anonymously'}</p>
        </div>
      </header>
      <div style={{ background: 'var(--card)' }}>
        <div className="container stack section" style={{ gap: 32, maxWidth: 900 }}>
          {s.image ? <Photo media={s.image} height="clamp(260px, 32vw, 440px)" /> : null}
          {s.audio?.url ? (
            <figure style={{ margin: 0 }}>
              <audio controls preload="none" src={s.audio.url} style={{ width: '100%' }}>
                Your browser doesn’t support audio playback. The transcript is below.
              </audio>
              <figcaption className="tiny" style={{ marginTop: 8, color: 'var(--muted)' }}>Audio recording — full transcript below.</figcaption>
            </figure>
          ) : null}
          <RichText data={s.body} />
          {s.transcript ? (
            <details>
              <summary className="h4" style={{ cursor: 'pointer' }}>Transcript</summary>
              <div style={{ marginTop: 16 }}>
                <RichText data={s.transcript} />
              </div>
            </details>
          ) : null}
          <p className="tiny" style={{ margin: 0, color: 'var(--muted)' }}>
            Published with the storyteller’s documented consent and after cultural review.
            {s.consent?.withdrawalContact ? ` To ask about or withdraw this story, contact ${s.consent.withdrawalContact}.` : ''}
          </p>
        </div>
      </div>
    </article>
  )
}
