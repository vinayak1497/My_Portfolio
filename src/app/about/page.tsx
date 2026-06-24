import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, GraduationCap, Award, Code, Users, ExternalLink, Building, Heart, Trophy, BookOpen, Cpu } from 'lucide-react'
import { aboutSEO } from '@/lib/seo'
import { BreadcrumbJsonLd, OrganizationJsonLd } from '@/components/shared/JsonLd'
import { EmulatorWindow } from '@/components/shared/EmulatorWindow'
import { RetroButton } from '@/components/shared/RetroButton'

export const metadata: Metadata = aboutSEO

export default function AboutPage() {
  const skills = [
    { name: 'Next.js / React / TypeScript', level: 'Expert' },
    { name: 'Python / FastAPI / Node.js', level: 'Expert' },
    { name: 'Machine Learning & AI', level: 'Advanced' },
    { name: 'Cloud Computing (GCP, Vercel)', level: 'Advanced' },
    { name: 'Supabase / PostgreSQL', level: 'Advanced' },
    { name: 'Web3 & Blockchain', level: 'Intermediate' },
    { name: 'IoT & Embedded Systems', level: 'Intermediate' },
    { name: 'Community Leadership & Event Management', level: 'Expert' },
  ]

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-6 max-w-4xl mx-auto">
      <BreadcrumbJsonLd items={[
        { name: 'Home', item: '/' },
        { name: 'About Vinayak Kundar', item: '/about' },
      ]} />
      <OrganizationJsonLd />

      <header className="mb-6 border-b-2 border-primary pb-3">
        <h1 className="text-headline-lg-mobile md:text-headline-lg text-primary uppercase flex items-center gap-3">
          <Users size={32} className="text-tertiary-container" aria-hidden="true" />
          About Vinayak Kundar
        </h1>
        <p className="text-body-lg text-on-surface-variant mt-2">
          Trainer profile dossier — Computer Engineering student at APSIT (University of Mumbai), AI builder,
          full stack developer, GDG On Campus Lead, and hackathon finalist based in Thane, Mumbai.
        </p>
      </header>

      {/* Biography Section — E-E-A-T focused */}
      <EmulatorWindow title="PLAYER_BIO.txt" statusText="VINAYAK KUNDAR">
        <div className="p-4 md:p-6 space-y-4">
          <p className="font-mono text-sm leading-relaxed text-on-surface">
            <strong className="text-primary">Vinayak Kundar</strong> (full name: <strong className="text-primary">Vinayak Umesh Kundar</strong>)
            is a Computer Engineering student at{' '}
            <strong className="text-secondary">A. P. Shah Institute of Technology (APSIT)</strong>, affiliated with{' '}
            <strong className="text-secondary">the University of Mumbai</strong>. He is an AI builder, full stack developer,
            hackathon finalist, and community leader based in <strong className="text-primary">Thane, Mumbai, Maharashtra, India</strong>.
          </p>
          <p className="font-mono text-sm leading-relaxed text-on-surface">
            As <strong className="text-secondary">GDG On Campus Head of Operations at APSIT</strong>, Vinayak organizes
            technology events, developer workshops, and hackathons that bring together hundreds of students from across
            Mumbai. He is deeply passionate about building AI-powered solutions that address real-world challenges —
            from precision agriculture systems using IoT and machine learning to Web3 communication protocols and
            intelligent finance agents.
          </p>
          <p className="font-mono text-sm leading-relaxed text-on-surface">
            Vinayak&apos;s technical expertise spans{' '}
            <strong className="text-primary">Next.js, React, TypeScript, Python, FastAPI, Node.js, Cloud Computing (Google Cloud),
            Machine Learning, and AI/ML</strong>. He has delivered production-grade projects in IoT, FinTech, automation,
            and agentic AI, and has been recognized as a hackathon finalist at multiple prestigious competitions
            including Cipherium (winner), VJTI (top 3), and NMIMS SPIT (top 10).
          </p>
          <p className="font-mono text-sm leading-relaxed text-on-surface">
            Beyond coding, Vinayak is a community leader and social impact initiator. He co-founded{' '}
            <strong className="text-secondary">Friendly Faces NGO</strong>, organized multiple blood donation camps,
            eye checkup camps, and a flood relief initiative that helped over 400 people in Chiplun, Maharashtra.
            He also actively contributes to developer communities, writes technical blogs on Dev.to and Hashnode,
            and regularly attends tech meetups across Mumbai.
          </p>
        </div>
      </EmulatorWindow>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border-dialogue bg-surface p-3 shadow-8bit-sm text-center">
          <GraduationCap size={24} className="mx-auto text-primary mb-1" aria-hidden="true" />
          <p className="font-mono text-xs font-bold text-primary">B.E. Computer Engineering</p>
          <p className="font-mono text-[10px] text-on-surface-variant">APSIT, Mumbai University</p>
          <p className="font-mono text-[10px] text-on-surface-variant">GPA: 9.822/10.0</p>
        </div>
        <div className="border-dialogue bg-surface p-3 shadow-8bit-sm text-center">
          <Building size={24} className="mx-auto text-secondary mb-1" aria-hidden="true" />
          <p className="font-mono text-xs font-bold text-primary">GDG On Campus APSIT</p>
          <p className="font-mono text-[10px] text-on-surface-variant">Head of Operations</p>
        </div>
        <div className="border-dialogue bg-surface p-3 shadow-8bit-sm text-center">
          <Code size={24} className="mx-auto text-tertiary-container mb-1" aria-hidden="true" />
          <p className="font-mono text-xs font-bold text-primary">10+ Projects</p>
          <p className="font-mono text-[10px] text-on-surface-variant">AI, Web3, IoT, Full Stack</p>
        </div>
        <div className="border-dialogue bg-surface p-3 shadow-8bit-sm text-center">
          <MapPin size={24} className="mx-auto text-on-surface-variant mb-1" aria-hidden="true" />
          <p className="font-mono text-xs font-bold text-primary">Thane, Mumbai</p>
          <p className="font-mono text-[10px] text-on-surface-variant">Maharashtra, India</p>
        </div>
      </div>

      {/* Education */}
      <EmulatorWindow title="EDUCATION.log" statusText="CURRENT">
        <div className="p-4 space-y-3">
          <div className="flex gap-3">
            <GraduationCap size={20} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 className="font-mono text-xs font-bold text-primary uppercase">Bachelor of Engineering (B.E.)</h2>
              <p className="font-mono text-[11px] text-secondary font-bold">Computer Engineering</p>
              <p className="font-mono text-[10px] text-on-surface-variant">A. P. Shah Institute of Technology (APSIT)</p>
              <p className="font-mono text-[10px] text-on-surface-variant">University of Mumbai</p>
              <p className="font-mono text-[10px] text-on-surface-variant">GPA: 9.822 / 10.0</p>
              <p className="font-mono text-[10px] text-on-surface-variant">Year of Graduation: May 2027</p>
            </div>
          </div>
          <div className="border-t border-outline-variant pt-3 mt-3">
            <h3 className="font-mono text-[10px] font-bold text-primary uppercase mb-2">Certifications</h3>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2 font-mono text-[10px] text-on-surface">
                <Award size={12} className="text-secondary shrink-0" />
                Google Cloud Digital Leader — Google Cloud Skills Boost
              </li>
              <li className="flex items-center gap-2 font-mono text-[10px] text-on-surface">
                <Award size={12} className="text-secondary shrink-0" />
                AWS Cloud Foundations — Amazon Web Services
              </li>
              <li className="flex items-center gap-2 font-mono text-[10px] text-on-surface">
                <Award size={12} className="text-secondary shrink-0" />
                Google Arcade Program Participant — Google Cloud
              </li>
            </ul>
          </div>
        </div>
      </EmulatorWindow>

      {/* Technical Skills */}
      <EmulatorWindow title="SKILL_TREE.sk" statusText="PROFICIENCY">
        <div className="p-4 md:p-6">
          <h2 className="font-mono text-xs font-bold text-primary uppercase mb-4">Technical Skills & Expertise</h2>
          <div className="space-y-3">
            {skills.map((skill) => (
              <div key={skill.name} className="flex items-center gap-3">
                <Cpu size={14} className="text-tertiary-container shrink-0" aria-hidden="true" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-[11px] font-bold text-on-surface">{skill.name}</span>
                    <span className="font-mono text-[10px] text-on-surface-variant uppercase">{skill.level}</span>
                  </div>
                  <div className="h-2 border border-primary bg-surface-container">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{
                        width: skill.level === 'Expert' ? '95%' : skill.level === 'Advanced' ? '80%' : '60%',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </EmulatorWindow>

      {/* Key Achievements */}
      <EmulatorWindow title="ACHIEVEMENTS.dat" statusText="UNLOCKED">
        <div className="p-4 md:p-6 space-y-4">
          <h2 className="font-mono text-xs font-bold text-primary uppercase">Hackathons & Competitions</h2>
          <ul className="space-y-3 font-mono text-xs">
            <li className="flex gap-3 items-start">
              <Trophy size={14} className="text-tertiary-container shrink-0 mt-0.5" aria-hidden="true" />
              <span><strong className="text-primary">Cipherium Hackathon — Winner</strong> — First place in a competitive inter-collegiate hackathon showcasing AI-powered solutions.</span>
            </li>
            <li className="flex gap-3 items-start">
              <Trophy size={14} className="text-secondary shrink-0 mt-0.5" aria-hidden="true" />
              <span><strong className="text-primary">VJTI Hackathon — Top 3 Finalist</strong> — Recognized among top teams at Veermata Jijabai Technological Institute for innovative project development.</span>
            </li>
            <li className="flex gap-3 items-start">
              <Trophy size={14} className="text-secondary shrink-0 mt-0.5" aria-hidden="true" />
              <span><strong className="text-primary">NMIMS SPIT Hackathon — Top 10</strong> — Selected among top 10 teams at Mukesh Patel School of Technology Management & Engineering.</span>
            </li>
          </ul>

          <div className="border-t border-outline-variant pt-4">
            <h2 className="font-mono text-xs font-bold text-primary uppercase mb-3">Community Leadership</h2>
            <ul className="space-y-3 font-mono text-xs">
              <li className="flex gap-3 items-start">
                <Users size={14} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span><strong className="text-primary">GDG On Campus Head of Operations</strong> at APSIT — Led organization of tech events, developer workshops, and hackathons reaching hundreds of students across Mumbai.</span>
              </li>
              <li className="flex gap-3 items-start">
                <Heart size={14} className="text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                <span><strong className="text-primary">Co-Founder, Friendly Faces NGO</strong> — Organized 4 blood donation camps, 1 eye checkup camp, and 1 flood relief camp in Chiplun (2020), helping over 400+ people.</span>
              </li>
              <li className="flex gap-3 items-start">
                <BookOpen size={14} className="text-tertiary-container shrink-0 mt-0.5" aria-hidden="true" />
                <span><strong className="text-primary">Technical Content Creator</strong> — Writing in-depth engineering blogs on Dev.to and Hashnode about AI, full stack development, and cloud computing. Active participant in Mumbai tech meetups.</span>
              </li>
            </ul>
          </div>
        </div>
      </EmulatorWindow>

      {/* Notable Projects */}
      <EmulatorWindow title="FEATURED_PROJECTS.cfg" statusText="OPEN SOURCE">
        <div className="p-4 md:p-6 space-y-4">
          <h2 className="font-mono text-xs font-bold text-primary uppercase">Notable Projects by Vinayak Kundar</h2>

          <article className="border border-outline-variant p-3">
            <h3 className="font-mono text-[11px] font-bold text-primary">Rupai — AI Finance Agent</h3>
            <p className="font-mono text-[10px] text-on-surface-variant mt-1">
              An intelligent finance agent built with Next.js, FastAPI, and Supabase that helps users manage
              personal finances through AI-powered insights and automation.
            </p>
          </article>

          <article className="border border-outline-variant p-3">
            <h3 className="font-mono text-[11px] font-bold text-primary">Project Kisan — IoT Precision Agriculture</h3>
            <p className="font-mono text-[10px] text-on-surface-variant mt-1">
              An IoT-based precision farming system integrating soil sensors, weather data, and machine learning
              to optimize crop irrigation and yield prediction for Indian farmers.
            </p>
          </article>

          <article className="border border-outline-variant p-3">
            <h3 className="font-mono text-[11px] font-bold text-primary">LedgerTalk — Web3 Communication Protocol</h3>
            <p className="font-mono text-[10px] text-on-surface-variant mt-1">
              A decentralized communication protocol built on blockchain technology enabling secure, transparent
              peer-to-peer messaging with on-chain verification.
            </p>
          </article>

          <article className="border border-outline-variant p-3">
            <h3 className="font-mono text-[11px] font-bold text-primary">Rookies — AI Automation Platform</h3>
            <p className="font-mono text-[10px] text-on-surface-variant mt-1">
              An AI-driven automation platform that streamlines repetitive workflows using intelligent agents,
              built with a modern tech stack including Next.js and FastAPI.
            </p>
          </article>
        </div>
      </EmulatorWindow>

      {/* Location + Open To */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EmulatorWindow title="LOCATION.gpx" statusText="THANE, MUMBAI">
          <div className="p-4 space-y-3">
            <div className="flex gap-3">
              <MapPin size={20} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h2 className="font-mono text-xs font-bold text-primary uppercase">Location</h2>
                <p className="font-mono text-[11px] text-on-surface">Vartak Nagar, Thane, Mumbai</p>
                <p className="font-mono text-[10px] text-on-surface-variant">Maharashtra, India — 400606</p>
                <p className="font-mono text-[10px] text-on-surface-variant mt-2">
                  Open to remote opportunities, hackathons, collaborative projects, and speaking engagements.
                </p>
              </div>
            </div>
          </div>
        </EmulatorWindow>

        <EmulatorWindow title="SOCIAL_LINKS.cfg" statusText="CONNECT">
          <div className="p-4 space-y-2">
            <a
              href="https://github.com/vinayak1497"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[11px] text-primary hover:text-secondary transition-colors"
            >
              <ExternalLink size={12} /> GitHub — vinayak1497
            </a>
            <a
              href="https://www.linkedin.com/in/vinayak-kundar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[11px] text-primary hover:text-secondary transition-colors"
            >
              <ExternalLink size={12} /> LinkedIn — vinayak-kundar
            </a>
            <a
              href="https://x.com/VKundar73526"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[11px] text-primary hover:text-secondary transition-colors"
            >
              <ExternalLink size={12} /> X (Twitter) — @VKundar73526
            </a>
            <a
              href="https://dev.to/vinayak1497"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[11px] text-primary hover:text-secondary transition-colors"
            >
              <ExternalLink size={12} /> Dev.to — vinayak1497
            </a>
            <a
              href="https://hashnode.com/@vinayak1497"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[11px] text-primary hover:text-secondary transition-colors"
            >
              <ExternalLink size={12} /> Hashnode — @vinayak1497
            </a>
          </div>
        </EmulatorWindow>
      </div>

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
        <Link href="/badges">
          <RetroButton variant="secondary" className="flex items-center gap-2">
            View Certifications
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
