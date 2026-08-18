import { useEffect, useRef, useState } from 'react'
import { IconBell } from '@/components/icons'
import styles from './NotificationButton.module.css'

// There is no notification system on the backend yet (no entity, no
// endpoint) — so this deliberately has no unread-count badge and no list of
// notifications. It's an honest empty state, not a placeholder pretending
// to be a real feature. See HANDOFF.md if a real notification system gets
// built later.
export function NotificationButton() {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handlePointerDown(event: PointerEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) setOpen(false)
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
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Notifications"
        onClick={() => setOpen((value) => !value)}
      >
        <IconBell size={18} />
      </button>

      {open ? (
        <div className={styles.popover} role="dialog">
          <p>Notifications aren&apos;t available yet.</p>
        </div>
      ) : null}
    </div>
  )
}
