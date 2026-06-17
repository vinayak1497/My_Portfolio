'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MapPin, Trophy } from 'lucide-react'
import { DialogueBox } from './DialogueBox'
import { DialogueCard } from '../shared/DialogueCard'
import { RetroButton } from '../shared/RetroButton'

interface JourneyNode {
  id: string
  title: string
  level: string
  locationName: string
  icon: string
  coords: { x: number; y: number } // Percentage coordinates on the map grid
  description: string
  dialogue: string[]
  achievements: string[]
  skills: string[]
  completed: boolean
}

const journeyNodes: JourneyNode[] = [
  {
    id: 'origin',
    title: 'Origin Town',
    level: 'LVL 1',
    locationName: 'Origin Town',
    icon: '🏠',
    coords: { x: 15, y: 80 },
    description: 'Where the journey started. Picked up coding, compiled the first C++ hello-world script, and decided to dive headfirst into Computer Engineering.',
    dialogue: [
      'Welcome to Origin Town, trainer!',
      'Here, you found your first computer and discovered the magical arts of programming.',
      'Obtained starter item: "C++ Programming Handbook"!'
    ],
    achievements: ['First Compile', 'CS Student Class unlocked'],
    skills: ['C++', 'Java', 'Algorithms 101'],
    completed: true,
  },
  {
    id: 'scholars_route',
    title: "Scholar's Route",
    level: 'LVL 5',
    locationName: "Scholar's Route",
    icon: '🌿',
    coords: { x: 30, y: 55 },
    description: 'Diving deep into Computer Science fundamentals. Mastered Operating Systems, DBMS, Networks, and computational theories.',
    dialogue: [
      'A wild theory appeared! You studied Processes, Semaphores, and TCP/IP handshakes.',
      'Your fundamentals stats rose sharply!',
      'Learned skill: "Systems Thinking"!'
    ],
    achievements: ['Deep Explorer', 'Deans List Badge'],
    skills: ['Operating Systems', 'DBMS', 'Computer Networks'],
    completed: true,
  },
  {
    id: 'engineering_city',
    title: 'Engineering City',
    level: 'LVL 12',
    locationName: 'Engineering City',
    icon: '🏢',
    coords: { x: 45, y: 30 },
    description: 'Transitioned from console apps to full-scale web engineering. Architected modern applications using Next.js, React, and serverless technology.',
    dialogue: [
      'You entered the industrial zone of web engineering.',
      'Built and shipped complex applications, optimizing load speeds and responsive styles.',
      'Obtained accessory: "Mechanical Keyboard"!'
    ],
    achievements: ['Full-Stack Architect', 'Vercel Deployment Master'],
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    completed: true,
  },
  {
    id: 'tech_guild',
    title: 'Tech Guild Arc',
    level: 'LVL 18',
    locationName: 'Tech Guild Arc',
    icon: '⚔️',
    coords: { x: 60, y: 45 },
    description: 'Collaborating in professional software environments. Shipped high-performance code, ran scrum meetings, and worked with real customer production systems.',
    dialogue: [
      'Joined forces with industry seniors at the Tech Guild.',
      'Resolved merge conflicts, designed production-grade databases, and optimized APIs.',
      'Earned title: "Reliable Engineer"!'
    ],
    achievements: ['Production Ship', 'Git Master Badge'],
    skills: ['Firebase', 'Supabase', 'Node.js', 'APIs'],
    completed: true,
  },
  {
    id: 'community_guild',
    title: 'Community Guild',
    level: 'LVL 20',
    locationName: 'Community Guild',
    icon: '🛡️',
    coords: { x: 75, y: 70 },
    description: 'Led the Google Developer Group (GDG) on campus. Organized hackathons, led workshops, and mentored hundreds of budding developers.',
    dialogue: [
      'You became the GDG Organizer! Grew the guild to over 500+ developers.',
      'Hosted workshops, coordinated hackathons, and helped others level up.',
      'Earned badge: "Leader Medal"!'
    ],
    achievements: ['GDG Lead Organizer', 'Mentor Elite'],
    skills: ['Leadership', 'Public Speaking', 'Mentoring'],
    completed: true,
  },
  {
    id: 'ai_frontier',
    title: 'AI Frontier',
    level: 'LVL 24',
    locationName: 'AI Frontier',
    icon: '⚡',
    coords: { x: 88, y: 25 },
    description: 'Currently exploring the cutting edge of AI agents, LLM orchestration, and RAG systems. Building RupAI and ledger agents.',
    dialogue: [
      'Reached the AI Frontier! The skies crackle with neural energy.',
      'Tuning LLMs, crafting agents, and building predictive wealth generation models.',
      'Active Quest: "Build the Ultimate AI Portfolio"!'
    ],
    achievements: ['Gemini Pioneer', 'AI Agent Builder'],
    skills: ['LLM Orchestration', 'Gemini API', 'AI Agents'],
    completed: true,
  },
]

