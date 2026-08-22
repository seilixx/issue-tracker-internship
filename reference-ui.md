# Ooredoo Issue Tracker — Complete Source Code
Exported 2026-08-22. 91 files.
## How to unpack
Save this file as `bundle.md`, then run:
```bash
python3 unpack.py bundle.md   # unpack.py is included at the very bottom of this file
npm install && npm run dev
```
---

## FILE: components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "postcss.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {}
}

```

## FILE: index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ooredoo Issue Tracker</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

## FILE: package.json

```json
{
  "name": "my-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@fontsource-variable/inter": "^5.3.0",
    "@hookform/resolvers": "^5.2.2",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-aspect-ratio": "^1.1.8",
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-collapsible": "^1.1.12",
    "@radix-ui/react-context-menu": "^2.2.16",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-hover-card": "^1.1.15",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-menubar": "^1.1.16",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.8",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slider": "^1.3.6",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-toggle": "^1.1.10",
    "@radix-ui/react-toggle-group": "^1.1.11",
    "@radix-ui/react-tooltip": "^1.2.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^4.1.0",
    "embla-carousel-react": "^8.6.0",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.562.0",
    "next-themes": "^0.4.6",
    "react": "^19.2.0",
    "react-day-picker": "^9.13.0",
    "react-dom": "^19.2.0",
    "react-hook-form": "^7.70.0",
    "react-resizable-panels": "^4.2.2",
    "react-router": "^7.6.1",
    "recharts": "^2.15.4",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.4.0",
    "vaul": "^1.1.2",
    "zod": "^4.3.5"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/node": "^24.10.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "autoprefixer": "^10.4.23",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "kimi-plugin-inspect-react": "^1.0.3",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.19",
    "tailwindcss-animate": "^1.0.7",
    "tw-animate-css": "^1.4.0",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.46.4",
    "vite": "^7.2.4"
  }
}

```

## FILE: postcss.config.js

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

## FILE: src/App.css

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

```

## FILE: src/App.tsx

```tsx
import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import { StoreProvider, useStore } from '@/store/AppStore'
import { LoginPage, RegisterPage } from '@/pages/Auth'
import { DashboardPage } from '@/pages/Dashboard'
import { BoardPage } from '@/pages/BoardPage'
import { ProjectPage } from '@/pages/ProjectPage'
import { TeamPage } from '@/pages/TeamPage'
import { MyProfilePage, UserProfilePage } from '@/pages/Profiles'
import { AdminUsersPage } from '@/pages/AdminUsers'
import { IssueForm } from '@/components/IssueForm'
import { IssueDetailPanel } from '@/components/IssueDetail'

function Shell() {
  const s = useStore()
  const [authView, setAuthView] = useState<'login' | 'register'>('login')
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

  if (!s.currentUser) {
    return authView === 'login'
      ? <LoginPage onSwitch={() => setAuthView('register')} />
      : <RegisterPage onSwitch={() => setAuthView('login')} />
  }

  const openCreate = (projectId?: number) => {
    setEditingIssueId(null)
    setDefaultProjectId(projectId)
    setIssueFormOpen(true)
  }

  const editingIssue = editingIssueId != null ? s.issues.find((i) => i.id === editingIssueId) : null
  const scopeProjectId = s.route.name === 'project' ? s.route.projectId : undefined

  let page: React.ReactNode
  switch (s.route.name) {
    case 'dashboard': page = <DashboardPage onCreateIssue={() => openCreate()} />; break
    case 'board': page = <BoardPage onCreateIssue={() => openCreate()} />; break
    case 'project': page = <ProjectPage projectId={s.route.projectId} onCreateIssue={() => openCreate(s.route.name === 'project' ? s.route.projectId : undefined)} />; break
    case 'team': page = <TeamPage />; break
    case 'profile': page = <MyProfilePage />; break
    case 'user': page = <UserProfilePage uuid={s.route.uuid} />; break
    case 'admin-users': page = <AdminUsersPage />; break
  }

  return (
    <>
      {page}
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

export default function App() {
  return (
    <StoreProvider>
      <Shell />
      <Toaster position="bottom-right" richColors closeButton />
    </StoreProvider>
  )
}

```

## FILE: src/components/AppShell.tsx

```tsx
import React, { useState } from 'react'
import {
  ChevronDown, ChevronsRight, FolderKanban, LayoutDashboard,
  LayoutGrid, LogOut, Menu, PanelLeftClose, Plus, ShieldCheck, User as UserIcon, Users,
} from 'lucide-react'
import { useStore } from '@/store/AppStore'
import { LogoLockup, RoleBadge, UserAvatar } from '@/components/bits'
import { CATEGORY_LABEL, CATEGORY_ORDER } from '@/lib/helpers'
import { isAdmin } from '@/lib/permissions'
import { cn } from '@/lib/utils'
import type { Route } from '@/types'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { isStaff } from '@/lib/permissions'
import { ProjectFormDialog } from '@/components/ProjectForm'

function NavItem({ icon, label, active, collapsed, onClick }: {
  icon: React.ReactNode; label: string; active: boolean; collapsed: boolean; onClick: () => void
}) {
  const btn = (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors',
        active ? 'bg-[#E60012]/8 font-semibold text-[#B0000E] ring-1 ring-inset ring-[#E60012]/15' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
        collapsed && 'justify-center px-0',
      )}
    >
      <span className={cn('shrink-0', active ? 'text-[#E60012]' : 'text-neutral-400')}>{icon}</span>
      {!collapsed && <span className="truncate">{label}</span>}
      {active && !collapsed && <span className="ml-auto size-1.5 rounded-full bg-[#E60012]" />}
    </button>
  )
  if (!collapsed) return btn
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>{btn}</TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function SidebarSection({ title, collapsed }: { title: string; collapsed: boolean }) {
  if (collapsed) return <div className="mx-auto my-3 h-px w-6 bg-neutral-200" />
  return <p className="px-2.5 pb-1.5 pt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">{title}</p>
}

function ProjectGroup({ category, collapsed, currentRoute }: { category: typeof CATEGORY_ORDER[number]; collapsed: boolean; currentRoute: Route }) {
  const s = useStore()
  const [open, setOpen] = useState(true)
  const projects = s.projects.filter((p) => p.category === category)
  if (projects.length === 0) return null
  if (collapsed) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="flex w-full items-center justify-center rounded-lg px-0 py-2 text-neutral-500 hover:bg-neutral-100" onClick={() => s.navigate({ name: 'project', projectId: projects[0].id })}>
              <FolderKanban className="size-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">{CATEGORY_LABEL[category]} projects</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="flex w-full items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 hover:text-neutral-600">
        <ChevronDown className={cn('size-3 transition-transform', !open && '-rotate-90')} />
        {CATEGORY_LABEL[category]}
        <span className="ml-auto font-semibold">{projects.length}</span>
      </button>
      {open && projects.map((p) => {
        const active = currentRoute.name === 'project' && currentRoute.projectId === p.id
        const count = s.issues.filter((i) => i.projectId === p.id && i.status !== 'DONE').length
        return (
          <button
            key={p.id}
            onClick={() => s.navigate({ name: 'project', projectId: p.id })}
            className={cn(
              'mt-0.5 flex w-full items-center gap-2 rounded-lg py-1.5 pl-6 pr-2.5 text-[13px] transition-colors',
              active ? 'bg-[#E60012]/8 font-semibold text-[#B0000E]' : 'text-neutral-600 hover:bg-neutral-100',
            )}
          >
            <span className="truncate">{p.title}</span>
            {count > 0 && <span className="ml-auto rounded-md bg-neutral-100 px-1.5 text-[10px] font-semibold text-neutral-500">{count}</span>}
          </button>
        )
      })}
    </div>
  )
}

export function AppShell({ children, title, breadcrumb, primaryAction }: {
  children: React.ReactNode
  title: string
  breadcrumb?: string
  primaryAction?: React.ReactNode
}) {
  const s = useStore()
  const me = s.currentUser!
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [createProjectOpen, setCreateProjectOpen] = useState(false)

  const nav = (r: Route) => { s.navigate(r); setMobileOpen(false) }

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className={cn('flex items-center justify-between px-4 py-4', collapsed && 'justify-center px-2')}>
        <LogoLockup collapsed={collapsed} />
        {!collapsed && (
          <button onClick={() => setCollapsed(true)} className="hidden rounded-md p-1.5 text-neutral-400 hover:bg-neutral-100 lg:block" aria-label="Collapse sidebar">
            <PanelLeftClose className="size-4" />
          </button>
        )}
      </div>
      <div className="scrollbar-thin flex-1 overflow-y-auto px-3 pb-2">
        <SidebarSection title="Main" collapsed={collapsed} />
        <div className="space-y-0.5">
          <NavItem icon={<LayoutDashboard className="size-4" />} label="Dashboard" active={s.route.name === 'dashboard'} collapsed={collapsed} onClick={() => nav({ name: 'dashboard' })} />
          <NavItem icon={<LayoutGrid className="size-4" />} label="Issue Board" active={s.route.name === 'board'} collapsed={collapsed} onClick={() => nav({ name: 'board' })} />
          <NavItem icon={<Users className="size-4" />} label="Team" active={s.route.name === 'team'} collapsed={collapsed} onClick={() => nav({ name: 'team' })} />
        </div>
        {collapsed ? (
          <div className="mx-auto my-3 h-px w-6 bg-neutral-200" />
        ) : (
          <div className="flex items-center justify-between px-2.5 pb-1.5 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Projects</p>
            {isStaff(me) && (
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button onClick={() => setCreateProjectOpen(true)} className="rounded-md p-1 text-neutral-400 hover:bg-neutral-100 hover:text-[#E60012]" aria-label="Create project">
                      <Plus className="size-3.5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Create Project</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}
        <div className="space-y-1">
          {CATEGORY_ORDER.map((c) => <ProjectGroup key={c} category={c} collapsed={collapsed} currentRoute={s.route} />)}
        </div>
        <SidebarSection title="Settings" collapsed={collapsed} />
        <NavItem icon={<UserIcon className="size-4" />} label="My Profile" active={s.route.name === 'profile'} collapsed={collapsed} onClick={() => nav({ name: 'profile' })} />
        {isAdmin(me) && (
          <>
            <SidebarSection title="Admin" collapsed={collapsed} />
            <NavItem icon={<ShieldCheck className="size-4" />} label="User Management" active={s.route.name === 'admin-users'} collapsed={collapsed} onClick={() => nav({ name: 'admin-users' })} />
          </>
        )}
      </div>
      {/* user footer */}
      <div className={cn('border-t border-neutral-100 p-3', collapsed && 'flex justify-center px-2')}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={cn('flex w-full items-center gap-2.5 rounded-lg p-1.5 hover:bg-neutral-100', collapsed && 'w-auto justify-center')}>
              <UserAvatar user={me} size="md" />
              {!collapsed && (
                <>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block truncate text-[13px] font-semibold text-neutral-800">{me.firstName} {me.lastName}</span>
                    <span className="block text-[11px] text-neutral-400">@{me.username}</span>
                  </span>
                  <RoleBadge role={me.role} />
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-52">
            <DropdownMenuItem onClick={() => nav({ name: 'profile' })}><UserIcon className="size-4" /> My Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={s.logout} className="text-[#B0000E] focus:text-[#B0000E]"><LogOut className="size-4" /> Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-[#F7F8FA]">
      {/* desktop sidebar */}
      <aside className={cn('hidden shrink-0 border-r border-neutral-200 bg-white transition-all duration-200 lg:block', collapsed ? 'w-16' : 'w-64')}>
        {sidebarContent}
      </aside>
      {/* mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 border-r border-neutral-200 bg-white">{sidebarContent}</aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* header */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-neutral-200 bg-white px-4 lg:px-6">
          <button className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </button>
          {collapsed && (
            <button className="hidden rounded-md p-1.5 text-neutral-400 hover:bg-neutral-100 lg:block" onClick={() => setCollapsed(false)} aria-label="Expand sidebar">
              <ChevronsRight className="size-4" />
            </button>
          )}
          <div className="min-w-0">
            {breadcrumb && <p className="truncate text-[11px] font-medium text-neutral-400">{breadcrumb}</p>}
            <h1 className="truncate text-[15px] font-bold tracking-tight text-neutral-900">{title}</h1>
          </div>
          <div className="ml-auto flex items-center gap-2.5">
            {primaryAction}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full ring-[#E60012]/30 transition hover:ring-2"><UserAvatar user={me} size="md" /></button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2.5 px-2 py-2">
                  <UserAvatar user={me} size="md" />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold">{me.firstName} {me.lastName}</p>
                    <RoleBadge role={me.role} className="mt-0.5" />
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => nav({ name: 'profile' })}><UserIcon className="size-4" /> My Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={s.logout} className="text-[#B0000E] focus:text-[#B0000E]"><LogOut className="size-4" /> Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="scrollbar-thin min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>
      <ProjectFormDialog open={createProjectOpen} onClose={() => setCreateProjectOpen(false)} />
    </div>
  )
}

export function CreateIssueButton({ onClick, label = 'Create Issue' }: { onClick: () => void; label?: string }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 rounded-lg bg-[#E60012] px-3 py-2 text-[13px] font-semibold text-white shadow-xs transition hover:bg-[#B0000E]">
      <Plus className="size-4" /> {label}
    </button>
  )
}

```

## FILE: src/components/AssigneePicker.tsx

```tsx
import { useMemo, useState } from 'react'
import { Check, ChevronsUpDown, Search, X } from 'lucide-react'
import { useStore } from '@/store/AppStore'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { UserAvatar } from '@/components/bits'
import { cn } from '@/lib/utils'

export function AssigneePicker({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const s = useStore()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')

  const results = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return s.users
    return s.users.filter((u) =>
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(query) || u.username.toLowerCase().includes(query))
  }, [s.users, q])

  const toggle = (uuid: string) => {
    onChange(value.includes(uuid) ? value.filter((v) => v !== uuid) : [...value, uuid])
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" className="flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-white px-2.5 py-1.5 text-left text-sm shadow-xs hover:border-neutral-300">
          {value.length === 0 && <span className="text-neutral-400">Search team members…</span>}
          {value.map((uuid) => {
            const u = s.getUser(uuid)
            if (!u) return null
            return (
              <span key={uuid} className="flex items-center gap-1.5 rounded-md bg-neutral-100 py-0.5 pl-1 pr-1.5 text-xs font-medium text-neutral-700">
                <UserAvatar user={u} size="xs" />
                {u.firstName} {u.lastName}
                <X className="size-3 cursor-pointer text-neutral-400 hover:text-neutral-700" onClick={(e) => { e.stopPropagation(); toggle(uuid) }} />
              </span>
            )
          })}
          <ChevronsUpDown className="ml-auto size-3.5 shrink-0 text-neutral-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        <div className="flex items-center gap-2 border-b border-neutral-100 px-3 py-2">
          <Search className="size-4 text-neutral-400" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or username…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
          />
        </div>
        <div className="scrollbar-thin max-h-56 overflow-y-auto p-1">
          {results.length === 0 && <p className="px-3 py-4 text-center text-xs text-neutral-400">No team members found.</p>}
          {results.map((u) => {
            const selected = value.includes(u.uuid)
            return (
              <button
                key={u.uuid}
                type="button"
                onClick={() => toggle(u.uuid)}
                className={cn('flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left hover:bg-neutral-100', selected && 'bg-neutral-50')}
              >
                <UserAvatar user={u} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium text-neutral-800">{u.firstName} {u.lastName}</span>
                  <span className="block truncate text-[11px] text-neutral-400">@{u.username}</span>
                </span>
                {selected && <Check className="size-4 text-[#E60012]" />}
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

```

## FILE: src/components/FilterBar.tsx

