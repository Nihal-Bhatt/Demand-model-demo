import { CheckCircle2, Circle, Loader2 } from 'lucide-react'
import { cn } from '../lib/utils'

interface PipelineStep {
  id: number
  name: string
  status: 'complete' | 'running' | 'pending'
  duration: string
}

export function PipelineStatus({ steps }: { steps: PipelineStep[] }) {
  return (
    <div className="space-y-0">
      {steps.map((step, index) => (
        <div key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
          {index < steps.length - 1 && (
            <div
              className={cn(
                'absolute left-[15px] top-8 h-[calc(100%-12px)] w-0.5',
                step.status === 'complete'
                  ? 'bg-gradient-to-b from-mck-success to-mck-sky'
                  : step.status === 'running'
                    ? 'bg-gradient-to-b from-mck-sky to-[color:var(--border-subtle)]'
                    : 'bg-[color:var(--border-subtle)]',
              )}
            />
          )}
          <div
            className={cn(
              'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4',
              step.status === 'complete' && 'bg-mck-success text-white ring-mck-success/20 shadow-[0_0_16px_rgba(46,125,111,0.4)]',
              step.status === 'running' && 'bg-mck-sky text-white ring-mck-sky/30 shadow-[0_0_20px_rgba(0,169,244,0.5)]',
              step.status === 'pending' && 'bg-[color:var(--surface-inset)] text-theme-muted ring-[color:var(--border-subtle)]',
            )}
          >
            {step.status === 'complete' && <CheckCircle2 className="h-4 w-4" />}
            {step.status === 'running' && <Loader2 className="h-4 w-4 animate-spin" />}
            {step.status === 'pending' && <Circle className="h-4 w-4" />}
          </div>
          <div className="min-w-0 flex-1 pt-1">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-theme-primary">{step.name}</p>
              <span className="font-mono text-xs text-theme-secondary">{step.duration}</span>
            </div>
            <p
              className={cn(
                'mt-1 text-sm capitalize font-medium',
                step.status === 'complete' && 'text-mck-success',
                step.status === 'running' && 'text-mck-sky',
                step.status === 'pending' && 'text-theme-muted',
              )}
            >
              {step.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
