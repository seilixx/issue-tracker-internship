import { useEffect, useMemo, useState } from 'react'
import { Badge, type BadgeTone } from '@/components/Badge'
import { EmptyState } from '@/components/EmptyState'
import { PriorityBadge, PRIORITY_TOKEN_VARS } from '@/components/PriorityBadge'
import { Skeleton } from '@/components/Skeleton'
import { IconActivity, IconAlertTriangle, IconMessageCircle, IconPaperclip, IconX } from '@/components/icons'
import { useToast } from '@/components/toast/useToast'
import { useUsersLookup } from '@/features/users/hooks/useUsersLookup'
import { useAuth } from '@/features/auth/useAuth'
import type { Project } from '@/features/projects/types'
import { getErrorMessage } from '@/utils/apiClient'
import type { Status } from '@/utils/apiTypes'
import { deleteIssue } from '../api'
import { useIssueDetail } from '../hooks/useIssueDetail'
import { computeIssuePermissions } from '../permissions'
import { CommentForm } from './CommentForm'
import { EditIssueModal } from './EditIssueModal'
import { IssueActivityTimeline } from './IssueActivityTimeline'
import { IssueAttachmentsSection } from './IssueAttachmentsSection'
import { IssueCommentsSection } from './IssueCommentsSection'
import { IssueDescription } from './IssueDescription'
import { IssueDetailFields } from './IssueDetailFields'
import { IssueStatusControl } from './IssueStatusControl'
import { RestrictedNote } from './RestrictedNote'
import styles from './IssueDetailPanel.module.css'

const STATUS_LABELS: Record<Status, string> = { OPEN: 'Open', IN_PROGRESS: 'In Progress', DONE: 'Closed' }
const STATUS_TONES: Record<Status, BadgeTone> = { OPEN: 'neutral', IN_PROGRESS: 'info', DONE: 'success' }

interface IssueDetailPanelProps {
  issueId: number | null
  projectsById: Map<number, Project>
  onClose: () => void
  /** Fired after the issue is edited or deleted, so the parent list can refresh. */
  onIssueMutated?: () => void
}

// Matches --transition-base in index.css — kept as a constant here so the
// unmount timer and the CSS animation duration can't silently drift apart.
const CLOSE_ANIMATION_MS = 200

