import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProjectBySlug } from '@/lib/content-data'
import { MdxRenderer } from '@/components/shared/MdxRenderer'
import { EmulatorWindow } from '@/components/shared/EmulatorWindow'
import { RetroButton } from '@/components/shared/RetroButton'
import { TechBadge } from '@/components/projects/TechBadge'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}

  return {
    title: `${project.title} | Projects`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-6">
      {/* Back navigation */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 font-mono text-xs font-bold text-on-surface-variant hover:text-primary transition-colors uppercase"
      >
        <ArrowLeft size={16} />
        Back to Vault
      </Link>

      <EmulatorWindow title={`${project.title.toUpperCase()}.txt`} statusText={`LEVEL ${project.level}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 md:p-6">
          {/* Main info & MDX Content */}
          <div className="lg:col-span-2 space-y-6">
            <header className="space-y-2">
              <span className="font-mono text-xs font-bold text-secondary uppercase tracking-wider block">
                {project.category}
              </span>
              <h1 className="text-headline-md md:text-headline-lg font-bold text-primary">
                {project.title}
              </h1>
              <p className="text-on-surface-variant font-mono text-xs">
                RELEASE DATE: {formatDate(project.date)}
              </p>
            </header>

            <div className="h-[2px] bg-primary/10" />

            {/* Render MDX Code content */}
            <div className="article-body">
              <MdxRenderer code={project.content} />
            </div>
          </div>

          {/* Stats, Tech Stack, & Links Sidebar */}
          <div className="space-y-6">
            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <RetroButton variant="primary" className="w-full flex items-center justify-center gap-2">
                    Live Demo
                    <ExternalLink size={16} />
                  </RetroButton>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <RetroButton variant="secondary" className="w-full flex items-center justify-center gap-2">
                    Source Code
                    <Github size={16} />
                  </RetroButton>
                </a>
              )}
            </div>

            {/* Detailed Stats */}
            {project.stats && (
              <div className="border-dialogue bg-surface-container p-4 shadow-8bit space-y-4">
                <h3 className="font-mono text-xs font-bold text-primary uppercase border-b border-primary/10 pb-2">
                  Performance Attributes
                </h3>
                <div className="space-y-3 font-mono text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between font-bold">
                      <span>COMPLEXITY</span>
                      <span className="text-primary">{project.stats.complexity}/100</span>
                    </div>
                    <div className="h-2.5 bg-surface border border-outline-variant overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${project.stats.complexity}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between font-bold">
                      <span>IMPACT</span>
                      <span className="text-secondary">{project.stats.impact}/100</span>
                    </div>
                    <div className="h-2.5 bg-surface border border-outline-variant overflow-hidden">
                      <div className="h-full bg-secondary" style={{ width: `${project.stats.impact}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between font-bold">
                      <span>INNOVATION</span>
                      <span className="text-tertiary-fixed-dim">{project.stats.innovation}/100</span>
                    </div>
                    <div className="h-2.5 bg-surface border border-outline-variant overflow-hidden">
                      <div className="h-full bg-tertiary-container" style={{ width: `${project.stats.innovation}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tech Stack List */}
            <div className="border-dialogue bg-surface p-4 shadow-8bit space-y-3">
              <h3 className="font-mono text-xs font-bold text-primary uppercase border-b border-primary/10 pb-2">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </EmulatorWindow>
    </div>
  )
}
