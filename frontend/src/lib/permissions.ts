import type { Comment, Issue, Project, User } from '@/types'

/** Single source of truth for role-based UI. Mirrors backend authorization. */

export const isAdmin = (u: User) => u.role === 'ADMIN'
export const isManager = (u: User) => u.role === 'MANAGER'
export const isStaff = (u: User) => u.role === 'ADMIN' || u.role === 'MANAGER'

// Issues
export function canEditIssue(u: User, i: Issue): boolean {
  if (i.status === 'DONE') return false // closed issues are locked
  return isStaff(u) || i.creatorUuid === u.uuid || i.assignedUuids.includes(u.uuid)
}

export function canChangeStatus(u: User, i: Issue): boolean {
  return isStaff(u) || i.creatorUuid === u.uuid || i.assignedUuids.includes(u.uuid)
}

export function canDeleteIssue(u: User): boolean {
  return isStaff(u)
}

// Comments
export function canEditComment(u: User, c: Comment): boolean {
  return isStaff(u) || c.authorUuid === u.uuid
}

export function canDeleteComment(u: User, c: Comment): boolean {
  return isStaff(u) || c.authorUuid === u.uuid
}

// Attachments
export function canUploadAttachment(u: User, i: Issue): boolean {
  return canEditIssue(u, i)
}

export function canDeleteAttachment(u: User, i: Issue, uploadedByUuid: string): boolean {
  if (i.status === 'DONE') return isStaff(u)
  return isStaff(u) || uploadedByUuid === u.uuid
}

// Projects
export function canCreateProject(u: User): boolean {
  return isStaff(u)
}

export function canEditProject(u: User, _p: Project): boolean {
  return isStaff(u)
}

export function canDeleteProject(u: User): boolean {
  return isAdmin(u)
}

export function canChangeProjectCategory(u: User): boolean {
  return isAdmin(u)
}

// Admin
export function canManageUsers(u: User): boolean {
  return isAdmin(u)
}
