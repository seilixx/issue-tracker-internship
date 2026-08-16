import { useEffect, useRef, useState } from 'react'
import { IconX } from '@/components/icons'
import { useUserSearch } from '@/features/users/hooks/useUserSearch'
import type { UserSummary } from '@/features/users/types'
import styles from './AssigneePicker.module.css'

interface AssigneePickerProps {
  selected: UserSummary | null
  onSelect: (user: UserSummary | null) => void
}

export function AssigneePicker({ selected, onSelect }: AssigneePickerProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const { results, loading } = useUserSearch(query)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handlePointerDown(event: PointerEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [open])

  if (selected) {
    return (
      <span className={styles.chip}>
        {selected.firstName} {selected.lastName}
        <button type="button" className={styles.chipClear} onClick={() => onSelect(null)} aria-label="Clear assignee filter">
          <IconX size={12} />
        </button>
      </span>
    )
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <input
        type="text"
        className={styles.input}
        placeholder="Assignee..."
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
      />
      {open && query.trim().length >= 2 ? (
        <div className={styles.dropdown}>
          {loading ? <p className={styles.dropdownMessage}>Searching…</p> : null}
          {!loading && results.length === 0 ? <p className={styles.dropdownMessage}>No users found</p> : null}
          {results.map((user) => (
            <button
              key={user.uuid}
              type="button"
              className={styles.dropdownItem}
              onClick={() => {
                onSelect(user)
                setQuery('')
                setOpen(false)
              }}
            >
              {user.firstName} {user.lastName}
              <span className={styles.username}>@{user.username}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
