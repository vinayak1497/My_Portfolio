'use client'

import { motion } from 'motion/react'
import { Award, ShieldAlert, Sparkles } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Certification {
  title: string
  issuer: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  date: string
  credentialUrl?: string
}

interface BadgeCardProps {
  certification: Certification
}

const rarityColors = {
  common: {
    border: 'border-outline-variant',
    bg: 'bg-surface-variant',
    text: 'text-on-surface-variant',
    label: 'COMMON BADGE',
    glow: 'rgba(0,0,0,0.05)',
  },
  rare: {
    border: 'border-blue-400',
    bg: 'bg-blue-50/50 dark:bg-blue-950/20',
    text: 'text-blue-600 dark:text-blue-400',
    label: 'RARE BADGE',
    glow: 'rgba(59,130,246,0.3)',
  },
  epic: {
    border: 'border-purple-400',
    bg: 'bg-purple-50/50 dark:bg-purple-950/20',
    text: 'text-purple-600 dark:text-purple-400',
    label: 'EPIC BADGE',
    glow: 'rgba(168,85,247,0.3)',
  },
  legendary: {
    border: 'border-secondary',
    bg: 'bg-red-50/50 dark:bg-red-950/20',
    text: 'text-secondary dark:text-red-400',
    label: 'LEGENDARY BADGE',
    glow: 'rgba(174,47,51,0.4)',
  },
}

export function BadgeCard({ certification }: BadgeCardProps) {
  const { title, issuer, rarity, date, credentialUrl } = certification
  const config = rarityColors[rarity] || rarityColors.common

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`border-dialogue p-4 shadow-8bit hover:shadow-8bit-active transition-all relative overflow-hidden bg-surface flex flex-col justify-between h-auto min-h-48`}
      style={{
        borderImage: rarity !== 'common' ? undefined : undefined,
        boxShadow: rarity !== 'common' ? `4px 4px 0px var(--color-primary), 0px 0px 12px ${config.glow}` : undefined,
      }}
    >
      {/* Background Holographic Shimmer Effect for higher rarities */}
      {rarity !== 'common' && (
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-gradient-to-tr from-transparent via-white to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      )}

      {/* Badge Header */}
      <div>
        <div className="flex justify-between items-start mb-2">
          <span className={`font-mono text-[9px] font-bold px-2 py-0.5 border-2 ${config.border} ${config.text} ${config.bg} uppercase tracking-wider`}>
            {config.label}
          </span>
          {rarity === 'legendary' && <Sparkles size={14} className="text-secondary animate-pulse" />}
        </div>
        <h3 className="font-mono text-xs font-bold text-primary uppercase line-clamp-2 mt-1">
          {title}
        </h3>
        <p className="text-[10px] text-on-surface-variant font-mono mt-0.5 uppercase tracking-wide">
          ISSUED BY: {issuer}
        </p>
      </div>

      {/* Footer / Link */}
      <div className="mt-4 flex items-center justify-between border-t border-primary/10 pt-3">
        <span className="font-mono text-[9px] text-on-surface-variant/60">
          DATE: {formatDate(date)}
        </span>
        {credentialUrl ? (
          <a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] font-bold text-primary hover:text-secondary uppercase border-b border-primary hover:border-secondary transition-all"
          >
            VERIFY →
          </a>
        ) : (
          <span className="font-mono text-[9px] text-on-surface-variant/40">OFFLINE RECORD</span>
        )}
      </div>
    </motion.div>
  )
}
