import Link from 'next/link'
import type { CSSProperties } from 'react'

import { getSiteSettings } from '@/lib/queries'
import { NAV, POSITIONING } from '@/lib/site'
import { SubscribeForm } from './forms/Forms'
import { BrandMark } from './ui'

export async function Footer() {
  const settings = await getSiteSettings()
  const addressLines = (settings.gardenAddress || '').split('\n').filter(Boolean)
  return (
    <footer className="ftr grain">
      <div className="mudcloth layer" style={{ '--o': 0.04 } as CSSProperties} aria-hidden="true" />
      <div className="ftr__inner">
        <div className="ftr__grid">
          <div>
            <h2 className="ftr__title">
              Grow with us. <span>Season by season.</span>
            </h2>
            <p className="mt-5 mw-md" style={{ color: 'rgb(244 237 225 / 0.75)' }}>
              Updates from the garden, new learning resources, upcoming gatherings, and marketplace news.
            </p>
            <div className="mt-8 mw-md">
              <SubscribeForm dark idPrefix="footer" />
            </div>
          </div>

          <nav aria-labelledby="ftr-explore">
            <h3 className="ftr__h" id="ftr-explore">
              Explore
            </h3>
            <ul className="ftr__links">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/get-involved">Get Involved</Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="ftr__h">Visit</h3>
            <address className="ftr__address">
              {settings.gardenName}
              {addressLines.map((line) => (
                <span key={line}>
                  <br />
                  {line}
                </span>
              ))}
            </address>
            {settings.gardenHours ? <p className="mt-2 small" style={{ color: 'rgb(244 237 225 / 0.75)' }}>Garden hours: {settings.gardenHours}</p> : null}
            <p className="mt-5">
              <a href={`mailto:${settings.contactEmail}`} style={{ textDecoration: 'underline', textUnderlineOffset: 4 }}>
                {settings.contactEmail}
              </a>
            </p>
            <p className="ftr__ack">{settings.landAcknowledgment}</p>
          </div>
        </div>

        <p className="ftr__giant" aria-hidden="true">
          FARE FARMS
        </p>
        <div className="ftr__bottom">
          <BrandMark />
          <p>
            © {new Date().getFullYear()} FARE Farms. {POSITIONING}
          </p>
          <div className="ftr__legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/accessibility">Accessibility</Link>
            <Link href="/admin">Team login</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
