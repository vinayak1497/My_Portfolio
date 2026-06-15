'use client'

import { motion } from 'motion/react'

interface PokeballRevealProps {
  isOpen: boolean
}

const sparkleField = [
  { top: '-8%', left: '18%', size: 6, delay: 0.2 },
  { top: '2%', left: '78%', size: 4, delay: 0.45 },
  { top: '68%', left: '6%', size: 5, delay: 0.3 },
  { top: '76%', left: '82%', size: 7, delay: 0.6 },
  { top: '-6%', left: '46%', size: 3, delay: 0.15 },
  { top: '44%', left: '92%', size: 4, delay: 0.5 },
]

export function PokeballReveal({ isOpen }: PokeballRevealProps) {
  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className="absolute h-48 w-48 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(202, 233, 224, 0.32), transparent 65%)',
          filter: 'blur(10px)',
        }}
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.9, 1.08, 0.9] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {sparkleField.map((sparkle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-[1px] bg-tertiary"
          style={{
            top: sparkle.top,
            left: sparkle.left,
            width: sparkle.size,
            height: sparkle.size,
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.1, 0.6] }}
          transition={{
            duration: 1.6,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          aria-hidden="true"
        />
      ))}

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 180,
          damping: 12,
          mass: 0.7,
        }}
      >
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [0, 1.5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="relative h-36 w-36 md:h-44 md:w-44">
            <div className="absolute inset-0 overflow-hidden rounded-full border-[3px] border-primary bg-surface shadow-8bit">
              <motion.div
                className="absolute left-0 right-0 top-0 h-1/2 bg-secondary"
                animate={isOpen ? { y: -16, rotate: -8 } : { y: 0, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 190, damping: 14 }}
                style={{ transformOrigin: 'center bottom' }}
              />

              <div className="absolute left-0 right-0 top-1/2 h-[6px] -translate-y-1/2 bg-primary" />

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1/2 bg-surface-container"
                animate={isOpen ? { y: 16, rotate: 8 } : { y: 0, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 190, damping: 14 }}
                style={{ transformOrigin: 'center top' }}
              />

              <motion.div
                className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-primary bg-surface shadow-8bit-sm"
                animate={isOpen ? { scale: 0.82, opacity: 0.6 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <motion.div
                className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tertiary"
                animate={isOpen ? { scale: 0.7, opacity: 0.4 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <div
                className="absolute left-4 top-3 h-3 w-6 rounded-full"
                style={{ background: 'rgba(255, 255, 255, 0.45)' }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
