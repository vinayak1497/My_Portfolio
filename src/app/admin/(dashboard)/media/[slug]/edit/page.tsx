import { requireAuth } from '@/lib/auth'
import { getContentBySlug } from '@/lib/content-manager'
import { notFound } from 'next/navigation'
import { MediaForm } from '../../MediaForm'

export const metadata = { title: 'Edit Media | VK_OS Admin' }

export default async function EditMediaPage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAuth()
  const { slug } = await params
  const media = await getContentBySlug('media', slug)
  if (!media) notFound()
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[#cc88ff] text-xl font-bold tracking-wider uppercase">Edit Media Entry</div>
        <div className="font-mono text-[#cc88ff]/40 text-xs tracking-wider mt-1">{media.frontmatter.title as string}</div>
      </div>
      <MediaForm media={media} />
    </div>
  )
}
