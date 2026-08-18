import { useCallback, useEffect, useState } from 'react'
import { getErrorMessage } from '@/utils/apiClient'
import { fetchProjects } from '../api'
import type { Project } from '../types'

// Several components keep their own copy of the project list (sidebar, filters
// bar, IssuesView...). Instead of a shared store, any mutation
// (create/update/delete) fires this event and every mounted useProjects()
// refetches — simple and impossible to leave stale.
const PROJECTS_CHANGED_EVENT = 'issuetracker:projects-changed'

export function notifyProjectsChanged() {
  window.dispatchEvent(new Event(PROJECTS_CHANGED_EVENT))
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchProjects()
      .then((data) => {
        if (!cancelled) {
          setProjects(data)
          setError(null)
        }
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err, 'Could not load projects.'))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [reloadToken])

  const refetch = useCallback(() => setReloadToken((token) => token + 1), [])

  useEffect(() => {
    window.addEventListener(PROJECTS_CHANGED_EVENT, refetch)
    return () => window.removeEventListener(PROJECTS_CHANGED_EVENT, refetch)
  }, [refetch])

  return { projects, loading, error, refetch }
}
