import { motion } from 'framer-motion'
import { cn, formatPercent } from '../lib/utils'

interface MetricRingProps {
  label: string
  value: number
  max?: number
  suffix?: string
  accent?: 'sky' | 'blue' | 'success' | 'amber' | 'coral'
  sublabel?: string
  onClick?: () => void
  delay?: number
}

const accentColors = {
  sky: { stroke: '#00a9f4', glow: 'rgba(0,169,244,0.35)' },
  blue: { stroke: '#2251ff', glow: 'rgba(34,81,255,0.35)' },
  success: { stroke: '#2e7d6f', glow: 'rgba(46,125,111,0.35)' },
  amber: { stroke: '#f59e0b', glow: 'rgba(245,158,11,0.35)' },
  coral: { stroke: '#e8776a', glow: 'rgba(232,119,106,0.35)' },
}

export function MetricRing({
  label,
  value,
  max = 100,
  suffix = '%',
  accent = 'sky',
  sublabel,
  onClick,
  delay = 0,
}: MetricRingProps) {
  const colors = accentColors[accent]
  const pct = Math.min(value / max, 1)
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const dash = circumference * pct

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        'group relative flex flex-col items-center rounded-2xl p-4 text-center transition-all duration-300',
        onClick && 'cursor-pointer hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]',
        !onClick && 'cursor-default',
      )}
      style={{ background: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)' }}
    >
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--surface-inset)" strokeWidth="6" />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${dash} ${circumference}` }}
            transition={{ duration: 1, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: `drop-shadow(0 0 8px ${colors.glow})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-tabular text-2xl font-bold text-theme-primary">
            {suffix === '%' ? formatPercent(value) : value}
            {suffix !== '%' && <span className="text-sm">{suffix}</span>}
          </span>
        </div>
      </div>
      <p className="mt-2 font-display text-xs font-bold uppercase tracking-wider text-theme-secondary">{label}</p>
      {sublabel && <p className="mt-0.5 text-[10px] text-theme-muted">{sublabel}</p>}
    </motion.button>
  )
}
