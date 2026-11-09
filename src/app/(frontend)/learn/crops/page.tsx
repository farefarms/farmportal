import type { Metadata } from 'next'
import type { CSSProperties } from 'react'

import { CropCard } from '@/components/cards'
import { Eyebrow } from '@/components/ui'
import { listCrops } from '@/lib/queries'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Heritage crop directory',
  description: 'Profiles of culturally significant crops — history, regional names, coastal BC growing advice, culinary uses and seed saving.',
  alternates: { canonical: '/learn/crops' },
}

export default async function CropsPage() {
  const crops = await listCrops()
  return (
    <section className="theme-paper section" aria-labelledby="dir-title">
      <div className="container">
        <div className="split mt-section-head">
          <div className="split__main">
            <Eyebrow>Learn · Heritage crop directory</Eyebrow>
            <h1 id="dir-title" className="h1">
              From seed <span className="accent">to story.</span>
            </h1>
          </div>
          <p className="split__side body-muted" style={{ fontSize: 18 }}>
            Every crop has a story. Explore the histories, growing practices, cultural significance, and food traditions connected to plants that nourish our communities.
          </p>
        </div>
        {crops.length ? (
          <div className="grid" style={{ '--min': '220px' } as CSSProperties}>
            {crops.map((c, i) => (
              <CropCard key={c.id} crop={c} index={i} />
            ))}
          </div>
        ) : (
          <p className="body-muted">The first crop profiles are in cultural review and will appear here once approved.</p>
        )}
      </div>
    </section>
  )
}
