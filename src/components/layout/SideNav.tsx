'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Map, Terminal, BookOpen, Award, FileText, Mail, Gamepad2, User, ScrollText } from 'lucide-react'
import { cn } from '@/lib/utils'

const sideNavLinks = [
  { href: '/journey', label: 'Journey', icon: Map },
  { href: '/projects', label: 'Projects', icon: Terminal },
  { href: '/pokedex', label: 'Pokédex', icon: BookOpen },
  { href: '/badges', label: 'Badges', icon: Award },
  { href: '/blogs', label: 'Blogs', icon: FileText },
  { href: '/about', label: 'About', icon: User },
  { href: '/resume', label: 'Resume', icon: ScrollText },
  { href: '/contact', label: 'Contact', icon: Mail },
]

export function SideNav() {
  const pathname = usePathname()

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
    </aside>
  )
}
