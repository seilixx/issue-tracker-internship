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

// Single field, mapped to the backend's required `title` (content stays
// unset) — the comment model technically has two fields (title + optional
// content), but the mockup's compact "write a comment" box only shows one,
// so this collapses to that rather than showing two inputs for one message.
export function CommentForm({ issueId, parentCommentId, autoFocus, onSubmitted, onCancel }: CommentFormProps) {
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!text.trim() || submitting) return

    setSubmitting(true)
    setError(null)
    createComment(issueId, { title: text.trim(), parentCommentId })
      .then(() => {
        setText('')
        onSubmitted()
      })
      .catch((err) => setError(getErrorMessage(err, 'Could not post the comment.')))
      .finally(() => setSubmitting(false))
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <input
          type="text"
          className={styles.input}
          placeholder={parentCommentId ? 'Write a reply…' : 'Write a comment…'}
          value={text}
          onChange={(event) => setText(event.target.value)}
          autoFocus={autoFocus}
        />
        {onCancel ? (
          <button type="button" className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        ) : null}
        <button type="submit" className={styles.sendButton} disabled={submitting || !text.trim()} aria-label="Send comment">
          <IconSend size={14} />
        </button>
      </div>
      {error ? <p className={styles.error}>{error}</p> : null}
    </form>
  )
}
