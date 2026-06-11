import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface StorySectionProps {
  chapter: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  id?: string
}

export function StorySection({ chapter, title, subtitle, children, className, id }: StorySectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('story-section', className)}
    >
      <header className="story-section-header mb-6">
        <p className="chapter-label">{chapter}</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-theme-primary lg:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 max-w-2xl font-body text-sm text-theme-secondary">{subtitle}</p>}
      </header>
      {children}
    </motion.section>
  )
}
