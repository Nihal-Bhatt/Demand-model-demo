import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { cn } from '../lib/utils'

export function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'group relative inline-flex h-10 w-[4.5rem] cursor-pointer items-center rounded-full p-1 transition-all duration-300',
        'border shadow-inner',
        isDark
          ? 'border-mck-sky/30 bg-mck-navy-mid/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_20px_rgba(0,169,244,0.15)]'
          : 'border-mck-grey-300 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_16px_rgba(5,28,44,0.08)]',
      )}
    >
      <Sun
        className={cn(
          'absolute left-2.5 h-4 w-4 transition-all duration-300',
          isDark ? 'scale-75 text-white/30' : 'scale-100 text-mck-warning',
        )}
      />
      <Moon
        className={cn(
          'absolute right-2.5 h-4 w-4 transition-all duration-300',
          isDark ? 'scale-100 text-mck-sky' : 'scale-75 text-mck-grey-300',
        )}
      />
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        className={cn(
          'relative z-10 h-8 w-8 rounded-full shadow-lg',
          isDark
            ? 'ml-auto bg-gradient-to-br from-mck-sky to-mck-blue shadow-mck-sky/40'
            : 'bg-gradient-to-br from-mck-warning to-mck-peach shadow-mck-navy/15',
        )}
      />
      <span className="sr-only">{theme} mode</span>
    </button>
  )
}
