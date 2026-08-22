import { apiClient } from '@/utils/apiClient'
import type { GenericResponse, PagedResponse } from '@/utils/apiTypes'
import type {
  Attachment, Comment, Issue, IssueStatus, Priority, Project, ProjectCategory, Role, User,
} from '@/types'

// ---------------------------------------------------------------------------
// Raw backend DTO shapes (ISO-8601 timestamps, nullable fields) — these mirror
// the backend's dto package exactly and never leak into the UI layer.
// ---------------------------------------------------------------------------

interface UserDto {
  uuid: string
  firstName: string
  lastName: string
  username: string
  role: Role
  bio?: string | null
  avatarUrl?: string | null
}

interface ProjectDto {
  id: number
  title: string
  description: string | null
  category: ProjectCategory
  leaderUuid: string
}

interface CommentDto {
  id: number
  title: string
  content: string | null
  issueId: number
  authorUuid: string | null
  authorUserName: string | null
  createdAt: string | null
  parentCommentId: number | null
  deleted: boolean
}

interface AttachmentDto {
  id: number
  issueId: number
  fileName: string
  contentType: string
  sizeBytes: number
  uploadedByUuid: string | null
  uploadedAt: string
}

interface IssueDto {
  id: number
  title: string
  description: string | null
  status: IssueStatus
  priority: Priority
  projectId: number
  creatorUuid: string | null
  createdAt: string
  updatedAt: string
  closedAt: string | null
  closedByUuid: string | null
  assignedUuids: string[]
  // Present only on GET /issues/{id}:
  comments?: CommentDto[]
  attachments?: AttachmentDto[]
}

interface AuthenticationResponse {
  token: string
  refreshToken: string
  username: string
  uuid: string
}

// ---------------------------------------------------------------------------
// DTO → UI type mapping (nulls and ISO strings are normalized here)
// ---------------------------------------------------------------------------

const ms = (iso: string | null | undefined): number | undefined =>
  iso ? Date.parse(iso) : undefined

function mapUser(d: UserDto): User {
  return {
    uuid: d.uuid,
    firstName: d.firstName,
    lastName: d.lastName,
    username: d.username,
    role: d.role,
    bio: d.bio ?? '',
    avatarUrl: d.avatarUrl ?? undefined,
  }
}

function mapProject(d: ProjectDto): Project {
  return { ...d, description: d.description ?? '' }
}

function mapComment(d: CommentDto): Comment {
  return {
    id: d.id,
    title: d.title || undefined,
    content: d.content ?? '',
    issueId: d.issueId,
    authorUuid: d.authorUuid ?? '',
    authorUserName: d.authorUserName ?? '',
    createdAt: ms(d.createdAt) ?? 0,
    parentCommentId: d.parentCommentId ?? undefined,
    deleted: d.deleted,
  }
}

function mapAttachment(d: AttachmentDto): Attachment {
  return { ...d, uploadedByUuid: d.uploadedByUuid ?? '', uploadedAt: ms(d.uploadedAt) ?? 0 }
}

function mapIssue(d: IssueDto): Issue {
  return {
    id: d.id,
    title: d.title,
    description: d.description ?? '',
    status: d.status,
    priority: d.priority,
    projectId: d.projectId,
    creatorUuid: d.creatorUuid ?? '',
    createdAt: ms(d.createdAt) ?? 0,
    updatedAt: ms(d.updatedAt) ?? 0,
    closedAt: ms(d.closedAt),
    closedByUuid: d.closedByUuid ?? undefined,
    assignedUuids: d.assignedUuids ?? [],
  }
}

// ---------------------------------------------------------------------------
// Auth — POST /api/auth/*
// ---------------------------------------------------------------------------

export interface LoginPayload {
  username: string
  password: string
}

export interface RegisterPayload {
  firstName: string
  lastName: string
  username: string
  mail: string
  password: string
}

export async function loginRequest(payload: LoginPayload): Promise<AuthenticationResponse> {
  const response = await apiClient.post<GenericResponse<AuthenticationResponse>>('/auth/login', payload)
  return response.data.data
}

