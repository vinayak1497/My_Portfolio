import { requireAuth } from '@/lib/auth'
import { getContentBySlug } from '@/lib/content-manager'
import { notFound } from 'next/navigation'
import { CertificateForm } from '../../CertificateForm'

export const metadata = { title: 'Edit Certificate | VK_OS Admin' }

export default async function EditCertificatePage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAuth()
  const { slug } = await params
  const certificate = await getContentBySlug('certificates', slug)
  if (!certificate) notFound()
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[#00ff66] text-xl font-bold tracking-wider uppercase">Edit Certificate</div>
        <div className="font-mono text-[#00ff66]/40 text-xs tracking-wider mt-1">{certificate.frontmatter.title as string}</div>
      </div>
      <CertificateForm certificate={certificate} />
    </div>
  )
}
