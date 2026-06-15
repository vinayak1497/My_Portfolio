'use client'

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface RetroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export const RetroButton = forwardRef<HTMLButtonElement, RetroButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'font-mono font-bold uppercase tracking-wider border-2 transition-all',
          'shadow-8bit shadow-8bit-active',
          'focus-visible:outline-2 focus-visible:outline-tertiary-container focus-visible:outline-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0',
          // Variants
          variant === 'primary' && 'bg-primary text-on-primary border-primary hover:bg-primary-container',
          variant === 'secondary' && 'bg-secondary text-on-secondary border-secondary hover:bg-secondary-container',
          variant === 'ghost' && 'bg-transparent text-primary border-primary hover:bg-surface-variant',
          // Sizes
          size === 'sm' && 'text-xs px-3 py-1.5',
          size === 'md' && 'text-sm px-5 py-2.5',
          size === 'lg' && 'text-base px-8 py-3.5',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

RetroButton.displayName = 'RetroButton'
