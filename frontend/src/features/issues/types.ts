import type { Priority, Status } from '@/utils/apiTypes'

export interface Issue {
  id: number
  title: string
  description: string | null
  status: Status
  priority: Priority
  projectId: number
  creatorUuid: string | null
  createdAt: string
  updatedAt: string
  closedAt: string | null
  closedByUuid: string | null
  assignedUuids: string[]
}

// Matches IssueController's SORTABLE_FIELDS exactly.
export type SortField = 'status' | 'priority' | 'createdAt' | 'updatedAt'
export type SortDirection = 'asc' | 'desc'

export interface IssueFilters {
  projectId?: number
  status?: Status
  priority?: Priority
  assigneeUuid?: string
}

export interface IssueSort {
  sortBy: SortField
  sortDir: SortDirection
}

export interface CommentThread {
  id: number
  title: string
  content: string | null
  issueId: number
  authorUuid: string | null
  authorUserName: string | null
  parentCommentId: number | null
  deleted: boolean
}

export interface AttachmentItem {
  id: number
  issueId: number
  fileName: string
  contentType: string
  sizeBytes: number
  uploadedByUuid: string | null
  uploadedAt: string
}

export interface IssueDetail extends Issue {
  comments: CommentThread[]
  attachments: AttachmentItem[]
}
