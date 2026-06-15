import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-surface-container-highest border-t-4 border-primary mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-label-md text-on-surface/70 text-[11px]">
          © 1998-{new Date().getFullYear()} VK_EMULATOR. PROD BY VINAYAK KUNDAR.
        </p>
        <div className="flex gap-4">
          <Link
            href="https://github.com/vinayak1497"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-secondary transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/vinayak-kundar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-secondary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </Link>
          <Link
            href="https://x.com/VKundar73526"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-secondary transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={18} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
