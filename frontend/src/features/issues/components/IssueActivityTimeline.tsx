import type { ReactNode } from 'react'
import { IconCheckCircle, IconPlus } from '@/components/icons'
import type { UserSummary } from '@/features/users/types'
import { formatRelativeDate } from '@/utils/format'
import type { IssueDetail } from '../types'
import styles from './IssueActivityTimeline.module.css'

interface ActivityEntry {
  id: string
  icon: ReactNode
  tone: 'neutral' | 'success'
  text: string
  timestamp: string
}

function personName(uuid: string | null, usersByUuid: Record<string, UserSummary>): string {
  if (!uuid) return 'Someone'
  const user = usersByUuid[uuid]
  return user ? `${user.firstName} ${user.lastName}` : 'Someone'
}

interface IssueActivityTimelineProps {
  issue: IssueDetail
  usersByUuid: Record<string, UserSummary>
}

// The backend has no audit-log entity/endpoint - it only stores the current
// creator and (if closed) closedBy/closedAt on the Issue itself. There's no
// history of intermediate status changes, reassignments, or edits. So this
// shows only the two events that really are derivable from those fields,
// instead of inventing a fuller timeline - see the note rendered below.
export function IssueActivityTimeline({ issue, usersByUuid }: IssueActivityTimelineProps) {
  const entries: ActivityEntry[] = [
    {
      id: 'created',
      icon: <IconPlus size={12} />,
      tone: 'neutral',
      text: `${personName(issue.creatorUuid, usersByUuid)} reported this issue`,
      timestamp: issue.createdAt,
    },
  ]

  if (issue.status === 'DONE' && issue.closedAt) {
    entries.push({
      id: 'closed',
      icon: <IconCheckCircle size={12} />,
      tone: 'success',
      text: `${personName(issue.closedByUuid, usersByUuid)} closed this issue`,
      timestamp: issue.closedAt,
    })
  }

  return (
    <div>
      <ul className={styles.timeline}>
        {entries.map((entry) => (
          <li key={entry.id} className={styles.entry}>
            <span className={entry.tone === 'success' ? `${styles.dot} ${styles.dotSuccess}` : styles.dot}>{entry.icon}</span>
            <span className={styles.text}>{entry.text}</span>
            <span className={styles.timestamp}>{formatRelativeDate(entry.timestamp)}</span>
          </li>
        ))}
      </ul>
      <p className={styles.note}>
        Only what's actually tracked today (who reported it, who closed it) — there's no backend audit log yet for
        status changes or reassignments in between.
      </p>
    </div>
  )
}
