import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AvatarChip } from '@/components/AvatarChip'
import { Button } from '@/components/Button'
import { useToast } from '@/components/toast/useToast'
import { useAuth } from '@/features/auth/useAuth'
import { useUsersLookup } from '@/features/users/hooks/useUsersLookup'
import { getErrorMessage } from '@/utils/apiClient'
import type { ProjectCategory } from '@/utils/apiTypes'
import { getInitials } from '@/utils/format'
import { deleteProject } from '../api'
import { notifyProjectsChanged } from '../hooks/useProjects'
import type { Project } from '../types'
import { ProjectFormModal } from './ProjectFormModal'
import styles from './ProjectHeader.module.css'

const CATEGORY_LABELS: Record<ProjectCategory, string> = { SOFTWARE: 'Software', SUPPORT: 'Support', INTERNAL: 'Internal' }

interface ProjectHeaderProps {
  project: Project
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const usersByUuid = useUsersLookup([project.leaderUuid])
  const leader = usersByUuid[project.leaderUuid]
  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [editOpen, setEditOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const isAdmin = user?.role === 'ADMIN'
  const canManage = isAdmin || user?.role === 'MANAGER'

  function handleDelete() {
    if (deleting) return
    if (!window.confirm(`Delete project "${project.title}" and all its issues? This cannot be undone.`)) return

    setDeleting(true)
    deleteProject(project.id)
      .then(() => {
        notifyProjectsChanged()
        showToast('Project deleted.', 'success')
        navigate('/')
      })
      .catch((err) => showToast(getErrorMessage(err, 'Could not delete the project.'), 'error'))
      .finally(() => setDeleting(false))
  }

  return (
    <div className={styles.header}>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>{project.title}</h1>
        <span className={styles.categoryBadge}>{CATEGORY_LABELS[project.category]}</span>
        {canManage ? (
          <span className={styles.actions}>
            <Button variant="secondary" onClick={() => setEditOpen(true)}>
              Edit
            </Button>
            {isAdmin ? (
              <Button variant="secondary" className={styles.deleteButton} onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Deleting…' : 'Delete'}
              </Button>
            ) : null}
          </span>
        ) : null}
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

      <ProjectFormModal open={editOpen} onClose={() => setEditOpen(false)} project={project} />
    </div>
  )
}
