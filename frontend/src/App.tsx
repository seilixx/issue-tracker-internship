import { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useStore } from '@/store/AppStore'
import { LoginPage, RegisterPage } from '@/pages/Auth'
import { DashboardPage } from '@/pages/Dashboard'
import { BoardPage } from '@/pages/BoardPage'
import { ProjectPage } from '@/pages/ProjectPage'
import { UserProfilePage } from '@/pages/Profiles'
import { IssueForm } from '@/components/IssueForm'
import { IssueDetailPanel } from '@/components/IssueDetail'
import { LogoLockup } from '@/components/bits'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'

function Splash({ label }: { label: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F7F8FA]">
      <LogoLockup />
      <div className="flex items-center gap-2 text-sm text-neutral-400">
        <Spinner className="size-4" /> {label}
      </div>
    </div>
  )
}

interface ShellContext {
  openCreate: (projectId?: number) => void
}

/**
 * Authenticated layout: gates on the session, holds the global Issue form /
 * detail overlays, and hands page-level "create issue" callbacks down through
 * the Outlet context.
 */
function Shell() {
  const s = useStore()
  const [issueFormOpen, setIssueFormOpen] = useState(false)
  const [editingIssueId, setEditingIssueId] = useState<number | null>(null)
  const [defaultProjectId, setDefaultProjectId] = useState<number | undefined>(undefined)

  // Issue Detail "Edit" button requests the form through this event
  useEffect(() => {
    const handler = (e: Event) => {
      setEditingIssueId((e as CustomEvent<number>).detail)
      setIssueFormOpen(true)
    }
    window.addEventListener('edit-issue', handler)
    return () => window.removeEventListener('edit-issue', handler)
  }, [])

  if (s.authLoading) return <Splash label="Checking your session…" />
  if (!s.currentUser) return <Navigate to="/login" replace />
  if (!s.ready) return <Splash label="Loading your workspace…" />

  const openCreate = (projectId?: number) => {
    setEditingIssueId(null)
    setDefaultProjectId(projectId)
    setIssueFormOpen(true)
  }

  const editingIssue = editingIssueId != null ? s.issues.find((i) => i.id === editingIssueId) : null
  const scopeProjectId = s.route.name === 'project' ? s.route.projectId : undefined

  return (
    <>
      <Outlet context={{ openCreate } satisfies ShellContext} />
      <IssueDetailPanel />
      <IssueForm
        open={issueFormOpen}
        onClose={() => { setIssueFormOpen(false); setEditingIssueId(null) }}
        issue={editingIssue ?? null}
        defaultProjectId={defaultProjectId ?? scopeProjectId}
      />
    </>
  )
}

/** /login and /register — bounce already-authenticated users to the dashboard. */
function AuthRoute({ view }: { view: 'login' | 'register' }) {
  const s = useStore()
  const navigate = useNavigate()
  if (s.authLoading) return <Splash label="Checking your session…" />
  if (s.currentUser) return <Navigate to="/dashboard" replace />
  return view === 'login'
    ? <LoginPage onSwitch={() => navigate('/register')} />
    : <RegisterPage onSwitch={() => navigate('/login')} />
}

/* ---- route wrappers: translate router params/context into page props ---- */

function DashboardRoute() {
  const { openCreate } = useOutletContext<ShellContext>()
  return <DashboardPage onCreateIssue={() => openCreate()} />
}

function BoardRoute() {
  const { openCreate } = useOutletContext<ShellContext>()
  return <BoardPage onCreateIssue={() => openCreate()} />
}

function ProjectRoute() {
  const { openCreate } = useOutletContext<ShellContext>()
  const { projectId } = useParams()
  const id = Number(projectId)
  return <ProjectPage projectId={id} onCreateIssue={() => openCreate(id)} />
}

function UserProfileRoute() {
  const { uuid } = useParams()
  return <UserProfilePage uuid={uuid!} />
}

/** Legacy /profile/:uuid bookmarks → /users/:uuid */
function LegacyProfileRedirect() {
  const { uuid } = useParams()
  return <Navigate to={`/users/${uuid}`} replace />
}

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#F7F8FA] px-6 text-center">
      <p className="text-lg font-bold text-neutral-800">Page not found</p>
      <p className="text-sm text-neutral-500">This page doesn't exist or may have been moved.</p>
      <Button size="sm" variant="outline" onClick={() => { window.location.href = '/dashboard' }}>Back to Dashboard</Button>
    </div>
  )
}

export {
  Shell,
  AuthRoute,
  DashboardRoute,
  BoardRoute,
  ProjectRoute,
  UserProfileRoute,
  LegacyProfileRedirect,
  NotFound,
}
