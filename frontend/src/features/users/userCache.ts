import { fetchUserByUuid } from './api'
import type { UserSummary } from './types'

// Module-scoped cache so navigating between board/list/pages doesn't re-fetch
// the same assignee over and over within a session.
const cache = new Map<string, UserSummary>()
const inFlight = new Map<string, Promise<UserSummary | null>>()

export function getCachedUser(uuid: string): UserSummary | undefined {
  return cache.get(uuid)
}

export function fetchUserCached(uuid: string): Promise<UserSummary | null> {
  const cached = cache.get(uuid)
  if (cached) return Promise.resolve(cached)

  const pending = inFlight.get(uuid)
  if (pending) return pending

  const promise = fetchUserByUuid(uuid)
    .then((user) => {
      cache.set(uuid, user)
      return user
    })
    .catch(() => null)
    .finally(() => inFlight.delete(uuid))

  inFlight.set(uuid, promise)
  return promise
}
