import type { Metadata } from 'next'
import { getCertifications, getHackathons, getInternships, getLeadership, getMedia, getCertificates } from '@/lib/content-data'
import type { CertificationData, CertificateData } from '@/lib/content-data'
import { normalizePdfUrl } from '@/lib/utils'
import { TrainerProfileDashboard } from '@/components/badges/TrainerProfileDashboard'
import { CertificationArchive } from '@/components/badges/CertificationArchive'
import { SkillTreeAnalysis } from '@/components/badges/SkillTreeAnalysis'
import { LeagueAchievements } from '@/components/badges/LeagueAchievements'
import { CorporateQuests } from '@/components/badges/CorporateQuests'
import { CommunityLeadership } from '@/components/badges/CommunityLeadership'
import { MediaRecognition } from '@/components/badges/MediaRecognition'
import { Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Trainer Progression Hub',
  description: 'Career progression platform — certifications, hackathons, internships, leadership, and technical skills.',
}

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

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-8">
      {/* Page Header */}
      <header className="border-b-2 border-primary pb-3">
        <h1 className="text-headline-lg-mobile md:text-headline-lg text-primary uppercase flex items-center gap-3">
          <Award size={32} className="text-tertiary-container" />
          Trainer Progression Hub
        </h1>
        <p className="text-body-lg text-on-surface-variant mt-2">
          Career profile, credentials, skills, and achievements — explorer edition.
        </p>
      </header>

      {/* Section 1: Trainer Profile Dashboard */}
      <section id="profile">
        <TrainerProfileDashboard
          certifications={allCertifications}
          hackathons={hackathons}
          internships={internships}
          leadership={leadership}
        />
      </section>

      {/* Section 2: Certification Archive */}
      <section id="certifications">
        <h2 className="text-headline-md text-primary uppercase font-mono font-bold mb-4 border-b border-primary/20 pb-2">
          <span className="text-secondary">&gt;</span> Certification Archive
        </h2>
        <CertificationArchive certifications={allCertifications} />
      </section>

      {/* Section 3: Skill Tree Analysis */}
      <section id="skills">
        <h2 className="text-headline-md text-primary uppercase font-mono font-bold mb-4 border-b border-primary/20 pb-2">
          <span className="text-secondary">&gt;</span> Skill Tree Analysis
        </h2>
        <SkillTreeAnalysis certifications={allCertifications} />
      </section>

      {/* Section 4: League Achievements */}
      <section id="hackathons">
        <h2 className="text-headline-md text-primary uppercase font-mono font-bold mb-4 border-b border-primary/20 pb-2">
          <span className="text-secondary">&gt;</span> League Achievements
        </h2>
        <LeagueAchievements hackathons={hackathons} />
      </section>

      {/* Section 5: Corporate Quests */}
      <section id="internships">
        <h2 className="text-headline-md text-primary uppercase font-mono font-bold mb-4 border-b border-primary/20 pb-2">
          <span className="text-secondary">&gt;</span> Corporate Quests
        </h2>
        <CorporateQuests internships={internships} />
      </section>

      {/* Section 6: Community Leadership */}
      <section id="community">
        <h2 className="text-headline-md text-primary uppercase font-mono font-bold mb-4 border-b border-primary/20 pb-2">
          <span className="text-secondary">&gt;</span> Community Leadership
        </h2>
        <CommunityLeadership leadership={leadership} />
      </section>

      {/* Section 7: Media & Recognition */}
      <section id="media">
        <h2 className="text-headline-md text-primary uppercase font-mono font-bold mb-4 border-b border-primary/20 pb-2">
          <span className="text-secondary">&gt;</span> Media &amp; Recognition
        </h2>
        <MediaRecognition media={media} />
      </section>
    </div>
  )
}
