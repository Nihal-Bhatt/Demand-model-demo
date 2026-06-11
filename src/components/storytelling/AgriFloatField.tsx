import { motion } from 'framer-motion'
import {
  HerbicideBottleIcon,
  InsecticideIcon,
  FungicideIcon,
  SprayIcon,
  LeafIcon,
} from '../agri/AgriIllustrations'

const particles = [
  { x: '6%', y: '18%', delay: 0, Icon: HerbicideBottleIcon, size: 28 },
  { x: '88%', y: '12%', delay: 0.5, Icon: InsecticideIcon, size: 26 },
  { x: '78%', y: '62%', delay: 1, Icon: FungicideIcon, size: 24 },
  { x: '12%', y: '72%', delay: 0.3, Icon: SprayIcon, size: 22 },
  { x: '92%', y: '82%', delay: 0.8, Icon: LeafIcon, size: 18 },
]

export function AgriFloatField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map(({ x, y, delay, Icon, size }, i) => (
        <motion.div
          key={i}
          className="absolute opacity-25"
          style={{ left: x, top: y }}
          animate={{ y: [0, -10, 0], rotate: [0, 6, -3, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 5 + i * 0.5, repeat: Infinity, delay, ease: 'easeInOut' }}
        >
          <Icon size={size} />
        </motion.div>
      ))}
    </div>
  )
}
