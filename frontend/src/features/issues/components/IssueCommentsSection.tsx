import { useMemo, useState } from 'react'
import { IconCornerDownRight } from '@/components/icons'
import type { UserSummary } from '@/features/users/types'
import { CommentForm } from './CommentForm'
import { RestrictedNote } from './RestrictedNote'
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

export function IssueCommentsSection({ issueId, comments, usersByUuid, canComment, onChanged }: IssueCommentsSectionProps) {
  const [replyingToId, setReplyingToId] = useState<number | null>(null)

  const byId = useMemo(() => new Map(comments.map((comment) => [comment.id, comment])), [comments])

  return (
    <div>
      <div className={styles.list}>
        {comments.length === 0 ? <p className={styles.empty}>No comments yet.</p> : null}
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
              <div className={styles.commentHeader}>
                <span className={styles.author}>{authorLabel}</span>
                {comment.parentCommentId != null ? (
                  <span className={styles.replyBadge}>
                    <IconCornerDownRight size={11} />
                    reply
                  </span>
                ) : null}
              </div>

              {comment.deleted ? (
                <p className={styles.deletedText}>{comment.content}</p>
              ) : (
                <>
                  <p className={styles.commentTitle}>{comment.title}</p>
                  {comment.content ? <p className={styles.commentContent}>{comment.content}</p> : null}
                </>
              )}

              {canComment ? (
                <button type="button" className={styles.replyButton} onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)}>
                  {replyingToId === comment.id ? 'Cancel reply' : 'Reply'}
                </button>
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
          )
        })}
      </div>

      <div className={styles.newCommentSection}>
        {canComment ? (
          <CommentForm issueId={issueId} onSubmitted={onChanged} />
        ) : (
          <RestrictedNote>Only the reporter, assignee, or a manager/admin can comment on this issue.</RestrictedNote>
        )}
      </div>
    </div>
  )
}
