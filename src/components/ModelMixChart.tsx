import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { chartColors, mckColors } from '../theme/mckinsey'
import { useChartTheme } from '../hooks/useChartTheme'
import { cn } from '../lib/utils'
interface ModelMixChartProps {
  data: { name: string; share: number; avgWmape: number }[]
}

const palette = [mckColors.sky, mckColors.blue, mckColors.teal, mckColors.navyLight, mckColors.periwinkle, mckColors.coral]

export function ModelMixChart({ data }: ModelMixChartProps) {
  const chartTheme = useChartTheme()

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="share" nameKey="name" cx="50%" cy="50%" innerRadius={58} outerRadius={92} paddingAngle={4} stroke={chartTheme.isDark ? 'rgba(5,28,44,0.8)' : '#fff'} strokeWidth={2}>
          {data.map((_, index) => (
            <Cell key={index} fill={palette[index % palette.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ borderRadius: 12, background: chartTheme.tooltip.background, border: chartTheme.tooltip.border, color: chartTheme.tooltip.color, boxShadow: chartTheme.tooltip.boxShadow }}
          formatter={(value, _name, item) => {
            const payload = item?.payload as { avgWmape: number; name: string }
            return [`${value ?? 0}% SKUs · wMAPE ${payload.avgWmape.toFixed(2)}`, payload.name]
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function HorizonChart({
  data,
  target = 75,
  onHorizonClick,
}: {
  data: { horizon: string; modelAccuracy: number; volume: number }[]
  target?: number
  onHorizonClick?: (horizon: string) => void
}) {
  return (
    <div className="space-y-5">
      {data.map((item, i) => (
        <button
          key={item.horizon}
          type="button"
          onClick={() => onHorizonClick?.(item.horizon)}
          className={cn(
            'w-full space-y-2 rounded-lg p-2 text-left transition-colors duration-200',
            onHorizonClick && 'cursor-pointer hover:bg-[var(--surface-inset)]',
          )}
        >
          <div className="flex items-center justify-between text-sm">
            <span className="font-display font-bold text-theme-primary">{item.horizon}</span>
            <span className="stat-pill font-tabular">{item.volume}% volume</span>
          </div>
          <div className="relative">
            <div className="mb-1.5 flex justify-between font-body text-xs text-theme-secondary">
              <span>Model accuracy</span>
              <span className={cn('font-tabular font-bold', item.modelAccuracy >= target ? 'text-mck-success' : 'text-mck-sky')}>
                {item.modelAccuracy}%
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full ring-1 ring-[color:var(--border-subtle)]" style={{ background: 'var(--surface-inset)' }}>
              <div
                className="h-full rounded-full bg-gradient-to-r from-mck-sky to-mck-blue shadow-[0_0_12px_rgba(0,169,244,0.5)] transition-all duration-700"
                style={{ width: `${item.modelAccuracy}%`, transitionDelay: `${i * 100}ms` }}
              />
            </div>
            <div
              className="pointer-events-none absolute top-6 h-2.5 w-0.5 bg-mck-success/80"
              style={{ left: `${target}%` }}
              title={`Target ${target}%`}
            />
          </div>
        </button>
      ))}
    </div>
  )
}

export { chartColors }
