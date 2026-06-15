import { requireAuth } from '@/lib/auth'
import { getContentBySlug } from '@/lib/content-manager'
import { notFound } from 'next/navigation'
import { NoteForm } from '../../NoteForm'

export const metadata = { title: 'Edit Note | VK_OS Admin' }

export default async function EditNotePage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAuth()
  const { slug } = await params
  const note = await getContentBySlug('notes', slug)
  if (!note) notFound()
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[#00ff66] text-xl font-bold tracking-wider uppercase">Edit Note</div>
        <div className="font-mono text-[#00ff66]/40 text-xs tracking-wider mt-1">{note.frontmatter.title as string}</div>
      </div>
      <NoteForm note={note} />
    </div>
  )
}
