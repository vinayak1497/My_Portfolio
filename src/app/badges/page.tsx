import type { Metadata } from 'next'
import Link from 'next/link'
import {
  getCertifications,
  getHackathons,
  getInternships,
  getLeadership,
  getMedia,
  getCertificates,
} from '@/lib/content-data'
import type { CertificationData, CertificateData } from '@/lib/content-data'
import { normalizePdfUrl } from '@/lib/utils'
import { TrainerProfileDashboard } from '@/components/badges/TrainerProfileDashboard'
import { CertificationArchive } from '@/components/badges/CertificationArchive'
import { SkillTreeAnalysis } from '@/components/badges/SkillTreeAnalysis'
import { LeagueAchievements } from '@/components/badges/LeagueAchievements'
import { CorporateQuests } from '@/components/badges/CorporateQuests'
import { CommunityLeadership } from '@/components/badges/CommunityLeadership'
import { MediaRecognition } from '@/components/badges/MediaRecognition'
import { Award, Map, FileText, BookOpen } from 'lucide-react'
import { badgesSEO } from '@/lib/seo'
import { BreadcrumbJsonLd, EducationalOccupationalCredentialJsonLd, EventJsonLd } from '@/components/shared/JsonLd'

export const metadata: Metadata = badgesSEO

function certificateToCertification(cert: CertificateData): CertificationData {
  const rawPdfUrl = cert.certificatePdfUrl?.trim()
  const pdfUrl = rawPdfUrl ? normalizePdfUrl(rawPdfUrl) : undefined

  const rawCredUrl = cert.verificationUrl?.trim()
  const credentialUrl = rawCredUrl || undefined

  return {
    title: cert.title,
    slug: cert.slug,
    issuer: cert.issuer,
    rarity: 'common',
    date: cert.issueDate,
    category: cert.category,
    skills: cert.skills,
    hours: cert.hours,
    credentialId: cert.credentialId,
    credentialUrl,
    pdfUrl,
    imageUrl: cert.thumbnailUrl,
    content: cert.content,
  }
}

export default async function BadgesPage() {
  const [certifications, certificates, hackathons, internships, leadership, media] = await Promise.all([
    getCertifications(),
    getCertificates(),
    getHackathons(),
    getInternships(),
    getLeadership(),
    getMedia(),
  ])

  const existingSlugs = new Set(certifications.map((c) => c.slug))
  const allCertifications = [
    ...certifications,
    ...certificates
      .filter((c) => c.published && !existingSlugs.has(c.slug))
      .map(certificateToCertification),
  ]

  const firstHackathon = hackathons[0]

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-8">
      <BreadcrumbJsonLd items={[
        { name: 'Home', item: '/' },
        { name: 'Badges', item: '/badges' },
      ]} />
      {certifications.slice(0, 3).map((cert) => (
        <EducationalOccupationalCredentialJsonLd
          key={cert.slug}
          name={cert.title}
          description={`${cert.title} — ${cert.category} certification by ${cert.issuer}`}
          url="/badges"
          issuerName={cert.issuer}
          dateIssued={cert.date}
        />
      ))}
      {firstHackathon && (
        <EventJsonLd
          name={firstHackathon.title}
          description={firstHackathon.content.substring(0, 200)}
          url="/badges"
          startDate={firstHackathon.date}
          eventType={firstHackathon.category}
        />
      )}

      {/* Page Header */}
      <header className="border-b-2 border-primary pb-3">
        <h1 className="text-headline-lg-mobile md:text-headline-lg text-primary uppercase flex items-center gap-3">
          <Award size={32} className="text-tertiary-container" aria-hidden="true" />
          Trainer Progression Hub
        </h1>
        <p className="text-body-lg text-on-surface-variant mt-2">
          Certifications, hackathons, internships, leadership, and skills of Vinayak Kundar — Computer Engineering
          student at APSIT (University of Mumbai), AI builder, and full stack developer.
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
          href="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-secondary uppercase border border-secondary px-2 py-1 hover:bg-secondary hover:text-on-secondary transition-colors"
        >
          <FileText size={12} aria-hidden="true" />
          Projects
        </Link>
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-secondary uppercase border border-secondary px-2 py-1 hover:bg-secondary hover:text-on-secondary transition-colors"
        >
          <BookOpen size={12} aria-hidden="true" />
          About Vinayak
        </Link>
      </nav>

      {/* Section 1: Trainer Profile Dashboard */}
      <section id="profile" aria-label="Trainer profile dashboard">
        <TrainerProfileDashboard
          certifications={allCertifications}
          hackathons={hackathons}
          internships={internships}
          leadership={leadership}
        />
      </section>

      {/* Section 2: Certification Archive */}
      <section id="certifications" aria-label="Certification archive">
        <h2 className="text-headline-md text-primary uppercase font-mono font-bold mb-4 border-b border-primary/20 pb-2">
          <span className="text-secondary" aria-hidden="true">&gt;</span> Certification Archive
        </h2>
        <CertificationArchive certifications={allCertifications} />
      </section>

      {/* Section 3: Skill Tree Analysis */}
      <section id="skills" aria-label="Skill tree analysis">
        <h2 className="text-headline-md text-primary uppercase font-mono font-bold mb-4 border-b border-primary/20 pb-2">
          <span className="text-secondary" aria-hidden="true">&gt;</span> Skill Tree Analysis
        </h2>
        <SkillTreeAnalysis certifications={allCertifications} />
      </section>

      {/* Section 4: League Achievements */}
      <section id="hackathons" aria-label="Hackathon achievements">
        <h2 className="text-headline-md text-primary uppercase font-mono font-bold mb-4 border-b border-primary/20 pb-2">
          <span className="text-secondary" aria-hidden="true">&gt;</span> League Achievements
        </h2>
        <LeagueAchievements hackathons={hackathons} />
      </section>

      {/* Section 5: Corporate Quests */}
      <section id="internships" aria-label="Internship experience">
        <h2 className="text-headline-md text-primary uppercase font-mono font-bold mb-4 border-b border-primary/20 pb-2">
          <span className="text-secondary" aria-hidden="true">&gt;</span> Corporate Quests
        </h2>
        <CorporateQuests internships={internships} />
      </section>

      {/* Section 6: Community Leadership */}
      <section id="community" aria-label="Community leadership">
        <h2 className="text-headline-md text-primary uppercase font-mono font-bold mb-4 border-b border-primary/20 pb-2">
          <span className="text-secondary" aria-hidden="true">&gt;</span> Community Leadership
        </h2>
        <CommunityLeadership leadership={leadership} />
      </section>

      {/* Section 7: Media & Recognition */}
      <section id="media" aria-label="Media recognition">
        <h2 className="text-headline-md text-primary uppercase font-mono font-bold mb-4 border-b border-primary/20 pb-2">
          <span className="text-secondary" aria-hidden="true">&gt;</span> Media &amp; Recognition
        </h2>
        <MediaRecognition media={media} />
      </section>
    </div>
  )
}
