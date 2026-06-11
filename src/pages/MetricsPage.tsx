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
import { AccuracyTrendChart } from '../components/AccuracyTrendChart'
import { ChartCard } from '../components/ChartCard'
import { ForecastBucketChart, ModelErrorChart } from '../components/ForecastBucketChart'
import { ModelMixChart, HorizonChart } from '../components/ModelMixChart'
import { PageHeader, PageShell } from '../components/shared'
import { useDashboard } from '../context/DashboardContext'
import { agriCoData, forecastHorizons, modelLeaderboard } from '../data/mockData'
import { useChartTheme } from '../hooks/useChartTheme'
import { formatPercent } from '../lib/utils'
import { chartColors, mckColors } from '../theme/mckinsey'
import { cn } from '../lib/utils'

const overUnderData = agriCoData.monthly
  .filter((m) => m.overForecast > 0)
  .slice(-12)
  .map((m) => ({
    month: m.month,
    overForecast: m.overForecast,
    underForecast: m.underForecast,
  }))

export function MetricsPage() {
  const theme = useChartTheme()
  const { navigate } = useDashboard()
  const data = agriCoData

  return (
    <PageShell>
      <PageHeader
        title="Metrics & Model Performance"
        subtitle="Accuracy trends, forecast bias, horizons, and algorithm selection — unique deep analytics"
      />

      <section className="grid gap-6 xl:grid-cols-3">
        <ChartCard title="Model Accuracy Trend" subtitle="Monthly backtest with optional bias overlay" className="xl:col-span-2" glow>
          <AccuracyTrendChart data={data.monthly} showBias />
        </ChartCard>
        <ChartCard title="Forecast Horizons" subtitle="N+1 / N+2 / N+3 accuracy decay">
          <HorizonChart data={forecastHorizons} target={data.summary.accuracyTarget} />
        </ChartCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Accuracy Distribution" subtitle="Sales value by accuracy bucket vs 75% target">
          <ForecastBucketChart data={data.buckets} target={data.summary.accuracyTarget} />
        </ChartCard>
        <ChartCard title="Model Error Rate" subtitle="100 − accuracy · last 12 months">
          <ModelErrorChart data={data.monthly} />
        </ChartCard>
      </section>

      <ChartCard title="Forecast Bias" subtitle="Over vs under-forecast rates by month">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={overUnderData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: theme.tick, fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: theme.tick, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
            <Tooltip contentStyle={{ borderRadius: 12, background: theme.tooltip.background, border: theme.tooltip.border, color: theme.tooltip.color }} />
            <Line type="monotone" dataKey="overForecast" name="Over-forecast" stroke={chartColors.model} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="underForecast" name="Under-forecast" stroke={mckColors.teal} strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <section className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Best Model Mix" subtitle="Share of SKUs by selected algorithm">
          <ModelMixChart data={data.models} />
        </ChartCard>

        <ChartCard
          title="Model Leaderboard"
          subtitle="Ranked by SKU coverage · click to explore products"
          action={
            <button type="button" onClick={() => navigate('sku')} className="btn-ghost text-xs">
              SKU Explorer
            </button>
          }
        >
          <div className="space-y-2">
            {modelLeaderboard.map((row) => (
              <button
                key={row.rank}
                type="button"
                onClick={() => navigate('sku')}
                className="flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-3 text-left ring-1 ring-[color:var(--border-subtle)] transition-all hover:ring-mck-sky/30"
                style={{ background: 'var(--surface-inset)' }}
              >
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-display text-sm font-bold',
                    row.rank === 1 && 'bg-mck-sky/20 text-mck-sky',
                    row.rank === 2 && 'bg-mck-blue/20 text-mck-blue',
                    row.rank === 3 && 'bg-mck-teal/20 text-mck-teal',
                    row.rank > 3 && 'bg-white/5 text-theme-secondary',
                  )}
                >
                  #{row.rank}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display font-bold text-theme-primary">{row.model}</p>
                  <p className="text-xs text-theme-secondary">{row.skus} SKUs · wMAPE {row.avgWmape.toFixed(2)}</p>
                </div>
                <span className="font-tabular text-sm font-bold text-mck-success">{formatPercent(row.accuracy)}</span>
              </button>
            ))}
          </div>
        </ChartCard>
      </section>

      <ChartCard title="Monthly Accuracy vs Target" subtitle="Portfolio progress toward 75% goal">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={data.monthly.filter((m) => m.modelAccuracy > 0).slice(-12).map((m) => ({
              month: m.month,
              accuracy: m.modelAccuracy,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: theme.tick, fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: theme.tick, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[60, 100]} />
            <Tooltip contentStyle={{ borderRadius: 12, background: theme.tooltip.background, border: theme.tooltip.border }} formatter={(v) => [`${v ?? 0}%`, 'Accuracy']} />
            <Bar dataKey="accuracy" fill={mckColors.sky} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </PageShell>
  )
}
