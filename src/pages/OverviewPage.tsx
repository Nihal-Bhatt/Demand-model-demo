import { useMemo, useState } from 'react'
import { Filter, Search } from 'lucide-react'
import { AccuracyTrendChart } from '../components/AccuracyTrendChart'
import { ChartCard } from '../components/ChartCard'
import { HorizonChart } from '../components/ModelMixChart'
import { KpiCard } from '../components/KpiCard'
import { PerformanceTable } from '../components/PerformanceTable'
import { HeroStat, InsightBlock, PageShell } from '../components/shared'
import { agriCoData, forecastHorizons, LABELS, segments } from '../data/mockData'
import { cn, formatPercent } from '../lib/utils'

export function OverviewPage() {
  const data = agriCoData
  const [tableView, setTableView] = useState<'territory' | 'sku'>('territory')
  const [segment, setSegment] = useState<(typeof segments)[number]>('All')

  const filteredSkus = useMemo(
    () => (segment === 'All' ? data.skus : data.skus.filter((s) => s.segment === segment)),
    [data.skus, segment],
  )

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
        />
        <KpiCard
          label="Over-forecast Reduction"
          value={data.summary.overForecastReduction}
          accent="blue"
          deltaLabel={`Model vs ${LABELS.salesTeam.toLowerCase()} over-forecast error`}
          delay={0.05}
        />
        <KpiCard
          label="Under-forecast Reduction"
          value={data.summary.underForecastReduction}
          accent="coral"
          deltaLabel={`Model vs ${LABELS.salesTeam.toLowerCase()} under-forecast error`}
          delay={0.1}
        />
        <KpiCard
          label="High Accuracy Coverage"
          value={data.summary.salesHighAccuracyBucket}
          accent="success"
          deltaLabel={`Sales in >60% bucket · ${LABELS.salesTeam} low bucket ${data.summary.salesLowAccuracyBucketSalesTeam}%`}
          delay={0.15}
        />
      </section>

      <section className="elevated-card p-4 lg:p-5">
        <div className="grid gap-4 md:grid-cols-3">
          <InsightBlock
            title={`Territories outperforming ${LABELS.salesTeam.toLowerCase()}`}
            value={`${data.summary.territoriesImproved}`}
            detail={`Covering ${data.summary.territoriesImprovedSalesShare}% of sales with >25pt accuracy lift`}
            accent="sky"
          />
          <InsightBlock
            title={`Products outperforming ${LABELS.salesTeam.toLowerCase()}`}
            value={`${data.summary.productsImproved}`}
            detail={`Covering ${data.summary.productsImprovedSalesShare}% of sales with >25pt accuracy lift`}
            accent="blue"
          />
          <InsightBlock
            title="Forecast granularity"
            value={data.level}
            detail={`Horizon: ${data.summary.forecastHorizon} · ${data.summary.totalSkus.toLocaleString()} SKUs · ${data.summary.totalTerritories} territories`}
            accent="teal"
          />
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <ChartCard
          title="Accuracy Snapshot"
          subtitle={`Model vs ${LABELS.salesTeam.toLowerCase()} — last 12 months`}
          className="xl:col-span-2"
          glow
        >
          <AccuracyTrendChart data={data.monthly} compact />
        </ChartCard>
        <ChartCard title="Forecast Horizon" subtitle="Accuracy by N+1 / N+2 / N+3">
          <HorizonChart data={forecastHorizons} />
        </ChartCard>
      </section>

      <ChartCard
        title={tableView === 'territory' ? 'Territory Performance' : 'SKU Performance'}
        subtitle={`Drill-down vs ${LABELS.salesTeam.toLowerCase()} baseline`}
        action={<TableControls tableView={tableView} setTableView={setTableView} segment={segment} setSegment={setSegment} />}
      >
        <PerformanceTable territories={data.territories} skus={filteredSkus} view={tableView} />
      </ChartCard>
    </PageShell>
  )
}

function TableControls({
  tableView,
  setTableView,
  segment,
  setSegment,
}: {
  tableView: 'territory' | 'sku'
  setTableView: (v: 'territory' | 'sku') => void
  segment: (typeof segments)[number]
  setSegment: (v: (typeof segments)[number]) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="inline-flex rounded-lg p-1 ring-1 ring-[color:var(--border-subtle)]" style={{ background: 'var(--surface-inset)' }}>
        {(['territory', 'sku'] as const).map((view) => (
          <button
            key={view}
            type="button"
            onClick={() => setTableView(view)}
            className={cn(
              'cursor-pointer rounded-md px-3 py-1.5 font-display text-xs font-bold capitalize transition-all duration-200',
              tableView === view
                ? 'bg-gradient-to-r from-mck-sky to-mck-blue text-white shadow-md shadow-mck-sky/25'
                : 'text-theme-secondary hover:text-theme-primary',
            )}
          >
            {view}
          </button>
        ))}
      </div>
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
      <div className="btn-ghost hidden !py-1.5 !text-xs sm:flex">
        <Search className="h-3.5 w-3.5" />
        Search
      </div>
    </div>
  )
}
