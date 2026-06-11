import { ArrowUpRight, MapPin, Package } from 'lucide-react'
import type { SkuPerformance, TerritoryPerformance } from '../data/mockData'
import { LABELS } from '../data/mockData'
import { cn, formatCr, formatPercent } from '../lib/utils'

interface DataTableProps {
  territories: TerritoryPerformance[]
  skus: SkuPerformance[]
  view: 'territory' | 'sku'
}

export function PerformanceTable({ territories, skus, view }: DataTableProps) {
  if (view === 'territory') {
    return (
      <div className="overflow-x-auto rounded-xl ring-1 ring-[color:var(--border-subtle)]">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b font-display text-xs uppercase tracking-wider text-theme-secondary" style={{ background: 'var(--surface-inset)' }}>
              <th className="px-4 py-3 font-semibold">Territory</th>
              <th className="px-4 py-3 font-semibold">Sales</th>
              <th className="px-4 py-3 font-semibold">Share</th>
              <th className="px-4 py-3 font-semibold">Model</th>
              <th className="px-4 py-3 font-semibold">{LABELS.salesTeam}</th>
              <th className="px-4 py-3 font-semibold">Δ Improvement</th>
            </tr>
          </thead>
          <tbody>
            {territories.map((row) => (
              <tr key={row.name} className="cursor-pointer border-b border-[color:var(--border-subtle)] transition-all duration-150 hover:bg-mck-sky/5">
                <td className="px-4 py-3.5 font-body font-medium text-theme-primary">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-mck-sky" />
                    {row.name}
                  </span>
                </td>
                <td className="px-4 py-3.5 font-mono">{formatCr(row.salesCr)}</td>
                <td className="px-4 py-3.5 font-mono">{formatPercent(row.salesShare, 1)}</td>
                <td className="px-4 py-3.5 font-mono font-semibold text-mck-sky">{formatPercent(row.modelAccuracy)}</td>
                <td className="px-4 py-3.5 font-mono text-mck-coral">{formatPercent(row.salesTeamAccuracy)}</td>
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-mck-success/15 px-2.5 py-1 font-mono text-xs font-bold text-mck-success ring-1 ring-mck-success/25">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    +{formatPercent(row.improvement)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl ring-1 ring-[color:var(--border-subtle)]">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b font-display text-xs uppercase tracking-wider text-theme-secondary" style={{ background: 'var(--surface-inset)' }}>
            <th className="px-4 py-3 font-semibold">SKU</th>
            <th className="px-4 py-3 font-semibold">Product</th>
            <th className="px-4 py-3 font-semibold">Segment</th>
            <th className="px-4 py-3 font-semibold">Best Model</th>
            <th className="px-4 py-3 font-semibold">Model</th>
            <th className="px-4 py-3 font-semibold">{LABELS.salesTeam}</th>
            <th className="px-4 py-3 font-semibold">Δ</th>
          </tr>
        </thead>
        <tbody>
          {skus.map((row) => (
            <tr key={row.sku} className="cursor-pointer border-b border-[color:var(--border-subtle)] transition-all duration-150 hover:bg-mck-sky/5">
              <td className="px-4 py-3.5 font-mono text-xs text-theme-secondary">{row.sku}</td>
              <td className="px-4 py-3.5 font-body font-medium text-theme-primary">
                <span className="inline-flex items-center gap-2">
                  <Package className="h-4 w-4 text-mck-blue" />
                  {row.product}
                </span>
              </td>
              <td className="px-4 py-3.5">
                <span className={cn('rounded-full px-2.5 py-1 text-xs font-bold ring-1', row.segment === 'High Volume' && 'bg-mck-blue/15 text-mck-blue ring-mck-blue/25', row.segment === 'Medium Volume' && 'bg-mck-teal/15 text-mck-teal ring-mck-teal/25', row.segment === 'Low Volume' && 'bg-white/10 text-theme-secondary ring-[color:var(--border-subtle)]', row.segment === 'Sparse' && 'bg-mck-coral/15 text-mck-coral ring-mck-coral/25')}>
                  {row.segment}
                </span>
              </td>
              <td className="px-4 py-3.5 font-body text-theme-secondary">{row.bestModel}</td>
              <td className="px-4 py-3.5 font-mono font-semibold text-mck-sky">{formatPercent(row.modelAccuracy)}</td>
              <td className="px-4 py-3.5 font-mono text-mck-coral">{formatPercent(row.salesTeamAccuracy)}</td>
              <td className="px-4 py-3.5 font-mono font-bold text-mck-success">+{formatPercent(row.improvement)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
