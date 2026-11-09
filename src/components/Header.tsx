'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { NAV } from '@/lib/site'
import { Logo, SearchIcon } from './ui'

const isCurrent = (pathname: string, href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`))

export function Header() {
  const pathname = usePathname() || '/'
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="wordmark" aria-label="FARE Farms home">
          <Logo />
          <span>
            FARE<span className="wordmark__dot">.</span>FARMS
          </span>
        </Link>

        <nav aria-label="Primary">
          <ul className="nav">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <Link href="/learn" className="icon-btn" aria-label="Search the Knowledge Library">
            <SearchIcon />
          </Link>
          <Link href="/get-involved" className="btn btn--primary btn--sm">
            Get Involved
          </Link>
          {/* Small screens: a no-JS disclosure menu. Keyed on the path so it closes after navigating. */}
          <details className="mobile-nav" key={pathname}>
            <summary className="icon-btn" aria-label="Menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>
            <div className="mobile-nav__panel">
              <nav aria-label="Mobile">
                <ul>
                  {NAV.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/get-involved" aria-current={isCurrent(pathname, '/get-involved') ? 'page' : undefined}>
                      Get Involved
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
