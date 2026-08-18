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

// Best-effort: revokes the refresh token server-side so it can't be replayed
// after logout. Callers should clear local state regardless of whether this
// call succeeds — the local session is what actually matters to the user.
export async function logout(refreshToken: string): Promise<void> {
  await apiClient.post('/auth/logout', { refreshToken })
}
