import { useEffect, useMemo, useReducer } from 'react'
import { fetchUserCached, getCachedUser } from '../userCache'
import type { UserSummary } from '../types'

/** Resolves a list of user UUIDs to user summaries, caching across calls/pages. */
export function useUsersLookup(uuids: string[]): Record<string, UserSummary> {
  const [, forceRender] = useReducer((count: number) => count + 1, 0)
  const key = uuids.filter(Boolean).join(',')
  const uniqueUuids = useMemo(() => Array.from(new Set(key ? key.split(',') : [])), [key])

  useEffect(() => {
    const missing = uniqueUuids.filter((uuid) => !getCachedUser(uuid))
    if (missing.length === 0) return

    let cancelled = false
    Promise.all(missing.map((uuid) => fetchUserCached(uuid))).then(() => {
      if (!cancelled) forceRender()
    })
    return () => {
      cancelled = true
    }
  }, [uniqueUuids])

  const result: Record<string, UserSummary> = {}
  for (const uuid of uniqueUuids) {
    const user = getCachedUser(uuid)
    if (user) result[uuid] = user
  }
  return result
}
