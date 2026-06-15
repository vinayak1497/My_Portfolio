import { listContent, getContentBySlug } from './content-manager'
import { normalizePdfUrl } from './utils'

interface ProjectStats {
  complexity: number
  impact: number
  innovation: number
}

export interface ProjectData {
  title: string
  slug: string
  description: string
  category: string
  level: number
  techStack: string[]
  thumbnail?: string
  liveUrl?: string
  githubUrl?: string
  stats?: ProjectStats
  featured?: boolean
  date: string
  content: string
}

export interface BlogData {
  title: string
  slug: string
  description: string
  date: string
  tags: string[]
  published: boolean
  metadata?: { readingTime?: number; wordCount?: number }
  content: string
}

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary'

export interface CertificationData {
  title: string
  slug: string
  issuer: string
  rarity: Rarity
  date: string
  category: string
  skills: string[]
  hours?: number
  credentialId?: string
  credentialUrl?: string
  pdfUrl?: string
  imageUrl?: string
  content: string
}

export type NoteSubject = 'os' | 'dbms' | 'cn' | 'ai' | 'toc' | 'software-engineering'

export interface NoteData {
  title: string
  slug: string
  subject: NoteSubject
  description: string
  order: number
  published: boolean
  type: 'mdx' | 'pdf'
  fileUrl?: string
  metadata?: { readingTime?: number; pageCount?: number }
  content: string
}

export type MissionType = 'leadership' | 'hackathon' | 'talk' | 'workshop' | 'community'

export interface MissionData {
  title: string
  slug: string
  type: MissionType
  xp: number
  completed: boolean
  date: string
  content: string
}

export interface HackathonData {
  title: string
  slug: string
  position: string
  category: string
  teamSize: number
  projectName: string
  technologies: string[]
  date: string
  prize?: string
  content: string
}

export interface InternshipData {
  title: string
  slug: string
  company: string
  status: 'Completed' | 'In Progress' | 'Archived'
  duration: string
  startDate: string
  endDate: string
  skills: string[]
  hours: number
  certificateUrl?: string
  content: string
}

export interface LeadershipData {
  title: string
  slug: string
  organization: string
  role: string
  startDate: string
  endDate?: string
  impact: string
  peopleImpacted: number
  eventsConducted: number
  volunteersManaged: number
  initiativeType: string
  xp: number
  content: string
}

export interface MediaData {
  title: string
  slug: string
  type: string
  publication: string
  date: string
  url?: string
  thumbnail?: string
  description: string
  content: string
}

export type CertificateCategory = 'certification' | 'internship' | 'workshop' | 'seminar' | 'hackathon' | 'achievement'

export interface CertificateData {
  title: string
  slug: string
  issuer: string
  category: CertificateCategory
  issueDate: string
  skills: string[]
  hours?: number
  credentialId?: string
  verificationUrl?: string
  certificatePdfUrl?: string
  thumbnailUrl?: string
  featured: boolean
  published: boolean
  content: string
}

function parseStats(raw: unknown): ProjectStats | undefined {
  if (!raw || typeof raw !== 'object') return undefined
  const s = raw as Record<string, unknown>
  return {
    complexity: Number(s.complexity) || 0,
    impact: Number(s.impact) || 0,
    innovation: Number(s.innovation) || 0,
  }
}

export async function getProjects(): Promise<ProjectData[]> {
  const docs = await listContent('projects')
  return docs.map((doc) => ({
    title: String(doc.frontmatter.title ?? ''),
    slug: doc.slug,
    description: String(doc.frontmatter.description ?? ''),
    category: String(doc.frontmatter.category ?? ''),
    level: Number(doc.frontmatter.level) || 0,
    techStack: Array.isArray(doc.frontmatter.techStack) ? (doc.frontmatter.techStack as string[]) : [],
    thumbnail: doc.frontmatter.thumbnail as string | undefined,
    liveUrl: doc.frontmatter.liveUrl as string | undefined,
    githubUrl: doc.frontmatter.githubUrl as string | undefined,
    stats: parseStats(doc.frontmatter.stats),
    featured: Boolean(doc.frontmatter.featured),
    date: String(doc.frontmatter.date ?? ''),
    content: doc.body,
  }))
}

