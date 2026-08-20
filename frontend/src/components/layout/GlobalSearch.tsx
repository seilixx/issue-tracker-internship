import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AvatarChip } from '@/components/AvatarChip'
import { IconFolder, IconSearch } from '@/components/icons'
import { useProjects } from '@/features/projects/hooks/useProjects'
import { useUserSearch } from '@/features/users/hooks/useUserSearch'
import { getInitials } from '@/utils/format'
import styles from './GlobalSearch.module.css'

const MAX_RESULTS_PER_SECTION = 5

// Searches real data only: projects come from GET /api/projects (filtered
// client-side — the list is small and there's no dedicated search endpoint
// for it), people from the real GET /api/users/search endpoint. Issues are
// deliberately NOT included here: the backend has no title/text search
// endpoint for issues (only filters by projectId/status/priority/assignee),
// and this redesign pass isn't touching the backend — faking issue results
// from whatever page happens to be loaded elsewhere would be misleading.
export function GlobalSearch() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const { projects } = useProjects()
  const { results: users, loading: usersLoading } = useUserSearch(query)

  // Ctrl/Cmd+K focuses the search from anywhere in the app (standard
  // "command palette" shortcut in this kind of tool).
  useEffect(() => {
    function handleGlobalKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [])

  const trimmed = query.trim()
  const matchedProjects = useMemo(() => {
    if (!trimmed) return []
    const needle = trimmed.toLowerCase()
    return projects
      .filter((project) => project.title.toLowerCase().includes(needle) || project.description?.toLowerCase().includes(needle))
      .slice(0, MAX_RESULTS_PER_SECTION)
  }, [projects, trimmed])

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

  function goTo(path: string) {
    navigate(path)
    setQuery('')
    setOpen(false)
  }

  const showDropdown = open && trimmed.length > 0
  const hasResults = matchedProjects.length > 0 || users.length > 0

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.box}>
        <IconSearch size={16} className={styles.icon} />
        <input
          type="search"
          className={styles.input}
          placeholder="Search"
          value={query}
          ref={inputRef}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
        />
        <kbd className={styles.hint}>Ctrl K</kbd>
      </div>

      {showDropdown ? (
        <div className={styles.dropdown} role="listbox">
          {matchedProjects.length > 0 ? (
            <div className={styles.section}>
              <p className={styles.sectionTitle}>Projects</p>
              {matchedProjects.map((project) => (
                <button key={project.id} type="button" className={styles.item} onClick={() => goTo(`/projects/${project.id}`)}>
                  <span className={styles.itemIcon}>
                    <IconFolder size={14} />
                  </span>
                  {project.title}
                </button>
              ))}
            </div>
          ) : null}

          {users.length > 0 ? (
            <div className={styles.section}>
              <p className={styles.sectionTitle}>People</p>
              {users.slice(0, MAX_RESULTS_PER_SECTION).map((user) => (
                <button key={user.uuid} type="button" className={styles.item} onClick={() => goTo(`/profile/${user.uuid}`)}>
                  <AvatarChip initials={getInitials(user.firstName, user.lastName)} avatarUrl={user.avatarUrl} size="sm" />
                  {user.firstName} {user.lastName}
                  <span className={styles.itemMeta}>@{user.username}</span>
                </button>
              ))}
            </div>
          ) : null}

          {!usersLoading && !hasResults ? <p className={styles.empty}>No projects or people match "{trimmed}".</p> : null}
          {usersLoading && matchedProjects.length === 0 && users.length === 0 ? <p className={styles.empty}>Searching…</p> : null}
        </div>
      ) : null}
    </div>
  )
}
