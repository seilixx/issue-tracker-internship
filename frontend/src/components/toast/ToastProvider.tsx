import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { IconAlertTriangle, IconCheckCircle, IconX } from '@/components/icons'
import { ToastContext, type ToastItem, type ToastTone } from './toast-context'
import styles from './Toasts.module.css'

const AUTO_DISMISS_MS = 4000

// Lightweight feedback system for mutating actions (create/update/delete).
// Rendered once at the shell level (see router.tsx) so any feature can fire
// a toast without threading props through the tree.
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const nextId = useRef(1)

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (message: string, tone: ToastTone = 'info') => {
      const id = nextId.current++
      setToasts((prev) => [...prev, { id, message, tone }])
      setTimeout(() => dismiss(id), AUTO_DISMISS_MS)
    },
    [dismiss],
  )

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.container} aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`${styles.toast} ${styles[toast.tone]}`} role="status">
            <span className={styles.icon}>
              {toast.tone === 'error' ? <IconAlertTriangle size={15} /> : <IconCheckCircle size={15} />}
            </span>
            <span className={styles.message}>{toast.message}</span>
            <button type="button" className={styles.dismiss} onClick={() => dismiss(toast.id)} aria-label="Dismiss">
              <IconX size={13} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
