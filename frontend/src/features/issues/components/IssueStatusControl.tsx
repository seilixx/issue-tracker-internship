import { useState } from 'react'
import { useToast } from '@/components/toast/useToast'
import { getErrorMessage } from '@/utils/apiClient'
import type { Status } from '@/utils/apiTypes'
import { useUpdateIssueStatus } from '../hooks/useUpdateIssueStatus'
import { RestrictedNote } from './RestrictedNote'
import styles from './IssueStatusControl.module.css'

const OPTIONS: { status: Status; label: string }[] = [
  { status: 'OPEN', label: 'Open' },
  { status: 'IN_PROGRESS', label: 'In Progress' },
  { status: 'DONE', label: 'Closed' },
]

interface IssueStatusControlProps {
  issueId: number
  currentStatus: Status
  canChangeStatus: boolean
  onChanged: () => void
}

export function IssueStatusControl({ issueId, currentStatus, canChangeStatus, onChanged }: IssueStatusControlProps) {
  const { updateStatus, pendingIds } = useUpdateIssueStatus()
  const { showToast } = useToast()
  const [error, setError] = useState<string | null>(null)
  const isPending = pendingIds.has(issueId)

  if (!canChangeStatus) {
    return (
      <RestrictedNote>
        {currentStatus === 'DONE'
          ? 'This issue is closed — its status can no longer be changed.'
          : 'Only the reporter, assignee, or a manager/admin can change the status.'}
      </RestrictedNote>
    )
  }

  function handleSelect(status: Status) {
    if (status === currentStatus || isPending) return
    setError(null)
    updateStatus(issueId, status)
      .then(() => {
        showToast(`Status changed to ${OPTIONS.find((option) => option.status === status)?.label ?? status}.`, 'success')
        onChanged()
      })
      .catch((err) => setError(getErrorMessage(err, 'Could not update the status.')))
  }

  return (
    <div>
      <div className={styles.control} role="group" aria-label="Change status">
        {OPTIONS.map((option) => (
          <button
            key={option.status}
            type="button"
            className={option.status === currentStatus ? `${styles.option} ${styles.optionActive}` : styles.option}
            disabled={isPending}
            onClick={() => handleSelect(option.status)}
          >
            {option.label}
          </button>
        ))}
      </div>
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  )
}
