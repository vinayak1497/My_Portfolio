'use client'

import { useState, useMemo } from 'react'
import { MdxRenderer } from '../shared/MdxRenderer'
import {
  Folder, FolderOpen, FileText, File, Search, ChevronRight,
  Download, ExternalLink, BookOpen, ArrowLeft, Archive, HardDrive,
} from 'lucide-react'
import type { NoteData, NoteSubject } from '@/lib/content-data'

interface SubjectGroup {
  subject: NoteSubject
  label: string
  notes: NoteData[]
}

interface PokedexViewProps {
  groups: SubjectGroup[]
}

const subjectColor: Record<NoteSubject, string> = {
  os: 'text-secondary',
  dbms: 'text-tertiary-fixed-dim',
  cn: 'text-blue-500',
  ai: 'text-purple-500',
  toc: 'text-orange-500',
  'software-engineering': 'text-emerald-500',
}

function truncate(str: string, len: number): string {
  if (str.length <= len) return str
  return str.slice(0, len).replace(/\s+\S*$/, '') + '...'
}

export function PokedexView({ groups }: PokedexViewProps) {
  const [selectedSubject, setSelectedSubject] = useState<NoteSubject | null>(null)
  const [selectedFile, setSelectedFile] = useState<NoteData | null>(null)
  const [view, setView] = useState<'subjects' | 'files' | 'preview'>('subjects')
  const [searchQuery, setSearchQuery] = useState('')

  const activeGroup = groups.find((g) => g.subject === selectedSubject) || null

  const filteredNotes = useMemo(() => {
    if (!activeGroup) return []
    if (!searchQuery) return activeGroup.notes
    const q = searchQuery.toLowerCase()
    return activeGroup.notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q)
    )
  }, [activeGroup, searchQuery])

  function handleSelectSubject(s: NoteSubject) {
    setSelectedSubject(s)
    setSelectedFile(null)
    setView('files')
    setSearchQuery('')
  }

  function handleSelectFile(n: NoteData) {
    setSelectedFile(n)
    setView('preview')
  }

  function handleBack() {
    if (view === 'preview') {
      setView('files')
    } else if (view === 'files') {
      setSelectedSubject(null)
      setView('subjects')
    }
  }

  function triggerDownload(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleMarkdownDownload(content: string, title: string) {
    const blob = new Blob([content], { type: 'text/markdown' })
    triggerDownload(blob, `${title.toLowerCase().replace(/\s+/g, '-')}.md`)
  }

  async function handlePdfDownload(url: string, title: string) {
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const blob = await response.blob()
      if (blob.size === 0) throw new Error('Empty response')
      triggerDownload(blob, `${title}.pdf`)
    } catch {
      window.open(url, '_blank')
    }
  }

  const totalNotes = groups.reduce((s, g) => s + g.notes.length, 0)

  return (
    <div className="border-4 border-primary bg-secondary/15 rounded-xl shadow-8bit overflow-hidden">
      {/* Device Top Bar */}
      <div className="bg-secondary p-3 border-b-4 border-primary flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-400 border-4 border-white shadow-inner animate-pulse" />
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 border border-black/40" />
            <span className="w-3 h-3 rounded-full bg-yellow-500 border border-black/40" />
            <span className="w-3 h-3 rounded-full bg-green-500 border border-black/40" />
          </div>
        </div>
        <div className="text-right">
          <span className="font-mono text-[9px] font-bold text-white/50 block">PROFESSOR OAK&apos;S</span>
          <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">PC STORAGE v2.0</span>
        </div>
      </div>

      {/* Mobile back button */}
      {view !== 'subjects' && (
        <div className="lg:hidden flex items-center gap-2 p-2 border-b-2 border-primary/20 bg-surface">
          <button
            onClick={handleBack}
            className="flex items-center gap-1 font-mono text-[10px] font-bold text-on-surface-variant hover:text-primary uppercase transition-colors"
          >
            <ArrowLeft size={14} />
            {view === 'preview' ? 'Back to Files' : 'Back to Subjects'}
          </button>
          <span className="font-mono text-[9px] text-on-surface-variant/40 mx-2">|</span>
          <span className="font-mono text-[10px] font-bold text-primary truncate">
            {view === 'preview' && selectedFile
              ? selectedFile.title
              : activeGroup?.label || ''}
          </span>
        </div>
      )}

      {/* 3-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Column 1 — Subject Folders */}
        <div
          className={`lg:col-span-3 border-r-4 border-primary bg-surface-container flex flex-col ${
            view !== 'subjects' ? 'hidden lg:flex' : 'flex'
          } h-[480px]`}
        >
          <div className="bg-primary p-2 flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold text-on-primary uppercase tracking-wider flex items-center gap-1.5">
              <Archive size={12} />
              SUBJECT FOLDERS
            </span>
            <span className="font-mono text-[9px] text-on-primary/60">{totalNotes} FILES</span>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {groups.map((group) => {
              const isOpen = selectedSubject === group.subject
              const count = group.notes.length
              return (
                <button
                  key={group.subject}
                  onClick={() => handleSelectSubject(group.subject)}
                  className={`w-full text-left p-2.5 border-2 transition-all flex items-center gap-3 font-mono ${
                    isOpen
                      ? 'bg-primary text-on-primary border-primary'
                      : 'bg-surface border-outline-variant hover:border-primary text-on-surface hover:scale-[1.01]'
                  }`}
                >
                  {isOpen ? (
                    <FolderOpen size={18} className="shrink-0" />
                  ) : (
                    <Folder size={18} className={`shrink-0 ${subjectColor[group.subject]}`} />
                  )}
                  <span className="flex-1 text-xs font-bold truncate uppercase">
                    {group.label}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 border ${
                      isOpen
                        ? 'border-on-primary/30 text-on-primary/70'
                        : 'border-primary/20 text-on-surface-variant'
                    }`}
                  >
                    {count}
                  </span>
                  {isOpen && <ChevronRight size={12} className="shrink-0 opacity-50" />}
                </button>
              )
            })}
          </div>

          <div className="border-t-2 border-primary/20 p-2 bg-surface-variant/30">
            <div className="font-mono text-[9px] text-on-surface-variant/50 text-center">
              SELECT A FOLDER TO BROWSE FILES
            </div>
          </div>
        </div>

        {/* Column 2 — Files in Subject */}
        <div
          className={`lg:col-span-4 border-r-4 border-primary bg-surface flex flex-col ${
            view === 'subjects' ? 'hidden lg:flex' : view === 'preview' ? 'hidden lg:flex' : 'flex'
          } h-[480px]`}
        >
          <div className="p-2 border-b-2 border-primary/20">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-on-surface-variant/50" />
              <input
                type="text"
                placeholder={activeGroup ? `SEARCH IN ${activeGroup.label.toUpperCase()}...` : 'SEARCH FILES...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border-2 border-primary bg-surface font-mono text-xs font-bold focus:outline-none placeholder:text-on-surface-variant/30 uppercase"
              />
            </div>
          </div>

          <div className="bg-primary/10 px-3 py-1.5 border-b-2 border-primary/10 flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold text-primary uppercase flex items-center gap-1.5">
              {activeGroup && <FolderOpen size={12} className="text-secondary" />}
              {activeGroup?.label || 'NO FOLDER SELECTED'}
            </span>
            <span className="font-mono text-[9px] text-on-surface-variant/60">
              {filteredNotes.length} FILE{filteredNotes.length !== 1 ? 'S' : ''}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {!activeGroup ? (
              <div className="flex flex-col items-center justify-center h-full text-center font-mono py-12">
                <HardDrive size={36} className="text-primary/20 mb-2" />
                <p className="text-xs font-bold text-primary uppercase">No Folder Selected</p>
                <p className="text-[10px] text-on-surface-variant/60 mt-1 max-w-[200px]">
                  Select a subject folder from the left panel.
                </p>
              </div>
            ) : filteredNotes.length > 0 ? (
              filteredNotes.map((note) => {
                const isActive = selectedFile?.slug === note.slug
                const Icon = note.type === 'pdf' ? File : FileText
                return (
                  <button
                    key={note.slug}
                    onClick={() => handleSelectFile(note)}
                    className={`w-full text-left p-2.5 border-2 transition-all flex items-center gap-2.5 font-mono ${
                      isActive
                        ? 'bg-primary text-on-primary border-primary'
                        : 'bg-surface border-outline-variant hover:border-primary text-on-surface hover:scale-[1.01]'
                    }`}
                  >
                    <Icon
                      size={14}
                      className={`shrink-0 ${
                        isActive
                          ? 'text-on-primary'
                          : note.type === 'pdf'
                          ? 'text-secondary'
                          : 'text-tertiary-container'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate uppercase">
                        {note.title}
                      </div>
                      {note.description && (
                        <div className={`text-[9px] truncate mt-0.5 ${isActive ? 'text-on-primary/60' : 'text-on-surface-variant/50'}`}>
                          {note.description}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={`text-[9px] font-bold px-1 border ${
                        isActive ? 'border-on-primary/30 text-on-primary/60' : 'border-primary/20 text-on-surface-variant/50'
                      }`}>
                        {note.type === 'pdf' ? 'PDF' : 'MDX'}
                      </span>
                      <span className="text-[9px] opacity-40 font-bold">
                        #{String(note.order).padStart(2, '0')}
                      </span>
                    </div>
                  </button>
                )
              })
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center font-mono py-12">
                <Search size={28} className="text-primary/20 mb-2" />
                <p className="text-xs font-bold text-primary uppercase">No Results</p>
                <p className="text-[10px] text-on-surface-variant/60 mt-1 max-w-[200px]">
                  No files match your search query.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Column 3 — Preview Panel */}
        <div
          className={`lg:col-span-5 bg-surface p-4 md:p-5 flex flex-col ${
            view !== 'preview' ? 'hidden lg:flex' : 'flex'
          } h-[480px] overflow-y-auto`}
        >
          {selectedFile ? (
            <div className="space-y-4">
              {/* Header: title + type badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {selectedFile.type === 'pdf' ? (
                      <File size={14} className="text-secondary shrink-0" />
                    ) : (
                      <FileText size={14} className="text-tertiary-container shrink-0" />
                    )}
                    <span className="font-mono text-[9px] font-bold text-secondary uppercase tracking-widest">
                      {selectedFile.type === 'pdf' ? 'PDF DOCUMENT' : 'MDX NOTE'}
                    </span>
                  </div>
                  <h2 className="text-headline-sm font-bold text-primary uppercase leading-tight">
                    {selectedFile.title}
                  </h2>
                </div>
                <span className="font-mono text-[9px] font-bold px-2 py-1 border border-primary/20 bg-surface-variant text-on-surface-variant shrink-0 uppercase">
                  #{String(selectedFile.order).padStart(2, '0')}
                </span>
              </div>

              {/* Metadata bar */}
              <div className="flex flex-wrap gap-2">
                {selectedFile.metadata?.readingTime && (
                  <span className="font-mono text-[9px] px-2 py-0.5 border border-primary/10 bg-surface-variant/50 text-on-surface-variant uppercase tracking-wider">
                    ~{selectedFile.metadata.readingTime} MIN READ
                  </span>
                )}
                <span className="font-mono text-[9px] px-2 py-0.5 border border-primary/10 bg-surface-variant/50 text-on-surface-variant uppercase tracking-wider">
                  {activeGroup?.label || selectedFile.subject.toUpperCase()}
                </span>
                {selectedFile.fileUrl && (
                  <span className="font-mono text-[9px] px-2 py-0.5 border border-secondary/20 bg-secondary/5 text-secondary uppercase tracking-wider">
                    EXTERNAL FILE
                  </span>
                )}
              </div>

              {/* Description */}
              {selectedFile.description && (
                <div className="p-3 border-2 border-dashed border-outline bg-surface-variant/40 font-mono text-xs text-on-surface-variant leading-relaxed">
                  <span className="font-bold text-primary block mb-0.5 uppercase text-[10px]">Description:</span>
                  {selectedFile.description}
                </div>
              )}

              {/* Preview content */}
              <div className="border-t-2 border-primary/10 pt-3">
                <span className="font-mono text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-wider block mb-2">
                  Preview
                </span>
                <div className="max-h-48 overflow-y-auto border-2 border-primary/10 bg-surface-variant/20 p-3">
                  {selectedFile.type === 'pdf' ? (
                    <p className="font-mono text-xs text-on-surface-variant leading-relaxed">
                      {truncate(selectedFile.content, 500) || 'No preview available for this document.'}
                    </p>
                  ) : (
                    <div className="prose prose-sm max-w-none">
                      <MdxRenderer code={selectedFile.content} />
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {selectedFile.type === 'pdf' && selectedFile.fileUrl ? (
                  <a
                    href={selectedFile.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border-2 border-primary bg-primary text-on-primary font-mono text-xs font-bold uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-all shadow-8bit-sm"
                  >
                    <ExternalLink size={14} />
                    Open Document
                  </a>
                ) : selectedFile.type === 'mdx' ? (
                  <button
                    onClick={() => {
                      const el = document.getElementById('full-content-preview')
                      if (el) {
                        el.classList.toggle('max-h-96')
                        el.classList.toggle('max-h-none')
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 border-2 border-primary bg-primary text-on-primary font-mono text-xs font-bold uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-all shadow-8bit-sm"
                  >
                    <BookOpen size={14} />
                    Read Full Note
                  </button>
                ) : null}

                {selectedFile.fileUrl ? (
                  <button
                    onClick={() => handlePdfDownload(selectedFile.fileUrl!, selectedFile.title)}
                    className="inline-flex items-center gap-2 px-4 py-2 border-2 border-secondary bg-secondary text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-secondary-container hover:text-on-secondary transition-all shadow-8bit-sm"
                  >
                    <Download size={14} />
                    Download {selectedFile.type === 'pdf' ? 'PDF' : 'File'}
                  </button>
                ) : (
                  <button
                    onClick={() => handleMarkdownDownload(selectedFile.content, selectedFile.title)}
                    className="inline-flex items-center gap-2 px-4 py-2 border-2 border-outline-variant bg-surface text-on-surface font-mono text-xs font-bold uppercase tracking-wider hover:border-primary hover:text-primary transition-all shadow-8bit-sm"
                  >
                    <Download size={14} />
                    Download .md
                  </button>
                )}
              </div>

              {/* Full content expand area for MDX */}
              {selectedFile.type === 'mdx' && (
                <div id="full-content-preview" className="max-h-0 overflow-hidden transition-all duration-500">
                  <div className="border-t-2 border-primary/10 pt-3 mt-2">
                    <span className="font-mono text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-wider block mb-2">
                      Full Content
                    </span>
                    <div className="border-2 border-primary/10 bg-surface-variant/20 p-3">
                      <div className="prose prose-sm max-w-none">
                        <MdxRenderer code={selectedFile.content} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center font-mono py-12">
              <HardDrive size={48} className="text-primary/20 mb-3" />
              <p className="text-sm font-bold text-primary uppercase">No File Selected</p>
              <p className="text-xs text-on-surface-variant/60 mt-1 max-w-[240px]">
                Select a subject folder, then choose a file to preview its contents.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
