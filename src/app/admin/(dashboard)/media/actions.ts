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

export async function createMedia(_prev: unknown, formData: FormData) {
  await requireAuth()

  const title = formData.get('title') as string
  const rawSlug = formData.get('slug') as string
  const type = formData.get('type') as string
  const publication = formData.get('publication') as string
  const date = formData.get('date') as string
  const url = formData.get('url') as string
  const thumbnail = formData.get('thumbnail') as string
  const description = formData.get('description') as string
  const body = formData.get('body') as string

  if (!title || !publication || !type) {
    return { error: 'Title, type, and publication are required' }
  }

  const slug = sanitizeSlug(rawSlug || title)

  const existing = await getContentBySlug('media', slug)
  if (existing) {
    return { error: 'A media entry with this slug already exists' }
  }

  const frontmatter: Record<string, unknown> = {
    title,
    slug,
    type,
    publication,
    date: date || new Date().toISOString().split('T')[0],
  }

  if (url) frontmatter.url = url
  if (thumbnail) frontmatter.thumbnail = thumbnail
  if (description) frontmatter.description = description

  await saveContent('media', slug, frontmatter, body || `# ${title}`)

  revalidatePath('/admin/media')
  revalidatePath('/', 'layout')
  redirect('/admin/media')
}

export async function updateMedia(_prev: unknown, formData: FormData) {
  await requireAuth()

  const originalSlug = formData.get('originalSlug') as string
  const title = formData.get('title') as string
  const rawSlug = formData.get('slug') as string
  const type = formData.get('type') as string
  const publication = formData.get('publication') as string
  const date = formData.get('date') as string
  const url = formData.get('url') as string
  const thumbnail = formData.get('thumbnail') as string
  const description = formData.get('description') as string
  const body = formData.get('body') as string

  if (!title || !publication || !type) {
    return { error: 'Title, type, and publication are required' }
  }

  const slug = sanitizeSlug(rawSlug || title)

  const frontmatter: Record<string, unknown> = {
    title,
    slug,
    type,
    publication,
    date: date || new Date().toISOString().split('T')[0],
  }

  if (url) frontmatter.url = url
  if (thumbnail) frontmatter.thumbnail = thumbnail
  if (description) frontmatter.description = description

  await updateContent('media', originalSlug, frontmatter, body || `# ${title}`)

  revalidatePath('/admin/media')
  revalidatePath('/admin/media/[slug]/edit')
  revalidatePath('/', 'layout')
  redirect('/admin/media')
}

export async function deleteMedia(slug: string) {
  'use server'
  await requireAuth()
  await deleteContent('media', slug)
  revalidatePath('/admin/media')
  revalidatePath('/', 'layout')
}
