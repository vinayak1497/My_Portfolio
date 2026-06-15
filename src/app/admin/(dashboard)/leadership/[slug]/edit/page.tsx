import { requireAuth } from '@/lib/auth'
import { getContentBySlug } from '@/lib/content-manager'
import { notFound } from 'next/navigation'
import { LeadershipForm } from '../../LeadershipForm'

export const metadata = { title: 'Edit Leadership | VK_OS Admin' }

export default async function EditLeadershipPage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAuth()
  const { slug } = await params
  const leadership = await getContentBySlug('leadership', slug)
  if (!leadership) notFound()
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[#ff4080] text-xl font-bold tracking-wider uppercase">Edit Leadership Entry</div>
        <div className="font-mono text-[#ff4080]/40 text-xs tracking-wider mt-1">{leadership.frontmatter.title as string}</div>
      </div>
      <LeadershipForm leadership={leadership} />
    </div>
  )
}
