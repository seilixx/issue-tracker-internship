import { apiClient } from '@/utils/apiClient'
import type { GenericResponse, PagedResponse } from '@/utils/apiTypes'
import type { UpdateProfilePayload, UserProfile, UserSummary } from './types'

export async function fetchUserByUuid(uuid: string): Promise<UserSummary> {
  const response = await apiClient.get<GenericResponse<UserSummary>>(`/users/${uuid}`)
  return response.data.data
}

export async function searchUsers(query: string, page = 0, size = 10): Promise<PagedResponse<UserSummary>> {
  const response = await apiClient.get<GenericResponse<PagedResponse<UserSummary>>>('/users/search', {
    params: { q: query, page, size },
  })
  return response.data.data
}

export async function fetchUserProfile(uuid: string, page = 0, size = 5): Promise<UserProfile> {
  const response = await apiClient.get<GenericResponse<UserProfile>>(`/users/${uuid}/profile`, {
    params: { page, size },
  })
  return response.data.data
}

export async function fetchMyProfile(): Promise<UserSummary> {
  const response = await apiClient.get<GenericResponse<UserSummary>>('/users/me')
  return response.data.data
}

export async function updateMyProfile(payload: UpdateProfilePayload): Promise<UserSummary> {
  const response = await apiClient.patch<GenericResponse<UserSummary>>('/users/me', payload)
  return response.data.data
}

export async function uploadMyAvatar(file: Blob, fileName = 'avatar.png'): Promise<UserSummary> {
  const formData = new FormData()
  formData.append('file', file, fileName)
  const response = await apiClient.post<GenericResponse<UserSummary>>('/users/me/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data.data
}
