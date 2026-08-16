import type { CSSProperties } from 'react'
import styles from './Skeleton.module.css'

interface SkeletonProps {
  width?: number | string
  height?: number | string
  radius?: string
  className?: string
}

export function Skeleton({ width = '100%', height = '1em', radius, className }: SkeletonProps) {
  const style: CSSProperties = { width, height }
  if (radius) style.borderRadius = radius

  return <span className={className ? `${styles.skeleton} ${className}` : styles.skeleton} style={style} aria-hidden="true" />
}
