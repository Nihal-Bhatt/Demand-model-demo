import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, BarChart3, BrainCircuit, TrendingUp } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts'
import { CategoryIllustration } from '../components/agri/AgriIllustrations'
import { ChartCard } from '../components/ChartCard'
import { FindingCard } from '../components/FindingCard'
import { IndiaTerritoryMap } from '../components/IndiaTerritoryMap'
import { MetricRing } from '../components/MetricRing'
import { AgriFloatField } from '../components/storytelling/AgriFloatField'
import { EditorialHero } from '../components/storytelling/EditorialHero'
import { StorySection } from '../components/storytelling/StorySection'
import { PageShell } from '../components/shared'
import { useDashboard } from '../context/DashboardContext'
import type { NavSection } from '../data/mockData'
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

  const topSkus = useMemo(
    () => [...data.skus].sort((a, b) => b.modelAccuracy - a.modelAccuracy).slice(0, 4),
    [data.skus],
  )
  const topDrivers = shapGlobalImportance.slice(0, 3)
  const pipelineRunning = pipelineSteps.find((s) => s.status === 'running')
  const horizonSummary = forecastHorizons.map((h) => `${h.horizon} ${h.modelAccuracy}%`).join(' · ')

  const scrollToChapter = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const goTo = (section: string) => navigate(section as NavSection)

  return (
    <PageShell className="gap-8 lg:gap-10">
      <div className="relative">
        <AgriFloatField />
        <EditorialHero
          lines={['Demand forecasting', 'command center']}
          accentLine={0}
          badge="AgriCo · Forecast Command"
          subtitle={`${formatPercent(data.summary.modelAccuracy)} model accuracy · ${data.summary.totalSkus.toLocaleString()} crop protection SKUs · ${data.period}`}
          onExplore={() => scrollToChapter('chapter-territory')}
          compact
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <MetricRing label="Accuracy" value={data.summary.modelAccuracy} accent="sky" sublabel={`Target ${formatPercent(data.summary.accuracyTarget)}`} onClick={() => goTo('metrics')} delay={0.15} size="hero" />
            <MetricRing label="wMAPE" value={Math.round((1 - data.summary.wmape) * 100)} accent="blue" sublabel={`Raw ${data.summary.wmape.toFixed(2)}`} onClick={() => goTo('metrics')} delay={0.2} size="hero" />
            <MetricRing label="Coverage" value={data.summary.highAccuracyCoverage} accent="success" sublabel=">60% bucket" onClick={() => goTo('metrics')} delay={0.25} size="hero" />
            <MetricRing label="Bias" value={data.summary.overForecastRate} accent="coral" sublabel={`Under ${data.summary.underForecastRate}%`} onClick={() => goTo('metrics')} delay={0.3} size="hero" />
          </div>
        </EditorialHero>
      </div>

      <StorySection
        id="chapter-territory"
        chapter="01 · Territory"
        title="India demand intelligence"
        subtitle="Click regions to drill into territories and SKUs"
      >
        <div className="grid gap-4 lg:grid-cols-5">
          <ChartCard title="Regional heatmap" subtitle="Accuracy by agro-climatic zone" className="lg:col-span-3" glow>
            <IndiaTerritoryMap
              selectedRegionId={mapRegion}
              onRegionSelect={(id) => setMapRegion(id)}
              onTerritoryNavigate={(name) => {
                setSelectedTerritory(name)
                goTo('sku')
              }}
              onViewMetrics={() => goTo('metrics')}
            />
          </ChartCard>

          <div className="flex flex-col gap-3 lg:col-span-2">
            {data.territories.slice(0, 4).map((t, i) => (
              <motion.button
                key={t.name}
                type="button"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                onClick={() => {
                  setSelectedTerritory(t.name)
                  goTo('sku')
                }}
                className="territory-stat flex cursor-pointer items-center justify-between text-left"
              >
                <div>
                  <p className="font-display text-sm font-bold text-theme-primary">{t.name}</p>
                  <p className="mt-0.5 text-xs text-theme-secondary">{t.skuCount} SKUs · {formatPercent(t.salesShare, 1)} share</p>
                </div>
                <span className="font-tabular text-lg font-bold text-mck-sky">{formatPercent(t.modelAccuracy)}</span>
              </motion.button>
            ))}
            <button type="button" onClick={() => goTo('metrics')} className="btn-ghost mt-1 text-xs">
              View all territories in Metrics
            </button>
          </div>
        </div>
      </StorySection>

      <StorySection
        id="chapter-findings"
        chapter="02 · Findings"
        title="What the model tells us"
        subtitle="Each insight links to its dedicated view"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <FindingCard
            title="Accuracy Trend"
            metric={`${sparkData[sparkData.length - 1]?.modelAccuracy ?? 0}% latest`}
            detail={`+${(sparkData[sparkData.length - 1]?.modelAccuracy ?? 0) - (sparkData[0]?.modelAccuracy ?? 0)} pts over 8 months`}
            accent="sky"
            icon={<TrendingUp className="h-5 w-5 text-mck-sky" />}
            onClick={() => goTo('metrics')}
            delay={0.05}
          />
          <FindingCard
            title="Horizon Performance"
            metric={horizonSummary}
            detail="N+1 strongest · full analysis in Metrics"
            accent="blue"
            icon={<BarChart3 className="h-5 w-5 text-mck-blue" />}
            onClick={() => goTo('metrics')}
            delay={0.1}
          />
          <FindingCard
            title="Top Forecast Drivers"
            metric={topDrivers[0]?.feature.replace(/_/g, ' ') ?? '—'}
            detail={`${((topDrivers[0]?.shap ?? 0) * 100).toFixed(0)}% mean |SHAP|`}
            accent="success"
            icon={<BrainCircuit className="h-5 w-5 text-mck-success" />}
            onClick={() => goTo('drivers')}
            delay={0.15}
          />
          <FindingCard
            title="Pipeline"
            metric={pipelineRunning?.name ?? 'Idle'}
            detail={`${pipelineSteps.filter((s) => s.status === 'complete').length}/${pipelineSteps.length} steps complete`}
            accent="amber"
            icon={<Activity className="h-5 w-5 text-mck-amber" />}
            onClick={() => goTo('pipeline')}
            delay={0.2}
          />
        </div>
      </StorySection>

      <StorySection
        id="chapter-products"
        chapter="03 · Products"
        title="Top performing SKUs"
        subtitle="Herbicides, fungicides, insecticides — tap to deep dive"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Accuracy pulse" subtitle="8-month trajectory">
            <button type="button" onClick={() => goTo('metrics')} className="block w-full cursor-pointer">
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={sparkData}>
                  <defs>
                    <linearGradient id="pulseFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={chartColors.model} stopOpacity={0.35} />
                      <stop offset="100%" stopColor={chartColors.model} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{ borderRadius: 10, background: theme.tooltip.background, border: theme.tooltip.border, fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif', fontSize: 12 }}
                    formatter={(v) => [`${v}%`, 'Accuracy']}
                  />
                  <Area type="monotone" dataKey="modelAccuracy" stroke={chartColors.model} fill="url(#pulseFill)" strokeWidth={2.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </button>
          </ChartCard>

          <div className="grid gap-2 sm:grid-cols-2">
            {topSkus.map((sku, i) => (
              <motion.button
                key={sku.sku}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate('sku', { skuId: sku.sku })}
                className="flex cursor-pointer items-center gap-3 rounded-xl p-3 text-left ring-1 ring-[color:var(--border-subtle)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)] hover:ring-mck-sky/35"
                style={{ background: 'var(--surface-elevated)' }}
              >
                <CategoryIllustration category={sku.category} size={32} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-bold text-theme-primary">{sku.product}</p>
                  <p className="text-[10px] text-theme-secondary">{sku.category} · {sku.sku}</p>
                </div>
                <span className="font-tabular text-sm font-bold text-mck-sky">{formatPercent(sku.modelAccuracy)}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </StorySection>
    </PageShell>
  )
}
