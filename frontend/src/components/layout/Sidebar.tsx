import { NavLink } from 'react-router-dom'
import { IconFolder, IconInbox } from '@/components/icons'
import styles from './Sidebar.module.css'

// TODO: replace with GET /api/projects (grouped by category) once the projects feature is wired up.
const PROJECTS_BY_CATEGORY: { category: string; label: string; projects: { id: string; name: string }[] }[] = [
  {
    category: 'SOFTWARE',
    label: 'Software',
    projects: [
      { id: 'website-revamp', name: 'Website Revamp' },
      { id: 'mobile-app', name: 'Mobile App' },
    ],
  },
  {
    category: 'SUPPORT',
    label: 'Support',
    projects: [{ id: 'customer-portal', name: 'Customer Portal' }],
  },
  {
    category: 'INTERNAL',
    label: 'Internal',
    projects: [{ id: 'internal-tools', name: 'Internal Tools' }],
  },
]

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
          {PROJECTS_BY_CATEGORY.map((group) => (
            <div key={group.category} className={styles.categoryGroup}>
              <p className={styles.categoryLabel}>{group.label}</p>
              {group.projects.map((project) => (
                <NavLink key={project.id} to={`/projects/${project.id}`} className={projectLinkClassName}>
                  <span className={styles.projectDot} aria-hidden="true" />
                  {project.name}
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}
