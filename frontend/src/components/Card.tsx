import type { HTMLAttributes } from 'react'
import styles from './Card.module.css'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'sm' | 'md' | 'lg'
}

const PADDING_CLASS = { sm: styles.paddingSm, md: styles.paddingMd, lg: styles.paddingLg }

export function Card({ padding = 'md', className, children, ...rest }: CardProps) {
  const classes = [styles.card, PADDING_CLASS[padding], className].filter(Boolean).join(' ')
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
