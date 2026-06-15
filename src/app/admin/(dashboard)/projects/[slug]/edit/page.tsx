import { requireAuth } from '@/lib/auth'
import { getContentBySlug } from '@/lib/content-manager'
import { notFound } from 'next/navigation'
import { ProjectForm } from '../../ProjectForm'

export const metadata = {
  title: 'Edit Project | VK_OS Admin',
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  await requireAuth()
  const { slug } = await params
  const project = await getContentBySlug('projects', slug)

  if (!project) notFound()

  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[#00ff66] text-xl font-bold tracking-wider uppercase">
          Edit Project
        </div>
        <div className="font-mono text-[#00ff66]/40 text-xs tracking-wider mt-1">
          {project.frontmatter.title as string}
        </div>
      </div>

      <ProjectForm project={project} />
    </div>
  )
}
