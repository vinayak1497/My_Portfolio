import type { Metadata } from 'next'
import { getProjects } from '@/lib/content-data'
import { ProjectGrid } from '@/components/projects/ProjectGrid'
import { Terminal } from 'lucide-react'
import { projectsSEO } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/shared/JsonLd'

export const metadata: Metadata = projectsSEO

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-6">
      <BreadcrumbJsonLd items={[
        { name: 'Home', item: '/' },
        { name: 'Projects', item: '/projects' },
      ]} />
      <header className="mb-6 border-b-2 border-primary pb-3">
        <h1 className="text-headline-lg-mobile md:text-headline-lg text-primary uppercase flex items-center gap-3">
          <Terminal size={32} className="text-tertiary-container" aria-hidden="true" />
          Project Vault
        </h1>
        <p className="text-body-lg text-on-surface-variant mt-2">
          Vinayak&apos;s collectible project cards. Investigate their stats and technical intel.
        </p>
      </header>

      <ProjectGrid projects={projects} />
    </div>
  )
}
