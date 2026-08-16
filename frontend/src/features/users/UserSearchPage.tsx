import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AvatarChip } from '@/components/AvatarChip'
import { EmptyState } from '@/components/EmptyState'
import { Skeleton } from '@/components/Skeleton'
import { IconAlertTriangle, IconSearch } from '@/components/icons'
import { getInitials } from '@/utils/format'
import { useUserSearchPage } from './hooks/useUserSearchPage'
import styles from './UserSearchPage.module.css'

function ResultsSkeleton() {
  return (
    <div className={styles.list}>
      {[0, 1, 2].map((key) => (
        <div className={styles.row} key={key}>
          <Skeleton width={30} height={30} radius="var(--radius-full)" />
          <div className={styles.rowInfo}>
            <Skeleton width="40%" height={14} />
            <Skeleton width="25%" height={12} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function UserSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const [page, setPage] = useState(0)
  const { data, loading, error } = useUserSearchPage(query, page)

  function handleQueryChange(value: string) {
    setPage(0)
    setSearchParams(value ? { q: value } : {})
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Find people</h1>

      <label className={styles.searchBox}>
        <IconSearch size={16} className={styles.searchIcon} />
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search by name or username…"
          value={query}
          onChange={(event) => handleQueryChange(event.target.value)}
          autoFocus
        />
      </label>

      {query.trim().length < 2 ? (
        <p className={styles.hint}>Type at least 2 characters to search.</p>
      ) : error ? (
        <EmptyState tone="error" icon={<IconAlertTriangle size={22} />} title="Search failed" description={error} />
      ) : loading ? (
        <ResultsSkeleton />
      ) : data && data.content.length > 0 ? (
        <>
          <div className={styles.list}>
            {data.content.map((user) => (
              <Link key={user.uuid} to={`/profile/${user.uuid}`} className={styles.row}>
                <AvatarChip
                  size="md"
                  initials={getInitials(user.firstName, user.lastName)}
                  avatarUrl={user.avatarUrl}
                  title={`${user.firstName} ${user.lastName}`}
                />
                <div className={styles.rowInfo}>
                  <p className={styles.rowName}>
                    {user.firstName} {user.lastName}
                  </p>
                  <p className={styles.rowMeta}>@{user.username}</p>
                </div>
                <span className={styles.roleBadge}>{user.role.toLowerCase()}</span>
              </Link>
            ))}
          </div>

          {data.totalPages > 1 ? (
            <div className={styles.pager}>
              <button type="button" className={styles.pagerButton} disabled={page <= 0} onClick={() => setPage((p) => p - 1)}>
                Previous
              </button>
              <span className={styles.pagerLabel}>
                Page {page + 1} of {data.totalPages}
              </span>
              <button
                type="button"
                className={styles.pagerButton}
                disabled={page + 1 >= data.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <EmptyState icon={<IconSearch size={22} />} title="No people found" description={`No users match "${query}".`} />
      )}
    </div>
  )
}