```tsx
import { ArrowUpDown, LayoutGrid, RotateCcw, Table2, X } from 'lucide-react'
import { useStore } from '@/store/AppStore'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { SortDirIcon, UserAvatar } from '@/components/bits'
import { activeFilterCount } from '@/lib/issueQuery'
import { CATEGORY_ORDER, PRIORITY_LABEL, PRIORITY_ORDER, STATUS_LABEL, STATUS_ORDER, CATEGORY_LABEL } from '@/lib/helpers'
import type { SortField } from '@/types'

const sortOptions: { value: SortField; label: string }[] = [
  { value: 'updatedAt', label: 'Last updated' },
  { value: 'createdAt', label: 'Created date' },
  { value: 'status', label: 'Status' },
  { value: 'priority', label: 'Priority' },
]

export function FilterBar({ scopeProjectId }: { scopeProjectId?: number }) {
  const s = useStore()
  const count = activeFilterCount(s.filters, scopeProjectId)

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Board / Table switcher */}
      <div className="flex rounded-lg border border-neutral-200 bg-white p-0.5 shadow-xs">
        <button
          onClick={() => s.setViewMode('board')}
          className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${s.viewMode === 'board' ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:text-neutral-800'}`}
        >
          <LayoutGrid className="size-3.5" /> Board
        </button>
        <button
          onClick={() => s.setViewMode('table')}
          className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${s.viewMode === 'table' ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:text-neutral-800'}`}
        >
          <Table2 className="size-3.5" /> Table
        </button>
      </div>

      <div className="mx-1 hidden h-5 w-px bg-neutral-200 sm:block" />

      {scopeProjectId == null && (
        <Select value={s.filters.projectId == null ? 'all' : String(s.filters.projectId)} onValueChange={(v) => s.setFilters({ projectId: v === 'all' ? null : Number(v) })}>
          <SelectTrigger className="h-8 w-auto gap-1.5 bg-white text-xs shadow-xs"><SelectValue placeholder="All Projects" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            {CATEGORY_ORDER.map((cat) => (
              <div key={cat}>
                <div className="px-2 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">{CATEGORY_LABEL[cat]}</div>
                {s.projects.filter((p) => p.category === cat).map((p) => (
                  <SelectItem key={p.id} value={String(p.id)}>{p.title}</SelectItem>
                ))}
              </div>
            ))}
          </SelectContent>
        </Select>
      )}

      <Select value={s.filters.status ?? 'all'} onValueChange={(v) => s.setFilters({ status: v === 'all' ? null : (v as never) })}>
        <SelectTrigger className="h-8 w-auto gap-1.5 bg-white text-xs shadow-xs"><SelectValue placeholder="All Statuses" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {STATUS_ORDER.map((st) => <SelectItem key={st} value={st}>{STATUS_LABEL[st]}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={s.filters.priority ?? 'all'} onValueChange={(v) => s.setFilters({ priority: v === 'all' ? null : (v as never) })}>
        <SelectTrigger className="h-8 w-auto gap-1.5 bg-white text-xs shadow-xs"><SelectValue placeholder="All Priorities" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          {PRIORITY_ORDER.map((p) => <SelectItem key={p} value={p}>{PRIORITY_LABEL[p]}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={s.filters.assigneeUuid ?? 'all'} onValueChange={(v) => s.setFilters({ assigneeUuid: v === 'all' ? null : v })}>
        <SelectTrigger className="h-8 w-auto gap-1.5 bg-white text-xs shadow-xs"><SelectValue placeholder="Assignee" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any Assignee</SelectItem>
          {s.users.map((u) => (
            <SelectItem key={u.uuid} value={u.uuid}>
              <span className="flex items-center gap-2"><UserAvatar user={u} size="xs" /> {u.firstName} {u.lastName}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="mx-1 hidden h-5 w-px bg-neutral-200 sm:block" />

      <Select value={s.sortField} onValueChange={(v) => s.setSort(v as SortField, s.sortDir)}>
        <SelectTrigger className="h-8 w-auto gap-1.5 bg-white text-xs shadow-xs">
          <ArrowUpDown className="size-3.5 text-neutral-400" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
        </SelectContent>
      </Select>
      <Button variant="outline" size="icon-sm" className="bg-white shadow-xs" onClick={() => s.setSort(s.sortField, s.sortDir === 'asc' ? 'desc' : 'asc')} aria-label="Toggle sort direction">
        <SortDirIcon dir={s.sortDir} />
      </Button>

      {count > 0 && (
        <Button variant="ghost" size="sm" className="h-8 text-xs text-neutral-500" onClick={s.clearFilters}>
          <RotateCcw className="size-3.5" /> Clear filters
          <span className="ml-1 inline-flex size-4 items-center justify-center rounded-full bg-[#E60012] text-[10px] font-bold text-white">{count}</span>
        </Button>
      )}

      {count > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {s.filters.priority && (
            <button onClick={() => s.setFilters({ priority: null })} className="flex items-center gap-1 rounded-md bg-orange-50 px-2 py-1 text-[11px] font-semibold text-orange-700 ring-1 ring-inset ring-orange-600/20 hover:bg-orange-100">
              {PRIORITY_LABEL[s.filters.priority]} <X className="size-3" />
            </button>
          )}
          {s.filters.status && (
            <button onClick={() => s.setFilters({ status: null })} className="flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20 hover:bg-blue-100">
              {STATUS_LABEL[s.filters.status]} <X className="size-3" />
            </button>
          )}
          {s.filters.assigneeUuid && (
            <button onClick={() => s.setFilters({ assigneeUuid: null })} className="flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-semibold text-neutral-600 ring-1 ring-inset ring-neutral-500/20 hover:bg-neutral-200">
              @{s.getUser(s.filters.assigneeUuid)?.username} <X className="size-3" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

```

## FILE: src/components/IssueDetail.tsx

```tsx
import React, { useMemo, useRef, useState } from 'react'
import {
  CalendarDays, CheckCircle2, Download, Lock, MessageSquare, Paperclip, Pencil, Reply,
  Trash2, Upload, X,
} from 'lucide-react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Spinner } from '@/components/ui/spinner'
import { useStore } from '@/store/AppStore'
import { AvatarGroup, CategoryBadge, FileTypeIcon, PriorityBadge, StatusBadge, UserAvatar } from '@/components/bits'
import { formatBytes, formatDate, STATUS_LABEL, STATUS_ORDER, timeAgo } from '@/lib/helpers'
import { canChangeStatus, canDeleteAttachment, canDeleteComment, canDeleteIssue, canEditComment, canEditIssue, canUploadAttachment } from '@/lib/permissions'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import type { Comment, Issue, IssueStatus } from '@/types'

/* ---------------- Comments ---------------- */
function CommentItem({ c, depth, issueId }: { c: Comment; depth: number; issueId: number }) {
  const s = useStore()
  const author = s.getUser(c.authorUuid)
  const [replying, setReplying] = useState(false)
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const me = s.currentUser!

  const submit = async (fn: () => Promise<void>) => {
    setBusy(true)
    try { await fn(); setReplying(false); setEditing(false); setText('') } finally { setBusy(false) }
  }

  return (
    <div className={cn(depth > 0 && 'ml-6 border-l-2 border-neutral-100 pl-4')}>
      <div className="flex items-start gap-2.5">
        {author ? <UserAvatar user={author} size="sm" /> : <div className="size-7 rounded-full bg-neutral-200" />}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <button className="text-[13px] font-semibold text-neutral-800 hover:underline" onClick={() => author && s.navigate({ name: 'user', uuid: author.uuid })}>
              {author ? `${author.firstName} ${author.lastName}` : `@${c.authorUserName}`}
            </button>
            <span className="text-[11px] text-neutral-400">{timeAgo(c.createdAt)}</span>
          </div>
          {c.deleted ? (
            <p className="mt-1 rounded-md bg-neutral-50 px-2.5 py-1.5 text-[13px] italic text-neutral-400">[comment deleted]</p>
          ) : editing ? (
            <div className="mt-1.5 space-y-2">
              <Textarea rows={3} value={text} onChange={(e) => setText(e.target.value)} autoFocus />
              <div className="flex gap-2">
                <Button size="sm" disabled={busy || !text.trim()} onClick={() => submit(() => s.editComment(c.id, text.trim()))}>
                  {busy && <Spinner className="size-3.5" />} Save
                </Button>
                <Button size="sm" variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <>
              {c.title && <p className="mt-0.5 text-[13px] font-semibold text-neutral-700">{c.title}</p>}
              <p className="mt-0.5 whitespace-pre-wrap text-[13px] leading-relaxed text-neutral-600">{c.content}</p>
              <div className="mt-1 flex items-center gap-1">
                {depth === 0 && (
                  <button onClick={() => { setReplying(true); setText('') }} className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-medium text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700">
                    <Reply className="size-3" /> Reply
                  </button>
                )}
                {canEditComment(me, c) && (
                  <button onClick={() => { setEditing(true); setText(c.content) }} className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-medium text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700">
                    <Pencil className="size-3" /> Edit
                  </button>
                )}
                {canDeleteComment(me, c) && (
                  <button onClick={() => s.deleteComment(c.id)} className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-medium text-neutral-400 hover:bg-red-50 hover:text-[#B0000E]">
                    <Trash2 className="size-3" /> Delete
                  </button>
                )}
              </div>
            </>
          )}
          {replying && (
            <div className="mt-2 space-y-2">
              <Textarea rows={2} value={text} onChange={(e) => setText(e.target.value)} placeholder={`Reply to @${c.authorUserName}…`} autoFocus />
              <div className="flex gap-2">
                <Button size="sm" disabled={busy || !text.trim()} onClick={() => submit(() => s.addComment(issueId, text.trim(), undefined, c.id))}>
                  {busy && <Spinner className="size-3.5" />} Reply
                </Button>
                <Button size="sm" variant="outline" onClick={() => setReplying(false)}>Cancel</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function CommentsSection({ issue }: { issue: Issue }) {
  const s = useStore()
  const list = s.comments.filter((c) => c.issueId === issue.id)
  const roots = list.filter((c) => !c.parentCommentId)
  const repliesOf = (id: number) => list.filter((c) => c.parentCommentId === id)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [busy, setBusy] = useState(false)

  return (
    <section>
      <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-900">
        <MessageSquare className="size-4 text-neutral-400" /> Comments
        <span className="rounded-md bg-neutral-100 px-1.5 py-0.5 text-[11px] font-semibold text-neutral-500">{list.filter((c) => !c.deleted).length}</span>
      </h3>
      <div className="mt-3 space-y-5">
        {roots.length === 0 && <p className="rounded-lg border border-dashed border-neutral-200 px-4 py-6 text-center text-xs text-neutral-400">No comments yet. Start the discussion below.</p>}
        {roots.map((c) => (
          <div key={c.id} className="space-y-4">
            <CommentItem c={c} depth={0} issueId={issue.id} />
            {repliesOf(c.id).map((r) => <CommentItem key={r.id} c={r} depth={1} issueId={issue.id} />)}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50/60 p-3">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Comment title (optional)" className="mb-2 bg-white text-[13px]" />
        <Textarea rows={3} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write a comment…" className="bg-white text-[13px]" />
        <div className="mt-2 flex justify-end">
          <Button size="sm" disabled={busy || !content.trim()} onClick={async () => {
            setBusy(true)
            try { await s.addComment(issue.id, content.trim(), title); setTitle(''); setContent('') } finally { setBusy(false) }
          }}>
            {busy && <Spinner className="size-3.5" />} Comment
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Attachments ---------------- */
function AttachmentsSection({ issue }: { issue: Issue }) {
  const s = useStore()
  const me = s.currentUser!
  const list = s.attachments.filter((a) => a.issueId === issue.id)
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const canUpload = canUploadAttachment(me, issue)

  const handleFile = async (f: File) => {
    setUploading(true); setError(null)
    const err = await s.uploadAttachment(issue.id, f)
    setUploading(false)
    if (err) setError(err)
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-900">
          <Paperclip className="size-4 text-neutral-400" /> Attachments
          <span className="rounded-md bg-neutral-100 px-1.5 py-0.5 text-[11px] font-semibold text-neutral-500">{list.length}</span>
        </h3>
        {canUpload && (
          <>
            <input ref={fileRef} type="file" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = '' }} />
            <Button size="sm" variant="outline" disabled={uploading} onClick={() => fileRef.current?.click()}>
              {uploading ? <Spinner className="size-3.5" /> : <Upload className="size-3.5" />}
              {uploading ? 'Uploading…' : 'Upload'}
            </Button>
          </>
        )}
      </div>
      {error && <p className="mt-2 rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-[#B0000E] ring-1 ring-inset ring-[#E60012]/20">{error}</p>}
      <div className="mt-3 space-y-1.5">
        {list.length === 0 && !uploading && (
          <p className="rounded-lg border border-dashed border-neutral-200 px-4 py-6 text-center text-xs text-neutral-400">
            {canUpload ? 'No attachments yet. Upload files up to 10 MB.' : 'No attachments.'}
          </p>
        )}
        {list.map((a) => {
          const uploader = s.getUser(a.uploadedByUuid)
          return (
            <div key={a.id} className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-3 py-2">
              <div className="flex size-9 items-center justify-center rounded-md bg-neutral-50 ring-1 ring-neutral-100"><FileTypeIcon contentType={a.contentType} /></div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-neutral-800">{a.fileName}</p>
                <p className="text-[11px] text-neutral-400">{formatBytes(a.sizeBytes)} · {uploader ? `@${uploader.username}` : 'unknown'} · {timeAgo(a.uploadedAt)}</p>
              </div>
              <TooltipProvider delayDuration={150}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="rounded-md p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700" onClick={() => {
                      if (a.dataUrl) {
                        const link = document.createElement('a')
                        link.href = a.dataUrl; link.download = a.fileName; link.click()
                      } else {
                        toast.info(`In production this downloads via GET /api/attachments/${a.id}/content`)
                      }
                    }}>
                      <Download className="size-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Download</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {canDeleteAttachment(me, issue, a.uploadedByUuid) && (
                <button className="rounded-md p-1.5 text-neutral-400 hover:bg-red-50 hover:text-[#B0000E]" onClick={() => s.deleteAttachment(a.id)}>
                  <Trash2 className="size-4" />
                </button>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ---------------- Main panel ---------------- */
export function IssueDetailPanel() {
  const s = useStore()
  const issue = s.issues.find((i) => i.id === s.openIssueId)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const me = s.currentUser

  const meta = useMemo(() => {
    if (!issue || !me) return null
    const project = s.getProject(issue.projectId)
    const creator = s.getUser(issue.creatorUuid)
    const closedBy = issue.closedByUuid ? s.getUser(issue.closedByUuid) : undefined
    const assignees = issue.assignedUuids.map((u) => s.getUser(u)).filter(Boolean) as NonNullable<ReturnType<typeof s.getUser>>[]
    return { project, creator, closedBy, assignees }
  }, [issue, me, s])

  if (!me) return null

  return (
    <Sheet open={s.openIssueId != null} onOpenChange={(v) => !v && s.openIssue(null)}>
      <SheetContent side="right" className="w-full gap-0 overflow-y-auto p-0 sm:max-w-2xl">
        {!issue || !meta ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-10 text-center">
            <p className="text-sm font-semibold text-neutral-700">Issue not found</p>
            <p className="text-xs text-neutral-400">It may have been deleted.</p>
            <Button size="sm" variant="outline" className="mt-2" onClick={() => s.openIssue(null)}>Close</Button>
          </div>
        ) : (
          <>
            {/* Sticky header */}
            <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-neutral-200 bg-white/95 px-5 py-3 backdrop-blur">
              <span className="font-mono text-xs font-semibold text-neutral-400">#{issue.id}</span>
              <StatusBadge status={issue.status} />
              <div className="ml-auto flex items-center gap-1.5">
                {canEditIssue(me, issue) && (
                  <Button size="sm" variant="outline" onClick={() => window.dispatchEvent(new CustomEvent('edit-issue', { detail: issue.id }))}>
                    <Pencil className="size-3.5" /> Edit
                  </Button>
                )}
                {canDeleteIssue(me) && (
                  <Button size="sm" variant="outline" className="text-[#B0000E] hover:bg-red-50" onClick={() => setConfirmDelete(true)}>
                    <Trash2 className="size-3.5" /> Delete
                  </Button>
                )}
                <Button size="icon-sm" variant="ghost" onClick={() => s.openIssue(null)} aria-label="Close"><X className="size-4" /></Button>
              </div>
            </div>

            <div className="space-y-6 px-5 py-5">
              {issue.status === 'DONE' && (
                <div className="flex items-start gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  <div>
                    <p className="text-[13px] font-semibold text-emerald-800">This issue is done</p>
                    <p className="text-xs text-emerald-700">
                      Closed {issue.closedAt ? timeAgo(issue.closedAt) : ''}{meta.closedBy ? ` by ${meta.closedBy.firstName} ${meta.closedBy.lastName}` : ''}. Content and attachments are locked; comments remain readable.
                    </p>
                  </div>
                </div>
              )}

              <div>
                <h2 className={cn('text-lg font-bold leading-snug text-neutral-900', issue.status === 'DONE' && 'text-neutral-500')}>{issue.title}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <PriorityBadge priority={issue.priority} />
                  {meta.project && (
                    <button onClick={() => s.navigate({ name: 'project', projectId: meta.project!.id })} className="flex items-center gap-1.5 rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-medium text-neutral-600 hover:bg-neutral-200">
                      {meta.project.title} <CategoryBadge category={meta.project.category} />
                    </button>
                  )}
                </div>
              </div>

              {/* Metadata grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-neutral-200 bg-neutral-50/60 p-4 sm:grid-cols-3">
                <Meta label="Status">
                  {canChangeStatus(me, issue) ? (
                    <Select value={issue.status} onValueChange={(v) => s.updateIssueStatus(issue.id, v as IssueStatus)}>
                      <SelectTrigger className="h-7 w-full bg-white text-xs shadow-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {STATUS_ORDER.map((st) => <SelectItem key={st} value={st}>{STATUS_LABEL[st]}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  ) : (
                    <TooltipProvider delayDuration={150}>
                      <Tooltip>
                        <TooltipTrigger asChild><span className="inline-flex items-center gap-1.5"><StatusBadge status={issue.status} /><Lock className="size-3 text-neutral-300" /></span></TooltipTrigger>
                        <TooltipContent>You don't have permission to change this status.</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </Meta>
                <Meta label="Creator">
                  <span className="flex items-center gap-1.5 text-xs text-neutral-700">
                    {meta.creator && <UserAvatar user={meta.creator} size="xs" />} @{meta.creator?.username ?? 'unknown'}
                  </span>
                </Meta>
                <Meta label="Assignees">
                  {meta.assignees.length ? <AvatarGroup users={meta.assignees} max={4} /> : <span className="text-xs text-neutral-400">Unassigned</span>}
                </Meta>
                <Meta label="Created"><MetaDate ts={issue.createdAt} /></Meta>
                <Meta label="Updated"><MetaDate ts={issue.updatedAt} /></Meta>
                {issue.closedAt && <Meta label="Closed"><MetaDate ts={issue.closedAt} /></Meta>}
              </div>

              <section>
                <h3 className="text-sm font-bold text-neutral-900">Description</h3>
                <p className="mt-2 whitespace-pre-wrap text-[13px] leading-relaxed text-neutral-600">{issue.description}</p>
              </section>

              <Separator />
              <AttachmentsSection issue={issue} />
              <Separator />
              <CommentsSection issue={issue} />
            </div>
          </>
        )}
      </SheetContent>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete issue #{issue?.id}?</AlertDialogTitle>
            <AlertDialogDescription>This permanently deletes the issue along with its comments and attachments. This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-[#E60012] hover:bg-[#B0000E]" onClick={() => issue && s.deleteIssue(issue.id)}>Delete Issue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sheet>
  )
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{label}</p>
      <div className="mt-1">{children}</div>
    </div>
  )
}

function MetaDate({ ts }: { ts: number }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-neutral-600">
      <CalendarDays className="size-3.5 text-neutral-400" /> {formatDate(ts)}
    </span>
  )
}

```

## FILE: src/components/IssueForm.tsx

```tsx
import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { AssigneePicker } from '@/components/AssigneePicker'
import { useStore } from '@/store/AppStore'
import { PRIORITY_LABEL, PRIORITY_ORDER } from '@/lib/helpers'
import type { Issue, Priority } from '@/types'

export function IssueForm({ open, onClose, issue, defaultProjectId }: {
  open: boolean
  onClose: () => void
  issue?: Issue | null
  defaultProjectId?: number
}) {
  const s = useStore()
  const editing = !!issue
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [projectId, setProjectId] = useState<number>(defaultProjectId ?? s.projects[0]?.id ?? 0)
  const [priority, setPriority] = useState<Priority>('MEDIUM')
  const [assigned, setAssigned] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (open) {
      setTitle(issue?.title ?? '')
      setDescription(issue?.description ?? '')
      setProjectId(issue?.projectId ?? defaultProjectId ?? s.projects[0]?.id ?? 0)
      setPriority(issue?.priority ?? 'MEDIUM')
      setAssigned(issue?.assignedUuids ?? [])
      setErrors({})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, issue])

  const validate = () => {
    const e: Record<string, string> = {}
    if (title.trim().length < 4) e.title = 'Title must be at least 4 characters.'
    if (!description.trim()) e.description = 'Please describe the issue.'
    if (!projectId) e.project = 'Select a project.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async () => {
    if (!validate()) return
    setSaving(true)
    try {
      if (editing && issue) {
        await s.updateIssue(issue.id, { title: title.trim(), description: description.trim(), projectId, priority, assignedUuids: assigned })
      } else {
        await s.createIssue({ title: title.trim(), description: description.trim(), projectId, priority, assignedUuids: assigned })
      }
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{editing ? `Edit Issue #${issue!.id}` : 'Create Issue'}</DialogTitle>
          <DialogDescription>{editing ? 'Update the issue details below.' : 'Report a new issue. It will be created with status OPEN.'}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="i-title">Title <span className="text-[#E60012]">*</span></Label>
            <Input id="i-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Base station connectivity drop in Tunis" />
            {errors.title && <p className="text-xs text-[#B0000E]">{errors.title}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="i-desc">Description <span className="text-[#E60012]">*</span></Label>
            <Textarea id="i-desc" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is happening, impact, and steps to reproduce…" />
            {errors.description && <p className="text-xs text-[#B0000E]">{errors.description}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Project <span className="text-[#E60012]">*</span></Label>
              <Select value={projectId ? String(projectId) : ''} onValueChange={(v) => setProjectId(Number(v))}>
                <SelectTrigger className="bg-white"><SelectValue placeholder="Select project" /></SelectTrigger>
                <SelectContent>
                  {s.projects.map((p) => <SelectItem key={p.id} value={String(p.id)}>{p.title}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.project && <p className="text-xs text-[#B0000E]">{errors.project}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Priority <span className="text-[#E60012]">*</span></Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PRIORITY_ORDER.map((p) => <SelectItem key={p} value={p}>{PRIORITY_LABEL[p]}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Assignees</Label>
            <AssigneePicker value={assigned} onChange={setAssigned} />
            <p className="text-[11px] text-neutral-400">Multiple team members can be assigned to one issue.</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={saving}>Cancel</Button>
          <Button onClick={submit} disabled={saving}>
            {saving && <Spinner className="size-4" />}
            {editing ? 'Save Changes' : 'Create Issue'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

```

## FILE: src/components/IssueTable.tsx

```tsx
import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useStore } from '@/store/AppStore'
import { AvatarGroup, EmptyState, PriorityBadge, StatusBadge } from '@/components/bits'
import { formatDate } from '@/lib/helpers'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import type { Issue } from '@/types'

const PAGE_SIZE = 8

export function IssueTable({ issues, allIssues, onCreate }: { issues: Issue[]; allIssues: Issue[]; onCreate: () => void }) {
  const s = useStore()
  const [page, setPage] = useState(0)

  const pageCount = Math.max(1, Math.ceil(issues.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount - 1)
  const rows = useMemo(() => issues.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE), [issues, safePage])

  if (allIssues.length === 0) {
    return <EmptyState title="No issues found" hint="Create the first issue to get started." action={<Button size="sm" onClick={onCreate}><Plus className="size-4" /> Create Issue</Button>} />
  }
  if (issues.length === 0) {
    return <EmptyState title="No issues match the current filters" hint="Try adjusting or clearing your filters." action={<Button size="sm" variant="outline" onClick={s.clearFilters}>Clear Filters</Button>} />
  }

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50/80 hover:bg-neutral-50/80">
              <TableHead className="w-16 text-[11px] font-semibold uppercase tracking-wider">ID</TableHead>
              <TableHead className="min-w-56 text-[11px] font-semibold uppercase tracking-wider">Title</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Project</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Priority</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Status</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Creator</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Assignees</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Created</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((i) => {
              const project = s.getProject(i.projectId)
              const creator = s.getUser(i.creatorUuid)
              const assignees = i.assignedUuids.map((u) => s.getUser(u)).filter(Boolean) as NonNullable<ReturnType<typeof s.getUser>>[]
              return (
                <TableRow key={i.id} className="cursor-pointer" onClick={() => s.openIssue(i.id)}>
                  <TableCell className="font-mono text-xs text-neutral-400">#{i.id}</TableCell>
                  <TableCell>
                    <span className="line-clamp-1 text-[13px] font-medium text-neutral-900">{i.title}</span>
                  </TableCell>
                  <TableCell><span className="line-clamp-1 max-w-44 text-xs text-neutral-500">{project?.title ?? '—'}</span></TableCell>
                  <TableCell><PriorityBadge priority={i.priority} /></TableCell>
                  <TableCell><StatusBadge status={i.status} /></TableCell>
                  <TableCell><span className="text-xs text-neutral-500">{creator ? `@${creator.username}` : '—'}</span></TableCell>
                  <TableCell><AvatarGroup users={assignees} /></TableCell>
                  <TableCell className="whitespace-nowrap text-xs text-neutral-500">{formatDate(i.createdAt)}</TableCell>
                  <TableCell className="whitespace-nowrap text-xs text-neutral-500">{formatDate(i.updatedAt)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between border-t border-neutral-100 px-4 py-2.5">
        <p className="text-xs text-neutral-500">
          {issues.length} issue{issues.length === 1 ? '' : 's'} · page {safePage + 1} of {pageCount}
        </p>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon-sm" disabled={safePage === 0} onClick={() => setPage(safePage - 1)} aria-label="Previous page">
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="outline" size="icon-sm" disabled={safePage >= pageCount - 1} onClick={() => setPage(safePage + 1)} aria-label="Next page">
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

```

## FILE: src/components/IssueWorkspace.tsx

```tsx
import { useMemo } from 'react'
import { useStore } from '@/store/AppStore'
import { FilterBar } from '@/components/FilterBar'
import { KanbanBoard } from '@/components/KanbanBoard'
import { IssueTable } from '@/components/IssueTable'
import { applyIssueQuery } from '@/lib/issueQuery'

export function IssueWorkspace({ scopeProjectId, onCreateIssue }: {
  scopeProjectId?: number
  onCreateIssue: () => void
}) {
  const s = useStore()
  const scoped = useMemo(
    () => (scopeProjectId != null ? s.issues.filter((i) => i.projectId === scopeProjectId) : s.issues),
    [s.issues, scopeProjectId],
  )
  const visible = useMemo(
    () => applyIssueQuery(s.issues, s.filters, s.sortField, s.sortDir, scopeProjectId),
    [s.issues, s.filters, s.sortField, s.sortDir, scopeProjectId],
  )

  return (
    <div className="space-y-3">
      <FilterBar scopeProjectId={scopeProjectId} />
      {s.viewMode === 'board'
        ? <KanbanBoard issues={visible} allIssues={scoped} onCreate={onCreateIssue} scopeProjectId={scopeProjectId} />
        : <IssueTable issues={visible} allIssues={scoped} onCreate={onCreateIssue} />}
    </div>
  )
}

```

## FILE: src/components/KanbanBoard.tsx

```tsx
import React, { useState } from 'react'
import { CircleDot, Loader, CheckCircle2, Plus, Lock } from 'lucide-react'
import { useStore } from '@/store/AppStore'
import { AvatarGroup, EmptyState, PriorityBadge } from '@/components/bits'
import { STATUS_ORDER, timeAgo, STATUS_LABEL } from '@/lib/helpers'
import { canChangeStatus } from '@/lib/permissions'
import { cn } from '@/lib/utils'
import type { Issue, IssueStatus } from '@/types'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

const colIcon: Record<IssueStatus, React.ReactNode> = {
  OPEN: <CircleDot className="size-4 text-blue-600" />,
  IN_PROGRESS: <Loader className="size-4 text-amber-600" />,
  DONE: <CheckCircle2 className="size-4 text-emerald-600" />,
}
const colAccent: Record<IssueStatus, string> = {
  OPEN: 'bg-blue-500',
  IN_PROGRESS: 'bg-amber-500',
  DONE: 'bg-emerald-500',
}

export function IssueCard({ issue, draggable }: { issue: Issue; draggable: boolean }) {
  const s = useStore()
  const project = s.getProject(issue.projectId)
  const assignees = issue.assignedUuids.map((u) => s.getUser(u)).filter(Boolean) as NonNullable<ReturnType<typeof s.getUser>>[]
  return (
    <div
      draggable={draggable}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/issue-id', String(issue.id))
        e.dataTransfer.effectAllowed = 'move'
      }}
      onClick={() => s.openIssue(issue.id)}
      className={cn(
        'group cursor-pointer rounded-lg border border-neutral-200 bg-white p-3 shadow-xs transition-all hover:-translate-y-px hover:border-neutral-300 hover:shadow-md',
        draggable ? 'active:cursor-grabbing' : 'opacity-95',
        issue.status === 'DONE' && 'bg-neutral-50/70',
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] font-medium text-neutral-400">#{issue.id}</span>
        <PriorityBadge priority={issue.priority} />
      </div>
      <p className={cn('mt-1.5 line-clamp-2 text-[13px] font-medium leading-snug text-neutral-900', issue.status === 'DONE' && 'text-neutral-500 line-through decoration-neutral-300')}>
        {issue.title}
      </p>
      <p className="mt-1 truncate text-[11px] text-neutral-400">{project?.title ?? '—'}</p>
      <div className="mt-2.5 flex items-center justify-between">
        <AvatarGroup users={assignees} />
        <span className="text-[11px] text-neutral-400">{timeAgo(issue.updatedAt)}</span>
      </div>
    </div>
  )
}

function Column({ status, issues, totalCount, onDropIssue, onCreate }: {
  status: IssueStatus
  issues: Issue[]
  totalCount: number
  onDropIssue: (id: number, status: IssueStatus) => void
  onCreate?: () => void
}) {
  const s = useStore()
  const [over, setOver] = useState(false)
  return (
    <div
      className={cn('flex w-[300px] shrink-0 flex-col rounded-xl bg-neutral-100/80 p-2 transition-colors xl:w-auto xl:flex-1', over && 'kanban-col-drop')}
      onDragOver={(e) => { e.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault(); setOver(false)
        const id = Number(e.dataTransfer.getData('text/issue-id'))
        if (id) onDropIssue(id, status)
      }}
    >
      <div className="flex items-center gap-2 px-1.5 py-2">
        <span className={cn('size-1.5 rounded-full', colAccent[status])} />
        {colIcon[status]}
        <span className="text-xs font-bold tracking-wide text-neutral-700">{STATUS_LABEL[status].toUpperCase()}</span>
        <span className="rounded-md bg-white px-1.5 py-0.5 text-[11px] font-semibold text-neutral-500 ring-1 ring-neutral-200">{issues.length}</span>
        {issues.length !== totalCount && <span className="text-[11px] text-neutral-400">of {totalCount}</span>}
        {onCreate && status === 'OPEN' && (
          <TooltipProvider delayDuration={150}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={onCreate} className="ml-auto rounded-md p-1 text-neutral-400 hover:bg-white hover:text-neutral-700">
                  <Plus className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Create issue</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="scrollbar-thin flex min-h-24 flex-1 flex-col gap-2 overflow-y-auto px-0.5 pb-1" style={{ maxHeight: 'calc(100vh - 320px)' }}>
        {issues.map((i) => (
          <IssueCard key={i.id} issue={i} draggable={!!s.currentUser && canChangeStatus(s.currentUser, i)} />
        ))}
        {issues.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-neutral-200 py-8 text-center">
            <p className="text-xs font-medium text-neutral-500">No {STATUS_LABEL[status]} issues</p>
            <p className="px-4 text-[11px] text-neutral-400">Issues moved to this status will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export function KanbanBoard({ issues, allIssues, onCreate, scopeProjectId }: {
  issues: Issue[] // filtered + sorted
  allIssues: Issue[] // scope total (for column counts)
  onCreate: () => void
  scopeProjectId?: number
}) {
  const s = useStore()
  const filteredEmpty = issues.length === 0 && allIssues.length > 0

  if (allIssues.length === 0) {
    return (
      <EmptyState
        title="No issues found"
        hint={scopeProjectId ? 'This project has no issues yet. Create the first one to get started.' : 'There are no issues yet. Create the first one to get started.'}
        action={<Button size="sm" onClick={onCreate}><Plus className="size-4" /> Create Issue</Button>}
      />
    )
  }
  if (filteredEmpty) {
    return (
      <EmptyState
        title="No issues match the current filters"
        hint="Try adjusting or clearing your filters to see more results."
        action={<Button size="sm" variant="outline" onClick={s.clearFilters}>Clear Filters</Button>}
      />
    )
  }

  const drop = (id: number, status: IssueStatus) => {
    const issue = s.issues.find((i) => i.id === id)
    if (!issue || !s.currentUser) return
    if (!canChangeStatus(s.currentUser, issue)) return
    if (issue.status !== status) s.updateIssueStatus(id, status)
  }

  const readOnly = s.currentUser && !allIssues.some((i) => canChangeStatus(s.currentUser!, i))

  return (
    <div className="space-y-2">
      {readOnly && (
        <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-500">
          <Lock className="size-3.5" /> You have read-only access to these issues — dragging is disabled for issues you can't update.
        </div>
      )}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {STATUS_ORDER.map((st) => (
          <Column
            key={st}
            status={st}
            issues={issues.filter((i) => i.status === st)}
            totalCount={allIssues.filter((i) => i.status === st).length}
            onDropIssue={drop}
            onCreate={onCreate}
          />
        ))}
      </div>
    </div>
  )
}

```

## FILE: src/components/ProjectForm.tsx

```tsx
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { useStore } from '@/store/AppStore'
import { canChangeProjectCategory } from '@/lib/permissions'
import { CATEGORY_LABEL, CATEGORY_ORDER } from '@/lib/helpers'
import type { ProjectCategory } from '@/types'

export function ProjectFormDialog({ open, onClose, project }: {
  open: boolean
  onClose: () => void
  project?: { id: number; title: string; description: string; category: ProjectCategory; leaderUuid: string } | null
}) {
  const s = useStore()
  const me = s.currentUser!
  const editing = !!project
  const [title, setTitle] = useState(project?.title ?? '')
  const [description, setDescription] = useState(project?.description ?? '')
  const [category, setCategory] = useState<ProjectCategory>(project?.category ?? 'SOFTWARE')
  const [leaderUuid, setLeaderUuid] = useState(project?.leaderUuid ?? me.uuid)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // reset when opened for a different target
  const [wasOpen, setWasOpen] = useState(false)
  if (open && !wasOpen) {
    setTitle(project?.title ?? ''); setDescription(project?.description ?? '')
    setCategory(project?.category ?? 'SOFTWARE'); setLeaderUuid(project?.leaderUuid ?? me.uuid)
    setError(null); setWasOpen(true)
  } else if (!open && wasOpen) setWasOpen(false)

  const submit = async () => {
    if (title.trim().length < 3) { setError('Project title must be at least 3 characters.'); return }
    setSaving(true)
    try {
      if (editing && project) {
        await s.updateProject(project.id, {
          title: title.trim(), description: description.trim(), leaderUuid,
          ...(canChangeProjectCategory(me) ? { category } : {}),
        })
      } else {
        await s.createProject({ title: title.trim(), description: description.trim(), category, leaderUuid })
      }
      onClose()
    } finally { setSaving(false) }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editing ? 'Edit Project' : 'Create Project'}</DialogTitle>
          <DialogDescription>{editing ? 'Update project details.' : 'Projects group related issues into a workspace.'}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Title <span className="text-[#E60012]">*</span></Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Customer Care Portal" />
            {error && <p className="text-xs text-[#B0000E]">{error}</p>}
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is this project about?" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as ProjectCategory)} disabled={editing && !canChangeProjectCategory(me)}>
                <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORY_ORDER.map((c) => <SelectItem key={c} value={c}>{CATEGORY_LABEL[c]}</SelectItem>)}
                </SelectContent>
              </Select>
              {editing && !canChangeProjectCategory(me) && <p className="text-[11px] text-neutral-400">Only admins can change the category.</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Project Lead</Label>
              <Select value={leaderUuid} onValueChange={setLeaderUuid}>
                <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {s.users.map((u) => <SelectItem key={u.uuid} value={u.uuid}>{u.firstName} {u.lastName}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={saving}>Cancel</Button>
          <Button onClick={submit} disabled={saving}>{saving && <Spinner className="size-4" />}{editing ? 'Save Changes' : 'Create Project'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

```

## FILE: src/components/bits.tsx

```tsx
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ArrowDown01, ArrowUp10, CircleDot, CheckCircle2, Loader, SignalHigh, SignalLow, SignalMedium, AlertOctagon, FileText, FileImage, FileArchive, File as FileIcon, Inbox } from 'lucide-react'
import { cn, } from '@/lib/utils'
import { initials } from '@/lib/helpers'
import type { IssueStatus, Priority, ProjectCategory, Role, User } from '@/types'

/* ---------------- Ooredoo logo ---------------- */
export function OoredooMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-label="Ooredoo">
      <circle cx="20" cy="20" r="20" fill="#E60012" />
      <circle cx="20" cy="20" r="9.5" stroke="#fff" strokeWidth="4.4" fill="none" />
    </svg>
  )
}

export function LogoLockup({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <OoredooMark />
      {!collapsed && (
        <div className="min-w-0 leading-tight">
          <div className="text-[15px] font-bold tracking-tight text-neutral-900">ooredoo</div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">Issue Tracker</div>
        </div>
      )}
    </div>
  )
}

/* ---------------- Badges ---------------- */
const statusStyle: Record<IssueStatus, string> = {
  OPEN: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  IN_PROGRESS: 'bg-amber-50 text-amber-700 ring-amber-600/25',
  DONE: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
}
const statusIcon: Record<IssueStatus, React.ReactNode> = {
  OPEN: <CircleDot className="size-3" />,
  IN_PROGRESS: <Loader className="size-3" />,
  DONE: <CheckCircle2 className="size-3" />,
}
export function StatusBadge({ status, className }: { status: IssueStatus; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset', statusStyle[status], className)}>
      {statusIcon[status]}
      {status.replace('_', ' ')}
    </span>
  )
}

const priorityStyle: Record<Priority, string> = {
  LOW: 'bg-neutral-100 text-neutral-600 ring-neutral-500/20',
  MEDIUM: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  HIGH: 'bg-orange-50 text-orange-700 ring-orange-600/25',
  CRITICAL: 'bg-red-50 text-[#B0000E] ring-[#E60012]/30',
}
const priorityIcon: Record<Priority, React.ReactNode> = {
  LOW: <SignalLow className="size-3" />,
  MEDIUM: <SignalMedium className="size-3" />,
  HIGH: <SignalHigh className="size-3" />,
  CRITICAL: <AlertOctagon className="size-3" />,
}
export function PriorityBadge({ priority, className }: { priority: Priority; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset', priorityStyle[priority], className)}>
      {priorityIcon[priority]}
      {priority}
    </span>
  )
}

const roleStyle: Record<Role, string> = {
  ADMIN: 'bg-[#E60012]/10 text-[#B0000E] ring-[#E60012]/25',
  MANAGER: 'bg-violet-50 text-violet-700 ring-violet-600/20',
  USER: 'bg-neutral-100 text-neutral-600 ring-neutral-500/20',
}
export function RoleBadge({ role, className }: { role: Role; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset', roleStyle[role], className)}>
      {role}
    </span>
  )
}

const categoryStyle: Record<ProjectCategory, string> = {
  SOFTWARE: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
  SUPPORT: 'bg-teal-50 text-teal-700 ring-teal-600/20',
  INTERNAL: 'bg-stone-100 text-stone-600 ring-stone-500/20',
}
export function CategoryBadge({ category, className }: { category: ProjectCategory; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset', categoryStyle[category], className)}>
      {category}
    </span>
  )
}

/* ---------------- Avatars ---------------- */
const palette = ['bg-red-100 text-[#B0000E]', 'bg-blue-100 text-blue-700', 'bg-emerald-100 text-emerald-700', 'bg-violet-100 text-violet-700', 'bg-amber-100 text-amber-800', 'bg-cyan-100 text-cyan-700', 'bg-pink-100 text-pink-700', 'bg-lime-100 text-lime-700']
function colorFor(uuid: string) {
  let h = 0
  for (const ch of uuid) h = (h * 31 + ch.charCodeAt(0)) % 997
  return palette[h % palette.length]
}

export function UserAvatar({ user, size = 'md', className }: { user: User; size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; className?: string }) {
  const sz = { xs: 'size-5 text-[9px]', sm: 'size-7 text-[11px]', md: 'size-8 text-xs', lg: 'size-12 text-sm', xl: 'size-20 text-2xl' }[size]
  return (
    <Avatar className={cn(sz, 'ring-1 ring-black/5', className)}>
      {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.username} />}
      <AvatarFallback className={cn('font-semibold', colorFor(user.uuid))}>{initials(user)}</AvatarFallback>
    </Avatar>
  )
}

export function AvatarGroup({ users, max = 3 }: { users: User[]; max?: number }) {
  const shown = users.slice(0, max)
  const rest = users.length - shown.length
  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex -space-x-1.5">
        {shown.map((u) => (
          <Tooltip key={u.uuid}>
            <TooltipTrigger asChild>
              <span className="inline-block rounded-full ring-2 ring-white"><UserAvatar user={u} size="xs" /></span>
            </TooltipTrigger>
            <TooltipContent>{u.firstName} {u.lastName} · @{u.username}</TooltipContent>
          </Tooltip>
        ))}
        {rest > 0 && (
          <span className="inline-flex size-5 items-center justify-center rounded-full bg-neutral-200 text-[9px] font-semibold text-neutral-600 ring-2 ring-white">+{rest}</span>
        )}
      </div>
    </TooltipProvider>
  )
}

/* ---------------- File icon ---------------- */
export function FileTypeIcon({ contentType, className }: { contentType: string; className?: string }) {
  const cls = cn('size-4', className)
  if (contentType.startsWith('image/')) return <FileImage className={cn(cls, 'text-violet-500')} />
  if (contentType.includes('zip') || contentType.includes('compressed')) return <FileArchive className={cn(cls, 'text-amber-600')} />
  if (contentType.includes('pdf') || contentType.startsWith('text/') || contentType.includes('markdown')) return <FileText className={cn(cls, 'text-blue-600')} />
  return <FileIcon className={cn(cls, 'text-neutral-500')} />
}

/* ---------------- Empty state ---------------- */
export function EmptyState({ title, hint, action }: { title: string; hint?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-neutral-200 bg-white/60 px-6 py-12 text-center">
      <div className="flex size-10 items-center justify-center rounded-full bg-neutral-100"><Inbox className="size-5 text-neutral-400" /></div>
      <p className="text-sm font-semibold text-neutral-700">{title}</p>
      {hint && <p className="max-w-sm text-xs text-neutral-500">{hint}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

export function SortDirIcon({ dir, className }: { dir: 'asc' | 'desc'; className?: string }) {
  return dir === 'asc' ? <ArrowUp10 className={cn('size-4', className)} /> : <ArrowDown01 className={cn('size-4', className)} />
}

```

## FILE: src/components/ui/accordion.tsx

```tsx
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

```

## FILE: src/components/ui/alert-dialog.tsx

```tsx
import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  )
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}

```

## FILE: src/components/ui/alert.tsx

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }

```

## FILE: src/components/ui/aspect-ratio.tsx

```tsx
"use client"

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
}

export { AspectRatio }

```

## FILE: src/components/ui/avatar.tsx

```tsx
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }

```

## FILE: src/components/ui/badge.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

```

## FILE: src/components/ui/breadcrumb.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}

```

## FILE: src/components/ui/button-group.tsx

```tsx
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const buttonGroupVariants = cva(
  "flex w-fit items-stretch [&>*]:focus-visible:z-10 [&>*]:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md has-[>[data-slot=button-group]]:gap-2",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      className={cn(
        "bg-muted flex items-center gap-2 rounded-md border px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}

```

## FILE: src/components/ui/button.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

```

## FILE: src/components/ui/calendar.tsx

```tsx
"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
} from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md"
            : "[&:first-child[data-selected=true]_button]:rounded-l-md",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-md bg-accent",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }

```

## FILE: src/components/ui/card.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

```

## FILE: src/components/ui/carousel.tsx

```tsx
import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api?.off("select", onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}

```

## FILE: src/components/ui/chart.tsx

```tsx
"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  }) {
  const { config } = useChart()

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null
    }

    const [item] = payload
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value =
      !labelKey && typeof label === "string"
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      )
    }

    if (!value) {
      return null
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ])

  if (!active || !payload?.length) {
    return null
  }

  const nestLabel = payload.length === 1 && indicator !== "dot"

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="text-foreground font-mono font-medium tabular-nums">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> &
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean
    nameKey?: string
  }) {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={item.value}
              className={cn(
                "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
    </div>
  )
}

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}

```

## FILE: src/components/ui/checkbox.tsx

```tsx
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }

```

## FILE: src/components/ui/collapsible.tsx

```tsx
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

```

## FILE: src/components/ui/command.tsx

```tsx
import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn("overflow-hidden p-0", className)}
        showCloseButton={showCloseButton}
      >
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center gap-2 border-b px-3"
    >
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}

```

## FILE: src/components/ui/context-menu.tsx

```tsx
"use client"

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function ContextMenu({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
}

function ContextMenuTrigger({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  )
}

function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  )
}

function ContextMenuPortal({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  )
}

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />
}

function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  )
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
  )
}

function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}

```

## FILE: src/components/ui/dialog.tsx

```tsx
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}

```

## FILE: src/components/ui/drawer.tsx

```tsx
"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}

```

## FILE: src/components/ui/dropdown-menu.tsx

```tsx
import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}

```

## FILE: src/components/ui/empty.tsx

```tsx
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        className
      )}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn("text-lg font-medium tracking-tight", className)}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}

```

## FILE: src/components/ui/field.tsx

```tsx
import { useMemo } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-6",
        "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-3 font-medium",
        "data-[variant=legend]:text-base",
        "data-[variant=label]:text-sm",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
        horizontal: [
          "flex-row items-center",
          "[&>[data-slot=field-label]]:flex-auto",
          "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ],
        responsive: [
          "flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto",
          "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ],
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
        "has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-muted-foreground text-sm leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance",
        "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-destructive text-sm font-normal", className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}

```

## FILE: src/components/ui/form.tsx

```tsx
"use client"

import * as React from "react"
import type * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField()

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : props.children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  )
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```

## FILE: src/components/ui/hover-card.tsx

```tsx
"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }

```

## FILE: src/components/ui/input-group.tsx

```tsx
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group border-input dark:bg-input/30 relative flex w-full items-center rounded-md border shadow-xs transition-[color,box-shadow] outline-none",
        "h-9 min-w-0 has-[>textarea]:h-auto",

        // Variants based on alignment.
        "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",

        // Focus state.
        "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot=input-group-control]:focus-visible]:ring-[3px]",

        // Error state.
        "has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",

        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-4 [&>kbd]:rounded-[calc(var(--radius)-5px)] group-data-[disabled=true]/input-group:opacity-50",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
        "inline-end":
          "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
        "block-start":
          "order-first w-full justify-start px-3 pt-3 [.border-b]:pb-3 group-has-[>input]/input-group:pt-2.5",
        "block-end":
          "order-last w-full justify-start px-3 pb-3 [.border-t]:pt-3 group-has-[>input]/input-group:pb-2.5",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "text-sm shadow-none flex gap-2 items-center",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 px-2 rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2",
        sm: "h-8 px-2.5 gap-1.5 rounded-md has-[>svg]:px-2.5",
        "icon-xs":
          "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}

```

## FILE: src/components/ui/input-otp.tsx

```tsx
import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }

```

## FILE: src/components/ui/input.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }

```

## FILE: src/components/ui/item.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn("group/item-group flex flex-col", className)}
      {...props}
    />
  )
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-0", className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  "group/item flex items-center border border-transparent text-sm rounded-md transition-colors [a]:hover:bg-accent/50 [a]:transition-colors duration-100 flex-wrap outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50",
      },
      size: {
        default: "p-4 gap-4 ",
        sm: "py-3 px-4 gap-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4",
        image:
          "size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium",
        className
      )}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}

```

## FILE: src/components/ui/kbd.tsx

```tsx
import { cn } from "@/lib/utils"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium select-none",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }

```

## FILE: src/components/ui/label.tsx

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }

```

## FILE: src/components/ui/menubar.tsx

```tsx
import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
        className
      )}
      {...props}
    />
  )
}

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  )
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
        className
      )}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </MenubarPortal>
  )
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}

```

## FILE: src/components/ui/navigation-menu.tsx

```tsx
import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  )
}

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1"
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 isolate z-50 flex justify-center"
      )}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
          className
        )}
        {...props}
      />
    </div>
  )
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}

```

## FILE: src/components/ui/pagination.tsx

```tsx
import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants, type Button } from "@/components/ui/button"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}

```

## FILE: src/components/ui/popover.tsx

```tsx
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }

```

## FILE: src/components/ui/progress.tsx

```tsx
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }

```

## FILE: src/components/ui/radio-group.tsx

```tsx
"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }

```

## FILE: src/components/ui/resizable.tsx

```tsx
import * as React from "react"
import { GripVerticalIcon } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Group>) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

function ResizablePanel({
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Separator> & {
  withHandle?: boolean
}) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.Separator>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }

```

## FILE: src/components/ui/scroll-area.tsx

```tsx
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }

```

## FILE: src/components/ui/select.tsx

```tsx
import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span
        data-slot="select-item-indicator"
        className="absolute right-2 flex size-3.5 items-center justify-center"
      >
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

```

## FILE: src/components/ui/separator.tsx

```tsx
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }

