import { useMemo, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  IconAlertTriangle,
  IconChevronDown,
  IconFolder,
  IconGrid,
  IconPlus,
  IconSettings,
  IconUsers,
} from '@/components/icons'
import { Skeleton } from '@/components/Skeleton'
import { useAuth } from '@/features/auth/useAuth'
import { useProjects } from '@/features/projects/hooks/useProjects'
import { ProjectFormModal } from '@/features/projects/components/ProjectFormModal'
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

// Adapted from the mockup's nav to what this app actually has:
// - "Dashboard" -> the real issues board/list ("/"). The mockup's "Issues" item
//   would point at the exact same page, so it's dropped rather than duplicated.
// - "Developers" + "Team" -> merged into one real item, the user directory ("/users/search").
// - "Settings" -> the real profile-edit page ("/profile/edit") — the only "settings"
//   this app actually has today.
// - "Progress" and "Comments" (mockup shows "Camoats", unclear/garbled) have no
//   functional equivalent anywhere in this app, so they're left out rather than
//   linking to an empty page.
const PRIMARY_NAV = [
  { to: '/', label: 'Dashboard', icon: IconGrid, end: true },
  { to: '/users/search', label: 'Team', icon: IconUsers },
  { to: '/profile/edit', label: 'Settings', icon: IconSettings },
]

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return isActive ? `${styles.link} ${styles.linkActive}` : styles.link
}

function projectLinkClassName({ isActive }: { isActive: boolean }) {
  return isActive ? `${styles.projectLink} ${styles.projectLinkActive}` : styles.projectLink
}

interface SidebarProps {
  collapsed: boolean
  onToggleCollapsed: () => void
}

export function Sidebar({ collapsed, onToggleCollapsed }: SidebarProps) {
  const { projects, loading, error, refetch } = useProjects()
  const groups = useMemo(() => groupByCategory(projects), [projects])
  const { user } = useAuth()
  const navigate = useNavigate()
  const [createProjectOpen, setCreateProjectOpen] = useState(false)
  const canManageProjects = user?.role === 'ADMIN' || user?.role === 'MANAGER'

  return (
    <nav className={collapsed ? `${styles.sidebar} ${styles.collapsed}` : styles.sidebar} aria-label="Primary">
      <div className={styles.brand}>
        <span className={styles.brandMark} aria-hidden="true">
          IT
        </span>
        {!collapsed ? <span className={styles.brandName}>IssueTracker</span> : null}
      </div>

      <div className={styles.nav}>
        <div className={styles.section}>
          {PRIMARY_NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClassName} title={collapsed ? item.label : undefined}>
              <span className={styles.linkIcon}>
                <item.icon size={17} />
              </span>
              {!collapsed ? <span className={styles.linkLabel}>{item.label}</span> : null}
            </NavLink>
          ))}
        </div>

        <div className={styles.section}>
          {!collapsed ? (
            <p className={styles.sectionTitle}>
              <IconFolder size={12} className={styles.sectionTitleIcon} />
              Projects
              {canManageProjects ? (
                <button
                  type="button"
                  className={styles.addProjectButton}
                  onClick={() => setCreateProjectOpen(true)}
                  aria-label="Create project"
                  title="Create project"
                >
                  <IconPlus size={13} />
                </button>
              ) : null}
            </p>
          ) : null}
          {loading ? (
            <div className={styles.projectsLoading}>
              <Skeleton height={14} width="70%" />
              <Skeleton height={14} width="55%" />
              <Skeleton height={14} width="60%" />
            </div>
          ) : error ? (
            !collapsed ? (
              <p className={styles.projectsError}>
                <IconAlertTriangle size={12} />
                {error}{' '}
                <button type="button" className={styles.retryButton} onClick={refetch}>
                  Retry
                </button>
              </p>
            ) : null
          ) : groups.length === 0 ? (
            !collapsed ? <p className={styles.projectsEmpty}>No projects yet.</p> : null
          ) : (
            groups.map((group) => (
              <div key={group.category} className={styles.categoryGroup}>
                {!collapsed ? <p className={styles.categoryLabel}>{group.label}</p> : null}
                {group.projects.map((project) => (
                  <NavLink
                    key={project.id}
                    to={`/projects/${project.id}`}
                    className={projectLinkClassName}
                    title={collapsed ? project.title : undefined}
                  >
                    <span className={styles.projectDot} aria-hidden="true" />
                    {!collapsed ? project.title : null}
                  </NavLink>
                ))}
              </div>
            ))
          )}
        </div>
      </div>

      <button
        type="button"
        className={styles.collapseToggle}
        onClick={onToggleCollapsed}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <IconChevronDown size={15} className={collapsed ? styles.collapseIconCollapsed : styles.collapseIcon} />
        {!collapsed ? <span>Collapse</span> : null}
      </button>

      <ProjectFormModal
        open={createProjectOpen}
        onClose={() => setCreateProjectOpen(false)}
        onSaved={(project) => navigate(`/projects/${project.id}`)}
      />
    </nav>
  )
}
