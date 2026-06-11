import { useId } from 'react'
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
  const uid = useId().replace(/:/g, '')
  const radius = 100
  const cx = 150
  const cy = 150
  const size = 300

  return (
    <div className="ecosystem-nav w-full">
      <div className="relative mx-auto h-[300px] w-full max-w-[300px]">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <radialGradient id={`ecosystemCore-${uid}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,169,244,0.4)" />
              <stop offset="100%" stopColor="rgba(5,28,44,0)" />
            </radialGradient>
          </defs>

          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="rgba(0,169,244,0.12)"
            strokeWidth="1"
            strokeDasharray="5 7"
          />

          {nodes.map((node) => {
            const rad = (node.angle * Math.PI) / 180
            const x = cx + radius * Math.cos(rad)
            const y = cy + radius * Math.sin(rad)
            const active = activeId === node.id
            const innerR = 38
            const dx = x - cx
            const dy = y - cy
            const dist = Math.sqrt(dx * dx + dy * dy)
            const stopX = cx + (dx / dist) * innerR
            const stopY = cy + (dy / dist) * innerR

            return (
              <motion.line
                key={`line-${node.id}`}
                x1={stopX}
                y1={stopY}
                x2={x}
                y2={y}
                stroke={active ? '#00a9f4' : 'rgba(255,255,255,0.15)'}
                strokeWidth={active ? 1.5 : 1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              />
            )
          })}

          <circle cx={cx} cy={cy} r={38} fill={`url(#ecosystemCore-${uid})`} />
          <circle cx={cx} cy={cy} r={38} fill="none" stroke="rgba(0,169,244,0.5)" strokeWidth="1.5" />
          <text
            x={cx}
            y={cy - 4}
            textAnchor="middle"
            fill="white"
            style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif', fontSize: 18, fontWeight: 700 }}
          >
            {centerValue}
          </text>
          <text
            x={cx}
            y={cy + 12}
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif', fontSize: 8, letterSpacing: '0.14em' }}
          >
            {centerLabel.toUpperCase()}
          </text>
        </svg>

        <div className="absolute inset-0" role="navigation" aria-label="Forecast ecosystem navigation">
          {nodes.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180
            const xPct = ((cx + radius * Math.cos(rad)) / size) * 100
            const yPct = ((cy + radius * Math.sin(rad)) / size) * 100
            const Icon = node.icon
            const active = activeId === node.id

            return (
              <motion.button
                key={node.id}
                type="button"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.35 }}
                onClick={() => onNavigate(node.id)}
                className={cn(
                  'absolute z-10 flex min-w-[72px] -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-0.5 rounded-xl px-2.5 py-2 backdrop-blur-md transition-all duration-300',
                  active
                    ? 'bg-mck-sky/25 ring-1 ring-mck-sky/60 shadow-[0_0_20px_rgba(0,169,244,0.35)]'
                    : 'bg-[rgba(5,28,44,0.75)] ring-1 ring-white/12 hover:bg-white/10 hover:ring-mck-sky/35',
                )}
                style={{ left: `${xPct}%`, top: `${yPct}%` }}
              >
                <Icon className={cn('h-3.5 w-3.5', active ? 'text-mck-sky' : 'text-white/75')} />
                <span className="font-display text-[9px] font-bold uppercase tracking-wide text-white">{node.label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
