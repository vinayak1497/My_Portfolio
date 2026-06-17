'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IntroOverlay } from '@/components/intro/IntroOverlay'
import { useUIStore } from '@/stores/ui-store'

export default function HomePage() {
  const router = useRouter()
  const hasBooted = useUIStore((state) => state.hasBooted)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(useUIStore.persist.hasHydrated())
    const unsubscribe = useUIStore.persist.onFinishHydration(() => setHydrated(true))
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (!hydrated) return
    if (hasBooted) {
      router.push('/journey')
    }
  }, [hasBooted, hydrated, router])

  return (
    <div className="relative min-h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden">
      <h1 className="sr-only">Vinayak Kundar — Computer Engineering Student, AI Builder & Full Stack Developer</h1>
      <IntroOverlay />
    </div>
  )
}
