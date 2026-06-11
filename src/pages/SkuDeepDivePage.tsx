import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle, Clock, ExternalLink, XCircle } from 'lucide-react'
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
import { CategoryIllustration } from '../components/agri/AgriIllustrations'
import { ChartCard } from '../components/ChartCard'
import { EditorialHero } from '../components/storytelling/EditorialHero'
import { PageShell } from '../components/shared'
import { useDashboard } from '../context/DashboardContext'
import { agriCoData, getSkuDeepDive, reviewQueue } from '../data/mockData'
import { useChartTheme } from '../hooks/useChartTheme'
import { cn, formatCr, formatPercent } from '../lib/utils'
import { mckColors } from '../theme/mckinsey'

const FONT = 'Plus Jakarta Sans, system-ui, sans-serif'

const statusStyle = {
  'Pending Review': { icon: Clock, className: 'bg-mck-warning/15 text-mck-warning ring-mck-warning/25' },
  Approved: { icon: CheckCircle, className: 'bg-mck-success/15 text-mck-success ring-mck-success/25' },
  'Change Requested': { icon: XCircle, className: 'bg-mck-coral/15 text-mck-coral ring-mck-coral/25' },
}

export function SkuExplorerPage() {
  const theme = useChartTheme()
  const { selectedSkuId, setSelectedSkuId, navigate } = useDashboard()
  const [activeSku, setActiveSku] = useState(selectedSkuId ?? agriCoData.skus[0].sku)

  useEffect(() => {
    if (selectedSkuId) setActiveSku(selectedSkuId)
  }, [selectedSkuId])

  const sku = useMemo(() => getSkuDeepDive(activeSku), [activeSku])

  if (!sku) {
    return (
      <PageShell>
        <p className="text-theme-secondary">SKU not found.</p>
      </PageShell>
    )
  }

  return (
    <PageShell className="gap-10">
      <EditorialHero
        lines={['Product', 'deep', 'dive']}
        accentLine={1}
        badge="SKU Explorer"
        subtitle="Product-level accuracy, territories, drivers, and forecast review queue"
      />

      <div className="elevated-card flex flex-wrap items-center gap-4 p-4 lg:p-5">
        <CategoryIllustration category={sku.category} size={48} />
        <div>
          <p className="font-display text-xl font-bold text-theme-primary">{sku.product}</p>
          <p className="mt-1 text-sm text-theme-secondary">{sku.sku} · {sku.category} · {sku.segment} · {sku.bestModel}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {agriCoData.skus.map((s) => (
          <button
            key={s.sku}
            type="button"
            onClick={() => {
              setActiveSku(s.sku)
              setSelectedSkuId(s.sku)
            }}
            className={cn(
              'flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left ring-1 transition-colors duration-200',
              activeSku === s.sku
                ? 'bg-mck-sky/15 ring-mck-sky/35 shadow-[var(--shadow-glow)]'
                : 'ring-[color:var(--border-subtle)] hover:bg-[var(--surface-inset)]',
            )}
          >
            <CategoryIllustration category={s.category} size={24} />
            <div>
              <p className="font-display text-xs font-bold text-theme-primary">{s.product}</p>
              <p className="font-tabular text-[10px] text-theme-secondary">{s.sku}</p>
            </div>
          </button>
        ))}
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Model accuracy', value: formatPercent(sku.modelAccuracy), accent: 'text-mck-sky' },
          { label: 'wMAPE', value: sku.wmape.toFixed(2), accent: 'text-mck-blue' },
          { label: 'Sales share', value: formatPercent(sku.salesShare, 1), accent: 'text-theme-primary' },
          { label: 'Revenue', value: formatCr(sku.salesCr), accent: 'text-mck-success' },
        ].map((kpi) => (
          <div key={kpi.label} className="elevated-card p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-theme-secondary">{kpi.label}</p>
            <p className={cn('mt-2 font-tabular text-2xl font-bold', kpi.accent)}>{kpi.value}</p>
          </div>
        ))}
      </section>

      <p className="font-body text-sm leading-relaxed text-theme-secondary">{sku.description}</p>

      <section className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Accuracy trend" subtitle="Monthly model accuracy for this SKU">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={sku.monthlyAccuracy}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: theme.tick, fontSize: 10, fontFamily: FONT }} />
              <YAxis tick={{ fill: theme.tick, fontSize: 10, fontFamily: FONT }} domain={[60, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ fontFamily: FONT, borderRadius: 10, background: theme.tooltip.background, border: theme.tooltip.border }} />
              <Line type="monotone" dataKey="accuracy" stroke={mckColors.sky} strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Horizon accuracy" subtitle="N+1 / N+2 / N+3 forecast quality">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={sku.horizonAccuracy}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} vertical={false} />
              <XAxis dataKey="horizon" tick={{ fill: theme.tick, fontFamily: FONT }} />
              <YAxis tick={{ fill: theme.tick, fontFamily: FONT }} domain={[60, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ fontFamily: FONT, borderRadius: 10, background: theme.tooltip.background, border: theme.tooltip.border }} />
              <Bar dataKey="accuracy" fill={mckColors.sky} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <ChartCard title="Territory breakdown" subtitle="Regional performance for this product">
        <div className="data-table-wrap">
          <table className="data-table min-w-[520px]">
            <thead>
              <tr>
                <th>Territory</th>
                <th>Accuracy</th>
                <th>Sales</th>
                <th>Forecast qty</th>
              </tr>
            </thead>
            <tbody>
              {sku.territories.map((t) => (
                <tr key={t.name}>
                  <td className="font-medium text-theme-primary">{t.name}</td>
                  <td className="font-tabular font-semibold text-mck-sky">{formatPercent(t.accuracy)}</td>
                  <td className="font-tabular">{formatCr(t.salesCr)}</td>
                  <td className="font-tabular">{t.forecastQty.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>

      <ChartCard title="Top forecast drivers" subtitle="Feature impact for this SKU · full SHAP in Drivers">
        <div className="space-y-2">
          {sku.topDrivers.map((d) => (
            <div key={d.feature} className="flex items-center gap-3 rounded-lg px-3 py-2" style={{ background: 'var(--surface-inset)' }}>
              <span className="min-w-0 flex-1 font-body text-sm text-theme-primary">{d.feature}</span>
              <div className="h-2 w-32 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-mck-sky" style={{ width: `${d.impact * 100}%` }} />
              </div>
              <span className="font-tabular text-xs font-bold text-mck-sky">{(d.impact * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => navigate('drivers', { skuId: sku.sku })} className="btn-ghost mt-4">
          <ExternalLink className="h-4 w-4" />
          Full driver analysis
          <ArrowRight className="h-4 w-4" />
        </button>
      </ChartCard>

      <ChartCard title="Forecast Review Queue" subtitle="SKU × territory combinations awaiting sign-off">
        <div className="overflow-x-auto rounded-xl ring-1 ring-[color:var(--border-subtle)]">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b font-display text-xs uppercase tracking-wider text-theme-secondary" style={{ background: 'var(--surface-inset)' }}>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Territory</th>
                <th className="px-4 py-3">Horizon</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Accuracy</th>
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
                    className={cn(
                      'cursor-pointer border-b transition-colors hover:bg-mck-sky/5',
                      row.sku === activeSku && 'is-selected',
                    )}
                    onClick={() => {
                      setActiveSku(row.sku)
                      setSelectedSkuId(row.sku)
                    }}
                  >
                    <td className="px-4 py-3.5 font-tabular text-xs text-theme-secondary">{row.sku}</td>
                    <td className="px-4 py-3.5 font-medium text-theme-primary">{row.territory}</td>
                    <td className="px-4 py-3.5"><span className="stat-pill">{row.horizon}</span></td>
                    <td className="px-4 py-3.5 font-tabular text-mck-sky">{row.modelQty.toLocaleString()}</td>
                    <td className="px-4 py-3.5 font-tabular font-bold text-mck-success">{row.forecastAccuracy}%</td>
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

      <button type="button" onClick={() => navigate('overview')} className="btn-ghost">
        <ArrowLeft className="h-4 w-4" />
        Back to overview
      </button>
    </PageShell>
  )
}

/** @deprecated Use SkuExplorerPage */
export const SkuDeepDivePage = SkuExplorerPage
