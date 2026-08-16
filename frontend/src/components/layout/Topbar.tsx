import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeToggle } from '@/components/ThemeToggle'
import { IconPlus, IconSearch } from '@/components/icons'
import { UserMenu } from './UserMenu'
import styles from './Topbar.module.css'

export function Topbar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!query.trim()) return
    navigate(`/users/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header className={styles.topbar}>
      <form className={styles.search} onSubmit={handleSubmit} role="search">
        <IconSearch size={16} className={styles.searchIcon} />
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search people... (press Enter)"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>

      <div className={styles.actions}>
        <button type="button" className={styles.createButton}>
          <IconPlus size={16} />
          Create issue
        </button>
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  )
}
