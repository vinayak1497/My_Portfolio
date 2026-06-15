'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Terminal, Settings, Search, Volume2, VolumeX, Menu, X } from 'lucide-react'
import { useUIStore } from '@/stores/ui-store'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/journey', label: 'Journey', icon: 'map' },
  { href: '/projects', label: 'Projects', icon: 'terminal' },
  { href: '/pokedex', label: 'Pokédex', icon: 'book' },
  { href: '/badges', label: 'Badges', icon: 'award' },
  { href: '/blogs', label: 'Blogs', icon: 'file-text' },
  { href: '/contact', label: 'Contact', icon: 'mail' },
]

export function Header() {
  const pathname = usePathname()
  const { toggleTerminal, toggleSearch, isSoundEnabled, toggleSound, isMobileNavOpen, toggleMobileNav } = useUIStore()
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 bg-primary border-b-4 border-primary-container">
      <div className="flex justify-between items-center w-full max-w-[1280px] mx-auto px-4 md:px-6 py-2">
        {/* Logo */}
        <Link href="/" className="text-headline-sm text-on-primary tracking-tighter hover:opacity-80 transition-opacity">
          VK_OS v1.0
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-label-md px-3 py-2 transition-all',
                pathname === link.href || pathname?.startsWith(link.href + '/')
                  ? 'text-tertiary-fixed-dim bg-primary-container'
                  : 'text-on-primary/70 hover:text-on-primary hover:translate-x-0.5 hover:translate-y-0.5'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSearch}
            className="text-on-primary/70 hover:text-on-primary p-1.5 hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          <button
            onClick={toggleTerminal}
            className="text-on-primary/70 hover:text-on-primary p-1.5 hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            aria-label="Open terminal"
          >
            <Terminal size={18} />
          </button>
          <button
            onClick={toggleSound}
            className="text-on-primary/70 hover:text-on-primary p-1.5 hover:translate-x-0.5 hover:translate-y-0.5 transition-all hidden md:block"
            aria-label={isSoundEnabled ? 'Mute sounds' : 'Enable sounds'}
          >
            {isSoundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-on-primary/70 hover:text-on-primary p-1.5 hover:translate-x-0.5 hover:translate-y-0.5 transition-all hidden md:block"
            aria-label="Toggle theme"
          >
            <Settings size={18} />
          </button>
          {/* Mobile menu toggle */}
          <button
            onClick={toggleMobileNav}
            className="lg:hidden text-on-primary/70 hover:text-on-primary p-1.5"
            aria-label={isMobileNavOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Battery/Status bar (decorative) */}
      <div className="hidden md:flex justify-between items-center max-w-[1280px] mx-auto px-6 py-0.5 text-on-primary/40">
        <div className="flex gap-2">
          <span className="w-2 h-2 bg-tertiary-fixed-dim rounded-full" />
          <span className="w-2 h-2 bg-secondary rounded-full" />
        </div>
        <span className="text-label-md text-[10px]">BATTERY: 100% ▐████████▌</span>
      </div>
    </header>
  )
}
