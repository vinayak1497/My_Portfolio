import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Canonical production origin for the site. Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL (explicit override)
 *   2. VERCEL_PROJECT_PRODUCTION_URL (set automatically on Vercel production)
 *   3. Hard-coded production domain — guarantees we NEVER emit a localhost URL
 *      in canonical / OpenGraph / sitemap output, even if env vars are missing.
 */
const ENV_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
const VERCEL_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : ''

export const SITE_URL: string = (
  ENV_SITE_URL ||
  VERCEL_URL ||
  'https://vinayak-kundar.vercel.app'
).replace(/\/$/, '')

export function absoluteUrl(path: string) {
  const normalizedPath = path === '' || path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalizedPath}`
}

/**
 * Ensures a PDF URL ends with .pdf extension.
 * Handles backward compatibility for Cloudinary raw URLs that may lack the extension.
 */
export function normalizePdfUrl(url: string): string {
  if (!url) return url
  if (url.toLowerCase().endsWith('.pdf')) return url
  return `${url}.pdf`
}
