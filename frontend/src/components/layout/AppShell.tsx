import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { getStoredSidebarCollapsed, setStoredSidebarCollapsed } from '@/utils/storage'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import styles from './AppShell.module.css'

export function AppShell() {
  const [collapsed, setCollapsed] = useState(getStoredSidebarCollapsed)
  const location = useLocation()

  function toggleCollapsed() {
    setCollapsed((value) => {
      const next = !value
      setStoredSidebarCollapsed(next)
      return next
    })
  }

  return (
    <div className={collapsed ? `${styles.shell} ${styles.shellCollapsed}` : styles.shell}>
      <div className={styles.sidebar}>
        <Sidebar collapsed={collapsed} onToggleCollapsed={toggleCollapsed} />
      </div>
      <div className={styles.topbar}>
        <Topbar />
      </div>
      <main className={styles.main}>
        {/* Keyed by path so every navigation replays the page-enter animation
            and each page mounts fresh (pages fetch their data on mount). */}
        <div key={location.pathname} className={styles.page}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