export async function registerRequest(payload: RegisterPayload): Promise<AuthenticationResponse> {
  const response = await apiClient.post<GenericResponse<AuthenticationResponse>>('/auth/register', payload)
  return response.data.data
}

// Best-effort: revokes the refresh token server-side so it can't be replayed
// after logout. Callers clear local state regardless of the outcome.
export async function logoutRequest(refreshToken: string): Promise<void> {
  await apiClient.post('/auth/logout', { refreshToken })
}

// ---------------------------------------------------------------------------
// Users — /api/users/*
// ---------------------------------------------------------------------------

export async function fetchMyProfile(): Promise<User> {
  const response = await apiClient.get<GenericResponse<UserDto>>('/users/me')
  return mapUser(response.data.data)
}

// Admin-only directory (GET /api/users has @PreAuthorize hasRole('ADMIN')).
export async function fetchAllUsers(): Promise<User[]> {
  const response = await apiClient.get<GenericResponse<UserDto[]>>('/users')
  return response.data.data.map(mapUser)
}

// Open to every role — an empty query matches all users (LIKE '%%'), so this
// doubles as the non-admin user directory. Used to hydrate the store.
export async function searchUsers(query: string, page = 0, size = 200): Promise<PagedResponse<User>> {
  const response = await apiClient.get<GenericResponse<PagedResponse<UserDto>>>('/users/search', {
    params: { q: query, page, size },
  })
  const paged = response.data.data
  return { ...paged, content: paged.content.map(mapUser) }
}

export async function updateMyProfile(payload: { firstName: string; lastName: string; bio?: string }): Promise<User> {
  const response = await apiClient.patch<GenericResponse<UserDto>>('/users/me', payload)
  return mapUser(response.data.data)
}

