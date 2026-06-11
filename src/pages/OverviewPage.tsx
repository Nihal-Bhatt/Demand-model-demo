import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Filter, Search, X } from 'lucide-react'
import { AccuracyTrendChart } from '../components/AccuracyTrendChart'
import { ChartCard } from '../components/ChartCard'
import { HorizonChart } from '../components/ModelMixChart'
import { KpiCard } from '../components/KpiCard'
import { PerformanceTable } from '../components/PerformanceTable'
import { SegmentedControl } from '../components/SegmentedControl'
import { HeroStat, InsightBlock, PageShell } from '../components/shared'
import { agriCoData, forecastHorizons, LABELS, segments } from '../data/mockData'
import { cn, formatCr, formatPercent } from '../lib/utils'

type KpiFocus = 'accuracy' | 'over' | 'under' | 'coverage'
type ChartRange = '6' | '12' | 'all'
type InsightFocus = 'territories' | 'products' | 'granularity'

export function OverviewPage() {
  const data = agriCoData
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
      <section className="elevated-card overflow-hidden p-0">
        <div className="gradient-mck-glow px-6 py-5 lg:px-8 lg:py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-mck-sky/80">Headline Insight</p>
              <p className="mt-2 font-display text-xl font-bold text-white lg:text-2xl">
                Model delivers{' '}
                <span className="text-mck-sky">{formatPercent(data.summary.accuracyImprovement)}</span> higher accuracy
                vs {LABELS.salesTeam.toLowerCase()}
              </p>
              <p className="mt-1 font-body text-sm text-white/60">
                {formatPercent(data.summary.modelAccuracy)} model accuracy ·{' '}
                {formatPercent(data.summary.salesTeamAccuracy)} {LABELS.salesTeamBaseline} · {data.level}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <HeroStat label="Over-forecast ↓" value={data.summary.overForecastReduction} />
              <HeroStat label="Under-forecast ↓" value={data.summary.underForecastReduction} />
              <HeroStat label="High-accuracy coverage" value={data.summary.salesHighAccuracyBucket} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Model Accuracy"
          value={data.summary.modelAccuracy}
          accent="sky"
          comparison={{ label: LABELS.salesTeamAccuracy, value: data.summary.salesTeamAccuracy }}
          delta={data.summary.accuracyImprovement}
          deltaLabel={`Improvement vs ${LABELS.salesTeam.toLowerCase()} at quarter level`}
          delay={0}
          selected={kpiFocus === 'accuracy'}
          onSelect={() => setKpiFocus('accuracy')}
        />
        <KpiCard
          label="Over-forecast Reduction"
          value={data.summary.overForecastReduction}
          accent="blue"
          deltaLabel={`Model vs ${LABELS.salesTeam.toLowerCase()} over-forecast error`}
          delay={0.05}
          selected={kpiFocus === 'over'}
          onSelect={() => setKpiFocus('over')}
        />
        <KpiCard
          label="Under-forecast Reduction"
          value={data.summary.underForecastReduction}
          accent="coral"
          deltaLabel={`Model vs ${LABELS.salesTeam.toLowerCase()} under-forecast error`}
          delay={0.1}
          selected={kpiFocus === 'under'}
          onSelect={() => setKpiFocus('under')}
        />
        <KpiCard
          label="High Accuracy Coverage"
          value={data.summary.salesHighAccuracyBucket}
          accent="success"
          deltaLabel={`Sales in >60% bucket · ${LABELS.salesTeam} low bucket ${data.summary.salesLowAccuracyBucketSalesTeam}%`}
          delay={0.15}
          selected={kpiFocus === 'coverage'}
          onSelect={() => setKpiFocus('coverage')}
        />
      </section>

      <section className="elevated-card p-4 lg:p-5">
        <div className="grid gap-4 md:grid-cols-3">
          <InsightBlock
            title={`Territories outperforming ${LABELS.salesTeam.toLowerCase()}`}
            value={`${data.summary.territoriesImproved}`}
            detail={`Covering ${data.summary.territoriesImprovedSalesShare}% of sales with >25pt accuracy lift`}
            accent="sky"
            selected={insightFocus === 'territories'}
            onSelect={() => {
              setInsightFocus('territories')
              handleTableViewChange('territory')
            }}
          />
          <InsightBlock
            title={`Products outperforming ${LABELS.salesTeam.toLowerCase()}`}
            value={`${data.summary.productsImproved}`}
            detail={`Covering ${data.summary.productsImprovedSalesShare}% of sales with >25pt accuracy lift`}
            accent="blue"
            selected={insightFocus === 'products'}
            onSelect={() => {
              setInsightFocus('products')
              handleTableViewChange('sku')
            }}
          />
          <InsightBlock
            title="Forecast granularity"
            value={data.level}
            detail={`Horizon: ${data.summary.forecastHorizon} · ${data.summary.totalSkus.toLocaleString()} SKUs · ${data.summary.totalTerritories} territories`}
            accent="teal"
            selected={insightFocus === 'granularity'}
            onSelect={() => setInsightFocus('granularity')}
          />
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <ChartCard
          title="Accuracy Snapshot"
          subtitle={`Model vs ${LABELS.salesTeam.toLowerCase()} — interactive trend`}
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
        <ChartCard title="Forecast Horizon" subtitle="Accuracy by N+1 / N+2 / N+3">
          <HorizonChart data={forecastHorizons} />
        </ChartCard>
      </section>

      <ChartCard
        title={tableView === 'territory' ? 'Territory Performance' : 'SKU Performance'}
        subtitle={`Click a row to drill down · filter with search`}
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
                      ? `${formatCr(selectedTerritory.salesCr)} sales · ${formatPercent(selectedTerritory.salesShare, 1)} share`
                      : `${selectedSku?.sku} · ${selectedSku?.segment} · ${selectedSku?.bestModel}`}
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
                <DetailMetric label={`${LABELS.salesTeam} accuracy`} value={formatPercent((selectedTerritory ?? selectedSku)!.salesTeamAccuracy)} accent="coral" />
                <DetailMetric label="Improvement" value={`+${formatPercent((selectedTerritory ?? selectedSku)!.improvement)}`} accent="success" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ChartCard>
    </PageShell>
  )
}

function DetailMetric({ label, value, accent }: { label: string; value: string; accent: 'sky' | 'coral' | 'success' }) {
  const colors = {
    sky: 'text-mck-sky',
    coral: 'text-mck-coral',
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
