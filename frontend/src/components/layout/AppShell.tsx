import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { getStoredSidebarCollapsed, setStoredSidebarCollapsed } from '@/utils/storage'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import styles from './AppShell.module.css'

export function AppShell() {
  const [collapsed, setCollapsed] = useState(getStoredSidebarCollapsed)

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
        <Outlet />
      </main>
    </div>
  )
}
