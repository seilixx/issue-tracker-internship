import { useMemo, useState, type FormEvent } from 'react'
import { Button } from '@/components/Button'
import { IconX } from '@/components/icons'
import { useToast } from '@/components/toast/useToast'
import { useProjects } from '@/features/projects/hooks/useProjects'
import { useUserSearch } from '@/features/users/hooks/useUserSearch'
import type { UserSummary } from '@/features/users/types'
import { getErrorMessage } from '@/utils/apiClient'
import type { Priority } from '@/utils/apiTypes'
import { updateIssue } from '../api'
import type { Issue } from '../types'
import styles from './EditIssueModal.module.css'

const PRIORITIES: Priority[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
const PRIORITY_LABELS: Record<Priority, string> = { LOW: 'Low', MEDIUM: 'Medium', HIGH: 'High', CRITICAL: 'Critical' }

interface EditIssueModalProps {
  onClose: () => void
  issue: Issue
  /** Current assignees resolved to full users (for the initial chips). */
  initialAssignees: UserSummary[]
  onSaved?: () => void
}

// Edit counterpart of CreateIssueModal — pre-filled, and hits
// PUT /api/issues/{id} (IssueUpdateRequest: title/description/priority/
// projectId/assignedUuids, no status — that stays on PATCH /status).
// Mounted conditionally by the parent (no `open` prop) so the form state is
// always initialized from the latest issue data.
export function EditIssueModal({ onClose, issue, initialAssignees, onSaved }: EditIssueModalProps) {
  const { projects } = useProjects()
  const { showToast } = useToast()

  const [title, setTitle] = useState(issue.title)
  const [description, setDescription] = useState(issue.description ?? '')
  const [priority, setPriority] = useState<Priority>(issue.priority)
  const [projectId, setProjectId] = useState<number | ''>(issue.projectId)
  const [assignees, setAssignees] = useState<UserSummary[]>(initialAssignees)
  const [assigneeQuery, setAssigneeQuery] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { results: assigneeResults, loading: assigneeLoading } = useUserSearch(assigneeQuery)
  const availableAssigneeResults = useMemo(
    () => assigneeResults.filter((candidate) => !assignees.some((assignee) => assignee.uuid === candidate.uuid)),
    [assigneeResults, assignees],
  )

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!title.trim() || !projectId || submitting) return

    setSubmitting(true)
    setError(null)
    updateIssue(issue.id, {
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      projectId: Number(projectId),
      // Sending the full list (possibly empty) replaces the assignees —
      // this is also how an issue gets fully unassigned.
      assignedUuids: assignees.map((assignee) => assignee.uuid),
    })
      .then(() => {
        showToast('Issue updated.', 'success')
        onClose()
        onSaved?.()
      })
      .catch((err) => setError(getErrorMessage(err, 'Could not update the issue.')))
      .finally(() => setSubmitting(false))
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Edit issue"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Edit issue #{issue.id}</h2>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close">
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
            <span className={styles.label}>Assignees</span>
            {assignees.length > 0 ? (
              <div className={styles.chips}>
                {assignees.map((assignee) => (
                  <span key={assignee.uuid} className={styles.chip}>
                    {assignee.firstName} {assignee.lastName}
                    <button
                      type="button"
                      onClick={() => setAssignees((prev) => prev.filter((candidate) => candidate.uuid !== assignee.uuid))}
                      aria-label={`Remove ${assignee.firstName} ${assignee.lastName}`}
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
                {availableAssigneeResults.map((candidate) => (
                  <button
                    key={candidate.uuid}
                    type="button"
                    className={styles.dropdownItem}
                    onClick={() => {
                      setAssignees((prev) => [...prev, candidate])
                      setAssigneeQuery('')
                    }}
                  >
                    {candidate.firstName} {candidate.lastName}
                    <span className={styles.dropdownUsername}>@{candidate.username}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {error ? <p className={styles.error}>{error}</p> : null}

          <div className={styles.actions}>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={submitting || !title.trim() || !projectId}>
              {submitting ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
