import { useTheme } from '../context/ThemeContext'

export function AmbientBackground() {
  const { isDark } = useTheme()

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,169,244,0.18), transparent 55%), radial-gradient(ellipse 60% 50% at 100% 50%, rgba(34,81,255,0.12), transparent 50%), radial-gradient(ellipse 50% 40% at 0% 80%, rgba(0,169,244,0.08), transparent 45%), linear-gradient(180deg, #030f18 0%, #051c2c 40%, #071824 100%)'
            : 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,169,244,0.12), transparent 55%), radial-gradient(ellipse 60% 50% at 100% 30%, rgba(34,81,255,0.08), transparent 50%), radial-gradient(ellipse 50% 40% at 0% 90%, rgba(107,174,214,0.1), transparent 45%), linear-gradient(180deg, #eef4fa 0%, #f5f7fa 50%, #edf2f7 100%)',
        }}
      />

      {/* Animated orbs */}
      <div
        className="orb orb-1"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(0,169,244,0.35) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0,169,244,0.2) 0%, transparent 70%)',
        }}
      />
      <div
        className="orb orb-2"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(34,81,255,0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(34,81,255,0.15) 0%, transparent 70%)',
        }}
      />
      <div
        className="orb orb-3"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(107,174,214,0.2) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(232,119,106,0.1) 0%, transparent 70%)',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(rgba(0,169,244,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,169,244,0.06) 1px, transparent 1px)'
            : 'linear-gradient(rgba(5,28,44,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(5,28,44,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 100%)',
        }}
      />

      {/* Noise texture */}
      <div className="noise-overlay absolute inset-0 opacity-[0.03]" />
    </div>
  )
}
