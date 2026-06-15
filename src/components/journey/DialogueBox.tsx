'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { TypewriterText } from '@/components/shared/TypewriterText'

interface DialogueBoxProps {
  speaker?: string
  text: string
  avatar?: string
  onComplete?: () => void
  onNext?: () => void
  showNext?: boolean
}

export function DialogueBox({
  speaker = 'TRAINER VINAYAK',
  text: initialText,
  avatar = '👨‍💻',
  onComplete,
  onNext,
  showNext = false,
}: DialogueBoxProps) {
  const [text] = useState(initialText)
  const [typingComplete, setTypingComplete] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{
        duration: 0.2,
      }}
      className="border-dialogue bg-surface p-4 md:p-5 flex gap-4 shadow-8bit relative min-h-[120px]"
    >
      {/* Avatar */}
      <div className="w-16 h-16 shrink-0 border-2 border-outline-variant bg-surface-variant flex items-center justify-center text-3xl select-none">
        {avatar}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Speaker Label */}
          <span className="font-mono text-xs font-bold text-secondary uppercase tracking-wider block mb-1">
            {speaker}
          </span>

          {/* Dialogue Text */}
          <div className="text-body-md text-on-surface font-mono leading-relaxed">
            <TypewriterText
              text={text}
              speed={30}
              onComplete={() => {
                setTypingComplete(true)
                onComplete?.()
              }}
            />
          </div>
        </div>

        {/* Action Button */}
        {showNext && typingComplete && onNext && (
          <button
            onClick={onNext}
            className="absolute bottom-3 right-3 flex items-center gap-1 font-mono text-xs font-bold text-primary hover:text-secondary transition-colors uppercase animate-pulse"
            aria-label="Next dialogue"
          >
            NEXT
            <ChevronRight size={14} />
          </button>
        )}
      </div>
    </motion.div>
  )
}