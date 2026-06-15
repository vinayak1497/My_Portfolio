import { LoginForm } from './LoginForm'

export const metadata = {
  title: 'Admin Login | VK_OS',
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="border-2 border-[#00ff66]/30 shadow-[0_0_15px_rgba(0,255,102,0.15)] bg-[#0d0d0d]">
          <div className="flex items-center justify-between bg-[#00ff66]/10 px-3 py-2 border-b-2 border-[#00ff66]/20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#ff0040] rounded-full" />
              <span className="w-2.5 h-2.5 bg-[#ffcc00] rounded-full" />
              <span className="w-2.5 h-2.5 bg-[#00ff66] rounded-full" />
            </div>
            <span className="font-mono text-[11px] text-[#00ff66] tracking-wider uppercase">
              VK_OS Terminal — Auth Required
            </span>
            <span className="font-mono text-[10px] text-[#00ff66]/40">v1.0</span>
          </div>

          <div className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="font-mono text-[#00ff66] text-2xl font-bold tracking-wider">
                ADMIN ACCESS
              </div>
              <div className="font-mono text-[#00ff66]/50 text-xs tracking-wider">
                [ SYSTEM SECURITY PROTOCOL ]
              </div>
            </div>

            <LoginForm />

            <div className="font-mono text-[#00ff66]/30 text-[10px] text-center tracking-wider">
              Unauthorized access is prohibited
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
