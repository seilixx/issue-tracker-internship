import { useCallback, useEffect, useState } from 'react'
import { fetchIssues } from '@/features/issues/api'
import { getErrorMessage } from '@/utils/apiClient'
import type { Priority } from '@/utils/apiTypes'

export interface DashboardStats {
  openCount: number
  inProgressCount: number
  criticalOpenCount: number
  resolvedTodayCount: number
  totalIssuesCount: number
  priorityCounts: Record<Priority, number>
}

const PRIORITIES: Priority[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

// Closed issues are immutable afterwards (feature 7: status DONE is terminal,
// PUT/PATCH both reject it) - so updatedAt on a DONE issue is effectively its
// close time, and sorting DONE issues by updatedAt desc reliably puts today's
// closures first. The backend has no closedAt-range filter, so this fetches a
// generous page of the most-recently-closed issues and filters client-side -
// same "fetch a big page, aggregate client-side" pattern the board already
// uses (see BOARD_FETCH_SIZE in useIssuesBoard.ts).
const RECENT_DONE_FETCH_SIZE = 100

function isToday(isoDate: string): boolean {
  const date = new Date(isoDate)
  const now = new Date()
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate()
}

interface UseDashboardStatsResult {
  stats: DashboardStats | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useDashboardStats(): UseDashboardStatsResult {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    // Every call asks for size=1 except the DONE one - the backend's
    // PagedResponse.totalElements gives an exact count across the whole
    // dataset regardless of page size, so there's no need to fetch full
    // lists just to count them.
    Promise.all([
      fetchIssues({ status: 'OPEN', sortBy: 'createdAt', sortDir: 'desc', page: 0, size: 1 }),
      fetchIssues({ status: 'IN_PROGRESS', sortBy: 'createdAt', sortDir: 'desc', page: 0, size: 1 }),
      fetchIssues({ status: 'OPEN', priority: 'CRITICAL', sortBy: 'createdAt', sortDir: 'desc', page: 0, size: 1 }),
      fetchIssues({ status: 'DONE', sortBy: 'updatedAt', sortDir: 'desc', page: 0, size: RECENT_DONE_FETCH_SIZE }),
      fetchIssues({ sortBy: 'createdAt', sortDir: 'desc', page: 0, size: 1 }),
      ...PRIORITIES.map((priority) => fetchIssues({ priority, sortBy: 'createdAt', sortDir: 'desc', page: 0, size: 1 })),
    ])
      .then(([openPage, inProgressPage, criticalOpenPage, donePage, totalPage, ...priorityPages]) => {
        if (cancelled) return
        const resolvedTodayCount = donePage.content.filter((issue) => issue.closedAt && isToday(issue.closedAt)).length
        const priorityCounts = PRIORITIES.reduce<Record<Priority, number>>(
          (acc, priority, index) => {
            acc[priority] = priorityPages[index].totalElements
            return acc
          },
          { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 },
        )
        setStats({
          openCount: openPage.totalElements,
          inProgressCount: inProgressPage.totalElements,
          criticalOpenCount: criticalOpenPage.totalElements,
          resolvedTodayCount,
          totalIssuesCount: totalPage.totalElements,
          priorityCounts,
        })
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err, 'Could not load dashboard stats.'))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [reloadToken])

  const refetch = useCallback(() => setReloadToken((token) => token + 1), [])

  return { stats, loading, error, refetch }
}
