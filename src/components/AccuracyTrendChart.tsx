import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useChartTheme } from '../hooks/useChartTheme'
import type { MonthlyMetric } from '../data/mockData'
import { chartColors, mckColors } from '../theme/mckinsey'
import { cn } from '../lib/utils'

interface AccuracyTrendChartProps {
  data: MonthlyMetric[]
  compact?: boolean
  monthLimit?: number
  showBias?: boolean
}

const FONT = 'Plus Jakarta Sans, system-ui, sans-serif'

export function AccuracyTrendChart({ data, compact, monthLimit, showBias }: AccuracyTrendChartProps) {
  const theme = useChartTheme()
  const [showAccuracy, setShowAccuracy] = useState(true)
  const [showOver, setShowOver] = useState(false)
  const [showUnder, setShowUnder] = useState(false)

  const filtered = useMemo(() => {
    const rows = data.filter((d) => d.modelAccuracy > 0)
    return monthLimit ? rows.slice(-monthLimit) : rows
  }, [data, monthLimit])

  const height = compact ? 240 : 320

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setShowAccuracy((v) => !v)}
          className={cn(
            'cursor-pointer rounded-md px-2.5 py-1 text-xs font-semibold ring-1 transition-colors duration-200',
            showAccuracy
              ? 'bg-mck-sky/15 text-mck-sky ring-mck-sky/30'
              : 'text-theme-muted ring-[color:var(--border-subtle)] hover:text-theme-primary',
          )}
        >
          Accuracy
        </button>
        {(showBias) && (
          <>
            <button
              type="button"
              onClick={() => setShowOver((v) => !v)}
              className={cn(
                'cursor-pointer rounded-md px-2.5 py-1 text-xs font-semibold ring-1 transition-colors duration-200',
                showOver
                  ? 'bg-mck-blue/15 text-mck-blue ring-mck-blue/30'
                  : 'text-theme-muted ring-[color:var(--border-subtle)] hover:text-theme-primary',
              )}
            >
              Over-forecast
            </button>
            <button
              type="button"
              onClick={() => setShowUnder((v) => !v)}
              className={cn(
                'cursor-pointer rounded-md px-2.5 py-1 text-xs font-semibold ring-1 transition-colors duration-200',
                showUnder
                  ? 'bg-mck-teal/15 text-mck-teal ring-mck-teal/30'
                  : 'text-theme-muted ring-[color:var(--border-subtle)] hover:text-theme-primary',
              )}
            >
              Under-forecast
            </button>
          </>
        )}
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={filtered} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="modelFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartColors.model} stopOpacity={theme.isDark ? 0.4 : 0.28} />
              <stop offset="100%" stopColor={chartColors.model} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: theme.tick, fontSize: 10, fontFamily: FONT }}
            axisLine={false}
            tickLine={false}
            interval={compact ? 3 : 2}
          />
          <YAxis
            tick={{ fill: theme.tick, fontSize: 10, fontFamily: FONT }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 10,
              background: theme.tooltip.background,
              border: theme.tooltip.border,
              color: theme.tooltip.color,
              boxShadow: theme.tooltip.boxShadow,
              fontFamily: FONT,
              fontSize: 12,
            }}
            formatter={(value, name) => {
              const labels: Record<string, string> = {
                modelAccuracy: 'Model accuracy',
                overForecast: 'Over-forecast',
                underForecast: 'Under-forecast',
              }
              return [`${value ?? 0}%`, labels[String(name)] ?? String(name)]
            }}
            labelStyle={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, marginBottom: 4 }}
          />
          <Legend
            formatter={(value) => {
              const labels: Record<string, string> = {
                modelAccuracy: 'Model Accuracy',
                overForecast: 'Over-forecast bias',
                underForecast: 'Under-forecast bias',
              }
              return labels[value] ?? value
            }}
            wrapperStyle={{ paddingTop: 12, color: theme.legend, fontSize: 12, fontFamily: FONT }}
          />
          {showAccuracy && (
            <Area
              type="monotone"
              dataKey="modelAccuracy"
              name="modelAccuracy"
              stroke={chartColors.model}
              fill="url(#modelFill)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 2, stroke: chartColors.model, fill: theme.isDark ? mckColors.navy : '#fff' }}
            />
          )}
          {showOver && (
            <Line
              type="monotone"
              dataKey="overForecast"
              name="overForecast"
              stroke={mckColors.blue}
              strokeWidth={2}
              strokeDasharray="6 3"
              dot={false}
            />
          )}
          {showUnder && (
            <Line
              type="monotone"
              dataKey="underForecast"
              name="underForecast"
              stroke={mckColors.teal}
              strokeWidth={2}
              strokeDasharray="6 3"
              dot={false}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
