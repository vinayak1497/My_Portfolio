import { requireAuth } from '@/lib/auth'
import { MediaForm } from '../MediaForm'

export const metadata = { title: 'New Media | VK_OS Admin' }

export default async function NewMediaPage() {
  await requireAuth()
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[#cc88ff] text-xl font-bold tracking-wider uppercase">Create Media Entry</div>
        <div className="font-mono text-[#cc88ff]/40 text-xs tracking-wider mt-1">Add press coverage or media feature</div>
      </div>
      <MediaForm />
    </div>
  )
}