export function IssueDetailPanel({ issueId, projectsById, onClose, onIssueMutated }: IssueDetailPanelProps) {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  // Keeps rendering the last-open issue's data while the close animation
  // plays, instead of the content disappearing a beat before the panel does.
  const [displayedIssueId, setDisplayedIssueId] = useState<number | null>(null)

  useEffect(() => {
    if (issueId != null) {
      setDisplayedIssueId(issueId)
      setVisible(true)
      setClosing(false)
      return
    }
    if (visible) {
      setClosing(true)
      const timer = setTimeout(() => {
        setVisible(false)
        setClosing(false)
        setDisplayedIssueId(null)
      }, CLOSE_ANIMATION_MS)
      return () => clearTimeout(timer)
    }
  }, [issueId, visible])

  const { issue, loading, error, refetch } = useIssueDetail(displayedIssueId)

  useEffect(() => {
    if (!visible) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [visible, onClose])

  const relevantUuids = useMemo(() => {
    if (!issue) return []
    const uuids = [issue.creatorUuid, issue.closedByUuid, ...issue.assignedUuids]
    for (const comment of issue.comments) uuids.push(comment.authorUuid)
    for (const attachment of issue.attachments) uuids.push(attachment.uploadedByUuid)
    return uuids.filter((uuid): uuid is string => Boolean(uuid))
  }, [issue])

  const usersByUuid = useUsersLookup(relevantUuids)

  if (!visible) return null

  const project = issue ? projectsById.get(issue.projectId) : undefined
  const permissions = issue && user ? computeIssuePermissions(issue, project, user) : null
  const canDelete = user?.role === 'ADMIN' || user?.role === 'MANAGER'

  function handleDelete() {
    if (!issue || deleting) return
    if (!window.confirm(`Delete issue #${issue.id} "${issue.title}"? This cannot be undone.`)) return

    setDeleting(true)
    deleteIssue(issue.id)
      .then(() => {
        showToast('Issue deleted.', 'success')
        onClose()
        onIssueMutated?.()
      })
      .catch((err) => showToast(getErrorMessage(err, 'Could not delete the issue.'), 'error'))
      .finally(() => setDeleting(false))
  }

  return (
    <>
      <div className={closing ? `${styles.backdrop} ${styles.backdropClosing}` : styles.backdrop} onClick={onClose} />
      <div
        className={closing ? `${styles.panel} ${styles.panelClosing}` : styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={issue ? issue.title : 'Issue detail'}
      >
        <div className={styles.header}>
          <div className={styles.headerMain}>
            <h2 className={styles.title}>{issue ? issue.title : loading ? 'Loading…' : 'Issue'}</h2>
            <div className={styles.headerActions}>
              {issue && permissions?.canEditFields ? (
                <button type="button" className={styles.actionButton} onClick={() => setEditOpen(true)}>
                  Edit
                </button>
              ) : null}
              {issue && canDelete ? (
                <button
                  type="button"
                  className={`${styles.actionButton} ${styles.deleteAction}`}
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? 'Deleting…' : 'Delete'}
                </button>
              ) : null}
              <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close">
                <IconX size={16} />
              </button>
            </div>
          </div>

          {issue ? (
            <div className={styles.badgeRow}>
              <span className={styles.refChip}>
                <span className={styles.refDot} style={{ backgroundColor: `var(${PRIORITY_TOKEN_VARS[issue.priority]})` }} />
                #{issue.id}
              </span>
              <PriorityBadge priority={issue.priority} />
              <Badge tone={STATUS_TONES[issue.status]}>{STATUS_LABELS[issue.status]}</Badge>
            </div>
          ) : null}
        </div>

        <div className={styles.body}>
          {loading ? (
            <div className={styles.skeletonBody}>
              <Skeleton height={16} width="60%" />
              <Skeleton height={80} />
              <Skeleton height={80} />
              <Skeleton height={120} />
            </div>
          ) : null}

          {!loading && error ? (
            <EmptyState
              tone="error"
              icon={<IconAlertTriangle size={22} />}
              title="Couldn't load this issue"
              description={error}
              action={
                <button type="button" onClick={refetch}>
                  Retry
                </button>
              }
            />
          ) : null}

          {!loading && issue && permissions ? (
            <>
              {issue.description ? (
                <div className={styles.section}>
                  <span className={styles.sectionTitle}>Description</span>
                  <IssueDescription description={issue.description} />
                </div>
              ) : null}

              <IssueDetailFields issue={issue} project={project} usersByUuid={usersByUuid} />

              <div className={styles.section}>
                <span className={styles.sectionTitle}>Status</span>
                <IssueStatusControl
                  issueId={issue.id}
                  currentStatus={issue.status}
                  canChangeStatus={permissions.canChangeStatus}
                  onChanged={refetch}
                />
              </div>

              <div className={styles.section}>
                <span className={styles.sectionTitle}>
                  <IconPaperclip size={14} />
                  Attachments ({issue.attachments.length})
                </span>
                <IssueAttachmentsSection
                  issueId={issue.id}
                  attachments={issue.attachments}
                  usersByUuid={usersByUuid}
                  canAttachFiles={permissions.canAttachFiles}
                  restrictedReason={
                    issue.status === 'DONE'
                      ? 'Attachments are disabled on closed issues.'
                      : 'Only the assignee, reporter, project leader, or a manager/admin can attach files.'
                  }
                  onChanged={refetch}
                />
              </div>

              <div className={styles.section}>
                <span className={styles.sectionTitle}>
                  <IconMessageCircle size={14} />
                  Comments ({issue.comments.length})
                </span>
                <IssueCommentsSection
                  issueId={issue.id}
                  comments={issue.comments}
                  usersByUuid={usersByUuid}
                  canComment={permissions.canComment}
                  onChanged={refetch}
                />
              </div>

              <div className={styles.section}>
                <span className={styles.sectionTitle}>
                  <IconActivity size={14} />
                  Audit trail
                </span>
                <IssueActivityTimeline issue={issue} usersByUuid={usersByUuid} />
              </div>
            </>
          ) : null}
        </div>

        {!loading && issue && permissions ? (
          <div className={styles.footer}>
            {permissions.canComment ? (
              <CommentForm issueId={issue.id} onSubmitted={refetch} />
            ) : (
              <RestrictedNote>Only the reporter, assignee, or a manager/admin can comment on this issue.</RestrictedNote>
            )}
          </div>
        ) : null}
      </div>

      {editOpen && issue ? (
        <EditIssueModal
          issue={issue}
          initialAssignees={issue.assignedUuids
            .map((uuid) => usersByUuid[uuid])
            .filter((assignee) => assignee != null)}
          onClose={() => setEditOpen(false)}
          onSaved={() => {
            refetch()
            onIssueMutated?.()
          }}
        />
      ) : null}
    </>
  )
}
