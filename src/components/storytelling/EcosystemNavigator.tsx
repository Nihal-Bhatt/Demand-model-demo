import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

interface EcosystemNode {
  id: string
  label: string
  sublabel: string
  icon: LucideIcon
  angle: number
}

interface EcosystemNavigatorProps {
  centerValue: string
  centerLabel: string
  nodes: EcosystemNode[]
  activeId?: string
  onNavigate: (id: string) => void
}

export function EcosystemNavigator({
  centerValue,
  centerLabel,
  nodes,
  activeId,
  onNavigate,
}: EcosystemNavigatorProps) {
  const radius = 118
  const cx = 160
  const cy = 160

  return (
    <div className="ecosystem-nav relative mx-auto aspect-square w-full max-w-[360px]">
      <p className="mb-4 text-center font-display text-[10px] font-bold uppercase tracking-[0.28em] text-theme-muted">
        Tap a pillar to navigate
      </p>

      <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="ecosystemCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,169,244,0.35)" />
            <stop offset="100%" stopColor="rgba(5,28,44,0)" />
          </radialGradient>
        </defs>

        {/* Orbit ring */}
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(0,169,244,0.15)" strokeWidth="1" strokeDasharray="6 8" />

        {/* Connection lines */}
        {nodes.map((node) => {
          const rad = (node.angle * Math.PI) / 180
          const x = cx + radius * Math.cos(rad)
          const y = cy + radius * Math.sin(rad)
          const active = activeId === node.id
          return (
            <motion.line
              key={`line-${node.id}`}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke={active ? '#00a9f4' : 'rgba(255,255,255,0.12)'}
              strokeWidth={active ? 2 : 1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          )
        })}

        {/* Core */}
        <circle cx={cx} cy={cy} r={52} fill="url(#ecosystemCore)" />
        <circle cx={cx} cy={cy} r={52} fill="none" stroke="rgba(0,169,244,0.45)" strokeWidth="1.5" />
        <text x={cx} y={cy - 6} textAnchor="middle" className="fill-white font-display text-[22px] font-bold" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>
          {centerValue}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" className="fill-white/50 text-[9px] uppercase" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif', letterSpacing: '0.12em' }}>
          {centerLabel}
        </text>
      </svg>

      {/* Clickable nodes overlaid */}
      <div className="pointer-events-none absolute inset-0" role="navigation" aria-label="Forecast ecosystem navigation">
        {nodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180
          const xPct = ((cx + radius * Math.cos(rad)) / 320) * 100
          const yPct = ((cy + radius * Math.sin(rad)) / 320) * 100
          const Icon = node.icon
          const active = activeId === node.id

          return (
            <motion.button
              key={node.id}
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
              onClick={() => onNavigate(node.id)}
              className={cn(
                'pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-1 rounded-2xl px-3 py-2.5 transition-all duration-300',
                active
                  ? 'bg-mck-sky/20 ring-2 ring-mck-sky/50 shadow-[0_0_24px_rgba(0,169,244,0.35)]'
                  : 'bg-white/5 ring-1 ring-white/10 hover:bg-white/10 hover:ring-mck-sky/30 hover:shadow-[0_0_20px_rgba(0,169,244,0.2)]',
              )}
              style={{ left: `${xPct}%`, top: `${yPct}%` }}
            >
              <Icon className={cn('h-4 w-4', active ? 'text-mck-sky' : 'text-white/70')} />
              <span className="font-display text-[10px] font-bold uppercase tracking-wider text-white">{node.label}</span>
              <span className="hidden text-[9px] text-white/40 sm:block">{node.sublabel}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
