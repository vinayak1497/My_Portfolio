# VK_OS v1.0 — Developer Portfolio

Pokémon emulator-inspired portfolio by **Vinayak Kundar** — Computer Engineering Student, AI Builder, Community Leader.

---

## Tech Stack

| Category | Technologies |
|----------|-------------| 
| **Framework** | Next.js 15.5 (App Router) |
| **Language** | TypeScript 5.8 |
| **Styling** | Tailwind CSS v4 + PostCSS |
| **Animation** | Motion (framer-motion v12) |
| **Content** | Velite (MDX-based SSG) + Runtime MDX Adapter |
| **State** | Zustand 5 |
| **Fonts** | IBM Plex Sans, Space Mono (Google Fonts) |
| **Icons** | Lucide React |
| **Theme** | next-themes (light/dark/retro) |
| **Search** | Pagefind (static search indexing) |
| **Smooth Scroll** | Lenis |
| **Comments** | Giscus (GitHub Discussions) |
| **Analytics** | PostHog |
| **Auth/DB** | Supabase |
| **Email** | Resend |
| **File Storage** | Cloudinary |
| **YAML** | js-yaml |
| **Package Manager** | npm |

---

## Project Structure

```
Portfolio/
├── content/                          # MDX content (9 collections: 4 Velite + 5 runtime)
│   ├── blogs/
│   │   └── hello-world.mdx           # Blog entry
│   ├── certifications/
│   │   └── google-cloud.mdx          # Google Cloud Digital Leader cert
│   ├── certificates/                 # Runtime-only collection (PDF certificates)
│   │   ├── aws/
│   │   │   └── aws-cloud-foundation.mdx
│   │   └── google-cloud-associate.mdx
│   ├── hackathons/                   # Runtime-only collection
│   │   ├── cipherium.mdx
│   │   ├── gdg-hackathon.mdx
│   │   └── vjti-hackathon.mdx
│   ├── internships/                  # Runtime-only collection
│   │   └── deloitte-data-analytics.mdx
│   ├── leadership/                   # Runtime-only collection
│   │   ├── blood-donation-camp.mdx
│   │   ├── friendly-faces.mdx
│   │   └── gdg-campus-lead.mdx
│   ├── media/                        # Runtime-only collection
│   │   └── newspaper-mention.mdx
│   ├── missions/
│   │   └── gdg-lead.mdx              # GDG On Campus Lead mission
│   ├── notes/
│   │   ├── os/
│   │   │   ├── operating-system.mdx
│   │   │   └── process-management.mdx
│   │   ├── cn/networking-fundamentals.mdx
│   │   ├── ai/ml-basics.mdx
│   │   ├── dbms/normalization.mdx
│   │   └── software-engineering/sdlc.mdx
│   └── projects/
│       ├── ledgertalk.mdx            # Web3 communication protocol
│       ├── project-kisan.mdx         # IoT precision farming (featured)
│       ├── rookies.mdx               # AI Automation (featured, level 100)
│       └── rupai.mdx                 # AI finance agent (featured)
│
├── public/
│   └── static/                       # Velite assets output
│
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── layout.tsx                # Root layout (CRT, Header, SideNav, MobileNav, Footer, Terminal)
│   │   ├── page.tsx                  # Home (IntroOverlay → redirect to /journey after boot)
│   │   ├── globals.css               # Tailwind v4 + design system + CRT effects
│   │   ├── admin/                    # Admin dashboard (hidden, no public links)
│   │   │   ├── layout.tsx            # Root admin layout (metadata + noindex)
│   │   │   ├── login/                # Login page (password auth + LoginForm component)
│   │   │   └── (dashboard)/          # Route group: authenticated admin pages
│   │   │       ├── layout.tsx        # Admin layout with sidebar
│   │   │       ├── page.tsx          # Dashboard overview (9 collection stats + quick actions)
│   │   │       ├── projects/         # Project CRUD (list, create, edit)
│   │   │       ├── certifications/   # Certification CRUD (Velite collection)
│   │   │       ├── certificates/     # Certificate CRUD (runtime collection, PDF upload)
│   │   │       ├── hackathons/       # Hackathon CRUD (runtime collection)
│   │   │       ├── internships/      # Internship CRUD (runtime collection)
│   │   │       ├── leadership/       # Leadership CRUD (runtime collection)
│   │   │       ├── media/            # Media mentions CRUD (runtime collection)
│   │   │       ├── blogs/            # Blog CRUD
│   │   │       └── notes/            # Notes CRUD
│   │   ├── api/
│   │   │   ├── admin/upload/route.ts # Cloudinary upload API
│   │   │   └── contact/route.ts      # Contact form API (Resend email)
│   │   ├── badges/page.tsx           # Trainer Progression Hub (consolidated dashboard)
│   │   ├── blogs/
│   │   │   ├── page.tsx              # Blog listing (sorted by date)
│   │   │   └── [slug]/page.tsx       # Blog detail (MDX render + tags)
│   │   ├── contact/page.tsx          # Contact form (Resend via API)
│   │   ├── journey/page.tsx          # RPG journey map page
│   │   ├── pokedex/page.tsx          # Pokédex engineering notes
│   │   ├── projects/
│   │   │   ├── page.tsx              # Project vault (filterable grid)
│   │   │   └── [slug]/page.tsx       # Project detail (stats + MDX + links)
│   │   └── resume/page.tsx           # Trainer card resume
│   │
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminSidebar.tsx      # Admin dashboard sidebar (9 nav items)
│   │   │   ├── AdminFormFields.tsx    # Reusable admin form field components
│   │   │   └── ImageUpload.tsx       # Cloudinary file upload with preview
│   │   ├── badges/
│   │   │   ├── BadgeCard.tsx         # Certification card with rarity colors
│   │   │   ├── CertificationArchive.tsx # Searchable/filterable cert archive with folder sidebar + modal
│   │   │   ├── CommunityLeadership.tsx  # Leadership impact cards with animated counters
│   │   │   ├── CorporateQuests.tsx     # Internship quest cards
│   │   │   ├── LeagueAchievements.tsx  # Hackathon timeline with category filter
│   │   │   ├── MediaRecognition.tsx    # Media mentions grouped by type
│   │   │   ├── MissionLog.tsx        # Collapsible mission entries
│   │   │   ├── SkillTreeAnalysis.tsx # Animated skill bars with related certs
│   │   │   ├── TrainerProfileDashboard.tsx # Full trainer dashboard (counters, XP bar, issuer analytics)
│   │   │   └── XPCounter.tsx         # Animated XP bar with Framer Motion
│   │   ├── blog/
│   │   │   └── BlogCard.tsx          # Blog preview card
│   │   ├── intro/
│   │   │   ├── IntroOverlay.tsx      # Full intro overlay orchestration (Pokeball → Trainer → CTA)
│   │   │   ├── PokeballReveal.tsx    # Animated pokeball with spring physics + flash
│   │   │   ├── TrainerReveal.tsx     # Typewriter trainer info reveal
│   │   │   └── StartJourney.tsx      # "START JOURNEY" CTA button
│   │   ├── journey/
│   │   │   ├── DialogueBox.tsx       # RPG dialogue with typewriter
│   │   │   └── JourneyMap.tsx        # Interactive SVG map with nodes + paths
│   │   ├── layout/
│   │   │   ├── CRTOverlay.tsx        # CRT scanline overlay (fixed position)
│   │   │   ├── Footer.tsx            # Site footer with social links
│   │   │   ├── Header.tsx            # Sticky header (nav + actions)
│   │   │   ├── MobileNav.tsx         # Bottom mobile nav + fullscreen overlay
│   │   │   └── SideNav.tsx           # Desktop sidebar (player info + nav)
│   │   ├── pokedex/
│   │   │   └── PokedexView.tsx       # Split-pane Pokédex (search + subject filter + MDX)
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx       # Project card with stats bars
│   │   │   ├── ProjectGrid.tsx       # Filterable/sortable grid
│   │   │   └── TechBadge.tsx         # Tech stack pill with smart coloring
│   │   ├── providers/
│   │   │   └── ThemeProvider.tsx      # next-themes wrapper
│   │   ├── shared/
│   │   │   ├── DialogueCard.tsx      # Dialogue box with double border
│   │   │   ├── EmulatorWindow.tsx    # Emulator-styled window frame
│   │   │   ├── LevelBadge.tsx        # Colored level indicator
│   │   │   ├── MdxRenderer.tsx       # Runtime MDX renderer (Velite)
│   │   │   ├── PixelDivider.tsx      # Decorative pixel divider
│   │   │   ├── RetroButton.tsx       # 8-bit styled button (forwardRef)
│   │   │   └── TypewriterText.tsx    # Typewriter animation component
│   │   └── terminal/
│   │       └── Terminal.tsx          # Full-screen terminal (commands, history, easter eggs)
│   │
│   ├── hooks/
│   │   └── useTypewriter.ts          # Typewriter effect (text, speed, delay, onComplete)
│   │
│   ├── lib/
│   │   ├── auth.ts                   # Admin session management (cookie-based)
│   │   ├── cloudinary.ts             # Cloudinary upload/delete utilities
│   │   ├── content-manager.ts        # MDX file read/write/delete (supports 9 collections)
│   │   ├── content-data.ts           # Typed runtime adapters for all 9 collections
│   │   ├── fonts.ts                  # IBM Plex Sans + Space Mono config
│   │   ├── utils.ts                  # cn(), formatDate(), absoluteUrl(), normalizePdfUrl()
│   │   └── vinayak_resume.pdf        # PDF resume file
│   │
│   ├── middleware.ts                 # Auth middleware (protects /admin/* routes)
│   └── stores/
│       └── ui-store.ts               # Zustand store (terminal, sound, boot, nav, search, achievements)
│
├── .env.local                        # Environment variables (Supabase, PostHog, Resend, Giscus, GitHub)
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json                     # Path aliases: @/* → ./src/*, #velite → ./.velite
├── velite.config.ts                  # Velite collections: blogs, projects, notes, certifications, missions
└── AGENTS.md                         # This file
```

