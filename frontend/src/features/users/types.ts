import type { Role } from '@/utils/apiTypes'
import type { Issue } from '@/features/issues/types'
import type { PagedResponse } from '@/utils/apiTypes'

export interface UserSummary {
  uuid: string
  firstName: string
  lastName: string
  username: string
  role: Role
  bio?: string | null
  avatarUrl?: string | null
}

export interface UserProfile {
  user: UserSummary
  assignedIssuesCount: number
  closedIssuesCount: number
  assignedIssues: PagedResponse<Issue>
  closedIssues: PagedResponse<Issue>
}

export interface UpdateProfilePayload {
  firstName: string
  lastName: string
  bio?: string
}
