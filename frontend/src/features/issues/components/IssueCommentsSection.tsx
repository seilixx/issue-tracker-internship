import { useMemo, useState, type FormEvent } from 'react'
import { AvatarChip } from '@/components/AvatarChip'
import { IconCornerDownRight } from '@/components/icons'
import { useToast } from '@/components/toast/useToast'
import { useAuth } from '@/features/auth/useAuth'
import type { UserSummary } from '@/features/users/types'
import { getErrorMessage } from '@/utils/apiClient'
import { formatRelativeDate, getInitials } from '@/utils/format'
import { deleteComment, updateComment } from '../api'
import { CommentForm } from './CommentForm'
import type { CommentThread } from '../types'
import styles from './IssueCommentsSection.module.css'

const MAX_VISUAL_DEPTH = 2
const INDENT_PX = 24

function computeDepth(comment: CommentThread, byId: Map<number, CommentThread>): number {
  let depth = 0
  let current = comment
  const visited = new Set<number>()

  while (current.parentCommentId != null && !visited.has(current.id)) {
    visited.add(current.id)
    const parent = byId.get(current.parentCommentId)
    if (!parent) break
    depth += 1
    current = parent
  }
  return depth
}

interface IssueCommentsSectionProps {
  issueId: number
  comments: CommentThread[]
  usersByUuid: Record<string, UserSummary>
  canComment: boolean
  onChanged: () => void
}

// The top-level "write a comment" box lives in IssueDetailPanel's fixed
// footer now (see mockup: pinned to the bottom of the panel, not inline at
// the end of the thread) — this component only renders the thread itself
// plus the inline reply forms, which stay exactly where they were.
export function IssueCommentsSection({ issueId, comments, usersByUuid, canComment, onChanged }: IssueCommentsSectionProps) {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [replyingToId, setReplyingToId] = useState<number | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')
  const [editError, setEditError] = useState<string | null>(null)
  const [savingEdit, setSavingEdit] = useState(false)

  const byId = useMemo(() => new Map(comments.map((comment) => [comment.id, comment])), [comments])

  // Mirrors the backend rule on PUT/DELETE /api/comments/{id}: the author,
  // an admin or a manager.
  function canManageComment(comment: CommentThread): boolean {
    if (!user) return false
    return user.role === 'ADMIN' || user.role === 'MANAGER' || comment.authorUuid === user.uuid
  }

  function startEdit(comment: CommentThread) {
    setEditingId(comment.id)
    setEditText(comment.title)
    setEditError(null)
    setReplyingToId(null)
  }

  function handleEditSubmit(event: FormEvent, comment: CommentThread) {
    event.preventDefault()
    if (!editText.trim() || savingEdit) return

    setSavingEdit(true)
    setEditError(null)
    updateComment(comment.id, { title: editText.trim(), content: comment.content ?? undefined })
      .then(() => {
        setEditingId(null)
        showToast('Comment updated.', 'success')
        onChanged()
      })
      .catch((err) => setEditError(getErrorMessage(err, 'Could not update the comment.')))
      .finally(() => setSavingEdit(false))
  }

  function handleDelete(comment: CommentThread) {
    if (!window.confirm('Delete this comment? Replies to it will stay visible.')) return

    deleteComment(comment.id)
      .then(() => {
        showToast('Comment deleted.', 'success')
        onChanged()
      })
      .catch((err) => showToast(getErrorMessage(err, 'Could not delete the comment.'), 'error'))
  }

  if (comments.length === 0) {
    return <p className={styles.empty}>No comments yet.</p>
  }

  return (
    <div className={styles.list}>
      {comments.map((comment) => {
        const depth = Math.min(computeDepth(comment, byId), MAX_VISUAL_DEPTH)
        const author = comment.authorUuid ? usersByUuid[comment.authorUuid] : undefined
        const authorLabel = author ? `${author.firstName} ${author.lastName}` : comment.authorUserName ? `@${comment.authorUserName}` : 'Unknown'

        return (
          <div
            key={comment.id}
            className={comment.deleted ? `${styles.comment} ${styles.commentDeleted}` : styles.comment}
            style={{ marginLeft: depth * INDENT_PX }}
          >
            <AvatarChip
              initials={author ? getInitials(author.firstName, author.lastName) : undefined}
              avatarUrl={author?.avatarUrl}
              title={authorLabel}
              size="sm"
            />

            <div className={styles.body}>
              <div className={styles.commentHeader}>
                <span className={styles.author}>{authorLabel}</span>
                {comment.createdAt ? <span className={styles.timestamp}>{formatRelativeDate(comment.createdAt)}</span> : null}
                {comment.parentCommentId != null ? (
                  <span className={styles.replyBadge}>
                    <IconCornerDownRight size={11} />
                    reply
                  </span>
                ) : null}
              </div>

              {comment.deleted ? (
                <p className={styles.deletedText}>{comment.content}</p>
              ) : editingId === comment.id ? (
                <form className={styles.editForm} onSubmit={(event) => handleEditSubmit(event, comment)}>
                  <input
                    type="text"
                    className={styles.editInput}
                    value={editText}
                    onChange={(event) => setEditText(event.target.value)}
                    autoFocus
                  />
                  <div className={styles.editActions}>
                    <button type="button" className={styles.actionLink} onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                    <button type="submit" className={styles.actionLink} disabled={savingEdit || !editText.trim()}>
                      {savingEdit ? 'Saving…' : 'Save'}
                    </button>
                  </div>
                  {editError ? <p className={styles.editError}>{editError}</p> : null}
                </form>
              ) : (
                <>
                  <p className={styles.commentTitle}>{comment.title}</p>
                  {comment.content ? <p className={styles.commentContent}>{comment.content}</p> : null}
                </>
              )}

              {!comment.deleted && editingId !== comment.id ? (
                <div className={styles.commentActions}>
                  {canComment ? (
                    <button
                      type="button"
                      className={styles.replyButton}
                      onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)}
                    >
                      {replyingToId === comment.id ? 'Cancel reply' : 'Reply'}
                    </button>
                  ) : null}
                  {canManageComment(comment) ? (
                    <>
                      <button type="button" className={styles.actionLink} onClick={() => startEdit(comment)}>
                        Edit
                      </button>
                      <button
                        type="button"
                        className={`${styles.actionLink} ${styles.deleteLink}`}
                        onClick={() => handleDelete(comment)}
                      >
                        Delete
                      </button>
                    </>
                  ) : null}
                </div>
              ) : null}

              {replyingToId === comment.id ? (
                <div className={styles.replyFormWrapper}>
                  <CommentForm
                    issueId={issueId}
                    parentCommentId={comment.id}
                    autoFocus
                    onCancel={() => setReplyingToId(null)}
                    onSubmitted={() => {
                      setReplyingToId(null)
                      onChanged()
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}
