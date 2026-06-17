import Link from 'next/link'
import { Github, Linkedin, Twitter, ExternalLink } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-surface-container-highest border-t-4 border-primary mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-label-md text-on-surface/70 text-[11px]">
            © 1998-{new Date().getFullYear()} VK_EMULATOR. PROD BY VINAYAK KUNDAR.
          </p>
          <p className="text-[10px] text-on-surface-variant/50 mt-1 font-mono">
            Computer Engineering • APSIT • AI Builder • Community Leader
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <Link
            href="https://github.com/vinayak1497"
            target="_blank"
            rel="noopener noreferrer me"
            className="text-on-surface-variant hover:text-secondary transition-colors"
            aria-label="GitHub profile"
          >
            <Github size={18} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/vinayak-kundar"
            target="_blank"
            rel="noopener noreferrer me"
            className="text-on-surface-variant hover:text-secondary transition-colors"
            aria-label="LinkedIn profile"
          >
            <Linkedin size={18} />
          </Link>
          <Link
            href="https://x.com/VKundar73526"
            target="_blank"
            rel="noopener noreferrer me"
            className="text-on-surface-variant hover:text-secondary transition-colors"
            aria-label="X/Twitter profile"
          >
            <Twitter size={18} />
          </Link>
          <Link
            href="https://dev.to/vinayak1497"
            target="_blank"
            rel="noopener noreferrer me"
            className="text-on-surface-variant hover:text-secondary transition-colors font-mono text-xs font-bold"
            aria-label="Dev.to profile"
          >
            DEV
          </Link>
          <Link
            href="https://hashnode.com/@vinayak1497"
            target="_blank"
            rel="noopener noreferrer me"
            className="text-on-surface-variant hover:text-secondary transition-colors font-mono text-xs font-bold"
            aria-label="Hashnode blog"
          >
            <ExternalLink size={14} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
