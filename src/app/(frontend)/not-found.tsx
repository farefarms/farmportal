import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="theme-cream section">
      <div className="container stack" style={{ gap: 20, alignItems: 'flex-start' }}>
        <p className="eyebrow">404</p>
        <h1 className="h1">This bed is still resting.</h1>
        <p className="lede">We couldn’t find that page. It may have moved, or it hasn’t been published yet.</p>
        <div className="row">
          <Link href="/" className="btn btn--dark">Go home</Link>
          <Link href="/learn" className="btn btn--outline">Search the Knowledge Library</Link>
        </div>
      </div>
    </section>
  )
}
