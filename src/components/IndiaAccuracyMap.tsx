import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, MapPin, ZoomIn } from 'lucide-react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps'
import {
  getMetricColor,
  getMetricValue,
  INDIA_GEO_URL,
  mapMetricLabels,
  normalizeStateName,
  stateMetricsMap,
  type MapMetric,
  type StateMetrics,
  type TerritoryPoint,
} from '../data/indiaMapData'
import { LABELS } from '../data/mockData'
import { useTheme } from '../context/ThemeContext'
import { cn, formatCr, formatPercent } from '../lib/utils'

const DEFAULT_CENTER: [number, number] = [82, 23]
const DEFAULT_ZOOM = 1

function getStateFromGeo(properties: Record<string, string>): string {
  const raw = properties.ST_NM || properties.st_nm || properties.NAME_1 || properties.name || ''
  return normalizeStateName(raw)
}

function territoryCentroid(territories: TerritoryPoint[]): [number, number] {
  const lng = territories.reduce((s, t) => s + t.coordinates[0], 0) / territories.length
  const lat = territories.reduce((s, t) => s + t.coordinates[1], 0) / territories.length
  return [lng, lat]
}

export function IndiaAccuracyMap() {
  const { isDark } = useTheme()
  const [metric, setMetric] = useState<MapMetric>('modelAccuracy')
  const [selectedState, setSelectedState] = useState<StateMetrics | null>(null)
  const [hoveredState, setHoveredState] = useState<StateMetrics | null>(null)
  const [hoveredTerritory, setHoveredTerritory] = useState<TerritoryPoint | null>(null)
  const [center, setCenter] = useState<[number, number]>(DEFAULT_CENTER)
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)

  const handleStateClick = (stateData: StateMetrics | undefined) => {
    if (!stateData) return
    setSelectedState(stateData)
    setCenter(territoryCentroid(stateData.territories))
    setZoom(3.2)
  }

  const handleBack = () => {
    setSelectedState(null)
    setHoveredTerritory(null)
    setCenter(DEFAULT_CENTER)
    setZoom(DEFAULT_ZOOM)
  }

  const activeTooltip = hoveredTerritory ?? hoveredState

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {selectedState && (
            <button type="button" onClick={handleBack} className="btn-ghost !py-1.5 !text-xs">
              <ArrowLeft className="h-3.5 w-3.5" />
              All India
            </button>
          )}
          <span className="font-display text-sm font-semibold text-theme-primary">
            {selectedState ? selectedState.state : 'India — State Heatmap'}
          </span>
          {selectedState && (
            <span className="stat-pill">
              <ZoomIn className="h-3 w-3" />
              Territory drill-down
            </span>
          )}
        </div>

        <div className="inline-flex flex-wrap gap-1 rounded-xl p-1 ring-1 ring-[color:var(--border-subtle)]" style={{ background: 'var(--surface-inset)' }}>
          {(Object.keys(mapMetricLabels) as MapMetric[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMetric(m)}
              className={cn(
                'cursor-pointer rounded-lg px-3 py-1.5 font-display text-xs font-semibold transition-all duration-200',
                metric === m
                  ? 'bg-gradient-to-r from-mck-sky to-mck-blue text-white shadow-md shadow-mck-sky/25'
                  : 'text-theme-secondary hover:text-theme-primary',
              )}
            >
              {mapMetricLabels[m]}
            </button>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl ring-1 ring-[color:var(--border-subtle)]" style={{ background: isDark ? 'rgba(5,28,44,0.6)' : 'rgba(238,244,250,0.8)' }}>
        {/* Tooltip panel */}
        <AnimatePresence>
          {activeTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              className="absolute right-4 top-4 z-10 w-56 rounded-xl p-4 ring-1 ring-mck-sky/30 backdrop-blur-xl"
              style={{ background: isDark ? 'rgba(14,46,74,0.92)' : 'rgba(255,255,255,0.95)' }}
            >
              {'territories' in activeTooltip ? (
                <>
                  <p className="font-display text-sm font-bold text-theme-primary">{activeTooltip.state}</p>
                  <div className="mt-3 space-y-2 font-mono text-xs">
                    <MetricRow label={mapMetricLabels[metric]} value={`${getMetricValue(activeTooltip, metric)}${metric === 'salesShare' ? '%' : metric === 'wmape' ? '' : '%'}`} />
                    <MetricRow label="Model accuracy" value={formatPercent(activeTooltip.modelAccuracy)} accent="sky" />
                    <MetricRow label={LABELS.salesTeamAccuracy} value={formatPercent(activeTooltip.salesTeamAccuracy)} accent="coral" />
                    <MetricRow label="Sales" value={formatCr(activeTooltip.salesCr)} />
                  </div>
                  <p className="mt-3 font-display text-[10px] uppercase tracking-wider text-mck-sky">Click to drill down</p>
                </>
              ) : (
                <>
                  <p className="flex items-center gap-1.5 font-display text-sm font-bold text-theme-primary">
                    <MapPin className="h-3.5 w-3.5 text-mck-sky" />
                    {activeTooltip.name}
                  </p>
                  <div className="mt-3 space-y-2 font-mono text-xs">
                    <MetricRow label="Model" value={formatPercent(activeTooltip.modelAccuracy)} accent="sky" />
                    <MetricRow label={LABELS.salesTeam} value={formatPercent(activeTooltip.salesTeamAccuracy)} accent="coral" />
                    <MetricRow label="Improvement" value={`+${formatPercent(activeTooltip.improvement)}`} accent="success" />
                    <MetricRow label="Sales" value={formatCr(activeTooltip.salesCr)} />
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 900, center: [82, 22] }}
          width={800}
          height={520}
          className="mx-auto h-auto w-full max-w-full"
        >
          <ZoomableGroup center={center} zoom={zoom} minZoom={0.8} maxZoom={6}>
            <Geographies geography={INDIA_GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateName = getStateFromGeo(geo.properties)
                  const stateData = stateMetricsMap.get(stateName.toLowerCase())
                  const value = stateData ? getMetricValue(stateData, metric) : null
                  const fill = value !== null ? getMetricColor(value, metric) : isDark ? '#0a1628' : '#d0d8e4'
                  const isSelected = selectedState?.state === stateName
                  const dimmed = selectedState && !isSelected

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fill}
                      stroke={isDark ? 'rgba(0,169,244,0.25)' : 'rgba(5,28,44,0.15)'}
                      strokeWidth={isSelected ? 1.2 : 0.4}
                      style={{
                        default: { outline: 'none', opacity: dimmed ? 0.15 : 0.92, transition: 'all 250ms' },
                        hover: { outline: 'none', opacity: dimmed ? 0.15 : 1, filter: 'brightness(1.15)', cursor: stateData ? 'pointer' : 'default' },
                        pressed: { outline: 'none' },
                      }}
                      onMouseEnter={() => stateData && setHoveredState(stateData)}
                      onMouseLeave={() => setHoveredState(null)}
                      onClick={() => {
                        if (stateData) handleStateClick(stateData)
                      }}
                    />
                  )
                })
              }
            </Geographies>

            {/* Territory markers when drilled in */}
            {selectedState?.territories.map((t) => (
              <Marker
                key={t.id}
                coordinates={t.coordinates}
                onMouseEnter={() => setHoveredTerritory(t)}
                onMouseLeave={() => setHoveredTerritory(null)}
              >
                <g className="cursor-pointer">
                  <circle r={14 / zoom} fill="rgba(0,169,244,0.2)" className="animate-pulse" />
                  <circle r={6 / zoom} fill="#00A9F4" stroke="#fff" strokeWidth={1.5 / zoom} />
                  <circle r={2.5 / zoom} fill="#fff" />
                </g>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--border-subtle)] px-4 py-3">
          <p className="font-display text-xs font-semibold text-theme-secondary">
            {mapMetricLabels[metric]} · darker = lower · brighter blue = higher
          </p>
          <div className="flex items-center gap-1">
            {['#0E2E4A', '#1A3D5C', '#6BAED6', '#2251FF', '#00A9F4'].map((c) => (
              <div key={c} className="h-3 w-8 first:rounded-l-md last:rounded-r-md" style={{ background: c }} />
            ))}
          </div>
        </div>
      </div>

      {/* State summary chips when drilled */}
      {selectedState && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {selectedState.territories.map((t) => (
            <button
              key={t.id}
              type="button"
              onMouseEnter={() => setHoveredTerritory(t)}
              onMouseLeave={() => setHoveredTerritory(null)}
              className="elevated-card cursor-pointer p-4 text-left transition-all hover:ring-mck-sky/40"
            >
              <p className="flex items-center gap-2 font-display text-sm font-bold text-theme-primary">
                <MapPin className="h-4 w-4 text-mck-sky" />
                {t.name}
              </p>
              <div className="mt-2 flex justify-between font-mono text-xs">
                <span className="text-mck-sky">{formatPercent(t.modelAccuracy)} model</span>
                <span className="text-mck-success">+{formatPercent(t.improvement)}</span>
              </div>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  )
}

function MetricRow({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: 'sky' | 'coral' | 'success'
}) {
  const colors = { sky: 'text-mck-sky', coral: 'text-mck-coral', success: 'text-mck-success' }
  return (
    <div className="flex justify-between gap-2">
      <span className="text-theme-secondary">{label}</span>
      <span className={cn('font-semibold', accent ? colors[accent] : 'text-theme-primary')}>{value}</span>
    </div>
  )
}