export async function uploadMyAvatar(file: File): Promise<User> {
  const formData = new FormData()
  formData.append('file', file, file.name)
  const response = await apiClient.post<GenericResponse<UserDto>>('/users/me/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return mapUser(response.data.data)
}

export async function changeUserRole(uuid: string, role: Role): Promise<User> {
  const response = await apiClient.patch<GenericResponse<UserDto>>(`/users/${uuid}/role`, { role })
  return mapUser(response.data.data)
}

// ---------------------------------------------------------------------------
// Projects — /api/projects/*
// ---------------------------------------------------------------------------

export async function fetchProjects(): Promise<Project[]> {
  const response = await apiClient.get<GenericResponse<ProjectDto[]>>('/projects')
  return response.data.data.map(mapProject)
}

export interface ProjectDraftPayload {
  title: string
  description?: string
  category: ProjectCategory
  leaderUuid: string
}

export async function createProject(payload: ProjectDraftPayload): Promise<Project> {
  const response = await apiClient.post<GenericResponse<ProjectDto>>('/projects', payload)
  return mapProject(response.data.data)
}

// Mirrors ProjectUpdateRequest — deliberately no `category`: category changes
// go through the admin-only PATCH /projects/{id}/category endpoint.
export async function updateProject(id: number, payload: Omit<ProjectDraftPayload, 'category'>): Promise<Project> {
  const response = await apiClient.put<GenericResponse<ProjectDto>>(`/projects/${id}`, payload)
  return mapProject(response.data.data)
}

export async function updateProjectCategory(id: number, category: ProjectCategory): Promise<Project> {
  const response = await apiClient.patch<GenericResponse<ProjectDto>>(`/projects/${id}/category`, { category })
  return mapProject(response.data.data)
}

export async function deleteProject(id: number): Promise<void> {
  await apiClient.delete(`/projects/${id}`)
}

// ---------------------------------------------------------------------------
// Issues — /api/issues/*
// ---------------------------------------------------------------------------

const ISSUE_PAGE_SIZE = 200

// The UI filters/sorts client-side (src/lib/issueQuery.ts), so the store
// hydrates the full issue list by walking the paged endpoint.
export async function fetchAllIssues(): Promise<Issue[]> {
  const first = await apiClient.get<GenericResponse<PagedResponse<IssueDto>>>('/issues', {
    params: { page: 0, size: ISSUE_PAGE_SIZE, sortBy: 'updatedAt', sortDir: 'desc' },
  })
  const { content, totalPages } = first.data.data
  const all = [...content]
  for (let page = 1; page < totalPages; page++) {
    const next = await apiClient.get<GenericResponse<PagedResponse<IssueDto>>>('/issues', {
      params: { page, size: ISSUE_PAGE_SIZE, sortBy: 'updatedAt', sortDir: 'desc' },
    })
    all.push(...next.data.data.content)
  }
  return all.map(mapIssue)
}

export interface IssueDetailResult {
  issue: Issue
  comments: Comment[]
  attachments: Attachment[]
}

export async function fetchIssueDetail(id: number): Promise<IssueDetailResult> {
  const response = await apiClient.get<GenericResponse<IssueDto>>(`/issues/${id}`)
  const d = response.data.data
  return {
    issue: mapIssue(d),
    comments: (d.comments ?? []).map(mapComment),
    attachments: (d.attachments ?? []).map(mapAttachment),
  }
}

// Mirrors the backend's IssueDto used by POST/PUT — no `status` field on
// purpose: status transitions only go through PATCH /issues/{id}/status.
export interface IssueDraftPayload {
  title: string
  description?: string
  priority: Priority
  projectId: number
  assignedUuids?: string[]
}

export async function createIssue(payload: IssueDraftPayload): Promise<Issue> {
  const response = await apiClient.post<GenericResponse<IssueDto>>('/issues', payload)
  return mapIssue(response.data.data)
}

export async function updateIssue(id: number, payload: IssueDraftPayload): Promise<Issue> {
  const response = await apiClient.put<GenericResponse<IssueDto>>(`/issues/${id}`, payload)
  return mapIssue(response.data.data)
}

export async function updateIssueStatus(id: number, status: IssueStatus): Promise<Issue> {
  const response = await apiClient.patch<GenericResponse<IssueDto>>(`/issues/${id}/status`, { status })
  return mapIssue(response.data.data)
}

export async function deleteIssue(id: number): Promise<void> {
  await apiClient.delete(`/issues/${id}`)
}

// ---------------------------------------------------------------------------
// Comments — /api/issues/{id}/comments, /api/comments/{id}
// ---------------------------------------------------------------------------

export async function addComment(
  issueId: number,
  payload: { title: string; content?: string; parentCommentId?: number },
): Promise<Comment> {
  const response = await apiClient.post<GenericResponse<CommentDto>>(`/issues/${issueId}/comments`, payload)
  return mapComment(response.data.data)
}

// The backend's updateComment reads title/content from the DTO, so both are
// always sent (CommentService.updateComment). issueId is @NotNull on
// CommentDto, so it must be present for @Valid to pass.
export async function editComment(id: number, payload: { title: string; content?: string; issueId: number }): Promise<Comment> {
  const response = await apiClient.put<GenericResponse<CommentDto>>(`/comments/${id}`, payload)
  return mapComment(response.data.data)
}

export async function deleteComment(id: number): Promise<void> {
  await apiClient.delete(`/comments/${id}`)
}

// ---------------------------------------------------------------------------
// Attachments — /api/issues/{id}/attachments, /api/attachments/{id}
// ---------------------------------------------------------------------------

export async function uploadAttachment(issueId: number, file: File): Promise<Attachment> {
  const formData = new FormData()
  formData.append('file', file, file.name)
  const response = await apiClient.post<GenericResponse<AttachmentDto>>(`/issues/${issueId}/attachments`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return mapAttachment(response.data.data)
}

export async function fetchAttachmentContent(id: number): Promise<Blob> {
  const response = await apiClient.get(`/attachments/${id}/content`, { responseType: 'blob' })
  return response.data as Blob
}

export async function deleteAttachment(id: number): Promise<void> {
  await apiClient.delete(`/attachments/${id}`)
}
