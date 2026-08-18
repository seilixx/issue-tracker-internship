import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button'
import { getErrorMessage } from '@/utils/apiClient'
import { AuthLayout } from './components/AuthLayout'
import { useAuth } from './useAuth'
import styles from './components/AuthForm.module.css'

export function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (isAuthenticated) {
    const from = (location.state as { from?: Location })?.from
    return <Navigate to={from?.pathname ?? '/'} replace />
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!username.trim() || !password || submitting) return

    setSubmitting(true)
    setError(null)
    login({ username: username.trim(), password })
      .then(() => {
        const from = (location.state as { from?: Location })?.from
        navigate(from?.pathname ?? '/', { replace: true })
      })
      .catch((err) => setError(getErrorMessage(err, 'Invalid username or password.')))
      .finally(() => setSubmitting(false))
  }

  return (
    <AuthLayout
      title="Sign in"
      subtitle="Welcome back — enter your credentials to continue."
      footer={
        <>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </>
      }
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="username">
            Username or email
          </label>
          <input
            id="username"
            type="text"
            className={styles.input}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            autoFocus
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {error ? <p className={styles.formError}>{error}</p> : null}

        <Button
          type="submit"
          variant="primary"
          className={styles.submitButton}
          disabled={submitting || !username.trim() || !password}
        >
          {submitting ? (
            <>
              <span className={styles.spinner} aria-hidden="true" />
              Signing in…
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </AuthLayout>
  )
}
