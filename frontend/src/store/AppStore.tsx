import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import type {
  Attachment, Comment, Issue, IssueFilters, IssueStatus, Priority,
  Project, ProjectCategory, Role, Route, SortDir, SortField, User,
} from '@/types'
import * as api from '@/lib/api'
import {
  clearStoredAuthToken,
  clearStoredRefreshToken,
  getStoredAuthToken,
  getStoredRefreshToken,
  resetUnauthorizedGuard,
  setStoredAuthToken,
  setStoredRefreshToken,
  setUnauthorizedHandler,
  getErrorMessage,
} from '@/utils/apiClient'

export interface IssueDraft {
  title: string
  description: string
  projectId: number
  priority: Priority
  assignedUuids: string[]
}

export interface ProjectDraft {
  title: string
  description: string
  category: ProjectCategory
  leaderUuid: string
}

interface StoreState {
  currentUser: User | null
  /** true while the persisted session is being validated on mount */
  authLoading: boolean
  /** true once projects/users/issues have been hydrated for the session */
  ready: boolean
  users: User[]
  projects: Project[]
  issues: Issue[]
  comments: Comment[]
  attachments: Attachment[]
  route: Route
  filters: IssueFilters
  sortField: SortField
  sortDir: SortDir
  viewMode: 'board' | 'table'
  openIssueId: number | null
}

interface Store extends StoreState {
  login: (username: string, password: string) => Promise<string | null>
  register: (data: { firstName: string; lastName: string; username: string; mail: string; password: string }) => Promise<string | null>
  logout: () => void
  navigate: (r: Route) => void
  setFilters: (f: Partial<IssueFilters>) => void
  clearFilters: () => void
  setSort: (field: SortField, dir: SortDir) => void
  setViewMode: (m: 'board' | 'table') => void
  openIssue: (id: number | null) => void
  createIssue: (d: IssueDraft) => Promise<Issue>
  updateIssue: (id: number, d: Partial<IssueDraft>) => Promise<void>
  updateIssueStatus: (id: number, status: IssueStatus) => Promise<void>
  deleteIssue: (id: number) => Promise<void>
  addComment: (issueId: number, content: string, title?: string, parentCommentId?: number) => Promise<void>
  editComment: (id: number, content: string) => Promise<void>
  deleteComment: (id: number) => Promise<void>
  uploadAttachment: (issueId: number, file: File) => Promise<string | null>
  downloadAttachment: (a: Attachment) => Promise<void>
  deleteAttachment: (id: number) => Promise<void>
  createProject: (d: ProjectDraft) => Promise<Project>
  updateProject: (id: number, d: Partial<ProjectDraft>) => Promise<void>
  deleteProject: (id: number) => Promise<void>
  updateProfile: (d: { firstName: string; lastName: string; bio: string }) => Promise<void>
  uploadAvatar: (file: File) => Promise<string | null>
  changeUserRole: (uuid: string, role: Role) => Promise<void>
  getUser: (uuid: string) => User | undefined
  getProject: (id: number) => Project | undefined
}

const Ctx = createContext<Store | null>(null)

const emptyFilters: IssueFilters = { projectId: null, status: null, priority: null, assigneeUuid: null }

/* ---------------- route <-> path mapping (react-router adapter) ------------ */

function routeToPath(r: Route): string {
  switch (r.name) {
    case 'dashboard': return '/dashboard'
    case 'board': return '/board'
    case 'project': return `/projects/${r.projectId}`
    case 'team': return '/team'
    case 'profile': return '/profile'
    case 'user': return `/users/${r.uuid}`
    case 'admin-users': return '/admin/users'
  }
}

