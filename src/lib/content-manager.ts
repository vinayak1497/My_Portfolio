import { supabaseAdmin } from './supabase'

// ============================================
// TYPES — preserving MdxDocument for backward compat
// ============================================

/**
 * Legacy type expected by all admin forms.
 * frontmatter = camelCase properties from MDX frontmatter
 * body = MDX content string
 * slug = URL-friendly identifier
 */
export interface MdxDocument {
  frontmatter: Record<string, unknown>
  body: string
  slug: string
  filePath: string
}

// ============================================
// COLLECTION TABLE MAP
// ============================================

const COLLECTION_TABLES: Record<string, string> = {
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

// Maps frontmatter camelCase keys to database snake_case columns
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

// Reverse map: snake_case db column -> camelCase frontmatter key
const COL_TO_FM: Record<string, string> = {}
for (const [k, v] of Object.entries(FM_TO_COL)) COL_TO_FM[v] = k

const JSONB_ARRAYS = new Set(['tech_stack', 'skills', 'tags', 'technologies'])

const EXCLUDE_FM = new Set([
  'id', 'content', 'body', 'slug', 'title',
  'created_at', 'updated_at', 'metadata',
])

const EXCLUDE_DB = new Set([
  'id', 'content', 'created_at', 'updated_at',
])

// ============================================
// HELPERS
// ============================================

function getTable(collection: string): string {
  const table = COLLECTION_TABLES[collection]
  if (!table) throw new Error(`Unknown collection: ${collection}`)
  return table
}

function fmToRow(fm: Record<string, unknown>): Record<string, unknown> {
  const row: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(fm)) {
    if (EXCLUDE_FM.has(key)) continue
    if (key === 'stats' && value && typeof value === 'object') {
      row.stats = value; continue
    }
    const col = FM_TO_COL[key] || key
    if (JSONB_ARRAYS.has(col) && Array.isArray(value)) {
      row[col] = value
    } else if (JSONB_ARRAYS.has(col) && typeof value === 'string') {
      row[col] = (value as string).split(',').map(s => s.trim()).filter(Boolean)
    } else {
      row[col] = value === undefined ? null : value
    }
  }
  return row
}

function serializeValue(value: unknown): unknown {
  if (value instanceof Date) return value.toISOString().split('T')[0]
  return value === null ? undefined : value
}

function rowToFm(row: Record<string, unknown>): Record<string, unknown> {
  const fm: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(row)) {
    if (EXCLUDE_DB.has(key)) continue
    const fmKey = COL_TO_FM[key] || key
    fm[fmKey] = serializeValue(value)
  }
  return fm
}

function rowToMdxDocument(row: Record<string, unknown>): MdxDocument {
  return {
    slug: String(row.slug),
    body: String(row.content || ''),
    frontmatter: rowToFm(row),
    filePath: `supabase://${row.slug}`,
  }
}

// ============================================
// PUBLIC API — same signatures as original content-manager
// ============================================

export async function listContent(collection: string): Promise<MdxDocument[]> {
  const table = getTable(collection)
  const isNotes = collection === 'notes'

  const query = supabaseAdmin.from(table).select('*')

  if (isNotes) {
    query.order('order', { ascending: true })
  } else {
    query.order('date', { ascending: false })
  }
  query.order('created_at', { ascending: false })

  const { data, error } = await query

  if (error) {
    console.error(`[listContent] ${collection}:`, error.message)
    return []
  }

  return (data || []).map(rowToMdxDocument)
}

export async function getContentBySlug(
  collection: string,
  slug: string
): Promise<MdxDocument | null> {
  const table = getTable(collection)

  const { data, error } = await supabaseAdmin
    .from(table)
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error || !data) return null
  return rowToMdxDocument(data)
}

export async function saveContent(
  collection: string,
  slug: string,
  frontmatter: Record<string, unknown>,
  body: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _subdir?: string
): Promise<void> {
  const table = getTable(collection)
  const row = fmToRow(frontmatter)

  const payload: Record<string, unknown> = {
    slug,
    title: String(frontmatter.title || slug),
    ...row,
    content: body || '',
  }

  const { error } = await supabaseAdmin
    .from(table)
    .insert(payload)

  if (error) {
    console.error(`[saveContent] ${collection}/${slug}:`, error.message)
    throw new Error(error.message)
  }
}

export async function updateContent(
  collection: string,
  slug: string,
  frontmatter: Record<string, unknown>,
  body: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _subdir?: string
): Promise<void> {
  const table = getTable(collection)
  const row = fmToRow(frontmatter)

  const payload: Record<string, unknown> = {
    title: String(frontmatter.title || slug),
    ...row,
  }

  if (body) payload.content = body

  // Handle slug change
  const newSlug = frontmatter.slug as string | undefined
  if (newSlug && newSlug !== slug) {
    payload.slug = newSlug
  }

  const { error } = await supabaseAdmin
    .from(table)
    .update(payload)
    .eq('slug', slug)

  if (error) {
    console.error(`[updateContent] ${collection}/${slug}:`, error.message)
    throw new Error(error.message)
  }
}

export async function deleteContent(collection: string, slug: string): Promise<boolean> {
  const table = getTable(collection)

  const { error } = await supabaseAdmin
    .from(table)
    .delete()
    .eq('slug', slug)

  if (error) {
    console.error(`[deleteContent] ${collection}/${slug}:`, error.message)
    return false
  }

  return true
}

export function getContentDir(collection: string): string {
  return `content/${COLLECTION_TABLES[collection] || collection}`
}

export async function countContent(collection: string): Promise<number> {
  const table = getTable(collection)
  const { count, error } = await supabaseAdmin
    .from(table)
    .select('*', { count: 'exact', head: true })
  if (error) return 0
  return count || 0
}

export async function slugExists(collection: string, slug: string): Promise<boolean> {
  const existing = await getContentBySlug(collection, slug)
  return existing !== null
}
