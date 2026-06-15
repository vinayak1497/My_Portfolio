import { listContent } from '@/lib/content-manager'
import { requireAuth } from '@/lib/auth'
import Link from 'next/link'
import { DeleteButton } from './DeleteButton'
import { Plus } from 'lucide-react'

export default async function AdminBlogsPage() {
  await requireAuth()
  const blogs = await listContent('blogs')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[#00ff66] text-xl font-bold tracking-wider uppercase">Blog Manager</div>
          <div className="font-mono text-[#00ff66]/40 text-xs tracking-wider mt-1">{blogs.length} posts</div>
        </div>
        <Link href="/admin/blogs/new" className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-xs px-4 py-2.5 border-2 border-[#0088ff] text-[#0088ff] hover:bg-[#0088ff]/10 transition-all">
          <Plus size={14} /> New Blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="border-2 border-[#00ff66]/10 bg-[#0d0d0d] p-8 text-center">
          <div className="font-mono text-[#00ff66]/40 text-sm mb-2">No blog posts found</div>
        </div>
      ) : (
        <div className="space-y-2">
          {blogs.map((blog) => (
            <div key={blog.slug} className="flex items-center justify-between border border-[#00ff66]/10 bg-[#0d0d0d] p-4 hover:border-[#00ff66]/20 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#00ff66] text-sm font-bold truncate">{blog.frontmatter.title as string}</span>
                  {(blog.frontmatter.published as boolean) ? (
                    <span className="font-mono text-[10px] text-[#00ff66]/50 tracking-wider uppercase border border-[#00ff66]/20 px-1.5 py-0.5">Published</span>
                  ) : (
                    <span className="font-mono text-[10px] text-[#ffcc00]/70 tracking-wider uppercase border border-[#ffcc00]/30 px-1.5 py-0.5">Draft</span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-mono text-[#00ff66]/40 text-[10px]">{(blog.frontmatter.tags as string[])?.join(', ')}</span>
                  <span className="font-mono text-[#00ff66]/20 text-[10px]">{blog.frontmatter.date as string}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <Link href={`/admin/blogs/${blog.slug}/edit`} className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border border-[#00ff66]/30 text-[#00ff66]/70 hover:text-[#00ff66] hover:bg-[#00ff66]/10 hover:border-[#00ff66] transition-all">[ EDIT ]</Link>
                <DeleteButton slug={blog.slug} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
