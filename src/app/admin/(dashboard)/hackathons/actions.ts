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

export async function createHackathon(_prev: unknown, formData: FormData) {
  await requireAuth()

  const title = formData.get('title') as string
  const rawSlug = formData.get('slug') as string
  const position = formData.get('position') as string
  const category = formData.get('category') as string
  const teamSize = formData.get('teamSize') as string
  const projectName = formData.get('projectName') as string
  const technologiesRaw = formData.get('technologies') as string
  const date = formData.get('date') as string
  const prize = formData.get('prize') as string
  const body = formData.get('body') as string

  if (!title || !position || !category) {
    return { error: 'Title, position, and category are required' }
  }

  const slug = sanitizeSlug(rawSlug || title)

  const existing = await getContentBySlug('hackathons', slug)
  if (existing) {
    return { error: 'A hackathon with this slug already exists' }
  }

  const technologies = technologiesRaw
    ? technologiesRaw.split(',').map((s: string) => s.trim()).filter(Boolean)
    : []

  const frontmatter: Record<string, unknown> = {
    title,
    slug,
    position,
    category,
    date: date || new Date().toISOString().split('T')[0],
    technologies,
  }

  if (teamSize) frontmatter.teamSize = Number(teamSize)
  if (projectName) frontmatter.projectName = projectName
  if (prize) frontmatter.prize = prize

  await saveContent('hackathons', slug, frontmatter, body || `# ${title}`)

  revalidatePath('/admin/hackathons')
  revalidatePath('/badges')
  revalidatePath('/', 'layout')
  redirect('/admin/hackathons')
}

export async function updateHackathon(_prev: unknown, formData: FormData) {
  await requireAuth()

  const originalSlug = formData.get('originalSlug') as string
  const title = formData.get('title') as string
  const rawSlug = formData.get('slug') as string
  const position = formData.get('position') as string
  const category = formData.get('category') as string
  const teamSize = formData.get('teamSize') as string
  const projectName = formData.get('projectName') as string
  const technologiesRaw = formData.get('technologies') as string
  const date = formData.get('date') as string
  const prize = formData.get('prize') as string
  const body = formData.get('body') as string

  if (!title || !position || !category) {
    return { error: 'Title, position, and category are required' }
  }

  const slug = sanitizeSlug(rawSlug || title)

  const technologies = technologiesRaw
    ? technologiesRaw.split(',').map((s: string) => s.trim()).filter(Boolean)
    : []

  const frontmatter: Record<string, unknown> = {
    title,
    slug,
    position,
    category,
    date: date || new Date().toISOString().split('T')[0],
    technologies,
  }

  if (teamSize) frontmatter.teamSize = Number(teamSize)
  if (projectName) frontmatter.projectName = projectName
  if (prize) frontmatter.prize = prize

  await updateContent('hackathons', originalSlug, frontmatter, body || `# ${title}`)

  revalidatePath('/admin/hackathons')
  revalidatePath('/admin/hackathons/[slug]/edit')
  revalidatePath('/badges')
  revalidatePath('/', 'layout')
  redirect('/admin/hackathons')
}

export async function deleteHackathon(slug: string) {
  'use server'
  await requireAuth()
  await deleteContent('hackathons', slug)
  revalidatePath('/admin/hackathons')
  revalidatePath('/badges')
  revalidatePath('/', 'layout')
}