```

## FILE: src/components/ui/sheet.tsx

```tsx
import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

```

## FILE: src/components/ui/sidebar.tsx

```tsx
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { PanelLeftIcon } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("bg-background h-8 w-full shadow-none", className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("bg-sidebar-border mx-2 w-auto", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}

```

## FILE: src/components/ui/skeleton.tsx

```tsx
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }

```

## FILE: src/components/ui/slider.tsx

```tsx
"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }

```

## FILE: src/components/ui/sonner.tsx

```tsx
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }

```

## FILE: src/components/ui/spinner.tsx

```tsx
import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }

```

## FILE: src/components/ui/switch.tsx

```tsx
"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }

```

## FILE: src/components/ui/table.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

## FILE: src/components/ui/tabs.tsx

```tsx
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }

```

## FILE: src/components/ui/textarea.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

```

## FILE: src/components/ui/toggle-group.tsx

```tsx
import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number
  }
>({
  size: "default",
  variant: "default",
  spacing: 0,
})

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    spacing?: number
  }) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(
        "group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10",
        "data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-md data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:data-[variant=outline]:first:border-l",
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }

```

## FILE: src/components/ui/toggle.tsx

```tsx
import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }

```

## FILE: src/components/ui/tooltip.tsx

```tsx
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

```

## FILE: src/data/seed.ts

