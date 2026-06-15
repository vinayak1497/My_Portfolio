'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useUIStore } from '@/stores/ui-store'
import { PokeballReveal } from './PokeballReveal'
import { TrainerReveal } from './TrainerReveal'
import { StartJourney } from './StartJourney'

type TimerHandle = ReturnType<typeof setTimeout>

export function IntroOverlay() {
  const hasBooted = useUIStore((state) => state.hasBooted)
  const setHasBooted = useUIStore((state) => state.setHasBooted)
  const router = useRouter()
  const [hydrated, setHydrated] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isFlash, setIsFlash] = useState(false)
  const [isBallOpen, setIsBallOpen] = useState(false)
  const [showTrainer, setShowTrainer] = useState(false)
  const [showCTA, setShowCTA] = useState(false)
  const timersRef = useRef<TimerHandle[]>([])
  const prefersReducedMotion = useReducedMotion()

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  useEffect(() => {
    setHydrated(useUIStore.persist.hasHydrated())
    const unsubscribe = useUIStore.persist.onFinishHydration(() => setHydrated(true))
    return unsubscribe
  }, [])

  useEffect(() => {
    if (!hydrated) return

    if (hasBooted) {
      setIsVisible(false)
      return
    }

    setIsVisible(true)
    setIsClosing(false)
    setIsBallOpen(false)
    setIsFlash(false)
    setShowTrainer(false)
    setShowCTA(false)
    clearTimers()

    if (prefersReducedMotion) {
      setIsBallOpen(true)
      setShowTrainer(true)
      setShowCTA(true)
      return
    }

    timersRef.current.push(
      setTimeout(() => {
        setIsFlash(true)
        setIsBallOpen(true)
      }, 1600)
    )

    timersRef.current.push(
      setTimeout(() => {
        setIsFlash(false)
      }, 1900)
    )

    timersRef.current.push(
      setTimeout(() => {
        setShowTrainer(true)
      }, 2100)
    )

    timersRef.current.push(
      setTimeout(() => {
        setShowCTA(true)
      }, 2900)
    )

    return () => clearTimers()
  }, [clearTimers, hasBooted, hydrated, prefersReducedMotion])

  const handleComplete = useCallback(() => {
    if (isClosing) return
    clearTimers()
    setIsClosing(true)
    setHasBooted(true)
    timersRef.current.push(
      setTimeout(() => {
        setIsVisible(false)
        router.push('/journey')
      }, 380)
    )
  }, [clearTimers, isClosing, router, setHasBooted])

  if (!hydrated || !isVisible) return null

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0b0c0c] text-on-surface"
      initial={{ opacity: 0 }}
      animate={{ opacity: isClosing ? 0 : 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden={isClosing}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(202, 233, 224, 0.18), transparent 55%), radial-gradient(circle at 20% 20%, rgba(233, 195, 57, 0.08), transparent 40%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="absolute inset-0"
        animate={
          isFlash
            ? { opacity: [0, 0.95, 0], scale: [1, 1.02, 1] }
            : { opacity: 0, scale: 1 }
        }
        transition={{ duration: 0.35, times: [0, 0.3, 1] }}
        style={{ mixBlendMode: 'screen', filter: 'blur(4px)' }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 py-10 text-center"
        animate={
          isFlash
            ? { x: [0, -6, 6, -3, 3, 0], y: [0, 4, -4, 2, -2, 0] }
            : { x: 0, y: 0 }
        }
        transition={{ duration: 0.3 }}
      >
        <PokeballReveal isOpen={isBallOpen} />

        <div className="mt-6 w-full max-w-2xl">
          <TrainerReveal isVisible={showTrainer} />
        </div>

        <div className="mt-6">
          <StartJourney isVisible={showCTA} onStart={handleComplete} disabled={isClosing} />
        </div>
      </motion.div>

      <button
        type="button"
        onClick={handleComplete}
        className="absolute bottom-5 right-5 z-20 border-2 border-primary-fixed px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest text-primary-fixed transition-colors hover:bg-primary-fixed hover:text-on-primary"
        aria-label="Skip intro"
      >
        [ SKIP ]
      </button>
    </motion.div>
  )
}
