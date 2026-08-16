import type { Status } from '@/utils/apiTypes'
import styles from './StatusBadge.module.css'

const STATUS_META: Record<Status, { label: string; tokenVar: string }> = {
  OPEN: { label: 'Open', tokenVar: '--color-status-open' },
  IN_PROGRESS: { label: 'In Progress', tokenVar: '--color-status-in-progress' },
  DONE: { label: 'Closed', tokenVar: '--color-status-done' },
}

interface StatusBadgeProps {
  status: Status
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const meta = STATUS_META[status]
  return (
    <span className={className ? `${styles.badge} ${className}` : styles.badge}>
      <span className={styles.dot} style={{ backgroundColor: `var(${meta.tokenVar})` }} aria-hidden="true" />
      {meta.label}
    </span>
  )
}
