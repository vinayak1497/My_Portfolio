import { SITE_URL } from '@/lib/seo'

// Stable @id values so every schema node on the site references the SAME
// canonical entities (a connected knowledge graph rather than disconnected blobs).
export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const ORGANIZATION_ID = `${SITE_URL}/#organization`

interface PersonSchema {
  name?: string
  alternateName?: string | string[]
  jobTitle?: string
  description?: string
  image?: string
  sameAs?: string[]
  knowsAbout?: string[]
  award?: string[]
  email?: string
  url?: string
}

interface WebSiteSchema {
  name?: string
  url?: string
  description?: string
  searchAction?: boolean
}

interface BreadcrumbItem {
  name: string
  item: string
}

export function PersonJsonLd({
  name = 'Vinayak Kundar',
  alternateName = 'Vinayak Umesh Kundar',
  jobTitle = 'Computer Engineering Student & AI Builder',
  description = 'Computer Engineering student at APSIT (Mumbai University), AI builder, full stack developer, GDG On Campus Lead, and hackathon finalist.',
  image = `${SITE_URL}/api/og?title=Vinayak+Kundar`,
  sameAs = [
    'https://github.com/vinayak1497',
    'https://www.linkedin.com/in/vinayak-kundar',
    'https://x.com/VKundar73526',
    'https://dev.to/vinayak1497',
    'https://hashnode.com/@vinayak1497',
  ],
  knowsAbout = [
    'Artificial Intelligence',
    'Full Stack Development',
    'Next.js',
    'React',
    'TypeScript',
    'Machine Learning',
    'Cloud Computing',
    'Web Development',
    'Community Leadership',
  ],
  award = [
    'GDG On Campus Lead',
    'Hackathon Finalist',
    'Google Cloud Digital Leader',
  ],
  email = 'vinayakumleshkundar@gmail.com',
  url = SITE_URL,
}: PersonSchema = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name,
    alternateName: Array.isArray(alternateName)
      ? alternateName
      : [alternateName, 'Vinayak U. Kundar'],
    givenName: 'Vinayak',
    familyName: 'Kundar',
    jobTitle,
    description,
    url,
    mainEntityOfPage: SITE_URL,
    image: {
      '@type': 'ImageObject',
      url: image,
      width: 1200,
      height: 630,
    },
    sameAs,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'A. P. Shah Institute of Technology (APSIT)',
      sameAs: 'https://www.apsit.edu.in/',
      parentOrganization: {
        '@type': 'CollegeOrUniversity',
        name: 'University of Mumbai',
        sameAs: 'https://mu.ac.in/',
      },
    },
    memberOf: {
      '@type': 'Organization',
      name: 'Google Developer Groups On Campus, APSIT',
    },
    homeLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Thane',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
    },
    nationality: {
      '@type': 'Country',
      name: 'India',
    },
    knowsAbout,
    knowsLanguage: ['English', 'Hindi', 'Marathi'],
    award,
    email,
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function ProfilePageJsonLd({
  dateModified,
  dateCreated = '2025-05-30',
}: {
  dateModified?: string
  dateCreated?: string
} = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: 'Vinayak Kundar — Computer Engineering Student, AI Builder & Full Stack Developer',
    dateCreated,
    dateModified: dateModified || dateCreated,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': PERSON_ID },
    mainEntity: { '@id': PERSON_ID },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function WebSiteJsonLd({
  name = 'Vinayak Kundar | VK_OS v1.0',
  description = 'Pokémon emulator-inspired portfolio by Vinayak Kundar — Computer Engineering Student, AI Builder, and Community Leader.',
  searchAction = true,
}: Omit<WebSiteSchema, 'url'> & { searchAction?: boolean } = {}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name,
    alternateName: 'Vinayak Kundar Portfolio',
    url: SITE_URL,
    description,
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID },
    author: { '@id': PERSON_ID },
    copyrightHolder: { '@id': PERSON_ID },
  }
  if (searchAction) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item.startsWith('http') ? item.item : `${SITE_URL}${item.item}`,
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function BlogPostingJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName = 'Vinayak Kundar',
  image,
  keywords,
  wordCount,
  articleSection,
}: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  authorName?: string
  image?: string
  keywords?: string[]
  wordCount?: number
  articleSection?: string
}) {
  const absUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: absUrl,
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: 'en',
    author: { '@id': PERSON_ID, '@type': 'Person', name: authorName, url: SITE_URL },
    publisher: { '@id': PERSON_ID, '@type': 'Person', name: authorName, url: SITE_URL },
    isPartOf: { '@id': WEBSITE_ID },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absUrl,
    },
  }
  if (image) schema.image = image
  if (keywords && keywords.length) schema.keywords = keywords.join(', ')
  if (wordCount) schema.wordCount = wordCount
  if (articleSection) schema.articleSection = articleSection
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function SoftwareSourceCodeJsonLd({
  name,
  description,
  url,
  image,
  authorName = 'Vinayak Kundar',
  programmingLanguage,
  operatingSystem,
}: {
  name: string
  description: string
  url: string
  image?: string
  authorName?: string
  programmingLanguage?: string[]
  operatingSystem?: string
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name,
    description,
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    author: {
      '@type': 'Person',
      name: authorName,
      url: SITE_URL,
    },
  }
  if (image) schema.image = image
  if (programmingLanguage) schema.programmingLanguage = programmingLanguage
  if (operatingSystem) schema.operatingSystem = operatingSystem
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function EducationalOccupationalCredentialJsonLd({
  name,
  description,
  url,
  issuerName,
  dateIssued,
  credentialCategory,
}: {
  name: string
  description: string
  url: string
  issuerName: string
  dateIssued: string
  credentialCategory?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalCredential',
    name,
    description,
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    dateIssued,
    credentialCategory: credentialCategory || 'certification',
    recognizedBy: {
      '@type': 'Organization',
      name: issuerName,
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function EventJsonLd({
  name,
  description,
  url,
  startDate,
  location,
  eventType = 'Hackathon',
}: {
  name: string
  description: string
  url: string
  startDate: string
  location?: string
  eventType?: string
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    startDate,
    eventType,
  }
  if (location) {
    schema.location = {
      '@type': 'Place',
      name: location,
    }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'Vinayak Kundar',
    alternateName: 'VK_OS v1.0',
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: 'Official portfolio of Vinayak Kundar — Computer Engineering student at APSIT (Mumbai University), AI builder, hackathon finalist, community leader, and full stack developer.',
    foundingDate: '2025-05-30',
    founder: { '@id': PERSON_ID },
    sameAs: [
      'https://github.com/vinayak1497',
      'https://www.linkedin.com/in/vinayak-kundar',
      'https://x.com/VKundar73526',
      'https://dev.to/vinayak1497',
      'https://hashnode.com/@vinayak1497',
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Full Stack Development',
      'Machine Learning',
      'Cloud Computing',
      'Web Development',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Thane',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function ContactPageJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Vinayak Kundar',
    description: 'Get in touch with Vinayak Kundar for collaboration, opportunities, and inquiries.',
    url: `${SITE_URL}/contact`,
    mainEntity: {
      '@type': 'Person',
      name: 'Vinayak Kundar',
      email: 'vinayakumleshkundar@gmail.com',
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function TechArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  authorName = 'Vinayak Kundar',
  proficiencyLevel,
}: {
  title: string
  description: string
  url: string
  datePublished: string
  authorName?: string
  proficiencyLevel?: string
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
      url: SITE_URL,
    },
  }
  if (proficiencyLevel) schema.proficiencyLevel = proficiencyLevel
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
