import { createContext, useContext, useState, type ReactNode } from 'react'
import type { NavSection } from '../data/mockData'

interface DashboardContextValue {
  selectedSkuId: string | null
  setSelectedSkuId: (id: string | null) => void
  selectedTerritory: string | null
  setSelectedTerritory: (name: string | null) => void
  navigate: (section: NavSection, opts?: { skuId?: string; territory?: string }) => void
}

const DashboardContext = createContext<DashboardContextValue | null>(null)

export function DashboardProvider({
  children,
  onNavigate,
}: {
  children: ReactNode
  onNavigate: (section: NavSection) => void
}) {
  const [selectedSkuId, setSelectedSkuId] = useState<string | null>(null)
  const [selectedTerritory, setSelectedTerritory] = useState<string | null>(null)

  const navigate = (section: NavSection, opts?: { skuId?: string; territory?: string }) => {
    if (opts?.skuId !== undefined) setSelectedSkuId(opts.skuId)
    if (opts?.territory !== undefined) setSelectedTerritory(opts.territory)
    onNavigate(section)
  }

  return (
    <DashboardContext.Provider
      value={{
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
