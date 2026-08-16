import { IconAlertTriangle, IconLayoutBoard, IconList, IconX } from '@/components/icons'
import type { Priority, ProjectCategory, Status } from '@/utils/apiTypes'
import type { Project } from '@/features/projects/types'
import type { UserSummary } from '@/features/users/types'
import { AssigneePicker } from './AssigneePicker'
import styles from './IssueFiltersBar.module.css'

const CATEGORIES: ProjectCategory[] = ['SOFTWARE', 'SUPPORT', 'INTERNAL']
const STATUSES: Status[] = ['OPEN', 'IN_PROGRESS', 'DONE']
const PRIORITIES: Priority[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

const STATUS_LABELS: Record<Status, string> = { OPEN: 'Open', IN_PROGRESS: 'In Progress', DONE: 'Closed' }
const PRIORITY_LABELS: Record<Priority, string> = { LOW: 'Low', MEDIUM: 'Medium', HIGH: 'High', CRITICAL: 'Critical' }
const CATEGORY_LABELS: Record<ProjectCategory, string> = { SOFTWARE: 'Software', SUPPORT: 'Support', INTERNAL: 'Internal' }

export type ViewMode = 'board' | 'list'

interface IssueFiltersBarProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  projects: Project[]
  category: ProjectCategory | ''
  onCategoryChange: (category: ProjectCategory | '') => void
  projectId: number | undefined
  onProjectIdChange: (id: number | undefined) => void
  status: Status | undefined
  onStatusChange: (status: Status | undefined) => void
  priority: Priority | undefined
  onPriorityChange: (priority: Priority | undefined) => void
  assignee: UserSummary | null
  onAssigneeChange: (user: UserSummary | null) => void
  hasActiveFilters: boolean
  onClear: () => void
  projectsError?: string | null
  onRetryProjects?: () => void
}

export function IssueFiltersBar({
  viewMode,
  onViewModeChange,
  projects,
  category,
  onCategoryChange,
  projectId,
  onProjectIdChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  assignee,
  onAssigneeChange,
  hasActiveFilters,
  onClear,
  projectsError,
  onRetryProjects,
}: IssueFiltersBarProps) {
  const filteredProjects = category ? projects.filter((project) => project.category === category) : projects
  const categoryLabel = category ? CATEGORY_LABELS[category] : ''

  return (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        <div className={styles.viewToggle}>
          <button
            type="button"
            className={viewMode === 'board' ? `${styles.viewToggleButton} ${styles.viewToggleActive}` : styles.viewToggleButton}
            onClick={() => onViewModeChange('board')}
            aria-pressed={viewMode === 'board'}
          >
            <IconLayoutBoard size={15} />
            Board
          </button>
          <button
            type="button"
            className={viewMode === 'list' ? `${styles.viewToggleButton} ${styles.viewToggleActive}` : styles.viewToggleButton}
            onClick={() => onViewModeChange('list')}
            aria-pressed={viewMode === 'list'}
          >
            <IconList size={15} />
            List
          </button>
        </div>

        <div className={styles.divider} />

        <select
          className={styles.select}
          value={category}
          onChange={(event) => onCategoryChange(event.target.value as ProjectCategory | '')}
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((value) => (
            <option key={value} value={value}>
              {CATEGORY_LABELS[value]}
            </option>
          ))}
        </select>

        <select
          className={styles.select}
          value={projectId ?? ''}
          onChange={(event) => onProjectIdChange(event.target.value ? Number(event.target.value) : undefined)}
          aria-label="Filter by project"
        >
          <option value="">All projects</option>
          {filteredProjects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>

        {viewMode === 'list' ? (
          <select
            className={styles.select}
            value={status ?? ''}
            onChange={(event) => onStatusChange(event.target.value ? (event.target.value as Status) : undefined)}
            aria-label="Filter by status"
          >
            <option value="">All statuses</option>
            {STATUSES.map((value) => (
              <option key={value} value={value}>
                {STATUS_LABELS[value]}
              </option>
            ))}
          </select>
        ) : null}

        <select
          className={styles.select}
          value={priority ?? ''}
          onChange={(event) => onPriorityChange(event.target.value ? (event.target.value as Priority) : undefined)}
          aria-label="Filter by priority"
        >
          <option value="">All priorities</option>
          {PRIORITIES.map((value) => (
            <option key={value} value={value}>
              {PRIORITY_LABELS[value]}
            </option>
          ))}
        </select>

        <AssigneePicker selected={assignee} onSelect={onAssigneeChange} />

        <div className={styles.spacer} />

        {hasActiveFilters ? (
          <button type="button" className={styles.clearButton} onClick={onClear}>
            <IconX size={12} />
            Clear filters
          </button>
        ) : null}
      </div>

      {category && !projectId ? (
        <p className={styles.categoryHint}>
          Issues aren't filtered by category directly — pick a project above to see {categoryLabel} issues.
        </p>
      ) : null}

      {projectsError ? (
        <p className={styles.categoryHint}>
          <IconAlertTriangle size={12} className={styles.errorIcon} />
          {projectsError}{' '}
          {onRetryProjects ? (
            <button type="button" className={styles.inlineRetry} onClick={onRetryProjects}>
              Retry
            </button>
          ) : null}
        </p>
      ) : null}
    </div>
  )
}
