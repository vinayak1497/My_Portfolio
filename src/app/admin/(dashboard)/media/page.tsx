import { listContent } from '@/lib/content-manager'
import { requireAuth } from '@/lib/auth'
import Link from 'next/link'
import { DeleteButton } from './DeleteButton'
import { Plus } from 'lucide-react'

export default async function AdminMediaPage() {
  await requireAuth()
  const media = await listContent('media')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[#cc88ff] text-xl font-bold tracking-wider uppercase">Media Manager</div>
          <div className="font-mono text-[#cc88ff]/40 text-xs tracking-wider mt-1">{media.length} entries</div>
        </div>
        <Link href="/admin/media/new" className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-xs px-4 py-2.5 border-2 border-[#cc88ff] text-[#cc88ff] hover:bg-[#cc88ff]/10 transition-all">
          <Plus size={14} /> New Media Entry
        </Link>
      </div>

      {media.length === 0 ? (
        <div className="border-2 border-[#cc88ff]/10 bg-[#0d0d0d] p-8 text-center">
          <div className="font-mono text-[#cc88ff]/40 text-sm mb-2">No media entries found</div>
        </div>
      ) : (
        <div className="space-y-2">
          {media.map((m) => (
            <div key={m.slug} className="flex items-center justify-between border border-[#cc88ff]/10 bg-[#0d0d0d] p-4 hover:border-[#cc88ff]/20 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#cc88ff] text-sm font-bold truncate">{m.frontmatter.title as string}</span>
                  <span className="font-mono text-[10px] tracking-wider uppercase px-1.5 py-0.5 border border-[#cc88ff]/30 text-[#cc88ff]/70">{m.frontmatter.type as string}</span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-mono text-[#cc88ff]/40 text-[10px]">{m.frontmatter.publication as string}</span>
                  <span className="font-mono text-[#cc88ff]/20 text-[10px]">{m.frontmatter.date as string}</span>
                  {(m.frontmatter.description as string) && <span className="font-mono text-[#cc88ff]/30 text-[10px] truncate max-w-[200px]">{m.frontmatter.description as string}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <Link href={`/admin/media/${m.slug}/edit`} className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border border-[#cc88ff]/30 text-[#cc88ff]/70 hover:text-[#cc88ff] hover:bg-[#cc88ff]/10 hover:border-[#cc88ff] transition-all">[ EDIT ]</Link>
                <DeleteButton slug={m.slug} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
