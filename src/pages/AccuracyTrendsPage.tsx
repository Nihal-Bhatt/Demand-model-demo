import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { AccuracyTrendChart } from '../components/AccuracyTrendChart'
import { ChartCard } from '../components/ChartCard'
import { ErrorComparisonChart, ForecastBucketChart } from '../components/ForecastBucketChart'
import { HorizonChart } from '../components/ModelMixChart'
import { PageHeader, PageShell } from '../components/shared'
import { agriCoData, forecastHorizons, LABELS } from '../data/mockData'
import { useChartTheme } from '../hooks/useChartTheme'
import { chartColors, mckColors } from '../theme/mckinsey'

const overUnderData = agriCoData.monthly
  .filter((m) => m.modelOverForecast > 0)
  .slice(-12)
  .map((m) => ({
    month: m.month,
    modelOver: m.modelOverForecast,
    salesTeamOver: m.salesTeamOverForecast,
    modelUnder: m.modelUnderForecast,
    salesTeamUnder: m.salesTeamUnderForecast,
  }))

export function AccuracyTrendsPage() {
  const theme = useChartTheme()

  return (
    <PageShell>
      <PageHeader
        title="Accuracy Trends"
        subtitle={`Model vs ${LABELS.salesTeam.toLowerCase()} performance over Jul'24 – Feb'26 backtest period`}
      />

      <section className="grid gap-6 xl:grid-cols-3">
        <ChartCard
          title="Accuracy Performance"
          subtitle="Volume weighted by value · monthly trend"
          className="xl:col-span-2"
          glow
        >
          <AccuracyTrendChart data={agriCoData.monthly} />
        </ChartCard>
        <ChartCard title="Forecast Horizon Accuracy" subtitle="N+1 / N+2 / N+3 breakdown">
          <HorizonChart data={forecastHorizons} />
        </ChartCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Forecast Accuracy Buckets" subtitle="Share of sales value by accuracy range">
          <ForecastBucketChart data={agriCoData.buckets} />
        </ChartCard>
        <ChartCard title="Model Error vs Sales Team Error" subtitle="Last 12 months">
          <ErrorComparisonChart data={agriCoData.monthly} />
        </ChartCard>
      </section>

      <ChartCard title="Over / Under Forecast Comparison" subtitle="Model vs sales team bias direction">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={overUnderData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: theme.tick, fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: theme.tick, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
            <Tooltip contentStyle={{ borderRadius: 12, background: theme.tooltip.background, border: theme.tooltip.border, color: theme.tooltip.color, boxShadow: theme.tooltip.boxShadow }} />
            <Legend wrapperStyle={{ color: theme.legend }} />
            <Line type="monotone" dataKey="modelOver" name="Model Over" stroke={chartColors.model} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="salesTeamOver" name="Sales Team Over" stroke={chartColors.rp} strokeWidth={2} strokeDasharray="5 5" dot={false} />
            <Line type="monotone" dataKey="modelUnder" name="Model Under" stroke={mckColors.teal} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="salesTeamUnder" name="Sales Team Under" stroke={mckColors.coral} strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Monthly Accuracy Gap" subtitle="Model minus sales team accuracy (positive = model better)">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={agriCoData.monthly.filter((m) => m.modelAccuracy > 0).slice(-12).map((m) => ({
              month: m.month,
              gap: m.modelAccuracy - m.salesTeamAccuracy,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: theme.tick, fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: theme.tick, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}pt`} />
            <Tooltip contentStyle={{ borderRadius: 12, background: theme.tooltip.background, border: theme.tooltip.border, color: theme.tooltip.color }} formatter={(v) => [`${v ?? 0} pts`, 'Accuracy gap']} />
            <Bar dataKey="gap" fill={mckColors.sky} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </PageShell>
  )
}
