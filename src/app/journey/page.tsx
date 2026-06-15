import type { Metadata } from 'next'
import { EmulatorWindow } from '@/components/shared/EmulatorWindow'
import { JourneyMap } from '@/components/journey/JourneyMap'
import { Map } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Journey',
  description: 'Follow the RPG-style story of Vinayak Kundar\'s career journey through technology.',
}

export default function JourneyPage() {
  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-6">
      <header className="mb-6 border-b-2 border-primary pb-3">
        <h1 className="text-headline-lg-mobile md:text-headline-lg text-primary uppercase flex items-center gap-3">
          <Map size={32} className="text-tertiary-container" />
          Journey
        </h1>
        <p className="text-body-lg text-on-surface-variant mt-2">
          The RPG story of a developer. Click locations on the map below to investigate.
        </p>
      </header>

      <JourneyMap />
    </div>
  )
}

