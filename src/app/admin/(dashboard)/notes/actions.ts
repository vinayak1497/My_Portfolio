'use server'

import { requireAuth } from '@/lib/auth'
import { saveContent, deleteContent, updateContent, getContentBySlug } from '@/lib/content-manager'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function sanitizeSlug(slug: string): string {
  return slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

const subjectNames: Record<string, string> = {
  os: 'os', dbms: 'dbms', cn: 'cn', ai: 'ai', toc: 'toc', 'software-engineering': 'software-engineering',
}

export async function createNote(_prev: unknown, formData: FormData) {
  await requireAuth()
  const title = formData.get('title') as string
  const rawSlug = formData.get('slug') as string
  const subject = formData.get('subject') as string
  const description = formData.get('description') as string
  const order = parseInt(formData.get('order') as string) || 0
  const published = formData.get('published') === 'on'
  const body = formData.get('body') as string
  const type = formData.get('type') as string
  const fileUrl = formData.get('fileUrl') as string
  if (!title || !subject) return { error: 'Title and subject are required' }

  const slug = sanitizeSlug(rawSlug || title)
  const existing = await getContentBySlug('notes', slug)
  if (existing) return { error: 'A note with this slug already exists' }

  const subdir = subjectNames[subject] || subject
  const frontmatter: Record<string, unknown> = {
    title, slug, subject, description: description || '', order, published,
    type: type || 'mdx',
    ...(fileUrl ? { fileUrl } : {}),
  }
  await saveContent('notes', slug, frontmatter, body || `# ${title}`, subdir)
  revalidatePath('/admin/notes')
  revalidatePath('/pokedex')
  revalidatePath('/', 'layout')
  redirect('/admin/notes')
}

export async function updateNote(_prev: unknown, formData: FormData) {
  await requireAuth()
  const originalSlug = formData.get('originalSlug') as string
  const title = formData.get('title') as string
  const rawSlug = formData.get('slug') as string
  const subject = formData.get('subject') as string
  const description = formData.get('description') as string
  const order = parseInt(formData.get('order') as string) || 0
  const published = formData.get('published') === 'on'
  const body = formData.get('body') as string
  const type = formData.get('type') as string
  const fileUrl = formData.get('fileUrl') as string
  if (!title || !subject) return { error: 'Title and subject are required' }

  const slug = sanitizeSlug(rawSlug || title)
  const subdir = subjectNames[subject] || subject
  const frontmatter: Record<string, unknown> = {
    title, slug, subject, description: description || '', order, published,
    type: type || 'mdx',
    ...(fileUrl ? { fileUrl } : {}),
  }
  await updateContent('notes', originalSlug, frontmatter, body || `# ${title}`, subdir)
  revalidatePath('/admin/notes')
  revalidatePath('/pokedex')
  revalidatePath('/', 'layout')
  redirect('/admin/notes')
}

export async function deleteNote(slug: string) {
  'use server'
  await requireAuth()
  await deleteContent('notes', slug)
  revalidatePath('/admin/notes')
  revalidatePath('/pokedex')
  revalidatePath('/', 'layout')
}
