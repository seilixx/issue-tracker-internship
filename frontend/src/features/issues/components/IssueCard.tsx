import { useEffect, useRef, useState, type DragEvent } from 'react'
import { AvatarStack, type AvatarStackPerson } from '@/components/AvatarChip'
import { Badge, type BadgeTone } from '@/components/Badge'
import { PriorityBadge } from '@/components/PriorityBadge'
import { IconMoreVertical } from '@/components/icons'
import type { Status } from '@/utils/apiTypes'
import { formatRelativeDate } from '@/utils/format'
import type { Issue } from '../types'
import styles from './IssueCard.module.css'

const STATUS_LABELS: Record<Status, string> = { OPEN: 'Open', IN_PROGRESS: 'In Progress', DONE: 'Closed' }
const STATUS_TONES: Record<Status, BadgeTone> = { OPEN: 'neutral', IN_PROGRESS: 'info', DONE: 'success' }
const STATUS_ORDER: Status[] = ['OPEN', 'IN_PROGRESS', 'DONE']

interface IssueCardProps {
  issue: Issue
  projectLabel?: string
  assignees: AvatarStackPerson[]
  draggable: boolean
  isDragging: boolean
  onDragStart: (event: DragEvent<HTMLDivElement>, issue: Issue) => void
  onDragEnd: () => void
  onClick: () => void
  /** Omit to hide the status-change items in the "..." menu entirely (e.g. no permission). */
  onChangeStatus?: (status: Status) => void
}

export function IssueCard({
  issue,
  projectLabel,
  assignees,
  draggable,
  isDragging,
  onDragStart,
  onDragEnd,
  onClick,
  onChangeStatus,
}: IssueCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    function handlePointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [menuOpen])

  const primaryAssignee = assignees[0]
  const assigneeName = assignees.length === 0 ? 'Unassigned' : primaryAssignee.loading ? 'Loading…' : (primaryAssignee.title ?? 'Unknown')
  const otherStatuses = draggable ? STATUS_ORDER.filter((status) => status !== issue.status) : []

  return (
    <div
      className={[styles.card, draggable ? '' : styles.cardLocked, isDragging ? styles.dragging : ''].filter(Boolean).join(' ')}
      draggable={draggable}
      onDragStart={(event) => onDragStart(event, issue)}
      onDragEnd={onDragEnd}
      onClick={onClick}
      title={draggable ? undefined : 'Closed issues cannot be moved'}
    >
      <div className={styles.header}>
        {projectLabel ? <span className={styles.projectLabel}>{projectLabel}</span> : <span />}
        <div className={styles.menuWrapper} ref={menuRef}>
          <button
            type="button"
            className={styles.menuButton}
            aria-label="Issue actions"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={(event) => {
              event.stopPropagation()
              setMenuOpen((value) => !value)
            }}
          >
            <IconMoreVertical size={16} />
          </button>

          {menuOpen ? (
            <div className={styles.menu} role="menu" onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                className={styles.menuItem}
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false)
                  onClick()
                }}
              >
                Open issue
              </button>
              {onChangeStatus && otherStatuses.length > 0 ? (
                <>
                  <div className={styles.menuDivider} />
                  {otherStatuses.map((status) => (
                    <button
                      key={status}
                      type="button"
                      className={styles.menuItem}
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false)
                        onChangeStatus(status)
                      }}
                    >
                      Move to {STATUS_LABELS[status]}
                    </button>
                  ))}
                </>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      <p className={styles.ref}>
        #{issue.id} · {formatRelativeDate(issue.updatedAt)}
      </p>

      <p className={styles.title}>{issue.title}</p>

      <div className={styles.priorityRow}>
        <span className={styles.rowLabel}>Priority</span>
        <PriorityBadge priority={issue.priority} />
      </div>

      <div className={styles.assigneeRow}>
        <AvatarStack people={assignees} />
        <span className={styles.assigneeName}>{assigneeName}</span>
        <Badge tone={STATUS_TONES[issue.status]} className={styles.statusBadge}>
          {STATUS_LABELS[issue.status]}
        </Badge>
      </div>
    </div>
  )
}
