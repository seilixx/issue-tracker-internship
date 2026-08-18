import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Card } from '@/components/Card'
import { Skeleton } from '@/components/Skeleton'
import type { Priority } from '@/utils/apiTypes'
import styles from './PriorityDonutCard.module.css'

// Fixed order + dedicated validated palette — see index.css (--chart-priority-*)
// for why this doesn't reuse --color-priority-*/--color-accent.
const PRIORITY_ORDER: Priority[] = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']
const PRIORITY_LABELS: Record<Priority, string> = { CRITICAL: 'Critical', HIGH: 'High', MEDIUM: 'Medium', LOW: 'Low' }
const PRIORITY_COLOR_VARS: Record<Priority, string> = {
  CRITICAL: '--chart-priority-critical',
  HIGH: '--chart-priority-high',
  MEDIUM: '--chart-priority-medium',
  LOW: '--chart-priority-low',
}

interface PriorityDonutCardProps {
  counts: Record<Priority, number> | null
  loading: boolean
  error: string | null
}

export function PriorityDonutCard({ counts, loading, error }: PriorityDonutCardProps) {
  const total = counts ? PRIORITY_ORDER.reduce((sum, priority) => sum + counts[priority], 0) : 0
  const data = PRIORITY_ORDER.map((priority) => ({ priority, value: counts?.[priority] ?? 0 }))

  return (
    <Card className={styles.card}>
      <p className={styles.title}>Priority breakdown</p>

      {loading ? (
        <div className={styles.loadingBody}>
          <Skeleton width={110} height={110} radius="var(--radius-full)" />
          <div className={styles.legend}>
            {PRIORITY_ORDER.map((priority) => (
              <Skeleton key={priority} height={14} width="80%" />
            ))}
          </div>
        </div>
      ) : error ? (
        <p className={styles.empty}>{error}</p>
      ) : total === 0 ? (
        <p className={styles.empty}>No issues yet.</p>
      ) : (
        <div className={styles.body}>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width={110} height={110}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="priority"
                  innerRadius={32}
                  outerRadius={50}
                  paddingAngle={data.filter((entry) => entry.value > 0).length > 1 ? 3 : 0}
                  stroke="none"
                  isAnimationActive={false}
                >
                  {data.map((entry) => (
                    <Cell key={entry.priority} fill={`var(${PRIORITY_COLOR_VARS[entry.priority]})`} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, _name, item) => [
                    value,
                    PRIORITY_LABELS[(item.payload as { priority: Priority }).priority],
                  ]}
                  contentStyle={{
                    backgroundColor: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-xs)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <ul className={styles.legend}>
            {PRIORITY_ORDER.map((priority) => (
              <li key={priority} className={styles.legendItem}>
                <span className={styles.dot} style={{ backgroundColor: `var(${PRIORITY_COLOR_VARS[priority]})` }} aria-hidden="true" />
                <span className={styles.legendLabel}>{PRIORITY_LABELS[priority]}</span>
                <span className={styles.legendCount}>{counts?.[priority] ?? 0}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  )
}
