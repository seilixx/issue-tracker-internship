import { useCallback, useEffect, useState } from 'react'
import { getErrorMessage } from '@/utils/apiClient'
import { fetchIssues } from '../api'
import type { Issue, IssueFilters, IssueSort } from '../types'

// The board renders every matching issue at once, grouped into columns by
// status, rather than paginating like the table — so we ask the (paginated)
// backend for one large page instead of true pagination.
export const BOARD_FETCH_SIZE = 100

interface UseIssuesBoardParams {
  filters: Omit<IssueFilters, 'status'>
  sort: IssueSort
}

interface UseIssuesBoardResult {
  issues: Issue[]
  setIssues: React.Dispatch<React.SetStateAction<Issue[]>>
  totalElements: number
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useIssuesBoard({ filters, sort }: UseIssuesBoardParams): UseIssuesBoardResult {
  const [issues, setIssues] = useState<Issue[]>([])
  const [totalElements, setTotalElements] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadToken, setReloadToken] = useState(0)

  const { projectId, priority, assigneeUuid } = filters
  const { sortBy, sortDir } = sort

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchIssues({ projectId, priority, assigneeUuid, sortBy, sortDir, page: 0, size: BOARD_FETCH_SIZE })
      .then((result) => {
        if (!cancelled) {
          setIssues(result.content)
          setTotalElements(result.totalElements)
        }
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
  }, [projectId, priority, assigneeUuid, sortBy, sortDir, reloadToken])

  const refetch = useCallback(() => setReloadToken((token) => token + 1), [])

  return { issues, setIssues, totalElements, loading, error, refetch }
}
