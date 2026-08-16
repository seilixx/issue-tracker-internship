import { AvatarChip, AvatarStack } from '@/components/AvatarChip'
import { PriorityIcon } from '@/components/PriorityIcon'
import type { Project } from '@/features/projects/types'
import type { UserSummary } from '@/features/users/types'
import { getInitials } from '@/utils/format'
import type { IssueDetail } from '../types'
import styles from './IssueDetailFields.module.css'

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' })

function personLabel(user: UserSummary | undefined, loading: boolean) {
  if (loading) return <AvatarChip loading size="sm" />
  if (!user) return <span className={styles.muted}>Unknown user</span>
  return (
    <span className={styles.person}>
      <AvatarChip
        initials={getInitials(user.firstName, user.lastName)}
        title={`${user.firstName} ${user.lastName}`}
        avatarUrl={user.avatarUrl}
        size="sm"
      />
      {user.firstName} {user.lastName}
    </span>
  )
}

interface IssueDetailFieldsProps {
  issue: IssueDetail
  project: Project | undefined
  usersByUuid: Record<string, UserSummary>
}

export function IssueDetailFields({ issue, project, usersByUuid }: IssueDetailFieldsProps) {
  const reporter = issue.creatorUuid ? usersByUuid[issue.creatorUuid] : undefined
  const reporterLoading = Boolean(issue.creatorUuid) && !reporter
  const closedBy = issue.closedByUuid ? usersByUuid[issue.closedByUuid] : undefined
  const closedByLoading = Boolean(issue.closedByUuid) && !closedBy

  const assignees = issue.assignedUuids.map((uuid) => {
    const user = usersByUuid[uuid]
    return {
      key: uuid,
      loading: !user,
      initials: user ? getInitials(user.firstName, user.lastName) : undefined,
      title: user ? `${user.firstName} ${user.lastName}` : undefined,
      avatarUrl: user?.avatarUrl,
    }
  })

  return (
    <div className={styles.grid}>
      <span className={styles.label}>Project</span>
      <span className={styles.value}>{project?.title ?? <span className={styles.muted}>Unknown project</span>}</span>

      <span className={styles.label}>Reporter</span>
      <span className={styles.value}>{personLabel(reporter, reporterLoading)}</span>

      <span className={styles.label}>Assignee</span>
      <span className={styles.value}>
        {assignees.length > 0 ? (
          <AvatarStack people={assignees} max={5} />
        ) : (
          <span className={styles.muted}>Unassigned</span>
        )}
      </span>

      <span className={styles.label}>Priority</span>
      <span className={styles.value}>
        <PriorityIcon priority={issue.priority} showLabel />
      </span>

      {issue.status === 'DONE' ? (
        <>
          <span className={styles.label}>Closed by</span>
          <span className={styles.value}>{personLabel(closedBy, closedByLoading)}</span>

          <span className={styles.label}>Closed at</span>
          <span className={styles.value}>{issue.closedAt ? dateFormatter.format(new Date(issue.closedAt)) : '—'}</span>
        </>
      ) : null}
    </div>
  )
}
