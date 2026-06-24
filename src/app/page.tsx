'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IntroOverlay } from '@/components/intro/IntroOverlay'
import { useUIStore } from '@/stores/ui-store'

export default function HomePage() {
  const router = useRouter()
  const hasBooted = useUIStore((state) => state.hasBooted)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(useUIStore.persist.hasHydrated())
    const unsubscribe = useUIStore.persist.onFinishHydration(() => setHydrated(true))
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (!hydrated) return
    if (hasBooted) {
      router.push('/journey')
    }
  }, [hasBooted, hydrated, router])

  return (
    <div className="relative min-h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden">
      <h1 className="sr-only">Vinayak Kundar — Computer Engineering Student, AI Builder & Full Stack Developer</h1>

      {/* SEO content — visible to search engines, hidden from visual users behind the overlay */}
      <div className="sr-only" aria-hidden="false">
        <h2>About Vinayak Kundar</h2>
        <p>
          Vinayak Kundar (Vinayak Umesh Kundar) is a Computer Engineering student at A. P. Shah Institute of Technology
          (APSIT), affiliated with the University of Mumbai. He is an AI builder, full stack developer, hackathon finalist,
          and community leader based in Thane, Mumbai, Maharashtra, India.
        </p>
        <h3>Technical Skills</h3>
        <p>
          Vinayak specializes in Next.js, React, TypeScript, Python, FastAPI, Node.js, Machine Learning, Artificial
          Intelligence, Cloud Computing (Google Cloud), and Supabase. He builds production-grade applications spanning
          AI agents, Web3 protocols, IoT precision agriculture systems, and full-stack web platforms.
        </p>
        <h3>Projects</h3>
        <p>
          Notable projects include Rupai (AI finance agent), Project Kisan (IoT precision farming), LedgerTalk (Web3
          communication protocol), and Rookies (AI automation platform). These projects demonstrate expertise in
          full-stack development, AI integration, and system architecture.
        </p>
        <h3>Community Leadership</h3>
        <p>
          As GDG On Campus Head of Operations at APSIT, Vinayak organizes tech events, workshops, and hackathons
          impacting hundreds of students. He co-founded Friendly Faces NGO, organizing blood donation camps, eye
          checkup camps, and flood relief initiatives that have helped over 400 people.
        </p>
        <h3>Education</h3>
        <p>
          Vinayak is pursuing a Bachelor of Engineering in Computer Engineering at APSIT (University of Mumbai) with
          a GPA of 9.822/10.0, graduating in May 2027. He holds the Google Cloud Digital Leader certification and
          actively participates in competitive hackathons and technical communities.
        </p>
        <h3>Achievements</h3>
        <p>
          Hackathon finalist at Cipherium (winner), VJTI (top 3), and NMIMS (top 10). Google Cloud Digital Leader
          certified. GDG On Campus Lead. Co-founder of Friendly Faces NGO. Published technical writer on Dev.to
          and Hashnode.
        </p>
        <h3>Location</h3>
        <p>
          Based in Vartak Nagar, Thane, Mumbai, Maharashtra 400606, India. Open to remote opportunities, hackathons,
          and collaborative projects.
        </p>
      </div>

      <IntroOverlay />
    </div>
  )
}
