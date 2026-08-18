import { EmptyState } from '@/components/EmptyState'
import { StatCard } from '@/components/StatCard'
import { IconAlertTriangle, IconCheckCircle } from '@/components/icons'
import { IssuesView } from '@/features/issues/IssuesView'
import { PriorityDonutCard } from './components/PriorityDonutCard'
import { useDashboardStats } from './hooks/useDashboardStats'
import styles from './DashboardPage.module.css'

// Share of the total issue volume each stat represents — a real, derived
// number rather than a decorative bar. Same metric on every card so it's
// directly comparable across them.
function shareOf(count: number, total: number): number {
  if (total <= 0) return 0
  return Math.min(100, Math.round((count / total) * 100))
}

export function DashboardPage() {
  const { stats, loading, error, refetch } = useDashboardStats()

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
      </div>

      {error ? (
        <EmptyState
          tone="error"
          icon={<IconAlertTriangle size={22} />}
          title="Couldn't load dashboard stats"
          description={error}
          action={
            <button type="button" onClick={refetch}>
              Retry
            </button>
          }
        />
      ) : (
        <div className={styles.statsRow}>
          <StatCard
            label="Open Issues"
            value={loading ? '—' : (stats?.openCount ?? 0)}
            progress={loading || !stats ? undefined : shareOf(stats.openCount, stats.totalIssuesCount)}
          />
          <StatCard
            label="In Progress"
            value={loading ? '—' : (stats?.inProgressCount ?? 0)}
            progress={loading || !stats ? undefined : shareOf(stats.inProgressCount, stats.totalIssuesCount)}
          />
          <StatCard
            label="Critical Issues"
            value={loading ? '—' : (stats?.criticalOpenCount ?? 0)}
            progress={loading || !stats ? undefined : shareOf(stats.criticalOpenCount, stats.totalIssuesCount)}
            icon={<IconAlertTriangle size={20} />}
          />
          <StatCard
            label="Resolved Today"
            value={loading ? '—' : (stats?.resolvedTodayCount ?? 0)}
            progress={loading || !stats ? undefined : shareOf(stats.resolvedTodayCount, stats.totalIssuesCount)}
            icon={<IconCheckCircle size={20} />}
          />
          <PriorityDonutCard counts={stats?.priorityCounts ?? null} loading={loading} error={null} />
        </div>
      )}

      <div className={styles.board}>
        <IssuesView />
      </div>
    </div>
  )
}
