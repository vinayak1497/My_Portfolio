'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { FolderKanban, Award, FileText, BookOpen, LayoutDashboard, LogOut, Swords, Building2, Heart, Newspaper, ScrollText } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Certifications', href: '/admin/certifications', icon: Award },
  { label: 'Certificates', href: '/admin/certificates', icon: ScrollText },
  { label: 'Hackathons', href: '/admin/hackathons', icon: Swords },
  { label: 'Internships', href: '/admin/internships', icon: Building2 },
  { label: 'Leadership', href: '/admin/leadership', icon: Heart },
  { label: 'Media', href: '/admin/media', icon: Newspaper },
  { label: 'Blogs', href: '/admin/blogs', icon: FileText },
  { label: 'Notes', href: '/admin/notes', icon: BookOpen },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 border-r-2 border-[#00ff66]/10 min-h-screen bg-[#0a0a0a] flex flex-col">
      <div className="p-4 border-b-2 border-[#00ff66]/10">
        <div className="font-mono text-[#00ff66] text-sm font-bold tracking-wider">VK_OS ADMIN</div>
        <div className="font-mono text-[#00ff66]/30 text-[10px] tracking-wider mt-1">v1.0 — Developer Console</div>
      </div>

      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 font-mono text-xs tracking-wider px-3 py-2.5 border border-transparent transition-all',
                isActive
                  ? 'text-[#00ff66] bg-[#00ff66]/5 border-[#00ff66]/20'
                  : 'text-[#00ff66]/50 hover:text-[#00ff66]/80 hover:bg-[#00ff66]/5'
              )}
            >
              <Icon size={14} />
              <span className="uppercase">{item.label}</span>
              {isActive && <span className="ml-auto text-[#00ff66]">&gt;</span>}
            </Link>
          )
        })}
      </nav>

      <div className="p-2 border-t-2 border-[#00ff66]/10">
        <button
          type="button"
          onClick={async () => {
            document.cookie = 'admin_session=; path=/; max-age=0;'
            window.location.href = '/admin/login'
          }}
          className="flex items-center gap-3 w-full font-mono text-xs tracking-wider px-3 py-2.5 text-[#ff0040]/60 hover:text-[#ff0040] hover:bg-[#ff0040]/5 border border-transparent transition-all uppercase"
        >
          <LogOut size={14} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
