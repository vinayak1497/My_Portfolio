import { listContent } from '@/lib/content-manager'
import { requireAuth } from '@/lib/auth'
import Link from 'next/link'
import { DeleteButton } from './DeleteButton'
import { Plus } from 'lucide-react'

const rarityColors: Record<string, string> = {
  common: 'text-[#00ff66]/40 border-[#00ff66]/20',
  rare: 'text-[#0088ff] border-[#0088ff]/30',
  epic: 'text-[#cc88ff] border-[#cc88ff]/30',
  legendary: 'text-[#ff6600] border-[#ff6600]/30',
}

export default async function AdminCertificationsPage() {
  await requireAuth()
  const certifications = await listContent('certifications')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[#00ff66] text-xl font-bold tracking-wider uppercase">Certification Manager</div>
          <div className="font-mono text-[#00ff66]/40 text-xs tracking-wider mt-1">{certifications.length} certifications</div>
        </div>
        <Link href="/admin/certifications/new" className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-xs px-4 py-2.5 border-2 border-[#ffcc00] text-[#ffcc00] hover:bg-[#ffcc00]/10 transition-all">
          <Plus size={14} /> New Certification
        </Link>
      </div>

      {certifications.length === 0 ? (
        <div className="border-2 border-[#00ff66]/10 bg-[#0d0d0d] p-8 text-center">
          <div className="font-mono text-[#00ff66]/40 text-sm mb-2">No certifications found</div>
        </div>
      ) : (
        <div className="space-y-2">
          {certifications.map((cert) => {
            const rarity = (cert.frontmatter.rarity as string) || 'common'
            return (
              <div key={cert.slug} className="flex items-center justify-between border border-[#00ff66]/10 bg-[#0d0d0d] p-4 hover:border-[#00ff66]/20 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#00ff66] text-sm font-bold truncate">{cert.frontmatter.title as string}</span>
                    <span className={`font-mono text-[10px] tracking-wider uppercase px-1.5 py-0.5 border ${rarityColors[rarity] || rarityColors.common}`}>{rarity}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-mono text-[#00ff66]/40 text-[10px]">{cert.frontmatter.issuer as string}</span>
                    <span className="font-mono text-[#00ff66]/20 text-[10px]">{cert.frontmatter.date as string}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4 shrink-0">
                  <Link href={`/admin/certifications/${cert.slug}/edit`} className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border border-[#00ff66]/30 text-[#00ff66]/70 hover:text-[#00ff66] hover:bg-[#00ff66]/10 hover:border-[#00ff66] transition-all">[ EDIT ]</Link>
                  <DeleteButton slug={cert.slug} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
