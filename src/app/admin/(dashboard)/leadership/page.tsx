import { listContent } from '@/lib/content-manager'
import { requireAuth } from '@/lib/auth'
import Link from 'next/link'
import { DeleteButton } from './DeleteButton'
import { Plus } from 'lucide-react'

export default async function AdminLeadershipPage() {
  await requireAuth()
  const leadership = await listContent('leadership')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[#ff4080] text-xl font-bold tracking-wider uppercase">Leadership Manager</div>
          <div className="font-mono text-[#ff4080]/40 text-xs tracking-wider mt-1">{leadership.length} entries</div>
        </div>
        <Link href="/admin/leadership/new" className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-xs px-4 py-2.5 border-2 border-[#ff4080] text-[#ff4080] hover:bg-[#ff4080]/10 transition-all">
          <Plus size={14} /> New Leadership Entry
        </Link>
      </div>

      {leadership.length === 0 ? (
        <div className="border-2 border-[#ff4080]/10 bg-[#0d0d0d] p-8 text-center">
          <div className="font-mono text-[#ff4080]/40 text-sm mb-2">No leadership entries found</div>
        </div>
      ) : (
        <div className="space-y-2">
          {leadership.map((l) => (
            <div key={l.slug} className="flex items-center justify-between border border-[#ff4080]/10 bg-[#0d0d0d] p-4 hover:border-[#ff4080]/20 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#ff4080] text-sm font-bold truncate">{l.frontmatter.title as string}</span>
                  {(l.frontmatter.xp as number) ? <span className="font-mono text-[10px] text-[#ffcc00]">+{l.frontmatter.xp as number}XP</span> : null}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-mono text-[#ff4080]/40 text-[10px]">{l.frontmatter.organization as string}</span>
                  {(l.frontmatter.role as string) && <span className="font-mono text-[#ff4080]/30 text-[10px]">{l.frontmatter.role as string}</span>}
                  <span className="font-mono text-[#ff4080]/20 text-[10px]">{l.frontmatter.startDate as string}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <Link href={`/admin/leadership/${l.slug}/edit`} className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border border-[#ff4080]/30 text-[#ff4080]/70 hover:text-[#ff4080] hover:bg-[#ff4080]/10 hover:border-[#ff4080] transition-all">[ EDIT ]</Link>
                <DeleteButton slug={l.slug} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
