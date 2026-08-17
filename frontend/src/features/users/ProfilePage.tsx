import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AvatarChip } from '@/components/AvatarChip'
import { EmptyState } from '@/components/EmptyState'
import { PriorityIcon } from '@/components/PriorityIcon'
import { Skeleton } from '@/components/Skeleton'
import { StatusBadge } from '@/components/StatusBadge'
import { IconAlertTriangle } from '@/components/icons'
import { formatRelativeDate, getInitials } from '@/utils/format'
import type { Issue } from '@/features/issues/types'
import type { PagedResponse } from '@/utils/apiTypes'
import { useAuth } from '@/features/auth/useAuth'
import { useUserProfile } from './hooks/useUserProfile'
import styles from './ProfilePage.module.css'

const PAGE_SIZE = 5

function IssueRow({ issue }: { issue: Issue }) {
  return (
    <div className={styles.issueRow}>
      <StatusBadge status={issue.status} />
      <PriorityIcon priority={issue.priority} />
      <span className={styles.issueTitle} title={issue.title}>
        #{issue.id} {issue.title}
      </span>
      <span className={styles.issueMeta}>{formatRelativeDate(issue.updatedAt)}</span>
    </div>
  )
}

function IssueSection({ title, page }: { title: string; page: PagedResponse<Issue> }) {
  return (
    <div className={styles.section}>
      <span className={styles.sectionTitle}>{title}</span>
      {page.content.length === 0 ? (
        <p className={styles.empty}>Nothing here.</p>
      ) : (
        page.content.map((issue) => <IssueRow key={issue.id} issue={issue} />)
      )}
    </div>
  )
}

export function ProfilePage() {
  const { uuid = '' } = useParams<{ uuid: string }>()
  const { user: currentUser } = useAuth()
  const [page, setPage] = useState(0)
  const { profile, loading, error, refetch } = useUserProfile(uuid, page, PAGE_SIZE)
  const isSelf = uuid === currentUser?.uuid

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Skeleton width={72} height={72} radius="var(--radius-full)" />
          <div className={styles.headerInfo}>
            <Skeleton width="50%" height={20} />
            <Skeleton width="30%" height={14} />
          </div>
        </div>
        <Skeleton height={100} />
        <Skeleton height={100} />
      </div>
    )
  }

  if (error || !profile) {
    return (
      <EmptyState
        tone="error"
        icon={<IconAlertTriangle size={22} />}
        title="Couldn't load this profile"
        description={error ?? 'Unknown error'}
        action={
          <button type="button" onClick={refetch}>
            Retry
          </button>
        }
      />
    )
  }

  const { user } = profile
  const maxTotalPages = Math.max(profile.assignedIssues.totalPages, profile.closedIssues.totalPages, 1)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <AvatarChip
          size="lg"
          initials={getInitials(user.firstName, user.lastName)}
          avatarUrl={user.avatarUrl}
          title={`${user.firstName} ${user.lastName}`}
        />
        <div className={styles.headerInfo}>
          <h1 className={styles.name}>
            {user.firstName} {user.lastName}
          </h1>
          <div className={styles.usernameRow}>
            @{user.username}
            <span className={styles.roleBadge}>{user.role.toLowerCase()}</span>
          </div>
          {user.bio ? <p className={styles.bio}>{user.bio}</p> : null}
        </div>
        {isSelf ? (
          <Link to="/profile/edit" className={styles.editButton}>
            Edit profile
          </Link>
        ) : null}
      </div>

      <IssueSection title={`Assigned issues (${profile.assignedIssuesCount})`} page={profile.assignedIssues} />
      <IssueSection title={`Closed issues (${profile.closedIssuesCount})`} page={profile.closedIssues} />

      {maxTotalPages > 1 ? (
        <div className={styles.pager}>
          <button type="button" className={styles.pagerButton} disabled={page <= 0} onClick={() => setPage((p) => p - 1)}>
            Previous
          </button>
          <span className={styles.pagerLabel}>
            Page {page + 1} of {maxTotalPages}
          </span>
          <button
            type="button"
            className={styles.pagerButton}
            disabled={page + 1 >= maxTotalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  )
}
