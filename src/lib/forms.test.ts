import { describe, expect, it } from 'vitest'

import { slugify } from '../fields/slug'
import { isEmail, looksLikeSpam } from './forms'

const fd = (entries: Record<string, string>) => {
  const f = new FormData()
  for (const [k, v] of Object.entries(entries)) f.set(k, v)
  return f
}

describe('looksLikeSpam', () => {
  it('flags a filled honeypot', () => {
    expect(looksLikeSpam(fd({ website: 'http://spam.example' }))).toBe(true)
  })
  it('flags forms submitted too quickly', () => {
    expect(looksLikeSpam(fd({ started: String(Date.now() - 500) }))).toBe(true)
  })
  it('accepts a normal human submission', () => {
    expect(looksLikeSpam(fd({ started: String(Date.now() - 20_000) }))).toBe(false)
  })
  it('accepts submissions without JavaScript (no timestamp)', () => {
    expect(looksLikeSpam(fd({}))).toBe(false)
  })
})

describe('isEmail', () => {
  it('accepts real addresses and rejects junk', () => {
    expect(isEmail('hello@farefarms.ca')).toBe(true)
    expect(isEmail('not-an-email')).toBe(false)
  })
})

describe('slugify', () => {
  it('makes readable, URL-safe slugs', () => {
    expect(slugify('Seed Saving & Storytelling Circle')).toBe('seed-saving-and-storytelling-circle')
    expect(slugify('Ọkwụrụ')).toBe('okwuru')
  })
})
