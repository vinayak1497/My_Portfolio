import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface EmulatorWindowProps {
  title?: string
  children: ReactNode
  className?: string
  statusText?: string
}

export function EmulatorWindow({ title = 'VK_OS', children, className, statusText }: EmulatorWindowProps) {
  return (
    <div className={cn('border-2 border-primary shadow-8bit bg-surface', className)}>
      {/* Title bar */}
      <div className="flex items-center justify-between bg-primary px-3 py-1.5 border-b-2 border-primary-container">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-secondary rounded-full" />
          <span className="w-2.5 h-2.5 bg-tertiary-container rounded-full" />
          <span className="w-2.5 h-2.5 bg-primary-fixed-dim rounded-full" />
        </div>
        <span className="text-label-md text-on-primary text-[11px]">{title}</span>
        {statusText && (
          <span className="text-label-md text-on-primary/60 text-[10px]">{statusText}</span>
        )}
      </div>
      {/* Content */}
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}
