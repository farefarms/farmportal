/**
 * Scroll reveals: elements marked `data-reveal` (and `.words` headings) fade and rise into view.
 * Content is fully visible without JavaScript; the `motion` class on <html> opts into the effect,
 * and it is skipped for people who prefer reduced motion.
 */

let observer: IntersectionObserver | null = null

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initMotion(root: ParentNode = document) {
  if (typeof window === 'undefined' || reduced() || !('IntersectionObserver' in window)) return
  document.documentElement.classList.add('motion')
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer?.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
  }
  root.querySelectorAll('[data-reveal]:not(.is-in), .words:not(.is-in)').forEach((el) => observer?.observe(el))
}
