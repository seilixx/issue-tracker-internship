import { useCallback, useEffect, useState } from 'react'
import { getErrorMessage } from '@/utils/apiClient'
import type { PagedResponse } from '@/utils/apiTypes'
import { fetchIssues } from '../api'
import type { Issue, IssueFilters, IssueSort } from '../types'

interface UseIssuesListParams {
  filters: IssueFilters
  sort: IssueSort
  page: number
  size: number
}

interface UseIssuesListResult {
  data: PagedResponse<Issue> | null
  loading: boolean
  error: string | null
  refetch: () => void
}

/** Paginated issue list — powers the Table view, one page of results at a time. */
export function useIssuesList({ filters, sort, page, size }: UseIssuesListParams): UseIssuesListResult {
  const [data, setData] = useState<PagedResponse<Issue> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadToken, setReloadToken] = useState(0)

  const { projectId, status, priority, assigneeUuid } = filters
  const { sortBy, sortDir } = sort

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchIssues({ projectId, status, priority, assigneeUuid, sortBy, sortDir, page, size })
      .then((result) => {
        if (!cancelled) setData(result)
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err, 'Could not load issues.'))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [projectId, status, priority, assigneeUuid, sortBy, sortDir, page, size, reloadToken])

  const refetch = useCallback(() => setReloadToken((token) => token + 1), [])

  return { data, loading, error, refetch }
}