```typescript
import type { Attachment, Comment, Issue, Project, User } from '@/types'

const now = Date.now()
const H = 3600_000
const D = 24 * H

export const seedUsers: User[] = [
  { uuid: 'u-amina', firstName: 'Amina', lastName: 'Ben Salah', username: 'amina.bs', role: 'ADMIN', bio: 'IT operations administrator — platform governance and access control.', password: 'ooredoo123' },
  { uuid: 'u-mohamed', firstName: 'Mohamed', lastName: 'Ali', username: 'mali', role: 'MANAGER', bio: 'Network operations team lead at Ooredoo. Central region infrastructure.', password: 'ooredoo123' },
  { uuid: 'u-yassine', firstName: 'Yassine', lastName: 'Trabelsi', username: 'ytrabelsi', role: 'MANAGER', bio: 'Customer support operations manager. Tier-1 and tier-2 escalations.', password: 'ooredoo123' },
  { uuid: 'u-tarek', firstName: 'Tarek', lastName: 'Omar', username: 'tomar', role: 'USER', bio: 'Field engineer — radio access network, Tunis central cluster.', password: 'ooredoo123' },
  { uuid: 'u-sara', firstName: 'Sara', lastName: 'Gharbi', username: 'sgharbi', role: 'USER', bio: 'QA engineer, software delivery. Test automation and release gates.', password: 'ooredoo123' },
  { uuid: 'u-leila', firstName: 'Leila', lastName: 'Haddad', username: 'lhaddad', role: 'USER', bio: 'NOC analyst — 24/7 network monitoring and incident triage.', password: 'ooredoo123' },
  { uuid: 'u-karim', firstName: 'Karim', lastName: 'Mansour', username: 'kmansour', role: 'USER', bio: 'Backend developer — billing and provisioning services.', password: 'ooredoo123' },
  { uuid: 'u-nour', firstName: 'Nour', lastName: 'Bouzid', username: 'nbouzid', role: 'USER', bio: 'Support specialist — tier 2. Corporate accounts and SLA cases.', password: 'ooredoo123' },
  { uuid: 'u-hatem', firstName: 'Hatem', lastName: 'Khelifi', username: 'hkhelifi', role: 'USER', bio: 'DevOps engineer — CI/CD, Kubernetes platform, observability.', password: 'ooredoo123' },
  { uuid: 'u-ines', firstName: 'Ines', lastName: 'Ayari', username: 'iayari', role: 'USER', bio: 'Product specialist — digital channels and mobile app experience.', password: 'ooredoo123' },
]

export const seedProjects: Project[] = [
  { id: 1, title: '5G Rollout Platform', description: 'Core network modernization for the national 5G rollout: provisioning, RAN integration and capacity management.', category: 'SOFTWARE', leaderUuid: 'u-mohamed' },
  { id: 2, title: 'Customer Care Portal', description: 'Agent desktop and self-service portal used by customer care teams across all channels.', category: 'SUPPORT', leaderUuid: 'u-yassine' },
  { id: 3, title: 'Network Infrastructure — Central Region', description: 'Field operations and maintenance for the central region: base stations, transmission nodes and fiber links.', category: 'INTERNAL', leaderUuid: 'u-mohamed' },
  { id: 4, title: 'Billing System Modernization', description: 'Migration of rating, invoicing and payment services to the new convergent billing stack.', category: 'SOFTWARE', leaderUuid: 'u-karim' },
  { id: 5, title: 'Field Operations Support', description: 'Tooling and processes for field technician dispatch, spare parts and SLA tracking.', category: 'SUPPORT', leaderUuid: 'u-yassine' },
  { id: 6, title: 'Employee Onboarding Hub', description: 'Internal hub for new joiner provisioning: accounts, hardware requests and HR workflows.', category: 'INTERNAL', leaderUuid: 'u-amina' },
]

export const seedIssues: Issue[] = [
  { id: 42, title: 'Base station BSC-042 connectivity drop in Tunis', description: 'Site BSC-042 (Lac 2 cluster) drops its Abis link every 40–60 minutes since the last transmission upgrade. Alarms clear spontaneously after ~90 seconds.\n\nImpact: ~12,000 subscribers see degraded voice quality during drops. NOC has opened a bridge with the transmission vendor.\n\nSteps to reproduce: monitor KPI dashboard for site TN-BSC-042 between 18:00–22:00.', status: 'OPEN', priority: 'HIGH', projectId: 3, creatorUuid: 'u-leila', createdAt: now - 2 * H, updatedAt: now - 2 * H, assignedUuids: ['u-tarek', 'u-mohamed'] },
  { id: 41, title: '5G core network latency spikes during peak hours', description: 'UPF latency jumps from 8ms to 90ms+ between 19:00 and 23:00 on the Tunis DC cluster. Packet duplication is suspected on the N6 interface.\n\nAttachpcap traces collected during the last three evenings. Need a decision on horizontal UPF scaling before the Ramadan traffic peak.', status: 'IN_PROGRESS', priority: 'CRITICAL', projectId: 1, creatorUuid: 'u-mohamed', createdAt: now - 3 * D, updatedAt: now - 5 * H, assignedUuids: ['u-hatem', 'u-leila', 'u-tarek'] },
  { id: 40, title: 'Customer portal login timeout on mobile app', description: 'Customers on Android report login spinner for 30s then timeout. Reproducible on app version 7.4.1 when the account has more than 3 lines.\n\nAPI trace shows /session call blocking on the subscriber profile lookup.', status: 'OPEN', priority: 'CRITICAL', projectId: 2, creatorUuid: 'u-nour', createdAt: now - 6 * H, updatedAt: now - 1 * H, assignedUuids: ['u-karim'] },
  { id: 39, title: 'Upgrade firmware on Rouibia transmission node', description: 'Scheduled firmware upgrade for the Rouibia transmission node to patch the known timing drift issue. Maintenance window approved for Sunday 02:00–04:00.', status: 'DONE', priority: 'MEDIUM', projectId: 3, creatorUuid: 'u-mohamed', createdAt: now - 9 * D, updatedAt: now - 4 * D, closedAt: now - 4 * D, closedByUuid: 'u-mohamed', assignedUuids: ['u-tarek'] },
  { id: 38, title: 'Intermittent packet loss on Sfax fiber link', description: '0.4–1.2% packet loss measured on the Sfax–Tunis backbone link since Tuesday. OTDR trace shows a reflectance event at km 47.2 — likely a damaged splice.\n\nField team dispatched; awaiting splice enclosure photos.', status: 'IN_PROGRESS', priority: 'HIGH', projectId: 3, creatorUuid: 'u-leila', createdAt: now - 2 * D, updatedAt: now - 8 * H, assignedUuids: ['u-tarek', 'u-leila'] },
  { id: 37, title: 'Invoice PDF renders incorrect tax breakdown', description: 'Corporate invoices generated after the April tariff change show VAT computed on the pre-discount amount. Affects PDF rendering only — the rated amount in the ledger is correct.\n\nRepro: generate invoice for account C-88312 with the corporate discount applied.', status: 'OPEN', priority: 'MEDIUM', projectId: 4, creatorUuid: 'u-nour', createdAt: now - 4 * D, updatedAt: now - 4 * D, assignedUuids: ['u-karim'] },
  { id: 36, title: 'Add rate-limiting to public API gateway', description: 'Partner APIs currently have no throttling. During the last campaign one integrator generated 40x normal traffic and starved the charging endpoints.\n\nScope: token-bucket per API key, 429 responses, monitoring alerts on the gateway.', status: 'OPEN', priority: 'MEDIUM', projectId: 1, creatorUuid: 'u-hatem', createdAt: now - 5 * D, updatedAt: now - 3 * D, assignedUuids: ['u-hatem', 'u-karim'] },
  { id: 35, title: 'SIM activation flow fails for corporate accounts', description: 'Bulk SIM activation via the corporate portal fails with a generic error when the batch exceeds 50 SIMs. Smaller batches succeed.\n\nProvisioning logs show a timeout on the HLR write queue — batch is not chunked.', status: 'IN_PROGRESS', priority: 'HIGH', projectId: 4, creatorUuid: 'u-nour', createdAt: now - 6 * D, updatedAt: now - 10 * H, assignedUuids: ['u-karim', 'u-sara'] },
  { id: 34, title: 'Duplicate CDR records in billing pipeline', description: 'Rating engine ingests some voice CDRs twice when the mediation collector retries after a broker restart. Estimated 0.02% of records affected.\n\nNeed idempotency keys at ingestion, dedupe job for April data.', status: 'OPEN', priority: 'HIGH', projectId: 4, creatorUuid: 'u-karim', createdAt: now - 7 * D, updatedAt: now - 2 * D, assignedUuids: ['u-karim'] },
  { id: 33, title: 'NOC wallboard alerts stop refreshing after browser idle', description: 'The monitoring wallboard in the NOC stops polling after ~20 minutes of browser idle, showing stale alarm counts. Refresh restores it.\n\nLikely the WebSocket session being dropped without reconnection logic.', status: 'OPEN', priority: 'LOW', projectId: 3, creatorUuid: 'u-leila', createdAt: now - 8 * D, updatedAt: now - 8 * D, assignedUuids: ['u-hatem'] },
  { id: 32, title: 'VoLTE provisioning errors after HSS migration', description: 'Legacy subscribers migrated during the HSS cutover intermittently lose VoLTE provisioning. IMS profile re-sync fixes it.\n\nRoot cause identified: migration script skipped subscribers with barred roaming. Fix deployed and verified on 4,200 affected lines.', status: 'DONE', priority: 'CRITICAL', projectId: 1, creatorUuid: 'u-mohamed', createdAt: now - 14 * D, updatedAt: now - 6 * D, closedAt: now - 6 * D, closedByUuid: 'u-mohamed', assignedUuids: ['u-hatem', 'u-tarek'] },
  { id: 31, title: 'Agent desktop app crashes on call transfer', description: 'The care portal desktop client crashes for ~30% of warm transfers to tier 2. Crash logs point to a null reference in the SIP session handoff.', status: 'IN_PROGRESS', priority: 'HIGH', projectId: 2, creatorUuid: 'u-yassine', createdAt: now - 3 * D, updatedAt: now - 4 * H, assignedUuids: ['u-nour', 'u-karim'] },
  { id: 30, title: 'Knowledge base search returns stale articles', description: 'Agents report that retired tariff articles still rank first in KB search. The search index refresh job has been failing silently for two weeks.', status: 'OPEN', priority: 'LOW', projectId: 2, creatorUuid: 'u-nour', createdAt: now - 11 * D, updatedAt: now - 5 * D, assignedUuids: ['u-ines'] },
  { id: 29, title: 'Onboarding form missing mandatory field validation', description: 'The new-joiner hardware request form allows submission without a cost center, which then blocks the approval workflow with no visible error.', status: 'OPEN', priority: 'MEDIUM', projectId: 6, creatorUuid: 'u-amina', createdAt: now - 4 * D, updatedAt: now - 1 * D, assignedUuids: ['u-sara'] },
  { id: 28, title: 'SSO login loop for new employees', description: 'New accounts created before the nightly directory sync are bounced between the IdP and the hub in a redirect loop. Workaround: provision accounts before 18:00.', status: 'DONE', priority: 'HIGH', projectId: 6, creatorUuid: 'u-amina', createdAt: now - 16 * D, updatedAt: now - 7 * D, closedAt: now - 7 * D, closedByUuid: 'u-amina', assignedUuids: ['u-hatem'] },
  { id: 27, title: 'Antenna alignment drift at site TN-118', description: 'RSRP degradation reported by drive tests around site TN-118 (Sousse). Physical inspection shows azimuth drift of ~8° on sector 2 after the last storm.\n\nTower crew visit requested.', status: 'OPEN', priority: 'MEDIUM', projectId: 3, creatorUuid: 'u-tarek', createdAt: now - 26 * H, updatedAt: now - 26 * H, assignedUuids: ['u-tarek'] },
  { id: 26, title: 'Push notification delivery delay on Android', description: 'Promotional push notifications arrive 5–15 minutes late on Android during campaign bursts. FCM quota is fine — our dispatch queue is single-threaded per shard.', status: 'OPEN', priority: 'MEDIUM', projectId: 1, creatorUuid: 'u-ines', createdAt: now - 5 * D, updatedAt: now - 2 * D, assignedUuids: ['u-hatem', 'u-ines'] },
  { id: 25, title: 'Upgrade PostgreSQL cluster to v16', description: 'Billing database cluster still on PostgreSQL 13, which leaves extended support this year.\n\nPlan: logical replication to a v16 cluster, rehearsal in staging, cutover during the July window. Extension audit attached.', status: 'IN_PROGRESS', priority: 'MEDIUM', projectId: 4, creatorUuid: 'u-hatem', createdAt: now - 10 * D, updatedAt: now - 12 * H, assignedUuids: ['u-hatem', 'u-karim'] },
  { id: 24, title: 'CSR ticket assignment round-robin skips agents', description: 'Dispatch skips agents who set themselves to "busy" even after they return to "available" — they stay excluded until the dispatcher service restarts.', status: 'OPEN', priority: 'HIGH', projectId: 5, creatorUuid: 'u-yassine', createdAt: now - 30 * H, updatedAt: now - 3 * H, assignedUuids: ['u-nour'] },
  { id: 23, title: 'Spare parts inventory sync failures', description: 'Warehouse stock levels fail to sync to the field app when the warehouse ERP closes its daily batch window. Sync retried with exponential backoff and alerting added.', status: 'DONE', priority: 'LOW', projectId: 5, creatorUuid: 'u-yassine', createdAt: now - 20 * D, updatedAt: now - 9 * D, closedAt: now - 9 * D, closedByUuid: 'u-yassine', assignedUuids: ['u-karim'] },
  { id: 22, title: 'eSIM QR email not delivered to Gmail users', description: 'eSIM activation emails to gmail.com addresses land in spam or are dropped since the DKIM key rotation. Deliverability to other providers is normal.\n\nPostmaster tools show reputation drop on the campaign IP range.', status: 'IN_PROGRESS', priority: 'CRITICAL', projectId: 2, creatorUuid: 'u-ines', createdAt: now - 2 * D, updatedAt: now - 6 * H, assignedUuids: ['u-hatem', 'u-ines'] },
  { id: 21, title: 'CI pipeline flaky tests blocking merges', description: 'The billing-service integration suite fails ~1 in 4 runs on the same three tests. Developers re-run pipelines multiple times per merge, wasting runner capacity.', status: 'OPEN', priority: 'LOW', projectId: 1, creatorUuid: 'u-sara', createdAt: now - 9 * D, updatedAt: now - 6 * D, assignedUuids: ['u-sara'] },
  { id: 20, title: 'VPN access drops for remote field teams', description: 'Field tablets on 4G lose VPN tunnels when roaming between cells and do not re-establish until manual reconnect. Mobility extension enabled on the gateway; verified over a two-week pilot.', status: 'DONE', priority: 'MEDIUM', projectId: 3, creatorUuid: 'u-tarek', createdAt: now - 25 * D, updatedAt: now - 12 * D, closedAt: now - 12 * D, closedByUuid: 'u-mohamed', assignedUuids: ['u-hatem'] },
  { id: 19, title: 'Plan capacity upgrade for Ramadan traffic peak', description: 'Traffic models predict +38% evening data volume during Ramadan. Define the capacity plan: UPF scale-out, RAN carrier additions on the top 40 congested sites, and a freeze calendar.', status: 'OPEN', priority: 'HIGH', projectId: 3, creatorUuid: 'u-mohamed', createdAt: now - 36 * H, updatedAt: now - 7 * H, assignedUuids: ['u-mohamed', 'u-leila'] },
  { id: 18, title: 'Audit logging gaps in payment service', description: 'Refund operations initiated through the back-office are not written to the payment audit trail. Compliance flagged this in the Q1 review.\n\nScope: emit audit events for refund, chargeback and manual adjustment flows.', status: 'OPEN', priority: 'CRITICAL', projectId: 4, creatorUuid: 'u-amina', createdAt: now - 20 * H, updatedAt: now - 20 * H, assignedUuids: ['u-karim'] },
  { id: 17, title: 'IVR menu routing misconfigured for Arabic', description: 'Arabic IVR option 4 (billing inquiries) routes to the technical support queue. Callers bounce and abandon rate on that path is 3x the average. Fixed in the IVR flow and regression-tested both languages.', status: 'DONE', priority: 'MEDIUM', projectId: 2, creatorUuid: 'u-yassine', createdAt: now - 18 * D, updatedAt: now - 10 * D, closedAt: now - 10 * D, closedByUuid: 'u-yassine', assignedUuids: ['u-nour'] },
  { id: 16, title: 'Roaming data bundles not activating for postpaid', description: 'Postpaid subscribers purchasing roaming bundles via USSD receive confirmation SMS but data remains blocked abroad. Partner clearinghouse confirms bundle events never arrive.', status: 'IN_PROGRESS', priority: 'HIGH', projectId: 4, creatorUuid: 'u-nour', createdAt: now - 15 * H, updatedAt: now - 2 * H, assignedUuids: ['u-karim', 'u-nour'] },
]

export const seedComments: Comment[] = [
  { id: 1, issueId: 42, title: 'Initial triage', content: 'Checked the transmission alarms — drops correlate with the new microwave hop going into adaptive modulation. Signal looks marginal in rain fade conditions.', authorUuid: 'u-leila', authorUserName: 'lhaddad', createdAt: now - 100 * 60000 },
  { id: 2, issueId: 42, content: 'Agreed. I asked the vendor for the ACM logs. If modulation is flapping we should raise the fade margin on that hop or reroute via the fiber ring.', authorUuid: 'u-tarek', authorUserName: 'tomar', createdAt: now - 90 * 60000, parentCommentId: 1 },
  { id: 3, issueId: 42, content: 'Vendor confirms an alignment issue after last week\'s maintenance. Tower crew scheduled tomorrow morning — I\'ll update once the link is re-aligned.', authorUuid: 'u-mohamed', authorUserName: 'mali', createdAt: now - 40 * 60000, parentCommentId: 1 },
  { id: 4, issueId: 41, content: 'pcap from last night attached to the issue. Retransmissions spike exactly when latency jumps — looks like bufferbloat on the N6 switch, not the UPF itself.', authorUuid: 'u-hatem', authorUserName: 'hkhelifi', createdAt: now - 20 * H },
  { id: 5, issueId: 41, title: 'Capacity decision', content: 'Let\'s not wait for the hardware RMA. Proceed with the horizontal UPF scale-out plan and validate on Thursday\'s peak window.', authorUuid: 'u-mohamed', authorUserName: 'mali', createdAt: now - 5 * H },
  { id: 6, issueId: 40, content: 'Reproduced on a test account with 4 lines. The profile lookup does a sequential query per line — that\'s the 30s. Preparing a fix with a single batched query.', authorUuid: 'u-karim', authorUserName: 'kmansour', createdAt: now - 3 * H },
  { id: 7, issueId: 40, content: 'This comment was removed by moderation.', authorUuid: 'u-nour', authorUserName: 'nbouzid', createdAt: now - 2 * H, deleted: true },
  { id: 8, issueId: 22, content: 'DKIM selectors are aligned now, but Gmail reputation is still recovering. Proposing we move eSIM emails to the transactional IP pool with a separate subdomain.', authorUuid: 'u-hatem', authorUserName: 'hkhelifi', createdAt: now - 7 * H },
  { id: 9, issueId: 22, content: 'Good call — I\'ll draft the communication for affected customers in the meantime so care agents have a script.', authorUuid: 'u-ines', authorUserName: 'iayari', createdAt: now - 6 * H, parentCommentId: 8 },
  { id: 10, issueId: 24, content: 'Confirmed: the dispatcher keeps a stale snapshot of agent states. Restarting the service clears it, which matches what we observed. Working on a state-refresh fix.', authorUuid: 'u-nour', authorUserName: 'nbouzid', createdAt: now - 3 * H },
]

export const seedAttachments: Attachment[] = [
  { id: 1, issueId: 42, fileName: 'bsc042-signaling-trace.pcap', contentType: 'application/vnd.tcpdump.pcap', sizeBytes: 2_514_000, uploadedByUuid: 'u-leila', uploadedAt: now - 100 * 60000 },
  { id: 2, issueId: 42, fileName: 'site-tn-bsc-042-photos.zip', contentType: 'application/zip', sizeBytes: 8_493_000, uploadedByUuid: 'u-tarek', uploadedAt: now - 80 * 60000 },
  { id: 3, issueId: 41, fileName: 'upf-latency-report-peak-hours.pdf', contentType: 'application/pdf', sizeBytes: 1_203_000, uploadedByUuid: 'u-hatem', uploadedAt: now - 20 * H },
  { id: 4, issueId: 22, fileName: 'gmail-postmaster-reputation.png', contentType: 'image/png', sizeBytes: 640_000, uploadedByUuid: 'u-hatem', uploadedAt: now - 7 * H },
  { id: 5, issueId: 25, fileName: 'postgres16-extension-audit.md', contentType: 'text/markdown', sizeBytes: 18_400, uploadedByUuid: 'u-hatem', uploadedAt: now - 9 * D },
]

```

