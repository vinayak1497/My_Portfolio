import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogs, getBlogBySlug } from '@/lib/content-data'
import { MdxRenderer } from '@/components/shared/MdxRenderer'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { blogDetailSEO } from '@/lib/seo'
import { BreadcrumbJsonLd, BlogPostingJsonLd } from '@/components/shared/JsonLd'

interface BlogPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const blogs = await getBlogs()
  return blogs.filter((b) => b.published).map((blog) => ({
    slug: blog.slug,
  }))
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) return {}
  return blogDetailSEO(blog.title, blog.description, slug, blog.date)
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    notFound()
  }

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-6">
      <BreadcrumbJsonLd items={[
        { name: 'Home', item: '/' },
        { name: 'Blogs', item: '/blogs' },
        { name: blog.title, item: `/blogs/${blog.slug}` },
      ]} />
      <BlogPostingJsonLd
        title={blog.title}
        description={blog.description}
        url={`/blogs/${blog.slug}`}
        datePublished={blog.date}
      />

      {/* Back navigation */}
      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 font-mono text-xs font-bold text-on-surface-variant hover:text-primary transition-colors uppercase"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to Logs
      </Link>

      <article className="max-w-3xl mx-auto">
        <header className="mb-8 border-b-2 border-primary pb-4">
          <h1 className="text-headline-md md:text-headline-lg font-bold text-primary mb-3">
            {blog.title}
          </h1>
          <div className="flex flex-wrap gap-4 font-mono text-xs text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} aria-hidden="true" />
              {formatDate(blog.date)}
            </span>
            {blog.metadata?.readingTime && (
              <span className="flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                {blog.metadata.readingTime} min read
              </span>
            )}
          </div>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] font-bold text-secondary uppercase border border-secondary px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="article-body leading-relaxed">
          <MdxRenderer code={blog.content} />
        </div>
      </article>
    </div>
  )
}
