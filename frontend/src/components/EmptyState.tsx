import type { ReactNode } from 'react'
import { IconInbox } from '@/components/icons'
import styles from './EmptyState.module.css'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description: string
  tone?: 'default' | 'error'
  action?: ReactNode
}

export function EmptyState({ icon, title, description, tone = 'default', action }: EmptyStateProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <span className={tone === 'error' ? `${styles.icon} ${styles.iconError}` : styles.icon} aria-hidden="true">
          {icon ?? <IconInbox size={22} />}
        </span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        {action ? <div className={styles.action}>{action}</div> : null}
      </div>
    </div>
  )
}
