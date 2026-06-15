import { requireAuth } from '@/lib/auth'
import { getContentBySlug } from '@/lib/content-manager'
import { notFound } from 'next/navigation'
import { BlogForm } from '../../BlogForm'

export const metadata = { title: 'Edit Blog | VK_OS Admin' }

export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAuth()
  const { slug } = await params
  const blog = await getContentBySlug('blogs', slug)
  if (!blog) notFound()
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[#00ff66] text-xl font-bold tracking-wider uppercase">Edit Blog Post</div>
        <div className="font-mono text-[#00ff66]/40 text-xs tracking-wider mt-1">{blog.frontmatter.title as string}</div>
      </div>
      <BlogForm blog={blog} />
    </div>
  )
}
