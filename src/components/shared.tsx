import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn, formatPercent } from '../lib/utils'

export function HeroStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur-sm">
      <p className="font-display text-[10px] font-bold uppercase tracking-wider text-white/50">{label}</p>
      <p className="mt-1 font-mono text-2xl font-bold text-white">{formatPercent(value)}</p>
    </div>
  )
}

export function InsightBlock({
  title,
  value,
  detail,
  accent,
}: {
  title: string
  value: string
  detail: string
  accent: 'sky' | 'blue' | 'teal'
}) {
  const accentBar = {
    sky: 'from-mck-sky to-mck-blue',
    blue: 'from-mck-blue to-mck-periwinkle',
    teal: 'from-mck-teal to-mck-sky',
  }

  return (
    <div
      className="group relative overflow-hidden rounded-xl p-4 ring-1 ring-[color:var(--border-subtle)] transition-all duration-300 hover:ring-mck-sky/30 hover:shadow-[var(--shadow-glow)]"
      style={{ background: 'var(--surface-muted)' }}
    >
      <div className={cn('absolute left-0 top-0 h-full w-1 bg-gradient-to-b', accentBar[accent])} />
      <p className="pl-3 font-display text-xs font-bold uppercase tracking-wider text-theme-secondary">{title}</p>
      <p className="pl-3 mt-2 font-display text-2xl font-bold text-theme-primary">{value}</p>
      <p className="pl-3 mt-2 font-body text-sm leading-relaxed text-theme-secondary">{detail}</p>
    </div>
  )
}

export function FormulaLine({ step, text, highlight }: { step: string; text: string; highlight?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-lg px-3 py-2.5 font-mono text-xs ring-1 transition-colors',
        highlight
          ? 'bg-mck-sky/10 ring-mck-sky/30 shadow-[0_0_20px_rgba(0,169,244,0.1)]'
          : 'ring-[color:var(--border-subtle)]',
      )}
      style={highlight ? undefined : { background: 'var(--surface-inset)' }}
    >
      <span className="mr-2 font-bold text-mck-sky">{step}.</span>
      {text}
    </div>
  )
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-2xl font-bold text-theme-primary lg:text-3xl">{title}</h2>
      {subtitle && <p className="mt-1 font-body text-sm text-theme-secondary">{subtitle}</p>}
    </div>
  )
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      {children}
    </motion.div>
  )
}
