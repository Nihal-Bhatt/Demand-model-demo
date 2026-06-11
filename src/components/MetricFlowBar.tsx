import { ChevronRight } from 'lucide-react'
import { METRIC_FLOW, type MetricStep } from '../data/mockData'
import { useDashboard } from '../context/DashboardContext'
import { cn } from '../lib/utils'

export function MetricFlowBar({ compact }: { compact?: boolean }) {
  const { activeMetricStep, setActiveMetricStep } = useDashboard()

  return (
    <nav aria-label="Metric flow" className="elevated-card p-3 lg:p-4">
      <p className="mb-3 font-display text-[11px] font-bold uppercase tracking-[0.14em] text-theme-secondary">
        Demand planning metric flow
      </p>
      <ol className={cn('flex flex-wrap items-center gap-1', compact && 'gap-0.5')}>
        {METRIC_FLOW.map((step, i) => {
          const active = activeMetricStep === step.id
          return (
            <li key={step.id} className="flex items-center">
              <button
                type="button"
                onClick={() => setActiveMetricStep(step.id)}
                className={cn(
                  'cursor-pointer rounded-lg px-3 py-2 text-left transition-colors duration-200',
                  compact ? 'px-2 py-1.5' : 'min-w-[100px]',
                  active
                    ? 'bg-mck-sky/15 ring-1 ring-mck-sky/35 shadow-[var(--shadow-glow)]'
                    : 'hover:bg-[var(--surface-inset)]',
                )}
              >
                <span className={cn('block font-display text-xs font-bold', active ? 'text-mck-sky' : 'text-theme-primary')}>
                  {step.label}
                </span>
                {!compact && (
                  <span className="mt-0.5 block text-[10px] leading-snug text-theme-secondary">{step.hint}</span>
                )}
              </button>
              {i < METRIC_FLOW.length - 1 && (
                <ChevronRight className="mx-0.5 h-4 w-4 shrink-0 text-theme-muted" aria-hidden />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function MetricStepBadge({ step }: { step: MetricStep }) {
  const item = METRIC_FLOW.find((s) => s.id === step)
  if (!item) return null
  return (
    <span className="stat-pill stat-pill-active">
      Step {METRIC_FLOW.findIndex((s) => s.id === step) + 1}: {item.label}
    </span>
  )
}
