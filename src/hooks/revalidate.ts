import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

type Doc = Record<string, any>
type PathsFor = (doc: Doc) => string[]

const safeRevalidate = (paths: string[]) => {
  for (const path of new Set(paths)) {
    try {
      revalidatePath(path)
    } catch {
      // Not running inside a Next.js request (e.g. seed script) — nothing to revalidate.
    }
  }
}

/** Refreshes the cached public pages that show this document whenever it changes. */
export const revalidateCollection = (pathsFor: PathsFor) => {
  const afterChange: CollectionAfterChangeHook = ({ doc, previousDoc, context }) => {
    if (!context?.disableRevalidate) safeRevalidate([...pathsFor(doc), ...(previousDoc ? pathsFor(previousDoc) : [])])
    return doc
  }
  const afterDelete: CollectionAfterDeleteHook = ({ doc, context }) => {
    if (!context?.disableRevalidate) safeRevalidate(pathsFor(doc))
    return doc
  }
  return { afterChange: [afterChange], afterDelete: [afterDelete] }
}

/** Globals feed the shared layout (header, footer, home), so refresh the whole site. */
export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, context }) => {
  if (!context?.disableRevalidate) {
    try {
      revalidatePath('/', 'layout')
    } catch {
      // Not running inside a Next.js request.
    }
  }
  return doc
}
