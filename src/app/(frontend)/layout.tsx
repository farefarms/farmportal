import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Inter } from 'next/font/google'
import Script from 'next/script'
import type { ReactNode } from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Motion } from '@/components/Motion'
import { Logo } from '@/components/ui'
import { getSiteSettings } from '@/lib/queries'
import { DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'
import './globals.css'

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — Rooted in Ancestral Knowledge. Growing Food Sovereignty.`, template: `%s — ${SITE_NAME}` },
  description: DESCRIPTION,
  openGraph: { siteName: SITE_NAME, type: 'website', locale: 'en_CA' },
}

export const viewport: Viewport = { themeColor: '#1F4D35' }

export default async function FrontendLayout({ children }: { children: ReactNode }) {
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  const settings = await getSiteSettings()
  return (
    <html lang="en-CA" className={`${bricolage.variable} ${inter.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {/* First-load curtain (pure CSS; hidden for reduced motion). */}
        <div className="intro grain" aria-hidden="true">
          <span className="intro__mark brand">
            <Logo size={48} />
            <span className="brand__name" style={{ color: 'var(--cream)' }}>
              FARE Farms<span className="brand__dot">.</span>
            </span>
          </span>
        </div>
        <Header email={settings.contactEmail} place={settings.gardenName ? `${settings.gardenName}` : 'Vancouver, BC'} />
        <main id="main">{children}</main>
        <Footer />
        <Motion />
        {plausible ? (
          // Cookie-free, privacy-friendly analytics — only loaded when configured.
          <Script defer data-domain={plausible} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
        ) : null}
      </body>
    </html>
  )
}
