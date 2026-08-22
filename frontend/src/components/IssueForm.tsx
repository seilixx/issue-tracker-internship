import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { AssigneePicker } from '@/components/AssigneePicker'
import { useStore } from '@/store/AppStore'
import { PRIORITY_LABEL, PRIORITY_ORDER } from '@/lib/helpers'
import type { Issue, Priority } from '@/types'

export function IssueForm({ open, onClose, issue, defaultProjectId }: {
  open: boolean
  onClose: () => void
  issue?: Issue | null
  defaultProjectId?: number
}) {
  const s = useStore()
  const editing = !!issue
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [projectId, setProjectId] = useState<number>(defaultProjectId ?? s.projects[0]?.id ?? 0)
  const [priority, setPriority] = useState<Priority>('MEDIUM')
  const [assigned, setAssigned] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (open) {
      setTitle(issue?.title ?? '')
      setDescription(issue?.description ?? '')
      setProjectId(issue?.projectId ?? defaultProjectId ?? s.projects[0]?.id ?? 0)
      setPriority(issue?.priority ?? 'MEDIUM')
      setAssigned(issue?.assignedUuids ?? [])
      setErrors({})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, issue])

  const validate = () => {
    const e: Record<string, string> = {}
    if (title.trim().length < 4) e.title = 'Title must be at least 4 characters.'
    if (!description.trim()) e.description = 'Please describe the issue.'
    if (!projectId) e.project = 'Select a project.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async () => {
    if (!validate()) return
    setSaving(true)
    try {
      if (editing && issue) {
        await s.updateIssue(issue.id, { title: title.trim(), description: description.trim(), projectId, priority, assignedUuids: assigned })
      } else {
        await s.createIssue({ title: title.trim(), description: description.trim(), projectId, priority, assignedUuids: assigned })
      }
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{editing ? `Edit Issue #${issue!.id}` : 'Create Issue'}</DialogTitle>
          <DialogDescription>{editing ? 'Update the issue details below.' : 'Report a new issue. It will be created with status OPEN.'}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="i-title">Title <span className="text-[#E60012]">*</span></Label>
            <Input id="i-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Base station connectivity drop in Tunis" />
            {errors.title && <p className="text-xs text-[#B0000E]">{errors.title}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="i-desc">Description <span className="text-[#E60012]">*</span></Label>
            <Textarea id="i-desc" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is happening, impact, and steps to reproduce…" />
            {errors.description && <p className="text-xs text-[#B0000E]">{errors.description}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Project <span className="text-[#E60012]">*</span></Label>
              <Select value={projectId ? String(projectId) : ''} onValueChange={(v) => setProjectId(Number(v))}>
                <SelectTrigger className="bg-white"><SelectValue placeholder="Select project" /></SelectTrigger>
                <SelectContent>
                  {s.projects.map((p) => <SelectItem key={p.id} value={String(p.id)}>{p.title}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.project && <p className="text-xs text-[#B0000E]">{errors.project}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Priority <span className="text-[#E60012]">*</span></Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PRIORITY_ORDER.map((p) => <SelectItem key={p} value={p}>{PRIORITY_LABEL[p]}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Assignees</Label>
            <AssigneePicker value={assigned} onChange={setAssigned} />
            <p className="text-[11px] text-neutral-400">Multiple team members can be assigned to one issue.</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={saving}>Cancel</Button>
          <Button onClick={submit} disabled={saving}>
            {saving && <Spinner className="size-4" />}
            {editing ? 'Save Changes' : 'Create Issue'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
