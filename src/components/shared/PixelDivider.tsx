import { cn } from '@/lib/utils'

interface PixelDividerProps {
  className?: string
}

export function PixelDivider({ className }: PixelDividerProps) {
  return (
    <div className={cn('w-full py-4', className)} aria-hidden="true">
      <div className="flex items-center gap-2">
        <div className="h-0.5 flex-1 bg-primary/20" />
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-primary/30 rotate-45" />
          <span className="w-2 h-2 bg-tertiary-container rotate-45" />
          <span className="w-2 h-2 bg-secondary/30 rotate-45" />
        </div>
        <div className="h-0.5 flex-1 bg-primary/20" />
      </div>
    </div>
  )
}
