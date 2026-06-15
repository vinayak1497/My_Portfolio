'use server'

import { requireAuth } from '@/lib/auth'
import { saveContent, deleteContent, updateContent, getContentBySlug } from '@/lib/content-manager'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function sanitizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function createInternship(_prev: unknown, formData: FormData) {
  await requireAuth()

  const title = formData.get('title') as string
  const rawSlug = formData.get('slug') as string
  const company = formData.get('company') as string
  const status = formData.get('status') as string
  const duration = formData.get('duration') as string
  const startDate = formData.get('startDate') as string
  const endDate = formData.get('endDate') as string
  const skillsRaw = formData.get('skills') as string
  const hours = formData.get('hours') as string
  const certificateUrl = formData.get('certificateUrl') as string
  const body = formData.get('body') as string

  if (!title || !company || !status) {
    return { error: 'Title, company, and status are required' }
  }

  const slug = sanitizeSlug(rawSlug || title)

  const existing = await getContentBySlug('internships', slug)
  if (existing) {
    return { error: 'An internship with this slug already exists' }
  }

  const skills = skillsRaw
    ? skillsRaw.split(',').map((s: string) => s.trim()).filter(Boolean)
    : []

  const frontmatter: Record<string, unknown> = {
    title,
    slug,
    company,
    status,
    startDate: startDate || '',
    skills,
  }

  if (duration) frontmatter.duration = duration
  if (endDate) frontmatter.endDate = endDate
  if (hours) frontmatter.hours = Number(hours)
  if (certificateUrl) frontmatter.certificateUrl = certificateUrl

  await saveContent('internships', slug, frontmatter, body || `# ${title} — ${company}`)

  revalidatePath('/admin/internships')
  revalidatePath('/', 'layout')
  redirect('/admin/internships')
}

export async function updateInternship(_prev: unknown, formData: FormData) {
  await requireAuth()

  const originalSlug = formData.get('originalSlug') as string
  const title = formData.get('title') as string
  const rawSlug = formData.get('slug') as string
  const company = formData.get('company') as string
  const status = formData.get('status') as string
  const duration = formData.get('duration') as string
  const startDate = formData.get('startDate') as string
  const endDate = formData.get('endDate') as string
  const skillsRaw = formData.get('skills') as string
  const hours = formData.get('hours') as string
  const certificateUrl = formData.get('certificateUrl') as string
  const body = formData.get('body') as string

  if (!title || !company || !status) {
    return { error: 'Title, company, and status are required' }
  }

  const slug = sanitizeSlug(rawSlug || title)

  const skills = skillsRaw
    ? skillsRaw.split(',').map((s: string) => s.trim()).filter(Boolean)
    : []

  const frontmatter: Record<string, unknown> = {
    title,
    slug,
    company,
    status,
    startDate: startDate || '',
    skills,
  }

  if (duration) frontmatter.duration = duration
  if (endDate) frontmatter.endDate = endDate
  if (hours) frontmatter.hours = Number(hours)
  if (certificateUrl) frontmatter.certificateUrl = certificateUrl

  await updateContent('internships', originalSlug, frontmatter, body || `# ${title} — ${company}`)

  revalidatePath('/admin/internships')
  revalidatePath('/admin/internships/[slug]/edit')
  revalidatePath('/', 'layout')
  redirect('/admin/internships')
}

export async function deleteInternship(slug: string) {
  'use server'
  await requireAuth()
  await deleteContent('internships', slug)
  revalidatePath('/admin/internships')
  revalidatePath('/', 'layout')
}
