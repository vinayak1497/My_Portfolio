import { requireAuth } from '@/lib/auth'
import { BlogForm } from '../BlogForm'

export const metadata = { title: 'New Blog | VK_OS Admin' }

export default async function NewBlogPage() {
  await requireAuth()
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[#00ff66] text-xl font-bold tracking-wider uppercase">Create Blog Post</div>
        <div className="font-mono text-[#00ff66]/40 text-xs tracking-wider mt-1">Write a new entry for your engineering journal</div>
      </div>
      <BlogForm />
    </div>
  )
}
