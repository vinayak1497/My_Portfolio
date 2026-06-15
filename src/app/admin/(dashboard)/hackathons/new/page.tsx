import { requireAuth } from '@/lib/auth'
import { HackathonForm } from '../HackathonForm'

export const metadata = { title: 'New Hackathon | VK_OS Admin' }

export default async function NewHackathonPage() {
  await requireAuth()
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[#ff6600] text-xl font-bold tracking-wider uppercase">Create Hackathon</div>
        <div className="font-mono text-[#ff6600]/40 text-xs tracking-wider mt-1">Log a new hackathon achievement</div>
      </div>
      <HackathonForm />
    </div>
  )
}
