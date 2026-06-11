import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { AgriPageHero } from '../components/agri/AgriIllustrations'
import { AccuracyTrendChart } from '../components/AccuracyTrendChart'
import { ChartCard } from '../components/ChartCard'
import { ForecastBucketChart, ModelErrorChart } from '../components/ForecastBucketChart'
import { HorizonChart } from '../components/ModelMixChart'
import { MetricFlowBar } from '../components/MetricFlowBar'
import { PageShell } from '../components/shared'
import { useDashboard } from '../context/DashboardContext'
import { agriCoData, forecastHorizons } from '../data/mockData'
import { useChartTheme } from '../hooks/useChartTheme'
import { chartColors, mckColors } from '../theme/mckinsey'

const overUnderData = agriCoData.monthly
  .filter((m) => m.overForecast > 0)
  .slice(-12)
  .map((m) => ({
    month: m.month,
    overForecast: m.overForecast,
    underForecast: m.underForecast,
  }))

export function AccuracyTrendsPage() {
  const theme = useChartTheme()
  const { navigate } = useDashboard()
  const data = agriCoData

  return (
    <PageShell>
      <MetricFlowBar compact />

      <AgriPageHero
        title="Accuracy & forecast bias"
        subtitle="Step 1–2 of metric flow · model accuracy then over/under-forecast bias"
      />

      <section className="grid gap-6 xl:grid-cols-3">
        <ChartCard
          title="Model Accuracy Trend"
          subtitle="Volume weighted by value · monthly backtest"
          className="xl:col-span-2"
          glow
        >
          <AccuracyTrendChart data={data.monthly} showBias />
        </ChartCard>
        <ChartCard
          title="Horizon Accuracy"
          subtitle="N+1 / N+2 / N+3 breakdown"
          action={
            <button type="button" onClick={() => navigate('forecast', { metricStep: 'horizon' })} className="btn-ghost text-xs">
              Forecast analysis
            </button>
          }
        >
          <HorizonChart
            data={forecastHorizons}
            target={data.summary.accuracyTarget}
            onHorizonClick={() => navigate('forecast', { metricStep: 'horizon' })}
          />
        </ChartCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Accuracy Distribution" subtitle="Share of sales value by accuracy bucket">
          <ForecastBucketChart data={data.buckets} target={data.summary.accuracyTarget} />
        </ChartCard>
        <ChartCard title="Model Error Rate" subtitle="Last 12 months · 100 − accuracy">
          <ModelErrorChart data={data.monthly} />
        </ChartCard>
      </section>

      <ChartCard title="Forecast Bias Direction" subtitle="Over vs under-forecast rates by month">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={overUnderData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: theme.tick, fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: theme.tick, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
            <Tooltip contentStyle={{ borderRadius: 12, background: theme.tooltip.background, border: theme.tooltip.border, color: theme.tooltip.color, boxShadow: theme.tooltip.boxShadow }} />
            <Line type="monotone" dataKey="overForecast" name="Over-forecast" stroke={chartColors.model} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="underForecast" name="Under-forecast" stroke={mckColors.teal} strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Monthly Accuracy Progress" subtitle="Model accuracy vs 75% target">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={data.monthly.filter((m) => m.modelAccuracy > 0).slice(-12).map((m) => ({
              month: m.month,
              accuracy: m.modelAccuracy,
              target: data.summary.accuracyTarget,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: theme.tick, fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: theme.tick, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[60, 100]} />
            <Tooltip contentStyle={{ borderRadius: 12, background: theme.tooltip.background, border: theme.tooltip.border, color: theme.tooltip.color }} formatter={(v) => [`${v ?? 0}%`, 'Model accuracy']} />
            <Bar dataKey="accuracy" fill={mckColors.sky} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </PageShell>
  )
}
