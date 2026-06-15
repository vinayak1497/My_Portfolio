'use server'

import { createSession, clearSession, validatePassword } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function loginAction(_prev: unknown, formData: FormData) {
  const password = formData.get('password') as string

  if (!validatePassword(password)) {
    return { error: 'Invalid password' }
  }

  await createSession()
  redirect('/admin')
}

export async function logoutAction() {
  await clearSession()
  redirect('/admin/login')
}
