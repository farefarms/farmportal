import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText as ConvertRichText } from '@payloadcms/richtext-lexical/react'

import type { RichTextValue } from '@/lib/types'

/** Renders Lexical rich text from the CMS with the site's prose styles. */
export function RichText({ data, className }: { data: RichTextValue; className?: string }) {
  if (!data || !(data as DefaultTypedEditorState).root) return null
  return <ConvertRichText data={data as DefaultTypedEditorState} className={`prose${className ? ` ${className}` : ''}`} />
}
