import type { Metadata, Viewport } from 'next'
import { ibmPlexSans, spaceMono } from '@/lib/fonts'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { CRTOverlay } from '@/components/layout/CRTOverlay'
import { Header } from '@/components/layout/Header'
import { SideNav } from '@/components/layout/SideNav'
import { MobileNav } from '@/components/layout/MobileNav'
import { Footer } from '@/components/layout/Footer'
import { Terminal } from '@/components/terminal/Terminal'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { PersonJsonLd, WebSiteJsonLd } from '@/components/shared/JsonLd'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, CREATOR, KEYWORDS_BASE, TWITTER_HANDLE } from '@/lib/seo'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: '%s | VK_OS v1.0',
  },
  description: SITE_DESCRIPTION,
  keywords: KEYWORDS_BASE,
  authors: [{ name: CREATOR }],
  creator: CREATOR,
  publisher: CREATOR,
  generator: 'Next.js',
  applicationName: 'VK_OS v1.0',
  category: 'portfolio',
  referrer: 'origin-when-cross-origin',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#06241f' },
    { media: '(prefers-color-scheme: dark)', color: '#17130a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="canonical" href={SITE_URL} />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <PersonJsonLd />
          <WebSiteJsonLd />

          {/* CRT Scanline Overlay */}
          <CRTOverlay />

          {/* Global Interactive Command Line Terminal */}
          <Terminal />

          {/* Header */}
          <Header />

          {/* Main Layout */}
          <div className="flex-1 w-full">
            <div className="max-w-[1280px] mx-auto flex items-start w-full">
              {/* Desktop Side Navigation */}
              <SideNav />

              {/* Page Content */}
              <main
                className="flex-1 min-w-0"
                id="main-content"
              >
                {children}
              </main>
            </div>
          </div>

          {/* Footer */}
          <Footer />

          {/* Mobile Bottom Navigation */}
          <MobileNav />

          {/* Mobile Nav Spacer */}
          <div
            className="h-16 lg:hidden"
            aria-hidden="true"
          />

          {/* Vercel Analytics & Speed Insights */}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