---

## Pages & Routes

| Route | Description | Type |
|-------|-------------|------|
| `/` | Home — Intro overlay (Pokeball → Trainer reveal → "START JOURNEY"), redirects to `/journey` after boot | Client |
| `/journey` | RPG-style career map with interactive nodes, SVG paths, dialogue box, quest log | Server |
| `/projects` | Project vault with category filter, sort controls, stat bars | Server |
| `/projects/[slug]` | Project detail with MDX content, stats sidebar, tech stack, live/github links | SSG |
| `/blogs` | Blog listing sorted by date, filtered by published status | Server |
| `/blogs/[slug]` | Blog detail with MDX content, tags, reading time | SSG |
| `/badges` | Trainer Progression Hub — profile dashboard, cert archive, skill tree, hackathons, internships, leadership, media | Server |
| `/pokedex` | Engineering notes in Pokédex split-pane (search, subject filter, list, MDX detail) | Server |
| `/resume` | Trainer card resume — work history, education, skills, gym badges | Server |
| `/contact` | Contact form with Resend API integration | Client |
| `/api/contact` | POST endpoint for contact form (Resend email with console fallback) | API |

### Admin Routes (noindex, nofollow — no public links)

| Route | Description | Collection Type |
|-------|-------------|-----------------|
| `/admin` | Dashboard overview — 9 collection stats + quick actions | — |
| `/admin/login` | Password-based authentication | — |
| `/admin/projects` | Project CRUD (Velite) | Build-time |
| `/admin/projects/new` | Create project | Build-time |
| `/admin/projects/[slug]/edit` | Edit project | Build-time |
| `/admin/certifications` | Certification CRUD (Velite) | Build-time |
| `/admin/certifications/new` | Create certification | Build-time |
| `/admin/certifications/[slug]/edit` | Edit certification | Build-time |
| `/admin/certificates` | Certificate CRUD (runtime, PDF upload) | Runtime |
| `/admin/certificates/new` | Create certificate | Runtime |
| `/admin/certificates/[slug]/edit` | Edit certificate | Runtime |
| `/admin/hackathons` | Hackathon CRUD (runtime) | Runtime |
| `/admin/hackathons/new` | Create hackathon | Runtime |
| `/admin/hackathons/[slug]/edit` | Edit hackathon | Runtime |
| `/admin/internships` | Internship CRUD (runtime) | Runtime |
| `/admin/internships/new` | Create internship | Runtime |
| `/admin/internships/[slug]/edit` | Edit internship | Runtime |
| `/admin/leadership` | Leadership CRUD (runtime) | Runtime |
| `/admin/leadership/new` | Create leadership entry | Runtime |
| `/admin/leadership/[slug]/edit` | Edit leadership entry | Runtime |
| `/admin/media` | Media mentions CRUD (runtime) | Runtime |
| `/admin/media/new` | Create media mention | Runtime |
| `/admin/media/[slug]/edit` | Edit media mention | Runtime |
| `/admin/blogs` | Blog CRUD (Velite) | Build-time |
| `/admin/blogs/new` | Create blog post | Build-time |
| `/admin/blogs/[slug]/edit` | Edit blog post | Build-time |
| `/admin/notes` | Notes CRUD (Velite) | Build-time |
| `/admin/notes/new` | Create note | Build-time |
| `/admin/notes/[slug]/edit` | Edit note | Build-time |
| `/api/admin/upload` | Cloudinary upload API (auth-protected) | API |

