'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Map, Terminal, BookOpen, Award, FileText, Gamepad2, User, Send, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const sideNavLinks = [
  { href: '/journey', label: 'Journey', icon: Map },
  { href: '/projects', label: 'Projects', icon: Terminal },
  { href: '/pokedex', label: 'Pokédex', icon: BookOpen },
  { href: '/badges', label: 'Badges', icon: Award },
  { href: '/blogs', label: 'Blogs', icon: FileText },
  { href: '/about', label: 'About', icon: User },
]

export function SideNav() {
  const pathname = usePathname()
  const [contactOpen, setContactOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [statusMsg, setStatusMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => { setStatus('idle'); setContactOpen(false) }, 3000)
      } else {
        const data = await res.json()
        setStatus('error')
        setStatusMsg(data.error || 'Failed to send message.')
      }
    } catch {
      setStatus('error')
      setStatusMsg('Network error. Please try again.')
    }
  }

  // Don't show sidebar on home page
  if (pathname === '/') return null

  return (
    <aside
      className="
        hidden
        lg:flex
        flex-col
        w-60
        shrink-0
        sticky
        top-[72px]
        self-start
        max-h-[calc(100vh-72px)]
        border-dialogue
        bg-surface-container
        p-4
        gap-3
        z-40
        overflow-y-auto
      "
    >
      {/* Player Info */}
      <div className="mb-4 px-2 pt-2">
        <div className="flex items-center gap-2 mb-1">
          <Gamepad2 size={16} className="text-primary" aria-hidden="true" />
          <h2 className="text-headline-sm text-base text-primary">
            Vinayak Kundar
          </h2>
        </div>

        <p className="text-label-md text-[11px] text-on-surface-variant">
          LVL 24 Full-Stack Dev
        </p>

        {/* XP Bar */}
        <div className="mt-2 h-2 bg-surface-dim rounded-sm overflow-hidden border border-outline-variant" role="progressbar" aria-valuenow={72} aria-valuemin={0} aria-valuemax={100} aria-label="Experience progress">
          <div
            className="h-full bg-tertiary-container rounded-sm"
            style={{ width: '72%' }}
          />
        </div>

        <p className="text-[10px] text-on-surface-variant font-mono mt-1">
          XP: 7200 / 10000
        </p>
      </div>

      {/* Navigation Links */}
      <nav aria-label="Side navigation">
        <ul className="flex flex-col gap-1">
          {sideNavLinks.map((link) => {
            const Icon = link.icon

            const isActive =
              pathname === link.href ||
              pathname?.startsWith(link.href + '/')

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 text-label-md transition-all',
                    isActive
                      ? 'bg-primary text-on-primary border-2 border-on-primary translate-x-0.5 translate-y-0.5'
                      : 'text-on-surface-variant hover:bg-surface-variant hover:scale-[1.02]'
                  )}
                >
                  <Icon size={16} aria-hidden="true" />
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Contact Section */}
      <div className="border-t border-primary/20 pt-3 mt-1">
        <button
          onClick={() => setContactOpen(!contactOpen)}
          className="flex items-center justify-between w-full px-3 py-2 text-label-md text-on-surface-variant hover:bg-surface-variant hover:scale-[1.02] transition-all"
        >
          <span className="flex items-center gap-2">
            <Send size={16} />
            Transmit Signal
          </span>
          {contactOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {contactOpen && (
          <div className="mt-2 px-2">
            {status === 'success' ? (
              <div className="flex flex-col items-center gap-2 py-4 text-center">
                <CheckCircle2 size={24} className="text-secondary" />
                <p className="text-[10px] font-mono font-bold text-secondary">MESSAGE SENT!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                {status === 'error' && (
                  <div className="p-2 border border-secondary bg-red-50/10 text-secondary flex items-center gap-1 text-[9px] font-mono font-bold" role="alert">
                    <AlertCircle size={10} />
                    <span>{statusMsg}</span>
                  </div>
                )}

                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-2 py-1.5 text-[10px] border border-primary bg-surface font-mono font-bold focus:outline-none focus:border-secondary placeholder:text-on-surface-variant/30"
                />

                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-2 py-1.5 text-[10px] border border-primary bg-surface font-mono font-bold focus:outline-none focus:border-secondary placeholder:text-on-surface-variant/30"
                />

                <input
                  type="text"
                  placeholder="Subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-2 py-1.5 text-[10px] border border-primary bg-surface font-mono font-bold focus:outline-none focus:border-secondary placeholder:text-on-surface-variant/30"
                />

                <textarea
                  placeholder="Message"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-2 py-1.5 text-[10px] border border-primary bg-surface font-mono font-bold focus:outline-none focus:border-secondary placeholder:text-on-surface-variant/30 resize-none"
                />

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-1.5 bg-primary text-on-primary text-[10px] font-mono font-bold border-2 border-primary hover:bg-primary-container hover:text-primary transition-all flex items-center justify-center gap-1 disabled:opacity-50"
                >
                  <Send size={10} />
                  {status === 'loading' ? 'SENDING...' : 'TRANSMIT SIGNAL'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}
