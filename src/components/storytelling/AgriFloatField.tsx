import { motion } from 'framer-motion'
import { LeafIcon } from '../agri/AgriIllustrations'

const particles = [
  { x: '8%', y: '20%', delay: 0, size: 20 },
  { x: '85%', y: '15%', delay: 0.4, size: 16 },
  { x: '72%', y: '55%', delay: 0.8, size: 24 },
  { x: '15%', y: '70%', delay: 1.2, size: 18 },
  { x: '92%', y: '78%', delay: 0.6, size: 14 },
]

export function AgriFloatField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute opacity-20"
          style={{ left: p.x, top: p.y }}
          animate={{ y: [0, -12, 0], rotate: [0, 8, -4, 0], opacity: [0.12, 0.28, 0.12] }}
          transition={{ duration: 6 + i, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        >
          <LeafIcon size={p.size} />
        </motion.div>
      ))}
    </div>
  )
}
