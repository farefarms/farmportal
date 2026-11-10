'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type CSSProperties, useEffect, useRef } from 'react'

import { initMenu, type MenuApi } from '@/lib/enhance/menu'
import { MENU, NAV, POSITIONING } from '@/lib/site'
import { Icon, Logo, Photo } from './ui'

const isCurrent = (pathname: string, href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`))

const DEFAULT_CAPTION = 'Afro-Indigenous agricultural heritage, growing on the coast.'

export function Header({ email = 'hello@farefarms.ca', place = 'Vancouver, BC' }: { email?: string; place?: string }) {
  const pathname = usePathname() || '/'
  const ref = useRef<HTMLElement>(null)
  const menu = useRef<MenuApi | null>(null)

  useEffect(() => {
    menu.current = ref.current ? initMenu(ref.current) : null
    return () => menu.current?.destroy()
  }, [])
  useEffect(() => {
    menu.current?.close(false)
  }, [pathname])

  return (
    <header ref={ref} className="hdr">
      <div className="hdr__bar">
        <Link href="/" className="brand" aria-label="FARE Farms — home">
          <Logo />
          <span className="brand__name" aria-hidden="true">
            FARE Farms<span className="brand__dot">.</span>
          </span>
        </Link>

        <nav className="hdr__nav" aria-label="Primary">
          <ul>
            {NAV.filter((n) => n.href !== '/').map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hdr__actions">
          <Link href="/learn" className="hdr__search" aria-label="Search the Knowledge Library">
            <Icon name="search" size={17} />
          </Link>
          <Link href="/get-involved" className="hdr__cta">
            Get Involved <Icon name="arrow-up-right" />
          </Link>
          <button type="button" className="menu-btn" data-menu-toggle aria-expanded="false" aria-controls="site-menu">
            <span className="menu-btn__label" data-menu-label>
              Menu
            </span>
            <span className="menu-btn__icon" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div className="menu" id="site-menu" data-menu hidden>
        <div className="grain" style={{ minHeight: '100%' }}>
          <div className="menu__inner">
            <div className="menu__visual" aria-hidden="true">
              <Photo tone="leaf" art="sprout" label={false} style={{ position: 'absolute', inset: 0 }} />
              <p className="menu__caption" data-menu-caption>
                {DEFAULT_CAPTION}
              </p>
            </div>
            <div className="menu__body">
              <nav aria-label="Site menu">
                <ul className="menu__list">
                  {MENU.map((item, i) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="menu__link"
                        data-blurb={item.blurb}
                        aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}
                        style={{ '--i': i } as CSSProperties}
                      >
                        <span className="menu__no" aria-hidden="true">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="menu__text">
                          <span className="menu__label">{item.label}</span>
                          <span className="menu__blurb">{item.blurb}</span>
                        </span>
                        <span className="menu__arrow" aria-hidden="true">
                          <Icon name="arrow-up-right" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="menu__foot">
                <p>{POSITIONING} An Afro-Indigenous-centred land and food initiative.</p>
                <div className="menu__contact">
                  <a href={`mailto:${email}`}>
                    <Icon name="mail" /> {email}
                  </a>
                  <span>
                    <Icon name="map-pin" /> {place}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
