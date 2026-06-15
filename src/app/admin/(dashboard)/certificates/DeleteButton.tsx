'use client'

import { useActionState } from 'react'
import { deleteCertificate } from './actions'

export function DeleteButton({ slug }: { slug: string }) {
  const deleteWithSlug = deleteCertificate.bind(null, slug)
  const [, action, pending] = useActionState(deleteWithSlug, undefined)

  return (
    <form action={action} className="inline">
      <button
        type="submit"
        disabled={pending}
        onClick={(e) => {
          if (!confirm('Delete this certificate? The PDF will also be removed from Cloudinary.')) e.preventDefault()
        }}
        className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border border-[#ff0040]/40 text-[#ff0040]/70 hover:text-[#ff0040] hover:bg-[#ff0040]/10 hover:border-[#ff0040] transition-all disabled:opacity-40"
      >
        {pending ? '...' : '[ DELETE ]'}
      </button>
    </form>
  )
}
