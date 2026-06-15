import { requireAuth } from '@/lib/auth'
import { getContentBySlug } from '@/lib/content-manager'
import { notFound } from 'next/navigation'
import { CertificationForm } from '../../CertificationForm'

export const metadata = { title: 'Edit Certification | VK_OS Admin' }

export default async function EditCertificationPage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAuth()
  const { slug } = await params
  const cert = await getContentBySlug('certifications', slug)
  if (!cert) notFound()
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[#00ff66] text-xl font-bold tracking-wider uppercase">Edit Certification</div>
        <div className="font-mono text-[#00ff66]/40 text-xs tracking-wider mt-1">{cert.frontmatter.title as string}</div>
      </div>
      <CertificationForm certification={cert} />
    </div>
  )
}