export function JourneyMap() {
  const [selectedNode, setSelectedNode] = useState<JourneyNode>(journeyNodes[journeyNodes.length - 1])
  const [dialogueIndex, setDialogueIndex] = useState(0)

  const handleNodeClick = (node: JourneyNode) => {
    setSelectedNode(node)
    setDialogueIndex(0)
  }

  const handleNextDialogue = () => {
    if (dialogueIndex < selectedNode.dialogue.length - 1) {
      setDialogueIndex((prev) => prev + 1)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map Board */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <DialogueCard title="WORLD MAP" className="flex-1 bg-surface-container relative min-h-[350px] overflow-hidden p-0 border-4 border-primary shadow-8bit">
          {/* RPG Dotted Map Grid Style */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />

          {/* Connective Paths SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06241f" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ae2f33" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {/* Draw lines between consecutive nodes */}
            {journeyNodes.map((node, index) => {
              if (index === journeyNodes.length - 1) return null
              const nextNode = journeyNodes[index + 1]
              return (
                <g key={`path-${node.id}-${nextNode.id}`}>
                  <line
                    x1={`${node.coords.x}%`}
                    y1={`${node.coords.y}%`}
                    x2={`${nextNode.coords.x}%`}
                    y2={`${nextNode.coords.y}%`}
                    stroke="url(#pathGradient)"
                    strokeWidth="4"
                    strokeDasharray="6,8"
                    className="animate-dash"
                  />
                </g>
              )
            })}
          </svg>

          {/* Interactive Nodes */}
          {journeyNodes.map((node) => {
            const isSelected = selectedNode.id === node.id
            return (
              <button
                key={node.id}
                onClick={() => handleNodeClick(node)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group z-10 transition-transform hover:scale-110 active:scale-95"
                style={{ left: `${node.coords.x}%`, top: `${node.coords.y}%` }}
                aria-label={`Select ${node.locationName}`}
              >
                {/* Node marker */}
                <div className="relative">
                  {/* Glowing selection circle */}
                  {isSelected ? (
                    <motion.div
                      layoutId="pulsing-ring"
                      className="absolute -inset-3 bg-secondary/30 rounded-full border-2 border-dashed border-secondary animate-spin-slow"
                    />
                  ) : null}

                  {/* Icon Node */}
                  <div
                    className={`w-12 h-12 rounded-full border-4 flex items-center justify-center text-xl shadow-8bit transition-colors ${
                      isSelected
                        ? 'bg-secondary border-on-secondary text-white'
                        : 'bg-primary border-primary-container text-on-primary hover:bg-primary-container'
                    }`}
                  >
                    {node.icon}
                  </div>

                  {/* Tooltip Label */}
                  <span className="absolute top-14 left-1/2 -translate-x-1/2 bg-surface text-on-surface text-[10px] md:text-xs font-mono font-bold px-2 py-0.5 border-2 border-primary whitespace-nowrap shadow-8bit-sm rounded opacity-90 group-hover:opacity-100 transition-opacity">
                    {node.title}
                  </span>
                </div>
              </button>
            )}
          )}
        </DialogueCard>

        {/* Dialogue Box */}
        <AnimatePresence mode="wait">
          <DialogueBox
            key={`${selectedNode.id}-${dialogueIndex}`}
            speaker={`LOCATION: ${selectedNode.locationName}`}
            text={selectedNode.dialogue[dialogueIndex]}
            avatar={selectedNode.icon}
            showNext={dialogueIndex < selectedNode.dialogue.length - 1}
            onNext={handleNextDialogue}
          />
        </AnimatePresence>
      </div>

      {/* Quest & Achievements Details Sidebar */}
      <div className="flex flex-col gap-4">
        {/* Quest Info */}
        <DialogueCard title="QUEST LOG" className="bg-surface-container flex-1">
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-on-surface-variant/60 block uppercase">
                Current Location
              </span>
              <h3 className="font-mono text-headline-sm font-bold text-primary flex items-center gap-2 mt-1">
                <MapPin size={18} className="text-secondary" />
                {selectedNode.locationName}
              </h3>
              <p className="text-label-md text-xs text-on-surface-variant mt-2 leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            <div className="h-[2px] bg-primary/10 my-3" />

            {/* Unlocked Badges */}
            <div>
              <span className="text-[11px] font-mono font-bold text-on-surface-variant/60 block uppercase mb-2">
                Unlocked Loot & Badges
              </span>
              <ul className="space-y-2">
                {selectedNode.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-label-md text-xs text-on-surface">
                    <Trophy size={14} className="text-tertiary-container shrink-0" />
                    <span className="font-mono font-bold">{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-[2px] bg-primary/10 my-3" />

            {/* Earned Skills */}
            <div>
              <span className="text-[11px] font-mono font-bold text-on-surface-variant/60 block uppercase mb-2">
                Learned Abilities
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[10px] font-bold px-2 py-0.5 border border-primary/20 bg-surface text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </DialogueCard>

        {/* Campaign Progress */}
        <DialogueCard title="SAVED GAME" className="bg-surface">
          <div className="space-y-2 text-label-md text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">TRAINER:</span>
              <span className="font-bold text-primary">VINAYAK KUNDAR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">TOTAL XP:</span>
              <span className="font-bold text-secondary">7,200 XP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">LEVEL:</span>
              <span className="font-bold text-tertiary-fixed-dim">24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">CAMPAIGN:</span>
              <span className="font-bold text-primary">92% COMPLETE</span>
            </div>

            <div className="pt-2">
              <RetroButton
                variant="primary"
                size="sm"
                className="w-full text-[10px]"
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = '/vinayak_resume.pdf'
                  link.download = 'Vinayak_Kundar_Resume.pdf'
                  link.click()
                }}
              >
                DOWNLOAD RESUME
              </RetroButton>
            </div>
          </div>
        </DialogueCard>
      </div>
    </div>
  )
}
