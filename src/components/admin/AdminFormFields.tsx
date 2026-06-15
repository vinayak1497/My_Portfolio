'use client'

import { cn } from '@/lib/utils'
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react'

const inputBase = 'w-full bg-[#0a0a0a] border border-[#00ff66]/30 text-[#00ff66] font-mono text-sm px-3 py-2.5 focus:outline-none focus:border-[#00ff66] focus:shadow-[0_0_8px_rgba(0,255,102,0.2)] placeholder:text-[#00ff66]/20 disabled:opacity-40 disabled:cursor-not-allowed'

interface FieldProps {
  label: string
  error?: string
  className?: string
  children: React.ReactNode
}

export function Field({ label, error, className, children }: FieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label className="font-mono text-[#00ff66]/70 text-xs tracking-wider block">
        &gt; {label}:
      </label>
      {children}
      {error && (
        <p className="font-mono text-[#ff0040] text-[10px] tracking-wider">{error}</p>
      )}
    </div>
  )
}

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(inputBase, className)} {...props} />
}

export function TextArea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(inputBase, 'resize-y min-h-[80px]', className)} {...props} />
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(inputBase, 'appearance-none cursor-pointer', className)} {...props}>
      {children}
    </select>
  )
}

export function Checkbox({ label, ...props }: { label: string } & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        className="w-4 h-4 accent-[#00ff66] cursor-pointer"
        {...props}
      />
      <span className="font-mono text-[#00ff66]/70 text-xs tracking-wider group-hover:text-[#00ff66]/90 transition-colors">
        {label}
      </span>
    </label>
  )
}

export function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-[#00ff66]/10 bg-[#0d0d0d] p-4 space-y-4">
      <div className="font-mono text-[#00ff66]/50 text-[10px] tracking-wider uppercase border-b border-[#00ff66]/10 pb-2">
        {title}
      </div>
      {children}
    </div>
  )
}

export function SubmitButton({ pending, label = 'Save Changes' }: { pending: boolean; label?: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="font-mono font-bold uppercase tracking-wider text-xs px-6 py-3 border-2 border-[#00ff66] text-[#00ff66] bg-transparent hover:bg-[#00ff66]/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {pending ? 'SAVING...' : `[ ${label.toUpperCase()} ]`}
    </button>
  )
}

export function CancelButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="inline-block font-mono font-bold uppercase tracking-wider text-xs px-6 py-3 border-2 border-[#00ff66]/30 text-[#00ff66]/50 hover:text-[#00ff66]/80 hover:border-[#00ff66]/50 transition-all text-center"
    >
      [ CANCEL ]
    </a>
  )
}