## FILE: src/hooks/use-mobile.ts

```typescript
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

```

## FILE: src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 220 23% 97%;
    --foreground: 0 0% 9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 9%;
    --primary: 356 100% 45%;
    --primary-foreground: 0 0% 100%;
    --secondary: 220 14% 95%;
    --secondary-foreground: 0 0% 9%;
    --muted: 220 14% 95%;
    --muted-foreground: 220 9% 46%;
    --accent: 356 100% 97%;
    --accent-foreground: 356 90% 36%;
    --destructive: 356 90% 42%;
    --destructive-foreground: 0 0% 100%;
    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 356 100% 45%;
    --radius: 0.5rem;
    --sidebar-background: 0 0% 100%;
    --sidebar-foreground: 0 0% 9%;
    --sidebar-primary: 356 100% 45%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 220 14% 95%;
    --sidebar-accent-foreground: 0 0% 9%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 356 100% 45%;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
@layer base {
  html {
    font-family: 'Inter Variable', Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
}

@layer utilities {
  .scrollbar-thin::-webkit-scrollbar { width: 6px; height: 6px; }
  .scrollbar-thin::-webkit-scrollbar-thumb { background: hsl(220 13% 85%); border-radius: 999px; }
  .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
  .kanban-col-drop { background: hsl(356 100% 97%); outline: 2px dashed hsl(356 100% 80%); outline-offset: -6px; }
}

```

## FILE: src/lib/helpers.ts

```typescript
import type { IssueStatus, Priority, ProjectCategory, Role, User } from '@/types'

export function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 30) return `${d}d ago`
  const mo = Math.floor(d / 30)
  if (mo < 12) return `${mo}mo ago`
  return `${Math.floor(mo / 12)}y ago`
}

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function initials(u: Pick<User, 'firstName' | 'lastName'>): string {
  return `${u.firstName[0] ?? ''}${u.lastName[0] ?? ''}`.toUpperCase()
}

