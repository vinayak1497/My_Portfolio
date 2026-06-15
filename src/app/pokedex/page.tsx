import type { Metadata } from 'next'
import { getNotes } from '@/lib/content-data'
import type { NoteSubject } from '@/lib/content-data'
import { PokedexView } from '@/components/pokedex/PokedexView'
import { Archive } from 'lucide-react'

export const metadata: Metadata = {
  title: 'PC Storage System',
  description: 'Engineering knowledge archive — browse notes on OS, DBMS, CN, AI, TOC, and Software Engineering.',
}

const subjectOrder: NoteSubject[] = [
  'os', 'dbms', 'cn', 'ai', 'toc', 'software-engineering',
]

const subjectLabels: Record<NoteSubject, string> = {
  os: 'Operating Systems',
  dbms: 'Database Management Systems',
  cn: 'Computer Networks',
  ai: 'Artificial Intelligence',
  toc: 'Theory of Computation',
  'software-engineering': 'Software Engineering',
}

export default async function PokedexPage() {
  const notes = await getNotes()
  const publishedNotes = notes.filter((n) => n.published)

  const groups = subjectOrder.map((key) => ({
    subject: key,
    label: subjectLabels[key],
    notes: publishedNotes
      .filter((n) => n.subject === key)
      .sort((a, b) => a.order - b.order),
  }))

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-6">
      <header className="mb-6 border-b-2 border-primary pb-3">
        <h1 className="text-headline-lg-mobile md:text-headline-lg text-primary uppercase flex items-center gap-3">
          <Archive size={32} className="text-tertiary-container" />
          PC Storage System
        </h1>
        <p className="text-body-lg text-on-surface-variant mt-2">
          Professor Oak&apos;s Digital Archive — browse engineering knowledge by subject folder.
        </p>
      </header>

      <PokedexView groups={groups} />
    </div>
  )
}
