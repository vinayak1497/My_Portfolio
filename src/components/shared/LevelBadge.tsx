import { cn } from '@/lib/utils'

interface LevelBadgeProps {
  level: number
  size?: 'sm' | 'md'
  className?: string
}

export function LevelBadge({ level, size = 'sm', className }: LevelBadgeProps) {
  const getColor = () => {
    if (level >= 80) return 'bg-tertiary-container text-on-tertiary-container border-tertiary'
    if (level >= 60) return 'bg-primary text-on-primary border-primary'
    if (level >= 40) return 'bg-secondary text-on-secondary border-secondary'
    return 'bg-surface-container text-on-surface border-outline'
  }

  return (
    <span
      className={cn(
        'font-mono font-bold uppercase border',
        size === 'sm' && 'text-[10px] px-2 py-0.5',
        size === 'md' && 'text-xs px-3 py-1',
        getColor(),
        className
      )}
    >
      LVL {level}
    </span>
  )
}
