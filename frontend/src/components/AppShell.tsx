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
