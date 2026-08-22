import { useMemo } from 'react'
import { useStore } from '@/store/AppStore'
import { FilterBar } from '@/components/FilterBar'
import { KanbanBoard } from '@/components/KanbanBoard'
import { IssueTable } from '@/components/IssueTable'
import { applyIssueQuery } from '@/lib/issueQuery'

export function IssueWorkspace({ scopeProjectId, onCreateIssue }: {
  scopeProjectId?: number
  onCreateIssue: () => void
}) {
  const s = useStore()
  const scoped = useMemo(
    () => (scopeProjectId != null ? s.issues.filter((i) => i.projectId === scopeProjectId) : s.issues),
    [s.issues, scopeProjectId],
  )
  const visible = useMemo(
    () => applyIssueQuery(s.issues, s.filters, s.sortField, s.sortDir, scopeProjectId),
    [s.issues, s.filters, s.sortField, s.sortDir, scopeProjectId],
  )

  return (
    <div className="space-y-3">
      <FilterBar scopeProjectId={scopeProjectId} />
      {s.viewMode === 'board'
        ? <KanbanBoard issues={visible} allIssues={scoped} onCreate={onCreateIssue} scopeProjectId={scopeProjectId} />
        : <IssueTable issues={visible} allIssues={scoped} onCreate={onCreateIssue} />}
    </div>
  )
}
