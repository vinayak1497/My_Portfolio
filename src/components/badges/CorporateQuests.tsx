'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Building2, Clock, Award, Hourglass, ExternalLink, Zap } from 'lucide-react'
import type { InternshipData } from '@/lib/content-data'
import { cn, formatDate } from '@/lib/utils'

interface CorporateQuestsProps {
  internships: InternshipData[]
}

const statusConfig = {
  Completed: {
    label: 'COMPLETED',
    classes: 'bg-emerald-100 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-400',
  },
  'In Progress': {
    label: 'IN PROGRESS',
    classes: 'bg-blue-100 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border-blue-400',
  },
  Archived: {
    label: 'ARCHIVED',
    classes: 'bg-gray-100 dark:bg-gray-800/40 text-gray-600 dark:text-gray-400 border-gray-400',
  },
}

function QuestCard({ internship, index }: { internship: InternshipData; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const status = statusConfig[internship.status]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
      className="border-dialogue bg-surface-container p-4 shadow-8bit-sm hover:shadow-8bit transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 border-2 border-primary bg-surface flex items-center justify-center shrink-0">
            <Building2 size={18} className="text-primary" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-primary uppercase">
              {internship.title}
            </h4>
            <p className="font-mono text-[10px] text-on-surface-variant mt-0.5">
              {internship.company}
            </p>
          </div>
        </div>

        <span
          className={cn(
            'font-mono text-[9px] font-bold uppercase px-2 py-0.5 border shrink-0',
            status.classes
          )}
        >
          {status.label}
        </span>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] font-mono text-on-surface-variant/70 mb-3">
        <span className="flex items-center gap-1">
          <Hourglass size={10} />
          {internship.duration}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={10} />
          {formatDate(internship.startDate)} — {formatDate(internship.endDate)}
        </span>
        <span className="flex items-center gap-1">
          <Zap size={10} className="text-secondary" />
          {internship.hours} HOURS
        </span>
      </div>

      {internship.skills.length > 0 && (
        <div className="border-t border-primary/10 pt-3 mt-3">
          <span className="font-mono text-[9px] font-bold text-on-surface-variant/50 uppercase tracking-wider block mb-2">
            Rewards Unlocked
          </span>
          <div className="flex flex-wrap gap-1.5">
            {internship.skills.map((skill) => (
              <span
                key={skill}
                className="font-mono text-[9px] font-bold px-2 py-0.5 border border-primary/10 bg-surface text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {internship.certificateUrl && (
        <div className="mt-3 pt-2 border-t border-dashed border-outline-variant">
          <a
            href={internship.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1"
          >
            <Award size={12} />
            VIEW CERTIFICATE
            <ExternalLink size={10} />
          </a>
        </div>
      )}
    </motion.div>
  )
}

export function CorporateQuests({ internships }: CorporateQuestsProps) {
  const sorted = [...internships].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )

  return (
    <div className="border-dialogue bg-surface shadow-8bit overflow-hidden">
      <div className="bg-primary p-3 border-b-2 border-primary-container text-on-primary">
        <h3 className="font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <Award size={14} />
          Corporate Quests
        </h3>
      </div>

      <div className="p-4 space-y-4">
        {sorted.length === 0 && (
          <p className="font-mono text-xs text-on-surface-variant/50 text-center py-8">
            No internships logged yet.
          </p>
        )}
        {sorted.map((internship, index) => (
          <QuestCard key={internship.slug} internship={internship} index={index} />
        ))}
      </div>
    </div>
  )
}
