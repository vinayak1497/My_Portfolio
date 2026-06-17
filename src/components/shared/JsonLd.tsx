import { SITE_URL } from '@/lib/seo'

interface PersonSchema {
  name?: string
  alternateName?: string
  jobTitle?: string
  description?: string
  image?: string
  sameAs?: string[]
  alumniOf?: string
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
  alumniOf = 'APSIT (University of Mumbai)',
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
    name,
    alternateName,
    jobTitle,
    description,
    url,
    image,
    sameAs,
    alumniOf,
    knowsAbout,
    award,
    email,
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
    name,
    url: SITE_URL,
    description,
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
}: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  authorName?: string
  image?: string
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: authorName,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.startsWith('http') ? url : `${SITE_URL}${url}`,
    },
  }
  if (image) schema.image = image
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
