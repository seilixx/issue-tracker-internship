import { Skeleton } from '@/components/Skeleton'
import styles from './TableSkeleton.module.css'

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className={styles.wrapper}>
      {Array.from({ length: rows }).map((_, index) => (
        <div className={styles.row} key={index}>
          <Skeleton width={18} height={18} radius="var(--radius-full)" />
          <Skeleton width="35%" height={14} />
          <Skeleton width="15%" height={14} />
          <Skeleton width={70} height={20} radius="var(--radius-full)" />
          <Skeleton width={60} height={14} />
          <Skeleton width={80} height={14} />
        </div>
      ))}
    </div>
  )
}
