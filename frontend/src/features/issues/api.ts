import { apiClient } from '@/utils/apiClient'
import type { GenericResponse, PagedResponse, Priority, Status } from '@/utils/apiTypes'
import type { AttachmentItem, CommentThread, Issue, IssueDetail, IssueFilters, IssueSort } from './types'

interface FetchIssuesParams extends IssueFilters, IssueSort {
  page: number
  size: number
}

export async function fetchIssues(params: FetchIssuesParams): Promise<PagedResponse<Issue>> {
  const response = await apiClient.get<GenericResponse<PagedResponse<Issue>>>('/issues', {
    params: {
      projectId: params.projectId,
      status: params.status,
      priority: params.priority,
      assigneeUuid: params.assigneeUuid,
      sortBy: params.sortBy,
      sortDir: params.sortDir,
      page: params.page,
      size: params.size,
    },
  })
  return response.data.data
}

export interface CreateIssuePayload {
  title: string
  description?: string
  priority: Priority
  projectId: number
  assignedUuids?: string[]
}

export async function createIssue(payload: CreateIssuePayload): Promise<Issue> {
  const response = await apiClient.post<GenericResponse<Issue>>('/issues', payload)
  return response.data.data
}

export async function updateIssueStatus(id: number, status: Status): Promise<Issue> {
  const response = await apiClient.patch<GenericResponse<Issue>>(`/issues/${id}/status`, { status })
  return response.data.data
}

// Mirrors the backend's IssueUpdateRequest — no `status` field on purpose:
// status transitions only go through PATCH /issues/:id/status.
export interface UpdateIssuePayload {
  title: string
  description?: string
  priority: Priority
  projectId: number
  assignedUuids?: string[]
}

export async function updateIssue(id: number, payload: UpdateIssuePayload): Promise<Issue> {
  const response = await apiClient.put<GenericResponse<Issue>>(`/issues/${id}`, payload)
  return response.data.data
}

export async function deleteIssue(id: number): Promise<void> {
  await apiClient.delete(`/issues/${id}`)
}

export async function fetchIssueDetail(id: number): Promise<IssueDetail> {
  const response = await apiClient.get<GenericResponse<IssueDetail>>(`/issues/${id}`)
  return response.data.data
}

interface CreateCommentPayload {
  title: string
  content?: string
  parentCommentId?: number
}

export async function createComment(issueId: number, payload: CreateCommentPayload): Promise<CommentThread> {
  const response = await apiClient.post<GenericResponse<CommentThread>>(`/issues/${issueId}/comments`, payload)
  return response.data.data
}

export async function uploadAttachment(issueId: number, file: File): Promise<AttachmentItem> {
  const formData = new FormData()
  formData.append('file', file)
  const response = await apiClient.post<GenericResponse<AttachmentItem>>(`/issues/${issueId}/attachments`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data.data
}

export async function deleteAttachment(attachmentId: number): Promise<void> {
  await apiClient.delete(`/attachments/${attachmentId}`)
}

// The backend's updateComment only reads title/content from the DTO, so this
// payload is all that's needed (CommentService.updateComment).
export interface UpdateCommentPayload {
  title: string
  content?: string
}

export async function updateComment(commentId: number, payload: UpdateCommentPayload): Promise<CommentThread> {
  const response = await apiClient.put<GenericResponse<CommentThread>>(`/comments/${commentId}`, payload)
  return response.data.data
}

export async function deleteComment(commentId: number): Promise<void> {
  await apiClient.delete(`/comments/${commentId}`)
}
