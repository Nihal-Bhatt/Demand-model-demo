import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

interface ChartCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  action?: ReactNode
  className?: string
  glow?: boolean
}

export function ChartCard({ title, subtitle, children, action, className, glow }: ChartCardProps) {
  return (
    <section className={cn('elevated-card p-5 lg:p-6', glow && 'shadow-[var(--shadow-glow)]', className)}>
      <div className="relative mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-bold text-theme-primary">{title}</h3>
          {subtitle && <p className="mt-1 font-body text-sm text-theme-secondary">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="relative">{children}</div>
    </section>
  )
}
