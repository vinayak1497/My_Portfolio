import type { Metadata } from 'next'
import Link from 'next/link'
import { EmulatorWindow } from '@/components/shared/EmulatorWindow'
import { RetroButton } from '@/components/shared/RetroButton'
import { Home } from 'lucide-react'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: '404 — Page Not Found | Vinayak Kundar',
  description: 'The page you are looking for does not exist. Return to the home page.',
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE_URL}/404` },
}

export default function NotFound() {
  return (
    <div className="p-4 md:p-8 lg:p-12 flex items-center justify-center min-h-[60vh]">
      <EmulatorWindow title="ERROR.exe" statusText="404">
        <div className="p-8 text-center space-y-6">
          <div className="font-mono text-6xl font-bold text-secondary">404</div>
          <div className="space-y-2">
            <h1 className="font-mono text-headline-sm font-bold text-primary uppercase">
              Page Not Found
            </h1>
            <p className="font-mono text-xs text-on-surface-variant max-w-md mx-auto">
              The route you are trying to access does not exist in this region. It may have been moved or deleted.
            </p>
          </div>
          <div className="h-[2px] bg-primary/10 max-w-xs mx-auto" />
          <div className="pt-2">
            <Link href="/">
              <RetroButton variant="primary" className="inline-flex items-center gap-2">
                <Home size={14} aria-hidden="true" />
                Return to Base
              </RetroButton>
            </Link>
          </div>
        </div>
      </EmulatorWindow>
    </div>
  )
}
