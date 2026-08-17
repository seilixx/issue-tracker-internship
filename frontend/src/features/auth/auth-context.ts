import { createContext } from 'react'
import type { UserSummary } from '@/features/users/types'
import type { LoginPayload, RegisterPayload } from './types'

export interface AuthContextValue {
  user: UserSummary | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (payload: LoginPayload) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
