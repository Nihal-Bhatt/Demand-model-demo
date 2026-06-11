import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  size?: 'sm' | 'md'
  className?: string
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = 'md',
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      className={cn(
        'segment-control inline-flex rounded-lg p-1 ring-1 ring-[color:var(--border-subtle)]',
        className,
      )}
      style={{ background: 'var(--surface-inset)' }}
      role="tablist"
    >
      {options.map((option) => {
        const active = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'segment-option relative cursor-pointer rounded-md font-display font-bold transition-colors duration-200',
              size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
              active ? 'text-white' : 'text-theme-secondary hover:text-theme-primary',
            )}
          >
            {active && (
              <motion.span
                layoutId="segment-pill"
                className="absolute inset-0 rounded-md bg-gradient-to-r from-mck-sky to-mck-blue shadow-md shadow-mck-sky/25"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
