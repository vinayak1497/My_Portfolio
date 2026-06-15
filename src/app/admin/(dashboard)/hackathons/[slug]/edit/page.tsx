import { requireAuth } from '@/lib/auth'
import { getContentBySlug } from '@/lib/content-manager'
import { notFound } from 'next/navigation'
import { HackathonForm } from '../../HackathonForm'

export const metadata = { title: 'Edit Hackathon | VK_OS Admin' }

export default async function EditHackathonPage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAuth()
  const { slug } = await params
  const hackathon = await getContentBySlug('hackathons', slug)
  if (!hackathon) notFound()
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[#ff6600] text-xl font-bold tracking-wider uppercase">Edit Hackathon</div>
        <div className="font-mono text-[#ff6600]/40 text-xs tracking-wider mt-1">{hackathon.frontmatter.title as string}</div>
      </div>
      <HackathonForm hackathon={hackathon} />
    </div>
  )
}
