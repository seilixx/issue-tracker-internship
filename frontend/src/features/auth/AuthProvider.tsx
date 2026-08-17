import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  clearStoredAuthToken,
  getStoredAuthToken,
  resetUnauthorizedGuard,
  setStoredAuthToken,
  setUnauthorizedHandler,
} from '@/utils/apiClient'
import { fetchMyProfile } from '@/features/users/api'
import type { UserSummary } from '@/features/users/types'
import { login as loginRequest, register as registerRequest } from './api'
import { AuthContext } from './auth-context'
import type { LoginPayload, RegisterPayload } from './types'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const logout = useCallback(() => {
    clearStoredAuthToken()
    setUser(null)
    resetUnauthorizedGuard()
    navigate('/login', { replace: true })
  }, [navigate])

  // Registered once so a 401 from anywhere in the app (token expired, revoked,
  // signed with a stale secret...) triggers the exact same clean logout as the
  // button in the user menu — see apiClient.ts for the guard against re-triggering
  // it once per failed request (no infinite loop of redirects).
  useEffect(() => {
    setUnauthorizedHandler(logout)
  }, [logout])

  useEffect(() => {
    const token = getStoredAuthToken()
    if (!token) {
      setIsLoading(false)
      return
    }
    fetchMyProfile()
      .then((profile) => setUser(profile))
      .catch(() => {
        // A failed /users/me here means the token is invalid — the 401 interceptor
        // (registered above) already cleared it and redirected; this just mirrors
        // that in local state.
        setUser(null)
      })
      .finally(() => setIsLoading(false))
    // Only ever run once, on mount — this is the "is my persisted token still good" check.
  }, [])

  async function login(payload: LoginPayload) {
    const response = await loginRequest(payload)
    setStoredAuthToken(response.token)
    const profile = await fetchMyProfile()
    setUser(profile)
  }

  async function register(payload: RegisterPayload) {
    const response = await registerRequest(payload)
    setStoredAuthToken(response.token)
    const profile = await fetchMyProfile()
    setUser(profile)
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: user != null, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
