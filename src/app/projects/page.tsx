import type { Metadata } from 'next'
import Link from 'next/link'
import { getProjects } from '@/lib/content-data'
import { ProjectGrid } from '@/components/projects/ProjectGrid'
import { Terminal, Award, Map } from 'lucide-react'
import { projectsSEO } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/shared/JsonLd'

export const metadata: Metadata = projectsSEO

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-6">
      <BreadcrumbJsonLd items={[
        { name: 'Home', item: '/' },
        { name: 'Projects by Vinayak Kundar', item: '/projects' },
      ]} />

      <header className="mb-6 border-b-2 border-primary pb-3">
        <h1 className="text-headline-lg-mobile md:text-headline-lg text-primary uppercase flex items-center gap-3">
          <Terminal size={32} className="text-tertiary-container" aria-hidden="true" />
          Project Vault
        </h1>
        <p className="text-body-lg text-on-surface-variant mt-2">
          Vinayak Kundar&apos;s collectible project cards — AI agents, Web3 protocols, IoT precision agriculture,
          and full-stack applications built with Next.js, FastAPI, and cloud technologies.
        </p>
      </header>

      {/* Internal links */}
      <nav className="flex flex-wrap gap-3 mb-4" aria-label="Related pages">
        <Link
          href="/journey"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-secondary uppercase border border-secondary px-2 py-1 hover:bg-secondary hover:text-on-secondary transition-colors"
        >
          <Map size={12} aria-hidden="true" />
          Career Journey
        </Link>
        <Link
          href="/badges"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-secondary uppercase border border-secondary px-2 py-1 hover:bg-secondary hover:text-on-secondary transition-colors"
        >
          <Award size={12} aria-hidden="true" />
          Certifications & Badges
        </Link>
      </nav>

      <ProjectGrid projects={projects} />

      {/* SEO content */}
      <section className="sr-only" aria-hidden="false">
        <h2>Projects by Vinayak Kundar</h2>
        <p>
          Vinayak Kundar, a Computer Engineering student at APSIT (University of Mumbai), has built a diverse
          portfolio of projects demonstrating expertise in artificial intelligence, full stack development,
          Internet of Things, Web3, and automation.
        </p>
        <h3>Rupai — AI Finance Agent</h3>
        <p>
          An intelligent finance management platform built with Next.js, FastAPI, and Supabase. Rupai leverages
          AI to provide personalized financial insights, expense tracking, and automated budgeting assistance.
        </p>
        <h3>Project Kisan — IoT Precision Agriculture</h3>
        <p>
          A IoT-based precision farming system that integrates soil sensors, weather data APIs, and machine
          learning algorithms to optimize irrigation schedules and predict crop yields for Indian farmers.
        </p>
        <h3>LedgerTalk — Web3 Communication Protocol</h3>
        <p>
          A decentralized communication protocol built on blockchain technology, enabling secure, transparent
          peer-to-peer messaging with on-chain verification and smart contract integration.
        </p>
        <h3>Rookies — AI Automation Platform</h3>
        <p>
          An AI-powered automation platform that streamlines repetitive workflows using intelligent agents,
          built with Next.js, TypeScript, and FastAPI backend services.
        </p>
        <p>
          Explore Vinayak&apos;s <Link href="/journey">career journey</Link>,{' '}
          <Link href="/badges">certifications and skills</Link>, or{' '}
          <Link href="/about">full biography</Link>.
        </p>
      </section>
    </div>
  )
}
