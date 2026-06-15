'use server'

import { requireAuth } from '@/lib/auth'
import { saveContent, deleteContent, updateContent, getContentBySlug } from '@/lib/content-manager'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function sanitizeSlug(slug: string): string {
  return slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

export async function createBlog(_prev: unknown, formData: FormData) {
  await requireAuth()
  const title = formData.get('title') as string
  const rawSlug = formData.get('slug') as string
  const description = formData.get('description') as string
  const tagsRaw = formData.get('tags') as string
  const published = formData.get('published') === 'on'
  const date = formData.get('date') as string
  const body = formData.get('body') as string
  if (!title) return { error: 'Title is required' }

  const slug = sanitizeSlug(rawSlug || title)
  const existing = await getContentBySlug('blogs', slug)
  if (existing) return { error: 'A blog with this slug already exists' }

  const frontmatter: Record<string, unknown> = {
    title, slug,
    description: description || '',
    date: date || new Date().toISOString().split('T')[0],
    tags: tagsRaw ? tagsRaw.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
    published,
  }

  await saveContent('blogs', slug, frontmatter, body || `# ${title}`)
  revalidatePath('/admin/blogs')
  revalidatePath('/blogs')
  revalidatePath('/', 'layout')
  redirect('/admin/blogs')
}

export async function updateBlog(_prev: unknown, formData: FormData) {
  await requireAuth()
  const originalSlug = formData.get('originalSlug') as string
  const title = formData.get('title') as string
  const rawSlug = formData.get('slug') as string
  const description = formData.get('description') as string
  const tagsRaw = formData.get('tags') as string
  const published = formData.get('published') === 'on'
  const date = formData.get('date') as string
  const body = formData.get('body') as string
  if (!title) return { error: 'Title is required' }

  const slug = sanitizeSlug(rawSlug || title)
  const frontmatter: Record<string, unknown> = {
    title, slug,
    description: description || '',
    date: date || new Date().toISOString().split('T')[0],
    tags: tagsRaw ? tagsRaw.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
    published,
  }

  await updateContent('blogs', originalSlug, frontmatter, body || `# ${title}`)
  revalidatePath('/admin/blogs')
  revalidatePath('/blogs')
  revalidatePath('/', 'layout')
  redirect('/admin/blogs')
}

export async function deleteBlog(slug: string) {
  'use server'
  await requireAuth()
  await deleteContent('blogs', slug)
  revalidatePath('/admin/blogs')
  revalidatePath('/blogs')
  revalidatePath('/', 'layout')
}
