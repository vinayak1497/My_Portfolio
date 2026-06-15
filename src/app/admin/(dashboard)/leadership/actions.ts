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

export async function createLeadership(_prev: unknown, formData: FormData) {
  await requireAuth()

  const title = formData.get('title') as string
  const rawSlug = formData.get('slug') as string
  const organization = formData.get('organization') as string
  const role = formData.get('role') as string
  const startDate = formData.get('startDate') as string
  const endDate = formData.get('endDate') as string
  const impact = formData.get('impact') as string
  const peopleImpacted = formData.get('peopleImpacted') as string
  const eventsConducted = formData.get('eventsConducted') as string
  const volunteersManaged = formData.get('volunteersManaged') as string
  const initiativeType = formData.get('initiativeType') as string
  const xp = formData.get('xp') as string
  const body = formData.get('body') as string

  if (!title || !organization) {
    return { error: 'Title and organization are required' }
  }

  const slug = sanitizeSlug(rawSlug || title)

  const existing = await getContentBySlug('leadership', slug)
  if (existing) {
    return { error: 'A leadership entry with this slug already exists' }
  }

  const frontmatter: Record<string, unknown> = {
    title,
    slug,
    organization,
    startDate: startDate || '',
  }

  if (role) frontmatter.role = role
  if (endDate) frontmatter.endDate = endDate
  if (impact) frontmatter.impact = impact
  if (peopleImpacted) frontmatter.peopleImpacted = Number(peopleImpacted)
  if (eventsConducted) frontmatter.eventsConducted = Number(eventsConducted)
  if (volunteersManaged) frontmatter.volunteersManaged = Number(volunteersManaged)
  if (initiativeType) frontmatter.initiativeType = initiativeType
  if (xp) frontmatter.xp = Number(xp)

  await saveContent('leadership', slug, frontmatter, body || `# ${title}`)

  revalidatePath('/admin/leadership')
  revalidatePath('/badges')
  revalidatePath('/', 'layout')
  redirect('/admin/leadership')
}

export async function updateLeadership(_prev: unknown, formData: FormData) {
  await requireAuth()

  const originalSlug = formData.get('originalSlug') as string
  const title = formData.get('title') as string
  const rawSlug = formData.get('slug') as string
  const organization = formData.get('organization') as string
  const role = formData.get('role') as string
  const startDate = formData.get('startDate') as string
  const endDate = formData.get('endDate') as string
  const impact = formData.get('impact') as string
  const peopleImpacted = formData.get('peopleImpacted') as string
  const eventsConducted = formData.get('eventsConducted') as string
  const volunteersManaged = formData.get('volunteersManaged') as string
  const initiativeType = formData.get('initiativeType') as string
  const xp = formData.get('xp') as string
  const body = formData.get('body') as string

  if (!title || !organization) {
    return { error: 'Title and organization are required' }
  }

  const slug = sanitizeSlug(rawSlug || title)

  const frontmatter: Record<string, unknown> = {
    title,
    slug,
    organization,
    startDate: startDate || '',
  }

  if (role) frontmatter.role = role
  if (endDate) frontmatter.endDate = endDate
  if (impact) frontmatter.impact = impact
  if (peopleImpacted) frontmatter.peopleImpacted = Number(peopleImpacted)
  if (eventsConducted) frontmatter.eventsConducted = Number(eventsConducted)
  if (volunteersManaged) frontmatter.volunteersManaged = Number(volunteersManaged)
  if (initiativeType) frontmatter.initiativeType = initiativeType
  if (xp) frontmatter.xp = Number(xp)

  await updateContent('leadership', originalSlug, frontmatter, body || `# ${title}`)

  revalidatePath('/admin/leadership')
  revalidatePath('/admin/leadership/[slug]/edit')
  revalidatePath('/badges')
  revalidatePath('/', 'layout')
  redirect('/admin/leadership')
}

export async function deleteLeadership(slug: string) {
  'use server'
  await requireAuth()
  await deleteContent('leadership', slug)
  revalidatePath('/admin/leadership')
  revalidatePath('/badges')
  revalidatePath('/', 'layout')
}
