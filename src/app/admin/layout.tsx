import type { ReactNode } from 'react'

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

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
