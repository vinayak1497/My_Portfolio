import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'
import {
  getProjects,
  getBlogs,
  getNotes,
  getCertifications,
  getHackathons,
  getCertificates,
  getInternships,
  getLeadership,
  getMedia,
} from '@/lib/content-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastMod = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/journey`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/badges`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/pokedex`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/resume`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]

  const [
    projects,
    blogs,
    notes,
    certifications,
    hackathons,
    certificates,
    internships,
    leadership,
    media,
  ] = await Promise.all([
    getProjects().catch(() => []),
    getBlogs().catch(() => []),
    getNotes().catch(() => []),
    getCertifications().catch(() => []),
    getHackathons().catch(() => []),
    getCertificates().catch(() => []),
    getInternships().catch(() => []),
    getLeadership().catch(() => []),
    getMedia().catch(() => []),
  ])

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: p.date || lastMod,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogPages: MetadataRoute.Sitemap = blogs
    .filter((b) => b.published)
    .map((b) => ({
      url: `${SITE_URL}/blogs/${b.slug}`,
      lastModified: b.date || lastMod,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  const notePages: MetadataRoute.Sitemap = notes
    .filter((n) => n.published)
    .map((n) => ({
      url: `${SITE_URL}/pokedex?subject=${n.subject}`,
      lastModified: lastMod,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))

  const certificationPages: MetadataRoute.Sitemap = certifications.map((c) => ({
    url: `${SITE_URL}/badges`,
    lastModified: c.date || lastMod,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const hackathonPages: MetadataRoute.Sitemap = hackathons.map((h) => ({
    url: `${SITE_URL}/badges`,
    lastModified: h.date || lastMod,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const certificatePages: MetadataRoute.Sitemap = certificates
    .filter((c) => c.published)
    .map((c) => ({
      url: `${SITE_URL}/badges`,
      lastModified: c.issueDate || lastMod,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))

  const internshipPages: MetadataRoute.Sitemap = internships.map((i) => ({
    url: `${SITE_URL}/badges`,
    lastModified: i.startDate || lastMod,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const leadershipPages: MetadataRoute.Sitemap = leadership.map((l) => ({
    url: `${SITE_URL}/badges`,
    lastModified: l.startDate || lastMod,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const mediaPages: MetadataRoute.Sitemap = media.map((m) => ({
    url: `${SITE_URL}/badges`,
    lastModified: m.date || lastMod,
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }))

  return [
    ...staticPages,
    ...projectPages,
    ...blogPages,
    ...notePages,
    ...certificationPages,
    ...hackathonPages,
    ...certificatePages,
    ...internshipPages,
    ...leadershipPages,
    ...mediaPages,
  ]
}
