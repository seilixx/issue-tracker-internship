import type { ReactNode } from 'react'
import { IconLock } from '@/components/icons'
import styles from './RestrictedNote.module.css'

export function RestrictedNote({ children }: { children: ReactNode }) {
  return (
    <p className={styles.note}>
      <IconLock size={12} />
      {children}
    </p>
  )
}
