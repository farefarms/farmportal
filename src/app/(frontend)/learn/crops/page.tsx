import type { Metadata } from 'next'

import { CropCard } from '@/components/cards'
import { Cta } from '@/components/Cta'
import { Btn, PageHero } from '@/components/ui'
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
    <>
      <PageHero
        id="dir-title"
        eyebrow="Heritage crop directory"
        title="From seed *to story.*"
        intro="Every crop has a story. Explore the histories, growing practices, cultural significance, and food traditions connected to plants that nourish our communities."
        crumbs={[{ label: 'Learn', href: '/learn' }, { label: 'Heritage crop directory' }]}
      />
      <section className="wrap sec" aria-label="Crop profiles">
        {crops.length ? (
          <div className="cols cols--3">
            {crops.map((c, i) => (
              <CropCard key={c.id} crop={c} index={i} />
            ))}
          </div>
        ) : (
          <p className="soft">The first crop profiles are in cultural review and will appear here once approved.</p>
        )}
      </section>
      <Cta
        id="crop-cta"
        tone="leaf"
        title="Know a crop *we should add?*"
        text="Tell us about the plants your family grows, the names you call them, and how they’re cooked. We research and review every profile with community growers."
      >
        <Btn href="/get-involved#contribute" variant="sun">
          Suggest a crop
        </Btn>
        <Btn href="/learn" variant="line-light">
          Back to the library
        </Btn>
      </Cta>
    </>
  )
}
