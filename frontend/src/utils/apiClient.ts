import axios, { AxiosError } from 'axios'

export const apiClient = axios.create({
  baseURL: '/api',
})

// TODO: this key is a placeholder for the auth feature — no login flow exists
// yet, so this is always empty for now and every request goes out unauthenticated.
const AUTH_TOKEN_STORAGE_KEY = 'issuetracker-auth-token'

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Every error response from GlobalExceptionHandler is a GenericType<...> with
// a human-readable `message` — surface that instead of a generic Axios error.
export function getErrorMessage(error: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>
    return axiosError.response?.data?.message ?? fallback
  }
  return fallback
}
