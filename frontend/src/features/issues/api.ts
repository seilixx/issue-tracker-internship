import { apiClient } from '@/utils/apiClient'
import type { GenericResponse, PagedResponse, Status } from '@/utils/apiTypes'
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

export async function updateIssueStatus(id: number, status: Status): Promise<Issue> {
  const response = await apiClient.patch<GenericResponse<Issue>>(`/issues/${id}/status`, { status })
  return response.data.data
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
