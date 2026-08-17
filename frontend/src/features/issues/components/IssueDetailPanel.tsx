import { useEffect, useMemo, useState } from 'react'
import { EmptyState } from '@/components/EmptyState'
import { Skeleton } from '@/components/Skeleton'
import { StatusBadge } from '@/components/StatusBadge'
import { IconAlertTriangle, IconMessageCircle, IconPaperclip, IconX } from '@/components/icons'
import { useUsersLookup } from '@/features/users/hooks/useUsersLookup'
import { useAuth } from '@/features/auth/useAuth'
import type { Project } from '@/features/projects/types'
import { useIssueDetail } from '../hooks/useIssueDetail'
import { computeIssuePermissions } from '../permissions'
import { IssueAttachmentsSection } from './IssueAttachmentsSection'
import { IssueCommentsSection } from './IssueCommentsSection'
import { IssueDetailFields } from './IssueDetailFields'
import { IssueStatusControl } from './IssueStatusControl'
import styles from './IssueDetailPanel.module.css'

interface IssueDetailPanelProps {
  issueId: number | null
  projectsById: Map<number, Project>
  onClose: () => void
}

// Matches --transition-base in index.css — kept as a constant here so the
// unmount timer and the CSS animation duration can't silently drift apart.
const CLOSE_ANIMATION_MS = 200

export function IssueDetailPanel({ issueId, projectsById, onClose }: IssueDetailPanelProps) {
  const { user } = useAuth()
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
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
          <div>
            {issue ? (
              <div className={styles.headerMeta}>
                <span className={styles.issueId}>#{issue.id}</span>
                <StatusBadge status={issue.status} />
              </div>
            ) : null}
            <h2 className={styles.title}>{issue ? issue.title : loading ? 'Loading…' : 'Issue'}</h2>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close">
            <IconX size={16} />
          </button>
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
              {issue.description ? <p className={styles.description}>{issue.description}</p> : null}

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
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}
