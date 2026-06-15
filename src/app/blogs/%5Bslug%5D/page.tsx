import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogBySlug } from '@/lib/content-data'
import { MdxRenderer } from '@/components/shared/MdxRenderer'
import { EmulatorWindow } from '@/components/shared/EmulatorWindow'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface BlogPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) return {}

  return {
    title: `${blog.title} | Blogs`,
    description: blog.description,
  }
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog || !blog.published) {
    notFound()
  }

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-6">
      {/* Back button */}
      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 font-mono text-xs font-bold text-on-surface-variant hover:text-primary transition-colors uppercase"
      >
        <ArrowLeft size={16} />
        Back to Blogs
      </Link>

      <EmulatorWindow title={`${blog.title.toUpperCase().slice(0, 20)}...log`} statusText="READ_ONLY">
        <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-6">
          <header className="space-y-3 pb-6 border-b-2 border-primary/10">
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-on-surface-variant/65 uppercase">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {formatDate(blog.date)}
              </span>
              {blog.metadata?.readingTime && (
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {Math.ceil(blog.metadata.readingTime)} MIN READ
                </span>
              )}
            </div>

            <h1 className="font-mono text-headline-md md:text-headline-lg font-bold text-primary uppercase leading-tight">
              {blog.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] font-bold px-2 py-0.5 border border-primary/15 bg-surface-variant text-on-surface-variant uppercase"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          {/* Render compiled MDX content */}
          <article className="prose max-w-none pt-4">
            <MdxRenderer code={blog.content} />
          </article>
        </div>
      </EmulatorWindow>
    </div>
  )
}
