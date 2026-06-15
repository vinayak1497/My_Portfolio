'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { ExternalLink, Newspaper, Sparkles, Award, Monitor, MessageSquare, Mic } from 'lucide-react'
import type { MediaData } from '@/lib/content-data'
import { formatDate } from '@/lib/utils'

interface MediaRecognitionProps {
  media: MediaData[]
}

const typeIcons: Record<string, React.ReactNode> = {
  Newspaper: <Newspaper size={14} />,
  Magazine: <Monitor size={14} />,
  'College Recognition': <Award size={14} />,
  'Social Media': <MessageSquare size={14} />,
  Awards: <Sparkles size={14} />,
  Speaking: <Mic size={14} />,
}

const mediaTypes = ['Newspaper', 'Magazine', 'College Recognition', 'Social Media', 'Awards', 'Speaking']

function MediaItem({ item, index }: { item: MediaData; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
      className="border-dialogue bg-surface-container p-4 shadow-8bit-sm hover:shadow-8bit transition-all flex flex-col"
    >
      <div className="flex items-start gap-2 mb-2">
        <span className="text-primary shrink-0 mt-0.5">
          {typeIcons[item.type] || <Newspaper size={14} />}
        </span>
        <div>
          <span className="font-mono text-[9px] font-bold text-on-surface-variant/50 uppercase tracking-wider block">
            {item.publication}
          </span>
          <h4 className="font-mono text-xs font-bold text-primary uppercase mt-0.5 leading-snug">
            {item.title}
          </h4>
        </div>
      </div>

      <p className="font-mono text-[10px] text-on-surface-variant/80 leading-relaxed flex-1">
        {item.description}
      </p>

      <div className="flex items-center justify-between mt-3 pt-2 border-t border-primary/10">
        <span className="font-mono text-[9px] text-on-surface-variant/50">
          {formatDate(item.date)}
        </span>
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1"
          >
            View
            <ExternalLink size={10} />
          </a>
        )}
      </div>
    </motion.div>
  )
}

export function MediaRecognition({ media }: MediaRecognitionProps) {
  const grouped = mediaTypes.reduce(
    (acc, type) => {
      const items = media.filter((m) => m.type === type)
      if (items.length > 0) acc[type] = items
      return acc
    },
    {} as Record<string, MediaData[]>
  )

  const hasMedia = Object.keys(grouped).length > 0

  return (
    <div className="border-dialogue bg-surface shadow-8bit overflow-hidden">
      <div className="bg-primary p-3 border-b-2 border-primary-container text-on-primary">
        <h3 className="font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <Newspaper size={14} />
          Media Recognition
        </h3>
      </div>

      <div className="p-4 space-y-6">
        {!hasMedia && (
          <p className="font-mono text-xs text-on-surface-variant/50 text-center py-6">
            No media mentions yet.
          </p>
        )}

        {Object.entries(grouped).map(([type, items]) => (
          <div key={type}>
            <div className="flex items-center gap-2 mb-3 pb-1.5 border-b border-primary/10">
              <span className="text-primary">{typeIcons[type] || <Newspaper size={14} />}</span>
              <span className="font-mono text-[11px] font-bold text-primary uppercase tracking-wider">
                {type}
              </span>
              <span className="font-mono text-[9px] text-on-surface-variant/40 ml-auto">
                {items.length} ITEM{items.length !== 1 ? 'S' : ''}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map((item, index) => (
                <MediaItem key={item.slug} item={item} index={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
