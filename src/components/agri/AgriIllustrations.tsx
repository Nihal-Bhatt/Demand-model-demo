import { cn } from '../../lib/utils'

type IllustrationProps = { className?: string; size?: number }

export function FarmerIcon({ className, size = 48 }: IllustrationProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={cn('text-mck-sky/70', className)} fill="none" aria-hidden>
      <circle cx="32" cy="14" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 28c2-6 8-9 12-9s10 3 12 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 52V34l16-8 16 8v18" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M24 52V42h16v10" stroke="currentColor" strokeWidth="2" />
      <path d="M8 52h48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function SprayIcon({ className, size = 48 }: IllustrationProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={cn('text-mck-teal/70', className)} fill="none" aria-hidden>
      <rect x="22" y="18" width="20" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M26 18V12h12v6" stroke="currentColor" strokeWidth="2" />
      <path d="M32 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 24c-4 0-6 4-6 8s2 8 6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M50 20c3 2 5 5 5 9s-2 7-5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <circle cx="32" cy="34" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    </svg>
  )
}

export function CropRowIcon({ className, size = 64 }: IllustrationProps) {
  return (
    <svg viewBox="0 0 80 48" width={size} height={size * 0.6} className={cn('text-mck-success/60', className)} fill="none" aria-hidden>
      <path d="M0 40 Q20 32 40 40 T80 40" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      {[12, 28, 44, 60, 72].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 40 Q${x - 4} ${28 - i} ${x} ${18 + (i % 2) * 4}`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx={x} cy={16 + (i % 2) * 4} rx="3" ry="5" fill="currentColor" opacity="0.35" />
        </g>
      ))}
    </svg>
  )
}

export function LeafIcon({ className, size = 32 }: IllustrationProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={cn('text-mck-success/50', className)} fill="none" aria-hidden>
      <path d="M16 4C8 12 6 22 16 28C26 22 24 12 16 4Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 8v16" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    </svg>
  )
}

const categoryArt = {
  Herbicide: { Icon: SprayIcon, tint: 'text-mck-teal' },
  Fungicide: { Icon: LeafIcon, tint: 'text-mck-success' },
  Insecticide: { Icon: SprayIcon, tint: 'text-mck-coral' },
  'Seed Care': { Icon: CropRowIcon, tint: 'text-mck-amber' },
  Nutrition: { Icon: LeafIcon, tint: 'text-mck-blue' },
} as const

export type ProductCategory = keyof typeof categoryArt

export function CategoryIllustration({ category, className, size = 40 }: { category: ProductCategory; className?: string; size?: number }) {
  const { Icon, tint } = categoryArt[category] ?? categoryArt.Herbicide
  return <Icon className={cn(tint, className)} size={size} />
}

export function AgriPageHero({
  category,
  title,
  subtitle,
}: {
  category?: ProductCategory
  title: string
  subtitle?: string
}) {
  return (
    <div className="relative overflow-hidden rounded-xl gradient-mck-glow px-6 py-5 lg:px-8">
      <div className="pointer-events-none absolute -right-4 top-2 opacity-30">
        <CropRowIcon size={120} />
      </div>
      <div className="pointer-events-none absolute right-24 top-6 opacity-20">
        <FarmerIcon size={72} />
      </div>
      <div className="relative flex items-start gap-4">
        {category && (
          <div className="hidden rounded-xl bg-white/10 p-3 ring-1 ring-white/15 sm:block">
            <CategoryIllustration category={category} size={36} />
          </div>
        )}
        <div>
          <h3 className="font-display text-xl font-bold text-white lg:text-2xl">{title}</h3>
          {subtitle && <p className="mt-1 font-body text-sm text-white/60">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}
