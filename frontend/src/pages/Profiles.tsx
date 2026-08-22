import { useRef, useState } from 'react'
import { Camera, Pencil } from 'lucide-react'
import { toast } from 'sonner'
import { useStore } from '@/store/AppStore'
import { AppShell } from '@/components/AppShell'
import { EmptyState, PriorityBadge, RoleBadge, StatusBadge, UserAvatar } from '@/components/bits'
import { timeAgo } from '@/lib/helpers'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Spinner } from '@/components/ui/spinner'
import type { Issue, User } from '@/types'

function IssueList({ title, issues, empty }: { title: string; issues: Issue[]; empty: string }) {
  const s = useStore()
  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-xs">
      <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
        <h3 className="text-sm font-bold text-neutral-900">{title}</h3>
        <span className="rounded-md bg-neutral-100 px-1.5 py-0.5 text-[11px] font-semibold text-neutral-500">{issues.length}</span>
      </div>
      {issues.length === 0 ? (
        <p className="px-4 py-8 text-center text-xs text-neutral-400">{empty}</p>
      ) : (
        <div className="divide-y divide-neutral-50">
          {issues.map((i) => {
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
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function ProfileHero({ user, isSelf, onEdit }: { user: User; isSelf: boolean; onEdit?: () => void }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-xs">
      <div className="flex flex-wrap items-center gap-5">
        <UserAvatar user={user} size="xl" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-xl font-bold tracking-tight text-neutral-900">{user.firstName} {user.lastName}</h2>
            <RoleBadge role={user.role} />
          </div>
          <p className="mt-0.5 text-sm text-neutral-400">@{user.username}</p>
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-neutral-600">{user.bio || 'No bio yet.'}</p>
        </div>
        {isSelf && onEdit && (
          <Button variant="outline" onClick={onEdit}><Pencil className="size-3.5" /> Edit Profile</Button>
        )}
      </div>
    </div>
  )
}

export function MyProfilePage() {
  const s = useStore()
  const me = s.currentUser!
  const [editOpen, setEditOpen] = useState(false)
  const assigned = s.issues.filter((i) => i.assignedUuids.includes(me.uuid) && i.status !== 'DONE')
  const closed = s.issues.filter((i) => i.closedByUuid === me.uuid)

  return (
    <AppShell title="My Profile" breadcrumb="Settings / My Profile">
      <div className="mx-auto max-w-[1100px] space-y-5 px-4 py-5 lg:px-6">
        <ProfileHero user={me} isSelf onEdit={() => setEditOpen(true)} />
        <IssueList title="Assigned to me" issues={assigned} empty="No issues currently assigned to you." />
        <IssueList title="Closed by me" issues={closed} empty="You haven't closed any issues yet." />
      </div>
      <EditProfileDialog open={editOpen} onClose={() => setEditOpen(false)} />
    </AppShell>
  )
}

export function UserProfilePage({ uuid }: { uuid: string }) {
  const s = useStore()
  const user = s.getUser(uuid)
  if (!user) {
    return (
      <AppShell title="User Profile" breadcrumb="Team / Profile">
        <div className="mx-auto max-w-[1100px] px-4 py-5 lg:px-6">
          <EmptyState title="User not found" hint="This profile may no longer exist." action={<Button size="sm" variant="outline" onClick={() => s.navigate({ name: 'team' })}>Back to Team</Button>} />
        </div>
      </AppShell>
    )
  }
  const assigned = s.issues.filter((i) => i.assignedUuids.includes(uuid) && i.status !== 'DONE')
  const closed = s.issues.filter((i) => i.closedByUuid === uuid)

  return (
    <AppShell title={`${user.firstName} ${user.lastName}`} breadcrumb="Team / Profile">
      <div className="mx-auto max-w-[1100px] space-y-5 px-4 py-5 lg:px-6">
        <ProfileHero user={user} isSelf={false} />
        <IssueList title="Assigned issues" issues={assigned} empty={`No issues currently assigned to ${user.firstName}.`} />
        <IssueList title="Closed issues" issues={closed} empty={`${user.firstName} hasn't closed any issues yet.`} />
      </div>
    </AppShell>
  )
}

export function EditProfileDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const s = useStore()
  const me = s.currentUser!
  const [firstName, setFirstName] = useState(me.firstName)
  const [lastName, setLastName] = useState(me.lastName)
  const [bio, setBio] = useState(me.bio)
  const [saving, setSaving] = useState(false)
  const [avatarBusy, setAvatarBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const [wasOpen, setWasOpen] = useState(false)
  if (open && !wasOpen) { setFirstName(me.firstName); setLastName(me.lastName); setBio(me.bio); setError(null); setWasOpen(true) }
  else if (!open && wasOpen) setWasOpen(false)

  const handleAvatar = async (f: File) => {
    setAvatarBusy(true)
    const err = await s.uploadAvatar(f)
    setAvatarBusy(false)
    if (err) toast.error(err)
  }

  const submit = async () => {
    if (!firstName.trim() || !lastName.trim()) { setError('First and last name are required.'); return }
    setSaving(true)
    await s.updateProfile({ firstName: firstName.trim(), lastName: lastName.trim(), bio: bio.trim() })
    setSaving(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update how you appear to your team across the tracker.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <UserAvatar user={me} size="xl" />
              <button
                onClick={() => fileRef.current?.click()}
                disabled={avatarBusy}
                className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-[#E60012] text-white shadow-md transition hover:bg-[#B0000E] disabled:opacity-60"
                aria-label="Change avatar"
              >
                {avatarBusy ? <Spinner className="size-3.5 text-white" /> : <Camera className="size-3.5" />}
              </button>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) handleAvatar(f); e.target.value = '' }} />
            </div>
            <div className="text-xs text-neutral-500">
              <p className="font-semibold text-neutral-700">Profile photo</p>
              <p className="mt-0.5">PNG or JPG, up to 3 MB.</p>
            </div>
          </div>
          {error && <p className="rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-[#B0000E]">{error}</p>}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>First name <span className="text-[#E60012]">*</span></Label>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Last name <span className="text-[#E60012]">*</span></Label>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Bio</Label>
            <Textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Your team and responsibilities…" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={saving}>Cancel</Button>
          <Button onClick={submit} disabled={saving}>{saving && <Spinner className="size-4" />} Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
