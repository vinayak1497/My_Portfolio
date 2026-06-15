import { requireAuth } from '@/lib/auth'
import { ProjectForm } from '../ProjectForm'

export const metadata = {
  title: 'New Project | VK_OS Admin',
}

export default async function NewProjectPage() {
  await requireAuth()

  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[#00ff66] text-xl font-bold tracking-wider uppercase">
          Create Project
        </div>
        <div className="font-mono text-[#00ff66]/40 text-xs tracking-wider mt-1">
          Add a new project to the vault
        </div>
      </div>

      <ProjectForm />
    </div>
  )
}
