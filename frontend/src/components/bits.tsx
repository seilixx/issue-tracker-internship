import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ArrowDown01, ArrowUp10, CircleDot, CheckCircle2, Loader, SignalHigh, SignalLow, SignalMedium, AlertOctagon, FileText, FileImage, FileArchive, File as FileIcon, Inbox } from 'lucide-react'
import { cn, } from '@/lib/utils'
import { initials } from '@/lib/helpers'
import type { IssueStatus, Priority, ProjectCategory, Role, User } from '@/types'

/* ---------------- Ooredoo logo ---------------- */
export function OoredooMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-label="Ooredoo">
      <circle cx="20" cy="20" r="20" fill="#E60012" />
      <circle cx="20" cy="20" r="9.5" stroke="#fff" strokeWidth="4.4" fill="none" />
    </svg>
  )
}

export function LogoLockup({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <OoredooMark />
      {!collapsed && (
        <div className="min-w-0 leading-tight">
          <div className="text-[15px] font-bold tracking-tight text-neutral-900">ooredoo</div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">Issue Tracker</div>
        </div>
      )}
    </div>
  )
}

/* ---------------- Badges ---------------- */
const statusStyle: Record<IssueStatus, string> = {
  OPEN: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  IN_PROGRESS: 'bg-amber-50 text-amber-700 ring-amber-600/25',
  DONE: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
}
const statusIcon: Record<IssueStatus, React.ReactNode> = {
  OPEN: <CircleDot className="size-3" />,
  IN_PROGRESS: <Loader className="size-3" />,
  DONE: <CheckCircle2 className="size-3" />,
}
export function StatusBadge({ status, className }: { status: IssueStatus; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset', statusStyle[status], className)}>
      {statusIcon[status]}
      {status.replace('_', ' ')}
    </span>
  )
}

const priorityStyle: Record<Priority, string> = {
  LOW: 'bg-neutral-100 text-neutral-600 ring-neutral-500/20',
  MEDIUM: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  HIGH: 'bg-orange-50 text-orange-700 ring-orange-600/25',
  CRITICAL: 'bg-red-50 text-[#B0000E] ring-[#E60012]/30',
}
const priorityIcon: Record<Priority, React.ReactNode> = {
  LOW: <SignalLow className="size-3" />,
  MEDIUM: <SignalMedium className="size-3" />,
  HIGH: <SignalHigh className="size-3" />,
  CRITICAL: <AlertOctagon className="size-3" />,
}
export function PriorityBadge({ priority, className }: { priority: Priority; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset', priorityStyle[priority], className)}>
      {priorityIcon[priority]}
      {priority}
    </span>
  )
}

const roleStyle: Record<Role, string> = {
  ADMIN: 'bg-[#E60012]/10 text-[#B0000E] ring-[#E60012]/25',
  MANAGER: 'bg-violet-50 text-violet-700 ring-violet-600/20',
  USER: 'bg-neutral-100 text-neutral-600 ring-neutral-500/20',
}
export function RoleBadge({ role, className }: { role: Role; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset', roleStyle[role], className)}>
      {role}
    </span>
  )
}

const categoryStyle: Record<ProjectCategory, string> = {
  SOFTWARE: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
  SUPPORT: 'bg-teal-50 text-teal-700 ring-teal-600/20',
  INTERNAL: 'bg-stone-100 text-stone-600 ring-stone-500/20',
}
export function CategoryBadge({ category, className }: { category: ProjectCategory; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset', categoryStyle[category], className)}>
      {category}
    </span>
  )
}

/* ---------------- Avatars ---------------- */
const palette = ['bg-red-100 text-[#B0000E]', 'bg-blue-100 text-blue-700', 'bg-emerald-100 text-emerald-700', 'bg-violet-100 text-violet-700', 'bg-amber-100 text-amber-800', 'bg-cyan-100 text-cyan-700', 'bg-pink-100 text-pink-700', 'bg-lime-100 text-lime-700']
function colorFor(uuid: string) {
  let h = 0
  for (const ch of uuid) h = (h * 31 + ch.charCodeAt(0)) % 997
  return palette[h % palette.length]
}

export function UserAvatar({ user, size = 'md', className }: { user: User; size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; className?: string }) {
  const sz = { xs: 'size-5 text-[9px]', sm: 'size-7 text-[11px]', md: 'size-8 text-xs', lg: 'size-12 text-sm', xl: 'size-20 text-2xl' }[size]
  return (
    <Avatar className={cn(sz, 'ring-1 ring-black/5', className)}>
      {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.username} />}
      <AvatarFallback className={cn('font-semibold', colorFor(user.uuid))}>{initials(user)}</AvatarFallback>
    </Avatar>
  )
}

export function AvatarGroup({ users, max = 3 }: { users: User[]; max?: number }) {
  const shown = users.slice(0, max)
  const rest = users.length - shown.length
  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex -space-x-1.5">
        {shown.map((u) => (
          <Tooltip key={u.uuid}>
            <TooltipTrigger asChild>
              <span className="inline-block rounded-full ring-2 ring-white"><UserAvatar user={u} size="xs" /></span>
            </TooltipTrigger>
            <TooltipContent>{u.firstName} {u.lastName} · @{u.username}</TooltipContent>
          </Tooltip>
        ))}
        {rest > 0 && (
          <span className="inline-flex size-5 items-center justify-center rounded-full bg-neutral-200 text-[9px] font-semibold text-neutral-600 ring-2 ring-white">+{rest}</span>
        )}
      </div>
    </TooltipProvider>
  )
}

/* ---------------- File icon ---------------- */
export function FileTypeIcon({ contentType, className }: { contentType: string; className?: string }) {
  const cls = cn('size-4', className)
  if (contentType.startsWith('image/')) return <FileImage className={cn(cls, 'text-violet-500')} />
  if (contentType.includes('zip') || contentType.includes('compressed')) return <FileArchive className={cn(cls, 'text-amber-600')} />
  if (contentType.includes('pdf') || contentType.startsWith('text/') || contentType.includes('markdown')) return <FileText className={cn(cls, 'text-blue-600')} />
  return <FileIcon className={cn(cls, 'text-neutral-500')} />
}

/* ---------------- Empty state ---------------- */
export function EmptyState({ title, hint, action }: { title: string; hint?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-neutral-200 bg-white/60 px-6 py-12 text-center">
      <div className="flex size-10 items-center justify-center rounded-full bg-neutral-100"><Inbox className="size-5 text-neutral-400" /></div>
      <p className="text-sm font-semibold text-neutral-700">{title}</p>
      {hint && <p className="max-w-sm text-xs text-neutral-500">{hint}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

export function SortDirIcon({ dir, className }: { dir: 'asc' | 'desc'; className?: string }) {
  return dir === 'asc' ? <ArrowUp10 className={cn('size-4', className)} /> : <ArrowDown01 className={cn('size-4', className)} />
}
