import { useState } from 'react'
import { Button } from '@/components/Button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { IconPlus } from '@/components/icons'
import { CreateIssueModal } from '@/features/issues/components/CreateIssueModal'
import { GlobalSearch } from './GlobalSearch'
import { NotificationButton } from './NotificationButton'
import { UserMenu } from './UserMenu'
import styles from './Topbar.module.css'

export function Topbar() {
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <header className={styles.topbar}>
      <GlobalSearch />

      <div className={styles.actions}>
        <Button variant="primary" onClick={() => setCreateOpen(true)}>
          <IconPlus size={16} />
          Manage Issue
        </Button>
        <NotificationButton />
        <ThemeToggle />
        <UserMenu />
      </div>

      <CreateIssueModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </header>
  )
}
