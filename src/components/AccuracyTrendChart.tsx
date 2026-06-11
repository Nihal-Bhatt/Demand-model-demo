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
import { LABELS } from '../data/mockData'
import { chartColors } from '../theme/mckinsey'

interface AccuracyTrendChartProps {
  data: MonthlyMetric[]
  compact?: boolean
}

export function AccuracyTrendChart({ data, compact }: AccuracyTrendChartProps) {
  const theme = useChartTheme()
  const filtered = data.filter((d) => d.modelAccuracy > 0 || d.salesTeamAccuracy > 0)
  const height = compact ? 240 : 320

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={filtered} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="modelFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={chartColors.model} stopOpacity={theme.isDark ? 0.45 : 0.35} />
            <stop offset="100%" stopColor={chartColors.model} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} vertical={false} />
        <XAxis dataKey="month" tick={{ fill: theme.tick, fontSize: 11 }} axisLine={false} tickLine={false} interval={compact ? 3 : 2} />
        <YAxis tick={{ fill: theme.tick, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
        <Tooltip
          contentStyle={{ borderRadius: 12, background: theme.tooltip.background, border: theme.tooltip.border, color: theme.tooltip.color, boxShadow: theme.tooltip.boxShadow }}
          formatter={(value) => [`${value ?? 0}%`, 'Accuracy']}
        />
        <Legend
          formatter={(value) =>
            value === 'modelAccuracy' ? 'Model Accuracy' : LABELS.salesTeamAccuracy
          }
          wrapperStyle={{ paddingTop: 12, color: theme.legend }}
        />
        <Area type="monotone" dataKey="modelAccuracy" stroke={chartColors.model} fill="url(#modelFill)" strokeWidth={2.5} dot={false} activeDot={{ r: 6, strokeWidth: 2, stroke: chartColors.model, fill: theme.isDark ? '#051C2C' : '#fff' }} />
        <Line type="monotone" dataKey="salesTeamAccuracy" stroke={chartColors.rp} strokeWidth={2} strokeDasharray="6 4" dot={false} activeDot={{ r: 6, strokeWidth: 0, fill: chartColors.rp }} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
