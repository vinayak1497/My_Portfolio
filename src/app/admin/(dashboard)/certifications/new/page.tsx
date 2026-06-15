import { requireAuth } from '@/lib/auth'
import { CertificationForm } from '../CertificationForm'

export const metadata = { title: 'New Certification | VK_OS Admin' }

export default async function NewCertificationPage() {
  await requireAuth()
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[#00ff66] text-xl font-bold tracking-wider uppercase">Create Certification</div>
        <div className="font-mono text-[#00ff66]/40 text-xs tracking-wider mt-1">Add a new badge to your hall of achievements</div>
      </div>
      <CertificationForm />
    </div>
  )
}
