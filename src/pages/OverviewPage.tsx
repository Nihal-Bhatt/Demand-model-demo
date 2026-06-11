import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  BarChart3,
  BrainCircuit,
  PackageSearch,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { CropRowIcon, FarmerIcon, SprayIcon } from '../components/agri/AgriIllustrations'
import { CategoryIllustration } from '../components/agri/AgriIllustrations'
import { ChartCard } from '../components/ChartCard'
import { FindingCard } from '../components/FindingCard'
import { IndiaTerritoryMap } from '../components/IndiaTerritoryMap'
import { MetricRing } from '../components/MetricRing'
import { PageShell } from '../components/shared'
import { useDashboard } from '../context/DashboardContext'
import {
  agriCoData,
  forecastHorizons,
  pipelineSteps,
  shapGlobalImportance,
} from '../data/mockData'
import { useChartTheme } from '../hooks/useChartTheme'
import { formatPercent } from '../lib/utils'
import { chartColors } from '../theme/mckinsey'

export function OverviewPage() {
  const data = agriCoData
  const theme = useChartTheme()
  const { navigate, setSelectedTerritory } = useDashboard()
  const [mapRegion, setMapRegion] = useState<string | null>(null)

  const sparkData = useMemo(
    () => data.monthly.filter((m) => m.modelAccuracy > 0).slice(-8),
    [data.monthly],
  )

  const topSkus = useMemo(() => [...data.skus].sort((a, b) => b.modelAccuracy - a.modelAccuracy).slice(0, 4), [data.skus])
  const topDrivers = shapGlobalImportance.slice(0, 3)
  const pipelineRunning = pipelineSteps.find((s) => s.status === 'running')
  const horizonSummary = forecastHorizons.map((h) => `${h.horizon} ${h.modelAccuracy}%`).join(' · ')

  return (
    <PageShell>
      {/* Hero summary strip */}
      <section className="relative overflow-hidden rounded-2xl gradient-mck-glow px-6 py-8 lg:px-10">
        <div className="pointer-events-none absolute -right-6 top-4 opacity-20">
          <CropRowIcon size={140} />
        </div>
        <div className="pointer-events-none absolute right-32 top-8 opacity-15">
          <FarmerIcon size={90} />
        </div>
        <div className="pointer-events-none absolute bottom-2 left-8 opacity-15">
          <SprayIcon size={64} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-2xl"
        >
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-mck-sky/80">Portfolio Summary</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white lg:text-4xl">
            Model accuracy at{' '}
            <span className="text-gradient-mck">{formatPercent(data.summary.modelAccuracy)}</span>
          </h1>
          <p className="mt-3 font-body text-sm leading-relaxed text-white/60">
            {data.summary.totalSkus.toLocaleString()} SKUs · {data.summary.totalTerritories} territories ·{' '}
            {data.period} backtest · target {formatPercent(data.summary.accuracyTarget)}
          </p>
        </motion.div>

        <div className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
          <MetricRing
            label="Accuracy"
            value={data.summary.modelAccuracy}
            accent="sky"
            sublabel={`Target ${formatPercent(data.summary.accuracyTarget)}`}
            onClick={() => navigate('metrics')}
            delay={0.1}
          />
          <MetricRing
            label="wMAPE"
            value={Math.round((1 - data.summary.wmape) * 100)}
            accent="blue"
            sublabel={`Raw ${data.summary.wmape.toFixed(2)}`}
            onClick={() => navigate('metrics')}
            delay={0.15}
          />
          <MetricRing
            label="Coverage"
            value={data.summary.highAccuracyCoverage}
            accent="success"
            sublabel="Sales in >60% bucket"
            onClick={() => navigate('metrics')}
            delay={0.2}
          />
          <MetricRing
            label="Bias"
            value={data.summary.overForecastRate}
            accent="coral"
            sublabel={`Under ${data.summary.underForecastRate}%`}
            onClick={() => navigate('metrics')}
            delay={0.25}
          />
        </div>
      </section>

      {/* Map + findings */}
      <section className="grid gap-4 lg:grid-cols-5">
        <ChartCard
          title="India Territory Heatmap"
          subtitle="Click a region to drill into territories"
          className="lg:col-span-3"
          glow
        >
          <IndiaTerritoryMap
            selectedRegionId={mapRegion}
            onRegionSelect={(id) => setMapRegion(id)}
            onTerritoryNavigate={(name) => {
              setSelectedTerritory(name)
              navigate('sku', { territory: name })
            }}
            onViewMetrics={() => navigate('metrics')}
          />
        </ChartCard>

        <div className="flex flex-col gap-3 lg:col-span-2">
          <p className="font-display text-xs font-bold uppercase tracking-wider text-theme-secondary">Key Findings</p>
          <FindingCard
            title="Accuracy Trend"
            metric={`${sparkData[sparkData.length - 1]?.modelAccuracy ?? 0}% latest`}
            detail={`+${(sparkData[sparkData.length - 1]?.modelAccuracy ?? 0) - (sparkData[0]?.modelAccuracy ?? 0)} pts over 8 months · view full bias & error analysis`}
            accent="sky"
            icon={<TrendingUp className="h-5 w-5 text-mck-sky" />}
            onClick={() => navigate('metrics')}
            delay={0.1}
          />
          <FindingCard
            title="Horizon Performance"
            metric={horizonSummary}
            detail="N+1 strongest · N+3 decays as expected · model mix & leaderboard in Metrics"
            accent="blue"
            icon={<BarChart3 className="h-5 w-5 text-mck-blue" />}
            onClick={() => navigate('metrics')}
            delay={0.15}
          />
          <FindingCard
            title="Top Forecast Drivers"
            metric={topDrivers[0]?.feature.replace(/_/g, ' ') ?? '—'}
            detail={`${(topDrivers[0]?.shap ?? 0) * 100}% mean |SHAP| · rainfall & seasonality follow · full SHAP in Drivers`}
            accent="success"
            icon={<BrainCircuit className="h-5 w-5 text-mck-success" />}
            onClick={() => navigate('drivers')}
            delay={0.2}
          />
          <FindingCard
            title="Pipeline"
            metric={pipelineRunning?.name ?? 'Idle'}
            detail={`${pipelineSteps.filter((s) => s.status === 'complete').length}/${pipelineSteps.length} steps complete · RUN-2847 in progress`}
            accent="amber"
            icon={<Activity className="h-5 w-5 text-mck-amber" />}
            onClick={() => navigate('pipeline')}
            delay={0.25}
          />
        </div>
      </section>

      {/* Sparkline + top SKUs */}
      <section className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Accuracy Pulse" subtitle="Last 8 months · tap for detailed metrics">
          <button type="button" onClick={() => navigate('metrics')} className="block w-full cursor-pointer">
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={sparkData}>
                <defs>
                  <linearGradient id="pulseFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartColors.model} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={chartColors.model} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    background: theme.tooltip.background,
                    border: theme.tooltip.border,
                    fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
                    fontSize: 12,
                  }}
                  formatter={(v) => [`${v}%`, 'Accuracy']}
                />
                <Area type="monotone" dataKey="modelAccuracy" stroke={chartColors.model} fill="url(#pulseFill)" strokeWidth={2.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </button>
        </ChartCard>

        <ChartCard
          title="Top SKUs by Accuracy"
          subtitle="Click any product for deep dive"
          action={
            <button type="button" onClick={() => navigate('sku')} className="btn-ghost text-xs">
              All SKUs
            </button>
          }
        >
          <div className="grid gap-2 sm:grid-cols-2">
            {topSkus.map((sku, i) => (
              <motion.button
                key={sku.sku}
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                onClick={() => navigate('sku', { skuId: sku.sku })}
                className="flex cursor-pointer items-center gap-3 rounded-xl p-3 text-left ring-1 ring-[color:var(--border-subtle)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)] hover:ring-mck-sky/30"
                style={{ background: 'var(--surface-inset)' }}
              >
                <CategoryIllustration category={sku.category} size={32} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-bold text-theme-primary">{sku.product}</p>
                  <p className="text-[10px] text-theme-secondary">{sku.sku} · {sku.bestModel}</p>
                </div>
                <span className="font-tabular text-sm font-bold text-mck-sky">{formatPercent(sku.modelAccuracy)}</span>
              </motion.button>
            ))}
          </div>
        </ChartCard>
      </section>

      {/* Quick nav tiles */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { id: 'metrics' as const, label: 'Metrics & Models', desc: 'Trends, bias, horizons, leaderboard', icon: BarChart3 },
          { id: 'sku' as const, label: 'SKU Explorer', desc: 'Product deep dives & review queue', icon: PackageSearch },
          { id: 'drivers' as const, label: 'Forecast Drivers', desc: 'SHAP, features, external data', icon: Sparkles },
          { id: 'pipeline' as const, label: 'Pipeline', desc: 'Thunderbird run status', icon: Activity },
        ].map(({ id, label, desc, icon: Icon }, i) => (
          <motion.button
            key={id}
            type="button"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            onClick={() => navigate(id)}
            className="elevated-card elevated-card-interactive flex items-start gap-3 p-5 text-left"
          >
            <div className="rounded-xl bg-mck-sky/15 p-2.5 ring-1 ring-mck-sky/25">
              <Icon className="h-5 w-5 text-mck-sky" />
            </div>
            <div>
              <p className="font-display font-bold text-theme-primary">{label}</p>
              <p className="mt-1 text-xs text-theme-secondary">{desc}</p>
            </div>
          </motion.button>
        ))}
      </section>
    </PageShell>
  )
}
