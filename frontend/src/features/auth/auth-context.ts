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
  /** Pushes a freshly-updated profile (e.g. after editing name/bio/avatar) into the
   *  shared session so every consumer (topbar, menus...) reflects it immediately,
   *  instead of only the page that made the change. */
  setUser: (user: UserSummary) => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
