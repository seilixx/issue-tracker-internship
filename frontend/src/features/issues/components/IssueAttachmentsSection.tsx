import { useRef, useState, type ChangeEvent } from 'react'
import { IconPaperclip, IconTrash, IconUpload } from '@/components/icons'
import { getErrorMessage } from '@/utils/apiClient'
import { formatBytes, formatRelativeDate } from '@/utils/format'
import { CURRENT_USER } from '@/features/users/currentUser'
import type { UserSummary } from '@/features/users/types'
import { deleteAttachment, uploadAttachment } from '../api'
import { canDeleteAttachment } from '../permissions'
import type { AttachmentItem } from '../types'
import { RestrictedNote } from './RestrictedNote'
import styles from './IssueAttachmentsSection.module.css'

interface IssueAttachmentsSectionProps {
  issueId: number
  attachments: AttachmentItem[]
  usersByUuid: Record<string, UserSummary>
  canAttachFiles: boolean
  restrictedReason: string
  onChanged: () => void
}

export function IssueAttachmentsSection({
  issueId,
  attachments,
  usersByUuid,
  canAttachFiles,
  restrictedReason,
  onChanged,
}: IssueAttachmentsSectionProps) {
  const [uploading, setUploading] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setError(null)
    setUploading(true)
    uploadAttachment(issueId, file)
      .then(onChanged)
      .catch((err) => setError(getErrorMessage(err, 'Could not upload the file.')))
      .finally(() => setUploading(false))
  }

  function handleDelete(attachment: AttachmentItem) {
    setError(null)
    setDeletingId(attachment.id)
    deleteAttachment(attachment.id)
      .then(onChanged)
      .catch((err) => setError(getErrorMessage(err, 'Could not delete the attachment.')))
      .finally(() => setDeletingId(null))
  }

  return (
    <div>
      <div className={styles.list}>
        {attachments.length === 0 ? <p className={styles.empty}>No attachments yet.</p> : null}
        {attachments.map((attachment) => {
          const uploader = attachment.uploadedByUuid ? usersByUuid[attachment.uploadedByUuid] : undefined
          return (
            <div className={styles.row} key={attachment.id}>
              <IconPaperclip size={16} className={styles.icon} />
              <div className={styles.info}>
                <a className={styles.fileName} href={`/api/attachments/${attachment.id}/content`} target="_blank" rel="noreferrer">
                  {attachment.fileName}
                </a>
                <span className={styles.meta}>
                  {formatBytes(attachment.sizeBytes)} · {uploader ? `${uploader.firstName} ${uploader.lastName}` : 'Unknown'} ·{' '}
                  {formatRelativeDate(attachment.uploadedAt)}
                </span>
              </div>
              {canDeleteAttachment(attachment, CURRENT_USER) ? (
                <button
                  type="button"
                  className={styles.deleteButton}
                  disabled={deletingId === attachment.id}
                  onClick={() => handleDelete(attachment)}
                  aria-label={`Delete ${attachment.fileName}`}
                >
                  <IconTrash size={14} />
                </button>
              ) : null}
            </div>
          )
        })}
      </div>

      {canAttachFiles ? (
        <label className={uploading ? `${styles.uploadLabel} ${styles.uploadLabelDisabled}` : styles.uploadLabel}>
          <IconUpload size={15} />
          {uploading ? 'Uploading…' : 'Attach a file'}
          <input type="file" className={styles.uploadInput} ref={fileInputRef} onChange={handleFileChange} disabled={uploading} />
        </label>
      ) : (
        <RestrictedNote>{restrictedReason}</RestrictedNote>
      )}

      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  )
}
