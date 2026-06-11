import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useChartTheme } from '../hooks/useChartTheme'
import type { AccuracyBucket } from '../data/mockData'
import { LABELS } from '../data/mockData'
import { chartColors, mckColors } from '../theme/mckinsey'

interface ForecastBucketChartProps {
  data: AccuracyBucket[]
}

export function ForecastBucketChart({ data }: ForecastBucketChartProps) {
  const theme = useChartTheme()

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} barGap={8} barCategoryGap="18%" margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} vertical={false} />
        <XAxis dataKey="range" tick={{ fill: theme.tick, fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: theme.tick, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
        <Tooltip
          contentStyle={{ borderRadius: 12, background: theme.tooltip.background, border: theme.tooltip.border, color: theme.tooltip.color, boxShadow: theme.tooltip.boxShadow }}
          formatter={(value, name) => [`${value ?? 0}% sales`, name === 'modelShare' ? 'Model' : LABELS.salesTeam]}
        />
        <Legend
          formatter={(value) => (value === 'modelShare' ? 'Model Forecast' : LABELS.salesTeamForecast)}
          wrapperStyle={{ color: theme.legend }}
        />
        <Bar dataKey="modelShare" name="modelShare" fill={chartColors.model} radius={[8, 8, 0, 0]} />
        <Bar dataKey="salesTeamShare" name="salesTeamShare" fill={chartColors.rp} radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function ErrorComparisonChart({ data }: { data: { month: string; modelError: number; salesTeamError: number }[] }) {
  const theme = useChartTheme()
  const filtered = data.filter((d) => d.modelError > 0 || d.salesTeamError > 0)

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={filtered.slice(-12)} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} vertical={false} />
        <XAxis dataKey="month" tick={{ fill: theme.tick, fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: theme.tick, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
        <Tooltip
          contentStyle={{ borderRadius: 12, background: theme.tooltip.background, border: theme.tooltip.border, color: theme.tooltip.color, boxShadow: theme.tooltip.boxShadow }}
          formatter={(value, name) => [`${value ?? 0}%`, name === 'modelError' ? 'Model Error' : LABELS.salesTeamError]}
        />
        <Legend
          formatter={(value) => (value === 'modelError' ? 'Model Error' : LABELS.salesTeamError)}
          wrapperStyle={{ color: theme.legend }}
        />
        <Bar dataKey="modelError" fill={mckColors.blue} radius={[6, 6, 0, 0]} />
        <Bar dataKey="salesTeamError" fill={mckColors.coral} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
