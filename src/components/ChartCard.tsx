import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

interface ChartCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  action?: ReactNode
  className?: string
  glow?: boolean
  dense?: boolean
}

export function ChartCard({ title, subtitle, children, action, className, glow, dense }: ChartCardProps) {
  return (
    <section
      className={cn(
        'elevated-card',
        dense ? 'p-4 lg:p-5' : 'p-5 lg:p-6',
        glow && 'shadow-[var(--shadow-glow)]',
        className,
      )}
    >
      <div className="chart-card-header">
        <div>
          <h3 className="font-display text-base font-bold text-theme-primary lg:text-lg">{title}</h3>
          {subtitle && <p className="mt-1 font-body text-xs text-theme-secondary lg:text-sm">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="relative">{children}</div>
    </section>
  )
}
