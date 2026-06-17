import type { Metadata } from 'next'
import { absoluteUrl } from './utils'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vinayak-kundar.vercel.app'
export const SITE_NAME = 'Vinayak Kundar | VK_OS v1.0'
export const SITE_DESCRIPTION =
  'Official portfolio of Vinayak Kundar — Computer Engineering student at APSIT (Mumbai University), AI builder, hackathon finalist, community leader, and full stack developer.'
export const CREATOR = 'Vinayak Kundar'
export const KEYWORDS_BASE = [
  'Vinayak Kundar',
  'Vinayak Umesh Kundar',
  'Vinayak Kundar portfolio',
  'Vinayak Kundar developer',
  'Vinayak Kundar APSIT',
  'Vinayak Kundar AI',
  'Vinayak Kundar GitHub',
  'computer engineering student',
  'AI builder',
  'full stack developer',
  'APSIT',
  'Mumbai University',
  'GDG On Campus APSIT',
  'web development portfolio',
  'Pokémon emulator portfolio',
]
export const TWITTER_HANDLE = '@VKundar73526'

interface SEOProps {
  title: string
  description: string
  slug?: string
  path?: string
  keywords?: string[]
  images?: { url: string; width?: number; height?: number; alt?: string }[]
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  type?: 'website' | 'article' | 'profile'
  robots?: 'index, follow' | 'noindex, nofollow' | 'index, nofollow' | 'noindex, follow'
  noArchive?: boolean
  locale?: string
  alternates?: Record<string, string>
}

export function generateSEOMetadata({
  title,
  description,
  slug,
  path,
  keywords = [],
  images,
  publishedTime,
  modifiedTime,
  authors,
  type = 'website',
  robots = 'index, follow',
  noArchive = false,
  locale = 'en_US',
  alternates,
}: SEOProps): Metadata {
  const canonicalPath = path || (slug ? `/${slug}` : '/')
  const canonical = absoluteUrl(canonicalPath).replace(/\/$/, '') || `${SITE_URL}${canonicalPath}`.replace(/\/$/, '')

  const ogImages = images && images.length > 0
    ? images
    : [{ url: `${SITE_URL}/api/og?title=${encodeURIComponent(title)}`, width: 1200, height: 630 }]

  const metadata: Metadata = {
    title,
    description,
    keywords: [...KEYWORDS_BASE, ...keywords],
    authors: authors ? authors.map((name) => ({ name })) : [{ name: CREATOR }],
    creator: CREATOR,
    publisher: CREATOR,
    generator: 'Next.js',
    applicationName: SITE_NAME,
    category: 'portfolio',
    classification: 'portfolio',
    referrer: 'origin-when-cross-origin',
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      type,
      locale,
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      images: ogImages,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images: ogImages.map((img) => img.url),
    },
    robots: {
      index: robots.includes('index'),
      follow: robots.includes('follow'),
      ...(noArchive && { noarchive: true }),
    },
    appleWebApp: {
      capable: true,
      title: 'VK_OS',
      statusBarStyle: 'black-translucent',
    },
    formatDetection: {
      telephone: true,
      email: true,
      address: false,
    },
    other: {
      'article:author': 'Vinayak Kundar',
    },
  }

  return metadata
}

export const homeSEO: Metadata = generateSEOMetadata({
  title: 'Vinayak Kundar | Computer Engineering Student, AI Builder & Full Stack Developer',
  description: SITE_DESCRIPTION,
  path: '/',
  keywords: [
    'Vinayak Kundar portfolio',
    'computer engineering APSIT',
    'AI builder portfolio',
    'full stack developer Thane',
    'Mumbai University',
  ],
})

export const journeySEO: Metadata = generateSEOMetadata({
  title: 'Career Journey | Vinayak Kundar',
  description:
    'Follow the RPG-style career journey of Vinayak Kundar — from computer engineering student at APSIT to AI builder and community leader.',
  path: '/journey',
})

export const projectsSEO: Metadata = generateSEOMetadata({
  title: 'Projects | Vinayak Kundar',
  description:
    'Explore the project vault of Vinayak Kundar — AI agents, Web3 protocols, IoT systems, and full-stack applications.',
  path: '/projects',
  keywords: [
    'Vinayak Kundar projects',
    'AI projects',
    'full stack projects',
    'Next.js projects',
  ],
})

export const projectDetailSEO = (title: string, description: string, slug: string): Metadata =>
  generateSEOMetadata({
    title: `${title} | Project by Vinayak Kundar`,
    description,
    path: `/projects/${slug}`,
    type: 'article',
  })

export const blogsSEO: Metadata = generateSEOMetadata({
  title: 'Blogs | Vinayak Kundar',
  description:
    'Engineering thoughts, tutorials, and developer insights by Vinayak Kundar — AI, full stack, and career reflections.',
  path: '/blogs',
  keywords: ['Vinayak Kundar blog', 'engineering blog', 'developer blog'],
  type: 'article',
})

export const blogDetailSEO = (title: string, description: string, slug: string, publishedTime: string): Metadata =>
  generateSEOMetadata({
    title: `${title} | Vinayak Kundar Blog`,
    description,
    path: `/blogs/${slug}`,
    type: 'article',
    publishedTime,
  })

export const badgesSEO: Metadata = generateSEOMetadata({
  title: 'Trainer Progression Hub | Vinayak Kundar',
  description:
    'Career progression platform for Vinayak Kundar — certifications, hackathons, internships, leadership, and technical skills analysis.',
  path: '/badges',
  keywords: [
    'Vinayak Kundar certifications',
    'Vinayak Kundar badges',
    'Vinayak Kundar skills',
    'hackathon achievements',
  ],
})

export const pokedexSEO: Metadata = generateSEOMetadata({
  title: 'Engineering Notes | Vinayak Kundar',
  description:
    'Engineering knowledge archive by Vinayak Kundar — browse notes on Operating Systems, DBMS, Computer Networks, AI, TOC, and Software Engineering.',
  path: '/pokedex',
  keywords: [
    'engineering notes',
    'computer science notes',
    'OS notes',
    'DBMS notes',
    'AI notes',
  ],
})

export const resumeSEO: Metadata = generateSEOMetadata({
  title: 'Resume | Vinayak Kundar — Trainer Card',
  description:
    'Official resume of Vinayak Kundar — Computer Engineering student at APSIT, full stack developer, AI builder, and community leader based in Thane, Mumbai.',
  path: '/resume',
  keywords: ['Vinayak Kundar resume', 'Vinayak Kundar CV', 'computer engineering resume'],
})

export const contactSEO: Metadata = generateSEOMetadata({
  title: 'Contact | Vinayak Kundar',
  description:
    'Get in touch with Vinayak Kundar — computer engineering student, AI builder, and full stack developer. Available for collaboration, hackathons, and opportunities.',
  path: '/contact',
})

export const aboutSEO: Metadata = generateSEOMetadata({
  title: 'About | Vinayak Kundar',
  description:
    'Learn more about Vinayak Kundar — Computer Engineering student at APSIT (Mumbai University), AI builder, GDG On Campus Lead, full stack developer, and hackathon finalist based in Thane, Mumbai.',
  path: '/about',
  keywords: [
    'about Vinayak Kundar',
    'Vinayak Kundar biography',
    'Vinayak Kundar APSIT',
    'Vinayak Kundar Thane',
    'Vinayak Kundar Mumbai',
    'GDG On Campus APSIT',
  ],
  type: 'profile',
})
