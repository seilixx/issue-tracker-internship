import { apiClient } from '@/utils/apiClient'
import type { GenericResponse, ProjectCategory } from '@/utils/apiTypes'
import type { Project } from './types'

export async function fetchProjects(category?: ProjectCategory): Promise<Project[]> {
  const response = await apiClient.get<GenericResponse<Project[]>>('/projects', {
    params: category ? { category } : undefined,
  })
  return response.data.data
}

// Mirrors the backend's ProjectDto used by POST /api/projects (ADMIN/MANAGER).
export interface CreateProjectPayload {
  title: string
  description?: string
  category: ProjectCategory
  leaderUuid: string
}

export async function createProject(payload: CreateProjectPayload): Promise<Project> {
  const response = await apiClient.post<GenericResponse<Project>>('/projects', payload)
  return response.data.data
}

// Mirrors ProjectUpdateRequest — deliberately no `category` field: category
// changes go through the admin-only PATCH /projects/:id/category endpoint.
export interface UpdateProjectPayload {
  title: string
  description?: string
  leaderUuid: string
}

export async function updateProject(id: number, payload: UpdateProjectPayload): Promise<Project> {
  const response = await apiClient.put<GenericResponse<Project>>(`/projects/${id}`, payload)
  return response.data.data
}

export async function updateProjectCategory(id: number, category: ProjectCategory): Promise<Project> {
  const response = await apiClient.patch<GenericResponse<Project>>(`/projects/${id}/category`, { category })
  return response.data.data
}

export async function deleteProject(id: number): Promise<void> {
  await apiClient.delete(`/projects/${id}`)
}
