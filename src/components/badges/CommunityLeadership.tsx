'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, animate } from 'motion/react'
import { Users, Calendar, UserPlus, Sparkles, Heart } from 'lucide-react'
import type { LeadershipData } from '@/lib/content-data'
import { formatDate } from '@/lib/utils'

interface CommunityLeadershipProps {
  leadership: LeadershipData[]
}

function AnimatedCounter({
  value,
  label,
  icon,
  suffix = '',
}: {
  value: number
  label: string
  icon: React.ReactNode
  suffix?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, value, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.floor(v)),
    })
    return () => controls.stop()
  }, [isInView, value])

  return (
    <div ref={ref} className="border-dialogue bg-surface-container p-4 shadow-8bit-sm text-center flex-1 min-w-[140px]">
      <div className="w-10 h-10 mx-auto mb-2 border-2 border-primary bg-surface flex items-center justify-center text-primary">
        {icon}
      </div>
      <motion.span
        className="font-mono text-headline-sm font-bold text-primary block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {display.toLocaleString()}{suffix}
      </motion.span>
      <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mt-1 block">
        {label}
      </span>
    </div>
  )
}

function ImpactCard({
  entry,
  index,
}: {
  entry: LeadershipData
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className="border-dialogue bg-surface-container p-4 shadow-8bit-sm hover:shadow-8bit transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h4 className="font-mono text-xs font-bold text-primary uppercase">
            {entry.title}
          </h4>
          <p className="font-mono text-[10px] text-on-surface-variant mt-0.5">
            {entry.organization} — {entry.role}
          </p>
        </div>

        <span className="font-mono text-[9px] font-bold uppercase px-2 py-0.5 border border-primary/20 bg-surface text-primary shrink-0">
          {entry.initiativeType}
        </span>
      </div>

      <p className="font-mono text-[10px] text-on-surface-variant/80 leading-relaxed mb-3 italic">
        &ldquo;{entry.impact}&rdquo;
      </p>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] font-mono text-on-surface-variant/70">
        <span className="flex items-center gap-1">
          <Heart size={10} className="text-secondary" />
          {entry.peopleImpacted.toLocaleString()}+ Lives Impacted
        </span>
        <span className="flex items-center gap-1">
          <Users size={10} />
          {entry.volunteersManaged} Volunteers
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={10} />
          {entry.eventsConducted} Events
        </span>
        <span className="flex items-center gap-1">
          <Sparkles size={10} className="text-tertiary-container" />
          +{entry.xp} XP
        </span>
      </div>

      <div className="mt-2 font-mono text-[9px] text-on-surface-variant/50">
        {formatDate(entry.startDate)} — {entry.endDate ? formatDate(entry.endDate) : 'Present'}
      </div>
    </motion.div>
  )
}

export function CommunityLeadership({ leadership }: CommunityLeadershipProps) {
  const totalPeople = leadership.reduce((sum, e) => sum + e.peopleImpacted, 0)
  const totalEvents = leadership.reduce((sum, e) => sum + e.eventsConducted, 0)
  const totalVolunteers = leadership.reduce((sum, e) => sum + e.volunteersManaged, 0)
  const totalXp = leadership.reduce((sum, e) => sum + e.xp, 0)

  const sorted = [...leadership].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )

  return (
    <div className="border-dialogue bg-surface shadow-8bit overflow-hidden">
      <div className="bg-primary p-3 border-b-2 border-primary-container text-on-primary">
        <h3 className="font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <Heart size={14} />
          Community Leadership
        </h3>
      </div>

      <div className="p-4 space-y-6">
        <div className="flex flex-wrap gap-3">
          <AnimatedCounter value={totalPeople} label="Lives Impacted" icon={<Heart size={18} />} suffix="+" />
          <AnimatedCounter value={totalEvents} label="Events Conducted" icon={<Calendar size={18} />} />
          <AnimatedCounter value={totalVolunteers} label="Volunteers Managed" icon={<UserPlus size={18} />} />
          <AnimatedCounter value={totalXp} label="XP Earned" icon={<Sparkles size={18} />} suffix=" XP" />
        </div>

        <div className="space-y-3">
          {sorted.length === 0 && (
            <p className="font-mono text-xs text-on-surface-variant/50 text-center py-6">
              No community leadership entries yet.
            </p>
          )}
          {sorted.map((entry, index) => (
            <ImpactCard key={entry.slug} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
