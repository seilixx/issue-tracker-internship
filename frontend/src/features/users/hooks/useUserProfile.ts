import { useCallback, useEffect, useState } from 'react'
import { getErrorMessage } from '@/utils/apiClient'
import { fetchUserProfile } from '../api'
import type { UserProfile } from '../types'

interface UseUserProfileResult {
  profile: UserProfile | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useUserProfile(uuid: string, page: number, size: number): UseUserProfileResult {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchUserProfile(uuid, page, size)
      .then((result) => {
        if (!cancelled) setProfile(result)
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err, 'Could not load this profile.'))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [uuid, page, size, reloadToken])

  const refetch = useCallback(() => setReloadToken((token) => token + 1), [])

  return { profile, loading, error, refetch }
}
