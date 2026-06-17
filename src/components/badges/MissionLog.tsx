'use client'

import { useState } from 'react'
import { CheckCircle2, ChevronDown, ChevronUp, Circle, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Mission {
  title: string
  slug: string
  type: 'leadership' | 'hackathon' | 'talk' | 'workshop' | 'community'
  xp: number
  completed: boolean
  date: string
  content: string
}

interface MissionLogProps {
  missions: Mission[]
}

const typeConfig = {
  leadership: { label: 'Leadership', color: 'bg-purple-100 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400' },
  hackathon: { label: 'Hackathon', color: 'bg-red-100 dark:bg-red-950/20 text-red-700 dark:text-red-400' },
  talk: { label: 'Tech Talk', color: 'bg-blue-100 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400' },
  workshop: { label: 'Workshop', color: 'bg-emerald-100 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400' },
  community: { label: 'Community', color: 'bg-yellow-100 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-400' },
}

export function MissionLog({ missions }: MissionLogProps) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null)

  const toggleExpand = (slug: string) => {
    setExpandedSlug((prev) => (prev === slug ? null : slug))
  }

  return (
    <div className="border-dialogue bg-surface shadow-8bit overflow-hidden">
      <div className="bg-primary p-3 border-b-2 border-primary-container flex justify-between items-center text-on-primary">
        <h3 className="font-mono text-xs font-bold uppercase tracking-wider">Mission Broadcast Log</h3>
        <span className="font-mono text-[10px]">{missions.length} CONCLUDED</span>
      </div>

      <div className="divide-y divide-primary/10">
        {missions.map((mission) => {
          const isExpanded = expandedSlug === mission.slug
          const config = typeConfig[mission.type] || typeConfig.community

          return (
            <div key={mission.slug} className="group transition-colors hover:bg-surface-variant/30">
              {/* Mission Summary Row */}
              <button
                onClick={() => toggleExpand(mission.slug)}
                className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  {mission.completed ? (
                    <CheckCircle2 size={18} className="text-secondary shrink-0" />
                  ) : (
                    <Circle size={18} className="text-on-surface-variant/40 shrink-0" />
                  )}
                  <div>
                    <h4 className="font-mono text-xs font-bold text-primary uppercase group-hover:text-secondary transition-colors">
                      {mission.title}
                    </h4>
                    <div className="flex flex-wrap gap-2 items-center mt-1 text-[10px] font-mono">
                      <span className={`px-2 py-0.5 border border-primary/10 ${config.color} uppercase font-bold`}>
                        {config.label}
                      </span>
                      <span className="text-on-surface-variant/60 flex items-center gap-1">
                        <Calendar size={10} />
                        {formatDate(mission.date)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs font-bold text-secondary flex items-center gap-1">
                    +{mission.xp} XP
                  </span>
                  {isExpanded ? (
                    <ChevronUp size={16} className="text-on-surface-variant" />
                  ) : (
                    <ChevronDown size={16} className="text-on-surface-variant" />
                  )}
                </div>
              </button>

              {/* Collapsible Mission Details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-dashed border-outline-variant bg-surface-variant/10">
                  <div className="prose prose-sm max-w-none font-mono text-xs text-on-surface-variant leading-relaxed space-y-2">
                    {/* Render the details of the mission directly from frontmatter or inline */}
                    <div className="bg-surface p-3 border-2 border-outline-variant">
                      <span className="font-bold text-primary block border-b border-outline-variant pb-1.5 mb-2 uppercase">
                        Mission Directives
                      </span>
                      {/* Simple fallback description, could render MDX details if we compile content */}
                      <p>Completed GDG leadership mission to run technical bootcamps, workshops, hackathons, and expand campus development guilds.</p>
                      <ul className="list-disc pl-4 mt-2 space-y-1">
                        <li>Hosted 15+ community tech training sessions</li>
                        <li>Organized regional student hackathons</li>
                        <li>Grew developers cohort to 500+ active recruits</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
