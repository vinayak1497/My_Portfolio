'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Folder,
  FolderOpen,
  Search,
  ChevronDown,
  ChevronRight,
  X,
  Eye,
  Download,
  ExternalLink,
  FileText,
  Filter,
  ArrowUpDown,
} from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import type { CertificationData } from '@/lib/content-data'

const rarityAccents: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  common: {
    bg: 'bg-surface-variant',
    text: 'text-on-surface-variant',
    border: 'border-outline-variant',
    hover: 'hover:bg-surface-container-high',
  },
  rare: {
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-300 dark:border-blue-700',
    hover: 'hover:bg-blue-100 dark:hover:bg-blue-950/30',
  },
  epic: {
    bg: 'bg-purple-50 dark:bg-purple-950/20',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-300 dark:border-purple-700',
    hover: 'hover:bg-purple-100 dark:hover:bg-purple-950/30',
  },
  legendary: {
    bg: 'bg-red-50 dark:bg-red-950/20',
    text: 'text-secondary dark:text-red-400',
    border: 'border-secondary dark:border-red-700',
    hover: 'hover:bg-red-100 dark:hover:bg-red-950/30',
  },
}

function getYear(date: string): number {
  return new Date(date).getFullYear()
}

function getShortDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function normalize(v: string): string {
  return v.toLowerCase().replace(/[^a-z0-9]/g, '')
}

interface CertificationArchiveProps {
  certifications: CertificationData[]
}

