import { AvatarChip } from '@/components/AvatarChip'
import { useUsersLookup } from '@/features/users/hooks/useUsersLookup'
import type { ProjectCategory } from '@/utils/apiTypes'
import { getInitials } from '@/utils/format'
import type { Project } from '../types'
import styles from './ProjectHeader.module.css'

const CATEGORY_LABELS: Record<ProjectCategory, string> = { SOFTWARE: 'Software', SUPPORT: 'Support', INTERNAL: 'Internal' }

interface ProjectHeaderProps {
  project: Project
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const usersByUuid = useUsersLookup([project.leaderUuid])
  const leader = usersByUuid[project.leaderUuid]

  return (
    <div className={styles.header}>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>{project.title}</h1>
        <span className={styles.categoryBadge}>{CATEGORY_LABELS[project.category]}</span>
      </div>

      {project.description ? <p className={styles.description}>{project.description}</p> : null}

      <div className={styles.leaderRow}>
        <span className={styles.leaderLabel}>Project leader</span>
        {leader ? (
          <span className={styles.leaderChip}>
            <AvatarChip
              initials={getInitials(leader.firstName, leader.lastName)}
              avatarUrl={leader.avatarUrl}
              size="sm"
            />
            {leader.firstName} {leader.lastName}
          </span>
        ) : (
          <AvatarChip loading size="sm" />
        )}
      </div>
    </div>
  )
}