export const STATUS_ORDER: IssueStatus[] = ['OPEN', 'IN_PROGRESS', 'DONE']
export const PRIORITY_ORDER: Priority[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
export const CATEGORY_ORDER: ProjectCategory[] = ['SOFTWARE', 'SUPPORT', 'INTERNAL']
export const ROLE_ORDER: Role[] = ['ADMIN', 'MANAGER', 'USER']

export const STATUS_LABEL: Record<IssueStatus, string> = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
}

export const PRIORITY_LABEL: Record<Priority, string> = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical',
}

export const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  SOFTWARE: 'Software',
  SUPPORT: 'Support',
  INTERNAL: 'Internal',
}

export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

```

## FILE: src/lib/issueQuery.ts

```typescript
import type { Issue, IssueFilters, SortDir, SortField } from '@/types'
import { PRIORITY_ORDER, STATUS_ORDER } from '@/lib/helpers'

export function applyIssueQuery(
  issues: Issue[],
  filters: IssueFilters,
  sortField: SortField,
  sortDir: SortDir,
  scopeProjectId?: number,
): Issue[] {
  let out = issues
  if (scopeProjectId != null) out = out.filter((i) => i.projectId === scopeProjectId)
  if (filters.projectId != null) out = out.filter((i) => i.projectId === filters.projectId)
  if (filters.status) out = out.filter((i) => i.status === filters.status)
  if (filters.priority) out = out.filter((i) => i.priority === filters.priority)
  if (filters.assigneeUuid) out = out.filter((i) => i.assignedUuids.includes(filters.assigneeUuid!))

  const dir = sortDir === 'asc' ? 1 : -1
  return [...out].sort((a, b) => {
    switch (sortField) {
      case 'createdAt': return (a.createdAt - b.createdAt) * dir
      case 'updatedAt': return (a.updatedAt - b.updatedAt) * dir
      case 'status': return (STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)) * dir
      case 'priority': return (PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority)) * dir
    }
  })
}

export function activeFilterCount(f: IssueFilters, scopeProjectId?: number): number {
  let n = 0
  if (f.projectId != null && scopeProjectId == null) n++
  if (f.status) n++
  if (f.priority) n++
  if (f.assigneeUuid) n++
  return n
}

```

## FILE: src/lib/permissions.ts

```typescript
import type { Comment, Issue, Project, User } from '@/types'

/** Single source of truth for role-based UI. Mirrors backend authorization. */

export const isAdmin = (u: User) => u.role === 'ADMIN'
export const isManager = (u: User) => u.role === 'MANAGER'
export const isStaff = (u: User) => u.role === 'ADMIN' || u.role === 'MANAGER'

// Issues
export function canEditIssue(u: User, i: Issue): boolean {
  if (i.status === 'DONE') return false // closed issues are locked
  return isStaff(u) || i.creatorUuid === u.uuid || i.assignedUuids.includes(u.uuid)
}

export function canChangeStatus(u: User, i: Issue): boolean {
  return isStaff(u) || i.creatorUuid === u.uuid || i.assignedUuids.includes(u.uuid)
}

export function canDeleteIssue(u: User): boolean {
  return isStaff(u)
}

// Comments
export function canEditComment(u: User, c: Comment): boolean {
  return isStaff(u) || c.authorUuid === u.uuid
}

export function canDeleteComment(u: User, c: Comment): boolean {
  return isStaff(u) || c.authorUuid === u.uuid
}

// Attachments
export function canUploadAttachment(u: User, i: Issue): boolean {
  return canEditIssue(u, i)
}

export function canDeleteAttachment(u: User, i: Issue, uploadedByUuid: string): boolean {
  if (i.status === 'DONE') return isStaff(u)
  return isStaff(u) || uploadedByUuid === u.uuid
}

// Projects
export function canCreateProject(u: User): boolean {
  return isStaff(u)
}

export function canEditProject(u: User, _p: Project): boolean {
  return isStaff(u)
}

export function canDeleteProject(u: User): boolean {
  return isAdmin(u)
}

export function canChangeProjectCategory(u: User): boolean {
  return isAdmin(u)
}

// Admin
export function canManageUsers(u: User): boolean {
  return isAdmin(u)
}

```

## FILE: src/lib/utils.ts

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

## FILE: src/main.tsx

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import '@fontsource-variable/inter'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

```

## FILE: src/pages/AdminUsers.tsx

```tsx
import { useState } from 'react'
import { Eye, Search, ShieldAlert } from 'lucide-react'
import { useStore } from '@/store/AppStore'
import { AppShell } from '@/components/AppShell'
import { EmptyState, RoleBadge, UserAvatar } from '@/components/bits'
import { isAdmin } from '@/lib/permissions'
import { ROLE_ORDER } from '@/lib/helpers'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import type { Role, User } from '@/types'

export function AdminUsersPage() {
  const s = useStore()
  const me = s.currentUser!
  const [q, setQ] = useState('')
  const [pending, setPending] = useState<{ user: User; role: Role } | null>(null)

  if (!isAdmin(me)) {
    return (
      <AppShell title="User Management" breadcrumb="Admin">
        <div className="mx-auto max-w-[1100px] px-4 py-5 lg:px-6">
          <EmptyState
            title="Restricted area"
            hint="User management is only available to administrators."
            action={<Button size="sm" variant="outline" onClick={() => s.navigate({ name: 'dashboard' })}>Back to Dashboard</Button>}
          />
        </div>
      </AppShell>
    )
  }

  const query = q.trim().toLowerCase()
  const users = s.users.filter((u) => !query || `${u.firstName} ${u.lastName}`.toLowerCase().includes(query) || u.username.toLowerCase().includes(query))

  return (
    <AppShell title="User Management" breadcrumb="Admin / User Management">
      <div className="mx-auto max-w-[1100px] space-y-4 px-4 py-5 lg:px-6">
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800">
          <ShieldAlert className="mt-0.5 size-4 shrink-0 text-amber-500" />
          Role changes take effect immediately for all sessions. New registrations always start with the USER role.
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search users…"
            className="h-9 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 text-sm shadow-xs outline-none focus:border-[#E60012]/50 focus:ring-2 focus:ring-[#E60012]/15"
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xs">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-50/80 hover:bg-neutral-50/80">
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider">User</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Username</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Role</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Bio</TableHead>
                <TableHead className="text-right text-[11px] font-semibold uppercase tracking-wider">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => {
                const isSelf = u.uuid === me.uuid
                return (
                  <TableRow key={u.uuid}>
                    <TableCell>
                      <span className="flex items-center gap-2.5">
                        <UserAvatar user={u} size="sm" />
                        <span className="text-[13px] font-semibold text-neutral-800">{u.firstName} {u.lastName}{isSelf && <span className="ml-1 text-[10px] font-medium text-neutral-400">(you)</span>}</span>
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-neutral-500">@{u.username}</TableCell>
                    <TableCell>
                      {isSelf ? (
                        <RoleBadge role={u.role} />
                      ) : (
                        <Select value={u.role} onValueChange={(v) => setPending({ user: u, role: v as Role })}>
                          <SelectTrigger className="h-7 w-32 bg-white text-xs shadow-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {ROLE_ORDER.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>
                    <TableCell><span className="line-clamp-1 max-w-56 text-xs text-neutral-500">{u.bio || '—'}</span></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-xs" onClick={() => s.navigate(isSelf ? { name: 'profile' } : { name: 'user', uuid: u.uuid })}>
                        <Eye className="size-3.5" /> View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
              {users.length === 0 && (
                <TableRow><TableCell colSpan={5} className="py-10 text-center text-xs text-neutral-400">No users match "{q}".</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <AlertDialog open={!!pending} onOpenChange={(v) => !v && setPending(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change role for {pending?.user.firstName} {pending?.user.lastName}?</AlertDialogTitle>
            <AlertDialogDescription>
              This changes their access from <strong>{pending?.user.role}</strong> to <strong>{pending?.role}</strong>. They will immediately gain or lose the associated permissions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-[#E60012] hover:bg-[#B0000E]" onClick={() => { if (pending) s.changeUserRole(pending.user.uuid, pending.role); setPending(null) }}>
              Confirm Role Change
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppShell>
  )
}

```

## FILE: src/pages/Auth.tsx

```tsx
import { useState, type FormEvent, type ChangeEvent } from 'react'
import { Eye, EyeOff, KeyRound, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Spinner } from '@/components/ui/spinner'
import { LogoLockup, RoleBadge, UserAvatar } from '@/components/bits'
import { useStore } from '@/store/AppStore'
import { cn } from '@/lib/utils'

function BrandPanel() {
  return (
    <div className="relative hidden w-[44%] flex-col justify-between overflow-hidden bg-[#B0000E] p-10 text-white lg:flex">
      <div className="absolute -right-32 -top-32 size-96 rounded-full bg-[#E60012]/60" />
      <div className="absolute -bottom-40 -left-24 size-[28rem] rounded-full bg-[#E60012]/40" />
      <div className="absolute bottom-24 right-16 size-40 rounded-full border-[10px] border-white/15" />
      <div className="relative flex items-center gap-3">
        <LogoLockup />
        <span className="rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">Internal</span>
      </div>
      <div className="relative">
        <h2 className="text-3xl font-bold leading-tight tracking-tight">One place for every<br />network &amp; product issue.</h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
          Ooredoo's internal issue tracker — triage faster, keep projects moving, and give every team a clear view of what needs attention.
        </p>
        <div className="mt-6 flex gap-2 text-[11px] font-semibold">
          {['Kanban boards', 'Threaded comments', 'Role-based access'].map((t) => (
            <span key={t} className="rounded-full bg-white/12 px-3 py-1 ring-1 ring-inset ring-white/20">{t}</span>
          ))}
        </div>
      </div>
      <p className="relative text-[11px] text-white/50">Internal platform · Authorized Ooredoo personnel only</p>
    </div>
  )
}

export function LoginPage({ onSwitch }: { onSwitch: () => void }) {
  const s = useStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e?: FormEvent, u = username, p = password) => {
    e?.preventDefault()
    setBusy(true); setError(null)
    const err = await s.login(u, p)
    setBusy(false)
    if (err) setError(err)
  }

  const demoAccounts = [
    { username: 'amina.bs', label: 'Admin demo', role: 'ADMIN' as const },
    { username: 'mali', label: 'Manager demo', role: 'MANAGER' as const },
    { username: 'tomar', label: 'User demo', role: 'USER' as const },
  ]

  return (
    <div className="flex min-h-screen bg-white">
      <BrandPanel />
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden"><LogoLockup /></div>
          <h1 className="mt-8 text-2xl font-bold tracking-tight text-neutral-900">Sign in</h1>
          <p className="mt-1 text-sm text-neutral-500">Use your Ooredoo workspace credentials.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {error && (
              <div className="rounded-lg border border-[#E60012]/25 bg-red-50 px-3.5 py-2.5 text-[13px] font-medium text-[#B0000E]">{error}</div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input id="username" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g. amina.bs" className="h-10" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPw ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="h-10 pr-10" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600" aria-label="Toggle password visibility">
                  {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="h-10 w-full bg-[#E60012] font-semibold hover:bg-[#B0000E]" disabled={busy || !username || !password}>
              {busy && <Spinner className="size-4" />} Sign In
            </Button>
          </form>

          <div className="mt-6">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Quick demo access</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {demoAccounts.map((d) => {
                const u = s.users.find((x) => x.username === d.username)!
                return (
                  <button
                    key={d.username}
                    disabled={busy}
                    onClick={() => { setUsername(d.username); setPassword('ooredoo123'); submit(undefined, d.username, 'ooredoo123') }}
                    className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 px-2 py-3 transition hover:border-[#E60012]/40 hover:bg-red-50/40"
                  >
                    <UserAvatar user={u} size="md" />
                    <span className="text-[11px] font-semibold text-neutral-700">{d.label}</span>
                    <RoleBadge role={d.role} />
                  </button>
                )
              })}
            </div>
            <p className="mt-2 text-center text-[11px] text-neutral-400">Demo password for all seeded accounts: <code className="rounded bg-neutral-100 px-1">ooredoo123</code></p>
          </div>

          <p className="mt-8 text-center text-sm text-neutral-500">
            New to the platform?{' '}
            <button onClick={onSwitch} className="font-semibold text-[#E60012] hover:underline">Create an account</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export function RegisterPage({ onSwitch }: { onSwitch: () => void }) {
  const s = useStore()
  const [form, setForm] = useState({ firstName: '', lastName: '', username: '', password: '', confirm: '', bio: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const set = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required.'
    if (!form.lastName.trim()) e.lastName = 'Last name is required.'
    if (!/^[a-z0-9._-]{3,}$/i.test(form.username.trim())) e.username = 'Username must be 3+ characters (letters, numbers, . _ -).'
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters.'
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setBusy(true); setServerError(null)
    const err = await s.register({ firstName: form.firstName, lastName: form.lastName, username: form.username, password: form.password, bio: form.bio })
    setBusy(false)
    if (err) setServerError(err)
  }

  const err = (k: string) => errors[k] && <p className="text-xs text-[#B0000E]">{errors[k]}</p>

  return (
    <div className="flex min-h-screen bg-white">
      <BrandPanel />
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden"><LogoLockup /></div>
          <h1 className="mt-8 text-2xl font-bold tracking-tight text-neutral-900">Create your account</h1>
          <p className="mt-1 text-sm text-neutral-500">New accounts are created with the USER role. An administrator can change roles later.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {serverError && (
              <div className="rounded-lg border border-[#E60012]/25 bg-red-50 px-3.5 py-2.5 text-[13px] font-medium text-[#B0000E]">{serverError}</div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>First name <span className="text-[#E60012]">*</span></Label>
                <Input value={form.firstName} onChange={set('firstName')} placeholder="Amina" className={cn('h-10', errors.firstName && 'border-[#E60012]')} />
                {err('firstName')}
              </div>
              <div className="space-y-1.5">
                <Label>Last name <span className="text-[#E60012]">*</span></Label>
                <Input value={form.lastName} onChange={set('lastName')} placeholder="Ben Salah" className={cn('h-10', errors.lastName && 'border-[#E60012]')} />
                {err('lastName')}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Username <span className="text-[#E60012]">*</span></Label>
              <Input value={form.username} onChange={set('username')} placeholder="amina.bs" autoComplete="username" className={cn('h-10', errors.username && 'border-[#E60012]')} />
              {err('username')}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Password <span className="text-[#E60012]">*</span></Label>
                <div className="relative">
                  <Input type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')} placeholder="8+ characters" autoComplete="new-password" className={cn('h-10 pr-9', errors.password && 'border-[#E60012]')} />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400" aria-label="Toggle password">{showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button>
                </div>
                {err('password')}
              </div>
              <div className="space-y-1.5">
                <Label>Confirm password <span className="text-[#E60012]">*</span></Label>
                <Input type={showPw ? 'text' : 'password'} value={form.confirm} onChange={set('confirm')} autoComplete="new-password" className={cn('h-10', errors.confirm && 'border-[#E60012]')} />
                {err('confirm')}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Bio <span className="font-normal text-neutral-400">(optional)</span></Label>
              <Textarea rows={2} value={form.bio} onChange={set('bio')} placeholder="Your team and role, e.g. Field engineer — central region" />
            </div>
            <Button type="submit" className="h-10 w-full bg-[#E60012] font-semibold hover:bg-[#B0000E]" disabled={busy}>
              {busy ? <Spinner className="size-4" /> : <KeyRound className="size-4" />} Create Account
            </Button>
          </form>

          <div className="mt-4 flex items-start gap-2 rounded-lg bg-neutral-50 px-3.5 py-2.5 text-[11px] leading-relaxed text-neutral-500">
            <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-neutral-400" />
            Accounts are provisioned with least privilege by default. Contact an administrator for elevated access.
          </div>

          <p className="mt-6 text-center text-sm text-neutral-500">
            Already have an account?{' '}
            <button onClick={onSwitch} className="font-semibold text-[#E60012] hover:underline">Sign in</button>
          </p>
        </div>
      </div>
    </div>
  )
}

```

