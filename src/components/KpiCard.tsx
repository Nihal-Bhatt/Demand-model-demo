import { motion } from 'framer-motion'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { cn, formatPercent } from '../lib/utils'

interface KpiCardProps {
  label: string
  value: number
  suffix?: string
  delta?: number
  deltaLabel?: string
  accent?: 'sky' | 'blue' | 'coral' | 'success' | 'navy' | 'amber'
  comparison?: { label: string; value: number }
  delay?: number
}

const accentGlow = {
  sky: 'from-mck-sky/20 via-mck-sky/5 to-transparent',
  blue: 'from-mck-blue/20 via-mck-blue/5 to-transparent',
  coral: 'from-mck-coral/20 via-mck-coral/5 to-transparent',
  success: 'from-mck-success/20 via-mck-success/5 to-transparent',
  navy: 'from-mck-navy-light/25 via-transparent to-transparent',
  amber: 'from-mck-amber/20 via-mck-amber/5 to-transparent',
}

const barColors = {
  sky: 'bg-gradient-to-r from-mck-sky to-mck-blue',
  blue: 'bg-gradient-to-r from-mck-blue to-mck-periwinkle',
  coral: 'bg-gradient-to-r from-mck-coral to-mck-peach',
  success: 'bg-gradient-to-r from-mck-success to-mck-teal',
  navy: 'bg-gradient-to-r from-mck-navy to-mck-navy-light',
  amber: 'bg-gradient-to-r from-mck-amber to-mck-warning',
}

const meterColors = {
  sky: 'from-mck-sky to-mck-blue',
  blue: 'from-mck-blue to-mck-sky',
  coral: 'from-mck-coral to-mck-peach',
  success: 'from-mck-success to-mck-teal',
  navy: 'from-mck-navy-light to-mck-sky',
  amber: 'from-mck-amber to-mck-warning',
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn('elevated-card group p-4 lg:p-5', 'bg-gradient-to-br', accentGlow[accent])}
    >
      <div className={cn('absolute left-0 top-0 h-[3px] w-full', barColors[accent])} />

      <div className="relative flex items-start justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-theme-secondary">{label}</p>
        {delta !== undefined && (
          <span
            className={cn(
              'inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[11px] font-bold ring-1',
              positive
                ? 'bg-mck-success/12 text-mck-success ring-mck-success/25'
                : 'bg-mck-coral/12 text-mck-coral ring-mck-coral/25',
            )}
          >
            {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {formatPercent(Math.abs(delta))}
          </span>
        )}
      </div>

      <p className="relative mt-3 font-mono text-3xl font-bold tracking-tight text-theme-primary lg:text-4xl">
        {formatPercent(value)}
      </p>

      <div className="kpi-meter">
        <motion.div
          className={cn('kpi-meter-fill bg-gradient-to-r', meterColors[accent])}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(value, 100)}%` }}
          transition={{ duration: 0.8, delay: delay + 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {deltaLabel && <p className="relative mt-3 text-xs leading-snug text-theme-secondary">{deltaLabel}</p>}
      {comparison && (
        <div
          className="relative mt-3 flex items-center justify-between rounded-lg px-3 py-2 text-xs ring-1 ring-[color:var(--border-subtle)]"
          style={{ background: 'var(--surface-muted)' }}
        >
          <span className="text-theme-secondary">{comparison.label}</span>
          <span className="font-mono font-bold text-mck-coral">{formatPercent(comparison.value)}</span>
        </div>
      )}
    </motion.article>
  )
}
