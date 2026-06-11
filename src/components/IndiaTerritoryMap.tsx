import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import { agriCoData, indiaMapRegions } from '../data/mockData'
import { cn, formatCr, formatPercent } from '../lib/utils'

const REGION_PATHS: Record<string, { d: string; labelX: number; labelY: number }> = {
  north: {
    d: 'M 118 28 L 168 22 L 195 48 L 188 78 L 155 92 L 118 85 L 95 58 Z',
    labelX: 145,
    labelY: 58,
  },
  central: {
    d: 'M 95 58 L 118 85 L 155 92 L 162 130 L 138 155 L 105 148 L 88 115 Z',
    labelX: 125,
    labelY: 115,
  },
  west: {
    d: 'M 55 72 L 95 58 L 88 115 L 72 145 L 42 138 L 38 98 Z',
    labelX: 68,
    labelY: 108,
  },
  south: {
    d: 'M 72 145 L 105 148 L 138 155 L 128 195 L 98 210 L 68 188 L 58 162 Z',
    labelX: 98,
    labelY: 178,
  },
}

function accuracyColor(acc: number, target: number): string {
  if (acc >= target + 5) return '#2e7d6f'
  if (acc >= target) return '#00a9f4'
  if (acc >= target - 5) return '#2251ff'
  return '#e8776a'
}

interface IndiaTerritoryMapProps {
  selectedRegionId?: string | null
  onRegionSelect?: (regionId: string, territories: string[]) => void
  onTerritoryNavigate?: (territory: string) => void
  onViewMetrics?: () => void
  compact?: boolean
}

export function IndiaTerritoryMap({
  selectedRegionId,
  onRegionSelect,
  onTerritoryNavigate,
  onViewMetrics,
  compact,
}: IndiaTerritoryMapProps) {
  const [hovered, setHovered] = useState<string | null>(null)
  const target = agriCoData.summary.accuracyTarget

  const regions = useMemo(
    () =>
      indiaMapRegions.map((meta) => {
        const territories = agriCoData.territories.filter((t) => meta.territories.includes(t.name))
        const accuracy = Math.round(territories.reduce((s, t) => s + t.modelAccuracy, 0) / territories.length)
        const salesCr = territories.reduce((s, t) => s + t.salesCr, 0)
        return { ...meta, accuracy, salesCr, territories }
      }),
    [],
  )

  const activeId = selectedRegionId ?? hovered
  const activeRegion = regions.find((r) => r.id === activeId)

  return (
    <div className={cn('relative', compact ? 'min-h-[280px]' : 'min-h-[360px]')}>
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-40" style={{ background: 'radial-gradient(circle at 60% 40%, rgba(0,169,244,0.12), transparent 65%)' }} />

      <svg viewBox="0 0 240 240" className="mx-auto h-full w-full max-w-[340px]" aria-label="India territory accuracy map">
        <defs>
          <filter id="mapGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Stylized India outline */}
        <path
          d="M 38 98 Q 30 130 42 138 L 58 162 L 68 188 L 98 210 L 128 195 L 138 155 L 162 130 L 155 92 L 188 78 L 195 48 L 168 22 L 118 28 L 95 58 L 55 72 Z"
          fill="none"
          stroke="rgba(0,169,244,0.25)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        {regions.map((region) => {
          const path = REGION_PATHS[region.id]
          if (!path) return null
          const isActive = activeId === region.id
          const fill = accuracyColor(region.accuracy, target)

          return (
            <g key={region.id}>
              <motion.path
                d={path.d}
                fill={fill}
                fillOpacity={isActive ? 0.85 : 0.55}
                stroke={isActive ? '#fff' : 'rgba(255,255,255,0.35)'}
                strokeWidth={isActive ? 2 : 1}
                filter={isActive ? 'url(#mapGlow)' : undefined}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHovered(region.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onRegionSelect?.(region.id, region.territories.map((t) => t.name))}
                whileHover={{ scale: 1.02 }}
                style={{ transformOrigin: `${path.labelX}px ${path.labelY}px` }}
              />
              <text
                x={path.labelX}
                y={path.labelY}
                textAnchor="middle"
                className="pointer-events-none select-none fill-white text-[9px] font-bold"
                style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}
              >
                {region.accuracy}%
              </text>
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="mt-2 flex flex-wrap justify-center gap-2 text-[10px]">
        {[
          { color: '#2e7d6f', label: `≥${target + 5}%` },
          { color: '#00a9f4', label: `≥${target}%` },
          { color: '#2251ff', label: `${target - 5}–${target}%` },
          { color: '#e8776a', label: `<${target - 5}%` },
        ].map((item) => (
          <span key={item.label} className="inline-flex items-center gap-1 text-theme-secondary">
            <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
            {item.label}
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeRegion && (
          <motion.div
            key={activeRegion.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-4 rounded-xl p-4 ring-1 ring-[color:var(--border-subtle)]"
            style={{ background: 'var(--surface-inset)' }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-sm font-bold text-theme-primary">{activeRegion.label} region</p>
                <p className="mt-1 text-xs text-theme-secondary">
                  {formatPercent(activeRegion.accuracy)} avg accuracy · {formatCr(activeRegion.salesCr)} sales
                </p>
              </div>
              {onViewMetrics && (
                <button type="button" onClick={onViewMetrics} className="btn-ghost !px-2 !py-1 text-xs">
                  Metrics
                  <ArrowRight className="h-3 w-3" />
                </button>
              )}
            </div>
            <div className="mt-3 space-y-1.5">
              {activeRegion.territories.map((t) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => onTerritoryNavigate?.(t.name)}
                  className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left transition-colors hover:bg-mck-sky/10"
                >
                  <span className="inline-flex items-center gap-2 text-sm text-theme-primary">
                    <MapPin className="h-3.5 w-3.5 text-mck-sky" />
                    {t.name}
                  </span>
                  <span className="font-tabular text-xs font-bold text-mck-sky">{formatPercent(t.modelAccuracy)}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
