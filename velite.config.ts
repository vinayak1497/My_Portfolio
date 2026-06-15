import { defineConfig, defineCollection, s } from 'velite'

const blogs = defineCollection({
  name: 'Blog',
  pattern: 'blogs/**/*.mdx',
  schema: s.object({
    title: s.string().max(120),
    slug: s.slug('blogs'),
    description: s.string().max(300),
    date: s.isodate(),
    tags: s.array(s.string()).default([]),
    published: s.boolean().default(true),
    metadata: s.metadata(),
    content: s.mdx(),
  }),
})

const projects = defineCollection({
  name: 'Project',
  pattern: 'projects/**/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.slug('projects'),
    description: s.string(),
    category: s.string(),
    level: s.number().min(1).max(100),
    techStack: s.array(s.string()),
    thumbnail: s.string().optional(),
    liveUrl: s.string().url().optional(),
    githubUrl: s.string().url().optional(),
    stats: s.object({
      complexity: s.number().min(0).max(100),
      impact: s.number().min(0).max(100),
      innovation: s.number().min(0).max(100),
    }).optional(),
    featured: s.boolean().default(false),
    date: s.isodate(),
    content: s.mdx(),
  }),
})

const notes = defineCollection({
  name: 'Note',
  pattern: 'notes/**/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.slug('notes'),
    subject: s.enum(['os', 'dbms', 'cn', 'ai', 'toc', 'software-engineering']),
    description: s.string(),
    order: s.number().default(0),
    published: s.boolean().default(true),
    content: s.mdx(),
  }),
})

const certifications = defineCollection({
  name: 'Certification',
  pattern: 'certifications/**/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.slug('certifications'),
    issuer: s.string(),
    rarity: s.enum(['common', 'rare', 'epic', 'legendary']),
    date: s.isodate(),
    category: s.string().default('certification'),
    skills: s.array(s.string()).default([]),
    hours: s.number().optional(),
    credentialId: s.string().optional(),
    credentialUrl: s.string().url().optional(),
    pdfUrl: s.string().optional(),
    imageUrl: s.string().optional(),
    content: s.mdx(),
  }),
})

const missions = defineCollection({
  name: 'Mission',
  pattern: 'missions/**/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.slug('missions'),
    type: s.enum(['leadership', 'hackathon', 'talk', 'workshop', 'community']),
    xp: s.number(),
    completed: s.boolean().default(true),
    date: s.isodate(),
    content: s.mdx(),
  }),
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
  },
  collections: { blogs, projects, notes, certifications, missions },
})
