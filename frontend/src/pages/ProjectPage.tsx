import { useState } from 'react'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useStore } from '@/store/AppStore'
import { AppShell, CreateIssueButton } from '@/components/AppShell'
import { IssueWorkspace } from '@/components/IssueWorkspace'
import { ProjectFormDialog } from '@/components/ProjectForm'
import { CategoryBadge, EmptyState, UserAvatar } from '@/components/bits'
import { canDeleteProject, canEditProject } from '@/lib/permissions'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { CATEGORY_LABEL } from '@/lib/helpers'

export function ProjectPage({ projectId, onCreateIssue }: { projectId: number; onCreateIssue: () => void }) {
  const s = useStore()
  const me = s.currentUser!
  const project = s.getProject(projectId)
  const [editOpen, setEditOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (!project) {
    return (
      <AppShell title="Project" breadcrumb="Projects">
        <div className="mx-auto max-w-[1400px] px-4 py-5 lg:px-6">
          <EmptyState title="Project not found" hint="It may have been deleted." action={<Button size="sm" variant="outline" onClick={() => s.navigate({ name: 'dashboard' })}>Back to Dashboard</Button>} />
        </div>
      </AppShell>
    )
  }

  const leader = s.getUser(project.leaderUuid)
  const openCount = s.issues.filter((i) => i.projectId === project.id && i.status === 'OPEN').length
  const progressCount = s.issues.filter((i) => i.projectId === project.id && i.status === 'IN_PROGRESS').length
  const doneCount = s.issues.filter((i) => i.projectId === project.id && i.status === 'DONE').length

  return (
    <AppShell
      title={project.title}
      breadcrumb={`Projects / ${CATEGORY_LABEL[project.category]}`}
      primaryAction={<CreateIssueButton onClick={onCreateIssue} />}
    >
      <div className="mx-auto max-w-[1400px] space-y-5 px-4 py-5 lg:px-6">
        {/* workspace header */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-lg font-bold tracking-tight text-neutral-900">{project.title}</h2>
                <CategoryBadge category={project.category} />
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">{project.description}</p>
              {leader && (
                <button onClick={() => s.navigate({ name: 'user', uuid: leader.uuid })} className="mt-3 flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-neutral-50">
                  <UserAvatar user={leader} size="xs" />
                  <span className="text-xs text-neutral-500">Led by <span className="font-semibold text-neutral-700">{leader.firstName} {leader.lastName}</span></span>
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="mr-2 hidden items-center gap-3 text-[11px] font-semibold text-neutral-500 sm:flex">
                <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-blue-500" />{openCount} open</span>
                <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-amber-500" />{progressCount} in progress</span>
                <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-emerald-500" />{doneCount} done</span>
              </div>
              {canEditProject(me, project) && (
                <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}><Pencil className="size-3.5" /> Edit Project</Button>
              )}
              {canDeleteProject(me) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon-sm"><MoreHorizontal className="size-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setEditOpen(true)}><Pencil className="size-4" /> Edit project</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-[#B0000E] focus:text-[#B0000E]" onClick={() => setConfirmDelete(true)}>
                      <Trash2 className="size-4" /> Delete project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>

        <IssueWorkspace scopeProjectId={project.id} onCreateIssue={onCreateIssue} />
      </div>

      <ProjectFormDialog open={editOpen} onClose={() => setEditOpen(false)} project={project} />

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{project.title}"?</AlertDialogTitle>
            <AlertDialogDescription>This permanently deletes the project and its {openCount + progressCount + doneCount} issues, including all comments and attachments. This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-[#E60012] hover:bg-[#B0000E]" onClick={() => s.deleteProject(project.id)}>Delete Project</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppShell>
  )
}
