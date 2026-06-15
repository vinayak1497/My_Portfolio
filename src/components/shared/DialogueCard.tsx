import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

interface DialogueCardProps {
  children: ReactNode
  className?: string
  showArrow?: boolean
  title?: string
}

export function DialogueCard({ children, className, showArrow = false, title }: DialogueCardProps) {
  return (
    <div className={cn('border-dialogue bg-surface p-4 md:p-6 shadow-8bit relative', className)}>
      {title && (
        <h3 className="text-headline-sm text-primary mb-2">{title}</h3>
      )}
      {children}
      {showArrow && (
        <ChevronDown
          size={20}
          className="absolute bottom-2 right-3 text-primary animate-blink"
          aria-hidden="true"
        />
      )}
    </div>
  )
}
