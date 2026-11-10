/** Season switcher: buttons toggle which server-rendered panel is shown and recolour the card. */
export function initSeasons(root: HTMLElement): () => void {
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-season-tab]'))
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-season-panel]'))
  const card = root.matches('[data-season]') ? root : root.querySelector<HTMLElement>('[data-season]')
  const handlers = buttons.map((btn) => {
    const fn = () => {
      const key = btn.getAttribute('data-season-tab')
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)))
      panels.forEach((p) => (p.hidden = p.getAttribute('data-season-panel') !== key))
      if (card && key) card.setAttribute('data-season', key)
    }
    btn.addEventListener('click', fn)
    return fn
  })
  return () => buttons.forEach((btn, i) => btn.removeEventListener('click', handlers[i]))
}
