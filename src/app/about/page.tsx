import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, GraduationCap, Award, Code, Users, ExternalLink, ChevronRight } from 'lucide-react'
import { aboutSEO } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/shared/JsonLd'
import { EmulatorWindow } from '@/components/shared/EmulatorWindow'
import { RetroButton } from '@/components/shared/RetroButton'

export const metadata: Metadata = aboutSEO

export default function AboutPage() {
  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-6 max-w-4xl mx-auto">
      <BreadcrumbJsonLd items={[
        { name: 'Home', item: '/' },
        { name: 'About', item: '/about' },
      ]} />

      <header className="mb-6 border-b-2 border-primary pb-3">
        <h1 className="text-headline-lg-mobile md:text-headline-lg text-primary uppercase flex items-center gap-3">
          <Users size={32} className="text-tertiary-container" aria-hidden="true" />
          About
        </h1>
        <p className="text-body-lg text-on-surface-variant mt-2">
          Trainer profile dossier — background, achievements, and mission data.
        </p>
      </header>

      {/* Biography Section */}
      <EmulatorWindow title="PLAYER_BIO.txt" statusText="VINAYAK KUNDAR">
        <div className="p-4 md:p-6 space-y-4">
          <p className="font-mono text-sm leading-relaxed text-on-surface">
            <strong className="text-primary">Vinayak Kundar</strong> is a Computer Engineering student at{' '}
            <strong className="text-secondary">APSIT (University of Mumbai)</strong>, an AI builder, full stack developer,
            and community leader based in <strong className="text-primary">Thane, Mumbai</strong>.
          </p>
          <p className="font-mono text-sm leading-relaxed text-on-surface">
            As a <strong className="text-secondary">GDG On Campus Lead at APSIT</strong>, Vinayak organizes tech events,
            workshops, and hackathons that bring together hundreds of students. He is passionate about building AI-powered
            solutions that solve real-world problems — from precision agriculture systems to Web3 communication protocols.
          </p>
          <p className="font-mono text-sm leading-relaxed text-on-surface">
            His technical expertise spans <strong className="text-primary">Next.js, React, TypeScript, Python, Node.js,
            Cloud Computing, and AI/ML</strong>. He has delivered projects in IoT, FinTech, automation, and agentic AI,
            and has been recognized as a hackathon finalist multiple times.
          </p>
        </div>
      </EmulatorWindow>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border-dialogue bg-surface p-3 shadow-8bit-sm text-center">
          <GraduationCap size={24} className="mx-auto text-primary mb-1" aria-hidden="true" />
          <p className="font-mono text-xs font-bold text-primary">B.E. Computer Eng.</p>
          <p className="font-mono text-[10px] text-on-surface-variant">APSIT, 2026</p>
        </div>
        <div className="border-dialogue bg-surface p-3 shadow-8bit-sm text-center">
          <Award size={24} className="mx-auto text-secondary mb-1" aria-hidden="true" />
          <p className="font-mono text-xs font-bold text-primary">Google Developer's Group on Campus</p>
          <p className="font-mono text-[10px] text-on-surface-variant">Head of Operations</p>
        </div>
        <div className="border-dialogue bg-surface p-3 shadow-8bit-sm text-center">
          <Code size={24} className="mx-auto text-tertiary-container mb-1" aria-hidden="true" />
          <p className="font-mono text-xs font-bold text-primary">10+ Projects</p>
          <p className="font-mono text-[10px] text-on-surface-variant">AI, Automation</p>
        </div>
        <div className="border-dialogue bg-surface p-3 shadow-8bit-sm text-center">
          <MapPin size={24} className="mx-auto text-on-surface-variant mb-1" aria-hidden="true" />
          <p className="font-mono text-xs font-bold text-primary">Thane, Mumbai</p>
          <p className="font-mono text-[10px] text-on-surface-variant">Maharashtra, India</p>
        </div>
      </div>

      {/* Education & Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EmulatorWindow title="EDUCATION.log" statusText="CURRENT">
          <div className="p-4 space-y-3">
            <div className="flex gap-3">
              <GraduationCap size={20} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-mono text-xs font-bold text-primary uppercase">Bachelor of Engineering</h3>
                <p className="font-mono text-[11px] text-secondary font-bold">Computer Engineering</p>
                <p className="font-mono text-[10px] text-on-surface-variant">APSIT (University of Mumbai)</p>
                <p className="font-mono text-[10px] text-on-surface-variant">GPA: 9.822/10.0</p>
                <p className="font-mono text-[10px] text-on-surface-variant">Year of Graduation: May 2027</p>
              </div>
            </div>
          </div>
        </EmulatorWindow>

        <EmulatorWindow title="LOCATION.gpx" statusText="THANE">
          <div className="p-4 space-y-3">
            <div className="flex gap-3">
              <MapPin size={20} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-mono text-xs font-bold text-primary uppercase">Location</h3>
                <p className="font-mono text-[11px] text-on-surface">Vartak Nagar, Thane, Mumbai</p>
                <p className="font-mono text-[10px] text-on-surface-variant">Maharashtra, India — 400606</p>
                <p className="font-mono text-[10px] text-on-surface-variant mt-2">
                  Open to remote opportunities, hackathons, and collaborative projects.
                </p>
              </div>
            </div>
          </div>
        </EmulatorWindow>
      </div>

      {/* Key Achievements */}
      <EmulatorWindow title="ACHIEVEMENTS.dat" statusText="UNLOCKED">
        <div className="p-4 md:p-6 space-y-4">
          <ul className="space-y-3 font-mono text-xs">
            <li className="flex gap-3 items-start">
              <ChevronRight size={14} className="text-secondary shrink-0 mt-0.5" aria-hidden="true" />
              <span><strong className="text-primary">GDG On Campus Head of Operations</strong> at APSIT — Organized multiple tech events, workshops, and hackathons, impacting hundreds of students.</span>
            </li>
            <li className="flex gap-3 items-start">
              <ChevronRight size={14} className="text-secondary shrink-0 mt-0.5" aria-hidden="true" />
              <span><strong className="text-primary">Hackathon Finalist</strong> — Recognized in multiple competitive programming and innovation challenges. Won Cipherium hackathon, top 3 at VJTI, Top 10 at NMIMS</span>
            </li>
            <li className="flex gap-3 items-start">
              <ChevronRight size={14} className="text-secondary shrink-0 mt-0.5" aria-hidden="true" />
              <span><strong className="text-primary">Google Cloud Digital Leader</strong> — Certified in cloud architecture and digital transformation. Actively participating in Google Arcade challenges</span>
            </li>
            <li className="flex gap-3 items-start">
              <ChevronRight size={14} className="text-secondary shrink-0 mt-0.5" aria-hidden="true" />
              <span><strong className="text-primary">Community Leadership</strong> — Co-Founded Friendly Faces NGO, organized 4 blood donation camps, 1 Eye checkup camp, 1 flood relief camp to help 400+ lives in chiplun in 2020 and many other social initiatives.</span>
            </li>
            <li className="flex gap-3 items-start">
              <ChevronRight size={14} className="text-secondary shrink-0 mt-0.5" aria-hidden="true" />
              <span><strong className="text-primary">Technical Content creator</strong> — Apart from building production grade software, I write many technical blogs at dev.io and other platform, actively participating in meetups in mumbai every weekend and posting about it in linkedin.</span>
            </li>
          </ul>
        </div>
      </EmulatorWindow>

      {/* CTA Links */}
      <div className="flex flex-wrap gap-4 justify-center pt-4">
        <Link href="/resume">
          <RetroButton variant="primary" className="flex items-center gap-2">
            View Resume
            <ExternalLink size={14} aria-hidden="true" />
          </RetroButton>
        </Link>
        <Link href="/projects">
          <RetroButton variant="secondary" className="flex items-center gap-2">
            Explore Projects
            <ExternalLink size={14} aria-hidden="true" />
          </RetroButton>
        </Link>
        <Link href="/contact">
          <RetroButton variant="primary" className="flex items-center gap-2">
            Get In Touch
            <ExternalLink size={14} aria-hidden="true" />
          </RetroButton>
        </Link>
      </div>
    </div>
  )
}
