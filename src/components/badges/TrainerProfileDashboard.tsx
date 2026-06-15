'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, animate } from 'motion/react'
import {
  Award,
  Zap,
  BookOpen,
  Trophy,
  Briefcase,
  Users,
  Building2,
  Calendar,
  Clock,
  BarChart3,
} from 'lucide-react'
import type { CertificationData, HackathonData, InternshipData, LeadershipData } from '@/lib/content-data'

interface AnimatedCounterProps {
  from: number
  to: number
  label: string
  icon: React.ReactNode
}

function AnimatedCounter({ from, to, label, icon }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })
  const [display, setDisplay] = useState(from)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(from, to, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (val) => setDisplay(Math.floor(val)),
    })
    return () => controls.stop()
  }, [isInView, from, to])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="border-dialogue bg-surface-container p-4 shadow-8bit-sm flex flex-col items-center justify-center gap-2"
    >
      <div className="w-10 h-10 bg-tertiary-container border-2 border-primary flex items-center justify-center text-primary shadow-8bit-sm rounded-sm">
        {icon}
      </div>
      <span className="font-mono text-3xl font-bold text-primary tabular-nums">
        {display.toLocaleString()}
      </span>
      <span className="font-mono text-[10px] text-on-surface-variant/60 uppercase tracking-wider text-center leading-tight">
        {label}
      </span>
    </motion.div>
  )
}

interface IssuerBarProps {
  name: string
  count: number
  maxCount: number
}

function IssuerBar({ name, count, maxCount }: IssuerBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const percent = maxCount > 0 ? (count / maxCount) * 100 : 0

  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] text-on-surface-variant uppercase w-28 shrink-0 text-right truncate">
        {name}
      </span>
      <div className="flex-1 h-5 bg-surface-variant border-2 border-primary rounded-sm overflow-hidden p-0.5">
        <motion.div
          className="h-full bg-tertiary-container"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percent}%` } : { width: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
      <span className="font-mono text-[10px] text-primary font-bold w-6 shrink-0">
        {count}
      </span>
    </div>
  )
}

interface TrainerProfileDashboardProps {
  certifications: CertificationData[]
  hackathons: HackathonData[]
  internships: InternshipData[]
  leadership: LeadershipData[]
}

export function TrainerProfileDashboard({
  certifications,
  hackathons,
  internships,
  leadership,
}: TrainerProfileDashboardProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -120px 0px' })

  const totalXp = leadership.reduce((sum, l) => sum + l.xp, 0)
  const level = Math.max(1, Math.floor(totalXp / 10000) + 1)
  const xpInLevel = totalXp % 10000
  const nextLevelXp = 10000
  const progressPercent = (xpInLevel / nextLevelXp) * 100

  const certCount = certifications.length
  const hackCount = hackathons.length
  const internCount = internships.length
  const leadershipCount = leadership.length

  const uniqueIssuers = new Set(certifications.map((c) => c.issuer))
  internships.forEach((i) => uniqueIssuers.add(i.company))
  const companiesEngaged = uniqueIssuers.size

  const totalEvents = leadership.reduce((sum, l) => sum + l.eventsConducted, 0)

  const certHours = certifications.reduce((sum, c) => sum + (c.hours ?? 0), 0)
  const internHours = internships.reduce((sum, i) => sum + i.hours, 0)
  const totalHours = certHours + internHours

  const issuerMap = new Map<string, number>()
  certifications.forEach((c) => {
    issuerMap.set(c.issuer, (issuerMap.get(c.issuer) ?? 0) + 1)
  })
  const issuerEntries = [...issuerMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
  const maxIssuerCount = issuerEntries.length > 0 ? issuerEntries[0][1] : 1

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Trainer Profile Header */}
      <div className="border-dialogue bg-surface p-4 md:p-6 shadow-8bit">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-tertiary-container border-2 border-primary flex items-center justify-center text-primary shadow-8bit-sm rounded-sm">
              <Award size={28} />
            </div>
            <div>
              <span className="font-mono text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">
                Trainer Profile
              </span>
              <h2 className="font-mono text-headline-sm md:text-headline-md font-bold text-primary mt-0.5 tracking-wide">
                VINAYAK KUNDAR
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="font-mono text-[11px] font-bold text-tertiary uppercase">
                  LEVEL {level}
                </span>
                <span className="text-on-surface-variant/30">|</span>
                <span className="font-mono text-[10px] text-on-surface-variant/60 uppercase">
                  {totalXp.toLocaleString()} XP
                </span>
              </div>
            </div>
          </div>

          {/* Progress to next level */}
          <div className="w-full md:w-72 space-y-1.5">
            <div className="flex justify-between font-mono text-[10px] font-bold text-on-surface-variant">
              <span className="flex items-center gap-1">
                <Zap size={11} className="text-tertiary-container" />
                XP TO NEXT LEVEL
              </span>
              <span>
                {xpInLevel.toLocaleString()} / {nextLevelXp.toLocaleString()}
              </span>
            </div>
            <div className="h-4 bg-surface-variant border-2 border-primary rounded-sm overflow-hidden p-0.5">
              <motion.div
                className="h-full bg-tertiary-container"
                initial={{ width: 0 }}
                animate={isInView ? { width: `${progressPercent}%` } : { width: 0 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Animated Counters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <AnimatedCounter from={0} to={certCount} label="CERTIFICATIONS" icon={<BookOpen size={16} />} />
        <AnimatedCounter from={0} to={hackCount} label="HACKATHONS" icon={<Trophy size={16} />} />
        <AnimatedCounter from={0} to={internCount} label="INTERNSHIPS" icon={<Briefcase size={16} />} />
        <AnimatedCounter from={0} to={leadershipCount} label="LEADERSHIP ROLES" icon={<Users size={16} />} />
        <AnimatedCounter from={0} to={companiesEngaged} label="COMPANIES ENGAGED" icon={<Building2 size={16} />} />
        <AnimatedCounter from={0} to={totalEvents} label="EVENTS" icon={<Calendar size={16} />} />
        <AnimatedCounter from={0} to={totalHours} label="HOURS LEARNED" icon={<Clock size={16} />} />
      </div>

      {/* Issuer Analytics */}
      {issuerEntries.length > 0 && (
        <div className="border-dialogue bg-surface p-4 md:p-6 shadow-8bit">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={16} className="text-tertiary" />
            <h3 className="font-mono text-[11px] font-bold text-primary uppercase tracking-wider">
              Issuer Analytics
            </h3>
            <span className="font-mono text-[9px] text-on-surface-variant/40 uppercase ml-auto">
              Top Certifiers
            </span>
          </div>
          <div className="space-y-2.5">
            {issuerEntries.map(([issuer, count]) => (
              <IssuerBar
                key={issuer}
                name={issuer}
                count={count}
                maxCount={maxIssuerCount}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
