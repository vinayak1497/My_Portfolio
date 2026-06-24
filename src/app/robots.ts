import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/journey',
          '/projects',
          '/projects/',
          '/blogs',
          '/blogs/',
          '/badges',
          '/pokedex',
          '/resume',
          '/contact',
          '/about',
        ],
        disallow: [
          '/admin',
          '/admin/',
          '/api',
          '/api/',
          '/private',
          '/private/',
          '/drafts',
          '/drafts/',
          '/404',
          '/500',
          '/_next/',
          '/_next/static/',
          '/_next/static/chunks/',
          '/_next/static/media/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/journey',
          '/projects',
          '/projects/',
          '/blogs',
          '/blogs/',
          '/badges',
          '/pokedex',
          '/resume',
          '/contact',
          '/about',
        ],
        disallow: [
          '/admin',
          '/admin/',
          '/api',
          '/api/',
          '/private',
          '/private/',
          '/drafts',
          '/drafts/',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/',
        ],
      },
      {
        userAgent: 'Googlebot-Video',
        allow: [
          '/',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
