import { useState } from 'react'
import { Eye, Search, ShieldAlert } from 'lucide-react'
import { useStore } from '@/store/AppStore'
import { AppShell } from '@/components/AppShell'
import { EmptyState, RoleBadge, UserAvatar } from '@/components/bits'
import { isAdmin } from '@/lib/permissions'
import { ROLE_ORDER } from '@/lib/helpers'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import type { Role, User } from '@/types'

export function AdminUsersPage() {
  const s = useStore()
  const me = s.currentUser!
  const [q, setQ] = useState('')
  const [pending, setPending] = useState<{ user: User; role: Role } | null>(null)

  if (!isAdmin(me)) {
    return (
      <AppShell title="User Management" breadcrumb="Admin">
        <div className="mx-auto max-w-[1100px] px-4 py-5 lg:px-6">
          <EmptyState
            title="Restricted area"
            hint="User management is only available to administrators."
            action={<Button size="sm" variant="outline" onClick={() => s.navigate({ name: 'dashboard' })}>Back to Dashboard</Button>}
          />
        </div>
      </AppShell>
    )
  }

  const query = q.trim().toLowerCase()
  const users = s.users.filter((u) => !query || `${u.firstName} ${u.lastName}`.toLowerCase().includes(query) || u.username.toLowerCase().includes(query))

  return (
    <AppShell title="User Management" breadcrumb="Admin / User Management">
      <div className="mx-auto max-w-[1100px] space-y-4 px-4 py-5 lg:px-6">
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800">
          <ShieldAlert className="mt-0.5 size-4 shrink-0 text-amber-500" />
          Role changes take effect immediately for all sessions. New registrations always start with the USER role.
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search users…"
            className="h-9 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 text-sm shadow-xs outline-none focus:border-[#E60012]/50 focus:ring-2 focus:ring-[#E60012]/15"
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xs">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-50/80 hover:bg-neutral-50/80">
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider">User</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Username</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Role</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Bio</TableHead>
                <TableHead className="text-right text-[11px] font-semibold uppercase tracking-wider">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => {
                const isSelf = u.uuid === me.uuid
                return (
                  <TableRow key={u.uuid}>
                    <TableCell>
                      <span className="flex items-center gap-2.5">
                        <UserAvatar user={u} size="sm" />
                        <span className="text-[13px] font-semibold text-neutral-800">{u.firstName} {u.lastName}{isSelf && <span className="ml-1 text-[10px] font-medium text-neutral-400">(you)</span>}</span>
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-neutral-500">@{u.username}</TableCell>
                    <TableCell>
                      {isSelf ? (
                        <RoleBadge role={u.role} />
                      ) : (
                        <Select value={u.role} onValueChange={(v) => setPending({ user: u, role: v as Role })}>
                          <SelectTrigger className="h-7 w-32 bg-white text-xs shadow-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {ROLE_ORDER.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>
                    <TableCell><span className="line-clamp-1 max-w-56 text-xs text-neutral-500">{u.bio || '—'}</span></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-xs" onClick={() => s.navigate(isSelf ? { name: 'profile' } : { name: 'user', uuid: u.uuid })}>
                        <Eye className="size-3.5" /> View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
              {users.length === 0 && (
                <TableRow><TableCell colSpan={5} className="py-10 text-center text-xs text-neutral-400">No users match "{q}".</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <AlertDialog open={!!pending} onOpenChange={(v) => !v && setPending(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change role for {pending?.user.firstName} {pending?.user.lastName}?</AlertDialogTitle>
            <AlertDialogDescription>
              This changes their access from <strong>{pending?.user.role}</strong> to <strong>{pending?.role}</strong>. They will immediately gain or lose the associated permissions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-[#E60012] hover:bg-[#B0000E]" onClick={() => { if (pending) s.changeUserRole(pending.user.uuid, pending.role); setPending(null) }}>
              Confirm Role Change
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppShell>
  )
}
