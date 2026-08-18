import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  clearStoredAuthToken,
  clearStoredRefreshToken,
  getStoredAuthToken,
  getStoredRefreshToken,
  resetUnauthorizedGuard,
  setStoredAuthToken,
  setStoredRefreshToken,
  setUnauthorizedHandler,
} from '@/utils/apiClient'
import { fetchMyProfile } from '@/features/users/api'
import type { UserSummary } from '@/features/users/types'
import { login as loginRequest, logout as logoutRequest, register as registerRequest } from './api'
import { AuthContext } from './auth-context'
import type { LoginPayload, RegisterPayload } from './types'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const logout = useCallback(() => {
    const refreshToken = getStoredRefreshToken()
    clearStoredAuthToken()
    clearStoredRefreshToken()
    setUser(null)
    resetUnauthorizedGuard()
    navigate('/login', { replace: true })

    // Best-effort server-side revocation — the local session is already
    // cleared above either way, so a failed/offline call here doesn't block
    // or need to be surfaced to the user.
    if (refreshToken) {
      logoutRequest(refreshToken).catch(() => {})
    }
  }, [navigate])

  // Registered once so a 401 from anywhere in the app that survives a silent
  // refresh attempt (see utils/apiClient.ts — expired access token first
  // tries POST /auth/refresh transparently) triggers the exact same clean
  // logout as the button in the user menu.
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
        // A failed /users/me here means both the access token and a refresh
        // attempt failed — the 401 interceptor already cleared everything
        // and redirected; this just mirrors that in local state.
        setUser(null)
      })
      .finally(() => setIsLoading(false))
    // Only ever run once, on mount — this is the "is my persisted session still good" check.
  }, [])

  async function login(payload: LoginPayload) {
    const response = await loginRequest(payload)
    setStoredAuthToken(response.token)
    setStoredRefreshToken(response.refreshToken)
    const profile = await fetchMyProfile()
    setUser(profile)
  }

  async function register(payload: RegisterPayload) {
    const response = await registerRequest(payload)
    setStoredAuthToken(response.token)
    setStoredRefreshToken(response.refreshToken)
    const profile = await fetchMyProfile()
    setUser(profile)
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: user != null, isLoading, login, register, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
