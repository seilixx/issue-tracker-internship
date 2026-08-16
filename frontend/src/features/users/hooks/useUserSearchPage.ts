import { useEffect, useState } from 'react'
import { getErrorMessage } from '@/utils/apiClient'
import type { PagedResponse } from '@/utils/apiTypes'
import { searchUsers } from '../api'
import type { UserSummary } from '../types'

const PAGE_SIZE = 10

export function useUserSearchPage(query: string, page: number) {
  const [data, setData] = useState<PagedResponse<UserSummary> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const trimmed = query.trim()
    if (trimmed.length < 2) {
      setData(null)
      setError(null)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    searchUsers(trimmed, page, PAGE_SIZE)
      .then((result) => {
        if (!cancelled) setData(result)
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err, 'Could not search users.'))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [query, page])

  return { data, loading, error }
}
