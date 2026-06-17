import type { Metadata } from 'next'
import { getNotes } from '@/lib/content-data'
import type { NoteSubject } from '@/lib/content-data'
import { PokedexView } from '@/components/pokedex/PokedexView'
import { Archive } from 'lucide-react'
import { pokedexSEO } from '@/lib/seo'
import { BreadcrumbJsonLd, TechArticleJsonLd } from '@/components/shared/JsonLd'

export const metadata: Metadata = pokedexSEO

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

  const firstNote = publishedNotes[0]

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-6">
      <BreadcrumbJsonLd items={[
        { name: 'Home', item: '/' },
        { name: 'Pokédex', item: '/pokedex' },
      ]} />
      {firstNote && (
        <TechArticleJsonLd
          title={firstNote.title}
          description={firstNote.description}
          url="/pokedex"
          datePublished={new Date().toISOString().split('T')[0]}
          proficiencyLevel="Intermediate"
        />
      )}
      <header className="mb-6 border-b-2 border-primary pb-3">
        <h1 className="text-headline-lg-mobile md:text-headline-lg text-primary uppercase flex items-center gap-3">
          <Archive size={32} className="text-tertiary-container" aria-hidden="true" />
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
