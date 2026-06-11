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
import { chartColors, mckColors } from '../theme/mckinsey'

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
            <stop offset="0%" stopColor={chartColors.model} stopOpacity={theme.isDark ? 0.4 : 0.28} />
            <stop offset="100%" stopColor={chartColors.model} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: theme.tick, fontSize: 10, fontFamily: 'Fira Code, monospace' }}
          axisLine={false}
          tickLine={false}
          interval={compact ? 3 : 2}
        />
        <YAxis
          tick={{ fill: theme.tick, fontSize: 10, fontFamily: 'Fira Code, monospace' }}
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
            fontFamily: 'Fira Sans, sans-serif',
            fontSize: 12,
          }}
          formatter={(value, name) => [
            `${value ?? 0}%`,
            name === 'modelAccuracy' ? 'Model' : LABELS.salesTeam,
          ]}
          labelStyle={{ fontFamily: 'Fira Code, monospace', fontSize: 11, marginBottom: 4 }}
        />
        <Legend
          formatter={(value) =>
            value === 'modelAccuracy' ? 'Model Accuracy' : LABELS.salesTeamAccuracy
          }
          wrapperStyle={{ paddingTop: 12, color: theme.legend, fontSize: 12, fontFamily: 'Fira Sans, sans-serif' }}
        />
        <Area
          type="monotone"
          dataKey="modelAccuracy"
          name="modelAccuracy"
          stroke={chartColors.model}
          fill="url(#modelFill)"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5, strokeWidth: 2, stroke: chartColors.model, fill: theme.isDark ? mckColors.navy : '#fff' }}
        />
        <Line
          type="monotone"
          dataKey="salesTeamAccuracy"
          name="salesTeamAccuracy"
          stroke={chartColors.rp}
          strokeWidth={2}
          strokeDasharray="8 4"
          dot={false}
          activeDot={{ r: 5, strokeWidth: 0, fill: chartColors.rp }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