export async function getProjectBySlug(slug: string): Promise<ProjectData | null> {
  const doc = await getContentBySlug('projects', slug)
  if (!doc) return null
  return {
    title: String(doc.frontmatter.title ?? ''),
    slug: doc.slug,
    description: String(doc.frontmatter.description ?? ''),
    category: String(doc.frontmatter.category ?? ''),
    level: Number(doc.frontmatter.level) || 0,
    techStack: Array.isArray(doc.frontmatter.techStack) ? (doc.frontmatter.techStack as string[]) : [],
    thumbnail: doc.frontmatter.thumbnail as string | undefined,
    liveUrl: doc.frontmatter.liveUrl as string | undefined,
    githubUrl: doc.frontmatter.githubUrl as string | undefined,
    stats: parseStats(doc.frontmatter.stats),
    featured: Boolean(doc.frontmatter.featured),
    date: String(doc.frontmatter.date ?? ''),
    content: doc.body,
  }
}

export async function getBlogs(): Promise<BlogData[]> {
  const docs = await listContent('blogs')
  return docs.map((doc) => ({
    title: String(doc.frontmatter.title ?? ''),
    slug: doc.slug,
    description: String(doc.frontmatter.description ?? ''),
    date: String(doc.frontmatter.date ?? ''),
    tags: Array.isArray(doc.frontmatter.tags) ? (doc.frontmatter.tags as string[]) : [],
    published: doc.frontmatter.published !== false,
    metadata: { readingTime: readingTime(doc.body) },
    content: doc.body,
  }))
}

export async function getBlogBySlug(slug: string): Promise<BlogData | null> {
  const doc = await getContentBySlug('blogs', slug)
  if (!doc) return null
  return {
    title: String(doc.frontmatter.title ?? ''),
    slug: doc.slug,
    description: String(doc.frontmatter.description ?? ''),
    date: String(doc.frontmatter.date ?? ''),
    tags: Array.isArray(doc.frontmatter.tags) ? (doc.frontmatter.tags as string[]) : [],
    published: doc.frontmatter.published !== false,
    content: doc.body,
  }
}

function readingTime(content: string): number {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200))
}

export async function getMissions(): Promise<MissionData[]> {
  const docs = await listContent('missions')
  return docs.map((doc) => ({
    title: String(doc.frontmatter.title ?? ''),
    slug: doc.slug,
    type: (String(doc.frontmatter.type ?? 'community') as MissionType),
    xp: Number(doc.frontmatter.xp) || 0,
    completed: doc.frontmatter.completed !== false,
    date: String(doc.frontmatter.date ?? ''),
    content: doc.body,
  }))
}

export async function getCertifications(): Promise<CertificationData[]> {
  const docs = await listContent('certifications')
  return docs.map((doc) => ({
    title: String(doc.frontmatter.title ?? ''),
    slug: doc.slug,
    issuer: String(doc.frontmatter.issuer ?? ''),
    rarity: (String(doc.frontmatter.rarity ?? 'common') as Rarity),
    date: String(doc.frontmatter.date ?? ''),
    category: String(doc.frontmatter.category ?? 'certification'),
    skills: Array.isArray(doc.frontmatter.skills) ? (doc.frontmatter.skills as string[]) : [],
    hours: doc.frontmatter.hours ? Number(doc.frontmatter.hours) : undefined,
    credentialId: doc.frontmatter.credentialId as string | undefined,
    credentialUrl: doc.frontmatter.credentialUrl as string | undefined,
    pdfUrl: doc.frontmatter.pdfUrl ? normalizePdfUrl(String(doc.frontmatter.pdfUrl)) : undefined,
    imageUrl: doc.frontmatter.imageUrl as string | undefined,
    content: doc.body,
  }))
}

export async function getNotes(): Promise<NoteData[]> {
  const docs = await listContent('notes')
  return docs.map((doc) => ({
    title: String(doc.frontmatter.title ?? ''),
    slug: doc.slug,
    subject: (String(doc.frontmatter.subject ?? '') as NoteSubject),
    description: String(doc.frontmatter.description ?? ''),
    order: Number(doc.frontmatter.order) || 0,
    published: doc.frontmatter.published !== false,
    type: (String(doc.frontmatter.type ?? 'mdx') as 'mdx' | 'pdf'),
    fileUrl: doc.frontmatter.fileUrl as string | undefined,
    metadata: { readingTime: readingTime(doc.body) },
    content: doc.body,
  }))
}

