import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import yaml from 'js-yaml'
import { supabaseAdmin } from '@/lib/supabase'

const CONTENT_ROOT = path.join(process.cwd(), 'content')

const COLLECTIONS = [
  'projects', 'certifications', 'blogs', 'notes',
  'hackathons', 'internships', 'leadership', 'media',
  'certificates', 'missions',
] as const

const TABLE_MAP: Record<string, string> = {
  projects: 'projects',
  certifications: 'certifications',
  blogs: 'blogs',
  notes: 'notes',
  hackathons: 'hackathons',
  internships: 'internships',
  leadership: 'leadership',
  media: 'media',
  certificates: 'certificates',
  missions: 'missions',
}

/** Maps frontmatter keys to DB column names */
const FM_TO_COL: Record<string, string> = {
  techStack: 'tech_stack',
  liveUrl: 'live_url',
  githubUrl: 'github_url',
  credentialId: 'credential_id',
  credentialUrl: 'credential_url',
  pdfUrl: 'pdf_url',
  imageUrl: 'image_url',
  issueDate: 'issue_date',
  verificationUrl: 'verification_url',
  certificatePdfUrl: 'certificate_pdf_url',
  thumbnailUrl: 'thumbnail_url',
  projectName: 'project_name',
  teamSize: 'team_size',
  startDate: 'start_date',
  endDate: 'end_date',
  certificateUrl: 'certificate_url',
  peopleImpacted: 'people_impacted',
  eventsConducted: 'events_conducted',
  volunteersManaged: 'volunteers_managed',
  initiativeType: 'initiative_type',
  fileUrl: 'file_url',
}

const JSONB_ARRAYS = new Set(['tech_stack', 'skills', 'tags', 'technologies'])

function normalizeDates(value: unknown): unknown {
  if (value instanceof Date) return value.toISOString().split('T')[0]
  if (Array.isArray(value)) return value.map(normalizeDates)
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
  if (!match) return { frontmatter: {}, body: content }
  const frontmatter = normalizeDates(yaml.load(match[1])) as Record<string, unknown>
  return { frontmatter, body: match[2].trimStart() }
}

function fmToDbRow(fm: Record<string, unknown>, body: string): Record<string, unknown> {
  const row: Record<string, unknown> = { content: body || '' }
  for (const [key, value] of Object.entries(fm)) {
    if (['id', 'content', 'body', 'created_at', 'updated_at', 'metadata'].includes(key)) continue
    if (key === 'stats' && value && typeof value === 'object') { row.stats = value; continue }
    const col = FM_TO_COL[key] || key
    if (JSONB_ARRAYS.has(col) && Array.isArray(value)) {
      row[col] = value
    } else {
      row[col] = value === undefined ? null : value
    }
  }
  return row
}

async function migrateCollection(collection: string, log: (msg: string) => void) {
  const table = TABLE_MAP[collection]
  const dir = path.join(CONTENT_ROOT, collection)

  let filesMigrated = 0
  const errors: string[] = []

  try {
    await fs.access(dir)
  } catch {
    log(`SKIP ${collection}: directory not found`)
    return { filesMigrated: 0, errors: [] }
  }

  async function walkDir(currentDir: string) {
    const items = await fs.readdir(currentDir, { withFileTypes: true })
    for (const item of items) {
      const fullPath = path.join(currentDir, item.name)
      if (item.isDirectory()) {
        await walkDir(fullPath)
      } else if (item.name.endsWith('.mdx')) {
        try {
          const content = await fs.readFile(fullPath, 'utf-8')
          const { frontmatter, body } = parseMdxFile(content)
          const slug = String(frontmatter.slug || item.name.replace('.mdx', ''))

          // Check if row already exists (idempotent)
          const { data: existing } = await supabaseAdmin
            .from(table)
            .select('id')
            .eq('slug', slug)
            .maybeSingle()

          if (existing) {
            log(`SKIP ${collection}/${slug}: already exists`)
            continue
          }

          const row = fmToDbRow(frontmatter, body)
          const payload: Record<string, unknown> = {
            slug,
            title: String(frontmatter.title || slug),
            ...row,
          }

          const { error } = await supabaseAdmin
            .from(table)
            .insert(payload)

          if (error) {
            errors.push(`${collection}/${slug}: ${error.message}`)
          } else {
            filesMigrated++
            log(`OK ${collection}/${slug}`)
          }
        } catch (e) {
          errors.push(`${collection}/${item.name}: ${e instanceof Error ? e.message : 'Unknown error'}`)
        }
      }
    }
  }

  await walkDir(dir)
  return { filesMigrated, errors }
}

export async function GET() {
  const adminSession = await checkAdminSession()
  if (!adminSession) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results: Record<string, { migrated: number; errors: string[] }> = {}
  let totalMigrated = 0
  let totalErrors = 0
  const logs: string[] = []

  function log(msg: string) {
    logs.push(msg)
  }

  for (const collection of COLLECTIONS) {
    const result = await migrateCollection(collection, log)
    results[collection] = { migrated: result.filesMigrated, errors: result.errors }
    totalMigrated += result.filesMigrated
    totalErrors += result.errors.length
  }

  return NextResponse.json({
    success: true,
    totalMigrated,
    totalErrors,
    collections: results,
    logs,
  })
}

async function checkAdminSession() {
  try {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')
    return session?.value === 'authenticated'
  } catch {
    return false
  }
}
