import type { Metadata } from 'next'
import { EmulatorWindow } from '@/components/shared/EmulatorWindow'
import { RetroButton } from '@/components/shared/RetroButton'
import { ScrollText, Download, Briefcase, GraduationCap, Code } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Vinayak Kundar\'s resume — Trainer Card style.',
}

export default function ResumePage() {
  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-6">
      <header className="mb-6 border-b-2 border-primary pb-3 flex justify-between items-center">
        <div>
          <h1 className="text-headline-lg-mobile md:text-headline-lg text-primary uppercase flex items-center gap-3">
            <ScrollText size={32} className="text-tertiary-container" />
            Trainer Card
          </h1>
          <p className="text-body-lg text-on-surface-variant mt-2">
            Official league credentials and full technical history parameters.
          </p>
        </div>
        <a href="/resume.pdf" download className="hidden sm:block">
          <RetroButton variant="secondary" size="sm" className="flex items-center gap-2">
            <Download size={14} />
            DOWNLOAD PDF
          </RetroButton>
        </a>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Trainer Card Profile */}
        <div className="lg:col-span-1 space-y-6">
          <div className="border-dialogue bg-surface p-4 shadow-8bit space-y-4">
            <div className="bg-primary text-on-primary font-mono text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest text-center">
              TRAINER LICENSE
            </div>

            {/* Trainer Photo & Core Stats */}
            <div className="flex gap-4 items-center">
              <div className="w-24 h-24 shrink-0 border-4 border-primary bg-primary-container relative flex items-center justify-center text-5xl">
                👨‍💻
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
                  }}
                  aria-hidden="true"
                />
              </div>
              <div className="font-mono text-xs space-y-1 text-on-surface">
                <div>
                  <span className="text-on-surface-variant font-bold">NAME:</span>
                  <p className="font-bold text-primary text-sm uppercase">VINAYAK KUNDAR</p>
                </div>
                <div>
                  <span className="text-on-surface-variant">ID NO:</span>
                  <p className="font-bold">#202425</p>
                </div>
                <div>
                  <span className="text-on-surface-variant">LEVEL:</span>
                  <p className="font-bold text-secondary">24 FULL-STACK</p>
                </div>
              </div>
            </div>

            {/* Gym Badges Display Grid */}
            <div className="border-2 border-primary/20 bg-surface-variant/40 p-3">
              <span className="font-mono text-[10px] font-bold text-primary block uppercase mb-2">
                Gym Badges Earned (4)
              </span>
              <div className="grid grid-cols-4 gap-2 text-center text-xl">
                <span title="Google Cloud Leader Badge" className="bg-surface border-2 border-primary/20 p-1">☁️</span>
                <span title="Machine Learning Badge" className="bg-surface border-2 border-primary/20 p-1">🤖</span>
                <span title="Full-Stack Dev Badge" className="bg-surface border-2 border-primary/20 p-1">💻</span>
                <span title="Community Leader Badge" className="bg-surface border-2 border-primary/20 p-1">🌟</span>
              </div>
            </div>
          </div>

          {/* Contact Details & Links */}
          <div className="border-dialogue bg-surface p-4 shadow-8bit space-y-3 font-mono text-xs">
            <h3 className="font-bold text-primary uppercase border-b border-primary/10 pb-1.5">
              Trainer Coordinates
            </h3>
            <div className="space-y-2">
              <div>
                <span className="text-on-surface-variant block text-[10px]">EMAIL ADDRESS:</span>
                <a href="mailto:vinayakumleshkundar@gmail.com" className="text-primary hover:underline font-bold">
                  vinayakumleshkundar@gmail.com
                </a>
              </div>
              <div>
                <span className="text-on-surface-variant block text-[10px]">GITHUB REGISTRY:</span>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">
                  github.com/vinayak-kundar
                </a>
              </div>
              <div>
                <span className="text-on-surface-variant block text-[10px]">LINKEDIN REGISTER:</span>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">
                  linkedin.com/in/vinayak-kundar
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Professional Work Log */}
        <div className="lg:col-span-2 space-y-6">
          {/* Work Experience */}
          <EmulatorWindow title="WORK_HISTORY.txt" statusText="ACTIVE">
            <div className="p-4 md:p-6 space-y-6">
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 bg-primary/10 text-primary border-2 border-primary flex items-center justify-center shrink-0">
                  <Briefcase size={20} />
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="font-mono text-headline-sm font-bold text-primary uppercase">
                      Professional Experience
                    </h3>
                  </div>

                  {/* Job Entry 1 */}
                  <div className="space-y-1">
                    <div className="flex justify-between flex-wrap gap-2 text-xs font-mono">
                      <span className="font-bold text-primary uppercase">Full Stack Developer Intern</span>
                      <span className="text-on-surface-variant">JUNE 2024 - AUG 2024</span>
                    </div>
                    <p className="font-mono text-[10px] text-secondary font-bold uppercase">Tech Guild Solutions</p>
                    <ul className="list-disc pl-4 mt-2 font-mono text-[11px] text-on-surface-variant space-y-1 leading-relaxed">
                      <li>Designed and deployed Next.js web applications, improving client portal responsiveness.</li>
                      <li>Architected PostgreSQL schemas and optimized API endpoints, reducing average queries by 20%.</li>
                      <li>Implemented authentication protocols using Supabase and integrated email broadcast services.</li>
                    </ul>
                  </div>

                  {/* Job Entry 2 */}
                  <div className="space-y-1 pt-2 border-t border-primary/10">
                    <div className="flex justify-between flex-wrap gap-2 text-xs font-mono">
                      <span className="font-bold text-primary uppercase">Frontend Engineer Contributor</span>
                      <span className="text-on-surface-variant">JAN 2024 - MAY 2024</span>
                    </div>
                    <p className="font-mono text-[10px] text-secondary font-bold uppercase">Kisan Ecosystems</p>
                    <ul className="list-disc pl-4 mt-2 font-mono text-[11px] text-on-surface-variant space-y-1 leading-relaxed">
                      <li>Collaborated on building data visualization panels for weather telemetry and IoT analytics.</li>
                      <li>Integrated UI designs with responsive Tailwind utility patterns, maintaining full accessibility.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </EmulatorWindow>

          {/* Education & Core Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education Panel */}
            <div className="border-dialogue bg-surface p-4 shadow-8bit flex flex-col justify-between">
              <div className="space-y-3 font-mono text-xs">
                <h3 className="font-bold text-primary uppercase border-b border-primary/10 pb-1.5 flex items-center gap-2">
                  <GraduationCap size={16} />
                  Academic History
                </h3>
                <div>
                  <span className="font-bold text-on-surface block uppercase">Bachelor of Engineering</span>
                  <span className="text-secondary text-[10px] font-bold block">Computer Engineering</span>
                  <p className="text-[10px] text-on-surface-variant/75 mt-1">GPA: 8.5/10.0</p>
                  <p className="text-[10px] text-on-surface-variant/75">Expected Graduation: May 2026</p>
                </div>
              </div>
            </div>

            {/* Core Skills Tree */}
            <div className="border-dialogue bg-surface p-4 shadow-8bit flex flex-col justify-between">
              <div className="space-y-3 font-mono text-xs">
                <h3 className="font-bold text-primary uppercase border-b border-primary/10 pb-1.5 flex items-center gap-2">
                  <Code size={16} />
                  Tech Capabilities
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-surface-variant border border-outline-variant px-2 py-0.5 text-[10px]">React/Next.js</span>
                  <span className="bg-surface-variant border border-outline-variant px-2 py-0.5 text-[10px]">Node.js</span>
                  <span className="bg-surface-variant border border-outline-variant px-2 py-0.5 text-[10px]">TypeScript</span>
                  <span className="bg-surface-variant border border-outline-variant px-2 py-0.5 text-[10px]">Python</span>
                  <span className="bg-surface-variant border border-outline-variant px-2 py-0.5 text-[10px]">SQL/NoSQL</span>
                  <span className="bg-surface-variant border border-outline-variant px-2 py-0.5 text-[10px]">Gemini/LLMs</span>
                  <span className="bg-surface-variant border border-outline-variant px-2 py-0.5 text-[10px]">Git/GitHub</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
