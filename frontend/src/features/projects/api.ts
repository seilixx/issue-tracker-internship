import { apiClient } from '@/utils/apiClient'
import type { GenericResponse, ProjectCategory } from '@/utils/apiTypes'
import type { Project } from './types'

export async function fetchProjects(category?: ProjectCategory): Promise<Project[]> {
  const response = await apiClient.get<GenericResponse<Project[]>>('/projects', {
    params: category ? { category } : undefined,
  })
  return response.data.data
}
