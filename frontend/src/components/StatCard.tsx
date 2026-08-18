import type { ReactNode } from 'react'
import { Card } from './Card'
import { IconGauge } from './icons'
import styles from './StatCard.module.css'

interface StatCardProps {
  label: string
  value: string | number
  /** 0-100. Omit to hide the progress bar (e.g. while the real figure is still loading). */
  progress?: number
  icon?: ReactNode
  className?: string
}

// Reusable dashboard tile: label, big value, thin progress bar, round icon.
// Deliberately dumb — it just renders whatever value/progress it's given;
// computing that value from real data is the caller's job.
export function StatCard({ label, value, progress, icon, className }: StatCardProps) {
  return (
    <Card className={className ? `${styles.card} ${className}` : styles.card}>
      <div className={styles.body}>
        <p className={styles.label}>{label}</p>
        <p className={styles.value}>{value}</p>
        {progress != null ? (
          <div className={styles.track} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div className={styles.fill} style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} />
          </div>
        ) : null}
      </div>
      <span className={styles.iconCircle} aria-hidden="true">
        {icon ?? <IconGauge size={20} />}
      </span>
    </Card>
  )
}
