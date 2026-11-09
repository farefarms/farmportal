import { shortDate } from '@/lib/format'
import type { Review } from '@/lib/types'

/** Authorship, review and sources — shown on every educational page (brief acceptance criteria). */
export function ProvenanceCard({ review, extraRows = [] }: { review?: Review | null; extraRows?: { label: string; value: string }[] }) {
  const rows = [
    review?.contributor ? { label: 'Contributor', value: review.contributor } : null,
    review?.reviewerName ? { label: 'Reviewed by', value: review.reviewerName } : null,
    review?.lastReviewed ? { label: 'Last reviewed', value: shortDate(review.lastReviewed) } : null,
    ...extraRows,
  ].filter(Boolean) as { label: string; value: string }[]
  if (!rows.length) return null
  return (
    <div className="panel theme-forest" style={{ borderRadius: 22, padding: 24 }}>
      <h2 className="tiny accent" style={{ margin: '0 0 14px', fontWeight: 600 }}>
        Authorship &amp; review
      </h2>
      <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15 }}>
        {rows.map((r) => (
          <div key={r.label}>
            <dt style={{ fontSize: 13, color: 'rgba(244,237,225,0.78)' }}>{r.label}</dt>
            <dd style={{ margin: 0 }}>{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function SourcesList({ review }: { review?: Review | null }) {
  const sources = review?.sources ?? []
  if (!sources.length) return null
  return (
    <section aria-labelledby="sources-title" style={{ paddingTop: 24, borderTop: '2px solid var(--ink)' }}>
      <h2 id="sources-title" className="h4" style={{ marginBottom: 12 }}>
        Sources
      </h2>
      <ol style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 15, color: 'var(--body-text)' }}>
        {sources.map((s, i) => (
          <li key={`${s.citation}-${i}`} id={`src-${i + 1}`}>
            {s.url ? (
              <a href={s.url} rel="noopener noreferrer" style={{ color: 'var(--forest)' }}>
                {s.citation}
              </a>
            ) : (
              s.citation
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
