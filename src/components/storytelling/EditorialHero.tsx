import { motion } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { AgriProductDecor } from '../agri/AgriIllustrations'

interface EditorialHeroProps {
  lines: string[]
  accentLine?: number
  subtitle?: string
  badge?: string
  children?: ReactNode
  className?: string
  onExplore?: () => void
  compact?: boolean
}

export function EditorialHero({
  lines,
  accentLine = 1,
  subtitle,
  badge,
  children,
  className,
  onExplore,
  compact,
}: EditorialHeroProps) {
  return (
    <section
      className={cn(
        'editorial-hero cinematic-vignette relative overflow-hidden rounded-2xl',
        compact ? 'min-h-0' : 'min-h-[280px]',
        className,
      )}
    >
      <div className="editorial-hero-bg absolute inset-0" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="jazzy-shimmer pointer-events-none absolute inset-0 opacity-40" />
      <div className="scanlines pointer-events-none absolute inset-0 opacity-[0.03]" />

      <AgriProductDecor className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 opacity-[0.35] lg:flex" />

      <div
        className={cn(
          'relative flex flex-col justify-between',
          compact ? 'px-5 py-6 sm:px-7' : 'min-h-[280px] px-6 py-8 sm:px-8 lg:px-10',
        )}
      >
        <div className="max-w-3xl">
          {badge && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 inline-flex items-center gap-2 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-mck-sky/80"
            >
              <Sparkles className="h-3 w-3" />
              {badge}
            </motion.p>
          )}

          <h1 className={cn(compact ? 'display-stack-compact' : 'display-stack')}>
            {lines.map((line, i) => (
              <motion.span
                key={`${line}-${i}`}
                initial={{ opacity: 0, y: compact ? 12 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  compact ? 'display-line-compact block' : 'display-line block',
                  i === accentLine && 'text-gradient-mck',
                  i !== accentLine && 'text-white',
                )}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-3 max-w-xl font-body text-xs leading-relaxed text-white/55 sm:text-sm"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {children && <div className="mt-6">{children}</div>}

        {onExplore && !compact && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={onExplore}
            className="group mt-6 inline-flex cursor-pointer items-center gap-2 self-start font-display text-[10px] font-bold uppercase tracking-[0.18em] text-white/45 transition-colors hover:text-mck-sky"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-white/15 transition-all group-hover:ring-mck-sky/40 group-hover:shadow-[0_0_16px_rgba(0,169,244,0.25)]">
              <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
            </span>
            Scroll to explore
          </motion.button>
        )}
      </div>
    </section>
  )
}
