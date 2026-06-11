import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

interface FindingCardProps {
  title: string
  metric: string
  detail: string
  accent: 'sky' | 'blue' | 'success' | 'amber'
  icon?: ReactNode
  onClick: () => void
  delay?: number
}

const accentBar = {
  sky: 'from-mck-sky to-mck-blue',
  blue: 'from-mck-blue to-mck-periwinkle',
  success: 'from-mck-success to-mck-teal',
  amber: 'from-mck-amber to-mck-warning',
}

export function FindingCard({ title, metric, detail, accent, icon, onClick, delay = 0 }: FindingCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group relative w-full cursor-pointer overflow-hidden rounded-xl p-4 text-left ring-1 ring-[color:var(--border-subtle)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)] hover:ring-mck-sky/35"
      style={{ background: 'var(--surface-elevated)' }}
    >
      <div className={cn('absolute left-0 top-0 h-full w-1 bg-gradient-to-b', accentBar[accent])} />
      <div className="flex items-start gap-3 pl-2">
        {icon && <div className="mt-0.5 shrink-0 opacity-80">{icon}</div>}
        <div className="min-w-0 flex-1">
          <p className="font-display text-[11px] font-bold uppercase tracking-wider text-theme-secondary">{title}</p>
          <p className="mt-1 font-tabular text-xl font-bold text-theme-primary">{metric}</p>
          <p className="mt-1 text-xs leading-relaxed text-theme-secondary">{detail}</p>
        </div>
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-theme-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-mck-sky" />
      </div>
    </motion.button>
  )
}
