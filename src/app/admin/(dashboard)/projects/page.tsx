import { listContent } from '@/lib/content-manager'
import { requireAuth } from '@/lib/auth'
import Link from 'next/link'
import { DeleteButton } from './DeleteButton'
import { Plus } from 'lucide-react'

export default async function AdminProjectsPage() {
  await requireAuth()

  const projects = await listContent('projects')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[#00ff66] text-xl font-bold tracking-wider uppercase">
            Project Manager
          </div>
          <div className="font-mono text-[#00ff66]/40 text-xs tracking-wider mt-1">
            {projects.length} projects in vault
          </div>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-xs px-4 py-2.5 border-2 border-[#00ff66] text-[#00ff66] hover:bg-[#00ff66]/10 transition-all"
        >
          <Plus size={14} />
          New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="border-2 border-[#00ff66]/10 bg-[#0d0d0d] p-8 text-center">
          <div className="font-mono text-[#00ff66]/40 text-sm mb-2">No projects found</div>
          <div className="font-mono text-[#00ff66]/20 text-xs">
            Create your first project to populate the vault
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="flex items-center justify-between border border-[#00ff66]/10 bg-[#0d0d0d] p-4 hover:border-[#00ff66]/20 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#00ff66] text-sm font-bold truncate">
                    {project.frontmatter.title as string}
                  </span>
                  {(project.frontmatter.featured as boolean) && (
                    <span className="font-mono text-[10px] text-[#ffcc00] tracking-wider uppercase border border-[#ffcc00]/30 px-1.5 py-0.5">
                      Featured
                    </span>
                  )}
                  <span className="font-mono text-[10px] text-[#00ff66]/30">
                    LVL {project.frontmatter.level as number}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-mono text-[#00ff66]/40 text-[10px]">
                    {project.frontmatter.category as string}
                  </span>
                  <span className="font-mono text-[#00ff66]/20 text-[10px]">
                    {project.frontmatter.date as string}
                  </span>
                  <span className="font-mono text-[#00ff66]/30 text-[10px]">
                    {project.slug}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <Link
                  href={`/admin/projects/${project.slug}/edit`}
                  className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border border-[#00ff66]/30 text-[#00ff66]/70 hover:text-[#00ff66] hover:bg-[#00ff66]/10 hover:border-[#00ff66] transition-all"
                >
                  [ EDIT ]
                </Link>
                <DeleteButton slug={project.slug} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
