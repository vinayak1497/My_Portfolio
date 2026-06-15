'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Users, MapPin, Medal, Trophy, Calendar, Cpu } from 'lucide-react'
import type { HackathonData } from '@/lib/content-data'
import { cn, formatDate } from '@/lib/utils'

interface LeagueAchievementsProps {
  hackathons: HackathonData[]
}

const categories = ['Regional', 'State', 'National', 'International'] as const

function PositionBadge({ position }: { position: string }) {
  const lower = position.toLowerCase()
  let icon = <Medal size={14} />
  let color = 'text-on-surface-variant'

  if (lower.includes('winner') || lower.includes('1st') || lower.includes('champion')) {
    icon = <Trophy size={14} />
    color = 'text-secondary'
  } else if (lower.includes('finalist') || lower.includes('2nd') || lower.includes('runner')) {
    icon = <Medal size={14} />
    color = 'text-tertiary-container'
  }

  return (
    <span className={cn('font-mono text-xs font-bold flex items-center gap-1', color)}>
      {icon}
      {position}
    </span>
  )
}

function TimelineEntry({ hackathon, index }: { hackathon: HackathonData; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className="relative pl-10 pb-8 last:pb-0">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="absolute left-0 top-1 w-6 h-6 rounded-full border-2 border-primary bg-surface flex items-center justify-center z-10"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.1 }}
        className="border-dialogue bg-surface-container p-4 shadow-8bit-sm"
      >
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div className="space-y-1">
            <h4 className="font-mono text-xs font-bold text-primary uppercase">
              {hackathon.projectName}
            </h4>
            <p className="font-mono text-[10px] text-on-surface-variant">
              {hackathon.title}
            </p>
          </div>
          <PositionBadge position={hackathon.position} />
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono text-on-surface-variant/70 mt-2">
          <span className="flex items-center gap-1">
            <MapPin size={10} />
            {hackathon.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={10} />
            {formatDate(hackathon.date)}
          </span>
          <span className="flex items-center gap-1">
            <Users size={10} />
            Team of {hackathon.teamSize}
          </span>
        </div>

        {hackathon.prize && (
          <span className="inline-block mt-2 font-mono text-[10px] font-bold text-tertiary-container border border-tertiary-container/30 px-2 py-0.5">
            PRIZE: {hackathon.prize}
          </span>
        )}

        {hackathon.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {hackathon.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[9px] px-1.5 py-0.5 border border-primary/10 bg-surface text-on-surface-variant flex items-center gap-1"
              >
                <Cpu size={8} />
                {tech}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export function LeagueAchievements({ hackathons }: LeagueAchievementsProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = activeCategory
    ? hackathons.filter((h) => h.category === activeCategory)
    : hackathons

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="border-dialogue bg-surface shadow-8bit overflow-hidden">
      <div className="bg-primary p-3 border-b-2 border-primary-container text-on-primary">
        <h3 className="font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <Trophy size={14} />
          League Achievements
        </h3>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              'font-mono text-[10px] font-bold uppercase px-3 py-1.5 border-2 transition-all',
              activeCategory === null
                ? 'bg-primary text-on-primary border-primary'
                : 'bg-surface text-on-surface-variant border-primary/20 hover:border-primary/50'
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'font-mono text-[10px] font-bold uppercase px-3 py-1.5 border-2 transition-all',
                activeCategory === cat
                  ? 'bg-primary text-on-primary border-primary'
                  : 'bg-surface text-on-surface-variant border-primary/20 hover:border-primary/50'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-primary/20" />

          {sorted.length === 0 && (
            <p className="font-mono text-xs text-on-surface-variant/50 text-center py-8">
              No hackathons found for this category.
            </p>
          )}

          {sorted.map((hackathon, index) => (
            <TimelineEntry key={hackathon.slug} hackathon={hackathon} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
