/**
 * Drifting pollen / firefly specks for dark heroes, drawn on a canvas.
 * Pauses off-screen and in background tabs; draws a single still frame for reduced motion.
 */

type Speck = { x: number; y: number; r: number; vx: number; vy: number; a: number; t: number; c: string }

const COLORS = ['227,169,60', '246,217,160', '244,237,225']

export function startPollen(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => {}
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let specks: Speck[] = []
  let w = 0
  let h = 0
  let raf = 0
  let visible = true

  const seed = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = canvas.getBoundingClientRect()
    w = rect.width
    h = rect.height
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const count = Math.min(90, Math.round((w * h) / 16000))
    specks = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -(0.05 + Math.random() * 0.25),
      a: 0.25 + Math.random() * 0.6,
      t: Math.random() * Math.PI * 2,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))
  }

  const draw = (move: boolean) => {
    ctx.clearRect(0, 0, w, h)
    for (const s of specks) {
      if (move) {
        s.t += 0.02
        s.x += s.vx + Math.sin(s.t) * 0.15
        s.y += s.vy
        if (s.y < -6) {
          s.y = h + 6
          s.x = Math.random() * w
        }
        if (s.x < -6) s.x = w + 6
        if (s.x > w + 6) s.x = -6
      }
      const alpha = s.a * (0.65 + 0.35 * Math.sin(s.t * 1.7))
      ctx.beginPath()
      ctx.fillStyle = `rgba(${s.c},${alpha.toFixed(3)})`
      ctx.shadowColor = `rgba(${s.c},0.8)`
      ctx.shadowBlur = s.r * 4
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const loop = () => {
    draw(true)
    raf = requestAnimationFrame(loop)
  }
  const play = () => {
    cancelAnimationFrame(raf)
    if (!reduced && visible && !document.hidden) raf = requestAnimationFrame(loop)
  }

  seed()
  draw(false)
  play()

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    // A canvas first laid out while hidden has no size yet.
    if (visible && (w === 0 || h === 0)) seed()
    play()
  })
  io.observe(canvas)
  const onResize = () => {
    seed()
    draw(false)
  }
  window.addEventListener('resize', onResize)
  document.addEventListener('visibilitychange', play)

  return () => {
    cancelAnimationFrame(raf)
    io.disconnect()
    window.removeEventListener('resize', onResize)
    document.removeEventListener('visibilitychange', play)
  }
}
