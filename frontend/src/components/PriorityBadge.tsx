import type { Priority } from '@/utils/apiTypes'
import styles from './PriorityBadge.module.css'

// Reuses the app's existing priority tokens (same ones PriorityIcon draws
// from) as a solid pill instead of an icon+label — a different look for the
// same semantic colors, not a second competing palette.
const PRIORITY_LABELS: Record<Priority, string> = { LOW: 'Low', MEDIUM: 'Medium', HIGH: 'High', CRITICAL: 'Critical' }
export const PRIORITY_TOKEN_VARS: Record<Priority, string> = {
  LOW: '--color-priority-low',
  MEDIUM: '--color-priority-medium',
  HIGH: '--color-priority-high',
  CRITICAL: '--color-accent',
}

interface PriorityBadgeProps {
  priority: Priority
  className?: string
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  return (
    <span
      className={className ? `${styles.badge} ${className}` : styles.badge}
      style={{ backgroundColor: `var(${PRIORITY_TOKEN_VARS[priority]})` }}
    >
      {PRIORITY_LABELS[priority]}
    </span>
  )
}
