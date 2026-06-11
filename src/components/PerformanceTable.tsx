import { ArrowRight, MapPin, Package } from 'lucide-react'
import { CategoryIllustration } from './agri/AgriIllustrations'
import type { SkuPerformance, TerritoryPerformance } from '../data/mockData'
import { cn, formatCr, formatPercent } from '../lib/utils'

interface DataTableProps {
  territories: TerritoryPerformance[]
  skus: SkuPerformance[]
  view: 'territory' | 'sku'
  selectedId?: string | null
  onSelect?: (id: string | null) => void
  onSkuNavigate?: (skuId: string) => void
  onTerritoryNavigate?: (name: string) => void
  searchQuery?: string
}

export function PerformanceTable({
  territories,
  skus,
  view,
  selectedId,
  onSelect,
  onSkuNavigate,
  onTerritoryNavigate,
  searchQuery = '',
}: DataTableProps) {
  const query = searchQuery.trim().toLowerCase()

  const filteredTerritories = territories.filter(
    (row) => !query || row.name.toLowerCase().includes(query),
  )

  const filteredSkus = skus.filter(
    (row) =>
      !query ||
      row.sku.toLowerCase().includes(query) ||
      row.product.toLowerCase().includes(query) ||
      row.segment.toLowerCase().includes(query) ||
      row.category.toLowerCase().includes(query),
  )

  if (view === 'territory') {
    return (
      <div className="data-table-wrap">
        <table className="data-table min-w-[640px]">
          <thead>
            <tr>
              <th>Territory</th>
              <th>Sales</th>
              <th>Share</th>
              <th>Accuracy</th>
              <th>wMAPE</th>
              <th>SKUs</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filteredTerritories.map((row) => {
              const id = row.name
              const selected = selectedId === id
              return (
                <tr
                  key={row.name}
                  className={cn(selected && 'is-selected')}
                  onClick={() => onSelect?.(selected ? null : id)}
                >
                  <td className="font-body font-medium text-theme-primary">
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0 text-mck-sky" />
                      {row.name}
                    </span>
                  </td>
                  <td className="font-tabular">{formatCr(row.salesCr)}</td>
                  <td className="font-tabular">{formatPercent(row.salesShare, 1)}</td>
                  <td className="font-tabular font-semibold text-mck-sky">{formatPercent(row.modelAccuracy)}</td>
                  <td className="font-tabular text-theme-secondary">{row.wmape.toFixed(2)}</td>
                  <td className="font-tabular">{row.skuCount}</td>
                  <td>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onTerritoryNavigate?.(row.name)
                      }}
                      className="btn-ghost !px-2 !py-1 text-xs"
                    >
                      Explore
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filteredTerritories.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-theme-secondary">No territories match your search.</p>
        )}
      </div>
    )
  }

  return (
    <div className="data-table-wrap">
      <table className="data-table min-w-[720px]">
        <thead>
          <tr>
            <th />
            <th>SKU</th>
            <th>Product</th>
            <th>Category</th>
            <th>Segment</th>
            <th>Accuracy</th>
            <th>wMAPE</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {filteredSkus.map((row) => {
            const id = row.sku
            const selected = selectedId === id
            return (
              <tr
                key={row.sku}
                className={cn(selected && 'is-selected')}
                onClick={() => onSelect?.(selected ? null : id)}
              >
                <td className="w-10">
                  <CategoryIllustration category={row.category} size={28} />
                </td>
                <td className="font-tabular text-xs text-theme-secondary">{row.sku}</td>
                <td className="font-body font-medium text-theme-primary">
                  <span className="inline-flex items-center gap-2">
                    <Package className="h-4 w-4 shrink-0 text-mck-blue" />
                    {row.product}
                  </span>
                </td>
                <td className="text-xs text-theme-secondary">{row.category}</td>
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
                <td className="font-tabular font-semibold text-mck-sky">{formatPercent(row.modelAccuracy)}</td>
                <td className="font-tabular text-theme-secondary">{row.wmape.toFixed(2)}</td>
                <td>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSkuNavigate?.(row.sku)
                    }}
                    className="btn-ghost !px-2 !py-1 text-xs"
                  >
                    Deep dive
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {filteredSkus.length === 0 && (
        <p className="px-4 py-8 text-center text-sm text-theme-secondary">No SKUs match your search.</p>
      )}
    </div>
  )
}
