import Link from 'next/link'

import { getSiteSettings } from '@/lib/queries'
import { NAV, POSITIONING } from '@/lib/site'
import { SubscribeForm } from './forms/Forms'

export async function Footer() {
  const settings = await getSiteSettings()
  const addressLines = (settings.gardenAddress || '').split('\n').filter(Boolean)
  return (
    <footer className="site-footer theme-ink">
      <div className="container" style={{ paddingBlock: 'clamp(56px, 6vw, 80px) 32px' }}>
        <div className="split" style={{ paddingBottom: 48, borderBottom: '1px solid rgba(244,237,225,0.16)' }}>
          <div className="split__main">
            <h2 className="h2" style={{ fontSize: 'clamp(30px, 3vw, 44px)', marginBottom: 12 }}>
              Grow with us. <span className="accent">Season by season.</span>
            </h2>
            <p className="body-muted" style={{ maxWidth: 460 }}>
              Updates from the garden, new learning resources, upcoming gatherings, and marketplace news.
            </p>
          </div>
          <div className="split__side" style={{ flexBasis: 440 }}>
            <SubscribeForm dark idPrefix="footer" />
          </div>
        </div>

        <div className="row" style={{ alignItems: 'flex-start', gap: '40px 64px', paddingTop: 44 }}>
          <nav aria-labelledby="footer-explore" style={{ flex: '1 1 220px' }}>
            <h3 className="footer-heading" id="footer-explore">Explore</h3>
            <ul className="footer-links">
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
          <div style={{ flex: '1 1 220px' }}>
            <h3 className="footer-heading">Visit</h3>
            <address style={{ fontStyle: 'normal', fontSize: 15, lineHeight: 1.75 }}>
              {settings.gardenName}
              {addressLines.map((line) => (
                <span key={line}>
                  <br />
                  {line}
                </span>
              ))}
            </address>
            {settings.gardenHours ? <p className="tiny" style={{ margin: '10px 0 0' }}>Garden hours: {settings.gardenHours}</p> : null}
            <p style={{ margin: '10px 0 0' }}>
              <a href={`mailto:${settings.contactEmail}`} style={{ color: 'var(--marigold)', textDecoration: 'underline', textUnderlineOffset: 5 }}>
                {settings.contactEmail}
              </a>
            </p>
          </div>
          <p style={{ flex: '2 1 380px', margin: 0, fontFamily: 'var(--font-display)', fontSize: 20, lineHeight: 1.5, color: 'rgba(244,237,225,0.92)' }}>
            {settings.landAcknowledgment}
          </p>
        </div>

        <p className="footer-wordmark" aria-hidden="true">
          FARE.FARMS
        </p>
        <div className="row" style={{ justifyContent: 'space-between', marginTop: 24, paddingTop: 18, borderTop: '1px solid rgba(244,237,225,0.16)', fontSize: 13.5, color: 'rgba(244,237,225,0.75)' }}>
          <span>
            © {new Date().getFullYear()} FARE Farms. {POSITIONING}
          </span>
          <span className="row" style={{ gap: 20 }}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/accessibility">Accessibility</Link>
            <Link href="/admin">Team login</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
