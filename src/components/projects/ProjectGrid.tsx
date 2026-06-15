'use client'

import { useState, useMemo } from 'react'
import { ProjectCard } from './ProjectCard'
import { SlidersHorizontal } from 'lucide-react'

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
  date: string
}

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  const [sortBy, setSortBy] = useState<string>('LEVEL_DESC')

  // Extract all unique categories
  const categories = useMemo(() => {
    const list = new Set(projects.map((p) => p.category.split('/')[0].trim().toUpperCase()))
    return ['ALL', ...Array.from(list)]
  }, [projects])

  // Filter and sort logic
  const filteredAndSorted = useMemo(() => {
    return projects
      .filter((project) => {
        if (selectedCategory === 'ALL') return true
        return project.category.toUpperCase().includes(selectedCategory)
      })
      .sort((a, b) => {
        if (sortBy === 'LEVEL_DESC') return b.level - a.level
        if (sortBy === 'LEVEL_ASC') return a.level - b.level
        if (sortBy === 'TITLE_ASC') return a.title.localeCompare(b.title)
        if (sortBy === 'COMPLEXITY') {
          const compA = a.stats?.complexity ?? 0
          const compB = b.stats?.complexity ?? 0
          return compB - compA
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
  }, [projects, selectedCategory, sortBy])

  return (
    <div className="space-y-6">
      {/* Control Panel / Filter bar */}
      <div className="border-dialogue bg-surface-container p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-8bit">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-mono text-xs font-bold text-on-surface-variant flex items-center gap-1.5 mr-2">
            <SlidersHorizontal size={14} />
            TYPE:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-mono text-[10px] md:text-xs font-bold px-3 py-1.5 border-2 transition-all uppercase tracking-wider ${
                selectedCategory === cat
                  ? 'bg-primary text-on-primary border-primary shadow-8bit-sm translate-x-0.5 translate-y-0.5'
                  : 'bg-surface border-outline-variant hover:border-primary text-on-surface hover:scale-[1.02]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-on-surface-variant whitespace-nowrap">
            SORT BY:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="font-mono text-xs font-bold px-2 py-1.5 border-2 border-primary bg-surface text-primary focus:outline-none shadow-8bit-sm"
          >
            <option value="LEVEL_DESC">LEVEL: HIGH → LOW</option>
            <option value="LEVEL_ASC">LEVEL: LOW → HIGH</option>
            <option value="NEWEST">NEWEST RELEASE</option>
            <option value="COMPLEXITY">MAX COMPLEXITY</option>
            <option value="TITLE_ASC">ALPHABETICAL (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Grid Display */}
      {filteredAndSorted.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSorted.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center border-dialogue bg-surface p-12 shadow-8bit">
          <p className="font-mono text-lg font-bold text-secondary">NO INTEL RECORDED</p>
          <p className="font-mono text-xs text-on-surface-variant mt-2">
            Try adjusting your search or category filters.
          </p>
        </div>
      )}
    </div>
  )
}