---

## Features Implemented

### 1. Intro / Boot Sequence (`IntroOverlay.tsx`, `PokeballReveal.tsx`, `TrainerReveal.tsx`, `StartJourney.tsx`)
- Four-phase intro: Pokeball drop (spring physics + flash) → Trainer reveal (typewriter name + bio) → CTA button
- Auto-advances after animation, click to skip
- Redirects to `/journey` after completion
- Boot state persisted via Zustand `hasBooted` flag (skips on revisit)

### 2. Terminal (`Terminal.tsx`)
- Toggle with `Ctrl + \``
- Commands: `/help`, `/about`, `/projects`, `/journey`, `/pokedex`, `/badges`, `/contact`, `/resume`, `/clear`, `/exit`
- Easter egg: `konami` triggers cheat message
- Arrow key history navigation, Tab autocomplete
- CRT green-on-black aesthetic

### 3. CRT Overlay (`CRTOverlay.tsx`)
- Fixed position scanline overlay with RGB chromatic shift
- Dark mode variant

### 4. Journey Map (`JourneyMap.tsx`)
- 6 interactive nodes on an SVG map with dashed path connections
- Node selection updates quest log + achievements + skills sidebar
- Dialogue box with typewriter animation and "NEXT" button
- Campaign progress panel with save/print

