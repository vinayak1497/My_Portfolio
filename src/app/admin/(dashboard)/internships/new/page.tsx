import { requireAuth } from '@/lib/auth'
import { InternshipForm } from '../InternshipForm'

export const metadata = { title: 'New Internship | VK_OS Admin' }

export default async function NewInternshipPage() {
  await requireAuth()
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[#0088ff] text-xl font-bold tracking-wider uppercase">Create Internship</div>
        <div className="font-mono text-[#0088ff]/40 text-xs tracking-wider mt-1">Add a new internship experience</div>
      </div>
      <InternshipForm />
    </div>
  )
}
