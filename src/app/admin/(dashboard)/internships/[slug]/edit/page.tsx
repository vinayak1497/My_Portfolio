import { requireAuth } from '@/lib/auth'
import { getContentBySlug } from '@/lib/content-manager'
import { notFound } from 'next/navigation'
import { InternshipForm } from '../../InternshipForm'

export const metadata = { title: 'Edit Internship | VK_OS Admin' }

export default async function EditInternshipPage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAuth()
  const { slug } = await params
  const internship = await getContentBySlug('internships', slug)
  if (!internship) notFound()
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[#0088ff] text-xl font-bold tracking-wider uppercase">Edit Internship</div>
        <div className="font-mono text-[#0088ff]/40 text-xs tracking-wider mt-1">{internship.frontmatter.title as string}</div>
      </div>
      <InternshipForm internship={internship} />
    </div>
  )
}
