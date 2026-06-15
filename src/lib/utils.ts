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

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${path}`
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
