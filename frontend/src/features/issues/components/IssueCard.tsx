import type { DragEvent } from 'react'
import { AvatarStack, type AvatarStackPerson } from '@/components/AvatarChip'
import { PriorityIcon } from '@/components/PriorityIcon'
import { formatRelativeDate } from '@/utils/format'
import type { Issue } from '../types'
import styles from './IssueCard.module.css'

interface IssueCardProps {
  issue: Issue
  projectLabel?: string
  assignees: AvatarStackPerson[]
  draggable: boolean
  isDragging: boolean
  onDragStart: (event: DragEvent<HTMLDivElement>, issue: Issue) => void
  onDragEnd: () => void
  onClick: () => void
}

export function IssueCard({ issue, projectLabel, assignees, draggable, isDragging, onDragStart, onDragEnd, onClick }: IssueCardProps) {
  return (
    <div
      className={[styles.card, draggable ? '' : styles.cardLocked, isDragging ? styles.dragging : ''].filter(Boolean).join(' ')}
      draggable={draggable}
      onDragStart={(event) => onDragStart(event, issue)}
      onDragEnd={onDragEnd}
      onClick={onClick}
      title={draggable ? undefined : 'Closed issues cannot be moved'}
    >
      <div className={styles.topRow}>
        {projectLabel ? <span className={styles.projectLabel}>{projectLabel}</span> : <span />}
        <PriorityIcon priority={issue.priority} size={14} />
      </div>

      <p className={styles.title}>{issue.title}</p>

      <div className={styles.footer}>
        <span className={styles.meta}>
          #{issue.id} · {formatRelativeDate(issue.updatedAt)}
        </span>
        <AvatarStack people={assignees} />
      </div>
    </div>
  )
}
