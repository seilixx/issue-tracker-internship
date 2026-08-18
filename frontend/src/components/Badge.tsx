import type { ReactNode } from 'react'
import styles from './Badge.module.css'

export type BadgeTone = 'danger' | 'warning' | 'info' | 'success' | 'neutral'

interface BadgeProps {
  tone?: BadgeTone
  children: ReactNode
  className?: string
}

// Generic solid-fill pill. Picks a *tone*, not a business meaning — a page
// maps its own domain values (Priority, Status...) to a tone where it
// renders one, e.g. tone={priority === 'CRITICAL' ? 'danger' : 'warning'}.
export function Badge({ tone = 'neutral', children, className }: BadgeProps) {
  const classes = [styles.badge, styles[tone], className].filter(Boolean).join(' ')
  return <span className={classes}>{children}</span>
}
