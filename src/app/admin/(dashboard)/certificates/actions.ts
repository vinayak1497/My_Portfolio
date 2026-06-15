'use server'

import { requireAuth } from '@/lib/auth'
import { saveContent, deleteContent, updateContent, getContentBySlug } from '@/lib/content-manager'
import { deleteFromCloudinary } from '@/lib/cloudinary'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function sanitizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function extractIssuerFolder(issuer: string): string {
  return issuer
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function createCertificate(_prev: unknown, formData: FormData) {
  await requireAuth()

  const title = formData.get('title') as string
  const rawSlug = formData.get('slug') as string
  const issuer = formData.get('issuer') as string
  const category = formData.get('category') as string
  const issueDate = formData.get('issueDate') as string
  const skillsRaw = formData.get('skills') as string
  const hours = formData.get('hours') as string
  const credentialId = formData.get('credentialId') as string
  const verificationUrl = formData.get('verificationUrl') as string
  const certificatePdfUrl = formData.get('certificatePdfUrl') as string
  const thumbnailUrl = formData.get('thumbnailUrl') as string
  const featured = formData.get('featured') === 'on'
  const published = formData.get('published') === 'on'
  const body = formData.get('body') as string

  if (!title || !issuer) {
    return { error: 'Title and issuer are required' }
  }

  const slug = sanitizeSlug(rawSlug || title)

  const existing = await getContentBySlug('certificates', slug)
  if (existing) {
    return { error: 'A certificate with this slug already exists' }
  }

  const skills = skillsRaw
    ? skillsRaw.split(',').map((s: string) => s.trim()).filter(Boolean)
    : []

  const issuerFolder = extractIssuerFolder(issuer)

  const frontmatter: Record<string, unknown> = {
    title,
    slug,
    issuer,
    category: category || 'certification',
    issueDate: issueDate || new Date().toISOString().split('T')[0],
    skills,
    featured,
    published,
  }

  if (hours) frontmatter.hours = Number(hours)
  if (credentialId) frontmatter.credentialId = credentialId
  if (verificationUrl) frontmatter.verificationUrl = verificationUrl
  if (certificatePdfUrl) frontmatter.certificatePdfUrl = certificatePdfUrl
  if (thumbnailUrl) frontmatter.thumbnailUrl = thumbnailUrl

  await saveContent('certificates', slug, frontmatter, body || `# ${title}`, issuerFolder)

  revalidatePath('/admin/certificates')
  revalidatePath('/badges')
  revalidatePath('/', 'layout')
  redirect('/admin/certificates')
}

export async function updateCertificate(_prev: unknown, formData: FormData) {
  await requireAuth()

  const originalSlug = formData.get('originalSlug') as string
  const title = formData.get('title') as string
  const rawSlug = formData.get('slug') as string
  const issuer = formData.get('issuer') as string
  const category = formData.get('category') as string
  const issueDate = formData.get('issueDate') as string
  const skillsRaw = formData.get('skills') as string
  const hours = formData.get('hours') as string
  const credentialId = formData.get('credentialId') as string
  const verificationUrl = formData.get('verificationUrl') as string
  const certificatePdfUrl = formData.get('certificatePdfUrl') as string
  const thumbnailUrl = formData.get('thumbnailUrl') as string
  const featured = formData.get('featured') === 'on'
  const published = formData.get('published') === 'on'
  const body = formData.get('body') as string

  if (!title || !issuer) {
    return { error: 'Title and issuer are required' }
  }

  const slug = sanitizeSlug(rawSlug || title)

  const skills = skillsRaw
    ? skillsRaw.split(',').map((s: string) => s.trim()).filter(Boolean)
    : []

  const issuerFolder = extractIssuerFolder(issuer)

  // Build frontmatter by merging form data over existing fields
  const existing = await getContentBySlug('certificates', originalSlug)
  const frontmatter: Record<string, unknown> = { ...(existing?.frontmatter || {}) }

  // Override with form fields
  frontmatter.title = title
  frontmatter.slug = slug
  frontmatter.issuer = issuer
  frontmatter.category = category || 'certification'
  frontmatter.issueDate = issueDate || new Date().toISOString().split('T')[0]
  frontmatter.skills = skills
  frontmatter.featured = featured
  frontmatter.published = published
  frontmatter.hours = hours ? Number(hours) : (frontmatter.hours || undefined)
  frontmatter.credentialId = credentialId || frontmatter.credentialId || undefined
  frontmatter.verificationUrl = verificationUrl || frontmatter.verificationUrl || undefined
  frontmatter.certificatePdfUrl = certificatePdfUrl || frontmatter.certificatePdfUrl || undefined
  frontmatter.thumbnailUrl = thumbnailUrl || frontmatter.thumbnailUrl || undefined

  // Explicitly remove fields that were cleared
  if (verificationUrl === '') frontmatter.verificationUrl = undefined
  if (certificatePdfUrl === '') frontmatter.certificatePdfUrl = undefined
  if (thumbnailUrl === '') frontmatter.thumbnailUrl = undefined
  if (credentialId === '') frontmatter.credentialId = undefined
  if (hours === '') frontmatter.hours = undefined

  await updateContent('certificates', originalSlug, frontmatter, body || `# ${title}`, issuerFolder)

  revalidatePath('/admin/certificates')
  revalidatePath('/admin/certificates/[slug]/edit')
  revalidatePath('/badges')
  revalidatePath('/', 'layout')
  redirect('/admin/certificates')
}

export async function deleteCertificate(slug: string) {
  'use server'
  await requireAuth()

  const existing = await getContentBySlug('certificates', slug)
  if (existing) {
    const pdfUrl = existing.frontmatter.certificatePdfUrl as string | undefined
    if (pdfUrl) {
      try {
        await deleteFromCloudinary(pdfUrl)
      } catch (e) {
        console.error('[DELETE CERTIFICATE] Failed to delete from Cloudinary:', e)
      }
    }
  }

  await deleteContent('certificates', slug)
  revalidatePath('/admin/certificates')
  revalidatePath('/badges')
  revalidatePath('/', 'layout')
}
