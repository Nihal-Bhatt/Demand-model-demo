import { motion } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface EditorialHeroProps {
  lines: string[]
  accentLine?: number
  subtitle?: string
  badge?: string
  children?: ReactNode
  className?: string
  onExplore?: () => void
}

export function EditorialHero({
  lines,
  accentLine = 1,
  subtitle,
  badge,
  children,
  className,
  onExplore,
}: EditorialHeroProps) {
  return (
    <section className={cn('editorial-hero relative min-h-[420px] overflow-hidden rounded-3xl', className)}>
      <div className="editorial-hero-bg absolute inset-0" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.04]" />
      <div className="jazzy-shimmer pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative flex min-h-[420px] flex-col justify-between px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
        <div>
          {badge && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center gap-2 font-display text-[10px] font-bold uppercase tracking-[0.28em] text-mck-sky/80"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {badge}
            </motion.p>
          )}

          <h1 className="display-stack max-w-3xl">
            {lines.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  'display-line block',
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
              transition={{ delay: 0.6 }}
              className="mt-6 max-w-xl font-body text-sm leading-relaxed text-white/55 lg:text-base"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          {children}

          {onExplore && (
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={onExplore}
              className="group inline-flex cursor-pointer items-center gap-3 self-start font-display text-xs font-bold uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-mck-sky"
            >
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-white/20 transition-all group-hover:ring-mck-sky/50 group-hover:shadow-[0_0_20px_rgba(0,169,244,0.3)]">
                <ChevronDown className="h-4 w-4 animate-bounce" />
              </span>
              Scroll to explore
            </motion.button>
          )}
        </div>
      </div>
    </section>
  )
}
