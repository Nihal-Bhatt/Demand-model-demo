import type { ReactNode } from 'react'
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

export function InsecticideIcon({ className, size = 48 }: IllustrationProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={cn('text-mck-coral/75', className)} fill="none" aria-hidden>
      <ellipse cx="32" cy="38" rx="14" ry="18" stroke="currentColor" strokeWidth="2" />
      <path d="M32 20v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 14h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 32c-3-2-5-1-6 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M46 32c3-2 5-1 6 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <circle cx="28" cy="36" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="36" cy="36" r="2" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

export function HerbicideBottleIcon({ className, size = 48 }: IllustrationProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={cn('text-mck-teal/75', className)} fill="none" aria-hidden>
      <path d="M26 12h12v8H26z" stroke="currentColor" strokeWidth="2" />
      <path d="M22 20h20l-2 34H24L22 20z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <rect x="28" y="28" width="8" height="14" rx="1" fill="currentColor" opacity="0.2" />
      <path d="M30 8h4v4h-4z" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

export function FungicideIcon({ className, size = 48 }: IllustrationProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={cn('text-mck-success/70', className)} fill="none" aria-hidden>
      <path d="M32 8c-8 6-12 16-8 24 2 4 6 6 8 6s6-2 8-6c4-8 0-18-8-24z" stroke="currentColor" strokeWidth="2" />
      <path d="M32 38v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 56h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="22" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    </svg>
  )
}

function FloatWrap({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <div className="animate-float-gentle" style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  )
}

export function AgriProductDecor({ className, size = 40 }: IllustrationProps) {
  return (
    <div className={cn('flex flex-col items-center gap-3', className)} aria-hidden>
      <FloatWrap><HerbicideBottleIcon size={size} /></FloatWrap>
      <FloatWrap delay={0.15}><InsecticideIcon size={size * 0.9} /></FloatWrap>
      <FloatWrap delay={0.3}><FungicideIcon size={size * 0.85} /></FloatWrap>
      <FloatWrap delay={0.45}><SprayIcon size={size * 0.8} /></FloatWrap>
    </div>
  )
}

const categoryArt = {
  Herbicide: { Icon: HerbicideBottleIcon, tint: 'text-mck-teal' },
  Fungicide: { Icon: FungicideIcon, tint: 'text-mck-success' },
  Insecticide: { Icon: InsecticideIcon, tint: 'text-mck-coral' },
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
          <h3 className="font-display text-lg font-bold text-white lg:text-xl">{title}</h3>
          {subtitle && <p className="mt-1 font-body text-sm text-white/60">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}
