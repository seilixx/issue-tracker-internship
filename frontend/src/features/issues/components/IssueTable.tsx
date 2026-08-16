import { useMemo } from 'react'
import { AvatarStack } from '@/components/AvatarChip'
import { EmptyState } from '@/components/EmptyState'
import { PriorityIcon } from '@/components/PriorityIcon'
import { StatusBadge } from '@/components/StatusBadge'
import { IconAlertTriangle, IconArrowDown, IconArrowUp } from '@/components/icons'
import { getInitials } from '@/utils/format'
import { useUsersLookup } from '@/features/users/hooks/useUsersLookup'
import type { Project } from '@/features/projects/types'
import { useIssuesList } from '../hooks/useIssuesList'
import type { IssueFilters, IssueSort, SortField } from '../types'
import { TableSkeleton } from './TableSkeleton'
import styles from './IssueTable.module.css'

const SORTABLE_COLUMNS: { field: SortField; label: string }[] = [
  { field: 'status', label: 'Status' },
  { field: 'priority', label: 'Priority' },
  { field: 'createdAt', label: 'Created' },
  { field: 'updatedAt', label: 'Updated' },
]

const PAGE_SIZE_OPTIONS = [10, 25, 50]

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })

interface IssueTableProps {
  filters: IssueFilters
  sort: IssueSort
  onSortChange: (sort: IssueSort) => void
  page: number
  size: number
  onPageChange: (page: number) => void
  onSizeChange: (size: number) => void
  projectsById: Map<number, Project>
  onOpenIssue: (id: number) => void
}

export function IssueTable({ filters, sort, onSortChange, page, size, onPageChange, onSizeChange, projectsById, onOpenIssue }: IssueTableProps) {
  const { data, loading, error, refetch } = useIssuesList({ filters, sort, page, size })

  const assigneeUuids = useMemo(() => data?.content.flatMap((issue) => issue.assignedUuids) ?? [], [data])
  const usersByUuid = useUsersLookup(assigneeUuids)

  function handleHeaderClick(field: SortField) {
    if (sort.sortBy === field) {
      onSortChange({ sortBy: field, sortDir: sort.sortDir === 'asc' ? 'desc' : 'asc' })
    } else {
      onSortChange({ sortBy: field, sortDir: 'asc' })
    }
  }

  if (loading) return <TableSkeleton />

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

  if (!data || data.content.length === 0) {
    return <EmptyState title="No issues match your filters" description="Try adjusting or clearing the filters above." />
  }

  const from = data.page * data.size + 1
  const to = Math.min((data.page + 1) * data.size, data.totalElements)

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: 56 }}>ID</th>
              <th>Title</th>
              <th>Project</th>
              {SORTABLE_COLUMNS.map((column) => (
                <th key={column.field} className={styles.sortableHeader} onClick={() => handleHeaderClick(column.field)}>
                  <span className={styles.headerLabel}>
                    {column.label}
                    {sort.sortBy === column.field ? (
                      sort.sortDir === 'asc' ? (
                        <IconArrowUp size={12} />
                      ) : (
                        <IconArrowDown size={12} />
                      )
                    ) : null}
                  </span>
                </th>
              ))}
              <th>Assignee</th>
            </tr>
          </thead>
          <tbody>
            {data.content.map((issue) => {
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
                <tr key={issue.id} className={styles.row} onClick={() => onOpenIssue(issue.id)}>
                  <td className={styles.idCell}>#{issue.id}</td>
                  <td className={styles.titleCell} title={issue.title}>
                    {issue.title}
                  </td>
                  <td className={styles.mutedCell}>{project?.title ?? '—'}</td>
                  <td>
                    <StatusBadge status={issue.status} />
                  </td>
                  <td>
                    <PriorityIcon priority={issue.priority} showLabel />
                  </td>
                  <td className={styles.mutedCell}>{dateFormatter.format(new Date(issue.createdAt))}</td>
                  <td className={styles.mutedCell}>{dateFormatter.format(new Date(issue.updatedAt))}</td>
                  <td>
                    {assignees.length > 0 ? <AvatarStack people={assignees} /> : <span className={styles.mutedCell}>Unassigned</span>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerInfo}>
          <span>
            {from}–{to} of {data.totalElements}
          </span>
          <label>
            Rows per page{' '}
            <select
              className={styles.sizeSelect}
              value={size}
              onChange={(event) => onSizeChange(Number(event.target.value))}
            >
              {PAGE_SIZE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className={styles.pager}>
          <button type="button" className={styles.pagerButton} disabled={data.page <= 0} onClick={() => onPageChange(data.page - 1)}>
            Previous
          </button>
          <span className={styles.pagerLabel}>
            Page {data.page + 1} of {Math.max(data.totalPages, 1)}
          </span>
          <button
            type="button"
            className={styles.pagerButton}
            disabled={data.page + 1 >= data.totalPages}
            onClick={() => onPageChange(data.page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
