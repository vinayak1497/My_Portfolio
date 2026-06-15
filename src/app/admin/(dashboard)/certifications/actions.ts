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

export async function createCertification(_prev: unknown, formData: FormData) {
  await requireAuth()

  const title = formData.get('title') as string
  const rawSlug = formData.get('slug') as string
  const issuer = formData.get('issuer') as string
  const rarity = formData.get('rarity') as string
  const date = formData.get('date') as string
  const category = formData.get('category') as string
  const skillsRaw = formData.get('skills') as string
  const hours = formData.get('hours') as string
  const credentialId = formData.get('credentialId') as string
  const credentialUrl = formData.get('credentialUrl') as string
  const pdfUrl = formData.get('pdfUrl') as string
  const imageUrl = formData.get('imageUrl') as string
  const body = formData.get('body') as string

  if (!title || !issuer || !rarity) {
    return { error: 'Title, issuer, and rarity are required' }
  }

  const slug = sanitizeSlug(rawSlug || title)

  const existing = await getContentBySlug('certifications', slug)
  if (existing) {
    return { error: 'A certification with this slug already exists' }
  }

  const skills = skillsRaw
    ? skillsRaw.split(',').map((s: string) => s.trim()).filter(Boolean)
    : []

  const frontmatter: Record<string, unknown> = {
    title,
    slug,
    issuer,
    rarity,
    date: date || new Date().toISOString().split('T')[0],
    category: category || 'certification',
    skills,
  }

  if (hours) frontmatter.hours = Number(hours)
  if (credentialId) frontmatter.credentialId = credentialId
  if (credentialUrl) frontmatter.credentialUrl = credentialUrl
  if (pdfUrl) frontmatter.pdfUrl = pdfUrl
  if (imageUrl) frontmatter.imageUrl = imageUrl

  await saveContent('certifications', slug, frontmatter, body || `# ${title}`)

  revalidatePath('/admin/certifications')
  revalidatePath('/badges')
  revalidatePath('/', 'layout')
  redirect('/admin/certifications')
}

export async function updateCertification(_prev: unknown, formData: FormData) {
  await requireAuth()

  const originalSlug = formData.get('originalSlug') as string
  const title = formData.get('title') as string
  const rawSlug = formData.get('slug') as string
  const issuer = formData.get('issuer') as string
  const rarity = formData.get('rarity') as string
  const date = formData.get('date') as string
  const category = formData.get('category') as string
  const skillsRaw = formData.get('skills') as string
  const hours = formData.get('hours') as string
  const credentialId = formData.get('credentialId') as string
  const credentialUrl = formData.get('credentialUrl') as string
  const pdfUrl = formData.get('pdfUrl') as string
  const imageUrl = formData.get('imageUrl') as string
  const body = formData.get('body') as string

  if (!title || !issuer || !rarity) {
    return { error: 'Title, issuer, and rarity are required' }
  }

  const slug = sanitizeSlug(rawSlug || title)

  const skills = skillsRaw
    ? skillsRaw.split(',').map((s: string) => s.trim()).filter(Boolean)
    : []

  // Build frontmatter by merging form data over existing fields
  const existing = await getContentBySlug('certifications', originalSlug)
  const frontmatter: Record<string, unknown> = { ...(existing?.frontmatter || {}) }

  // Override with form fields (always present in the form)
  frontmatter.title = title
  frontmatter.slug = slug
  frontmatter.issuer = issuer
  frontmatter.rarity = rarity
  frontmatter.date = date || new Date().toISOString().split('T')[0]
  frontmatter.category = category || 'certification'
  frontmatter.skills = skills
  frontmatter.hours = hours ? Number(hours) : (frontmatter.hours || undefined)
  frontmatter.credentialId = credentialId || frontmatter.credentialId || undefined
  frontmatter.credentialUrl = credentialUrl || frontmatter.credentialUrl || undefined
  frontmatter.pdfUrl = pdfUrl || frontmatter.pdfUrl || undefined
  frontmatter.imageUrl = imageUrl || frontmatter.imageUrl || undefined

  // Explicitly remove fields that were cleared (submitted as empty string while previously set)
  if (credentialUrl === '') frontmatter.credentialUrl = undefined
  if (pdfUrl === '') frontmatter.pdfUrl = undefined
  if (imageUrl === '') frontmatter.imageUrl = undefined
  if (credentialId === '') frontmatter.credentialId = undefined
  if (hours === '') frontmatter.hours = undefined

  await updateContent('certifications', originalSlug, frontmatter, body || `# ${title}`)

  revalidatePath('/admin/certifications')
  revalidatePath('/admin/certifications/[slug]/edit')
  revalidatePath('/badges')
  revalidatePath('/', 'layout')
  redirect('/admin/certifications')
}

export async function deleteCertification(slug: string) {
  'use server'
  await requireAuth()
  await deleteContent('certifications', slug)
  revalidatePath('/admin/certifications')
  revalidatePath('/badges')
  revalidatePath('/', 'layout')
}
