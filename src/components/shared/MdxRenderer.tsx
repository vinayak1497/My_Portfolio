'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MdxRendererProps {
  code: string
}

export function MdxRenderer({ code }: MdxRendererProps) {
  if (!code) return null

  return (
    <div className="prose max-w-none font-sans text-on-surface leading-relaxed space-y-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {code}
      </ReactMarkdown>
    </div>
  )
}
