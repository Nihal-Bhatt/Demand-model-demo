import { ArrowDownRight, ArrowUpRight, CheckCircle, Clock, XCircle } from 'lucide-react'
import { AgriPageHero } from '../components/agri/AgriIllustrations'
import { ChartCard } from '../components/ChartCard'
import { ForecastBucketChart } from '../components/ForecastBucketChart'
import { HorizonChart } from '../components/ModelMixChart'
import { MetricFlowBar } from '../components/MetricFlowBar'
import { PageShell } from '../components/shared'
import { useDashboard } from '../context/DashboardContext'
import { agriCoData, forecastHorizons, reviewQueue } from '../data/mockData'
import { cn } from '../lib/utils'

const statusStyle = {
  'Pending Review': { icon: Clock, className: 'bg-mck-warning/15 text-mck-warning ring-mck-warning/25' },
  Approved: { icon: CheckCircle, className: 'bg-mck-success/15 text-mck-success ring-mck-success/25' },
  'Change Requested': { icon: XCircle, className: 'bg-mck-coral/15 text-mck-coral ring-mck-coral/25' },
}

export function ForecastAnalysisPage() {
  const { navigate } = useDashboard()
  const data = agriCoData

  return (
    <PageShell>
      <MetricFlowBar compact />

      <AgriPageHero
        title="Horizon & review workflow"
        subtitle="Step 3 of metric flow · N+1/N+2/N+3 accuracy and forecast sign-off queue"
      />

      <section className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Pending review', value: '847', trend: 'down' as const },
          { label: 'Approved', value: '312', trend: 'up' as const },
          { label: 'Change requested', value: '81', trend: 'up' as const },
          { label: 'Avg wMAPE', value: '0.14', trend: 'down' as const },
        ].map((kpi) => (
          <div key={kpi.label} className="elevated-card p-4">
            <p className="font-display text-xs font-bold uppercase tracking-wider text-theme-secondary">{kpi.label}</p>
            <div className="mt-2 flex items-end justify-between">
              <p className="font-tabular text-2xl font-bold text-theme-primary">{kpi.value}</p>
              {kpi.trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 text-mck-success" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-mck-sky" />
              )}
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Horizon Accuracy" subtitle="Model accuracy by forecast month">
          <HorizonChart data={forecastHorizons} target={data.summary.accuracyTarget} />
        </ChartCard>
        <ChartCard title="Accuracy Distribution" subtitle="Sales value by accuracy bucket">
          <ForecastBucketChart data={data.buckets} target={data.summary.accuracyTarget} />
        </ChartCard>
      </section>

      <ChartCard
        title="Forecast Review Queue"
        subtitle="Click a row to open SKU deep dive"
      >
        <div className="overflow-x-auto rounded-xl ring-1 ring-[color:var(--border-subtle)]">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b font-display text-xs uppercase tracking-wider text-theme-secondary" style={{ background: 'var(--surface-inset)' }}>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Territory</th>
                <th className="px-4 py-3">Horizon</th>
                <th className="px-4 py-3">Forecast Qty</th>
                <th className="px-4 py-3">Accuracy</th>
                <th className="px-4 py-3">wMAPE</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {reviewQueue.map((row) => {
                const st = statusStyle[row.status as keyof typeof statusStyle]
                const Icon = st.icon
                return (
                  <tr
                    key={`${row.sku}-${row.territory}`}
                    className="cursor-pointer border-b transition-colors hover:bg-mck-sky/5"
                    onClick={() => navigate('sku', { skuId: row.sku, metricStep: 'sku' })}
                  >
                    <td className="px-4 py-3.5 font-tabular text-xs text-theme-secondary">{row.sku}</td>
                    <td className="px-4 py-3.5 font-body font-medium text-theme-primary">{row.territory}</td>
                    <td className="px-4 py-3.5"><span className="stat-pill">{row.horizon}</span></td>
                    <td className="px-4 py-3.5 font-tabular text-mck-sky">{row.modelQty.toLocaleString()}</td>
                    <td className="px-4 py-3.5 font-tabular font-bold text-mck-success">{row.forecastAccuracy}%</td>
                    <td className="px-4 py-3.5 font-tabular">{row.wmape.toFixed(2)}</td>
                    <td className="px-4 py-3.5">
                      <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ring-1', st.className)}>
                        <Icon className="h-3.5 w-3.5" />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </PageShell>
  )
}
