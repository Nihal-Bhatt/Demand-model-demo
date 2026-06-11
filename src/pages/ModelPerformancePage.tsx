import { ChartCard } from '../components/ChartCard'
import { ModelMixChart } from '../components/ModelMixChart'
import { FormulaLine, PageHeader, PageShell } from '../components/shared'
import { agriCoData, modelLeaderboard } from '../data/mockData'
import { formatPercent } from '../lib/utils'
import { cn } from '../lib/utils'

export function ModelPerformancePage() {
  const data = agriCoData

  return (
    <PageShell>
      <PageHeader
        title="Model Performance"
        subtitle="Best-fit model selection by wMAPE · volume-weighted accuracy across SKU portfolio"
      />

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Models in ensemble', value: '12', sub: 'Stat + ML + Deep learning' },
          { label: 'Avg portfolio wMAPE', value: '0.17', sub: 'Weighted by sales ₹' },
          { label: 'SKUs auto-selected', value: '94%', sub: 'Lowest wMAPE per SKU' },
        ].map((stat) => (
          <div key={stat.label} className="elevated-card p-5">
            <p className="font-display text-xs font-bold uppercase tracking-wider text-theme-secondary">{stat.label}</p>
            <p className="mt-2 font-mono text-3xl font-bold text-theme-primary">{stat.value}</p>
            <p className="mt-1 font-body text-sm text-theme-secondary">{stat.sub}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Best Model Mix" subtitle="Share of SKUs by selected model">
          <ModelMixChart data={data.models} />
        </ChartCard>

        <ChartCard title="Model Leaderboard" subtitle="Ranked by SKU coverage and wMAPE">
          <div className="space-y-2">
            {modelLeaderboard.map((row) => (
              <div
                key={row.rank}
                className="flex items-center gap-4 rounded-xl px-4 py-3 ring-1 ring-[color:var(--border-subtle)] transition-all hover:ring-mck-sky/30"
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
                  <p className="font-body text-xs text-theme-secondary">{row.skus} SKUs · wMAPE {row.avgWmape.toFixed(2)}</p>
                </div>
                <span className="font-mono text-sm font-bold text-mck-success">{formatPercent(row.accuracy)}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Volume-Volatility Segmentation" subtitle="Model selection strategy by demand pattern">
          <div className="grid grid-cols-2 gap-3">
            {[
              { segment: 'High Volume', models: 'XGBoost, LightGBM', share: '42%', color: 'text-mck-blue' },
              { segment: 'Medium Volume', models: 'Prophet, AutoARIMA', share: '31%', color: 'text-mck-teal' },
              { segment: 'Low Volume', models: 'ETS, BATS', share: '18%', color: 'text-theme-secondary' },
              { segment: 'Sparse', models: 'Sparse / Croston', share: '9%', color: 'text-mck-coral' },
            ].map((s) => (
              <div key={s.segment} className="rounded-xl p-4 ring-1 ring-[color:var(--border-subtle)]" style={{ background: 'var(--surface-muted)' }}>
                <p className={cn('font-display text-sm font-bold', s.color)}>{s.segment}</p>
                <p className="mt-1 font-body text-xs text-theme-secondary">{s.models}</p>
                <p className="mt-2 font-mono text-lg font-bold text-theme-primary">{s.share}</p>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="wMAPE Formula" subtitle="Model selection metric">
          <div className="space-y-3 text-theme-primary">
            <FormulaLine step="1" text="MAPE = |Actual − Forecast| / Actual" />
            <FormulaLine step="2" text="WMAPE = MAPE × Actual Sales (₹)" />
            <FormulaLine step="3" text="Agg WMAPE = Σ(WMAPE) / Σ(Sales ₹)" />
            <FormulaLine step="4" text="Accuracy = max(0, 1 − Agg WMAPE)" highlight />
          </div>
          <p className="mt-4 font-body text-sm leading-relaxed text-theme-secondary">
            High-volume SKUs drive accuracy measurement — aligned with business revenue impact.
          </p>
        </ChartCard>
      </section>
    </PageShell>
  )
}
