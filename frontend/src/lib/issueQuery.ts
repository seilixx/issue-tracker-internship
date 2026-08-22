import type { Issue, IssueFilters, SortDir, SortField } from '@/types'
import { PRIORITY_ORDER, STATUS_ORDER } from '@/lib/helpers'

export function applyIssueQuery(
  issues: Issue[],
  filters: IssueFilters,
  sortField: SortField,
  sortDir: SortDir,
  scopeProjectId?: number,
): Issue[] {
  let out = issues
  if (scopeProjectId != null) out = out.filter((i) => i.projectId === scopeProjectId)
  if (filters.projectId != null) out = out.filter((i) => i.projectId === filters.projectId)
  if (filters.status) out = out.filter((i) => i.status === filters.status)
  if (filters.priority) out = out.filter((i) => i.priority === filters.priority)
  if (filters.assigneeUuid) out = out.filter((i) => i.assignedUuids.includes(filters.assigneeUuid!))

  const dir = sortDir === 'asc' ? 1 : -1
  return [...out].sort((a, b) => {
    switch (sortField) {
      case 'createdAt': return (a.createdAt - b.createdAt) * dir
      case 'updatedAt': return (a.updatedAt - b.updatedAt) * dir
      case 'status': return (STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)) * dir
      case 'priority': return (PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority)) * dir
    }
  })
}

export function activeFilterCount(f: IssueFilters, scopeProjectId?: number): number {
  let n = 0
  if (f.projectId != null && scopeProjectId == null) n++
  if (f.status) n++
  if (f.priority) n++
  if (f.assigneeUuid) n++
  return n
}
