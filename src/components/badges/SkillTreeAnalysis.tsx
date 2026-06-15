'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { ChevronDown, ChevronRight, Zap } from 'lucide-react'
import type { CertificationData } from '@/lib/content-data'
import { cn } from '@/lib/utils'

interface SkillTreeAnalysisProps {
  certifications: CertificationData[]
}

interface SkillNode {
  name: string
  percentage: number
}

const skillNodes: SkillNode[] = [
  { name: 'Cloud Computing', percentage: 90 },
  { name: 'Artificial Intelligence', percentage: 75 },
  { name: 'Backend Development', percentage: 85 },
  { name: 'Frontend Development', percentage: 70 },
  { name: 'DevOps', percentage: 55 },
  { name: 'Data Engineering', percentage: 80 },
  { name: 'System Design', percentage: 65 },
  { name: 'Computer Science Fundamentals', percentage: 95 },
]

function getRelatedCertifications(skillName: string, certs: CertificationData[]): string[] {
  const keywords = skillName.toLowerCase().split(/\s+/)
  return certs
    .filter((cert) =>
      cert.skills.some((skill) =>
        keywords.some((kw) => skill.toLowerCase().includes(kw))
      ) ||
      cert.title.toLowerCase().includes(skillName.toLowerCase()) ||
      cert.category.toLowerCase().includes(skillName.toLowerCase())
    )
    .map((cert) => cert.title)
}

const skillColors = [
  { bar: 'bg-secondary', glow: 'rgba(174,47,51,0.3)' },
  { bar: 'bg-tertiary-container', glow: 'rgba(203,168,27,0.3)' },
  { bar: 'bg-primary-container', glow: 'rgba(30,58,52,0.3)' },
  { bar: 'bg-secondary', glow: 'rgba(174,47,51,0.3)' },
  { bar: 'bg-tertiary-container', glow: 'rgba(203,168,27,0.3)' },
  { bar: 'bg-primary-container', glow: 'rgba(30,58,52,0.3)' },
  { bar: 'bg-secondary', glow: 'rgba(174,47,51,0.3)' },
  { bar: 'bg-tertiary-container', glow: 'rgba(203,168,27,0.3)' },
]

export function SkillTreeAnalysis({ certifications }: SkillTreeAnalysisProps) {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div className="border-dialogue bg-surface shadow-8bit overflow-hidden">
      <div className="bg-primary p-3 border-b-2 border-primary-container text-on-primary">
        <h3 className="font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <Zap size={14} />
          Skill Tree Analysis
        </h3>
      </div>

      <div ref={ref} className="p-4 space-y-2">
        {skillNodes.map((skill, index) => {
          const isExpanded = expandedSkill === skill.name
          const related = getRelatedCertifications(skill.name, certifications)
          const color = skillColors[index]

          return (
            <div key={skill.name}>
              <button
                onClick={() => setExpandedSkill(isExpanded ? null : skill.name)}
                className="w-full flex items-center gap-3 p-2 hover:bg-surface-variant/30 transition-colors text-left group"
              >
                <span className="font-mono text-xs font-bold text-primary uppercase shrink-0 w-20 sm:w-48 truncate">
                  {skill.name}
                </span>

                <div className="flex-1 h-3 bg-surface-variant border border-primary/20 rounded-sm overflow-hidden">
                  <motion.div
                    className={cn('h-full rounded-sm', color.bar)}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.percentage}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                    style={{ boxShadow: isInView ? `0 0 6px ${color.glow}` : 'none' }}
                  />
                </div>

                <motion.span
                  className="font-mono text-xs font-bold text-secondary w-10 text-right shrink-0"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  {skill.percentage}%
                </motion.span>

                {related.length > 0 && (
                  <span className="text-on-surface-variant/40 shrink-0">
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </span>
                )}
              </button>

              {isExpanded && related.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-8 mr-4 sm:ml-12 sm:mr-16 pl-3 border-l-2 border-primary/20 space-y-1 pb-2"
                >
                  {related.map((title) => (
                    <span
                      key={title}
                      className="block font-mono text-[10px] text-on-surface-variant py-0.5"
                    >
                      ◂ {title}
                    </span>
                  ))}
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
