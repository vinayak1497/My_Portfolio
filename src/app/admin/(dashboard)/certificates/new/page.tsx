import { requireAuth } from '@/lib/auth'
import { CertificateForm } from '../CertificateForm'

export const metadata = { title: 'New Certificate | VK_OS Admin' }

export default async function NewCertificatePage() {
  await requireAuth()
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[#00ff66] text-xl font-bold tracking-wider uppercase">Create Certificate</div>
        <div className="font-mono text-[#00ff66]/40 text-xs tracking-wider mt-1">Upload a certificate PDF to Cloudinary and store metadata</div>
      </div>
      <CertificateForm />
    </div>
  )
}
