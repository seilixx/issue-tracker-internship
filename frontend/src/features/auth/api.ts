import { apiClient } from '@/utils/apiClient'
import type { GenericResponse } from '@/utils/apiTypes'
import type { AuthResponse, LoginPayload, RegisterPayload } from './types'

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const response = await apiClient.post<GenericResponse<AuthResponse>>('/auth/login', payload)
  return response.data.data
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await apiClient.post<GenericResponse<AuthResponse>>('/auth/register', payload)
  return response.data.data
}
