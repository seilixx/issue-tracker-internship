// Mirrors the backend enums/envelopes exactly (see backend/.../entity and dto packages)
// so the two stay easy to diff against each other as the API evolves.

export type Status = 'OPEN' | 'IN_PROGRESS' | 'DONE'
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export type ProjectCategory = 'SOFTWARE' | 'SUPPORT' | 'INTERNAL'
export type Role = 'ADMIN' | 'MANAGER' | 'USER'

export interface GenericResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface PagedResponse<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}
