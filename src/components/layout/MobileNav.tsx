'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Map, Terminal, BookOpen, Award, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores/ui-store'
import { motion, AnimatePresence } from 'motion/react'

const mobileNavLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/journey', label: 'Journey', icon: Map },
  { href: '/projects', label: 'Projects', icon: Terminal },
  { href: '/pokedex', label: 'Pokédex', icon: BookOpen },
  { href: '/badges', label: 'Badges', icon: Award },
]

export function MobileNav() {
  const pathname = usePathname()
  const { isMobileNavOpen, closeMobileNav } = useUIStore()

  return (
    <>
      {/* Bottom Navigation Bar (always visible on mobile) */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary border-t-4 border-primary-container"
        aria-label="Mobile navigation"
      >
        <div className="flex justify-around items-center py-2 px-2">
          {mobileNavLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileNav}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-3 py-1.5 transition-all min-w-[56px]',
                  isActive
                    ? 'text-tertiary-fixed-dim'
                    : 'text-on-primary/60 active:scale-95 active:translate-y-0.5'
                )}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="text-[10px] font-mono font-bold">{link.label}</span>
                {isActive && (
                  <span className="w-1 h-1 bg-tertiary-fixed-dim rounded-full mt-0.5" />
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Full-screen mobile menu overlay */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="lg:hidden fixed inset-0 top-[52px] z-40 bg-surface/95 backdrop-blur-sm"
          >
            <div className="flex flex-col gap-2 p-4 pt-6">
              {[
                ...mobileNavLinks,
                { href: '/blogs', label: 'Blogs', icon: Terminal },
                { href: '/contact', label: 'Contact', icon: Terminal },
                { href: '/resume', label: 'Resume', icon: Terminal },
              ].map((link, i) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileNav}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 text-label-md border-2 transition-all',
                        isActive
                          ? 'bg-primary text-on-primary border-primary shadow-8bit'
                          : 'text-on-surface border-outline-variant hover:border-primary hover:shadow-8bit-sm'
                      )}
                    >
                      <Icon size={18} />
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
