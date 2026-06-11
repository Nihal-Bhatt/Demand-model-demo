import {
  Activity,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LineChart,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  BrainCircuit,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavSection } from '../data/mockData'
import { BRAND } from '../data/mockData'
import { cn } from '../lib/utils'

const navItems: { id: NavSection; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'accuracy', label: 'Accuracy Trends', icon: LineChart },
  { id: 'performance', label: 'Model Performance', icon: BarChart3 },
  { id: 'forecast', label: 'Forecast Analysis', icon: Target },
  { id: 'explainability', label: 'Forecast Explainability', icon: BrainCircuit },
  { id: 'pipeline', label: 'Pipeline Status', icon: Activity },
]

interface SidebarProps {
  active: NavSection
  collapsed: boolean
  onNavigate: (id: NavSection) => void
  onToggleCollapse: () => void
  mobile?: boolean
}

export function Sidebar({ active, collapsed, onNavigate, onToggleCollapse, mobile }: SidebarProps) {
  return (
    <motion.aside
      animate={{ width: collapsed && !mobile ? 72 : 288 }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className={cn(
        'fixed inset-y-0 left-0 z-30 flex overflow-hidden',
        mobile ? 'lg:hidden' : 'hidden lg:flex',
      )}
    >
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-mck-sky/50 to-transparent" />

      <div className="flex h-full w-full flex-col gradient-mck-glow shadow-[4px_0_48px_rgba(0,0,0,0.35)]">
        {/* Brand */}
        <div className={cn('border-b border-white/10', collapsed && !mobile ? 'px-3 py-5' : 'px-5 py-6')}>
          <div className={cn('flex items-center', collapsed && !mobile ? 'justify-center' : 'gap-3')}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mck-sky/20 ring-1 ring-mck-sky/50 shadow-[0_0_24px_rgba(0,169,244,0.35)]"
            >
              <TrendingUp className="h-5 w-5 text-mck-sky" />
              {!collapsed && <Sparkles className="absolute -right-1 -top-1 h-3 w-3 text-mck-sky/80" />}
            </motion.div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  className="min-w-0"
                >
                  <p className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-mck-sky/80">
                    {BRAND.tagline}
                  </p>
                  <h1 className="font-display text-lg font-bold text-white">{BRAND.product}</h1>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Nav */}
        <nav className={cn('flex-1 space-y-1 py-4', collapsed && !mobile ? 'px-2' : 'px-3')}>
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              title={collapsed && !mobile ? label : undefined}
              onClick={() => onNavigate(id)}
              className={cn(
                'group flex w-full cursor-pointer items-center rounded-xl text-sm font-semibold transition-all duration-200',
                collapsed && !mobile ? 'justify-center px-0 py-3' : 'gap-3 px-4 py-3',
                active === id
                  ? 'bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_20px_rgba(0,169,244,0.15)] ring-1 ring-mck-sky/30'
                  : 'text-white/55 hover:bg-white/8 hover:text-white',
              )}
            >
              <Icon className={cn('h-4 w-4 shrink-0', active === id ? 'text-mck-sky' : 'group-hover:text-mck-sky/70')} />
              {(!collapsed || mobile) && (
                <>
                  <span className="truncate font-display">{label}</span>
                  {active === id && <ChevronRight className="ml-auto h-4 w-4 text-mck-sky" />}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className={cn('border-t border-white/10 p-3', collapsed && !mobile && 'px-2')}>
          {(!collapsed || mobile) && (
            <div className="mb-3 rounded-xl bg-gradient-to-br from-mck-sky/10 to-mck-blue/10 p-4 ring-1 ring-mck-sky/20">
              <div className="flex items-center gap-2 font-display text-sm font-semibold text-white">
                <Settings className="h-4 w-4 text-mck-sky" />
                Model v2.5 · Thunderbird
              </div>
              <p className="mt-2 font-body text-xs leading-relaxed text-white/50">
                wMAPE-weighted selection · N+1/N+2/N+3
              </p>
              <div className="mt-3 flex gap-2">
                <span className="rounded-md bg-mck-success/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  Live
                </span>
                <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/60">
                  Mock Data
                </span>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed && !mobile ? 'Expand sidebar' : 'Collapse sidebar'}
            className={cn(
              'flex w-full cursor-pointer items-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all duration-200 hover:border-mck-sky/40 hover:bg-white/10 hover:text-white',
              collapsed && !mobile ? 'justify-center p-3' : 'gap-2 px-4 py-2.5',
            )}
          >
            {collapsed && !mobile ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <>
                <PanelLeftClose className="h-4 w-4" />
                <span className="font-display text-xs font-semibold">Collapse panel</span>
                <ChevronLeft className="ml-auto h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.aside>
  )
}
