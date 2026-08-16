import { useState, type FormEvent } from 'react'
import { IconSend } from '@/components/icons'
import { getErrorMessage } from '@/utils/apiClient'
import { createComment } from '../api'
import styles from './CommentForm.module.css'

interface CommentFormProps {
  issueId: number
  parentCommentId?: number
  autoFocus?: boolean
  onSubmitted: () => void
  onCancel?: () => void
}

export function CommentForm({ issueId, parentCommentId, autoFocus, onSubmitted, onCancel }: CommentFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!title.trim() || submitting) return

    setSubmitting(true)
    setError(null)
    createComment(issueId, { title: title.trim(), content: content.trim() || undefined, parentCommentId })
      .then(() => {
        setTitle('')
        setContent('')
        onSubmitted()
      })
      .catch((err) => setError(getErrorMessage(err, 'Could not post the comment.')))
      .finally(() => setSubmitting(false))
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.titleInput}
        placeholder={parentCommentId ? 'Reply title' : 'Comment title'}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        autoFocus={autoFocus}
        required
      />
      <textarea
        className={styles.contentInput}
        placeholder="Write a message (optional)…"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows={3}
      />
      <div className={styles.actions}>
        <button type="submit" className={styles.submitButton} disabled={submitting || !title.trim()}>
          <IconSend size={13} />
          {parentCommentId ? 'Reply' : 'Comment'}
        </button>
        {onCancel ? (
          <button type="button" className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
      {error ? <p className={styles.error}>{error}</p> : null}
    </form>
  )
}
