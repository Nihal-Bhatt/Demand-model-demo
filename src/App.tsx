import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, Calendar, Download, Menu, PanelLeftOpen, Zap } from 'lucide-react'
import { SprayCursor } from './components/SprayCursor'
import { ScrollProgress } from './components/storytelling/ScrollProgress'
import { AmbientBackground } from './components/AmbientBackground'
import { Sidebar } from './components/Sidebar'
import { ThemeToggle } from './components/ThemeToggle'
import { DashboardProvider } from './context/DashboardContext'
import { agriCoData, BRAND, type NavSection } from './data/mockData'
import { cn } from './lib/utils'
import { OverviewPage } from './pages/OverviewPage'
import { MetricsPage } from './pages/MetricsPage'
import { SkuExplorerPage } from './pages/SkuDeepDivePage'
import { DriversPage } from './pages/ExplainabilityPage'
import { PipelinePage } from './pages/PipelinePage'

const sectionTitles: Record<NavSection, string> = {
  overview: 'Overview',
  metrics: 'Metrics & Models',
  sku: 'SKU Explorer',
  drivers: 'Forecast Drivers',
  pipeline: 'Pipeline Status',
}

function AppContent() {
  const [activeSection, setActiveSection] = useState<NavSection>('overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const data = agriCoData

  const renderPage = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewPage />
      case 'metrics':
        return <MetricsPage />
      case 'sku':
        return <SkuExplorerPage />
      case 'drivers':
        return <DriversPage />
      case 'pipeline':
        return <PipelinePage />
    }
  }

  return (
    <DashboardProvider onNavigate={setActiveSection}>
      <div className="relative min-h-screen">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ScrollProgress />
        <SprayCursor />
        <AmbientBackground />

        <Sidebar
          active={activeSection}
          collapsed={sidebarCollapsed}
          onNavigate={(id) => {
            setActiveSection(id)
            setMobileNavOpen(false)
          }}
          onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        />

        {mobileNavOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button type="button" className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileNavOpen(false)} aria-label="Close menu" />
            <div className="relative z-50 w-72">
              <Sidebar
                active={activeSection}
                collapsed={false}
                mobile
                onNavigate={(id) => {
                  setActiveSection(id)
                  setMobileNavOpen(false)
                }}
                onToggleCollapse={() => setMobileNavOpen(false)}
              />
            </div>
          </div>
        )}

        <div
          className={cn(
            'relative transition-[padding-left] duration-300 ease-out max-lg:pl-0',
            sidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-72',
          )}
        >
          <header
            className="sticky top-0 z-20 border-b backdrop-blur-2xl transition-colors duration-500 max-lg:!pl-0"
            style={{ background: 'var(--header-bg)', borderColor: 'var(--header-border)' }}
          >
            <div className="hero-glow-line" />
            <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => (window.innerWidth >= 1024 ? setSidebarCollapsed((c) => !c) : setMobileNavOpen(true))}
                  className="btn-ghost !px-2.5 lg:hidden"
                  aria-label="Open navigation"
                >
                  <Menu className="h-4 w-4" />
                </button>
                {sidebarCollapsed && (
                  <button
                    type="button"
                    onClick={() => setSidebarCollapsed(false)}
                    className="btn-ghost !px-2.5 hidden lg:inline-flex"
                    aria-label="Expand sidebar"
                  >
                    <PanelLeftOpen className="h-4 w-4" />
                  </button>
                )}
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="stat-pill">
                      <Zap className="h-3 w-3 text-mck-sky" />
                      {BRAND.tagline}
                    </span>
                    <span className="stat-pill text-mck-success">Backtest Active</span>
                    <span className={cn('stat-pill stat-pill-active hidden sm:inline-flex')}>
                      {sectionTitles[activeSection]}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-theme-primary lg:text-3xl">
                    {BRAND.name}{' '}
                    <span className="text-gradient-mck">Dashboard</span>
                  </h2>
                  <p className="font-body text-sm text-theme-secondary">
                    {data.subtitle} · {data.period}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <ThemeToggle />
                <button type="button" className="btn-ghost">
                  <Calendar className="h-4 w-4 text-mck-sky" />
                  {data.period}
                </button>
                <button type="button" className="btn-ghost hidden sm:inline-flex">
                  <Download className="h-4 w-4" />
                  Export
                </button>
                <button type="button" aria-label="Notifications" className="btn-ghost !px-2.5">
                  <Bell className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>

          <main id="main-content" className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </DashboardProvider>
  )
}

function App() {
  return <AppContent />
}

export default App
