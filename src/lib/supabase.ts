import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient, SupabaseClientOptions } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

function createClientSafe(key: string | undefined, options?: SupabaseClientOptions<'public'>): SupabaseClient {
  if (!supabaseUrl || !key) return createMockClient()
  return createClient(supabaseUrl, key, options)
}

function createMockClient(): SupabaseClient {
  return { from: () => createMockQuery() } as unknown as SupabaseClient
}

function createMockQuery() {
  const resolveValue = { data: [], error: null, count: 0 }
  const self = {
    then: (resolve: (v: typeof resolveValue) => void) => { resolve(resolveValue) },
    select: () => self,
    insert: () => self,
    update: () => self,
    delete: () => self,
    eq: () => self,
    order: () => self,
    limit: () => self,
    maybeSingle: () => Promise.resolve({ data: null, error: null }),
    single: () => Promise.resolve({ data: null, error: null }),
  }
  return self
}

export const supabase = createClientSafe(supabaseAnonKey)

export const supabaseAdmin = createClientSafe(supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
