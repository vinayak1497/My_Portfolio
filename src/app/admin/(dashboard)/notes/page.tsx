import { listContent } from '@/lib/content-manager'
import { requireAuth } from '@/lib/auth'
import Link from 'next/link'
import { DeleteButton } from './DeleteButton'
import { Plus } from 'lucide-react'

const subjectLabels: Record<string, string> = {
  os: 'OS', dbms: 'DBMS', cn: 'CN', ai: 'AI', toc: 'TOC', 'software-engineering': 'SW Eng',
}
const subjectColors: Record<string, string> = {
  os: 'text-[#00ff66] border-[#00ff66]/30', dbms: 'text-[#0088ff] border-[#0088ff]/30',
  cn: 'text-[#ff6600] border-[#ff6600]/30', ai: 'text-[#cc88ff] border-[#cc88ff]/30',
  toc: 'text-[#ffcc00] border-[#ffcc00]/30', 'software-engineering': 'text-[#ff4080] border-[#ff4080]/30',
}

export default async function AdminNotesPage() {
  await requireAuth()
  const notes = await listContent('notes')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[#00ff66] text-xl font-bold tracking-wider uppercase">Notes Manager</div>
          <div className="font-mono text-[#00ff66]/40 text-xs tracking-wider mt-1">{notes.length} engineering notes</div>
        </div>
        <Link href="/admin/notes/new" className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-xs px-4 py-2.5 border-2 border-[#ff6600] text-[#ff6600] hover:bg-[#ff6600]/10 transition-all">
          <Plus size={14} /> New Note
        </Link>
      </div>

      {notes.length === 0 ? (
        <div className="border-2 border-[#00ff66]/10 bg-[#0d0d0d] p-8 text-center">
          <div className="font-mono text-[#00ff66]/40 text-sm mb-2">No notes found</div>
        </div>
      ) : (
        <div className="space-y-2">
          {notes.map((note) => {
            const subject = (note.frontmatter.subject as string) || ''
            return (
              <div key={note.slug} className="flex items-center justify-between border border-[#00ff66]/10 bg-[#0d0d0d] p-4 hover:border-[#00ff66]/20 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#00ff66] text-sm font-bold truncate">{note.frontmatter.title as string}</span>
                    <span className={`font-mono text-[10px] tracking-wider uppercase px-1.5 py-0.5 border ${subjectColors[subject] || subjectColors.os}`}>{subjectLabels[subject] || subject}</span>
                    <span className="font-mono text-[10px] text-[#00ff66]/30">#{note.frontmatter.order as number}</span>
                    {note.frontmatter.type === 'pdf' ? (
                      <span className="font-mono text-[10px] text-[#ff6600] border border-[#ff6600]/30 px-1.5 py-0.5 uppercase tracking-wider">PDF</span>
                    ) : (
                      <span className="font-mono text-[10px] text-[#0088ff] border border-[#0088ff]/30 px-1.5 py-0.5 uppercase tracking-wider">MDX</span>
                    )}
                  </div>
                  <div className="font-mono text-[#00ff66]/40 text-[10px] mt-1 truncate max-w-md">{note.frontmatter.description as string}</div>
                  {note.frontmatter.fileUrl ? (
                    <div className="font-mono text-[#00ff66]/30 text-[9px] mt-0.5 truncate max-w-md">{String(note.frontmatter.fileUrl)}</div>
                  ) : null}
                </div>
                <div className="flex items-center gap-2 ml-4 shrink-0">
                  <Link href={`/admin/notes/${note.slug}/edit`} className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border border-[#00ff66]/30 text-[#00ff66]/70 hover:text-[#00ff66] hover:bg-[#00ff66]/10 hover:border-[#00ff66] transition-all">[ EDIT ]</Link>
                  <DeleteButton slug={note.slug} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
