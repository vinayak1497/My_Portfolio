import { requireAuth } from '@/lib/auth'
import { LeadershipForm } from '../LeadershipForm'

export const metadata = { title: 'New Leadership | VK_OS Admin' }

export default async function NewLeadershipPage() {
  await requireAuth()
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[#ff4080] text-xl font-bold tracking-wider uppercase">Create Leadership Entry</div>
        <div className="font-mono text-[#ff4080]/40 text-xs tracking-wider mt-1">Document a leadership milestone</div>
      </div>
      <LeadershipForm />
    </div>
  )
}
