'use client'

import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'motion/react'
import { Award, Zap } from 'lucide-react'

interface XPCounterProps {
  totalXp: number
  level: number
}

export function XPCounter({ totalXp, level }: XPCounterProps) {
  const [displayXp, setDisplayXp] = useState(0)

  useEffect(() => {
    // Animate the counter from 0 to totalXp
    const controls = animate(0, totalXp, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (value) => setDisplayXp(Math.floor(value)),
    })

    return () => controls.stop()
  }, [totalXp])

  // Calculate percentage to next level (assuming 10000 XP per level for gamified display)
  const xpInCurrentLevel = totalXp % 10000
  const progressPercent = Math.min((xpInCurrentLevel / 10000) * 100, 100)

  return (
    <div className="border-dialogue bg-surface p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-8bit">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-tertiary-container border-2 border-primary flex items-center justify-center text-primary shadow-8bit-sm rounded-sm">
          <Award size={24} />
        </div>
        <div>
          <span className="font-mono text-[10px] font-bold text-on-surface-variant/60 block uppercase">
            Trainer Standing
          </span>
          <h2 className="font-mono text-headline-sm font-bold text-primary flex items-center gap-1.5 mt-0.5">
            LEAGUE LEVEL {level}
          </h2>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full md:w-1/2 space-y-1.5">
        <div className="flex justify-between font-mono text-xs font-bold text-on-surface-variant">
          <span className="flex items-center gap-1">
            <Zap size={12} className="text-tertiary-container fill-currentColor" />
            EXPERIENCE (XP)
          </span>
          <span>
            {displayXp.toLocaleString()} / {(Math.floor(totalXp / 10000) + 1) * 10000} XP
          </span>
        </div>
        <div className="h-4 bg-surface-variant border-2 border-primary rounded-sm overflow-hidden p-0.5">
          <motion.div
            className="h-full bg-tertiary-container"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  )
}