export async function getHackathons(): Promise<HackathonData[]> {
  const docs = await listContent('hackathons')
  return docs.map((doc) => ({
    title: String(doc.frontmatter.title ?? ''),
    slug: doc.slug,
    position: String(doc.frontmatter.position ?? ''),
    category: String(doc.frontmatter.category ?? 'Regional'),
    teamSize: Number(doc.frontmatter.teamSize) || 1,
    projectName: String(doc.frontmatter.projectName ?? ''),
    technologies: Array.isArray(doc.frontmatter.technologies) ? (doc.frontmatter.technologies as string[]) : [],
    date: String(doc.frontmatter.date ?? ''),
    prize: doc.frontmatter.prize as string | undefined,
    content: doc.body,
  }))
}

export async function getInternships(): Promise<InternshipData[]> {
  const docs = await listContent('internships')
  return docs.map((doc) => ({
    title: String(doc.frontmatter.title ?? ''),
    slug: doc.slug,
    company: String(doc.frontmatter.company ?? ''),
    status: (String(doc.frontmatter.status ?? 'Completed') as InternshipData['status']),
    duration: String(doc.frontmatter.duration ?? ''),
    startDate: String(doc.frontmatter.startDate ?? ''),
    endDate: String(doc.frontmatter.endDate ?? ''),
    skills: Array.isArray(doc.frontmatter.skills) ? (doc.frontmatter.skills as string[]) : [],
    hours: Number(doc.frontmatter.hours) || 0,
    certificateUrl: doc.frontmatter.certificateUrl as string | undefined,
    content: doc.body,
  }))
}

export async function getLeadership(): Promise<LeadershipData[]> {
  const docs = await listContent('leadership')
  return docs.map((doc) => ({
    title: String(doc.frontmatter.title ?? ''),
    slug: doc.slug,
    organization: String(doc.frontmatter.organization ?? ''),
    role: String(doc.frontmatter.role ?? ''),
    startDate: String(doc.frontmatter.startDate ?? ''),
    endDate: doc.frontmatter.endDate as string | undefined,
    impact: String(doc.frontmatter.impact ?? ''),
    peopleImpacted: Number(doc.frontmatter.peopleImpacted) || 0,
    eventsConducted: Number(doc.frontmatter.eventsConducted) || 0,
    volunteersManaged: Number(doc.frontmatter.volunteersManaged) || 0,
    initiativeType: String(doc.frontmatter.initiativeType ?? ''),
    xp: Number(doc.frontmatter.xp) || 0,
    content: doc.body,
  }))
}

export async function getMedia(): Promise<MediaData[]> {
  const docs = await listContent('media')
  return docs.map((doc) => ({
    title: String(doc.frontmatter.title ?? ''),
    slug: doc.slug,
    type: String(doc.frontmatter.type ?? ''),
    publication: String(doc.frontmatter.publication ?? ''),
    date: String(doc.frontmatter.date ?? ''),
    url: doc.frontmatter.url as string | undefined,
    thumbnail: doc.frontmatter.thumbnail as string | undefined,
    description: String(doc.frontmatter.description ?? ''),
    content: doc.body,
  }))
}

export async function getCertificates(): Promise<CertificateData[]> {
  const docs = await listContent('certificates')
  return docs.map((doc) => ({
    title: String(doc.frontmatter.title ?? ''),
    slug: doc.slug,
    issuer: String(doc.frontmatter.issuer ?? ''),
    category: (String(doc.frontmatter.category ?? 'certification') as CertificateCategory),
    issueDate: String(doc.frontmatter.issueDate ?? doc.frontmatter.date ?? ''),
    skills: Array.isArray(doc.frontmatter.skills) ? (doc.frontmatter.skills as string[]) : [],
    hours: doc.frontmatter.hours ? Number(doc.frontmatter.hours) : undefined,
    credentialId: doc.frontmatter.credentialId as string | undefined,
    verificationUrl: doc.frontmatter.verificationUrl 
      ? String(doc.frontmatter.verificationUrl)
      : undefined,
    certificatePdfUrl: doc.frontmatter.certificatePdfUrl 
      ? normalizePdfUrl(String(doc.frontmatter.certificatePdfUrl))
      : undefined,
    thumbnailUrl: doc.frontmatter.thumbnailUrl as string | undefined,
    featured: doc.frontmatter.featured === true,
    published: doc.frontmatter.published !== false,
    content: doc.body,
  }))
}
