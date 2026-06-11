import { useTheme } from '../context/ThemeContext'

export function useChartTheme() {
  const { isDark } = useTheme()

  return {
    isDark,
    grid: isDark ? 'rgba(0,169,244,0.12)' : '#E0E0E0',
    tick: isDark ? 'rgba(255,255,255,0.5)' : '#757575',
    legend: isDark ? 'rgba(255,255,255,0.7)' : '#333333',
    tooltip: {
      background: isDark ? 'rgba(5,28,44,0.95)' : 'rgba(255,255,255,0.98)',
      border: isDark ? '1px solid rgba(0,169,244,0.25)' : '1px solid #E0E0E0',
      color: isDark ? '#fff' : '#051C2C',
      boxShadow: isDark
        ? '0 12px 40px rgba(0,0,0,0.5), 0 0 24px rgba(0,169,244,0.15)'
        : '0 8px 24px rgba(5,28,44,0.12)',
    },
  }
}
