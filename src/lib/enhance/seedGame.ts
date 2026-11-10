/**
 * "Plant a seed": tap the soil (or press the button) to plant; six seeds grow a garden.
 * Markup is server-rendered; this adds the behaviour.
 */

const GOAL = 6
const SVG_NS = 'http://www.w3.org/2000/svg'

const SPROUTS = [
  // stem, left leaf, right leaf, optional flower
  { leaf: '#3f8a5a', leaf2: '#2d6146', bloom: '' },
  { leaf: '#2d6146', leaf2: '#3f8a5a', bloom: '#e3a93c' },
  { leaf: '#3f8a5a', leaf2: '#1f4d35', bloom: '#c2562f' },
]

function sproutSvg(kind: number) {
  const k = SPROUTS[kind % SPROUTS.length]
  const svg = document.createElementNS(SVG_NS, 'svg')
  svg.setAttribute('viewBox', '0 0 56 72')
  svg.setAttribute('aria-hidden', 'true')
  svg.innerHTML =
    `<path d="M28 72 V30" stroke="#2d6146" stroke-width="3" stroke-linecap="round"/>` +
    `<path class="sprout__leaf" d="M28 48 C16 48 8 40 8 28 C20 28 28 36 28 48Z" fill="${k.leaf}"/>` +
    `<path class="sprout__leaf" d="M28 40 C40 40 48 32 48 20 C36 20 28 28 28 40Z" fill="${k.leaf2}"/>` +
    (k.bloom ? `<circle cx="28" cy="24" r="7" fill="${k.bloom}"/><circle cx="28" cy="24" r="2.6" fill="#1e1a16" opacity=".55"/>` : '') +
    `<ellipse cx="28" cy="71" rx="12" ry="3" fill="#1e1a16" opacity=".35"/>`
  return svg
}

export function mountSeedGame(root: HTMLElement): () => void {
  const plot = root.querySelector<HTMLElement>('[data-seed-plot]')
  const plantBtn = root.querySelector<HTMLButtonElement>('[data-seed-plant]')
  const resetBtn = root.querySelector<HTMLButtonElement>('[data-seed-reset]')
  const count = root.querySelector<HTMLElement>('[data-seed-count]')
  const ring = root.querySelector<SVGCircleElement>('[data-seed-ring]')
  const status = root.querySelector<HTMLElement>('[data-seed-status]')
  const sub = root.querySelector<HTMLElement>('[data-seed-sub]')
  const done = root.querySelector<HTMLElement>('[data-seed-done]')
  if (!plot) return () => {}
  let planted = 0

  const update = () => {
    plot.setAttribute('data-count', String(planted))
    if (count) count.textContent = String(planted)
    if (ring) ring.setAttribute('stroke-dasharray', `${Math.min(planted / GOAL, 1)} 1`)
    if (status) status.textContent = planted === 0 ? 'Your plot is waiting' : planted < GOAL ? `${planted} planted — keep going` : 'Your garden is growing!'
    if (sub) sub.textContent = planted < GOAL ? `Plant ${GOAL - planted} more to grow a garden` : 'Every garden starts with one small act.'
    if (done) done.hidden = planted < GOAL
    if (resetBtn) resetBtn.hidden = planted === 0
  }

  const plant = (xPct: number, yPct: number) => {
    if (planted >= 24) return
    const s = document.createElement('span')
    s.className = 'sprout'
    s.style.left = `${xPct}%`
    s.style.top = `${yPct}%`
    s.style.zIndex = String(Math.round(yPct))
    const scale = 0.7 + ((yPct - 40) / 60) * 0.6
    s.style.width = `${3.5 * scale}rem`
    s.style.height = `${4.5 * scale}rem`
    s.appendChild(sproutSvg(planted))
    plot.appendChild(s)
    planted += 1
    update()
  }

  const onPlot = (e: MouseEvent) => {
    const rect = plot.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    // Keyboard "clicks" have no position: pick a spot in the soil.
    if (e.detail === 0 || y < 40) return plant(8 + Math.random() * 84, 48 + Math.random() * 44)
    plant(Math.min(Math.max(x, 4), 96), Math.min(Math.max(y, 42), 96))
  }
  const onPlant = () => plant(8 + Math.random() * 84, 48 + Math.random() * 44)
  const onReset = () => {
    plot.querySelectorAll('.sprout').forEach((n) => n.remove())
    planted = 0
    update()
    plantBtn?.focus()
  }

  plot.addEventListener('click', onPlot)
  plantBtn?.addEventListener('click', onPlant)
  resetBtn?.addEventListener('click', onReset)
  update()
  return () => {
    plot.removeEventListener('click', onPlot)
    plantBtn?.removeEventListener('click', onPlant)
    resetBtn?.removeEventListener('click', onReset)
  }
}
