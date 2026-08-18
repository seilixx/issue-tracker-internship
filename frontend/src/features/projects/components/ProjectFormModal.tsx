import { useMemo, useState, type FormEvent } from 'react'
import { Button } from '@/components/Button'
import { IconX } from '@/components/icons'
import { useToast } from '@/components/toast/useToast'
import { useAuth } from '@/features/auth/useAuth'
import { useUserSearch } from '@/features/users/hooks/useUserSearch'
import type { UserSummary } from '@/features/users/types'
import { getErrorMessage } from '@/utils/apiClient'
import type { ProjectCategory } from '@/utils/apiTypes'
import { createProject, updateProject, updateProjectCategory } from '../api'
import { notifyProjectsChanged } from '../hooks/useProjects'
import type { Project } from '../types'
import styles from './ProjectFormModal.module.css'

const CATEGORIES: ProjectCategory[] = ['SOFTWARE', 'SUPPORT', 'INTERNAL']
const CATEGORY_LABELS: Record<ProjectCategory, string> = { SOFTWARE: 'Software', SUPPORT: 'Support', INTERNAL: 'Internal' }

interface ProjectFormModalProps {
  open: boolean
  onClose: () => void
  /** When set, the modal edits this project instead of creating a new one. */
  project?: Project
  /** Called after a successful save — create mode passes the new project (for navigation). */
  onSaved?: (project: Project) => void
}

// Handles both create (POST /api/projects, ADMIN/MANAGER) and edit
// (PUT /api/projects/{id}). In edit mode the category select is only shown
// to admins and saved through the dedicated admin-only PATCH endpoint, since
// ProjectUpdateRequest deliberately has no category field.
export function ProjectFormModal({ open, onClose, project, onSaved }: ProjectFormModalProps) {
  const { user } = useAuth()
  const { showToast } = useToast()
  const isEdit = project != null
  const isAdmin = user?.role === 'ADMIN'

  const [title, setTitle] = useState(project?.title ?? '')
  const [description, setDescription] = useState(project?.description ?? '')
  const [category, setCategory] = useState<ProjectCategory>(project?.category ?? 'SOFTWARE')
  const [leader, setLeader] = useState<UserSummary | null>(null)
  const [leaderQuery, setLeaderQuery] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { results: leaderResults, loading: leaderLoading } = useUserSearch(leaderQuery)
  const availableLeaderResults = useMemo(
    () => leaderResults.filter((candidate) => candidate.uuid !== leader?.uuid),
    [leaderResults, leader],
  )

  if (!open) return null

  // In edit mode the leader picker starts empty (the backend only stores a
  // uuid); leaving it untouched keeps the current leader.
  const canSubmit = title.trim().length > 0 && (leader != null || isEdit) && !submitting

  function resetAndClose() {
    setTitle('')
    setDescription('')
    setCategory('SOFTWARE')
    setLeader(null)
    setLeaderQuery('')
    setError(null)
    onClose()
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!canSubmit) return

    setSubmitting(true)
    setError(null)

    const save = isEdit
      ? updateProject(project.id, {
          title: title.trim(),
          description: description.trim() || undefined,
          leaderUuid: leader ? leader.uuid : project.leaderUuid,
        }).then((updated) =>
          // Category is admin-only and goes through its own endpoint — only
          // call it when it actually changed.
          isAdmin && category !== project.category
            ? updateProjectCategory(project.id, category)
            : updated,
        )
      : createProject({
          title: title.trim(),
          description: description.trim() || undefined,
          category,
          leaderUuid: leader!.uuid,
        })

    save
      .then((saved) => {
        notifyProjectsChanged()
        showToast(isEdit ? 'Project updated.' : 'Project created.', 'success')
        resetAndClose()
        onSaved?.(saved)
      })
      .catch((err) => setError(getErrorMessage(err, isEdit ? 'Could not update the project.' : 'Could not create the project.')))
      .finally(() => setSubmitting(false))
  }

  return (
    <div className={styles.backdrop} onClick={resetAndClose}>
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={isEdit ? 'Edit project' : 'Create project'}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{isEdit ? 'Edit project' : 'Create project'}</h2>
          <button type="button" className={styles.closeButton} onClick={resetAndClose} aria-label="Close">
            <IconX size={16} />
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span className={styles.label}>Title</span>
            <input
              type="text"
              className={styles.input}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              autoFocus
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Description</span>
            <textarea
              className={styles.textarea}
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Optional"
            />
          </label>

          {!isEdit || isAdmin ? (
            <label className={styles.field}>
              <span className={styles.label}>Category</span>
              <select
                className={styles.select}
                value={category}
                onChange={(event) => setCategory(event.target.value as ProjectCategory)}
              >
                {CATEGORIES.map((value) => (
                  <option key={value} value={value}>
                    {CATEGORY_LABELS[value]}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <div className={styles.field}>
            <span className={styles.label}>{isEdit ? 'Leader (leave empty to keep the current one)' : 'Leader'}</span>
            {leader ? (
              <div className={styles.chips}>
                <span className={styles.chip}>
                  {leader.firstName} {leader.lastName}
                  <button type="button" onClick={() => setLeader(null)} aria-label={`Remove ${leader.firstName} ${leader.lastName}`}>
                    <IconX size={11} />
                  </button>
                </span>
              </div>
            ) : null}
            {!leader ? (
              <>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Search people…"
                  value={leaderQuery}
                  onChange={(event) => setLeaderQuery(event.target.value)}
                />
                {leaderQuery.trim().length >= 2 ? (
                  <div className={styles.leaderDropdown}>
                    {leaderLoading ? <p className={styles.dropdownMessage}>Searching…</p> : null}
                    {!leaderLoading && availableLeaderResults.length === 0 ? (
                      <p className={styles.dropdownMessage}>No users found</p>
                    ) : null}
                    {availableLeaderResults.map((candidate) => (
                      <button
                        key={candidate.uuid}
                        type="button"
                        className={styles.dropdownItem}
                        onClick={() => {
                          setLeader(candidate)
                          setLeaderQuery('')
                        }}
                      >
                        {candidate.firstName} {candidate.lastName}
                        <span className={styles.dropdownUsername}>@{candidate.username}</span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </>
            ) : null}
          </div>

          {error ? <p className={styles.error}>{error}</p> : null}

          <div className={styles.actions}>
            <Button type="button" variant="secondary" onClick={resetAndClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={!canSubmit}>
              {submitting ? 'Saving…' : isEdit ? 'Save changes' : 'Create project'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