function pathToRoute(pathname: string): Route {
  const project = /^\/projects\/(\d+)/.exec(pathname)
  if (project) return { name: 'project', projectId: Number(project[1]) }
  const user = /^\/users\/([^/]+)/.exec(pathname)
  if (user) return { name: 'user', uuid: user[1] }
  if (pathname.startsWith('/board')) return { name: 'board' }
  if (pathname.startsWith('/team')) return { name: 'team' }
  if (pathname.startsWith('/profile')) return { name: 'profile' }
  if (pathname.startsWith('/admin/users')) return { name: 'admin-users' }
  return { name: 'dashboard' }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [ready, setReady] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [issues, setIssues] = useState<Issue[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [filters, setFiltersState] = useState<IssueFilters>(emptyFilters)
  const [sortField, setSortField] = useState<SortField>('updatedAt')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [viewMode, setViewMode] = useState<'board' | 'table'>('board')
  const [openIssueId, setOpenIssueId] = useState<number | null>(null)

  const routerNavigate = useNavigate()
  const location = useLocation()
  const route = useMemo<Route>(() => pathToRoute(location.pathname), [location.pathname])

  const getUser = useCallback((uuid: string) => users.find((u) => u.uuid === uuid), [users])
  const getProject = useCallback((id: number) => projects.find((p) => p.id === id), [projects])

  /* ---------------- data hydration ---------------- */

  const hydrate = useCallback(async (me: User) => {
    const directory = me.role === 'ADMIN'
      ? await api.fetchAllUsers()
      : (await api.searchUsers('', 0, 500)).content
    const [projectList, issueList] = await Promise.all([api.fetchProjects(), api.fetchAllIssues()])
    setUsers(directory)
    setProjects(projectList)
    setIssues(issueList)
    setReady(true)
  }, [])

  /* ---------------- auth ---------------- */

  const logout = useCallback(() => {
    const refreshToken = getStoredRefreshToken()
    clearStoredAuthToken()
    clearStoredRefreshToken()
    setCurrentUser(null)
    setReady(false)
    setUsers([]); setProjects([]); setIssues([]); setComments([]); setAttachments([])
    setOpenIssueId(null)
    resetUnauthorizedGuard()
    routerNavigate('/login', { replace: true })

    // Best-effort server-side revocation — the local session is already
    // cleared above either way.
    if (refreshToken) api.logoutRequest(refreshToken).catch(() => {})
  }, [routerNavigate])

  // A 401 that survives the silent refresh attempt (see utils/apiClient.ts)
  // triggers the exact same clean logout as the menu button.
  useEffect(() => {
    setUnauthorizedHandler(logout)
  }, [logout])

  // Session bootstrap: validate the persisted token once on mount.
  useEffect(() => {
    const token = getStoredAuthToken()
    if (!token) {
      setAuthLoading(false)
      return
    }
    api.fetchMyProfile()
      .then(async (me) => {
        setCurrentUser(me)
        await hydrate(me)
      })
      .catch(() => setCurrentUser(null))
      .finally(() => setAuthLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = useCallback(async (username: string, password: string) => {
    try {
      const res = await api.loginRequest({ username: username.trim(), password })
      setStoredAuthToken(res.token)
      setStoredRefreshToken(res.refreshToken)
      const me = await api.fetchMyProfile()
      setCurrentUser(me)
      await hydrate(me)
      routerNavigate('/dashboard')
      toast.success(`Welcome back, ${me.firstName}`)
      return null
    } catch (e) {
      return getErrorMessage(e, 'Invalid username or password. Please try again.')
    }
  }, [hydrate, routerNavigate])

  const register = useCallback(async (data: { firstName: string; lastName: string; username: string; mail: string; password: string }) => {
    try {
      const res = await api.registerRequest({
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        username: data.username.trim(),
        mail: data.mail.trim(),
        password: data.password,
      })
      setStoredAuthToken(res.token)
      setStoredRefreshToken(res.refreshToken)
      const me = await api.fetchMyProfile()
      setCurrentUser(me)
      await hydrate(me)
      routerNavigate('/dashboard')
      toast.success('Account created. Welcome to Ooredoo Issue Tracker.')
      return null
    } catch (e) {
      return getErrorMessage(e, 'Registration failed. Please try again.')
    }
  }, [hydrate, routerNavigate])

  /* ---------------- navigation & view state ---------------- */

  const navigate = useCallback((r: Route) => {
    setOpenIssueId(null)
    routerNavigate(routeToPath(r))
  }, [routerNavigate])

  const setFilters = useCallback((f: Partial<IssueFilters>) => setFiltersState((prev) => ({ ...prev, ...f })), [])
  const clearFilters = useCallback(() => setFiltersState(emptyFilters), [])
  const setSort = useCallback((field: SortField, dir: SortDir) => { setSortField(field); setSortDir(dir) }, [])
  const openIssue = useCallback((id: number | null) => {
    setOpenIssueId(id)
    if (id != null) {
      // Comments and attachments live on the detail endpoint — load them when
      // an issue is opened and merge everything into the local state.
      api.fetchIssueDetail(id)
        .then(({ issue, comments: cs, attachments: as_ }) => {
          setIssues((prev) => prev.some((i) => i.id === id) ? prev.map((i) => (i.id === id ? issue : i)) : [issue, ...prev])
          setComments((prev) => [...prev.filter((c) => c.issueId !== id), ...cs])
          setAttachments((prev) => [...prev.filter((a) => a.issueId !== id), ...as_])
        })
        .catch((e) => toast.error(getErrorMessage(e, 'Failed to load the issue details.')))
    }
  }, [])

  /* ---------------- issues ---------------- */

  const createIssue = useCallback(async (d: IssueDraft) => {
    const issue = await api.createIssue(d)
    setIssues((prev) => [issue, ...prev])
    toast.success(`Issue #${issue.id} created`)
    return issue
  }, [])

  const updateIssue = useCallback(async (id: number, d: Partial<IssueDraft>) => {
    // PUT /issues/{id} replaces the whole resource — merge with the local copy
    // so fields the form didn't touch are preserved.
    const before = issues.find((i) => i.id === id)
    const merged: api.IssueDraftPayload = {
      title: d.title ?? before?.title ?? '',
      description: d.description ?? before?.description ?? '',
      priority: d.priority ?? before?.priority ?? 'MEDIUM',
      projectId: d.projectId ?? before?.projectId ?? 0,
      assignedUuids: d.assignedUuids ?? before?.assignedUuids ?? [],
    }
    const issue = await api.updateIssue(id, merged)
    setIssues((prev) => prev.map((i) => (i.id === id ? issue : i)))
    toast.success(`Issue #${id} updated`)
  }, [issues])

  const updateIssueStatus = useCallback(async (id: number, status: IssueStatus) => {
    if (!currentUser) return
    const before = issues.find((i) => i.id === id)
    if (!before || before.status === status) return
    // Optimistic update — rolled back if PATCH /issues/{id}/status fails.
    const patch = (i: Issue): Issue => ({
      ...i, status, updatedAt: Date.now(),
      closedAt: status === 'DONE' ? Date.now() : undefined,
      closedByUuid: status === 'DONE' ? currentUser.uuid : undefined,
    })
    setIssues((prev) => prev.map((i) => (i.id === id ? patch(i) : i)))
    try {
      const saved = await api.updateIssueStatus(id, status)
      setIssues((prev) => prev.map((i) => (i.id === id ? saved : i)))
      toast.success(`Issue #${id} moved to ${status.replace('_', ' ')}`)
    } catch (e) {
      setIssues((prev) => prev.map((i) => (i.id === id ? before : i)))
      toast.error(getErrorMessage(e, 'Status update failed — the change was rolled back.'))
    }
  }, [currentUser, issues])

  const deleteIssue = useCallback(async (id: number) => {
    await api.deleteIssue(id)
    setIssues((prev) => prev.filter((i) => i.id !== id))
    setComments((prev) => prev.filter((c) => c.issueId !== id))
    setAttachments((prev) => prev.filter((a) => a.issueId !== id))
    setOpenIssueId(null)
    toast.success(`Issue #${id} deleted`)
  }, [])

  /* ---------------- comments ---------------- */

  const addComment = useCallback(async (issueId: number, content: string, title?: string, parentCommentId?: number) => {
    const c = await api.addComment(issueId, {
      title: title?.trim() ?? '',
      content,
      parentCommentId,
    })
    setComments((prev) => [...prev, c])
    setIssues((prev) => prev.map((i) => (i.id === issueId ? { ...i, updatedAt: Date.now() } : i)))
    toast.success('Comment posted')
  }, [])

  const editComment = useCallback(async (id: number, content: string) => {
    // The backend's updateComment replaces title+content — resend the existing
    // title so editing the body doesn't wipe it. issueId is @NotNull on the
    // backend's CommentDto, so it's included for validation.
    const existing = comments.find((c) => c.id === id)
    const saved = await api.editComment(id, { title: existing?.title ?? '', content, issueId: existing?.issueId ?? 0 })
    setComments((prev) => prev.map((c) => (c.id === id ? saved : c)))
    toast.success('Comment updated')
  }, [comments])

  const deleteComment = useCallback(async (id: number) => {
    await api.deleteComment(id)
    // Soft delete — stays visible in the thread as [comment deleted]
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, deleted: true, content: '' } : c)))
    toast.success('Comment deleted')
  }, [])

  /* ---------------- attachments ---------------- */

  const uploadAttachment = useCallback(async (issueId: number, file: File) => {
    if (file.size > 10 * 1024 * 1024) return 'File exceeds the 10 MB limit.'
    try {
      const a = await api.uploadAttachment(issueId, file)
      setAttachments((prev) => [...prev, a])
      toast.success(`${file.name} uploaded`)
      return null
    } catch (e) {
      return getErrorMessage(e, 'Upload failed. Please try again.')
    }
  }, [])

  const downloadAttachment = useCallback(async (a: Attachment) => {
    try {
      const blob = await api.fetchAttachmentContent(a.id)
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = a.fileName
      link.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      toast.error(getErrorMessage(e, 'Download failed. Please try again.'))
    }
  }, [])

  const deleteAttachment = useCallback(async (id: number) => {
    await api.deleteAttachment(id)
    setAttachments((prev) => prev.filter((a) => a.id !== id))
    toast.success('Attachment deleted')
  }, [])

  /* ---------------- projects ---------------- */

  const createProject = useCallback(async (d: ProjectDraft) => {
    const p = await api.createProject(d)
    setProjects((prev) => [...prev, p])
    toast.success(`Project "${d.title}" created`)
    return p
  }, [])

  const updateProject = useCallback(async (id: number, d: Partial<ProjectDraft>) => {
    const before = projects.find((p) => p.id === id)
    let saved: Project
    // Category changes go through the admin-only PATCH endpoint; everything
    // else through PUT /projects/{id} (which deliberately has no category).
    if (d.category != null && d.category !== before?.category) {
      saved = await api.updateProjectCategory(id, d.category)
    }
    const payload = {
      title: d.title ?? before?.title ?? '',
      description: d.description ?? before?.description ?? '',
      leaderUuid: d.leaderUuid ?? before?.leaderUuid ?? '',
    }
    saved = await api.updateProject(id, payload)
    setProjects((prev) => prev.map((p) => (p.id === id ? saved : p)))
    toast.success('Project updated')
  }, [projects])

  const deleteProject = useCallback(async (id: number) => {
    await api.deleteProject(id)
    setProjects((prev) => prev.filter((p) => p.id !== id))
    setIssues((prev) => prev.filter((i) => i.projectId !== id))
    routerNavigate('/dashboard')
    toast.success('Project deleted')
  }, [routerNavigate])

  /* ---------------- profile & users ---------------- */

  const updateProfile = useCallback(async (d: { firstName: string; lastName: string; bio: string }) => {
    if (!currentUser) return
    const me = await api.updateMyProfile(d)
    setCurrentUser(me)
    setUsers((prev) => prev.map((u) => (u.uuid === me.uuid ? me : u)))
    toast.success('Profile updated')
  }, [currentUser])

  const uploadAvatar = useCallback(async (file: File) => {
    if (!currentUser) return 'Not authenticated'
    if (file.size > 3 * 1024 * 1024) return 'Avatar exceeds the 3 MB limit.'
    if (!file.type.startsWith('image/')) return 'Avatar must be an image file.'
    try {
      const me = await api.uploadMyAvatar(file)
      setCurrentUser(me)
      setUsers((prev) => prev.map((u) => (u.uuid === me.uuid ? me : u)))
      toast.success('Avatar updated')
      return null
    } catch (e) {
      return getErrorMessage(e, 'Avatar upload failed. Please try again.')
    }
  }, [currentUser])

  const changeUserRole = useCallback(async (uuid: string, role: Role) => {
    const before = users.find((u) => u.uuid === uuid)
    if (!before) return
    // Optimistic update — rolled back if PATCH /users/{uuid}/role fails.
    setUsers((prev) => prev.map((u) => (u.uuid === uuid ? { ...u, role } : u)))
    try {
      const saved = await api.changeUserRole(uuid, role)
      setUsers((prev) => prev.map((u) => (u.uuid === uuid ? saved : u)))
      if (currentUser?.uuid === uuid) setCurrentUser(saved)
      toast.success(`${before.firstName} ${before.lastName} is now ${role}`)
    } catch (e) {
      setUsers((prev) => prev.map((u) => (u.uuid === uuid ? before : u)))
      toast.error(getErrorMessage(e, 'Role change failed — restored previous role.'))
    }
  }, [users, currentUser])

  const value = useMemo<Store>(() => ({
    currentUser, authLoading, ready, users, projects, issues, comments, attachments, route,
    filters, sortField, sortDir, viewMode, openIssueId,
    login, register, logout, navigate, setFilters, clearFilters, setSort, setViewMode, openIssue,
    createIssue, updateIssue, updateIssueStatus, deleteIssue,
    addComment, editComment, deleteComment,
    uploadAttachment, downloadAttachment, deleteAttachment,
    createProject, updateProject, deleteProject,
    updateProfile, uploadAvatar, changeUserRole,
    getUser, getProject,
  }), [currentUser, authLoading, ready, users, projects, issues, comments, attachments, route,
    filters, sortField, sortDir, viewMode, openIssueId,
    login, register, logout, navigate, setFilters, clearFilters, setSort, openIssue,
    createIssue, updateIssue, updateIssueStatus, deleteIssue, addComment, editComment, deleteComment,
    uploadAttachment, downloadAttachment, deleteAttachment, createProject, updateProject, deleteProject,
    updateProfile, uploadAvatar, changeUserRole, getUser, getProject])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore(): Store {
  const s = useContext(Ctx)
  if (!s) throw new Error('useStore must be used inside StoreProvider')
  return s
}
