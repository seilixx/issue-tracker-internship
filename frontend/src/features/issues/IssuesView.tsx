import { useEffect, useMemo, useState } from 'react'
import { useProjects } from '@/features/projects/hooks/useProjects'
import { ProjectHeader } from '@/features/projects/components/ProjectHeader'
import type { UserSummary } from '@/features/users/types'
import type { Priority, ProjectCategory, Status } from '@/utils/apiTypes'
import { IssueBoard } from './components/IssueBoard'
import { IssueDetailPanel } from './components/IssueDetailPanel'
import { IssueFiltersBar, type ViewMode } from './components/IssueFiltersBar'
import { IssueTable } from './components/IssueTable'
import type { IssueSort } from './types'
import styles from './IssuesView.module.css'

const DEFAULT_SORT: IssueSort = { sortBy: 'createdAt', sortDir: 'desc' }

interface IssuesViewProps {
  /** Pins the board/list to a single project (set when arriving via /projects/:projectId). */
  initialProjectId?: number
}

export function IssuesView({ initialProjectId }: IssuesViewProps = {}) {
  const { projects, loading: projectsLoading, error: projectsError, refetch: refetchProjects } = useProjects()
  const projectsById = useMemo(() => new Map(projects.map((project) => [project.id, project])), [projects])

  const [viewMode, setViewMode] = useState<ViewMode>('board')
  const [category, setCategory] = useState<ProjectCategory | ''>('')
  const [projectId, setProjectId] = useState<number | undefined>(initialProjectId)
  const [status, setStatus] = useState<Status | undefined>(undefined)
  const [priority, setPriority] = useState<Priority | undefined>(undefined)
  const [assignee, setAssignee] = useState<UserSummary | null>(null)
  const [sort, setSort] = useState<IssueSort>(DEFAULT_SORT)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [openIssueId, setOpenIssueId] = useState<number | null>(null)

  // Re-sync when navigating between two /projects/:id links without a full remount
  // (react-router keeps this component mounted since the route element is the same).
  useEffect(() => {
    setProjectId(initialProjectId)
    setPage(0)
  }, [initialProjectId])

  const pinnedProject = initialProjectId != null ? projectsById.get(initialProjectId) : undefined

  function handleCategoryChange(nextCategory: ProjectCategory | '') {
    setCategory(nextCategory)
    if (nextCategory && projectId) {
      const project = projectsById.get(projectId)
      if (project && project.category !== nextCategory) {
        setProjectId(undefined)
      }
    }
    setPage(0)
  }

  function handleFilterChange<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value)
      setPage(0)
    }
  }

  function handleClear() {
    setCategory('')
    setProjectId(undefined)
    setStatus(undefined)
    setPriority(undefined)
    setAssignee(null)
    setPage(0)
  }

  const hasActiveFilters = Boolean(category || projectId || status || priority || assignee)
  const assigneeUuid = assignee?.uuid

  return (
    <div className={styles.wrapper}>
      {initialProjectId != null && pinnedProject ? <ProjectHeader project={pinnedProject} /> : null}
      {initialProjectId != null && !pinnedProject && !projectsLoading && !projectsError ? (
        <p className={styles.projectNotFound}>Project not found.</p>
      ) : null}

      <IssueFiltersBar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        projects={projects}
        category={category}
        onCategoryChange={handleCategoryChange}
        projectId={projectId}
        onProjectIdChange={handleFilterChange(setProjectId)}
        status={status}
        onStatusChange={handleFilterChange(setStatus)}
        priority={priority}
        onPriorityChange={handleFilterChange(setPriority)}
        assignee={assignee}
        onAssigneeChange={handleFilterChange(setAssignee)}
        hasActiveFilters={hasActiveFilters}
        onClear={handleClear}
        projectsError={projectsError}
        onRetryProjects={refetchProjects}
      />

      <div className={styles.content}>
        {viewMode === 'board' ? (
          <IssueBoard
            filters={{ projectId, priority, assigneeUuid }}
            sort={sort}
            projectsById={projectsById}
            onOpenIssue={setOpenIssueId}
          />
        ) : (
          <IssueTable
            filters={{ projectId, status, priority, assigneeUuid }}
            sort={sort}
            onSortChange={handleFilterChange(setSort)}
            page={page}
            size={size}
            onPageChange={setPage}
            onSizeChange={(nextSize) => {
              setSize(nextSize)
              setPage(0)
            }}
            projectsById={projectsById}
            onOpenIssue={setOpenIssueId}
          />
        )}
      </div>

      <IssueDetailPanel issueId={openIssueId} projectsById={projectsById} onClose={() => setOpenIssueId(null)} />
    </div>
  )
}
