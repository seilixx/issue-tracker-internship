import { useEffect, useState } from 'react'
import { searchUsers } from '../api'
import type { UserSummary } from '../types'

const DEBOUNCE_MS = 300

export function useUserSearch(query: string) {
  const [results, setResults] = useState<UserSummary[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const trimmed = query.trim()
    if (trimmed.length < 2) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    let cancelled = false

    const timer = setTimeout(() => {
      searchUsers(trimmed, 0, 8)
        .then((page) => {
          if (!cancelled) setResults(page.content)
        })
        .catch(() => {
          if (!cancelled) setResults([])
        })
        .finally(() => {
          if (!cancelled) setLoading(false)
        })
    }, DEBOUNCE_MS)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [query])

  return { results, loading }
}