### 5. Project Vault (`ProjectGrid.tsx` + `ProjectCard.tsx`)
- Category filter, sort by level/date/complexity/alphabetical
- Cards with stat bars (complexity, impact, innovation)
- Featured badge for starred projects
- Tech stack pills, level badge, "Open Intel" link

### 6. Pokédex Notes (`PokedexView.tsx`)
- Split-pane: left list (search + subject filter icons) + right detail (MDX content)
- Subject categories: OS, DBMS, CN, AI, TOC, Software Engineering
- Animated indicator bulbs (Pokédex styling)

### 7. Trainer Progression Hub (`/badges`)
- **TrainerProfileDashboard**: XP level bar, total hours, certification count, skill diversity, issuer analytics, top skills
- **CertificationArchive**: Folder sidebar (by issuer), search, filter (issuer/year/skill/category), sort, detail modal with View PDF / Download PDF / Verify Credential
- **SkillTreeAnalysis**: Animated bar chart of skill proficiency with related certification count
- **LeagueAchievements**: Hackathon timeline with category filter, position badges, prize amounts
- **CorporateQuests**: Internship quest cards with status, duration, skills
- **CommunityLeadership**: Leadership impact cards with animated counters (people impacted, events conducted, volunteers managed)
- **MediaRecognition**: Media mentions grouped by type (newspaper, award, feature)

### 8. Blog (`BlogCard.tsx`, blog pages)
- Card grid sorted by date, published filter
- Detail page with reading time, tags, MDX content

### 9. Resume / Trainer Card
- Player profile with ID, level, gym badges
- Work history, education, skills
- Download PDF link

### 10. Contact Form (client + API)
- Form with name, email, subject, message
- Posts to `/api/contact` which sends via Resend
- Graceful fallback when Resend API key is missing

### 11. Theme System
- Light / Dark / Retro themes via `next-themes`
- Full color palette defined in Tailwind v4 `@theme`
- Dark mode overrides with `.dark` class

### 12. Content Management (Runtime Adapter)
- **4 Velite collections** (build-time): blogs, projects, notes, certifications, missions
- **5 runtime-only collections** (no Velite build needed): certificates, hackathons, internships, leadership, media
- Runtime MDX renderer via `react/jsx-runtime`
- Runtime content adapter (`content-data.ts`) replaces `#velite` imports for live content without rebuilds
- Admin-created MDX files read at runtime via `content-manager.ts` (filesystem)
- Merging: `badges/page.tsx` merges `certifications` (Velite) + `certificates` (runtime) into unified display via `certificateToCertification()` adapter

