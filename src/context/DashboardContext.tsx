import { createContext, useContext, useState, type ReactNode } from 'react'
import type { MetricStep, NavSection } from '../data/mockData'

interface DashboardContextValue {
  activeMetricStep: MetricStep
  setActiveMetricStep: (step: MetricStep) => void
  selectedSkuId: string | null
  setSelectedSkuId: (id: string | null) => void
  selectedTerritory: string | null
  setSelectedTerritory: (name: string | null) => void
  navigate: (section: NavSection, opts?: { skuId?: string; territory?: string; metricStep?: MetricStep }) => void
}

const DashboardContext = createContext<DashboardContextValue | null>(null)

const stepToSection: Record<MetricStep, NavSection> = {
  accuracy: 'accuracy',
  bias: 'accuracy',
  horizon: 'forecast',
  territory: 'overview',
  sku: 'sku',
  explainability: 'explainability',
}

export function DashboardProvider({
  children,
  onNavigate,
}: {
  children: ReactNode
  onNavigate: (section: NavSection) => void
}) {
  const [activeMetricStep, setActiveMetricStep] = useState<MetricStep>('accuracy')
  const [selectedSkuId, setSelectedSkuId] = useState<string | null>(null)
  const [selectedTerritory, setSelectedTerritory] = useState<string | null>(null)

  const navigate = (section: NavSection, opts?: { skuId?: string; territory?: string; metricStep?: MetricStep }) => {
    if (opts?.metricStep) setActiveMetricStep(opts.metricStep)
    if (opts?.skuId !== undefined) setSelectedSkuId(opts.skuId)
    if (opts?.territory !== undefined) setSelectedTerritory(opts.territory)
    onNavigate(section)
  }

  const goToMetricStep = (step: MetricStep) => {
    setActiveMetricStep(step)
    onNavigate(stepToSection[step])
  }

  return (
    <DashboardContext.Provider
      value={{
        activeMetricStep,
        setActiveMetricStep: goToMetricStep,
        selectedSkuId,
        setSelectedSkuId,
        selectedTerritory,
        setSelectedTerritory,
        navigate,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const ctx = useContext(DashboardContext)
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider')
  return ctx
}
