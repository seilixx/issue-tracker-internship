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
