import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogs } from '@/lib/content-data'
import { BlogCard } from '@/components/blog/BlogCard'
import { FileText, Map, Award, BookOpen } from 'lucide-react'
import { blogsSEO } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/shared/JsonLd'

export const metadata: Metadata = blogsSEO

export default async function BlogsPage() {
  const blogs = await getBlogs()
  const sortedBlogs = blogs
    .filter((blog) => blog.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-6">
      <BreadcrumbJsonLd items={[
        { name: 'Home', item: '/' },
        { name: 'Blogs by Vinayak Kundar', item: '/blogs' },
      ]} />

      <header className="mb-6 border-b-2 border-primary pb-3">
        <h1 className="text-headline-lg-mobile md:text-headline-lg text-primary uppercase flex items-center gap-3">
          <FileText size={32} className="text-tertiary-container" aria-hidden="true" />
          Blogs by Vinayak Kundar
        </h1>
        <p className="text-body-lg text-on-surface-variant mt-2">
          Engineering thoughts, tutorials, and developer insights by Vinayak Kundar — AI, full stack development,
          cloud computing, and career reflections from a Computer Engineering student at APSIT (University of Mumbai).
        </p>
      </header>

      {/* Internal links */}
      <nav className="flex flex-wrap gap-3 mb-4" aria-label="Related pages">
        <Link
          href="/journey"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-secondary uppercase border border-secondary px-2 py-1 hover:bg-secondary hover:text-on-secondary transition-colors"
        >
          <Map size={12} aria-hidden="true" />
          Career Journey
        </Link>
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-secondary uppercase border border-secondary px-2 py-1 hover:bg-secondary hover:text-on-secondary transition-colors"
        >
          <BookOpen size={12} aria-hidden="true" />
          About Vinayak
        </Link>
        <Link
          href="/badges"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-secondary uppercase border border-secondary px-2 py-1 hover:bg-secondary hover:text-on-secondary transition-colors"
        >
          <Award size={12} aria-hidden="true" />
          Certifications
        </Link>
      </nav>

      {sortedBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBlogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="text-center border-dialogue bg-surface p-12 shadow-8bit">
          <p className="font-mono text-lg font-bold text-secondary">NO LOG ENTRIES FOUND</p>
          <p className="font-mono text-xs text-on-surface-variant mt-2">
            Check back later for new dispatches from Vinayak Kundar.
          </p>
        </div>
      )}
    </div>
  )
}
