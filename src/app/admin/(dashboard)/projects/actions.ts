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

export async function createProject(_prev: unknown, formData: FormData) {
  await requireAuth()

  const title = formData.get('title') as string
  const rawSlug = formData.get('slug') as string
  const description = formData.get('description') as string
  const category = formData.get('category') as string
  const level = parseInt(formData.get('level') as string) || 50
  const techStackRaw = formData.get('techStack') as string
  const githubUrl = formData.get('githubUrl') as string
  const liveUrl = formData.get('liveUrl') as string
  const thumbnail = formData.get('thumbnail') as string
  const complexity = parseInt(formData.get('complexity') as string) || 50
  const impact = parseInt(formData.get('impact') as string) || 50
  const innovation = parseInt(formData.get('innovation') as string) || 50
  const featured = formData.get('featured') === 'on'
  const date = formData.get('date') as string
  const body = formData.get('body') as string

  if (!title || !description || !category) {
    return { error: 'Title, description, and category are required' }
  }

  const slug = sanitizeSlug(rawSlug || title)

  const existing = await getContentBySlug('projects', slug)
  if (existing) {
    return { error: 'A project with this slug already exists' }
  }

  const techStack = techStackRaw
    ? techStackRaw.split(',').map((t: string) => t.trim()).filter(Boolean)
    : []

  const frontmatter: Record<string, unknown> = {
    title,
    slug,
    description,
    category,
    level,
    techStack,
    featured,
    date: date || new Date().toISOString().split('T')[0],
  }

  if (githubUrl) frontmatter.githubUrl = githubUrl
  if (liveUrl) frontmatter.liveUrl = liveUrl
  if (thumbnail) frontmatter.thumbnail = thumbnail

  frontmatter.stats = {
    complexity,
    impact,
    innovation,
  }

  await saveContent('projects', slug, frontmatter, body || '# ' + title)

  revalidatePath('/admin/projects')
  revalidatePath('/projects')
  revalidatePath('/projects/[slug]')
  revalidatePath('/', 'layout')
  redirect('/admin/projects')
}

export async function updateProject(_prev: unknown, formData: FormData) {
  await requireAuth()

  const originalSlug = formData.get('originalSlug') as string
  const title = formData.get('title') as string
  const rawSlug = formData.get('slug') as string
  const description = formData.get('description') as string
  const category = formData.get('category') as string
  const level = parseInt(formData.get('level') as string) || 50
  const techStackRaw = formData.get('techStack') as string
  const githubUrl = formData.get('githubUrl') as string
  const liveUrl = formData.get('liveUrl') as string
  const thumbnail = formData.get('thumbnail') as string
  const complexity = parseInt(formData.get('complexity') as string) || 50
  const impact = parseInt(formData.get('impact') as string) || 50
  const innovation = parseInt(formData.get('innovation') as string) || 50
  const featured = formData.get('featured') === 'on'
  const date = formData.get('date') as string
  const body = formData.get('body') as string

  if (!title || !description || !category) {
    return { error: 'Title, description, and category are required' }
  }

  const slug = sanitizeSlug(rawSlug || title)

  const frontmatter: Record<string, unknown> = {
    title,
    slug,
    description,
    category,
    level,
    techStack: techStackRaw
      ? techStackRaw.split(',').map((t: string) => t.trim()).filter(Boolean)
      : [],
    featured,
    date: date || new Date().toISOString().split('T')[0],
  }

  if (githubUrl) frontmatter.githubUrl = githubUrl
  if (liveUrl) frontmatter.liveUrl = liveUrl
  if (thumbnail) frontmatter.thumbnail = thumbnail

  frontmatter.stats = {
    complexity,
    impact,
    innovation,
  }

  await updateContent('projects', originalSlug, frontmatter, body || '# ' + title)

  revalidatePath('/admin/projects')
  revalidatePath('/admin/projects/[slug]/edit')
  revalidatePath('/projects')
  revalidatePath('/projects/[slug]')
  revalidatePath('/', 'layout')
  redirect('/admin/projects')
}

export async function deleteProject(slug: string) {
  'use server'
  await requireAuth()
  await deleteContent('projects', slug)
  revalidatePath('/admin/projects')
  revalidatePath('/projects')
  revalidatePath('/', 'layout')
}
