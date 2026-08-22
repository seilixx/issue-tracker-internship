import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useStore } from '@/store/AppStore'
import { AvatarGroup, EmptyState, PriorityBadge, StatusBadge } from '@/components/bits'
import { formatDate } from '@/lib/helpers'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import type { Issue } from '@/types'

const PAGE_SIZE = 8

export function IssueTable({ issues, allIssues, onCreate }: { issues: Issue[]; allIssues: Issue[]; onCreate: () => void }) {
  const s = useStore()
  const [page, setPage] = useState(0)

  const pageCount = Math.max(1, Math.ceil(issues.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount - 1)
  const rows = useMemo(() => issues.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE), [issues, safePage])

  if (allIssues.length === 0) {
    return <EmptyState title="No issues found" hint="Create the first issue to get started." action={<Button size="sm" onClick={onCreate}><Plus className="size-4" /> Create Issue</Button>} />
  }
  if (issues.length === 0) {
    return <EmptyState title="No issues match the current filters" hint="Try adjusting or clearing your filters." action={<Button size="sm" variant="outline" onClick={s.clearFilters}>Clear Filters</Button>} />
  }

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50/80 hover:bg-neutral-50/80">
              <TableHead className="w-16 text-[11px] font-semibold uppercase tracking-wider">ID</TableHead>
              <TableHead className="min-w-56 text-[11px] font-semibold uppercase tracking-wider">Title</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Project</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Priority</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Status</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Creator</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Assignees</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Created</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((i) => {
              const project = s.getProject(i.projectId)
              const creator = s.getUser(i.creatorUuid)
              const assignees = i.assignedUuids.map((u) => s.getUser(u)).filter(Boolean) as NonNullable<ReturnType<typeof s.getUser>>[]
              return (
                <TableRow key={i.id} className="cursor-pointer" onClick={() => s.openIssue(i.id)}>
                  <TableCell className="font-mono text-xs text-neutral-400">#{i.id}</TableCell>
                  <TableCell>
                    <span className="line-clamp-1 text-[13px] font-medium text-neutral-900">{i.title}</span>
                  </TableCell>
                  <TableCell><span className="line-clamp-1 max-w-44 text-xs text-neutral-500">{project?.title ?? '—'}</span></TableCell>
                  <TableCell><PriorityBadge priority={i.priority} /></TableCell>
                  <TableCell><StatusBadge status={i.status} /></TableCell>
                  <TableCell><span className="text-xs text-neutral-500">{creator ? `@${creator.username}` : '—'}</span></TableCell>
                  <TableCell><AvatarGroup users={assignees} /></TableCell>
                  <TableCell className="whitespace-nowrap text-xs text-neutral-500">{formatDate(i.createdAt)}</TableCell>
                  <TableCell className="whitespace-nowrap text-xs text-neutral-500">{formatDate(i.updatedAt)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between border-t border-neutral-100 px-4 py-2.5">
        <p className="text-xs text-neutral-500">
          {issues.length} issue{issues.length === 1 ? '' : 's'} · page {safePage + 1} of {pageCount}
        </p>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon-sm" disabled={safePage === 0} onClick={() => setPage(safePage - 1)} aria-label="Previous page">
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="outline" size="icon-sm" disabled={safePage >= pageCount - 1} onClick={() => setPage(safePage + 1)} aria-label="Next page">
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
