import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogs, getBlogBySlug } from '@/lib/content-data'
import { MdxRenderer } from '@/components/shared/MdxRenderer'
import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { blogDetailSEO } from '@/lib/seo'
import { BreadcrumbJsonLd, BlogPostingJsonLd } from '@/components/shared/JsonLd'
import { SITE_URL } from '@/lib/seo'

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

  const wordCount = blog.content ? blog.content.split(/\s+/).filter(Boolean).length : 0
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  const allBlogs = await getBlogs()
  const relatedPosts = allBlogs
    .filter((b) => b.slug !== slug && b.published)
    .filter((b) => {
      if (!blog.tags || !b.tags) return false
      return b.tags.some((tag) => blog.tags!.includes(tag))
    })
    .slice(0, 3)

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
        dateModified={blog.date}
        image={`${SITE_URL}/api/og?title=${encodeURIComponent(blog.title)}`}
        keywords={blog.tags}
        wordCount={wordCount}
        articleSection={'Technology'}
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
            <span className="flex items-center gap-1.5">
              <User size={14} aria-hidden="true" />
              Vinayak Kundar
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
              {readingTime} min read
            </span>
            {blog.metadata?.readingTime && (
              <span className="flex items-center gap-1.5">
                <Tag size={14} aria-hidden="true" />
                {blog.metadata.readingTime} min read (estimated)
              </span>
            )}
          </div>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3" role="list" aria-label="Blog tags">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] font-bold text-secondary uppercase border border-secondary px-2 py-0.5"
                  role="listitem"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="article-body leading-relaxed">
          <MdxRenderer code={blog.content} />
        </div>

        {/* Author bio */}
        <footer className="mt-12 border-t-2 border-primary pt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 border-2 border-primary bg-surface-container flex items-center justify-center shrink-0">
              <User size={20} className="text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="font-mono text-xs font-bold text-primary">Vinayak Kundar</p>
              <p className="font-mono text-[10px] text-on-surface-variant mt-1">
                Computer Engineering student at APSIT (Mumbai University), AI builder, full stack developer,
                and GDG On Campus Lead. Building the future one line of code at a time.
              </p>
              <div className="flex gap-3 mt-2">
                <Link
                  href="/about"
                  className="font-mono text-[10px] font-bold text-secondary uppercase hover:text-primary transition-colors"
                >
                  About the Author
                </Link>
                <Link
                  href="/blogs"
                  className="font-mono text-[10px] font-bold text-secondary uppercase hover:text-primary transition-colors"
                >
                  More Posts
                </Link>
              </div>
            </div>
          </div>
        </footer>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-10 border-t-2 border-primary pt-6">
            <h2 className="font-mono text-xs font-bold text-primary uppercase mb-4">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blogs/${related.slug}`}
                  className="border border-outline-variant bg-surface p-3 hover:border-primary transition-colors"
                >
                  <h3 className="font-mono text-[11px] font-bold text-primary">{related.title}</h3>
                  <p className="font-mono text-[10px] text-on-surface-variant mt-1 line-clamp-2">
                    {related.description}
                  </p>
                  <span className="font-mono text-[10px] text-secondary mt-2 inline-block">
                    Read more →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