## FILE: src/pages/BoardPage.tsx

```tsx
import { useStore } from '@/store/AppStore'
import { AppShell, CreateIssueButton } from '@/components/AppShell'
import { IssueWorkspace } from '@/components/IssueWorkspace'

export function BoardPage({ onCreateIssue }: { onCreateIssue: () => void }) {
  const s = useStore()
  return (
    <AppShell title="Issue Board" breadcrumb="Main / Issue Board" primaryAction={<CreateIssueButton onClick={onCreateIssue} />}>
      <div className="mx-auto max-w-[1400px] px-4 py-5 lg:px-6">
        <div className="mb-4">
          <p className="text-xs text-neutral-500">
            {s.issues.length} issues across {new Set(s.issues.map((i) => i.projectId)).size} projects · drag cards between columns to change status
          </p>
        </div>
        <IssueWorkspace onCreateIssue={onCreateIssue} />
      </div>
    </AppShell>
  )
}

```

## FILE: src/pages/Dashboard.tsx

```tsx
import { AlertOctagon, ArrowRight, CheckCircle2, CircleDot, Loader } from 'lucide-react'
import { useStore } from '@/store/AppStore'
import { AppShell, CreateIssueButton } from '@/components/AppShell'
import { IssueWorkspace } from '@/components/IssueWorkspace'
import { PriorityBadge, StatusBadge, UserAvatar } from '@/components/bits'
import { timeAgo } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import type { IssueStatus } from '@/types'

function KpiCard({ label, value, icon, tone, onClick, active }: {
  label: string; value: number; icon: React.ReactNode; tone: string; onClick?: () => void; active?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex items-center gap-3.5 rounded-xl border bg-white p-4 text-left shadow-xs transition-all hover:shadow-md',
        active ? 'border-[#E60012]/40 ring-2 ring-[#E60012]/15' : 'border-neutral-200 hover:border-neutral-300',
      )}
    >
      <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-lg', tone)}>{icon}</span>
      <span>
        <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400">{label}</span>
        <span className="block text-2xl font-bold tabular-nums tracking-tight text-neutral-900">{value}</span>
      </span>
    </button>
  )
}

export function DashboardPage({ onCreateIssue }: { onCreateIssue: () => void }) {
  const s = useStore()
  const open = s.issues.filter((i) => i.status === 'OPEN').length
  const inProgress = s.issues.filter((i) => i.status === 'IN_PROGRESS').length
  const done = s.issues.filter((i) => i.status === 'DONE').length
  const critical = s.issues.filter((i) => i.priority === 'CRITICAL' && i.status !== 'DONE').length

  const attention = s.issues
    .filter((i) => i.status !== 'DONE' && (i.priority === 'CRITICAL' || i.priority === 'HIGH'))
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 5)

  const filterBy = (status?: IssueStatus, priority?: 'CRITICAL') => {
    s.clearFilters()
    if (status) s.setFilters({ status })
    if (priority) s.setFilters({ priority })
  }

  return (
    <AppShell title="Dashboard" breadcrumb="Main / Dashboard" primaryAction={<CreateIssueButton onClick={onCreateIssue} />}>
      <div className="mx-auto max-w-[1400px] space-y-5 px-4 py-5 lg:px-6">
        {/* KPI row */}
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          <KpiCard label="Open Issues" value={open} icon={<CircleDot className="size-5" />} tone="bg-blue-50 text-blue-600" active={s.filters.status === 'OPEN'} onClick={() => filterBy('OPEN')} />
          <KpiCard label="In Progress" value={inProgress} icon={<Loader className="size-5" />} tone="bg-amber-50 text-amber-600" active={s.filters.status === 'IN_PROGRESS'} onClick={() => filterBy('IN_PROGRESS')} />
          <KpiCard label="Done" value={done} icon={<CheckCircle2 className="size-5" />} tone="bg-emerald-50 text-emerald-600" active={s.filters.status === 'DONE'} onClick={() => filterBy('DONE')} />
          <KpiCard label="Critical" value={critical} icon={<AlertOctagon className="size-5" />} tone="bg-red-50 text-[#E60012]" active={s.filters.priority === 'CRITICAL'} onClick={() => filterBy(undefined, 'CRITICAL')} />
        </div>

        {/* Needs attention */}
        <div className="rounded-xl border border-neutral-200 bg-white shadow-xs">
          <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
            <h2 className="text-sm font-bold text-neutral-900">Needs attention</h2>
            <button className="flex items-center gap-1 text-xs font-semibold text-[#E60012] hover:underline" onClick={() => { filterBy(undefined, 'CRITICAL') }}>
              View critical <ArrowRight className="size-3.5" />
            </button>
          </div>
          <div className="divide-y divide-neutral-50">
            {attention.length === 0 && <p className="px-4 py-6 text-center text-xs text-neutral-400">Nothing urgent right now. Great job.</p>}
            {attention.map((i) => {
              const project = s.getProject(i.projectId)
              return (
                <button key={i.id} onClick={() => s.openIssue(i.id)} className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-neutral-50">
                  <span className="font-mono text-[11px] text-neutral-400">#{i.id}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium text-neutral-800">{i.title}</span>
                    <span className="block truncate text-[11px] text-neutral-400">{project?.title}</span>
                  </span>
                  <PriorityBadge priority={i.priority} />
                  <StatusBadge status={i.status} />
                  <span className="hidden w-16 text-right text-[11px] text-neutral-400 sm:block">{timeAgo(i.updatedAt)}</span>
                  {(() => {
                    const creator = s.getUser(i.creatorUuid)
                    return creator ? <UserAvatar user={creator} size="xs" /> : null
                  })()}
                </button>
              )
            })}
          </div>
        </div>

        {/* Issue workspace */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-neutral-900">Issue Workspace</h2>
            <p className="text-xs text-neutral-400">{s.issues.length} issues total</p>
          </div>
          <IssueWorkspace onCreateIssue={onCreateIssue} />
        </div>
      </div>
    </AppShell>
  )
}

```

## FILE: src/pages/Profiles.tsx

```tsx
import { useRef, useState } from 'react'
import { Camera, Pencil, X } from 'lucide-react'
import { toast } from 'sonner'
import { useStore } from '@/store/AppStore'
import { AppShell } from '@/components/AppShell'
import { EmptyState, PriorityBadge, RoleBadge, StatusBadge, UserAvatar } from '@/components/bits'
import { timeAgo } from '@/lib/helpers'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Spinner } from '@/components/ui/spinner'
import type { Issue, User } from '@/types'

function IssueList({ title, issues, empty }: { title: string; issues: Issue[]; empty: string }) {
  const s = useStore()
  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-xs">
      <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
        <h3 className="text-sm font-bold text-neutral-900">{title}</h3>
        <span className="rounded-md bg-neutral-100 px-1.5 py-0.5 text-[11px] font-semibold text-neutral-500">{issues.length}</span>
      </div>
      {issues.length === 0 ? (
        <p className="px-4 py-8 text-center text-xs text-neutral-400">{empty}</p>
      ) : (
        <div className="divide-y divide-neutral-50">
          {issues.map((i) => {
            const project = s.getProject(i.projectId)
            return (
              <button key={i.id} onClick={() => s.openIssue(i.id)} className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-neutral-50">
                <span className="font-mono text-[11px] text-neutral-400">#{i.id}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium text-neutral-800">{i.title}</span>
                  <span className="block truncate text-[11px] text-neutral-400">{project?.title}</span>
                </span>
                <PriorityBadge priority={i.priority} />
                <StatusBadge status={i.status} />
                <span className="hidden w-16 text-right text-[11px] text-neutral-400 sm:block">{timeAgo(i.updatedAt)}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function ProfileHero({ user, isSelf, onEdit }: { user: User; isSelf: boolean; onEdit?: () => void }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-xs">
      <div className="flex flex-wrap items-center gap-5">
        <UserAvatar user={user} size="xl" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-xl font-bold tracking-tight text-neutral-900">{user.firstName} {user.lastName}</h2>
            <RoleBadge role={user.role} />
          </div>
          <p className="mt-0.5 text-sm text-neutral-400">@{user.username}</p>
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-neutral-600">{user.bio || 'No bio yet.'}</p>
        </div>
        {isSelf && onEdit && (
          <Button variant="outline" onClick={onEdit}><Pencil className="size-3.5" /> Edit Profile</Button>
        )}
      </div>
    </div>
  )
}

export function MyProfilePage() {
  const s = useStore()
  const me = s.currentUser!
  const [editOpen, setEditOpen] = useState(false)
  const assigned = s.issues.filter((i) => i.assignedUuids.includes(me.uuid) && i.status !== 'DONE')
  const closed = s.issues.filter((i) => i.closedByUuid === me.uuid)

  return (
    <AppShell title="My Profile" breadcrumb="Settings / My Profile">
      <div className="mx-auto max-w-[1100px] space-y-5 px-4 py-5 lg:px-6">
        <ProfileHero user={me} isSelf onEdit={() => setEditOpen(true)} />
        <IssueList title="Assigned to me" issues={assigned} empty="No issues currently assigned to you." />
        <IssueList title="Closed by me" issues={closed} empty="You haven't closed any issues yet." />
      </div>
      <EditProfileDialog open={editOpen} onClose={() => setEditOpen(false)} />
    </AppShell>
  )
}

export function UserProfilePage({ uuid }: { uuid: string }) {
  const s = useStore()
  const user = s.getUser(uuid)
  if (!user) {
    return (
      <AppShell title="User Profile" breadcrumb="Team / Profile">
        <div className="mx-auto max-w-[1100px] px-4 py-5 lg:px-6">
          <EmptyState title="User not found" hint="This profile may no longer exist." action={<Button size="sm" variant="outline" onClick={() => s.navigate({ name: 'team' })}>Back to Team</Button>} />
        </div>
      </AppShell>
    )
  }
  const assigned = s.issues.filter((i) => i.assignedUuids.includes(uuid) && i.status !== 'DONE')
  const closed = s.issues.filter((i) => i.closedByUuid === uuid)

  return (
    <AppShell title={`${user.firstName} ${user.lastName}`} breadcrumb="Team / Profile">
      <div className="mx-auto max-w-[1100px] space-y-5 px-4 py-5 lg:px-6">
        <ProfileHero user={user} isSelf={false} />
        <IssueList title="Assigned issues" issues={assigned} empty={`No issues currently assigned to ${user.firstName}.`} />
        <IssueList title="Closed issues" issues={closed} empty={`${user.firstName} hasn't closed any issues yet.`} />
      </div>
    </AppShell>
  )
}

export function EditProfileDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const s = useStore()
  const me = s.currentUser!
  const [firstName, setFirstName] = useState(me.firstName)
  const [lastName, setLastName] = useState(me.lastName)
  const [bio, setBio] = useState(me.bio)
  const [saving, setSaving] = useState(false)
  const [avatarBusy, setAvatarBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const [wasOpen, setWasOpen] = useState(false)
  if (open && !wasOpen) { setFirstName(me.firstName); setLastName(me.lastName); setBio(me.bio); setError(null); setWasOpen(true) }
  else if (!open && wasOpen) setWasOpen(false)

  const handleAvatar = async (f: File) => {
    setAvatarBusy(true)
    const err = await s.uploadAvatar(f)
    setAvatarBusy(false)
    if (err) toast.error(err)
  }

  const submit = async () => {
    if (!firstName.trim() || !lastName.trim()) { setError('First and last name are required.'); return }
    setSaving(true)
    await s.updateProfile({ firstName: firstName.trim(), lastName: lastName.trim(), bio: bio.trim() })
    setSaving(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update how you appear to your team across the tracker.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <UserAvatar user={me} size="xl" />
              <button
                onClick={() => fileRef.current?.click()}
                disabled={avatarBusy}
                className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-[#E60012] text-white shadow-md transition hover:bg-[#B0000E] disabled:opacity-60"
                aria-label="Change avatar"
              >
                {avatarBusy ? <Spinner className="size-3.5 text-white" /> : <Camera className="size-3.5" />}
              </button>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) handleAvatar(f); e.target.value = '' }} />
            </div>
            <div className="text-xs text-neutral-500">
              <p className="font-semibold text-neutral-700">Profile photo</p>
              <p className="mt-0.5">PNG or JPG, up to 3 MB.</p>
              {me.avatarUrl && (
                <button className="mt-1 flex items-center gap-1 font-medium text-[#B0000E] hover:underline" onClick={() => s.clearAvatar()}>
                  <X className="size-3" /> Remove
                </button>
              )}
            </div>
          </div>
          {error && <p className="rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-[#B0000E]">{error}</p>}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>First name <span className="text-[#E60012]">*</span></Label>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Last name <span className="text-[#E60012]">*</span></Label>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Bio</Label>
            <Textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Your team and responsibilities…" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={saving}>Cancel</Button>
          <Button onClick={submit} disabled={saving}>{saving && <Spinner className="size-4" />} Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

```

## FILE: src/pages/ProjectPage.tsx

```tsx
import { useState } from 'react'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useStore } from '@/store/AppStore'
import { AppShell, CreateIssueButton } from '@/components/AppShell'
import { IssueWorkspace } from '@/components/IssueWorkspace'
import { ProjectFormDialog } from '@/components/ProjectForm'
import { CategoryBadge, EmptyState, UserAvatar } from '@/components/bits'
import { canDeleteProject, canEditProject } from '@/lib/permissions'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { CATEGORY_LABEL } from '@/lib/helpers'

