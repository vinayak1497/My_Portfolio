import { listContent } from '@/lib/content-manager'
import { requireAuth } from '@/lib/auth'
import Link from 'next/link'
import { DeleteButton } from './DeleteButton'
import { Plus } from 'lucide-react'

export default async function AdminInternshipsPage() {
  await requireAuth()
  const internships = await listContent('internships')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[#0088ff] text-xl font-bold tracking-wider uppercase">Internship Manager</div>
          <div className="font-mono text-[#0088ff]/40 text-xs tracking-wider mt-1">{internships.length} internships</div>
        </div>
        <Link href="/admin/internships/new" className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-xs px-4 py-2.5 border-2 border-[#0088ff] text-[#0088ff] hover:bg-[#0088ff]/10 transition-all">
          <Plus size={14} /> New Internship
        </Link>
      </div>

      {internships.length === 0 ? (
        <div className="border-2 border-[#0088ff]/10 bg-[#0d0d0d] p-8 text-center">
          <div className="font-mono text-[#0088ff]/40 text-sm mb-2">No internships found</div>
        </div>
      ) : (
        <div className="space-y-2">
          {internships.map((i) => {
            const statusColors: Record<string, string> = {
              Completed: 'text-[#00ff66] border-[#00ff66]/30',
              'In Progress': 'text-[#ffcc00] border-[#ffcc00]/30',
              Archived: 'text-[#ff6600] border-[#ff6600]/30',
            }
            const status = (i.frontmatter.status as string) || 'Completed'
            return (
              <div key={i.slug} className="flex items-center justify-between border border-[#0088ff]/10 bg-[#0d0d0d] p-4 hover:border-[#0088ff]/20 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#0088ff] text-sm font-bold truncate">{i.frontmatter.title as string}</span>
                    <span className={`font-mono text-[10px] tracking-wider uppercase px-1.5 py-0.5 border ${statusColors[status] || statusColors.Completed}`}>{status}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-mono text-[#0088ff]/40 text-[10px]">{i.frontmatter.company as string}</span>
                    <span className="font-mono text-[#0088ff]/20 text-[10px]">{i.frontmatter.duration as string}</span>
                    <span className="font-mono text-[#0088ff]/30 text-[10px]">{i.frontmatter.startDate as string}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4 shrink-0">
                  <Link href={`/admin/internships/${i.slug}/edit`} className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border border-[#0088ff]/30 text-[#0088ff]/70 hover:text-[#0088ff] hover:bg-[#0088ff]/10 hover:border-[#0088ff] transition-all">[ EDIT ]</Link>
                  <DeleteButton slug={i.slug} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
