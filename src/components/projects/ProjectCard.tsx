'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { TechBadge } from './TechBadge'
import { LevelBadge } from '../shared/LevelBadge'

interface ProjectStats {
  complexity: number
  impact: number
  innovation: number
}

interface Project {
  title: string
  slug: string
  description: string
  category: string
  level: number
  techStack: string[]
  stats?: ProjectStats
  featured?: boolean
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, slug, description, category, level, techStack, stats } = project

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group border-dialogue bg-surface flex flex-col justify-between p-4 shadow-8bit hover:shadow-8bit-active transition-all relative overflow-hidden"
    >
      {/* Sparkle decorative effect for featured projects */}
      {project.featured && (
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden z-20">
          <div className="absolute transform rotate-45 bg-tertiary-container text-on-tertiary-container text-[8px] font-mono font-bold text-center py-1 right-[-35px] top-[15px] w-[120px] border-y border-primary/20 uppercase tracking-widest">
            STAR
          </div>
        </div>
      )}

      {/* Header Area */}
      <div>
        <div className="flex justify-between items-start mb-3 pr-8">
          <div>
            <span className="font-mono text-[10px] font-bold text-secondary uppercase tracking-wider block">
              {category}
            </span>
            <h3 className="text-headline-sm text-primary tracking-tight font-bold mt-0.5 line-clamp-1 group-hover:text-secondary transition-colors">
              {title}
            </h3>
          </div>
          <div className="absolute right-4 top-4">
            <LevelBadge level={level} />
          </div>
        </div>

        {/* Short Description */}
        <p className="text-body-md text-on-surface-variant text-sm line-clamp-3 mb-4 leading-relaxed min-h-[60px]">
          {description}
        </p>

        {/* Project Stats Dashboard (Micro Pokemon Status Screen) */}
        {stats && (
          <div className="bg-surface-variant p-2.5 border-2 border-outline-variant font-mono text-[10px] space-y-1.5 mb-4">
            <div className="flex justify-between items-center">
              <span>COMPLEXITY:</span>
              <div className="flex items-center gap-1.5 w-24 md:w-32">
                <div className="flex-1 h-2 bg-surface border border-outline-variant overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${stats.complexity}%` }} />
                </div>
                <span className="font-bold text-primary w-5 text-right">{stats.complexity}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>IMPACT:</span>
              <div className="flex items-center gap-1.5 w-24 md:w-32">
                <div className="flex-1 h-2 bg-surface border border-outline-variant overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: `${stats.impact}%` }} />
                </div>
                <span className="font-bold text-secondary w-5 text-right">{stats.impact}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>INNOVATION:</span>
              <div className="flex items-center gap-1.5 w-24 md:w-32">
                <div className="flex-1 h-2 bg-surface border border-outline-variant overflow-hidden">
                  <div className="h-full bg-tertiary-container" style={{ width: `${stats.innovation}%` }} />
                </div>
                <span className="font-bold text-tertiary-fixed-dim w-5 text-right">{stats.innovation}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {techStack.slice(0, 3).map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
          {techStack.length > 3 && (
            <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 text-on-surface-variant bg-surface-dim border border-outline-variant rounded-sm">
              +{techStack.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Button link */}
      <Link
        href={`/projects/${slug}`}
        className="mt-2 w-full text-center font-mono font-bold text-xs border-2 border-primary bg-surface py-2 hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center gap-2 uppercase shadow-8bit-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
      >
        Open Intel
        <ArrowRight size={14} />
      </Link>
    </motion.div>
  )
}
