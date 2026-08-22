import { useState, type FormEvent, type ChangeEvent } from 'react'
import { Eye, EyeOff, KeyRound, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { LogoLockup } from '@/components/bits'
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
  const [form, setForm] = useState({ firstName: '', lastName: '', username: '', mail: '', password: '', confirm: '' })
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.mail.trim())) e.mail = 'A valid email address is required.'
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters.'
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setBusy(true); setServerError(null)
    const err = await s.register({ firstName: form.firstName, lastName: form.lastName, username: form.username, mail: form.mail, password: form.password })
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
              <Label>Email <span className="text-[#E60012]">*</span></Label>
              <Input type="email" value={form.mail} onChange={set('mail')} placeholder="amina.bensalah@ooredoo.tn" autoComplete="email" className={cn('h-10', errors.mail && 'border-[#E60012]')} />
              {err('mail')}
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
