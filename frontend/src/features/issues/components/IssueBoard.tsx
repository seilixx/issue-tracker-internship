import { useMemo, useState, type DragEvent } from 'react'
import { EmptyState } from '@/components/EmptyState'
import { IconAlertTriangle, IconX } from '@/components/icons'
import { getErrorMessage } from '@/utils/apiClient'
import type { Status } from '@/utils/apiTypes'
import { getInitials } from '@/utils/format'
import { useUsersLookup } from '@/features/users/hooks/useUsersLookup'
import type { Project } from '@/features/projects/types'
import { BOARD_FETCH_SIZE, useIssuesBoard } from '../hooks/useIssuesBoard'
import { useUpdateIssueStatus } from '../hooks/useUpdateIssueStatus'
import type { Issue, IssueFilters, IssueSort } from '../types'
import { BoardSkeleton } from './BoardSkeleton'
import { IssueBoardColumn } from './IssueBoardColumn'
import { IssueCard } from './IssueCard'
import styles from './IssueBoard.module.css'

const COLUMNS: Status[] = ['OPEN', 'IN_PROGRESS', 'DONE']

interface IssueBoardProps {
  filters: Omit<IssueFilters, 'status'>
  sort: IssueSort
  projectsById: Map<number, Project>
  onOpenIssue: (id: number) => void
}

export function IssueBoard({ filters, sort, projectsById, onOpenIssue }: IssueBoardProps) {
  const { issues, setIssues, totalElements, loading, error, refetch } = useIssuesBoard({ filters, sort })
  const { updateStatus } = useUpdateIssueStatus()

  const assigneeUuids = useMemo(() => issues.flatMap((issue) => issue.assignedUuids), [issues])
  const usersByUuid = useUsersLookup(assigneeUuids)

  const [draggingIssueId, setDraggingIssueId] = useState<number | null>(null)
  const [dragOverStatus, setDragOverStatus] = useState<Status | null>(null)
  const [bannerError, setBannerError] = useState<string | null>(null)

  const issuesByStatus = useMemo(() => {
    const grouped: Record<Status, Issue[]> = { OPEN: [], IN_PROGRESS: [], DONE: [] }
    for (const issue of issues) grouped[issue.status].push(issue)
    return grouped
  }, [issues])

  function handleDragStart(event: DragEvent<HTMLDivElement>, issue: Issue) {
    setDraggingIssueId(issue.id)
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', String(issue.id))
  }

  function handleDragEnd() {
    setDraggingIssueId(null)
    setDragOverStatus(null)
  }

  function handleColumnDrop(event: DragEvent<HTMLDivElement>, targetStatus: Status) {
    event.preventDefault()
    setDragOverStatus(null)

    const id = Number(event.dataTransfer.getData('text/plain'))
    const issue = issues.find((candidate) => candidate.id === id)
    if (!issue || issue.status === targetStatus || issue.status === 'DONE') return

    const previousStatus = issue.status
    setIssues((prev) => prev.map((candidate) => (candidate.id === id ? { ...candidate, status: targetStatus } : candidate)))

    updateStatus(id, targetStatus)
      .then((updated) => {
        setIssues((prev) => prev.map((candidate) => (candidate.id === id ? updated : candidate)))
      })
      .catch((err) => {
        setIssues((prev) => prev.map((candidate) => (candidate.id === id ? { ...candidate, status: previousStatus } : candidate)))
        setBannerError(`Could not move "${issue.title}" to ${targetStatus === 'DONE' ? 'Closed' : targetStatus}: ${getErrorMessage(err)}`)
      })
  }

  if (loading) return <BoardSkeleton />

  if (error) {
    return (
      <EmptyState
        tone="error"
        icon={<IconAlertTriangle size={22} />}
        title="Couldn't load issues"
        description={error}
        action={
          <button type="button" onClick={refetch}>
            Retry
          </button>
        }
      />
    )
  }

  if (issues.length === 0) {
    return <EmptyState title="No issues match your filters" description="Try adjusting or clearing the filters above." />
  }

  return (
    <div className={styles.wrapper}>
      {bannerError ? (
        <div className={styles.banner}>
          <span>{bannerError}</span>
          <button type="button" className={styles.bannerDismiss} onClick={() => setBannerError(null)} aria-label="Dismiss">
            <IconX size={14} />
          </button>
        </div>
      ) : null}

      {totalElements > BOARD_FETCH_SIZE ? (
        <p className={styles.truncationNote}>
          Showing the first {BOARD_FETCH_SIZE} of {totalElements} issues — narrow the filters to see the rest.
        </p>
      ) : null}

      <div className={styles.board}>
        {COLUMNS.map((status) => (
          <IssueBoardColumn
            key={status}
            status={status}
            count={issuesByStatus[status].length}
            isDragOver={dragOverStatus === status}
            onDragOver={(event) => {
              event.preventDefault()
              if (draggingIssueId != null) setDragOverStatus(status)
            }}
            onDragLeave={() => setDragOverStatus((current) => (current === status ? null : current))}
            onDrop={(event) => handleColumnDrop(event, status)}
          >
            {issuesByStatus[status].map((issue) => {
              const project = projectsById.get(issue.projectId)
              const assignees = issue.assignedUuids.map((uuid) => {
                const user = usersByUuid[uuid]
                return {
                  key: uuid,
                  loading: !user,
                  initials: user ? getInitials(user.firstName, user.lastName) : undefined,
                  title: user ? `${user.firstName} ${user.lastName}` : undefined,
                  avatarUrl: user?.avatarUrl,
                }
              })

              return (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  projectLabel={project?.title}
                  assignees={assignees}
                  draggable={issue.status !== 'DONE'}
                  isDragging={draggingIssueId === issue.id}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onClick={() => onOpenIssue(issue.id)}
                />
              )
            })}
          </IssueBoardColumn>
        ))}
      </div>
    </div>
  )
}
