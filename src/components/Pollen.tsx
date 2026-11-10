'use client'

import { useEffect, useRef } from 'react'

import { startPollen } from '@/lib/enhance/pollen'

/** Drifting pollen specks over dark heroes (decorative). */
export function Pollen() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => (ref.current ? startPollen(ref.current) : undefined), [])
  return <canvas ref={ref} className="pollen" data-pollen aria-hidden="true" />
}
