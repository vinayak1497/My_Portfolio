import { listContent } from '@/lib/content-manager'
import { requireAuth } from '@/lib/auth'
import { FolderKanban, Award, FileText, BookOpen, Swords, Building2, Heart, Newspaper, ScrollText } from 'lucide-react'
import Link from 'next/link'

async function statCard(
  label: string,
  count: number,
  icon: typeof FolderKanban,
  href: string,
  color: string
) {
  const Icon = icon
  return (
    <Link href={href} className="block group">
      <div className={`border-2 ${color} bg-[#0d0d0d] p-5 transition-all hover:bg-[${color}]/5`}>
        <div className="flex items-center justify-between mb-3">
          <Icon size={20} className={`${color.replace('border-', 'text-')}`} />
          <span className="font-mono text-3xl font-bold text-[#00ff66]">{count}</span>
        </div>
        <div className="font-mono text-xs tracking-wider text-[#00ff66]/60 uppercase group-hover:text-[#00ff66]/90 transition-colors">
          {label}
        </div>
      </div>
    </Link>
  )
}

export default async function AdminDashboard() {
  await requireAuth()

  const [projects, certifications, blogs, notes, hackathons, internships, leadership, media, certificates] = await Promise.all([
    listContent('projects'),
    listContent('certifications'),
    listContent('blogs'),
    listContent('notes'),
    listContent('hackathons'),
    listContent('internships'),
    listContent('leadership'),
    listContent('media'),
    listContent('certificates'),
  ])

  const totalFiles = projects.length + certifications.length + blogs.length + notes.length + hackathons.length + internships.length + leadership.length + media.length + certificates.length

  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[#00ff66] text-xl font-bold tracking-wider uppercase">
          Developer Console
        </div>
        <div className="font-mono text-[#00ff66]/40 text-xs tracking-wider mt-1">
          SYSTEM STATUS: ONLINE — All collections loaded
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {statCard('Projects', projects.length, FolderKanban, '/admin/projects', 'border-[#00ff66]/30')}
        {statCard('Certifications', certifications.length, Award, '/admin/certifications', 'border-[#ffcc00]/30')}
        {statCard('Certificates', certificates.length, ScrollText, '/admin/certificates', 'border-[#00ffcc]/30')}
        {statCard('Hackathons', hackathons.length, Swords, '/admin/hackathons', 'border-[#ff6600]/30')}
        {statCard('Internships', internships.length, Building2, '/admin/internships', 'border-[#0088ff]/30')}
        {statCard('Leadership', leadership.length, Heart, '/admin/leadership', 'border-[#ff4080]/30')}
        {statCard('Media', media.length, Newspaper, '/admin/media', 'border-[#cc88ff]/30')}
        {statCard('Blogs', blogs.length, FileText, '/admin/blogs', 'border-[#0088ff]/30')}
        {statCard('Notes', notes.length, BookOpen, '/admin/notes', 'border-[#ff6600]/30')}
      </div>

      <div className="border-2 border-[#00ff66]/10 bg-[#0d0d0d] p-4">
        <div className="font-mono text-[#00ff66]/70 text-xs tracking-wider uppercase mb-3">
          Recent Activity
        </div>
        <div className="font-mono text-[#00ff66]/40 text-[11px] space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[#00ff66]">&gt;</span>
            <span>System initialized — {totalFiles} content files indexed across 9 collections</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00ff66]">&gt;</span>
            <span>Server running in {process.env.NODE_ENV} mode</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00ff66]">&gt;</span>
            <span>Content directory: ./content/</span>
          </div>
        </div>
      </div>

      <div className="border-2 border-[#00ff66]/10 bg-[#0d0d0d] p-4">
        <div className="font-mono text-[#00ff66]/70 text-xs tracking-wider uppercase mb-3">
          Quick Actions
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <ActionButton href="/admin/projects/new" label="New Project" color="border-[#00ff66]/30" />
          <ActionButton href="/admin/certifications/new" label="New Certification" color="border-[#ffcc00]/30" />
          <ActionButton href="/admin/certificates/new" label="New Certificate" color="border-[#00ffcc]/30" />
          <ActionButton href="/admin/hackathons/new" label="New Hackathon" color="border-[#ff6600]/30" />
          <ActionButton href="/admin/internships/new" label="New Internship" color="border-[#0088ff]/30" />
          <ActionButton href="/admin/leadership/new" label="New Leadership" color="border-[#ff4080]/30" />
          <ActionButton href="/admin/media/new" label="New Media" color="border-[#cc88ff]/30" />
          <ActionButton href="/admin/blogs/new" label="New Blog Post" color="border-[#0088ff]/30" />
          <ActionButton href="/admin/notes/new" label="New Note" color="border-[#ff6600]/30" />
        </div>
      </div>
    </div>
  )
}

function ActionButton({ href, label, color }: { href: string; label: string; color: string }) {
  return (
    <Link
      href={href}
      className={`block text-center font-mono text-xs tracking-wider uppercase px-4 py-3 border-2 ${color} text-[#00ff66]/70 hover:text-[#00ff66] hover:bg-[#00ff66]/5 transition-all`}
    >
      + {label}
    </Link>
  )
}
