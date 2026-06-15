import type { Metadata, Viewport } from 'next'
import { ibmPlexSans, spaceMono } from '@/lib/fonts'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { CRTOverlay } from '@/components/layout/CRTOverlay'
import { Header } from '@/components/layout/Header'
import { SideNav } from '@/components/layout/SideNav'
import { MobileNav } from '@/components/layout/MobileNav'
import { Footer } from '@/components/layout/Footer'
import { Terminal } from '@/components/terminal/Terminal'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Vinayak Kundar | VK_OS v1.0 — Developer Portfolio',
    template: '%s | VK_OS v1.0',
  },
  description:
    'A Pokémon emulator-inspired portfolio by Vinayak Kundar — Computer Engineering Student, AI Builder, Community Leader. Explore projects, journey, and engineering notes.',
  keywords: [
    'Vinayak Kundar',
    'portfolio',
    'developer',
    'AI',
    'computer engineering',
    'full stack',
    'pokemon',
    'emulator',
  ],
  authors: [{ name: 'Vinayak Kundar' }],
  creator: 'Vinayak Kundar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'VK_OS v1.0',
    title: 'Vinayak Kundar | VK_OS v1.0',
    description:
      'A Pokémon emulator-inspired portfolio showcasing projects, journey, and engineering notes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vinayak Kundar | VK_OS v1.0',
    description:
      'A Pokémon emulator-inspired portfolio showcasing projects, journey, and engineering notes.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#06241f' },
    { media: '(prefers-color-scheme: dark)', color: '#17130a' },
  ],
  width: 'device-width',
  initialScale: 1,
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
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  )
}