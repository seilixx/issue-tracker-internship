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
