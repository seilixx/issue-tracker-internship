import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import styles from './AppShell.module.css'

export function AppShell() {
  return (
    <div className={styles.shell}>
      <div className={styles.sidebar}>
        <Sidebar />
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
