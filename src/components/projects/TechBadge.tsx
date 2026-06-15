import { cn } from '@/lib/utils'

interface TechBadgeProps {
  name: string
  className?: string
}

export function TechBadge({ name, className }: TechBadgeProps) {
  // Optional: style badges differently based on technology
  const getBadgeStyle = (techName: string) => {
    const nameLower = techName.toLowerCase()
    if (nameLower.includes('gemini') || nameLower.includes('ai') || nameLower.includes('tensorflow')) {
      return 'bg-tertiary-container text-on-tertiary-container border-tertiary-container'
    }
    if (nameLower.includes('solidity') || nameLower.includes('web3') || nameLower.includes('decentralized')) {
      return 'bg-secondary-container text-on-secondary-container border-secondary-container'
    }
    if (nameLower.includes('firebase') || nameLower.includes('supabase')) {
      return 'bg-primary-container text-on-primary-container border-primary-container'
    }
    return 'bg-surface-variant text-on-surface-variant border-outline-variant'
  }

  return (
    <span
      className={cn(
        'font-mono text-[10px] md:text-xs font-bold px-2 py-0.5 border rounded-sm tracking-wide uppercase',
        getBadgeStyle(name),
        className
      )}
    >
      {name}
    </span>
  )
}
