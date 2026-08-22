import React, { useState } from 'react'
import { CircleDot, Loader, CheckCircle2, Plus, Lock } from 'lucide-react'
import { useStore } from '@/store/AppStore'
import { AvatarGroup, EmptyState, PriorityBadge } from '@/components/bits'
import { STATUS_ORDER, timeAgo, STATUS_LABEL } from '@/lib/helpers'
import { canChangeStatus } from '@/lib/permissions'
import { cn } from '@/lib/utils'
import type { Issue, IssueStatus } from '@/types'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

const colIcon: Record<IssueStatus, React.ReactNode> = {
  OPEN: <CircleDot className="size-4 text-blue-600" />,
  IN_PROGRESS: <Loader className="size-4 text-amber-600" />,
  DONE: <CheckCircle2 className="size-4 text-emerald-600" />,
}
const colAccent: Record<IssueStatus, string> = {
  OPEN: 'bg-blue-500',
  IN_PROGRESS: 'bg-amber-500',
  DONE: 'bg-emerald-500',
}

export function IssueCard({ issue, draggable }: { issue: Issue; draggable: boolean }) {
  const s = useStore()
  const project = s.getProject(issue.projectId)
  const assignees = issue.assignedUuids.map((u) => s.getUser(u)).filter(Boolean) as NonNullable<ReturnType<typeof s.getUser>>[]
  return (
    <div
      draggable={draggable}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/issue-id', String(issue.id))
        e.dataTransfer.effectAllowed = 'move'
      }}
      onClick={() => s.openIssue(issue.id)}
      className={cn(
        'group cursor-pointer rounded-lg border border-neutral-200 bg-white p-3 shadow-xs transition-all hover:-translate-y-px hover:border-neutral-300 hover:shadow-md',
        draggable ? 'active:cursor-grabbing' : 'opacity-95',
        issue.status === 'DONE' && 'bg-neutral-50/70',
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] font-medium text-neutral-400">#{issue.id}</span>
        <PriorityBadge priority={issue.priority} />
      </div>
      <p className={cn('mt-1.5 line-clamp-2 text-[13px] font-medium leading-snug text-neutral-900', issue.status === 'DONE' && 'text-neutral-500 line-through decoration-neutral-300')}>
        {issue.title}
      </p>
      <p className="mt-1 truncate text-[11px] text-neutral-400">{project?.title ?? '—'}</p>
      <div className="mt-2.5 flex items-center justify-between">
        <AvatarGroup users={assignees} />
        <span className="text-[11px] text-neutral-400">{timeAgo(issue.updatedAt)}</span>
      </div>
    </div>
  )
}

function Column({ status, issues, totalCount, onDropIssue, onCreate }: {
  status: IssueStatus
  issues: Issue[]
  totalCount: number
  onDropIssue: (id: number, status: IssueStatus) => void
  onCreate?: () => void
}) {
  const s = useStore()
  const [over, setOver] = useState(false)
  return (
    <div
      className={cn('flex w-[300px] shrink-0 flex-col rounded-xl bg-neutral-100/80 p-2 transition-colors xl:w-auto xl:flex-1', over && 'kanban-col-drop')}
      onDragOver={(e) => { e.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault(); setOver(false)
        const id = Number(e.dataTransfer.getData('text/issue-id'))
        if (id) onDropIssue(id, status)
      }}
    >
      <div className="flex items-center gap-2 px-1.5 py-2">
        <span className={cn('size-1.5 rounded-full', colAccent[status])} />
        {colIcon[status]}
        <span className="text-xs font-bold tracking-wide text-neutral-700">{STATUS_LABEL[status].toUpperCase()}</span>
        <span className="rounded-md bg-white px-1.5 py-0.5 text-[11px] font-semibold text-neutral-500 ring-1 ring-neutral-200">{issues.length}</span>
        {issues.length !== totalCount && <span className="text-[11px] text-neutral-400">of {totalCount}</span>}
        {onCreate && status === 'OPEN' && (
          <TooltipProvider delayDuration={150}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={onCreate} className="ml-auto rounded-md p-1 text-neutral-400 hover:bg-white hover:text-neutral-700">
                  <Plus className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Create issue</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="scrollbar-thin flex min-h-24 flex-1 flex-col gap-2 overflow-y-auto px-0.5 pb-1" style={{ maxHeight: 'calc(100vh - 320px)' }}>
        {issues.map((i) => (
          <IssueCard key={i.id} issue={i} draggable={!!s.currentUser && canChangeStatus(s.currentUser, i)} />
        ))}
        {issues.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-neutral-200 py-8 text-center">
            <p className="text-xs font-medium text-neutral-500">No {STATUS_LABEL[status]} issues</p>
            <p className="px-4 text-[11px] text-neutral-400">Issues moved to this status will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export function KanbanBoard({ issues, allIssues, onCreate, scopeProjectId }: {
  issues: Issue[] // filtered + sorted
  allIssues: Issue[] // scope total (for column counts)
  onCreate: () => void
  scopeProjectId?: number
}) {
  const s = useStore()
  const filteredEmpty = issues.length === 0 && allIssues.length > 0

  if (allIssues.length === 0) {
    return (
      <EmptyState
        title="No issues found"
        hint={scopeProjectId ? 'This project has no issues yet. Create the first one to get started.' : 'There are no issues yet. Create the first one to get started.'}
        action={<Button size="sm" onClick={onCreate}><Plus className="size-4" /> Create Issue</Button>}
      />
    )
  }
  if (filteredEmpty) {
    return (
      <EmptyState
        title="No issues match the current filters"
        hint="Try adjusting or clearing your filters to see more results."
        action={<Button size="sm" variant="outline" onClick={s.clearFilters}>Clear Filters</Button>}
      />
    )
  }

  const drop = (id: number, status: IssueStatus) => {
    const issue = s.issues.find((i) => i.id === id)
    if (!issue || !s.currentUser) return
    if (!canChangeStatus(s.currentUser, issue)) return
    if (issue.status !== status) s.updateIssueStatus(id, status)
  }

  const readOnly = s.currentUser && !allIssues.some((i) => canChangeStatus(s.currentUser!, i))

  return (
    <div className="space-y-2">
      {readOnly && (
        <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-500">
          <Lock className="size-3.5" /> You have read-only access to these issues — dragging is disabled for issues you can't update.
        </div>
      )}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {STATUS_ORDER.map((st) => (
          <Column
            key={st}
            status={st}
            issues={issues.filter((i) => i.status === st)}
            totalCount={allIssues.filter((i) => i.status === st).length}
            onDropIssue={drop}
            onCreate={onCreate}
          />
        ))}
      </div>
    </div>
  )
}
