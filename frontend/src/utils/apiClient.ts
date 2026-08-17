import axios, { AxiosError } from 'axios'

export const apiClient = axios.create({
  baseURL: '/api',
})

const AUTH_TOKEN_STORAGE_KEY = 'issuetracker-auth-token'

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

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const url = error.config?.url ?? ''
      // /auth/login and /auth/register returning 401/400 on bad credentials is a normal,
      // form-level error — it must not trigger a global logout/redirect.
      const isAuthEndpoint = url.startsWith('/auth/')
      if (!isAuthEndpoint && !isHandlingUnauthorized) {
        isHandlingUnauthorized = true
        unauthorizedHandler?.()
      }
    }
    return Promise.reject(error)
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
