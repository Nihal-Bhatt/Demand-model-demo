import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SprayBurst {
  id: number
  x: number
  y: number
}

const SPRAY_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'%3E%3Cpath d='M9 6h6v3H9z' fill='%232e7d6f'/%3E%3Cpath d='M7 9h10l-1.2 14H8.2L7 9z' fill='%232e7d6f' stroke='%2300a9f4' stroke-width='0.6'/%3E%3Cellipse cx='18' cy='8' rx='1.2' ry='0.8' fill='%2300a9f4' opacity='0.9'/%3E%3Ccircle cx='21' cy='6' r='1' fill='%2300a9f4' opacity='0.7'/%3E%3Ccircle cx='23' cy='4.5' r='0.7' fill='%2387ceeb' opacity='0.6'/%3E%3Ccircle cx='20' cy='4' r='0.5' fill='%2387ceeb' opacity='0.5'/%3E%3C/svg%3E") 6 6, auto`

const DROPLET_ANGLES = [-55, -35, -15, 5, 25, 45, 65]

export function SprayCursor() {
  const [bursts, setBursts] = useState<SprayBurst[]>([])
  const idRef = useRef(0)

  useEffect(() => {
    document.documentElement.style.setProperty('--spray-cursor', SPRAY_CURSOR)
    document.body.classList.add('spray-cursor-active')
    return () => {
      document.body.classList.remove('spray-cursor-active')
      document.documentElement.style.removeProperty('--spray-cursor')
    }
  }, [])

  const handleClick = useCallback((e: MouseEvent) => {
    if (e.button !== 0) return
    const id = ++idRef.current
    setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY }])
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id))
    }, 700)
  }, [])

  useEffect(() => {
    window.addEventListener('mousedown', handleClick)
    return () => window.removeEventListener('mousedown', handleClick)
  }, [handleClick])

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
      <AnimatePresence>
        {bursts.map((burst) => (
          <div
            key={burst.id}
            className="absolute"
            style={{ left: burst.x, top: burst.y }}
          >
            {DROPLET_ANGLES.map((angle, i) => {
              const rad = (angle * Math.PI) / 180
              const dist = 28 + (i % 3) * 12
              return (
                <motion.span
                  key={angle}
                  className="absolute block rounded-full"
                  style={{
                    width: 4 + (i % 2) * 3,
                    height: 4 + (i % 2) * 3,
                    background: i % 2 === 0 ? 'rgba(0,169,244,0.85)' : 'rgba(46,125,111,0.75)',
                    boxShadow: '0 0 6px rgba(0,169,244,0.5)',
                    marginLeft: -2,
                    marginTop: -2,
                  }}
                  initial={{ opacity: 0.95, scale: 0.3, x: 0, y: 0 }}
                  animate={{
                    opacity: 0,
                    scale: 1.2,
                    x: Math.cos(rad) * dist,
                    y: Math.sin(rad) * dist - 8,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.02 }}
                />
              )
            })}
            <motion.span
              className="absolute block rounded-full"
              style={{
                width: 48,
                height: 48,
                marginLeft: -24,
                marginTop: -24,
                background: 'radial-gradient(circle, rgba(0,169,244,0.25) 0%, rgba(46,125,111,0.08) 50%, transparent 70%)',
              }}
              initial={{ opacity: 0.7, scale: 0.2 }}
              animate={{ opacity: 0, scale: 1.4 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
