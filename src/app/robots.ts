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
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
