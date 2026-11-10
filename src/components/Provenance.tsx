import { shortDate } from '@/lib/format'
import type { Review } from '@/lib/types'
import { Icon } from './ui'

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
    <div className="prov grain">
      <h2 className="prov__h">
        <Icon name="shield" size={15} /> Authorship &amp; review
      </h2>
      <dl>
        {rows.map((r) => (
          <div key={r.label}>
            <dt>{r.label}</dt>
            <dd>{r.value}</dd>
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
    <section aria-labelledby="sources-title" className="sources">
      <h2 id="sources-title" className="eyebrow">
        Sources
      </h2>
      <ol>
        {sources.map((s, i) => (
          <li key={`${s.citation}-${i}`} id={`src-${i + 1}`}>
            {s.url ? (
              <a href={s.url} rel="noopener noreferrer">
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
