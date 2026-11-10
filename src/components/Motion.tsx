'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { initMotion } from '@/lib/enhance/motion'

/** Turns on scroll reveals for each page; after the first load, hero entrances skip the intro delay. */
export function Motion() {
  const pathname = usePathname()
  const first = useRef(true)
  useEffect(() => {
    if (!first.current) document.documentElement.style.setProperty('--intro', '0s')
    first.current = false
    const id = requestAnimationFrame(() => initMotion(document))
    return () => cancelAnimationFrame(id)
  }, [pathname])
  return null
}
