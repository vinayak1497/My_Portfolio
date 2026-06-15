'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Calendar, Clock, Tag } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Blog {
  title: string
  slug: string
  description: string
  date: string
  tags: string[]
  metadata?: {
    readingTime?: number
  }
}

interface BlogCardProps {
  blog: Blog
}

export function BlogCard({ blog }: BlogCardProps) {
  const { title, slug, description, date, tags, metadata } = blog

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group border-dialogue bg-surface p-4 shadow-8bit hover:shadow-8bit-active transition-all flex flex-col justify-between"
    >
      <div className="space-y-3">
        {/* Date and Reading Time */}
        <div className="flex items-center gap-3 font-mono text-[10px] text-on-surface-variant/60 uppercase">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {formatDate(date)}
          </span>
          {metadata?.readingTime && (
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {Math.ceil(metadata.readingTime)} MIN READ
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/blogs/${slug}`} className="block">
          <h3 className="font-mono text-headline-sm font-bold text-primary uppercase line-clamp-2 group-hover:text-secondary transition-colors">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-body-md text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Tags & Action Link */}
      <div className="mt-4 border-t border-primary/10 pt-3 flex flex-wrap justify-between items-center gap-2">
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] font-bold px-1.5 py-0.5 border border-primary/10 bg-surface-variant text-on-surface-variant uppercase"
            >
              #{tag}
            </span>
          ))}
        </div>
        <Link
          href={`/blogs/${slug}`}
          className="font-mono text-[10px] font-bold text-primary hover:text-secondary uppercase border-b-2 border-primary hover:border-secondary transition-all"
        >
          Read Entry →
        </Link>
      </div>
    </motion.article>
  )
}
