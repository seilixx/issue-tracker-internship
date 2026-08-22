export type Role = 'ADMIN' | 'MANAGER' | 'USER'
export type IssueStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE'
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export type ProjectCategory = 'SOFTWARE' | 'SUPPORT' | 'INTERNAL'

export interface User {
  uuid: string
  firstName: string
  lastName: string
  username: string
  role: Role
  bio: string
  avatarUrl?: string
}

export interface Project {
  id: number
  title: string
  description: string
  category: ProjectCategory
  leaderUuid: string
}

// Timestamps are epoch milliseconds — the API layer (src/lib/api.ts) converts
// the backend's ISO-8601 strings at the boundary so all UI code (timeAgo,
// formatDate, sorting) works on numbers.
export interface Issue {
  id: number
  title: string
  description: string
  status: IssueStatus
  priority: Priority
  projectId: number
  creatorUuid: string
  createdAt: number
  updatedAt: number
  closedAt?: number
  closedByUuid?: string
  assignedUuids: string[]
}

export interface Comment {
  id: number
  title?: string
  content: string
  issueId: number
  authorUuid: string
  authorUserName: string
  createdAt: number
  parentCommentId?: number
  deleted?: boolean
}

export interface Attachment {
  id: number
  issueId: number
  fileName: string
  contentType: string
  sizeBytes: number
  uploadedByUuid: string
  uploadedAt: number
}

export interface IssueFilters {
  projectId: number | null
  status: IssueStatus | null
  priority: Priority | null
  assigneeUuid: string | null
}

export type SortField = 'createdAt' | 'updatedAt' | 'status' | 'priority'
export type SortDir = 'asc' | 'desc'

export type Route =
  | { name: 'dashboard' }
  | { name: 'board' }
  | { name: 'project'; projectId: number }
  | { name: 'team' }
  | { name: 'profile' }
  | { name: 'user'; uuid: string }
  | { name: 'admin-users' }
