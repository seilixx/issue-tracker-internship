import { Skeleton } from '@/components/Skeleton'
import styles from './BoardSkeleton.module.css'

const COLUMN_CARD_COUNTS = [3, 2, 4]

export function BoardSkeleton() {
  return (
    <div className={styles.board}>
      {COLUMN_CARD_COUNTS.map((cardCount, columnIndex) => (
        <div className={styles.column} key={columnIndex}>
          <Skeleton width={90} height={16} />
          {Array.from({ length: cardCount }).map((_, cardIndex) => (
            <div className={styles.card} key={cardIndex}>
              <Skeleton width="70%" height={12} />
              <Skeleton height={14} />
              <Skeleton width="40%" height={12} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
