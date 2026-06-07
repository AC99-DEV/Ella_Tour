import React from 'react'
import { motion } from 'framer-motion'

/**
 * ScrollReveal – wraps children with a fade+slide-up animation on scroll
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.delay=0] – animation delay in seconds
 * @param {string} [props.className]
 * @param {'up'|'down'|'left'|'right'|'none'} [props.direction='up']
 */

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}) {
  const dirs = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...dirs[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
