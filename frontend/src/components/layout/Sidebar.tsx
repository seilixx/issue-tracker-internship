import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { IconAlertTriangle, IconFolder, IconInbox } from '@/components/icons'
import { Skeleton } from '@/components/Skeleton'
import { useProjects } from '@/features/projects/hooks/useProjects'
import type { Project } from '@/features/projects/types'
import type { ProjectCategory } from '@/utils/apiTypes'
import styles from './Sidebar.module.css'

const CATEGORY_ORDER: ProjectCategory[] = ['SOFTWARE', 'SUPPORT', 'INTERNAL']
const CATEGORY_LABELS: Record<ProjectCategory, string> = { SOFTWARE: 'Software', SUPPORT: 'Support', INTERNAL: 'Internal' }

function groupByCategory(projects: Project[]) {
  const groups = new Map<ProjectCategory, Project[]>()
  for (const project of projects) {
    const bucket = groups.get(project.category)
    if (bucket) bucket.push(project)
    else groups.set(project.category, [project])
  }
  return CATEGORY_ORDER.filter((category) => groups.has(category)).map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    projects: groups.get(category)!,
  }))
}

const QUICK_FILTERS = [
  { path: '/filters/open', label: 'Open', tokenVar: '--color-status-open' },
  { path: '/filters/in-progress', label: 'In Progress', tokenVar: '--color-status-in-progress' },
  { path: '/filters/closed', label: 'Closed', tokenVar: '--color-status-done' },
]

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return isActive ? `${styles.link} ${styles.linkActive}` : styles.link
}

function projectLinkClassName({ isActive }: { isActive: boolean }) {
  return isActive ? `${styles.projectLink} ${styles.linkActive}` : styles.projectLink
}

export function Sidebar() {
  const { projects, loading, error, refetch } = useProjects()
  const groups = useMemo(() => groupByCategory(projects), [projects])

  return (
    <nav className={styles.sidebar} aria-label="Primary">
      <div className={styles.brand}>
        <span className={styles.brandMark} aria-hidden="true" />
        IssueTracker
      </div>

      <div className={styles.nav}>
        <div className={styles.section}>
          <NavLink to="/my-issues" className={navLinkClassName}>
            <span className={styles.linkIcon}>
              <IconInbox size={16} />
            </span>
            My Issues
          </NavLink>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>Quick filters</p>
          {QUICK_FILTERS.map((filter) => (
            <NavLink key={filter.path} to={filter.path} className={navLinkClassName}>
              <span
                className={styles.statusDot}
                style={{ backgroundColor: `var(${filter.tokenVar})` }}
                aria-hidden="true"
              />
              {filter.label}
            </NavLink>
          ))}
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>
            <IconFolder size={12} className={styles.sectionTitleIcon} />
            Projects
          </p>
          {loading ? (
            <div className={styles.projectsLoading}>
              <Skeleton height={14} width="70%" />
              <Skeleton height={14} width="55%" />
              <Skeleton height={14} width="60%" />
            </div>
          ) : error ? (
            <p className={styles.projectsError}>
              <IconAlertTriangle size={12} />
              {error}{' '}
              <button type="button" className={styles.retryButton} onClick={refetch}>
                Retry
              </button>
            </p>
          ) : groups.length === 0 ? (
            <p className={styles.projectsEmpty}>No projects yet.</p>
          ) : (
            groups.map((group) => (
              <div key={group.category} className={styles.categoryGroup}>
                <p className={styles.categoryLabel}>{group.label}</p>
                {group.projects.map((project) => (
                  <NavLink key={project.id} to={`/projects/${project.id}`} className={projectLinkClassName}>
                    <span className={styles.projectDot} aria-hidden="true" />
                    {project.title}
                  </NavLink>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </nav>
  )
}
