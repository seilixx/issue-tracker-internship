import { useCallback, useEffect, useState } from 'react'
import { getErrorMessage } from '@/utils/apiClient'
import { fetchIssueDetail } from '../api'
import type { IssueDetail } from '../types'

interface UseIssueDetailResult {
  issue: IssueDetail | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useIssueDetail(issueId: number | null): UseIssueDetailResult {
  const [issue, setIssue] = useState<IssueDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    if (issueId == null) {
      setIssue(null)
      setError(null)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    fetchIssueDetail(issueId)
      .then((detail) => {
        if (!cancelled) setIssue(detail)
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err, 'Could not load this issue.'))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [issueId, reloadToken])

  const refetch = useCallback(() => setReloadToken((token) => token + 1), [])

  return { issue, loading, error, refetch }
}
