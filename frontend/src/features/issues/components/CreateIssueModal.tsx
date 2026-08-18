import { useMemo, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button'
import { IconX } from '@/components/icons'
import { useToast } from '@/components/toast/useToast'
import { useProjects } from '@/features/projects/hooks/useProjects'
import { useUserSearch } from '@/features/users/hooks/useUserSearch'
import type { UserSummary } from '@/features/users/types'
import { getErrorMessage } from '@/utils/apiClient'
import type { Priority } from '@/utils/apiTypes'
import { createIssue } from '../api'
import styles from './CreateIssueModal.module.css'

interface CreateIssueModalProps {
  open: boolean
  onClose: () => void
}

const PRIORITIES: Priority[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
const PRIORITY_LABELS: Record<Priority, string> = { LOW: 'Low', MEDIUM: 'Medium', HIGH: 'High', CRITICAL: 'Critical' }

export function CreateIssueModal({ open, onClose }: CreateIssueModalProps) {
  const navigate = useNavigate()
  const { projects } = useProjects()
  const { showToast } = useToast()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('MEDIUM')
  const [projectId, setProjectId] = useState<number | ''>('')
  const [assignees, setAssignees] = useState<UserSummary[]>([])
  const [assigneeQuery, setAssigneeQuery] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { results: assigneeResults, loading: assigneeLoading } = useUserSearch(assigneeQuery)
  const availableAssigneeResults = useMemo(
    () => assigneeResults.filter((user) => !assignees.some((assignee) => assignee.uuid === user.uuid)),
    [assigneeResults, assignees],
  )

  if (!open) return null

  function resetAndClose() {
    setTitle('')
    setDescription('')
    setPriority('MEDIUM')
    setProjectId('')
    setAssignees([])
    setAssigneeQuery('')
    setError(null)
    onClose()
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!title.trim() || !projectId || submitting) return

    setSubmitting(true)
    setError(null)
    createIssue({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      projectId: Number(projectId),
      assignedUuids: assignees.map((assignee) => assignee.uuid),
    })
      .then((issue) => {
        showToast('Issue created.', 'success')
        resetAndClose()
        navigate(`/projects/${issue.projectId}`)
      })
      .catch((err) => setError(getErrorMessage(err, 'Could not create the issue.')))
      .finally(() => setSubmitting(false))
  }

  return (
    <div className={styles.backdrop} onClick={resetAndClose}>
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Create issue"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Create issue</h2>
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

          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>Project</span>
              <select
                className={styles.select}
                value={projectId}
                onChange={(event) => setProjectId(event.target.value ? Number(event.target.value) : '')}
                required
              >
                <option value="" disabled>
                  {projects.length === 0 ? 'No projects available' : 'Select a project'}
                </option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Priority</span>
              <select className={styles.select} value={priority} onChange={(event) => setPriority(event.target.value as Priority)}>
                {PRIORITIES.map((value) => (
                  <option key={value} value={value}>
                    {PRIORITY_LABELS[value]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Assignees (optional)</span>
            {assignees.length > 0 ? (
              <div className={styles.chips}>
                {assignees.map((user) => (
                  <span key={user.uuid} className={styles.chip}>
                    {user.firstName} {user.lastName}
                    <button
                      type="button"
                      onClick={() => setAssignees((prev) => prev.filter((assignee) => assignee.uuid !== user.uuid))}
                      aria-label={`Remove ${user.firstName} ${user.lastName}`}
                    >
                      <IconX size={11} />
                    </button>
                  </span>
                ))}
              </div>
            ) : null}
            <input
              type="text"
              className={styles.input}
              placeholder="Search people to assign…"
              value={assigneeQuery}
              onChange={(event) => setAssigneeQuery(event.target.value)}
            />
            {assigneeQuery.trim().length >= 2 ? (
              <div className={styles.assigneeDropdown}>
                {assigneeLoading ? <p className={styles.dropdownMessage}>Searching…</p> : null}
                {!assigneeLoading && availableAssigneeResults.length === 0 ? (
                  <p className={styles.dropdownMessage}>No users found</p>
                ) : null}
                {availableAssigneeResults.map((user) => (
                  <button
                    key={user.uuid}
                    type="button"
                    className={styles.dropdownItem}
                    onClick={() => {
                      setAssignees((prev) => [...prev, user])
                      setAssigneeQuery('')
                    }}
                  >
                    {user.firstName} {user.lastName}
                    <span className={styles.dropdownUsername}>@{user.username}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {error ? <p className={styles.error}>{error}</p> : null}

          <div className={styles.actions}>
            <Button type="button" variant="secondary" onClick={resetAndClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={submitting || !title.trim() || !projectId}>
              {submitting ? 'Creating…' : 'Create issue'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
