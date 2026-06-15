import { listContent } from '@/lib/content-manager'
import { requireAuth } from '@/lib/auth'
import Link from 'next/link'
import { DeleteButton } from './DeleteButton'
import { Plus, FileText } from 'lucide-react'

const categoryColors: Record<string, string> = {
  certification: 'text-[#ffcc00] border-[#ffcc00]/30',
  internship: 'text-[#0088ff] border-[#0088ff]/30',
  workshop: 'text-[#00ff66] border-[#00ff66]/30',
  seminar: 'text-[#cc88ff] border-[#cc88ff]/30',
  hackathon: 'text-[#ff6600] border-[#ff6600]/30',
  achievement: 'text-[#ff4080] border-[#ff4080]/30',
}

export default async function AdminCertificatesPage() {
  await requireAuth()
  const certificates = await listContent('certificates')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[#00ff66] text-xl font-bold tracking-wider uppercase">Certificate Manager</div>
          <div className="font-mono text-[#00ff66]/40 text-xs tracking-wider mt-1">{certificates.length} certificates</div>
        </div>
        <Link href="/admin/certificates/new" className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-xs px-4 py-2.5 border-2 border-[#ffcc00] text-[#ffcc00] hover:bg-[#ffcc00]/10 transition-all">
          <Plus size={14} /> New Certificate
        </Link>
      </div>

      {certificates.length === 0 ? (
        <div className="border-2 border-[#00ff66]/10 bg-[#0d0d0d] p-8 text-center">
          <div className="font-mono text-[#00ff66]/40 text-sm mb-2">No certificates found</div>
          <div className="font-mono text-[#00ff66]/20 text-xs">Upload your first certificate PDF to get started</div>
        </div>
      ) : (
        <div className="space-y-2">
          {certificates.map((cert) => {
            const category = String(cert.frontmatter.category || 'certification')
            const name = cert.frontmatter.title as string
            const issuer = cert.frontmatter.issuer as string
            const issueDate = String(cert.frontmatter.issueDate || '')
            const hasPdf = !!cert.frontmatter.certificatePdfUrl
            const featured = cert.frontmatter.featured === true
            const published = cert.frontmatter.published !== false

            return (
              <div key={cert.slug} className="flex items-center justify-between border border-[#00ff66]/10 bg-[#0d0d0d] p-4 hover:border-[#00ff66]/20 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {hasPdf && <FileText size={12} className="text-[#ffcc00] shrink-0" />}
                    <span className="font-mono text-[#00ff66] text-sm font-bold truncate">{name}</span>
                    <span className={`font-mono text-[10px] tracking-wider uppercase px-1.5 py-0.5 border ${categoryColors[category] || categoryColors.certification}`}>{category}</span>
                    {featured && <span className="font-mono text-[10px] text-[#ffcc00] border border-[#ffcc00]/30 px-1.5 py-0.5">★ FEATURED</span>}
                    {!published && <span className="font-mono text-[10px] text-[#ff4080] border border-[#ff4080]/30 px-1.5 py-0.5">DRAFT</span>}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-mono text-[#00ff66]/40 text-[10px]">{issuer}</span>
                    <span className="font-mono text-[#00ff66]/20 text-[10px]">{issueDate}</span>
                    {hasPdf && <span className="font-mono text-[#00ff66]/30 text-[10px]">✓ PDF uploaded</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4 shrink-0">
                  <Link href={`/admin/certificates/${cert.slug}/edit`} className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border border-[#00ff66]/30 text-[#00ff66]/70 hover:text-[#00ff66] hover:bg-[#00ff66]/10 hover:border-[#00ff66] transition-all">[ EDIT ]</Link>
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
