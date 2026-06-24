import type { Metadata } from 'next'
import Link from 'next/link'
import { JourneyMap } from '@/components/journey/JourneyMap'
import { Map, Terminal, Award, FileText, BookOpen } from 'lucide-react'
import { journeySEO } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/shared/JsonLd'

export const metadata: Metadata = journeySEO

export default function JourneyPage() {
  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-6">
      <BreadcrumbJsonLd items={[
        { name: 'Home', item: '/' },
        { name: 'Career Journey of Vinayak Kundar', item: '/journey' },
      ]} />

      <header className="mb-6 border-b-2 border-primary pb-3">
        <h1 className="text-headline-lg-mobile md:text-headline-lg text-primary uppercase flex items-center gap-3">
          <Map size={32} className="text-tertiary-container" aria-hidden="true" />
          Career Journey of Vinayak Kundar
        </h1>
        <p className="text-body-lg text-on-surface-variant mt-2">
          The RPG story of Vinayak Kundar — from Computer Engineering student at APSIT (University of Mumbai)
          to AI builder, full stack developer, and GDG On Campus Lead. Click locations on the map below to investigate.
        </p>
      </header>

      {/* Internal linking hub */}
      <nav className="grid grid-cols-2 md:grid-cols-4 gap-3" aria-label="Quick navigation">
        <Link
          href="/projects"
          className="border border-outline-variant bg-surface p-3 hover:border-primary transition-colors text-center"
        >
          <Terminal size={20} className="mx-auto text-primary mb-1" aria-hidden="true" />
          <span className="font-mono text-[10px] font-bold text-primary uppercase block">Projects</span>
          <span className="font-mono text-[9px] text-on-surface-variant">View project vault</span>
        </Link>
        <Link
          href="/badges"
          className="border border-outline-variant bg-surface p-3 hover:border-primary transition-colors text-center"
        >
          <Award size={20} className="mx-auto text-secondary mb-1" aria-hidden="true" />
          <span className="font-mono text-[10px] font-bold text-primary uppercase block">Badges</span>
          <span className="font-mono text-[9px] text-on-surface-variant">Certifications & skills</span>
        </Link>
        <Link
          href="/blogs"
          className="border border-outline-variant bg-surface p-3 hover:border-primary transition-colors text-center"
        >
          <FileText size={20} className="mx-auto text-tertiary-container mb-1" aria-hidden="true" />
          <span className="font-mono text-[10px] font-bold text-primary uppercase block">Blogs</span>
          <span className="font-mono text-[9px] text-on-surface-variant">Engineering insights</span>
        </Link>
        <Link
          href="/about"
          className="border border-outline-variant bg-surface p-3 hover:border-primary transition-colors text-center"
        >
          <BookOpen size={20} className="mx-auto text-on-surface-variant mb-1" aria-hidden="true" />
          <span className="font-mono text-[10px] font-bold text-primary uppercase block">About</span>
          <span className="font-mono text-[9px] text-on-surface-variant">Full biography</span>
        </Link>
      </nav>

      <JourneyMap />

      {/* SEO content for journey page */}
      <section className="sr-only" aria-hidden="false">
        <h2>About Vinayak Kundar&apos;s Career Journey</h2>
        <p>
          Vinayak Kundar, a Computer Engineering student at APSIT (University of Mumbai), has built a diverse
          portfolio spanning AI, full stack development, IoT, Web3, and community leadership. His journey includes
          founding Friendly Faces NGO, leading GDG On Campus at APSIT, winning hackathons like Cipherium, and
          building production-grade applications including Rupai (AI finance agent), Project Kisan (precision
          agriculture), LedgerTalk (Web3 protocol), and Rookies (AI automation).
        </p>
        <p>
          Based in Thane, Mumbai, Vinayak holds certifications from Google Cloud and AWS, and maintains an
          outstanding academic record with a GPA of 9.822/10.0 at APSIT. He actively contributes to developer
          communities, writes technical blogs on Dev.to and Hashnode, and participates in hackathons and tech
          meetups across Mumbai.
        </p>
        <p>
          Explore his <Link href="/projects">projects</Link>,{' '}
          <Link href="/badges">certifications and badges</Link>,{' '}
          <Link href="/blogs">technical blog posts</Link>, or{' '}
          <Link href="/about">learn more about Vinayak Kundar</Link>.
        </p>
      </section>
    </div>
  )
}
