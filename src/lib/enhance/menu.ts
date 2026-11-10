/**
 * Full-screen site menu: open/close, Escape to close, focus kept inside while open,
 * and the preview card follows the hovered or focused link.
 */

export type MenuApi = { open: () => void; close: (restoreFocus?: boolean) => void; destroy: () => void }

export function initMenu(header: HTMLElement): MenuApi | null {
  const button = header.querySelector<HTMLButtonElement>('[data-menu-toggle]')
  const panel = header.querySelector<HTMLElement>('[data-menu]')
  if (!button || !panel) return null
  const label = button.querySelector('[data-menu-label]')
  const caption = panel.querySelector('[data-menu-caption]')
  const defaultCaption = caption?.textContent ?? ''

  const isOpen = () => !panel.hidden

  const open = () => {
    panel.hidden = false
    header.setAttribute('data-open', '')
    button.setAttribute('aria-expanded', 'true')
    if (label) label.textContent = 'Close'
    document.documentElement.classList.add('menu-open')
    panel.querySelector<HTMLElement>('a')?.focus({ preventScroll: true })
  }

  const close = (restoreFocus = true) => {
    if (!isOpen()) return
    panel.hidden = true
    header.removeAttribute('data-open')
    button.setAttribute('aria-expanded', 'false')
    if (label) label.textContent = 'Menu'
    document.documentElement.classList.remove('menu-open')
    if (caption) caption.textContent = defaultCaption
    if (restoreFocus) button.focus({ preventScroll: true })
  }

  const onToggle = () => (isOpen() ? close() : open())

  const onKey = (e: KeyboardEvent) => {
    if (!isOpen()) return
    if (e.key === 'Escape') {
      e.preventDefault()
      close()
      return
    }
    if (e.key !== 'Tab') return
    // Keep focus within the bar + menu while open.
    const focusables = Array.from(header.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter(
      (el) => el.offsetParent !== null && getComputedStyle(el).visibility !== 'hidden' && getComputedStyle(el).opacity !== '0',
    )
    if (!focusables.length) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  const onPreview = (e: Event) => {
    const link = (e.target as HTMLElement).closest<HTMLElement>('[data-blurb]')
    if (link && caption) caption.textContent = link.getAttribute('data-blurb')
  }

  const onClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) close(false)
  }

  button.addEventListener('click', onToggle)
  document.addEventListener('keydown', onKey)
  panel.addEventListener('mouseover', onPreview)
  panel.addEventListener('focusin', onPreview)
  panel.addEventListener('click', onClick)

  return {
    open,
    close,
    destroy: () => {
      button.removeEventListener('click', onToggle)
      document.removeEventListener('keydown', onKey)
      panel.removeEventListener('mouseover', onPreview)
      panel.removeEventListener('focusin', onPreview)
      panel.removeEventListener('click', onClick)
      document.documentElement.classList.remove('menu-open')
    },
  }
}
