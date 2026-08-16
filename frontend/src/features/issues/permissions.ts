import type { Project } from '@/features/projects/types'
import type { UserSummary } from '@/features/users/types'
import type { AttachmentItem, Issue } from './types'

// Mirrors the backend's IssueSecurity/CommentSecurity/AttachmentSecurity rules
// (feature 9) exactly, computed client-side so the UI can disable/hide
// actions proactively. The backend is still the source of truth — every
// mutating call here also handles a 403 from the server gracefully, since
// there's no real auth yet (see features/users/currentUser.ts) and this is
// necessarily a prediction, not a guarantee.
export interface IssuePermissions {
  canComment: boolean
  canChangeStatus: boolean
  canEditFields: boolean
  canAttachFiles: boolean
}

function isElevated(user: UserSummary): boolean {
  return user.role === 'ADMIN' || user.role === 'MANAGER'
}

function isCreatorOrAssignee(issue: Issue, user: UserSummary): boolean {
  return issue.creatorUuid === user.uuid || issue.assignedUuids.includes(user.uuid)
}

function isCreatorOrAssigneeOrLeader(issue: Issue, project: Project | undefined, user: UserSummary): boolean {
  return isCreatorOrAssignee(issue, user) || (project != null && project.leaderUuid === user.uuid)
}

export function computeIssuePermissions(issue: Issue, project: Project | undefined, user: UserSummary): IssuePermissions {
  const elevated = isElevated(user)
  const isClosed = issue.status === 'DONE'

  // reporter/assignee/manager/admin — comments and status changes (feature 9, narrow scope)
  const narrowAccess = elevated || isCreatorOrAssignee(issue, user)
  // + project leader — editing fields and attaching files (feature 9, broad scope)
  const broadAccess = elevated || isCreatorOrAssigneeOrLeader(issue, project, user)

  return {
    // Comments stay allowed on closed issues (feature 7: "comments can usually stay open even when closed").
    canComment: narrowAccess,
    canChangeStatus: narrowAccess && !isClosed,
    canEditFields: broadAccess && !isClosed,
    canAttachFiles: broadAccess && !isClosed,
  }
}

export function canDeleteAttachment(attachment: AttachmentItem, user: UserSummary): boolean {
  return isElevated(user) || attachment.uploadedByUuid === user.uuid
}
