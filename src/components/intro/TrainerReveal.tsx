'use client'

import { motion } from 'motion/react'
import { TypewriterText } from '@/components/shared/TypewriterText'

interface TrainerRevealProps {
  isVisible: boolean
}

export function TrainerReveal({ isVisible }: TrainerRevealProps) {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="border-dialogue bg-surface/95 p-4 md:p-6 shadow-8bit">
        <p className="text-headline-sm text-primary">
          <TypewriterText text="A Wild Developer Appeared!" speed={28} />
        </p>

        <div className="mt-3 space-y-1 text-on-surface-variant">
          <p className="font-mono text-lg md:text-xl text-primary">
            <TypewriterText text="VINAYAK KUNDAR" speed={32} delay={300} showCursor={false} />
          </p>
          <p className="text-sm md:text-base font-mono">
            <TypewriterText
              text="Computer Engineering Student"
              speed={24}
              delay={520}
              showCursor={false}
            />
          </p>
          <p className="text-sm md:text-base font-mono">
            <TypewriterText text="AI Builder" speed={24} delay={760} showCursor={false} />
          </p>
          <p className="text-sm md:text-base font-mono">
            <TypewriterText
              text="Community Leader"
              speed={24}
              delay={980}
              showCursor={false}
            />
          </p>
          <p className="text-sm md:text-base font-mono">
            <TypewriterText
              text="Full Stack Developer"
              speed={24}
              delay={1220}
              showCursor={false}
            />
          </p>
        </div>
      </div>
    </motion.div>
  )
}
