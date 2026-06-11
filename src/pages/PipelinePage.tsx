import { AgriPageHero, CropRowIcon, FarmerIcon } from '../components/agri/AgriIllustrations'
import { ChartCard } from '../components/ChartCard'
import { MetricFlowBar } from '../components/MetricFlowBar'
import { PipelineStatus } from '../components/PipelineStatus'
import { PageShell } from '../components/shared'
import { pipelineRuns, pipelineSteps } from '../data/mockData'
import { cn } from '../lib/utils'

export function PipelinePage() {
  return (
    <PageShell>
      <MetricFlowBar compact />

      <div className="relative">
        <AgriPageHero
          title="Thunderbird forecast pipeline"
          subtitle="Weekly batch · preprocessing through post-processing for all territory × SKU combinations"
        />
        <div className="pointer-events-none absolute bottom-4 right-8 hidden opacity-25 lg:block">
          <FarmerIcon size={56} />
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Last run', value: 'RUN-2847', sub: '11 Jun 2026' },
          { label: 'Engine version', value: 'v2.5.1', sub: 'Thunderbird global' },
          { label: 'SKUs processed', value: '1,240', sub: 'Territory × SKU × Month' },
          { label: 'Est. completion', value: '~18 min', sub: 'Forecast generation step' },
        ].map((s) => (
          <div key={s.label} className="elevated-card p-4">
            <p className="font-display text-xs font-bold uppercase tracking-wider text-theme-secondary">{s.label}</p>
            <p className="mt-2 font-tabular text-xl font-bold text-theme-primary">{s.value}</p>
            <p className="mt-1 font-body text-xs text-theme-secondary">{s.sub}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Current Run Progress" subtitle="Step-by-step pipeline execution">
          <PipelineStatus steps={pipelineSteps} />
        </ChartCard>

        <ChartCard title="Run History" subtitle="Recent Thunderbird executions">
          <div className="mb-4 flex justify-end opacity-40">
            <CropRowIcon size={80} />
          </div>
          <div className="space-y-3">
            {pipelineRuns.map((run) => (
              <div
                key={run.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl px-4 py-3 ring-1 ring-[color:var(--border-subtle)] transition-all hover:ring-mck-sky/30"
                style={{ background: 'var(--surface-inset)' }}
              >
                <div>
                  <p className="font-display font-bold text-theme-primary">{run.id}</p>
                  <p className="font-body text-xs text-theme-secondary">{run.date} · {run.version}</p>
                </div>
                <div className="text-right">
                  <span
                    className={cn(
                      'inline-block rounded-full px-2.5 py-1 font-display text-xs font-bold ring-1',
                      run.status === 'Running'
                        ? 'bg-mck-sky/15 text-mck-sky ring-mck-sky/25'
                        : 'bg-mck-success/15 text-mck-success ring-mck-success/25',
                    )}
                  >
                    {run.status}
                  </span>
                  <p className="mt-1 font-tabular text-xs text-theme-secondary">{run.skus} SKUs · {run.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </section>

      <ChartCard title="Pipeline Configuration" subtitle="Active engine parameters">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { key: 'train_start_date', value: '01/04/2019' },
            { key: 'train_end_date', value: '6 months before forecast' },
            { key: 'forecast_horizon', value: 'N+1, N+2, N+3' },
            { key: 'cores_to_use', value: '12 parallel' },
            { key: 'weather_pipeline', value: 'Enabled (API)' },
            { key: 'output_path', value: 'data/model_outputs/' },
          ].map((cfg) => (
            <div key={cfg.key} className="rounded-lg px-3 py-2.5 ring-1 ring-[color:var(--border-subtle)]" style={{ background: 'var(--surface-muted)' }}>
              <p className="font-tabular text-[10px] uppercase tracking-wider text-mck-sky">{cfg.key}</p>
              <p className="mt-1 font-body text-sm font-medium text-theme-primary">{cfg.value}</p>
            </div>
          ))}
        </div>
      </ChartCard>
    </PageShell>
  )
}
