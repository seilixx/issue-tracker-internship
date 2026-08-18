import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AvatarChip } from '@/components/AvatarChip'
import { IconChevronDown, IconLogOut, IconUserCircle } from '@/components/icons'
import { useAuth } from '@/features/auth/useAuth'
import { getInitials } from '@/utils/format'
import styles from './UserMenu.module.css'

export function UserMenu() {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { user, logout } = useAuth()

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

  // UserMenu only ever renders inside ProtectedRoute (AppShell), so a real user is
  // always present here by the time this mounts.
  if (!user) return null

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <AvatarChip initials={getInitials(user.firstName, user.lastName)} avatarUrl={user.avatarUrl} size="sm" />
        <span className={styles.identity}>
          <span className={styles.name}>
            {user.firstName} {user.lastName}
          </span>
          <span className={styles.username}>@{user.username}</span>
        </span>
        <IconChevronDown size={14} className={open ? `${styles.chevron} ${styles.chevronOpen}` : styles.chevron} />
      </button>

      {open ? (
        <div className={styles.menu} role="menu">
          <div className={styles.menuHeader}>
            <p className={styles.menuName}>
              {user.firstName} {user.lastName}
            </p>
            <p className={styles.menuEmail}>@{user.username}</p>
          </div>
          <button
            type="button"
            className={styles.menuItem}
            role="menuitem"
            onClick={() => {
              setOpen(false)
              navigate(`/profile/${user.uuid}`)
            }}
          >
            <IconUserCircle size={16} />
            My profile
          </button>
          <button
            type="button"
            className={styles.menuItem}
            role="menuitem"
            onClick={() => {
              setOpen(false)
              logout()
            }}
          >
            <IconLogOut size={16} />
            Log out
          </button>
        </div>
      ) : null}
    </div>
  )
}
