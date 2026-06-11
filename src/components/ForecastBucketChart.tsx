import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useChartTheme } from '../hooks/useChartTheme'
import type { AccuracyBucket, MonthlyMetric } from '../data/mockData'
import { chartColors, mckColors } from '../theme/mckinsey'

interface ForecastBucketChartProps {
  data: AccuracyBucket[]
  target?: number
}

export function ForecastBucketChart({ data, target = 75 }: ForecastBucketChartProps) {
  const theme = useChartTheme()

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} barGap={8} barCategoryGap="18%" margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} vertical={false} />
        <XAxis dataKey="range" tick={{ fill: theme.tick, fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: theme.tick, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
        <Tooltip
          contentStyle={{ borderRadius: 12, background: theme.tooltip.background, border: theme.tooltip.border, color: theme.tooltip.color, boxShadow: theme.tooltip.boxShadow }}
          formatter={(value) => [`${value ?? 0}% of sales value`, 'Model forecast']}
        />
        <ReferenceLine y={target} stroke={mckColors.success} strokeDasharray="4 4" label={{ value: `Target ${target}%`, fill: theme.tick, fontSize: 10 }} />
        <Bar dataKey="modelShare" name="modelShare" fill={chartColors.model} radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function ModelErrorChart({ data }: { data: MonthlyMetric[] }) {
  const theme = useChartTheme()
  const filtered = data.filter((d) => d.modelError > 0).slice(-12)

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={filtered} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} vertical={false} />
        <XAxis dataKey="month" tick={{ fill: theme.tick, fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: theme.tick, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
        <Tooltip
          contentStyle={{ borderRadius: 12, background: theme.tooltip.background, border: theme.tooltip.border, color: theme.tooltip.color, boxShadow: theme.tooltip.boxShadow }}
          formatter={(value) => [`${value ?? 0}%`, 'Model error rate']}
        />
        <Bar dataKey="modelError" name="modelError" fill={mckColors.blue} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
