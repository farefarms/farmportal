import type { Metadata } from 'next'

import { getSiteSettings } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Privacy notice',
  description: 'How FARE Farms collects, uses and protects the information you share with us.',
  alternates: { canonical: '/privacy' },
}

/**
 * A plain-language starting point. Have it reviewed against BC's PIPA (and PIPEDA where it applies)
 * before launch — this is not legal advice.
 */
export default async function PrivacyPage() {
  const settings = await getSiteSettings()
  const contact = settings.privacyContact || settings.contactEmail
  return (
    <section className="theme-cream section">
      <div className="container prose" style={{ maxWidth: 760 }}>
        <h1 className="h1" style={{ marginBottom: 24 }}>Privacy notice</h1>
        <p>
          FARE Farms collects only the information you choose to give us through this website, and uses it only for the purpose you gave it for.
        </p>
        <h2>What we collect, and why</h2>
        <ul>
          <li><strong>Newsletter and marketplace sign-ups</strong> — your email address, to send the updates you asked for.</li>
          <li><strong>Volunteer sign-ups</strong> — your name, email and (optionally) phone, to contact you about volunteering.</li>
          <li><strong>Event registrations</strong> — your name, email and any access needs you share, to manage the event.</li>
          <li><strong>Knowledge contributions</strong> — what you tell us, and how you’d like to be credited, so we can talk with you before anything is shared.</li>
          <li><strong>Producer interest</strong> — your business details, to contact you about the future marketplace.</li>
        </ul>
        <p>With each form we store the exact consent wording you agreed to and the date you agreed.</p>
        <h2>What we never do</h2>
        <ul>
          <li>We never sell or rent your information.</li>
          <li>We never publish a story, recipe or contribution without documented consent and a review with you.</li>
          <li>We don’t use advertising trackers. If analytics are enabled, they are cookie-free and don’t identify you.</li>
        </ul>
        <h2>Stories, recipes and oral histories</h2>
        <p>
          You choose whether a contribution is public, shared only with the community, or kept in our archive. You can change your mind or withdraw it at any time, and we will remove it from the website.
        </p>
        <h2>Your choices</h2>
        <p>
          You can ask to see, correct or delete your information, or unsubscribe, at any time by emailing <a href={`mailto:${contact}`}>{contact}</a>.
        </p>
      </div>
    </section>
  )
}
