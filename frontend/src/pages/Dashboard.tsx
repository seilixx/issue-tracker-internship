import { AlertOctagon, ArrowRight, CheckCircle2, CircleDot, Loader } from 'lucide-react'
import { useStore } from '@/store/AppStore'
import { AppShell, CreateIssueButton } from '@/components/AppShell'
import { IssueWorkspace } from '@/components/IssueWorkspace'
import { PriorityBadge, StatusBadge, UserAvatar } from '@/components/bits'
import { timeAgo } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import type { IssueStatus } from '@/types'

function KpiCard({ label, value, icon, tone, onClick, active }: {
  label: string; value: number; icon: React.ReactNode; tone: string; onClick?: () => void; active?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex items-center gap-3.5 rounded-xl border bg-white p-4 text-left shadow-xs transition-all hover:shadow-md',
        active ? 'border-[#E60012]/40 ring-2 ring-[#E60012]/15' : 'border-neutral-200 hover:border-neutral-300',
      )}
    >
      <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-lg', tone)}>{icon}</span>
      <span>
        <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400">{label}</span>
        <span className="block text-2xl font-bold tabular-nums tracking-tight text-neutral-900">{value}</span>
      </span>
    </button>
  )
}

export function DashboardPage({ onCreateIssue }: { onCreateIssue: () => void }) {
  const s = useStore()
  const open = s.issues.filter((i) => i.status === 'OPEN').length
  const inProgress = s.issues.filter((i) => i.status === 'IN_PROGRESS').length
  const done = s.issues.filter((i) => i.status === 'DONE').length
  const critical = s.issues.filter((i) => i.priority === 'CRITICAL' && i.status !== 'DONE').length

  const attention = s.issues
    .filter((i) => i.status !== 'DONE' && (i.priority === 'CRITICAL' || i.priority === 'HIGH'))
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 5)

  const filterBy = (status?: IssueStatus, priority?: 'CRITICAL') => {
    s.clearFilters()
    if (status) s.setFilters({ status })
    if (priority) s.setFilters({ priority })
  }

  return (
    <AppShell title="Dashboard" breadcrumb="Main / Dashboard" primaryAction={<CreateIssueButton onClick={onCreateIssue} />}>
      <div className="mx-auto max-w-[1400px] space-y-5 px-4 py-5 lg:px-6">
        {/* KPI row */}
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          <KpiCard label="Open Issues" value={open} icon={<CircleDot className="size-5" />} tone="bg-blue-50 text-blue-600" active={s.filters.status === 'OPEN'} onClick={() => filterBy('OPEN')} />
          <KpiCard label="In Progress" value={inProgress} icon={<Loader className="size-5" />} tone="bg-amber-50 text-amber-600" active={s.filters.status === 'IN_PROGRESS'} onClick={() => filterBy('IN_PROGRESS')} />
          <KpiCard label="Done" value={done} icon={<CheckCircle2 className="size-5" />} tone="bg-emerald-50 text-emerald-600" active={s.filters.status === 'DONE'} onClick={() => filterBy('DONE')} />
          <KpiCard label="Critical" value={critical} icon={<AlertOctagon className="size-5" />} tone="bg-red-50 text-[#E60012]" active={s.filters.priority === 'CRITICAL'} onClick={() => filterBy(undefined, 'CRITICAL')} />
        </div>

        {/* Needs attention */}
        <div className="rounded-xl border border-neutral-200 bg-white shadow-xs">
          <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
            <h2 className="text-sm font-bold text-neutral-900">Needs attention</h2>
            <button className="flex items-center gap-1 text-xs font-semibold text-[#E60012] hover:underline" onClick={() => { filterBy(undefined, 'CRITICAL') }}>
              View critical <ArrowRight className="size-3.5" />
            </button>
          </div>
          <div className="divide-y divide-neutral-50">
            {attention.length === 0 && <p className="px-4 py-6 text-center text-xs text-neutral-400">Nothing urgent right now. Great job.</p>}
            {attention.map((i) => {
              const project = s.getProject(i.projectId)
              return (
                <button key={i.id} onClick={() => s.openIssue(i.id)} className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-neutral-50">
                  <span className="font-mono text-[11px] text-neutral-400">#{i.id}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium text-neutral-800">{i.title}</span>
                    <span className="block truncate text-[11px] text-neutral-400">{project?.title}</span>
                  </span>
                  <PriorityBadge priority={i.priority} />
                  <StatusBadge status={i.status} />
                  <span className="hidden w-16 text-right text-[11px] text-neutral-400 sm:block">{timeAgo(i.updatedAt)}</span>
                  {(() => {
                    const creator = s.getUser(i.creatorUuid)
                    return creator ? <UserAvatar user={creator} size="xs" /> : null
                  })()}
                </button>
              )
            })}
          </div>
        </div>

        {/* Issue workspace */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-neutral-900">Issue Workspace</h2>
            <p className="text-xs text-neutral-400">{s.issues.length} issues total</p>
          </div>
          <IssueWorkspace onCreateIssue={onCreateIssue} />
        </div>
      </div>
    </AppShell>
  )
}
