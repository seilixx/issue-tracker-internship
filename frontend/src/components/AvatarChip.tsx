import { useState } from 'react'
import { Skeleton } from '@/components/Skeleton'
import styles from './AvatarChip.module.css'

interface AvatarChipProps {
  initials?: string
  title?: string
  avatarUrl?: string | null
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const DIMENSIONS = { sm: 22, md: 30, lg: 72 }

export function AvatarChip({ initials, title, avatarUrl, size = 'sm', loading = false }: AvatarChipProps) {
  const dimension = DIMENSIONS[size]
  const [imageFailed, setImageFailed] = useState(false)

  if (loading) {
    return <Skeleton width={dimension} height={dimension} radius="var(--radius-full)" />
  }

  if (avatarUrl && !imageFailed) {
    return (
      <img
        src={avatarUrl}
        alt=""
        title={title}
        className={`${styles.avatar} ${styles.avatarImage} ${styles[size]}`}
        onError={() => setImageFailed(true)}
      />
    )
  }

  return (
    <span className={`${styles.avatar} ${styles[size]}`} title={title} aria-hidden={!title}>
      {initials}
    </span>
  )
}

export interface AvatarStackPerson {
  key: string
  initials?: string
  title?: string
  avatarUrl?: string | null
  loading?: boolean
}

interface AvatarStackProps {
  people: AvatarStackPerson[]
  max?: number
  size?: 'sm' | 'md'
}

export function AvatarStack({ people, max = 3, size = 'sm' }: AvatarStackProps) {
  if (people.length === 0) return null

  const visible = people.slice(0, max)
  const overflow = people.length - visible.length

  return (
    <span className={styles.stack}>
      {visible.map((person) => (
        <AvatarChip
          key={person.key}
          initials={person.initials}
          title={person.title}
          avatarUrl={person.avatarUrl}
          size={size}
          loading={person.loading}
        />
      ))}
      {overflow > 0 ? (
        <span className={`${styles.overflow} ${styles[size]}`} title={`+${overflow} more`}>
          +{overflow}
        </span>
      ) : null}
    </span>
  )
}
