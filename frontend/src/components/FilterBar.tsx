import { ArrowUpDown, LayoutGrid, RotateCcw, Table2, X } from 'lucide-react'
import { useStore } from '@/store/AppStore'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { SortDirIcon, UserAvatar } from '@/components/bits'
import { activeFilterCount } from '@/lib/issueQuery'
import { CATEGORY_ORDER, PRIORITY_LABEL, PRIORITY_ORDER, STATUS_LABEL, STATUS_ORDER, CATEGORY_LABEL } from '@/lib/helpers'
import type { SortField } from '@/types'

const sortOptions: { value: SortField; label: string }[] = [
  { value: 'updatedAt', label: 'Last updated' },
  { value: 'createdAt', label: 'Created date' },
  { value: 'status', label: 'Status' },
  { value: 'priority', label: 'Priority' },
]

export function FilterBar({ scopeProjectId }: { scopeProjectId?: number }) {
  const s = useStore()
  const count = activeFilterCount(s.filters, scopeProjectId)

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Board / Table switcher */}
      <div className="flex rounded-lg border border-neutral-200 bg-white p-0.5 shadow-xs">
        <button
          onClick={() => s.setViewMode('board')}
          className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${s.viewMode === 'board' ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:text-neutral-800'}`}
        >
          <LayoutGrid className="size-3.5" /> Board
        </button>
        <button
          onClick={() => s.setViewMode('table')}
          className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${s.viewMode === 'table' ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:text-neutral-800'}`}
        >
          <Table2 className="size-3.5" /> Table
        </button>
      </div>

      <div className="mx-1 hidden h-5 w-px bg-neutral-200 sm:block" />

      {scopeProjectId == null && (
        <Select value={s.filters.projectId == null ? 'all' : String(s.filters.projectId)} onValueChange={(v) => s.setFilters({ projectId: v === 'all' ? null : Number(v) })}>
          <SelectTrigger className="h-8 w-auto gap-1.5 bg-white text-xs shadow-xs"><SelectValue placeholder="All Projects" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            {CATEGORY_ORDER.map((cat) => (
              <div key={cat}>
                <div className="px-2 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">{CATEGORY_LABEL[cat]}</div>
                {s.projects.filter((p) => p.category === cat).map((p) => (
                  <SelectItem key={p.id} value={String(p.id)}>{p.title}</SelectItem>
                ))}
              </div>
            ))}
          </SelectContent>
        </Select>
      )}

      <Select value={s.filters.status ?? 'all'} onValueChange={(v) => s.setFilters({ status: v === 'all' ? null : (v as never) })}>
        <SelectTrigger className="h-8 w-auto gap-1.5 bg-white text-xs shadow-xs"><SelectValue placeholder="All Statuses" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {STATUS_ORDER.map((st) => <SelectItem key={st} value={st}>{STATUS_LABEL[st]}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={s.filters.priority ?? 'all'} onValueChange={(v) => s.setFilters({ priority: v === 'all' ? null : (v as never) })}>
        <SelectTrigger className="h-8 w-auto gap-1.5 bg-white text-xs shadow-xs"><SelectValue placeholder="All Priorities" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          {PRIORITY_ORDER.map((p) => <SelectItem key={p} value={p}>{PRIORITY_LABEL[p]}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={s.filters.assigneeUuid ?? 'all'} onValueChange={(v) => s.setFilters({ assigneeUuid: v === 'all' ? null : v })}>
        <SelectTrigger className="h-8 w-auto gap-1.5 bg-white text-xs shadow-xs"><SelectValue placeholder="Assignee" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any Assignee</SelectItem>
          {s.users.map((u) => (
            <SelectItem key={u.uuid} value={u.uuid}>
              <span className="flex items-center gap-2"><UserAvatar user={u} size="xs" /> {u.firstName} {u.lastName}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="mx-1 hidden h-5 w-px bg-neutral-200 sm:block" />

      <Select value={s.sortField} onValueChange={(v) => s.setSort(v as SortField, s.sortDir)}>
        <SelectTrigger className="h-8 w-auto gap-1.5 bg-white text-xs shadow-xs">
          <ArrowUpDown className="size-3.5 text-neutral-400" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
        </SelectContent>
      </Select>
      <Button variant="outline" size="icon-sm" className="bg-white shadow-xs" onClick={() => s.setSort(s.sortField, s.sortDir === 'asc' ? 'desc' : 'asc')} aria-label="Toggle sort direction">
        <SortDirIcon dir={s.sortDir} />
      </Button>

      {count > 0 && (
        <Button variant="ghost" size="sm" className="h-8 text-xs text-neutral-500" onClick={s.clearFilters}>
          <RotateCcw className="size-3.5" /> Clear filters
          <span className="ml-1 inline-flex size-4 items-center justify-center rounded-full bg-[#E60012] text-[10px] font-bold text-white">{count}</span>
        </Button>
      )}

      {count > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {s.filters.priority && (
            <button onClick={() => s.setFilters({ priority: null })} className="flex items-center gap-1 rounded-md bg-orange-50 px-2 py-1 text-[11px] font-semibold text-orange-700 ring-1 ring-inset ring-orange-600/20 hover:bg-orange-100">
              {PRIORITY_LABEL[s.filters.priority]} <X className="size-3" />
            </button>
          )}
          {s.filters.status && (
            <button onClick={() => s.setFilters({ status: null })} className="flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20 hover:bg-blue-100">
              {STATUS_LABEL[s.filters.status]} <X className="size-3" />
            </button>
          )}
          {s.filters.assigneeUuid && (
            <button onClick={() => s.setFilters({ assigneeUuid: null })} className="flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-semibold text-neutral-600 ring-1 ring-inset ring-neutral-500/20 hover:bg-neutral-200">
              @{s.getUser(s.filters.assigneeUuid)?.username} <X className="size-3" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
