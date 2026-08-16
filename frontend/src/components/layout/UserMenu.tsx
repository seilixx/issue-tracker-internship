import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconChevronDown, IconLogOut, IconUserCircle } from '@/components/icons'
import { CURRENT_USER } from '@/features/users/currentUser'
import { getInitials } from '@/utils/format'
import styles from './UserMenu.module.css'

export function UserMenu() {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: PointerEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.avatar} aria-hidden="true">
          {getInitials(CURRENT_USER.firstName, CURRENT_USER.lastName)}
        </span>
        <IconChevronDown size={14} className={open ? `${styles.chevron} ${styles.chevronOpen}` : styles.chevron} />
      </button>

      {open ? (
        <div className={styles.menu} role="menu">
          <div className={styles.menuHeader}>
            <p className={styles.menuName}>
              {CURRENT_USER.firstName} {CURRENT_USER.lastName}
            </p>
            <p className={styles.menuEmail}>@{CURRENT_USER.username}</p>
          </div>
          <button
            type="button"
            className={styles.menuItem}
            role="menuitem"
            onClick={() => {
              setOpen(false)
              navigate(`/profile/${CURRENT_USER.uuid}`)
            }}
          >
            <IconUserCircle size={16} />
            My profile
          </button>
          <button type="button" className={styles.menuItem} role="menuitem">
            <IconLogOut size={16} />
            Log out
          </button>
        </div>
      ) : null}
    </div>
  )
}
