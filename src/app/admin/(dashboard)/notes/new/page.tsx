import { requireAuth } from '@/lib/auth'
import { NoteForm } from '../NoteForm'

export const metadata = { title: 'New Note | VK_OS Admin' }

export default async function NewNotePage() {
  await requireAuth()
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[#00ff66] text-xl font-bold tracking-wider uppercase">Create Note</div>
        <div className="font-mono text-[#00ff66]/40 text-xs tracking-wider mt-1">Add a new entry to your engineering Pokédex</div>
      </div>
      <NoteForm />
    </div>
  )
}
