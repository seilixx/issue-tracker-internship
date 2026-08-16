import { useCallback, useState } from 'react'
import type { Status } from '@/utils/apiTypes'
import { updateIssueStatus } from '../api'
import type { Issue } from '../types'

export function useUpdateIssueStatus() {
  const [pendingIds, setPendingIds] = useState<Set<number>>(new Set())

  const updateStatus = useCallback(async (id: number, status: Status): Promise<Issue> => {
    setPendingIds((prev) => new Set(prev).add(id))
    try {
      return await updateIssueStatus(id, status)
    } finally {
      setPendingIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }
  }, [])

  return { updateStatus, pendingIds }
}
