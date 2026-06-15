import fs from 'fs/promises'
import path from 'path'
import yaml from 'js-yaml'

const CONTENT_ROOT = path.join(process.cwd(), 'content')

export interface MdxDocument {
  frontmatter: Record<string, unknown>
  body: string
  slug: string
  filePath: string
}

function normalizeDates(value: unknown): unknown {
  if (value instanceof Date) {
    return value.toISOString().split('T')[0]
  }
  if (Array.isArray(value)) {
    return value.map(normalizeDates)
  }
  if (value && typeof value === 'object') {
    const obj: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      obj[k] = normalizeDates(v)
    }
    return obj
  }
  return value
}

function parseMdxFile(content: string): { frontmatter: Record<string, unknown>; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n\n?([\s\S]*)$/)
  if (!match) {
    return { frontmatter: {}, body: content }
  }

  const frontmatter = normalizeDates(yaml.load(match[1])) as Record<string, unknown>
  return { frontmatter, body: match[2].trimStart() }
}

function generateMdxFile(frontmatter: Record<string, unknown>, body: string): string {
  const yamlStr = yaml.dump(frontmatter, {
    indent: 2,
    lineWidth: -1,
    quotingType: '"',
    forceQuotes: true,
    noRefs: true,
    sortKeys: false,
  })
  return `---\n${yamlStr}---\n\n${body.trim()}\n`
}

export function getContentDir(collection: string): string {
  const dirMap: Record<string, string> = {
    projects: 'projects',
    certifications: 'certifications',
    blogs: 'blogs',
    notes: 'notes',
    hackathons: 'hackathons',
    internships: 'internships',
    leadership: 'leadership',
    media: 'media',
    certificates: 'certificates',
  }
  return path.join(CONTENT_ROOT, dirMap[collection] || collection)
}

export async function listContent(collection: string): Promise<MdxDocument[]> {
  const dir = getContentDir(collection)

  try {
    await fs.access(dir)
  } catch {
    return []
  }

  const entries: MdxDocument[] = []

  async function walkDir(currentDir: string) {
    const items = await fs.readdir(currentDir, { withFileTypes: true })
    for (const item of items) {
      const fullPath = path.join(currentDir, item.name)
      if (item.isDirectory()) {
        await walkDir(fullPath)
      } else if (item.name.endsWith('.mdx')) {
        const content = await fs.readFile(fullPath, 'utf-8')
        const { frontmatter, body } = parseMdxFile(content)
        const slug = (frontmatter.slug as string) || item.name.replace('.mdx', '')
        entries.push({ frontmatter, body, slug, filePath: fullPath })
      }
    }
  }

  await walkDir(dir)
  return entries.sort((a, b) => {
    const dateA = String(a.frontmatter.date ?? '')
    const dateB = String(b.frontmatter.date ?? '')
    if (dateA && dateB) return dateB.localeCompare(dateA)
    return 0
  })
}

export async function getContentBySlug(
  collection: string,
  slug: string
): Promise<MdxDocument | null> {
  const dir = getContentDir(collection)

  async function searchDir(currentDir: string): Promise<MdxDocument | null> {
    const items = await fs.readdir(currentDir, { withFileTypes: true })
    for (const item of items) {
      const fullPath = path.join(currentDir, item.name)
      if (item.isDirectory()) {
        const result = await searchDir(fullPath)
        if (result) return result
      } else if (item.name.endsWith('.mdx')) {
        const content = await fs.readFile(fullPath, 'utf-8')
        const { frontmatter, body } = parseMdxFile(content)
        if (frontmatter.slug === slug) {
          return { frontmatter, body, slug, filePath: fullPath }
        }
      }
    }
    return null
  }

  try {
    await fs.access(dir)
    return await searchDir(dir)
  } catch {
    return null
  }
}

export async function saveContent(
  collection: string,
  slug: string,
  frontmatter: Record<string, unknown>,
  body: string,
  subdir?: string
): Promise<void> {
  const dir = getContentDir(collection)
  const targetDir = subdir ? path.join(dir, subdir) : dir

  await fs.mkdir(targetDir, { recursive: true })

  const filePath = path.join(targetDir, `${slug}.mdx`)
  const content = generateMdxFile(frontmatter, body)
  await fs.writeFile(filePath, content, 'utf-8')
}

export async function deleteContent(collection: string, slug: string): Promise<boolean> {
  const existing = await getContentBySlug(collection, slug)
  if (!existing) return false

  await fs.unlink(existing.filePath)

  const parentDir = path.dirname(existing.filePath)
  if (parentDir !== getContentDir(collection)) {
    const remaining = await fs.readdir(parentDir)
    if (remaining.length === 0) {
      await fs.rmdir(parentDir).catch(() => {})
    }
  }

  return true
}

export async function updateContent(
  collection: string,
  slug: string,
  frontmatter: Record<string, unknown>,
  body: string,
  subdir?: string
): Promise<void> {
  const existing = await getContentBySlug(collection, slug)

  if (existing) {
    const parentDir = path.dirname(existing.filePath)
    const collectionDir = getContentDir(collection)

    if (parentDir === collectionDir || !subdir) {
      await fs.unlink(existing.filePath)
    } else {
      await fs.unlink(existing.filePath)
      const remaining = await fs.readdir(parentDir).catch(() => [])
      if (remaining.length === 0) {
        await fs.rmdir(parentDir).catch(() => {})
      }
    }
  }

  await saveContent(collection, slug, frontmatter, body, subdir)
}
