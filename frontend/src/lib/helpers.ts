import type { IssueStatus, Priority, ProjectCategory, Role, User } from '@/types'

export function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 30) return `${d}d ago`
  const mo = Math.floor(d / 30)
  if (mo < 12) return `${mo}mo ago`
  return `${Math.floor(mo / 12)}y ago`
}

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function initials(u: Pick<User, 'firstName' | 'lastName'>): string {
  return `${u.firstName[0] ?? ''}${u.lastName[0] ?? ''}`.toUpperCase()
}

export const STATUS_ORDER: IssueStatus[] = ['OPEN', 'IN_PROGRESS', 'DONE']
export const PRIORITY_ORDER: Priority[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
export const CATEGORY_ORDER: ProjectCategory[] = ['SOFTWARE', 'SUPPORT', 'INTERNAL']
export const ROLE_ORDER: Role[] = ['ADMIN', 'MANAGER', 'USER']

export const STATUS_LABEL: Record<IssueStatus, string> = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
}

export const PRIORITY_LABEL: Record<Priority, string> = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical',
}

export const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  SOFTWARE: 'Software',
  SUPPORT: 'Support',
  INTERNAL: 'Internal',
}

export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))
