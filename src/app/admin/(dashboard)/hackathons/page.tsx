import { listContent } from '@/lib/content-manager'
import { requireAuth } from '@/lib/auth'
import Link from 'next/link'
import { DeleteButton } from './DeleteButton'
import { Plus } from 'lucide-react'

export default async function AdminHackathonsPage() {
  await requireAuth()
  const hackathons = await listContent('hackathons')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[#ff6600] text-xl font-bold tracking-wider uppercase">Hackathon Manager</div>
          <div className="font-mono text-[#ff6600]/40 text-xs tracking-wider mt-1">{hackathons.length} hackathons</div>
        </div>
        <Link href="/admin/hackathons/new" className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-xs px-4 py-2.5 border-2 border-[#ff6600] text-[#ff6600] hover:bg-[#ff6600]/10 transition-all">
          <Plus size={14} /> New Hackathon
        </Link>
      </div>

      {hackathons.length === 0 ? (
        <div className="border-2 border-[#ff6600]/10 bg-[#0d0d0d] p-8 text-center">
          <div className="font-mono text-[#ff6600]/40 text-sm mb-2">No hackathons found</div>
        </div>
      ) : (
        <div className="space-y-2">
          {hackathons.map((h) => {
            const category = (h.frontmatter.category as string) || ''
            return (
              <div key={h.slug} className="flex items-center justify-between border border-[#ff6600]/10 bg-[#0d0d0d] p-4 hover:border-[#ff6600]/20 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#ff6600] text-sm font-bold truncate">{h.frontmatter.title as string}</span>
                    <span className="font-mono text-[10px] tracking-wider uppercase px-1.5 py-0.5 border border-[#ff6600]/30 text-[#ff6600]/70">{h.frontmatter.position as string}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-mono text-[#ff6600]/40 text-[10px]">{category}</span>
                    <span className="font-mono text-[#ff6600]/20 text-[10px]">{h.frontmatter.date as string}</span>
                    {(h.frontmatter.projectName as string) && <span className="font-mono text-[#ff6600]/30 text-[10px]">{h.frontmatter.projectName as string}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4 shrink-0">
                  <Link href={`/admin/hackathons/${h.slug}/edit`} className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border border-[#ff6600]/30 text-[#ff6600]/70 hover:text-[#ff6600] hover:bg-[#ff6600]/10 hover:border-[#ff6600] transition-all">[ EDIT ]</Link>
                  <DeleteButton slug={h.slug} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
