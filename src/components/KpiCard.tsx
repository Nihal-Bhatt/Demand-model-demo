import { motion } from 'framer-motion'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { cn, formatPercent } from '../lib/utils'

interface KpiCardProps {
  label: string
  value: number
  suffix?: string
  delta?: number
  deltaLabel?: string
  accent?: 'sky' | 'blue' | 'coral' | 'success' | 'navy'
  comparison?: { label: string; value: number }
  delay?: number
}

const accentGlow = {
  sky: 'from-mck-sky/25 via-mck-sky/5 to-transparent shadow-[0_0_40px_rgba(0,169,244,0.15)]',
  blue: 'from-mck-blue/25 via-mck-blue/5 to-transparent shadow-[0_0_40px_rgba(34,81,255,0.12)]',
  coral: 'from-mck-coral/25 via-mck-coral/5 to-transparent shadow-[0_0_40px_rgba(232,119,106,0.12)]',
  success: 'from-mck-success/25 via-mck-success/5 to-transparent shadow-[0_0_40px_rgba(46,125,111,0.12)]',
  navy: 'from-mck-navy-light/30 via-transparent to-transparent',
}

const barColors = {
  sky: 'bg-gradient-to-r from-mck-sky to-mck-blue',
  blue: 'bg-gradient-to-r from-mck-blue to-mck-periwinkle',
  coral: 'bg-gradient-to-r from-mck-coral to-mck-peach',
  success: 'bg-gradient-to-r from-mck-success to-mck-teal',
  navy: 'bg-gradient-to-r from-mck-navy to-mck-navy-light',
}

export function KpiCard({
  label,
  value,
  suffix: _suffix = '%',
  delta,
  deltaLabel,
  accent = 'sky',
  comparison,
  delay = 0,
}: KpiCardProps) {
  const positive = delta !== undefined && delta >= 0

  return (
    <motion.article
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay, type: 'spring', stiffness: 120 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        'elevated-card group cursor-default p-5 lg:p-6',
        'bg-gradient-to-br',
        accentGlow[accent],
      )}
    >
      <div className={cn('absolute left-0 top-0 h-[3px] w-full', barColors[accent])} />

      {/* Ambient glow blob */}
      <div
        className={cn(
          'pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40 blur-3xl transition-opacity duration-300 group-hover:opacity-70',
          accent === 'sky' && 'bg-mck-sky',
          accent === 'blue' && 'bg-mck-blue',
          accent === 'coral' && 'bg-mck-coral',
          accent === 'success' && 'bg-mck-success',
          accent === 'navy' && 'bg-mck-navy-light',
        )}
      />

      <p className="relative text-xs font-semibold uppercase tracking-[0.16em] text-theme-secondary">{label}</p>
      <div className="relative mt-4 flex items-end justify-between gap-3">
        <p className="font-mono text-4xl font-bold tracking-tight text-theme-primary lg:text-[2.75rem]">
          {formatPercent(value)}
        </p>
        {delta !== undefined && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.2, type: 'spring' }}
            className={cn(
              'flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ring-1',
              positive
                ? 'bg-mck-success/15 text-mck-success ring-mck-success/25'
                : 'bg-mck-coral/15 text-mck-coral ring-mck-coral/25',
            )}
          >
            {positive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
            {formatPercent(Math.abs(delta))}
          </motion.div>
        )}
      </div>
      {deltaLabel && <p className="relative mt-3 text-sm leading-snug text-theme-secondary">{deltaLabel}</p>}
      {comparison && (
        <div
          className="relative mt-4 flex items-center justify-between rounded-xl px-3 py-2.5 text-sm ring-1 ring-[color:var(--border-subtle)]"
          style={{ background: 'var(--surface-muted)' }}
        >
          <span className="text-theme-secondary">{comparison.label}</span>
          <span className="font-mono font-bold text-mck-coral">{formatPercent(comparison.value)}</span>
        </div>
      )}
    </motion.article>
  )
}
