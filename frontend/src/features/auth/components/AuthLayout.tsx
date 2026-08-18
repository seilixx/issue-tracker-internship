import type { ReactNode } from 'react'
import { Card } from '@/components/Card'
import { ThemeToggle } from '@/components/ThemeToggle'
import styles from './AuthLayout.module.css'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.themeToggle}>
        <ThemeToggle />
      </div>

      <Card padding="lg" className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">
            IT
          </span>
          <span className={styles.brandName}>IssueTracker</span>
        </div>

        <div className={styles.heading}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        {children}

        <p className={styles.footer}>{footer}</p>
      </Card>
    </div>
  )
}
