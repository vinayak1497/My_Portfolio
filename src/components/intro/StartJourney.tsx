'use client'

import { motion } from 'motion/react'
import { RetroButton } from '@/components/shared/RetroButton'

interface StartJourneyProps {
  isVisible: boolean
  onStart: () => void
  disabled?: boolean
}

export function StartJourney({ isVisible, onStart, disabled = false }: StartJourneyProps) {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <RetroButton
        type="button"
        variant="secondary"
        size="lg"
        onClick={onStart}
        disabled={disabled}
        className="text-base md:text-lg px-10 md:px-14 py-3.5 md:py-5 animate-pulse-glow"
        aria-label="Start journey"
      >
        <span className="flex items-center gap-3">
          <span
            className="inline-block h-0 w-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-current"
            aria-hidden="true"
          />
          START JOURNEY
        </span>
      </RetroButton>
    </motion.div>
  )
}
