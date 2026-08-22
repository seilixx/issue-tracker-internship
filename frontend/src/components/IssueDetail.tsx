import React, { useMemo, useRef, useState } from 'react'
import {
  CalendarDays, CheckCircle2, Download, Lock, MessageSquare, Paperclip, Pencil, Reply,
  Trash2, Upload, X,
} from 'lucide-react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Spinner } from '@/components/ui/spinner'
import { useStore } from '@/store/AppStore'
import { AvatarGroup, CategoryBadge, FileTypeIcon, PriorityBadge, StatusBadge, UserAvatar } from '@/components/bits'
import { formatBytes, formatDate, STATUS_LABEL, STATUS_ORDER, timeAgo } from '@/lib/helpers'
import { canChangeStatus, canDeleteAttachment, canDeleteComment, canDeleteIssue, canEditComment, canEditIssue, canUploadAttachment } from '@/lib/permissions'
import { cn } from '@/lib/utils'
import type { Comment, Issue, IssueStatus } from '@/types'

/* ---------------- Comments ---------------- */
function CommentItem({ c, depth, issueId }: { c: Comment; depth: number; issueId: number }) {
  const s = useStore()
  const author = s.getUser(c.authorUuid)
  const [replying, setReplying] = useState(false)
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const me = s.currentUser!

  const submit = async (fn: () => Promise<void>) => {
    setBusy(true)
    try { await fn(); setReplying(false); setEditing(false); setText('') } finally { setBusy(false) }
  }

  return (
    <div className={cn(depth > 0 && 'ml-6 border-l-2 border-neutral-100 pl-4')}>
      <div className="flex items-start gap-2.5">
        {author ? <UserAvatar user={author} size="sm" /> : <div className="size-7 rounded-full bg-neutral-200" />}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <button className="text-[13px] font-semibold text-neutral-800 hover:underline" onClick={() => author && s.navigate({ name: 'user', uuid: author.uuid })}>
              {author ? `${author.firstName} ${author.lastName}` : `@${c.authorUserName}`}
            </button>
            <span className="text-[11px] text-neutral-400">{timeAgo(c.createdAt)}</span>
          </div>
          {c.deleted ? (
            <p className="mt-1 rounded-md bg-neutral-50 px-2.5 py-1.5 text-[13px] italic text-neutral-400">[comment deleted]</p>
          ) : editing ? (
            <div className="mt-1.5 space-y-2">
              <Textarea rows={3} value={text} onChange={(e) => setText(e.target.value)} autoFocus />
              <div className="flex gap-2">
                <Button size="sm" disabled={busy || !text.trim()} onClick={() => submit(() => s.editComment(c.id, text.trim()))}>
                  {busy && <Spinner className="size-3.5" />} Save
                </Button>
                <Button size="sm" variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <>
              {c.title && <p className="mt-0.5 text-[13px] font-semibold text-neutral-700">{c.title}</p>}
              <p className="mt-0.5 whitespace-pre-wrap text-[13px] leading-relaxed text-neutral-600">{c.content}</p>
              <div className="mt-1 flex items-center gap-1">
                {depth === 0 && (
                  <button onClick={() => { setReplying(true); setText('') }} className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-medium text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700">
                    <Reply className="size-3" /> Reply
                  </button>
                )}
                {canEditComment(me, c) && (
                  <button onClick={() => { setEditing(true); setText(c.content) }} className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-medium text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700">
                    <Pencil className="size-3" /> Edit
                  </button>
                )}
                {canDeleteComment(me, c) && (
                  <button onClick={() => s.deleteComment(c.id)} className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-medium text-neutral-400 hover:bg-red-50 hover:text-[#B0000E]">
                    <Trash2 className="size-3" /> Delete
                  </button>
                )}
              </div>
            </>
          )}
          {replying && (
            <div className="mt-2 space-y-2">
              <Textarea rows={2} value={text} onChange={(e) => setText(e.target.value)} placeholder={`Reply to @${c.authorUserName}…`} autoFocus />
              <div className="flex gap-2">
                <Button size="sm" disabled={busy || !text.trim()} onClick={() => submit(() => s.addComment(issueId, text.trim(), undefined, c.id))}>
                  {busy && <Spinner className="size-3.5" />} Reply
                </Button>
                <Button size="sm" variant="outline" onClick={() => setReplying(false)}>Cancel</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function CommentsSection({ issue }: { issue: Issue }) {
  const s = useStore()
  const list = s.comments.filter((c) => c.issueId === issue.id)
  const roots = list.filter((c) => !c.parentCommentId)
  const repliesOf = (id: number) => list.filter((c) => c.parentCommentId === id)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [busy, setBusy] = useState(false)

  return (
    <section>
      <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-900">
        <MessageSquare className="size-4 text-neutral-400" /> Comments
        <span className="rounded-md bg-neutral-100 px-1.5 py-0.5 text-[11px] font-semibold text-neutral-500">{list.filter((c) => !c.deleted).length}</span>
      </h3>
      <div className="mt-3 space-y-5">
        {roots.length === 0 && <p className="rounded-lg border border-dashed border-neutral-200 px-4 py-6 text-center text-xs text-neutral-400">No comments yet. Start the discussion below.</p>}
        {roots.map((c) => (
          <div key={c.id} className="space-y-4">
            <CommentItem c={c} depth={0} issueId={issue.id} />
            {repliesOf(c.id).map((r) => <CommentItem key={r.id} c={r} depth={1} issueId={issue.id} />)}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50/60 p-3">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Comment title (optional)" className="mb-2 bg-white text-[13px]" />
        <Textarea rows={3} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write a comment…" className="bg-white text-[13px]" />
        <div className="mt-2 flex justify-end">
          <Button size="sm" disabled={busy || !content.trim()} onClick={async () => {
            setBusy(true)
            try { await s.addComment(issue.id, content.trim(), title); setTitle(''); setContent('') } finally { setBusy(false) }
          }}>
            {busy && <Spinner className="size-3.5" />} Comment
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Attachments ---------------- */
function AttachmentsSection({ issue }: { issue: Issue }) {
  const s = useStore()
  const me = s.currentUser!
  const list = s.attachments.filter((a) => a.issueId === issue.id)
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const canUpload = canUploadAttachment(me, issue)

  const handleFile = async (f: File) => {
    setUploading(true); setError(null)
    const err = await s.uploadAttachment(issue.id, f)
    setUploading(false)
    if (err) setError(err)
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-900">
          <Paperclip className="size-4 text-neutral-400" /> Attachments
          <span className="rounded-md bg-neutral-100 px-1.5 py-0.5 text-[11px] font-semibold text-neutral-500">{list.length}</span>
        </h3>
        {canUpload && (
          <>
            <input ref={fileRef} type="file" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = '' }} />
            <Button size="sm" variant="outline" disabled={uploading} onClick={() => fileRef.current?.click()}>
              {uploading ? <Spinner className="size-3.5" /> : <Upload className="size-3.5" />}
              {uploading ? 'Uploading…' : 'Upload'}
            </Button>
          </>
        )}
      </div>
      {error && <p className="mt-2 rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-[#B0000E] ring-1 ring-inset ring-[#E60012]/20">{error}</p>}
      <div className="mt-3 space-y-1.5">
        {list.length === 0 && !uploading && (
          <p className="rounded-lg border border-dashed border-neutral-200 px-4 py-6 text-center text-xs text-neutral-400">
            {canUpload ? 'No attachments yet. Upload files up to 10 MB.' : 'No attachments.'}
          </p>
        )}
        {list.map((a) => {
          const uploader = s.getUser(a.uploadedByUuid)
          return (
            <div key={a.id} className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-3 py-2">
              <div className="flex size-9 items-center justify-center rounded-md bg-neutral-50 ring-1 ring-neutral-100"><FileTypeIcon contentType={a.contentType} /></div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-neutral-800">{a.fileName}</p>
                <p className="text-[11px] text-neutral-400">{formatBytes(a.sizeBytes)} · {uploader ? `@${uploader.username}` : 'unknown'} · {timeAgo(a.uploadedAt)}</p>
              </div>
              <TooltipProvider delayDuration={150}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="rounded-md p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700" onClick={() => s.downloadAttachment(a)}>
                      <Download className="size-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Download</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {canDeleteAttachment(me, issue, a.uploadedByUuid) && (
                <button className="rounded-md p-1.5 text-neutral-400 hover:bg-red-50 hover:text-[#B0000E]" onClick={() => s.deleteAttachment(a.id)}>
                  <Trash2 className="size-4" />
                </button>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ---------------- Main panel ---------------- */
export function IssueDetailPanel() {
  const s = useStore()
  const issue = s.issues.find((i) => i.id === s.openIssueId)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const me = s.currentUser

  const meta = useMemo(() => {
    if (!issue || !me) return null
    const project = s.getProject(issue.projectId)
    const creator = s.getUser(issue.creatorUuid)
    const closedBy = issue.closedByUuid ? s.getUser(issue.closedByUuid) : undefined
    const assignees = issue.assignedUuids.map((u) => s.getUser(u)).filter(Boolean) as NonNullable<ReturnType<typeof s.getUser>>[]
    return { project, creator, closedBy, assignees }
  }, [issue, me, s])

  if (!me) return null

  return (
    <Sheet open={s.openIssueId != null} onOpenChange={(v) => !v && s.openIssue(null)}>
      <SheetContent side="right" className="w-full gap-0 overflow-y-auto p-0 sm:max-w-2xl">
        {!issue || !meta ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-10 text-center">
            <p className="text-sm font-semibold text-neutral-700">Issue not found</p>
            <p className="text-xs text-neutral-400">It may have been deleted.</p>
            <Button size="sm" variant="outline" className="mt-2" onClick={() => s.openIssue(null)}>Close</Button>
          </div>
        ) : (
          <>
            {/* Sticky header */}
            <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-neutral-200 bg-white/95 px-5 py-3 backdrop-blur">
              <span className="font-mono text-xs font-semibold text-neutral-400">#{issue.id}</span>
              <StatusBadge status={issue.status} />
              <div className="ml-auto flex items-center gap-1.5">
                {canEditIssue(me, issue) && (
                  <Button size="sm" variant="outline" onClick={() => window.dispatchEvent(new CustomEvent('edit-issue', { detail: issue.id }))}>
                    <Pencil className="size-3.5" /> Edit
                  </Button>
                )}
                {canDeleteIssue(me) && (
                  <Button size="sm" variant="outline" className="text-[#B0000E] hover:bg-red-50" onClick={() => setConfirmDelete(true)}>
                    <Trash2 className="size-3.5" /> Delete
                  </Button>
                )}
                <Button size="icon-sm" variant="ghost" onClick={() => s.openIssue(null)} aria-label="Close"><X className="size-4" /></Button>
              </div>
            </div>

            <div className="space-y-6 px-5 py-5">
              {issue.status === 'DONE' && (
                <div className="flex items-start gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  <div>
                    <p className="text-[13px] font-semibold text-emerald-800">This issue is done</p>
                    <p className="text-xs text-emerald-700">
                      Closed {issue.closedAt ? timeAgo(issue.closedAt) : ''}{meta.closedBy ? ` by ${meta.closedBy.firstName} ${meta.closedBy.lastName}` : ''}. Content and attachments are locked; comments remain readable.
                    </p>
                  </div>
                </div>
              )}

              <div>
                <h2 className={cn('text-lg font-bold leading-snug text-neutral-900', issue.status === 'DONE' && 'text-neutral-500')}>{issue.title}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <PriorityBadge priority={issue.priority} />
                  {meta.project && (
                    <button onClick={() => s.navigate({ name: 'project', projectId: meta.project!.id })} className="flex items-center gap-1.5 rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-medium text-neutral-600 hover:bg-neutral-200">
                      {meta.project.title} <CategoryBadge category={meta.project.category} />
                    </button>
                  )}
                </div>
              </div>

              {/* Metadata grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-neutral-200 bg-neutral-50/60 p-4 sm:grid-cols-3">
                <Meta label="Status">
                  {canChangeStatus(me, issue) ? (
                    <Select value={issue.status} onValueChange={(v) => s.updateIssueStatus(issue.id, v as IssueStatus)}>
                      <SelectTrigger className="h-7 w-full bg-white text-xs shadow-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {STATUS_ORDER.map((st) => <SelectItem key={st} value={st}>{STATUS_LABEL[st]}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  ) : (
                    <TooltipProvider delayDuration={150}>
                      <Tooltip>
                        <TooltipTrigger asChild><span className="inline-flex items-center gap-1.5"><StatusBadge status={issue.status} /><Lock className="size-3 text-neutral-300" /></span></TooltipTrigger>
                        <TooltipContent>You don't have permission to change this status.</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </Meta>
                <Meta label="Creator">
                  <span className="flex items-center gap-1.5 text-xs text-neutral-700">
                    {meta.creator && <UserAvatar user={meta.creator} size="xs" />} @{meta.creator?.username ?? 'unknown'}
                  </span>
                </Meta>
                <Meta label="Assignees">
                  {meta.assignees.length ? <AvatarGroup users={meta.assignees} max={4} /> : <span className="text-xs text-neutral-400">Unassigned</span>}
                </Meta>
                <Meta label="Created"><MetaDate ts={issue.createdAt} /></Meta>
                <Meta label="Updated"><MetaDate ts={issue.updatedAt} /></Meta>
                {issue.closedAt && <Meta label="Closed"><MetaDate ts={issue.closedAt} /></Meta>}
              </div>

              <section>
                <h3 className="text-sm font-bold text-neutral-900">Description</h3>
                <p className="mt-2 whitespace-pre-wrap text-[13px] leading-relaxed text-neutral-600">{issue.description}</p>
              </section>

              <Separator />
              <AttachmentsSection issue={issue} />
              <Separator />
              <CommentsSection issue={issue} />
            </div>
          </>
        )}
      </SheetContent>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete issue #{issue?.id}?</AlertDialogTitle>
            <AlertDialogDescription>This permanently deletes the issue along with its comments and attachments. This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-[#E60012] hover:bg-[#B0000E]" onClick={() => issue && s.deleteIssue(issue.id)}>Delete Issue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sheet>
  )
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{label}</p>
      <div className="mt-1">{children}</div>
    </div>
  )
}

function MetaDate({ ts }: { ts: number }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-neutral-600">
      <CalendarDays className="size-3.5 text-neutral-400" /> {formatDate(ts)}
    </span>
  )
}
