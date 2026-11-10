import type { Metadata } from 'next'

import { PageHero } from '@/components/ui'
import { getSiteSettings } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Accessibility',
  description: 'Our commitment to an accessible website and gardens.',
  alternates: { canonical: '/accessibility' },
}

export default async function AccessibilityPage() {
  const settings = await getSiteSettings()
  return (
    <>
      <PageHero id="a11y-title" compact eyebrow="Accessibility" title="Built so *everyone* can learn with us." intro="Our commitment to an accessible website — and accessible gardens." />
      <section className="wrap wrap--narrow sec">
      <div className="prose">
        <p>
          We want everyone to be able to learn with us, whatever device, browser or assistive technology they use. This website is built to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.
        </p>
        <h2>What we do</h2>
        <ul>
          <li>Every page works with a keyboard and has a “skip to content” link.</li>
          <li>Text meets AA colour-contrast requirements, and layouts adapt to phones and zoom.</li>
          <li>Images carry text descriptions, videos need captions, and audio stories come with transcripts.</li>
          <li>Forms label every field, explain errors, and never rely on colour alone.</li>
        </ul>
        <h2>At events and in the gardens</h2>
        <p>Each event page lists access details where we have them. Tell us about access needs when you register and we’ll do our best to meet them.</p>
        <h2>Tell us what isn’t working</h2>
        <p>
          If something on this site is hard to use, please email <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>. We’ll respond and fix it.
        </p>
      </div>
      </section>
    </>
  )
}