### 13. UI Store (Zustand)
- Terminal state, sound toggle, boot sequence, mobile nav, search, achievement unlocks

### 14. Design System (`globals.css`)
- Custom colors (primary, secondary, tertiary, surface, variants)
- 8-bit shadows (`shadow-8bit`, `shadow-8bit-sm`)
- Double border dialogue style
- CRT scanline, blink, pulse-glow, shimmer animations
- Custom scrollbar, focus styles, print styles

### 15. Animations (Motion)
- Page entry animations (fade, slide, scale)
- Hover effects on cards (translate, glow)
- Loading bar, typewriter, XP counter, dialogue box transitions
- Journey map node selection ring
- Pokeball spring physics, screen flash

### 16. Admin Dashboard (Password Protected)
- Hidden admin panel at `/admin` (no public links, noindex/nofollow)
- Password-based auth via `ADMIN_PASSWORD` env var + cookie session
- Next.js middleware protects all `/admin/*` and `/api/admin/*` routes
- Dashboard overview with 9 collection counts and quick action buttons
- Full CRUD for 9 collections: projects, certifications, certificates, hackathons, internships, leadership, media, blogs, notes
- MDX content files generated/edited in `content/` (Velite-compatible for Velite collections)
- Cloudinary upload API for images, PDFs, and screenshots
- Terminal-inspired UI matching the emulator design language
- Certificate PDF upload with Cloudinary raw storage, thumbnail preview

---

## Collection Architecture

| Collection | Velite | Runtime | Content Dir | Admin Route |
|------------|--------|---------|-------------|-------------|
| `projects` | ✅ | ✅ | `content/projects/` | `/admin/projects` |
| `certifications` | ✅ | ✅ | `content/certifications/` | `/admin/certifications` |
| `blogs` | ✅ | ✅ | `content/blogs/` | `/admin/blogs` |
| `notes` | ✅ | ✅ | `content/notes/{subject}/` | `/admin/notes` |
| `missions` | ✅ | ✅ | `content/missions/` | — |
| `certificates` | — | ✅ | `content/certificates/{issuer}/` | `/admin/certificates` |
| `hackathons` | — | ✅ | `content/hackathons/` | `/admin/hackathons` |
| `internships` | — | ✅ | `content/internships/` | `/admin/internships` |
| `leadership` | — | ✅ | `content/leadership/` | `/admin/leadership` |
| `media` | — | ✅ | `content/media/` | `/admin/media` |

---

## Getting Started

```bash
npm install           # Install dependencies
npm run build         # velite && next build (generates content + builds)
npm run dev           # Next.js dev server (default: http://localhost:3000)
npm run start         # Production server
npm run lint          # ESLint
```

**Dev server** (without Turbopack if experiencing CSS issues):
```bash
npx next dev --port 3001
```

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
RESEND_API_KEY=
NEXT_PUBLIC_GISCUS_REPO=
NEXT_PUBLIC_GISCUS_REPO_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=
GITHUB_TOKEN=
ADMIN_PASSWORD=admin123
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/content-manager.ts` | Core MDX file CRUD — reads/writes/deletes MDX with frontmatter parsing (9 collections) |
| `src/lib/content-data.ts` | Typed runtime adapters (`getProjects`, `getCertificates`, `getHackathons`, etc.) for public pages |
| `src/lib/auth.ts` | Cookie-based admin session management |
| `src/lib/cloudinary.ts` | Cloudinary upload/delete utilities for images and PDFs |
| `src/lib/utils.ts` | Utility functions: `cn()`, `formatDate()`, `absoluteUrl()`, `normalizePdfUrl()` |
| `src/middleware.ts` | Protects `/admin/*` and `/api/admin/*` routes |
| `src/app/badges/page.tsx` | Trainer Progression Hub — merges certifications + certificates collections |

---

## Known Issues

- **Turbopack CSS panic** on Windows (exit code `0xc0000142`). Use non-Turbopack dev server as workaround.
- **Jest worker EPIPE** errors on project detail pages in dev mode — refresh resolves. Production build (`npm run build` then `npm run start`) is stable.
- All optional services (Supabase, PostHog, Resend, Giscus) gracefully degrade when env vars are empty.
