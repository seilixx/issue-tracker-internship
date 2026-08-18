import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import type { GenericResponse } from './apiTypes'

export const apiClient = axios.create({
  baseURL: '/api',
})

const AUTH_TOKEN_STORAGE_KEY = 'issuetracker-auth-token'
const REFRESH_TOKEN_STORAGE_KEY = 'issuetracker-refresh-token'

export function getStoredAuthToken(): string | null {
  try {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
  } catch {
    return null
  }
}

export function setStoredAuthToken(token: string): void {
  try {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token)
  } catch {
    // localStorage unavailable (private browsing, disabled storage) — session just won't persist
  }
}

export function clearStoredAuthToken(): void {
  try {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)
  } catch {
    // see above
  }
}

export function getStoredRefreshToken(): string | null {
  try {
    return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)
  } catch {
    return null
  }
}

export function setStoredRefreshToken(token: string): void {
  try {
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token)
  } catch {
    // see above
  }
}

export function clearStoredRefreshToken(): void {
  try {
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY)
  } catch {
    // see above
  }
}

apiClient.interceptors.request.use((config) => {
  const token = getStoredAuthToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Registered by AuthProvider once it mounts. Kept outside React so any module
// (not just components) can trigger a clean logout when the server rejects a token.
type UnauthorizedHandler = () => void
let unauthorizedHandler: UnauthorizedHandler | null = null
let isHandlingUnauthorized = false

export function setUnauthorizedHandler(handler: UnauthorizedHandler): void {
  unauthorizedHandler = handler
}

// Called by the handler once it's actually finished logging out, so a future
// 401 (after the user logs back in) can trigger it again.
export function resetUnauthorizedGuard(): void {
  isHandlingUnauthorized = false
}

function triggerUnauthorized(): void {
  if (!isHandlingUnauthorized) {
    isHandlingUnauthorized = true
    unauthorizedHandler?.()
  }
}

// Minimal local shape instead of importing features/auth/types — utils/ stays
// feature-agnostic, and this is the only field this module actually needs.
interface RefreshResponseData {
  token: string
  refreshToken: string
}

// Single-flight: every 401 that arrives while a refresh is already in progress
// awaits the *same* promise instead of firing its own POST /auth/refresh — the
// refresh token is single-use server-side (see RefreshTokenService.
// verifyAndConsume), so two concurrent refresh calls with the same token would
// have the second one rejected outright.
let refreshPromise: Promise<string> | null = null

function refreshAccessToken(): Promise<string> {
  if (refreshPromise) return refreshPromise

  const storedRefreshToken = getStoredRefreshToken()
  if (!storedRefreshToken) {
    return Promise.reject(new Error('No refresh token available'))
  }

  refreshPromise = apiClient
    .post<GenericResponse<RefreshResponseData>>('/auth/refresh', { refreshToken: storedRefreshToken })
    .then((response) => {
      const { token, refreshToken } = response.data.data
      setStoredAuthToken(token)
      setStoredRefreshToken(refreshToken)
      return token
    })
    .finally(() => {
      refreshPromise = null
    })

  return refreshPromise
}

type RetryableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean }

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!axios.isAxiosError(error) || error.response?.status !== 401) {
      return Promise.reject(error)
    }

    const originalRequest = error.config as RetryableRequestConfig | undefined
    const url = originalRequest?.url ?? ''
    // /auth/login and /auth/register returning 401 on bad credentials, and
    // /auth/refresh returning 401 on a dead refresh token, are normal
    // form-level/flow-level outcomes — never trigger the global logout for those,
    // the caller (login form, or refreshAccessToken's own catch below) handles it.
    const isAuthEndpoint = url.startsWith('/auth/')

    if (!originalRequest || isAuthEndpoint || originalRequest._retry) {
      if (!isAuthEndpoint) triggerUnauthorized()
      return Promise.reject(error)
    }

    try {
      const newAccessToken = await refreshAccessToken()
      originalRequest._retry = true
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      return apiClient(originalRequest)
    } catch {
      triggerUnauthorized()
      return Promise.reject(error)
    }
  },
)

// Every error response from GlobalExceptionHandler is a GenericType<...> with
// a human-readable `message` — surface that instead of a generic Axios error.
export function getErrorMessage(error: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>
    return axiosError.response?.data?.message ?? fallback
  }
  return fallback
}