export function CertificationArchive({ certifications }: CertificationArchiveProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedIssuer, setSelectedIssuer] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterKey, setFilterKey] = useState<string>('all')
  const [filterValue, setFilterValue] = useState<string>('all')
  const [sortKey, setSortKey] = useState<string>('newest')
  const [selectedCert, setSelectedCert] = useState<CertificationData | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const issuers = useMemo(() => {
    const set = new Set<string>()
    for (const c of certifications) {
      if (c.issuer) set.add(c.issuer)
    }
    return Array.from(set).sort()
  }, [certifications])

  const allYears = useMemo(() => {
    const set = new Set<number>()
    for (const c of certifications) {
      if (c.date) set.add(getYear(c.date))
    }
    return Array.from(set).sort((a, b) => b - a)
  }, [certifications])

  const allSkills = useMemo(() => {
    const set = new Set<string>()
    for (const c of certifications) {
      for (const s of c.skills || []) {
        if (s) set.add(s)
      }
    }
    return Array.from(set).sort()
  }, [certifications])

  const allCategories = useMemo(() => {
    const set = new Set<string>()
    for (const c of certifications) {
      if (c.category) set.add(c.category)
    }
    return Array.from(set).sort()
  }, [certifications])

  const handleOpenModal = useCallback((cert: CertificationData) => {
    if (process.env.NODE_ENV === 'development') {
      console.group(`📜 Certificate Modal: ${cert.title}`)
      console.log('pdfUrl:', cert.pdfUrl || '❌ NOT SET')
      console.log('credentialUrl:', cert.credentialUrl || '❌ NOT SET')
      console.log('Full cert data:', cert)
      console.groupEnd()
    }
    setSelectedCert(cert)
    setModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setModalOpen(false)
    setSelectedCert(null)
  }, [])

  const handleDownloadPdf = useCallback(async (url: string, title: string) => {
    try {
      const response = await fetch(url, { mode: 'cors' })
      if (!response.ok) throw new Error('Fetch failed')
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10_000)
    } catch {
      window.open(url, '_blank')
    }
  }, [])

  const filteredCertifications = useMemo(() => {
    let result = [...certifications]

    // Folder filter
    if (selectedIssuer) {
      result = result.filter((c) => c.issuer === selectedIssuer)
    }

    // Search
    if (searchQuery.trim()) {
      const q = normalize(searchQuery.trim())
      result = result.filter((c) => {
        return (
          normalize(c.title).includes(q) ||
          normalize(c.issuer).includes(q) ||
          (c.skills || []).some((s) => normalize(s).includes(q)) ||
          String(getYear(c.date)).includes(q)
        )
      })
    }

    // Filter dropdown
    if (filterKey !== 'all' && filterValue !== 'all') {
      if (filterKey === 'issuer') {
        result = result.filter((c) => c.issuer === filterValue)
      } else if (filterKey === 'year') {
        result = result.filter((c) => String(getYear(c.date)) === filterValue)
      } else if (filterKey === 'skill') {
        result = result.filter((c) => (c.skills || []).includes(filterValue))
      } else if (filterKey === 'category') {
        result = result.filter((c) => c.category === filterValue)
      }
    }

    // Sort
    result.sort((a, b) => {
      switch (sortKey) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'issuer':
          return a.issuer.localeCompare(b.issuer)
        case 'hours':
          return (b.hours ?? 0) - (a.hours ?? 0)
        case 'name':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return result
  }, [certifications, selectedIssuer, searchQuery, filterKey, filterValue, sortKey])

  return (
    <div className="border-dialogue bg-surface shadow-8bit overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[480px]">
        {/* ─── LEFT SIDEBAR ─── */}
        <div
          className={cn(
            'border-r border-primary/10 flex-shrink-0 transition-all duration-200',
            sidebarCollapsed ? 'w-10' : 'w-full md:w-56',
          )}
        >
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-primary/10 bg-surface-container">
            {!sidebarCollapsed && (
              <span className="font-mono text-[10px] font-bold text-primary uppercase tracking-wider">
                Folders
              </span>
            )}
            <button
              onClick={() => setSidebarCollapsed((p) => !p)}
              className="p-1 rounded hover:bg-surface-container-high transition-colors text-on-surface-variant"
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {/* Folder list */}
          {!sidebarCollapsed && (
            <div className="py-1 max-h-[400px] overflow-y-auto">
              {/* All Certifications */}
              <button
                onClick={() => {
                  setSelectedIssuer(null)
                  setFilterKey('all')
                  setFilterValue('all')
                }}
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors text-left',
                  !selectedIssuer
                    ? 'bg-primary text-on-primary font-bold'
                    : 'text-on-surface-variant hover:bg-surface-container-high',
                )}
              >
                {!selectedIssuer ? <FolderOpen size={14} /> : <Folder size={14} />}
                All Certifications
                <span className="ml-auto text-[9px] opacity-60">{certifications.length}</span>
              </button>

              {/* Issuer folders */}
              {issuers.map((issuer) => {
                const count = certifications.filter((c) => c.issuer === issuer).length
                const isActive = selectedIssuer === issuer
                return (
                  <button
                    key={issuer}
                    onClick={() => {
                      setSelectedIssuer(issuer)
                      setFilterKey('all')
                      setFilterValue('all')
                    }}
                    className={cn(
                      'w-full flex items-center gap-2 px-3 py-[5px] font-mono text-[10px] uppercase tracking-wider transition-colors text-left',
                      isActive
                        ? 'bg-primary text-on-primary font-bold'
                        : 'text-on-surface-variant hover:bg-surface-container-high',
                    )}
                  >
                    {isActive ? <FolderOpen size={13} /> : <Folder size={13} />}
                    <span className="truncate">{issuer}</span>
                    <span className="ml-auto text-[8px] opacity-60">{count}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* ─── MAIN CONTENT ─── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* ── TOP TOOLBAR ── */}
          <div className="border-b border-primary/10 bg-surface-container-low px-3 py-2.5 flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative flex-1 min-w-[160px] max-w-xs">
              <Search
                size={13}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search certifications..."
                className="w-full pl-8 pr-3 py-1.5 font-mono text-[11px] bg-surface border border-outline-variant rounded text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary transition-colors uppercase tracking-wider"
              />
            </div>

            {/* Filter by */}
            <div className="flex items-center gap-1.5">
              <Filter size={12} className="text-on-surface-variant/60" />
              <select
                value={filterKey}
                onChange={(e) => {
                  setFilterKey(e.target.value)
                  setFilterValue('all')
                }}
                className="font-mono text-[10px] bg-surface border border-outline-variant rounded px-2 py-1.5 text-on-surface tracking-wider uppercase focus:outline-none focus:border-primary transition-colors"
              >
                <option value="all">All Filters</option>
                <option value="issuer">Issuer</option>
                <option value="year">Year</option>
                <option value="skill">Skill</option>
                <option value="category">Category</option>
              </select>

              {filterKey !== 'all' && (
                <select
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="font-mono text-[10px] bg-surface border border-outline-variant rounded px-2 py-1.5 text-on-surface tracking-wider uppercase focus:outline-none focus:border-primary transition-colors max-w-[120px]"
                >
                  <option value="all">All</option>
                  {filterKey === 'issuer' &&
                    issuers.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  {filterKey === 'year' &&
                    allYears.map((y) => (
                      <option key={y} value={String(y)}>
                        {y}
                      </option>
                    ))}
                  {filterKey === 'skill' &&
                    allSkills.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  {filterKey === 'category' &&
                    allCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              )}
            </div>

            {/* Sort by */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown size={12} className="text-on-surface-variant/60" />
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
                className="font-mono text-[10px] bg-surface border border-outline-variant rounded px-2 py-1.5 text-on-surface tracking-wider uppercase focus:outline-none focus:border-primary transition-colors"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="issuer">Issuer</option>
                <option value="hours">Hours</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          {/* ── RESULTS PANEL ── */}
          <div className="flex-1 overflow-y-auto max-h-[520px]">
            {filteredCertifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <FileText size={36} className="text-on-surface-variant/20 mb-3" />
                <p className="font-mono text-[11px] text-on-surface-variant/50 uppercase tracking-wider">
                  No certifications match your filters
                </p>
                {(searchQuery || selectedIssuer || filterKey !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedIssuer(null)
                      setFilterKey('all')
                      setFilterValue('all')
                      setSortKey('newest')
                    }}
                    className="mt-3 font-mono text-[10px] text-primary underline hover:text-secondary transition-colors uppercase tracking-wider"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <div>
                {/* Table header */}
                <div className="hidden md:flex items-center gap-3 px-4 py-2 border-b border-primary/5 bg-surface-container-low text-[9px] font-mono text-on-surface-variant/50 uppercase tracking-widest">
                  <div className="flex-1 min-w-0">Certification</div>
                  <div className="w-28 flex-shrink-0">Issuer</div>
                  <div className="w-20 flex-shrink-0">Date</div>
                  <div className="w-52 flex-shrink-0 hidden lg:block">Skills</div>
                  <div className="w-28 flex-shrink-0 text-right">Actions</div>
                </div>

                {filteredCertifications.map((cert, idx) => {
                  const accent = rarityAccents[cert.rarity] || rarityAccents.common
                  return (
                    <div
                      key={cert.slug}
                      className={cn(
                        'flex flex-col md:flex-row md:items-center gap-2 md:gap-3 px-4 py-2.5 border-b border-primary/5 transition-colors',
                        idx % 2 === 0 ? 'bg-surface' : 'bg-surface-container-low/30',
                        'hover:bg-surface-container-high/60',
                      )}
                    >
                      {/* Title + meta (mobile: stacked) */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              'w-1.5 h-1.5 rounded-full flex-shrink-0',
                              cert.rarity === 'common' && 'bg-outline-variant',
                              cert.rarity === 'rare' && 'bg-blue-400',
                              cert.rarity === 'epic' && 'bg-purple-400',
                              cert.rarity === 'legendary' && 'bg-secondary',
                            )}
                          />
                          <span className="font-mono text-xs font-bold text-primary uppercase truncate">
                            {cert.title}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 md:hidden">
                          <span className="font-mono text-[9px] text-on-surface-variant/70 uppercase">
                            {cert.issuer}
                          </span>
                          <span className="text-[8px] text-on-surface-variant/30">•</span>
                          <span className="font-mono text-[9px] text-on-surface-variant/50">
                            {getShortDate(cert.date)}
                          </span>
                        </div>
                        {cert.credentialId && (
                          <p className="font-mono text-[8px] text-on-surface-variant/40 mt-0.5 truncate">
                            ID: {cert.credentialId}
                          </p>
                        )}
                      </div>

                      {/* Issuer (desktop) */}
                      <div className="hidden md:block w-28 flex-shrink-0">
                        <span className="font-mono text-[10px] text-on-surface-variant uppercase truncate block">
                          {cert.issuer}
                        </span>
                      </div>

                      {/* Date (desktop) */}
                      <div className="hidden md:block w-20 flex-shrink-0">
                        <span className="font-mono text-[10px] text-on-surface-variant/60">
                          {getShortDate(cert.date)}
                        </span>
                      </div>

                      {/* Skills (desktop) */}
                      <div className="hidden lg:flex w-52 flex-shrink-0 flex-wrap gap-1">
                        {(cert.skills || []).slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="font-mono text-[8px] px-1.5 py-0.5 bg-surface-variant text-on-surface-variant rounded-sm uppercase tracking-wider"
                          >
                            {skill}
                          </span>
                        ))}
                        {(cert.skills || []).length > 3 && (
                          <span className="font-mono text-[8px] text-on-surface-variant/50">
                            +{cert.skills.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 md:w-28 flex-shrink-0 md:justify-end">
                        <button
                          type="button"
                          onClick={() => handleOpenModal(cert)}
                          className={cn(
                            'font-mono text-[9px] font-bold px-2 py-1 border-2 uppercase tracking-wider transition-all',
                            accent.border,
                            accent.text,
                            accent.bg,
                            accent.hover,
                            'shadow-8bit-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
                          )}
                        >
                          View
                        </button>
                        {cert.pdfUrl && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(cert.pdfUrl!, '_blank', 'noopener,noreferrer')
                            }}
                            className={cn(
                              'font-mono text-[9px] font-bold px-2 py-1 border-2 uppercase tracking-wider transition-all',
                              accent.border,
                              accent.text,
                              accent.bg,
                              accent.hover,
                              'shadow-8bit-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
                            )}
                            title="Preview PDF"
                          >
                            <Eye size={11} />
                          </button>
                        )}
                        {cert.pdfUrl && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDownloadPdf(cert.pdfUrl!, cert.title)
                            }}
                            className="font-mono text-[9px] font-bold px-2 py-1 border-2 border-outline-variant text-on-surface-variant bg-surface hover:bg-surface-container-high uppercase tracking-wider transition-all shadow-8bit-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                            title="Download PDF"
                          >
                            <Download size={11} />
                          </button>
                        )}
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => { e.stopPropagation() }}
                            className="font-mono text-[9px] font-bold px-2 py-1 border-2 border-outline-variant text-on-surface-variant bg-surface hover:bg-surface-container-high uppercase tracking-wider transition-all shadow-8bit-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                            title="Verify credential"
                          >
                            <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer count */}
          <div className="border-t border-primary/10 px-4 py-1.5 bg-surface-container-low flex items-center justify-between">
            <span className="font-mono text-[9px] text-on-surface-variant/50 uppercase tracking-wider">
              {filteredCertifications.length} of {certifications.length} certifications
            </span>
            {selectedIssuer && (
              <button
                onClick={() => setSelectedIssuer(null)}
                className="font-mono text-[9px] text-primary underline hover:text-secondary transition-colors uppercase tracking-wider"
              >
                Show all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ─── CERTIFICATE MODAL ─── */}
      <AnimatePresence>
        {modalOpen && selectedCert && (
          <motion.div
            key="cert-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50"
            onClick={(e: React.MouseEvent) => {
              if (e.target === e.currentTarget) handleCloseModal()
            }}
            style={{ pointerEvents: 'auto' }}
          >
            <motion.div
              key="cert-modal-panel"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="border-dialogue bg-surface shadow-8bit w-full max-w-lg mx-2 md:mx-0 relative flex flex-col max-h-[85vh]"
              style={{ pointerEvents: 'auto' }}
            >
              {/* Close button */}
              <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-primary/10 shrink-0">
                <span className="font-mono text-[9px] text-on-surface-variant/40 uppercase tracking-wider">
                  {selectedCert.rarity.toUpperCase()} BADGE
                </span>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="p-1.5 rounded border border-outline-variant bg-surface hover:bg-surface-container-high transition-colors text-on-surface-variant cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="p-4 md:p-6 overflow-y-auto">
                {/* Title */}
                <h2 className="font-mono text-lg font-bold text-primary uppercase leading-tight mb-4 pr-6">
                  {selectedCert.title}
                </h2>

                {/* Metadata */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-[10px] font-bold text-primary uppercase tracking-wider w-28 flex-shrink-0">
                      Issuer
                    </span>
                    <span className="font-mono text-[10px] text-on-surface uppercase">
                      {selectedCert.issuer}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-[10px] font-bold text-primary uppercase tracking-wider w-28 flex-shrink-0">
                      Date
                    </span>
                    <span className="font-mono text-[10px] text-on-surface">
                      {formatDate(selectedCert.date)}
                    </span>
                  </div>
                  {selectedCert.credentialId && (
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-[10px] font-bold text-primary uppercase tracking-wider w-28 flex-shrink-0">
                        Credential ID
                      </span>
                      <span className="font-mono text-[10px] text-on-surface-variant break-all">
                        {selectedCert.credentialId}
                      </span>
                    </div>
                  )}
                  {selectedCert.skills && selectedCert.skills.length > 0 && (
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-[10px] font-bold text-primary uppercase tracking-wider w-28 flex-shrink-0 pt-0.5">
                        Skills
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="font-mono text-[9px] px-2 py-0.5 bg-surface-variant text-on-surface-variant rounded-sm uppercase tracking-wider"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedCert.hours !== undefined && selectedCert.hours > 0 && (
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-[10px] font-bold text-primary uppercase tracking-wider w-28 flex-shrink-0">
                        Hours
                      </span>
                      <span className="font-mono text-[10px] text-on-surface">
                        {selectedCert.hours} hrs
                      </span>
                    </div>
                  )}
                  {selectedCert.category && (
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-[10px] font-bold text-primary uppercase tracking-wider w-28 flex-shrink-0">
                        Category
                      </span>
                      <span className="font-mono text-[10px] text-on-surface uppercase">
                        {selectedCert.category}
                      </span>
                    </div>
                  )}
                </div>


              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
