import type { DragEvent, ReactNode } from 'react'
import type { Status } from '@/utils/apiTypes'
import styles from './IssueBoardColumn.module.css'

const STATUS_META: Record<Status, { label: string; tokenVar: string }> = {
  OPEN: { label: 'Open', tokenVar: '--color-status-open' },
  IN_PROGRESS: { label: 'In Progress', tokenVar: '--color-status-in-progress' },
  DONE: { label: 'Closed', tokenVar: '--color-status-done' },
}

interface IssueBoardColumnProps {
  status: Status
  count: number
  isDragOver: boolean
  onDragOver: (event: DragEvent<HTMLDivElement>) => void
  onDragLeave: () => void
  onDrop: (event: DragEvent<HTMLDivElement>) => void
  children: ReactNode
}

export function IssueBoardColumn({ status, count, isDragOver, onDragOver, onDragLeave, onDrop, children }: IssueBoardColumnProps) {
  const meta = STATUS_META[status]

  return (
    <div
      className={isDragOver ? `${styles.column} ${styles.columnDragOver}` : styles.column}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className={styles.header}>
        <span className={styles.dot} style={{ backgroundColor: `var(${meta.tokenVar})` }} aria-hidden="true" />
        <span className={styles.title}>
          {meta.label} <span className={styles.count}>· {count}</span>
        </span>
      </div>

      <div className={styles.cards}>
        {count === 0 ? <p className={styles.empty}>No issues</p> : children}
      </div>
    </div>
  )
}
