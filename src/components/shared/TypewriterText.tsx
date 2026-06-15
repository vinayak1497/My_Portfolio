'use client'

import { useTypewriter } from '@/hooks/useTypewriter'
import { cn } from '@/lib/utils'

interface TypewriterTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  cursorClassName?: string
  showCursor?: boolean
  onComplete?: () => void
}

export function TypewriterText({
  text,
  speed = 50,
  delay = 0,
  className,
  cursorClassName,
  showCursor = true,
  onComplete,
}: TypewriterTextProps) {
  const { displayedText, isComplete } = useTypewriter({ text, speed, delay, onComplete })

  return (
    <span className={cn('inline', className)}>
      {displayedText}
      {showCursor && !isComplete && (
        <span className={cn('animate-blink ml-0.5 text-primary', cursorClassName)}>▌</span>
      )}
    </span>
  )
}
