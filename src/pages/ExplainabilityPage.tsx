import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { CloudRain, Database, Layers, Sparkles, TrendingUp, Zap } from 'lucide-react'
import { ChartCard } from '../components/ChartCard'
import { EditorialHero } from '../components/storytelling/EditorialHero'
import { PageShell } from '../components/shared'
import { useDashboard } from '../context/DashboardContext'
import {
  engineeredFeatures,
  explainabilitySkus,
  externalDrivers,
  shapGlobalImportance,
  shapLocalExample,
} from '../data/mockData'
import { useChartTheme } from '../hooks/useChartTheme'
import { mckColors } from '../theme/mckinsey'
import { cn } from '../lib/utils'

const impactColors = {
  High: 'bg-mck-sky/15 text-mck-sky ring-mck-sky/25',
  Medium: 'bg-mck-blue/15 text-mck-blue ring-mck-blue/25',
  Low: 'bg-white/10 text-theme-secondary ring-[color:var(--border-subtle)]',
}

export function DriversPage() {
  const theme = useChartTheme()
  const { navigate } = useDashboard()
  const [selectedSku, setSelectedSku] = useState(explainabilitySkus[0])
  const example = shapLocalExample
  const skuId = selectedSku.split(' — ')[0]

  const waterfallData = example.contributions.map((c) => ({
    name: c.feature.replace(/_/g, ' '),
    shap: c.shap,
    value: c.value,
  }))

  return (
    <PageShell className="gap-10">
      <EditorialHero
        lines={['Forecast drivers', 'explained']}
        accentLine={0}
        badge="Forecast Drivers"
        subtitle="Weather, crop calendar, field app signals, and SHAP explainability"
        compact
      />

      <section className="grid gap-4 sm:grid-cols-4">
        {[
          { icon: Database, label: 'External drivers', value: '6', sub: '4 active · 2 planned' },
          { icon: Layers, label: 'Engineered features', value: '68', sub: '54 retained post-selection' },
          { icon: Sparkles, label: 'SHAP coverage', value: '94%', sub: 'SKUs with explainability output' },
          { icon: TrendingUp, label: 'Top driver', value: '4W avg demand', sub: '24% mean |SHAP|' },
        ].map(({ icon: Icon, label, value, sub }) => (
          <div key={label} className="elevated-card p-4">
            <div className="flex items-center gap-2 text-mck-sky">
              <Icon className="h-4 w-4" />
              <span className="font-display text-xs font-bold uppercase tracking-wider text-theme-secondary">{label}</span>
            </div>
            <p className="mt-2 font-tabular text-2xl font-bold text-theme-primary">{value}</p>
            <p className="mt-1 text-sm text-theme-secondary">{sub}</p>
          </div>
        ))}
      </section>

      <ChartCard title="External Indicators & Data Sources" subtitle="Click to open related SKU">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {externalDrivers.map((driver) => (
            <button
              key={driver.id}
              type="button"
              onClick={() => navigate('sku', { skuId: 'AC-1042' })}
              className="group cursor-pointer rounded-xl p-4 text-left ring-1 ring-[color:var(--border-subtle)] transition-all duration-200 hover:-translate-y-0.5 hover:ring-mck-sky/40 hover:shadow-[var(--shadow-glow)]"
              style={{ background: 'var(--surface-muted)' }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {driver.id === 'weather' ? (
                    <CloudRain className="h-4 w-4 text-mck-sky" />
                  ) : (
                    <Zap className="h-4 w-4 text-mck-blue" />
                  )}
                  <p className="font-display text-sm font-bold text-theme-primary">{driver.name}</p>
                </div>
                <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ring-1', impactColors[driver.impact as keyof typeof impactColors])}>
                  {driver.impact}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-theme-secondary">{driver.description}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="stat-pill">{driver.category}</span>
                <span className="stat-pill">{driver.features} features</span>
                <span className={cn('stat-pill', driver.status === 'Active' && 'text-mck-success')}>{driver.status}</span>
              </div>
            </button>
          ))}
        </div>
      </ChartCard>

      <section className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Feature Engineering" subtitle="Groups retained after correlation & impact filtering">
          <div className="space-y-3">
            {engineeredFeatures.map((group) => (
              <div key={group.group} className="rounded-xl p-4 ring-1 ring-[color:var(--border-subtle)]" style={{ background: 'var(--surface-inset)' }}>
                <div className="flex items-center justify-between">
                  <p className="font-display text-sm font-bold text-theme-primary">{group.group}</p>
                  <span className="font-tabular text-xs text-mck-sky">{group.retained}/{group.count} retained</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[color:var(--border-subtle)]">
                  <div className="h-full rounded-full bg-gradient-to-r from-mck-sky to-mck-blue" style={{ width: `${(group.retained / group.count) * 100}%` }} />
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.features.map((f) => (
                    <code key={f} className="rounded-md bg-mck-navy/10 px-2 py-0.5 font-tabular text-[10px] text-mck-sky">{f}</code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Global SHAP Importance" subtitle="Mean |SHAP| across portfolio">
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={shapGlobalImportance} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} horizontal={false} />
              <XAxis type="number" tick={{ fill: theme.tick, fontSize: 11 }} axisLine={false} tickLine={false} domain={[-0.1, 0.3]} />
              <YAxis type="category" dataKey="feature" width={130} tick={{ fill: theme.tick, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => v.replace(/_/g, ' ')} />
              <Tooltip contentStyle={{ borderRadius: 12, background: theme.tooltip.background, border: theme.tooltip.border, color: theme.tooltip.color }} formatter={(v) => [`${((v as number) * 100).toFixed(1)}%`, 'Mean |SHAP|']} />
              <ReferenceLine x={0} stroke={theme.grid} />
              <Bar dataKey="shap" radius={[0, 4, 4, 0]}>
                {shapGlobalImportance.map((entry, i) => (
                  <Cell key={i} fill={entry.shap >= 0 ? mckColors.sky : mckColors.coral} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <ChartCard
        title="Local SHAP Explanation"
        subtitle="Per-forecast feature contributions"
        action={
          <select value={selectedSku} onChange={(e) => setSelectedSku(e.target.value)} className="btn-ghost cursor-pointer font-display text-xs font-semibold">
            {explainabilitySkus.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        }
      >
        <div className="mb-6 grid gap-4 sm:grid-cols-4">
          <ShapStat label="SKU × Territory" value={`${example.sku} · ${example.territory}`} />
          <ShapStat label="Horizon" value={example.horizon} />
          <ShapStat label="Base value" value={example.baseValue.toLocaleString()} />
          <ShapStat label="Model forecast" value={example.prediction.toLocaleString()} highlight />
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={waterfallData} margin={{ top: 8, right: 8, left: 0, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} vertical={false} />
            <XAxis dataKey="name" tick={{ fill: theme.tick, fontSize: 9 }} axisLine={false} tickLine={false} angle={-25} textAnchor="end" height={60} />
            <YAxis tick={{ fill: theme.tick, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
            <Tooltip contentStyle={{ borderRadius: 12, background: theme.tooltip.background, border: theme.tooltip.border, color: theme.tooltip.color }} />
            <ReferenceLine y={0} stroke={theme.grid} />
            <Bar dataKey="shap" radius={[6, 6, 0, 0]}>
              {waterfallData.map((entry, i) => (
                <Cell key={i} fill={entry.shap >= 0 ? mckColors.sky : mckColors.coral} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <button type="button" onClick={() => navigate('sku', { skuId })} className="btn-ghost mt-4">
          View {skuId} in SKU Explorer
        </button>
      </ChartCard>
    </PageShell>
  )
}

function ShapStat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-xl p-3 ring-1 ring-[color:var(--border-subtle)]" style={{ background: 'var(--surface-inset)' }}>
      <p className="font-display text-[10px] font-bold uppercase tracking-wider text-theme-secondary">{label}</p>
      <p className={cn('mt-1 font-tabular text-sm font-bold', highlight ? 'text-mck-sky' : 'text-theme-primary')}>{value}</p>
    </div>
  )
}

/** @deprecated Use DriversPage */
export const ExplainabilityPage = DriversPage
