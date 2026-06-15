import type { ReactNode } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export const metadata = {
  title: {
    default: 'Admin | VK_OS',
    template: '%s | VK_OS Admin',
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
