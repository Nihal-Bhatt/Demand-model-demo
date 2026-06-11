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
      <div className="data-table-wrap">
        <table className="data-table min-w-[640px]">
          <thead>
            <tr>
              <th>Territory</th>
              <th>Sales</th>
              <th>Share</th>
              <th>Model</th>
              <th>{LABELS.salesTeam}</th>
              <th>Δ Improvement</th>
            </tr>
          </thead>
          <tbody>
            {territories.map((row) => (
              <tr key={row.name}>
                <td className="font-body font-medium text-theme-primary">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-mck-sky" />
                    {row.name}
                  </span>
                </td>
                <td className="font-mono">{formatCr(row.salesCr)}</td>
                <td className="font-mono">{formatPercent(row.salesShare, 1)}</td>
                <td className="font-mono font-semibold text-mck-sky">{formatPercent(row.modelAccuracy)}</td>
                <td className="font-mono text-mck-coral">{formatPercent(row.salesTeamAccuracy)}</td>
                <td>
                  <span className="inline-flex items-center gap-1 rounded-md bg-mck-success/12 px-2 py-1 font-mono text-xs font-bold text-mck-success ring-1 ring-mck-success/25">
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
    <div className="data-table-wrap">
      <table className="data-table min-w-[720px]">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Product</th>
            <th>Segment</th>
            <th>Best Model</th>
            <th>Model</th>
            <th>{LABELS.salesTeam}</th>
            <th>Δ</th>
          </tr>
        </thead>
        <tbody>
          {skus.map((row) => (
            <tr key={row.sku}>
              <td className="font-mono text-xs text-theme-secondary">{row.sku}</td>
              <td className="font-body font-medium text-theme-primary">
                <span className="inline-flex items-center gap-2">
                  <Package className="h-4 w-4 shrink-0 text-mck-blue" />
                  {row.product}
                </span>
              </td>
              <td>
                <span
                  className={cn(
                    'rounded-md px-2 py-1 text-xs font-bold ring-1',
                    row.segment === 'High Volume' && 'bg-mck-blue/12 text-mck-blue ring-mck-blue/25',
                    row.segment === 'Medium Volume' && 'bg-mck-teal/12 text-mck-teal ring-mck-teal/25',
                    row.segment === 'Low Volume' && 'bg-white/10 text-theme-secondary ring-[color:var(--border-subtle)]',
                    row.segment === 'Sparse' && 'bg-mck-coral/12 text-mck-coral ring-mck-coral/25',
                  )}
                >
                  {row.segment}
                </span>
              </td>
              <td className="font-body text-theme-secondary">{row.bestModel}</td>
              <td className="font-mono font-semibold text-mck-sky">{formatPercent(row.modelAccuracy)}</td>
              <td className="font-mono text-mck-coral">{formatPercent(row.salesTeamAccuracy)}</td>
              <td className="font-mono font-bold text-mck-success">+{formatPercent(row.improvement)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
