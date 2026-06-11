import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Filter, Search, X } from 'lucide-react'
import { AgriPageHero } from '../components/agri/AgriIllustrations'
import { AccuracyTrendChart } from '../components/AccuracyTrendChart'
import { ChartCard } from '../components/ChartCard'
import { HorizonChart } from '../components/ModelMixChart'
import { KpiCard } from '../components/KpiCard'
import { MetricFlowBar } from '../components/MetricFlowBar'
import { PerformanceTable } from '../components/PerformanceTable'
import { SegmentedControl } from '../components/SegmentedControl'
import { HeroStat, InsightBlock, PageShell } from '../components/shared'
import { useDashboard } from '../context/DashboardContext'
import { agriCoData, forecastHorizons, segments } from '../data/mockData'
import { cn, formatCr, formatPercent } from '../lib/utils'

type KpiFocus = 'accuracy' | 'wmape' | 'over' | 'coverage'
type ChartRange = '6' | '12' | 'all'
type InsightFocus = 'territories' | 'products' | 'granularity'

export function OverviewPage() {
  const data = agriCoData
  const { navigate } = useDashboard()
  const [tableView, setTableView] = useState<'territory' | 'sku'>('territory')
  const [segment, setSegment] = useState<(typeof segments)[number]>('All')
  const [kpiFocus, setKpiFocus] = useState<KpiFocus>('accuracy')
  const [chartRange, setChartRange] = useState<ChartRange>('12')
  const [insightFocus, setInsightFocus] = useState<InsightFocus>('territories')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null)

  const filteredSkus = useMemo(
    () => (segment === 'All' ? data.skus : data.skus.filter((s) => s.segment === segment)),
    [data.skus, segment],
  )

  const monthLimit = chartRange === '6' ? 6 : chartRange === '12' ? 12 : undefined

  const selectedTerritory = data.territories.find((t) => t.name === selectedRowId)
  const selectedSku = filteredSkus.find((s) => s.sku === selectedRowId)

  const handleTableViewChange = (view: 'territory' | 'sku') => {
    setTableView(view)
    setSelectedRowId(null)
  }

  return (
    <PageShell>
      <MetricFlowBar />

      <AgriPageHero
        title="Model forecast accuracy at a glance"
        subtitle={`${formatPercent(data.summary.modelAccuracy)} portfolio accuracy · target ${formatPercent(data.summary.accuracyTarget)} · ${data.level}`}
      />

      <section className="elevated-card overflow-hidden p-0">
        <div className="gradient-mck-glow px-6 py-5 lg:px-8 lg:py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-mck-sky/80">Headline Insight</p>
              <p className="mt-2 font-display text-xl font-bold text-white lg:text-2xl">
                <span className="text-mck-sky">{formatPercent(data.summary.modelAccuracy)}</span> model accuracy across{' '}
                {data.summary.totalSkus.toLocaleString()} SKUs
              </p>
              <p className="mt-1 font-body text-sm text-white/60">
                wMAPE {data.summary.wmape.toFixed(2)} · {data.summary.forecastHorizon} horizons · volume weighted by value
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <HeroStat label="Over-forecast rate" value={data.summary.overForecastRate} />
              <HeroStat label="Under-forecast rate" value={data.summary.underForecastRate} />
              <HeroStat label="High-accuracy coverage" value={data.summary.highAccuracyCoverage} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Model Accuracy"
          value={data.summary.modelAccuracy}
          accent="sky"
          comparison={{ label: 'Target', value: data.summary.accuracyTarget }}
          delta={data.summary.modelAccuracy - data.summary.accuracyTarget}
          deltaLabel="Above 75% accuracy target at portfolio level"
          delay={0}
          selected={kpiFocus === 'accuracy'}
          onSelect={() => {
            setKpiFocus('accuracy')
            navigate('accuracy', { metricStep: 'accuracy' })
          }}
        />
        <KpiCard
          label="Portfolio wMAPE"
          value={Math.round((1 - data.summary.wmape) * 100)}
          accent="blue"
          deltaLabel={`Raw wMAPE ${data.summary.wmape.toFixed(2)} · lower is better`}
          delay={0.05}
          selected={kpiFocus === 'wmape'}
          onSelect={() => setKpiFocus('wmape')}
        />
        <KpiCard
          label="Over-forecast Rate"
          value={data.summary.overForecastRate}
          accent="coral"
          deltaLabel="Share of forecasts above actual demand"
          delay={0.1}
          selected={kpiFocus === 'over'}
          onSelect={() => {
            setKpiFocus('over')
            navigate('accuracy', { metricStep: 'bias' })
          }}
        />
        <KpiCard
          label="High Accuracy Coverage"
          value={data.summary.highAccuracyCoverage}
          accent="success"
          deltaLabel="Sales value in >60% accuracy bucket"
          delay={0.15}
          selected={kpiFocus === 'coverage'}
          onSelect={() => setKpiFocus('coverage')}
        />
      </section>

      <section className="elevated-card p-4 lg:p-5">
        <div className="grid gap-4 md:grid-cols-3">
          <InsightBlock
            title="Territories above target"
            value={`${data.summary.territoriesAboveTarget}`}
            detail={`${formatPercent(data.summary.territoriesAboveTargetShare, 0)} of territories meet ${formatPercent(data.summary.accuracyTarget)} accuracy`}
            accent="sky"
            selected={insightFocus === 'territories'}
            onSelect={() => {
              setInsightFocus('territories')
              handleTableViewChange('territory')
              navigate('overview', { metricStep: 'territory' })
            }}
          />
          <InsightBlock
            title="SKUs above target"
            value={`${data.summary.skusAboveTarget}`}
            detail={`${formatPercent(data.summary.skusAboveTargetShare, 0)} of portfolio SKUs · click SKUs to deep dive`}
            accent="blue"
            selected={insightFocus === 'products'}
            onSelect={() => {
              setInsightFocus('products')
              handleTableViewChange('sku')
              navigate('sku', { metricStep: 'sku' })
            }}
          />
          <InsightBlock
            title="Forecast granularity"
            value={data.level}
            detail={`Horizon: ${data.summary.forecastHorizon} · ${data.summary.totalTerritories} territories`}
            accent="teal"
            selected={insightFocus === 'granularity'}
            onSelect={() => {
              setInsightFocus('granularity')
              navigate('forecast', { metricStep: 'horizon' })
            }}
          />
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <ChartCard
          title="Accuracy Snapshot"
          subtitle="Monthly model accuracy trend"
          className="xl:col-span-2"
          glow
          action={
            <SegmentedControl
              size="sm"
              value={chartRange}
              onChange={setChartRange}
              options={[
                { value: '6', label: '6M' },
                { value: '12', label: '12M' },
                { value: 'all', label: 'All' },
              ]}
            />
          }
        >
          <AccuracyTrendChart data={data.monthly} compact monthLimit={monthLimit} />
        </ChartCard>
        <ChartCard
          title="Forecast Horizon"
          subtitle="Click a horizon for analysis"
          action={
            <button type="button" onClick={() => navigate('forecast', { metricStep: 'horizon' })} className="btn-ghost text-xs">
              View all
              <ArrowRight className="h-3.5 w-3.5" />
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

      <ChartCard
        title={tableView === 'territory' ? 'Territory Performance' : 'SKU Performance'}
        subtitle="Click a row for quick stats · Deep dive for full SKU analysis"
        action={
          <TableControls
            tableView={tableView}
            setTableView={handleTableViewChange}
            segment={segment}
            setSegment={setSegment}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        }
      >
        <PerformanceTable
          territories={data.territories}
          skus={filteredSkus}
          view={tableView}
          selectedId={selectedRowId}
          onSelect={setSelectedRowId}
          searchQuery={searchQuery}
          onSkuNavigate={(skuId) => navigate('sku', { skuId, metricStep: 'sku' })}
          onTerritoryNavigate={(name) => navigate('overview', { territory: name, metricStep: 'territory' })}
        />

        <AnimatePresence mode="wait">
          {(selectedTerritory || selectedSku) && (
            <motion.div
              key={selectedRowId}
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="detail-panel"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-sm font-bold text-theme-primary">
                    {selectedTerritory?.name ?? selectedSku?.product}
                  </p>
                  <p className="mt-1 text-xs text-theme-secondary">
                    {selectedTerritory
                      ? `${formatCr(selectedTerritory.salesCr)} sales · ${formatPercent(selectedTerritory.salesShare, 1)} share · ${selectedTerritory.skuCount} SKUs`
                      : `${selectedSku?.sku} · ${selectedSku?.category} · ${selectedSku?.bestModel}`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRowId(null)}
                  className="btn-ghost !px-2 !py-2"
                  aria-label="Close detail panel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <DetailMetric label="Model accuracy" value={formatPercent((selectedTerritory ?? selectedSku)!.modelAccuracy)} accent="sky" />
                <DetailMetric label="wMAPE" value={(selectedTerritory ?? selectedSku)!.wmape.toFixed(2)} accent="blue" />
                <DetailMetric
                  label={selectedSku ? 'Best model' : 'SKUs tracked'}
                  value={selectedSku ? selectedSku.bestModel : String(selectedTerritory!.skuCount)}
                  accent="success"
                />
              </div>
              {selectedSku && (
                <button
                  type="button"
                  onClick={() => navigate('sku', { skuId: selectedSku.sku, metricStep: 'sku' })}
                  className="btn-ghost mt-4"
                >
                  Open SKU deep dive
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </ChartCard>
    </PageShell>
  )
}

function DetailMetric({ label, value, accent }: { label: string; value: string; accent: 'sky' | 'blue' | 'success' }) {
  const colors = {
    sky: 'text-mck-sky',
    blue: 'text-mck-blue',
    success: 'text-mck-success',
  }
  return (
    <div className="rounded-lg px-3 py-2 ring-1 ring-[color:var(--border-subtle)]" style={{ background: 'var(--surface-inset)' }}>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-theme-secondary">{label}</p>
      <p className={cn('mt-1 font-tabular text-xl font-bold', colors[accent])}>{value}</p>
    </div>
  )
}

function TableControls({
  tableView,
  setTableView,
  segment,
  setSegment,
  searchQuery,
  setSearchQuery,
}: {
  tableView: 'territory' | 'sku'
  setTableView: (v: 'territory' | 'sku') => void
  segment: (typeof segments)[number]
  setSegment: (v: (typeof segments)[number]) => void
  searchQuery: string
  setSearchQuery: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <SegmentedControl
        size="sm"
        value={tableView}
        onChange={setTableView}
        options={[
          { value: 'territory', label: 'Territory' },
          { value: 'sku', label: 'SKU' },
        ]}
      />
      {tableView === 'sku' && (
        <div className="btn-ghost !py-1.5 !text-xs">
          <Filter className="h-3.5 w-3.5" />
          <select
            value={segment}
            onChange={(e) => setSegment(e.target.value as (typeof segments)[number])}
            className="cursor-pointer bg-transparent font-bold outline-none"
          >
            {segments.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}
      <label className="btn-ghost hidden !py-1.5 !text-xs sm:inline-flex">
        <Search className="h-3.5 w-3.5" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-28 bg-transparent font-semibold outline-none placeholder:text-theme-muted"
        />
      </label>
    </div>
  )
}
