'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useUIStore } from '@/stores/ui-store'
import { X, Terminal as TerminalIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface HistoryItem {
  command: string
  output: string | string[]
  isError?: boolean
}

export function Terminal() {
  const { isTerminalOpen, closeTerminal } = useUIStore()
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'system_init',
      output: [
        'VK_OS [Version 1.0.0]',
        '(c) 2026 Vinayak Kundar. All rights reserved.',
        'Type /help to list available terminal commands.',
      ],
    },
  ])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [commandListHistory, setCommandListHistory] = useState<string[]>([])

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Commands registry
  const commands: Record<string, { desc: string; action: (args: string[]) => string | string[] }> = {
    '/help': {
      desc: 'Show all available system operations',
      action: () => [
        'Available Commands:',
        '  /about        Display summary about Vinayak Kundar',
        '  /projects     List all projects and display categories',
        '  /journey      Navigate to RPG Journey map page',
        '  /pokedex      Navigate to Pokédex Notes page',
        '  /badges       Navigate to Hall of Badges page',
        '  /contact      Navigate to Contact Comms console',
        '  /resume       Navigate to Trainer License card page',
        '  /clear        Flush terminal history logs',
        '  /exit         Close the terminal system',
      ],
    },
    '/about': {
      desc: 'Show user info profile',
      action: () => [
        'VINAYAK KUNDAR — COMPUTER ENGINEERING STUDENT & AI BUILDER',
        '--------------------------------------------------',
        'Level: 24 Full-Stack',
        'Main tech stack: React, Next.js, Python, Gemini API',
        'Community Role: GDG Lead Organizer on Campus',
        'Mission: Build modern gamified experiences & AI assistants',
      ],
    },
    '/projects': {
      desc: 'Show catalog of projects',
      action: () => {
        router.push('/projects')
        setTimeout(() => closeTerminal(), 300)
        return 'Navigating to Project Vault...'
      },
    },
    '/journey': {
      desc: 'Show journey map',
      action: () => {
        router.push('/journey')
        setTimeout(() => closeTerminal(), 300)
        return 'Navigating to RPG Journey map...'
      },
    },
    '/pokedex': {
      desc: 'Show pokedex data',
      action: () => {
        router.push('/pokedex')
        setTimeout(() => closeTerminal(), 300)
        return 'Navigating to Pokédex Notes...'
      },
    },
    '/badges': {
      desc: 'Show credentials page',
      action: () => {
        router.push('/badges')
        setTimeout(() => closeTerminal(), 300)
        return 'Navigating to Hall of Badges...'
      },
    },
    '/contact': {
      desc: 'Show communications page',
      action: () => {
        router.push('/contact')
        setTimeout(() => closeTerminal(), 300)
        return 'Navigating to Comms console...'
      },
    },
    '/resume': {
      desc: 'Show trainer card resume',
      action: () => {
        router.push('/resume')
        setTimeout(() => closeTerminal(), 300)
        return 'Navigating to Trainer Card Resume...'
      },
    },
    '/clear': {
      desc: 'Clear terminal console history',
      action: () => {
        setHistory([])
        return ''
      },
    },
    '/exit': {
      desc: 'Deactivate terminal system',
      action: () => {
        setTimeout(() => closeTerminal(), 100)
        return 'Shutting down terminal channel...'
      },
    },
  }

  // Toggle terminal via Ctrl + `
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' && e.ctrlKey) {
        e.preventDefault()
        if (isTerminalOpen) {
          closeTerminal()
        } else {
          useUIStore.getState().openTerminal()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isTerminalOpen, closeTerminal])

  // Focus input on open
  useEffect(() => {
    if (isTerminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isTerminalOpen])

  // Scroll to bottom when history changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [history])

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedInput = input.trim()

    if (!trimmedInput) return

    const parts = trimmedInput.split(' ')
    const cmd = parts[0].toLowerCase()
    const args = parts.slice(1)

    setCommandListHistory((prev) => [...prev, trimmedInput])
    setHistoryIndex(-1)

    if (commands[cmd]) {
      const output = commands[cmd].action(args)
      if (cmd !== '/clear') {
        setHistory((prev) => [...prev, { command: trimmedInput, output }])
      }
    } else {
      // Easter Egg / Hidden option
      if (trimmedInput.toLowerCase() === 'konami') {
        setHistory((prev) => [
          ...prev,
          {
            command: trimmedInput,
            output: '✨ CHEAT ENABLED: LEVEL LEVEL UP! STATS MAXIMIZED! ✨',
          },
        ])
      } else {
        setHistory((prev) => [
          ...prev,
          {
            command: trimmedInput,
            output: `Unknown operation: "${cmd}". Type /help for list of valid operators.`,
            isError: true,
          },
        ])
      }
    }

    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Command History Navigation on arrow keys
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandListHistory.length === 0) return
      const nextIdx = historyIndex === -1 ? commandListHistory.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIdx)
      setInput(commandListHistory[nextIdx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      const nextIdx = historyIndex === commandListHistory.length - 1 ? -1 : historyIndex + 1
      setHistoryIndex(nextIdx)
      setInput(nextIdx === -1 ? '' : commandListHistory[nextIdx])
    }

    // Autocomplete on Tab key
    if (e.key === 'Tab') {
      e.preventDefault()
      const match = Object.keys(commands).find((c) => c.startsWith(input.toLowerCase()))
      if (match) {
        setInput(match)
      }
    }
  }

  if (!isTerminalOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={closeTerminal}
      >
        {/* Terminal Window Frame */}
        <motion.div
          initial={{ scale: 0.95, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 15 }}
          className="w-full max-w-3xl h-[450px] bg-black border-4 border-[#00ff66] shadow-[0_0_20px_rgba(0,255,102,0.3)] rounded flex flex-col overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* CRT Overlay inside terminal */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay z-55"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,102,0.15) 2px, rgba(0,255,102,0.15) 4px)',
            }}
          />

          {/* Title Bar */}
          <div className="bg-[#00ff66]/10 px-3 py-2 border-b border-[#00ff66]/30 flex justify-between items-center text-[#00ff66]">
            <div className="flex items-center gap-2">
              <TerminalIcon size={14} className="animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">VK_OS: COMMS_PORT.terminal</span>
            </div>
            <button
              onClick={closeTerminal}
              className="text-[#00ff66] hover:bg-[#00ff66]/20 p-0.5 transition-colors focus:outline-none"
              aria-label="Close terminal console"
            >
              <X size={16} />
            </button>
          </div>

          {/* History Output Area */}
          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs text-[#00ff66]"
          >
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                {item.command !== 'system_init' && (
                  <div className="flex gap-2 text-[#00ff66]/60">
                    <span>vk_trainer$</span>
                    <span className="text-white font-bold">{item.command}</span>
                  </div>
                )}
                <div className={item.isError ? 'text-red-400' : 'text-[#00ff66]'}>
                  {Array.isArray(item.output) ? (
                    item.output.map((line, lIdx) => (
                      <p key={lIdx} className="whitespace-pre-wrap">
                        {line}
                      </p>
                    ))
                  ) : (
                    <p className="whitespace-pre-wrap">{item.output}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Command Input Area */}
          <form
            onSubmit={handleCommandSubmit}
            className="bg-[#00ff66]/5 p-3 border-t border-[#00ff66]/20 flex items-center gap-2 font-mono text-xs"
          >
            <span className="text-[#00ff66] font-bold">vk_trainer$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="TYPE /HELP OR START KEYWORDS..."
              className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-[#00ff66]/30 uppercase font-bold"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck="false"
            />
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