export function ProjectPage({ projectId, onCreateIssue }: { projectId: number; onCreateIssue: () => void }) {
  const s = useStore()
  const me = s.currentUser!
  const project = s.getProject(projectId)
  const [editOpen, setEditOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (!project) {
    return (
      <AppShell title="Project" breadcrumb="Projects">
        <div className="mx-auto max-w-[1400px] px-4 py-5 lg:px-6">
          <EmptyState title="Project not found" hint="It may have been deleted." action={<Button size="sm" variant="outline" onClick={() => s.navigate({ name: 'dashboard' })}>Back to Dashboard</Button>} />
        </div>
      </AppShell>
    )
  }

  const leader = s.getUser(project.leaderUuid)
  const openCount = s.issues.filter((i) => i.projectId === project.id && i.status === 'OPEN').length
  const progressCount = s.issues.filter((i) => i.projectId === project.id && i.status === 'IN_PROGRESS').length
  const doneCount = s.issues.filter((i) => i.projectId === project.id && i.status === 'DONE').length

  return (
    <AppShell
      title={project.title}
      breadcrumb={`Projects / ${CATEGORY_LABEL[project.category]}`}
      primaryAction={<CreateIssueButton onClick={onCreateIssue} />}
    >
      <div className="mx-auto max-w-[1400px] space-y-5 px-4 py-5 lg:px-6">
        {/* workspace header */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-lg font-bold tracking-tight text-neutral-900">{project.title}</h2>
                <CategoryBadge category={project.category} />
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">{project.description}</p>
              {leader && (
                <button onClick={() => s.navigate({ name: 'user', uuid: leader.uuid })} className="mt-3 flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-neutral-50">
                  <UserAvatar user={leader} size="xs" />
                  <span className="text-xs text-neutral-500">Led by <span className="font-semibold text-neutral-700">{leader.firstName} {leader.lastName}</span></span>
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="mr-2 hidden items-center gap-3 text-[11px] font-semibold text-neutral-500 sm:flex">
                <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-blue-500" />{openCount} open</span>
                <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-amber-500" />{progressCount} in progress</span>
                <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-emerald-500" />{doneCount} done</span>
              </div>
              {canEditProject(me, project) && (
                <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}><Pencil className="size-3.5" /> Edit Project</Button>
              )}
              {canDeleteProject(me) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon-sm"><MoreHorizontal className="size-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setEditOpen(true)}><Pencil className="size-4" /> Edit project</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-[#B0000E] focus:text-[#B0000E]" onClick={() => setConfirmDelete(true)}>
                      <Trash2 className="size-4" /> Delete project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>

        <IssueWorkspace scopeProjectId={project.id} onCreateIssue={onCreateIssue} />
      </div>

      <ProjectFormDialog open={editOpen} onClose={() => setEditOpen(false)} project={project} />

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{project.title}"?</AlertDialogTitle>
            <AlertDialogDescription>This permanently deletes the project and its {openCount + progressCount + doneCount} issues, including all comments and attachments. This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-[#E60012] hover:bg-[#B0000E]" onClick={() => s.deleteProject(project.id)}>Delete Project</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppShell>
  )
}

```

## FILE: src/pages/TeamPage.tsx

```tsx
import { useMemo, useState } from 'react'
import { ArrowRight, Search, SearchX } from 'lucide-react'
import { useStore } from '@/store/AppStore'
import { AppShell } from '@/components/AppShell'
import { RoleBadge, UserAvatar } from '@/components/bits'

export function TeamPage() {
  const s = useStore()
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)

  const results = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return s.users
    return s.users.filter((u) =>
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(query) ||
      u.username.toLowerCase().includes(query) ||
      u.bio.toLowerCase().includes(query))
  }, [s.users, q])

  const onSearch = (v: string) => {
    setQ(v)
    setLoading(true)
    setTimeout(() => setLoading(false), 250) // mirrors GET /api/users/search?q=
  }

  return (
    <AppShell title="Team" breadcrumb="Main / Team">
      <div className="mx-auto max-w-[1400px] px-4 py-5 lg:px-6">
        <div className="mb-5 max-w-xl">
          <p className="text-sm text-neutral-500">Find people by name, username or bio.</p>
          <div className="relative mt-3">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
            <input
              value={q}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search team members…"
              className="h-11 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 text-sm shadow-xs outline-none transition focus:border-[#E60012]/50 focus:ring-2 focus:ring-[#E60012]/15"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-36 animate-pulse rounded-xl border border-neutral-200 bg-white" />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-neutral-200 bg-white/60 py-14 text-center">
            <SearchX className="size-6 text-neutral-300" />
            <p className="text-sm font-semibold text-neutral-700">No team members found</p>
            <p className="text-xs text-neutral-400">No results for "{q}". Try a different name or username.</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((u) => (
              <div key={u.uuid} className="flex flex-col rounded-xl border border-neutral-200 bg-white p-4 shadow-xs transition hover:border-neutral-300 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <UserAvatar user={u} size="lg" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-bold text-neutral-900">{u.firstName} {u.lastName}</p>
                    <p className="truncate text-xs text-neutral-400">@{u.username}</p>
                    <RoleBadge role={u.role} className="mt-1.5" />
                  </div>
                </div>
                <p className="mt-3 line-clamp-2 min-h-8 text-xs leading-relaxed text-neutral-500">{u.bio || 'No bio yet.'}</p>
                <button
                  onClick={() => s.navigate(u.uuid === s.currentUser?.uuid ? { name: 'profile' } : { name: 'user', uuid: u.uuid })}
                  className="mt-3 flex items-center justify-end gap-1 text-xs font-semibold text-[#E60012] hover:underline"
                >
                  View Profile <ArrowRight className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}

```

## FILE: src/store/AppStore.tsx

```tsx
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { toast } from 'sonner'
import type {
  Attachment, Comment, Issue, IssueFilters, IssueStatus, Priority,
  Project, ProjectCategory, Role, Route, SortDir, SortField, User,
} from '@/types'
import { seedAttachments, seedComments, seedIssues, seedProjects, seedUsers } from '@/data/seed'
import { delay } from '@/lib/helpers'

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
  register: (data: { firstName: string; lastName: string; username: string; password: string; bio: string }) => Promise<string | null>
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
  deleteAttachment: (id: number) => Promise<void>
  createProject: (d: ProjectDraft) => Promise<Project>
  updateProject: (id: number, d: Partial<ProjectDraft>) => Promise<void>
  deleteProject: (id: number) => Promise<void>
  updateProfile: (d: { firstName: string; lastName: string; bio: string }) => Promise<void>
  uploadAvatar: (file: File) => Promise<string | null>
  clearAvatar: () => Promise<void>
  changeUserRole: (uuid: string, role: Role) => Promise<void>
  getUser: (uuid: string) => User | undefined
  getProject: (id: number) => Project | undefined
}

const Ctx = createContext<Store | null>(null)

const emptyFilters: IssueFilters = { projectId: null, status: null, priority: null, assigneeUuid: null }

let issueSeq = 43
let commentSeq = 11
let attachmentSeq = 6
let projectSeq = 7

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>(seedUsers)
  const [projects, setProjects] = useState<Project[]>(seedProjects)
  const [issues, setIssues] = useState<Issue[]>(seedIssues)
  const [comments, setComments] = useState<Comment[]>(seedComments)
  const [attachments, setAttachments] = useState<Attachment[]>(seedAttachments)
  const [route, setRoute] = useState<Route>({ name: 'dashboard' })
  const [filters, setFiltersState] = useState<IssueFilters>(emptyFilters)
  const [sortField, setSortField] = useState<SortField>('updatedAt')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [viewMode, setViewMode] = useState<'board' | 'table'>('board')
  const [openIssueId, setOpenIssueId] = useState<number | null>(null)

  const getUser = useCallback((uuid: string) => users.find((u) => u.uuid === uuid), [users])
  const getProject = useCallback((id: number) => projects.find((p) => p.id === id), [projects])

  const login = useCallback(async (username: string, password: string) => {
    await delay(700)
    const u = users.find((x) => x.username.toLowerCase() === username.trim().toLowerCase())
    if (!u || u.password !== password) return 'Invalid username or password. Please try again.'
    setCurrentUser(u)
    setRoute({ name: 'dashboard' })
    toast.success(`Welcome back, ${u.firstName}`)
    return null
  }, [users])

  const register = useCallback(async (data: { firstName: string; lastName: string; username: string; password: string; bio: string }) => {
    await delay(800)
    if (users.some((x) => x.username.toLowerCase() === data.username.trim().toLowerCase())) {
      return 'This username is already taken.'
    }
    const u: User = {
      uuid: `u-${Date.now()}`,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      username: data.username.trim(),
      role: 'USER',
      bio: data.bio.trim(),
      password: data.password,
    }
    setUsers((prev) => [...prev, u])
    setCurrentUser(u)
    setRoute({ name: 'dashboard' })
    toast.success('Account created. Welcome to Ooredoo Issue Tracker.')
    return null
  }, [users])

  const logout = useCallback(() => {
    setCurrentUser(null)
    setOpenIssueId(null)
  }, [])

  const navigate = useCallback((r: Route) => {
    setRoute(r)
    setOpenIssueId(null)
  }, [])

  const setFilters = useCallback((f: Partial<IssueFilters>) => setFiltersState((prev) => ({ ...prev, ...f })), [])
  const clearFilters = useCallback(() => setFiltersState(emptyFilters), [])
  const setSort = useCallback((field: SortField, dir: SortDir) => { setSortField(field); setSortDir(dir) }, [])
  const openIssue = useCallback((id: number | null) => setOpenIssueId(id), [])

  const createIssue = useCallback(async (d: IssueDraft) => {
    if (!currentUser) throw new Error('Not authenticated')
    await delay(500)
    const issue: Issue = {
      id: issueSeq++,
      title: d.title, description: d.description,
      status: 'OPEN', priority: d.priority, projectId: d.projectId,
      creatorUuid: currentUser.uuid,
      createdAt: Date.now(), updatedAt: Date.now(),
      assignedUuids: d.assignedUuids,
    }
    setIssues((prev) => [issue, ...prev])
    toast.success(`Issue #${issue.id} created`)
    return issue
  }, [currentUser])

  const updateIssue = useCallback(async (id: number, d: Partial<IssueDraft>) => {
    await delay(450)
    setIssues((prev) => prev.map((i) => (i.id === id ? { ...i, ...d, updatedAt: Date.now() } : i)))
    toast.success(`Issue #${id} updated`)
  }, [])

  const updateIssueStatus = useCallback(async (id: number, status: IssueStatus) => {
    if (!currentUser) return
    const before = issues.find((i) => i.id === id)
    if (!before || before.status === status) return
    // optimistic update (PATCH /api/issues/{id}/status)
    const patch = (i: Issue): Issue => ({
      ...i, status, updatedAt: Date.now(),
      closedAt: status === 'DONE' ? Date.now() : undefined,
      closedByUuid: status === 'DONE' ? currentUser.uuid : undefined,
    })
    setIssues((prev) => prev.map((i) => (i.id === id ? patch(i) : i)))
    try {
      await delay(400)
      toast.success(`Issue #${id} moved to ${status.replace('_', ' ')}`)
    } catch {
      setIssues((prev) => prev.map((i) => (i.id === id ? before : i)))
      toast.error('Status update failed — the change was rolled back.')
    }
  }, [currentUser, issues])

  const deleteIssue = useCallback(async (id: number) => {
    await delay(450)
    setIssues((prev) => prev.filter((i) => i.id !== id))
    setComments((prev) => prev.filter((c) => c.issueId !== id))
    setAttachments((prev) => prev.filter((a) => a.issueId !== id))
    setOpenIssueId(null)
    toast.success(`Issue #${id} deleted`)
  }, [])

  const addComment = useCallback(async (issueId: number, content: string, title?: string, parentCommentId?: number) => {
    if (!currentUser) return
    await delay(400)
    const c: Comment = {
      id: commentSeq++, issueId, content,
      title: title?.trim() ? title.trim() : undefined,
      authorUuid: currentUser.uuid, authorUserName: currentUser.username,
      createdAt: Date.now(), parentCommentId,
    }
    setComments((prev) => [...prev, c])
    setIssues((prev) => prev.map((i) => (i.id === issueId ? { ...i, updatedAt: Date.now() } : i)))
    toast.success('Comment posted')
  }, [currentUser])

  const editComment = useCallback(async (id: number, content: string) => {
    await delay(350)
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, content } : c)))
    toast.success('Comment updated')
  }, [])

  const deleteComment = useCallback(async (id: number) => {
    await delay(350)
    // soft delete — stays visible in the thread as [comment deleted]
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, deleted: true, content: '' } : c)))
    toast.success('Comment deleted')
  }, [])

  const uploadAttachment = useCallback(async (issueId: number, file: File) => {
    if (!currentUser) return 'Not authenticated'
    if (file.size > 10 * 1024 * 1024) return 'File exceeds the 10 MB limit.'
    await delay(900)
    const a: Attachment = {
      id: attachmentSeq++, issueId, fileName: file.name,
      contentType: file.type || 'application/octet-stream',
      sizeBytes: file.size, uploadedByUuid: currentUser.uuid, uploadedAt: Date.now(),
    }
    setAttachments((prev) => [...prev, a])
    toast.success(`${file.name} uploaded`)
    return null
  }, [currentUser])

  const deleteAttachment = useCallback(async (id: number) => {
    await delay(350)
    setAttachments((prev) => prev.filter((a) => a.id !== id))
    toast.success('Attachment deleted')
  }, [])

  const createProject = useCallback(async (d: ProjectDraft) => {
    await delay(500)
    const p: Project = { id: projectSeq++, ...d }
    setProjects((prev) => [...prev, p])
    toast.success(`Project "${d.title}" created`)
    return p
  }, [])

  const updateProject = useCallback(async (id: number, d: Partial<ProjectDraft>) => {
    await delay(450)
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...d } : p)))
    toast.success('Project updated')
  }, [])

  const deleteProject = useCallback(async (id: number) => {
    await delay(450)
    setProjects((prev) => prev.filter((p) => p.id !== id))
    setIssues((prev) => prev.filter((i) => i.projectId !== id))
    setRoute({ name: 'dashboard' })
    toast.success('Project deleted')
  }, [])

  const updateProfile = useCallback(async (d: { firstName: string; lastName: string; bio: string }) => {
    if (!currentUser) return
    await delay(450)
    const upd = (u: User) => ({ ...u, ...d })
    setCurrentUser((u) => (u ? upd(u) : u))
    setUsers((prev) => prev.map((u) => (u.uuid === currentUser.uuid ? upd(u) : u)))
    toast.success('Profile updated')
  }, [currentUser])

  const uploadAvatar = useCallback(async (file: File) => {
    if (!currentUser) return 'Not authenticated'
    if (file.size > 3 * 1024 * 1024) return 'Avatar exceeds the 3 MB limit.'
    if (!file.type.startsWith('image/')) return 'Avatar must be an image file.'
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const r = new FileReader()
      r.onload = () => resolve(r.result as string)
      r.onerror = reject
      r.readAsDataURL(file)
    })
    await delay(700)
    setCurrentUser((u) => (u ? { ...u, avatarUrl: dataUrl } : u))
    setUsers((prev) => prev.map((u) => (u.uuid === currentUser.uuid ? { ...u, avatarUrl: dataUrl } : u)))
    toast.success('Avatar updated')
    return null
  }, [currentUser])

  const clearAvatar = useCallback(async () => {
    if (!currentUser) return
    await delay(300)
    setCurrentUser((u) => (u ? { ...u, avatarUrl: undefined } : u))
    setUsers((prev) => prev.map((u) => (u.uuid === currentUser.uuid ? { ...u, avatarUrl: undefined } : u)))
    toast.success('Avatar removed')
  }, [currentUser])

  const changeUserRole = useCallback(async (uuid: string, role: Role) => {
    const before = users.find((u) => u.uuid === uuid)
    if (!before) return
    setUsers((prev) => prev.map((u) => (u.uuid === uuid ? { ...u, role } : u)))
    try {
      await delay(400)
      toast.success(`${before.firstName} ${before.lastName} is now ${role}`)
    } catch {
      setUsers((prev) => prev.map((u) => (u.uuid === uuid ? before : u)))
      toast.error('Role change failed — restored previous role.')
    }
  }, [users])

  const value = useMemo<Store>(() => ({
    currentUser, users, projects, issues, comments, attachments, route,
    filters, sortField, sortDir, viewMode, openIssueId,
    login, register, logout, navigate, setFilters, clearFilters, setSort, setViewMode, openIssue,
    createIssue, updateIssue, updateIssueStatus, deleteIssue,
    addComment, editComment, deleteComment,
    uploadAttachment, deleteAttachment,
    createProject, updateProject, deleteProject,
    updateProfile, uploadAvatar, clearAvatar, changeUserRole,
    getUser, getProject,
  }), [currentUser, users, projects, issues, comments, attachments, route, filters, sortField, sortDir, viewMode, openIssueId,
    login, register, logout, navigate, setFilters, clearFilters, setSort, openIssue,
    createIssue, updateIssue, updateIssueStatus, deleteIssue, addComment, editComment, deleteComment,
    uploadAttachment, deleteAttachment, createProject, updateProject, deleteProject,
    updateProfile, uploadAvatar, clearAvatar, changeUserRole, getUser, getProject])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore(): Store {
  const s = useContext(Ctx)
  if (!s) throw new Error('useStore must be used inside StoreProvider')
  return s
}

```

## FILE: src/types/index.ts

```typescript
export type Role = 'ADMIN' | 'MANAGER' | 'USER'
export type IssueStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE'
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export type ProjectCategory = 'SOFTWARE' | 'SUPPORT' | 'INTERNAL'

export interface User {
  uuid: string
  firstName: string
  lastName: string
  username: string
  role: Role
  bio: string
  avatarUrl?: string
  password: string // mock only — mirrors POST /api/auth/register
}

export interface Project {
  id: number
  title: string
  description: string
  category: ProjectCategory
  leaderUuid: string
}

export interface Issue {
  id: number
  title: string
  description: string
  status: IssueStatus
  priority: Priority
  projectId: number
  creatorUuid: string
  createdAt: number
  updatedAt: number
  closedAt?: number
  closedByUuid?: string
  assignedUuids: string[]
}

export interface Comment {
  id: number
  title?: string
  content: string
  issueId: number
  authorUuid: string
  authorUserName: string
  createdAt: number
  parentCommentId?: number
  deleted?: boolean
}

export interface Attachment {
  id: number
  issueId: number
  fileName: string
  contentType: string
  sizeBytes: number
  uploadedByUuid: string
  uploadedAt: number
  dataUrl?: string
}

export interface IssueFilters {
  projectId: number | null
  status: IssueStatus | null
  priority: Priority | null
  assigneeUuid: string | null
}

export type SortField = 'createdAt' | 'updatedAt' | 'status' | 'priority'
export type SortDir = 'asc' | 'desc'

export type Route =
  | { name: 'dashboard' }
  | { name: 'board' }
  | { name: 'project'; projectId: number }
  | { name: 'team' }
  | { name: 'profile' }
  | { name: 'user'; uuid: string }
  | { name: 'admin-users' }

```

## FILE: tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

## FILE: tsconfig.app.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    },
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}

```

## FILE: tsconfig.json

```json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## FILE: tsconfig.node.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}

```

## FILE: vite.config.ts

```typescript
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

```

## FILE: unpack.py

```python
#!/usr/bin/env python3
import re, sys, os
text = open(sys.argv[1], encoding='utf-8').read()
blocks = re.findall(r"## FILE: (.+?)\n\n```\w*\n(.*?)\n```", text, re.S)
for path, content in blocks:
    if path == 'unpack.py': continue
    os.makedirs(os.path.dirname(path) or '.', exist_ok=True)
    open(path, 'w', encoding='utf-8').write(content)
    print('wrote', path)
print(f'Done: {len(blocks)} files')

```
