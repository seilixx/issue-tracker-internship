import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { useStore } from '@/store/AppStore'
import { canChangeProjectCategory } from '@/lib/permissions'
import { CATEGORY_LABEL, CATEGORY_ORDER } from '@/lib/helpers'
import type { ProjectCategory } from '@/types'

export function ProjectFormDialog({ open, onClose, project }: {
  open: boolean
  onClose: () => void
  project?: { id: number; title: string; description: string; category: ProjectCategory; leaderUuid: string } | null
}) {
  const s = useStore()
  const me = s.currentUser!
  const editing = !!project
  const [title, setTitle] = useState(project?.title ?? '')
  const [description, setDescription] = useState(project?.description ?? '')
  const [category, setCategory] = useState<ProjectCategory>(project?.category ?? 'SOFTWARE')
  const [leaderUuid, setLeaderUuid] = useState(project?.leaderUuid ?? me.uuid)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // reset when opened for a different target
  const [wasOpen, setWasOpen] = useState(false)
  if (open && !wasOpen) {
    setTitle(project?.title ?? ''); setDescription(project?.description ?? '')
    setCategory(project?.category ?? 'SOFTWARE'); setLeaderUuid(project?.leaderUuid ?? me.uuid)
    setError(null); setWasOpen(true)
  } else if (!open && wasOpen) setWasOpen(false)

  const submit = async () => {
    if (title.trim().length < 3) { setError('Project title must be at least 3 characters.'); return }
    setSaving(true)
    try {
      if (editing && project) {
        await s.updateProject(project.id, {
          title: title.trim(), description: description.trim(), leaderUuid,
          ...(canChangeProjectCategory(me) ? { category } : {}),
        })
      } else {
        await s.createProject({ title: title.trim(), description: description.trim(), category, leaderUuid })
      }
      onClose()
    } finally { setSaving(false) }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editing ? 'Edit Project' : 'Create Project'}</DialogTitle>
          <DialogDescription>{editing ? 'Update project details.' : 'Projects group related issues into a workspace.'}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Title <span className="text-[#E60012]">*</span></Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Customer Care Portal" />
            {error && <p className="text-xs text-[#B0000E]">{error}</p>}
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is this project about?" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as ProjectCategory)} disabled={editing && !canChangeProjectCategory(me)}>
                <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORY_ORDER.map((c) => <SelectItem key={c} value={c}>{CATEGORY_LABEL[c]}</SelectItem>)}
                </SelectContent>
              </Select>
              {editing && !canChangeProjectCategory(me) && <p className="text-[11px] text-neutral-400">Only admins can change the category.</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Project Lead</Label>
              <Select value={leaderUuid} onValueChange={setLeaderUuid}>
                <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {s.users.map((u) => <SelectItem key={u.uuid} value={u.uuid}>{u.firstName} {u.lastName}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={saving}>Cancel</Button>
          <Button onClick={submit} disabled={saving}>{saving && <Spinner className="size-4" />}{editing ? 'Save Changes' : 'Create Project'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
