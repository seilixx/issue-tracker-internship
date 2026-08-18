import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button'
import { getErrorMessage } from '@/utils/apiClient'
import { AuthLayout } from './components/AuthLayout'
import { useAuth } from './useAuth'
import styles from './components/AuthForm.module.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function RegisterPage() {
  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [touchedConfirm, setTouchedConfirm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const emailValid = mail.trim().length === 0 || EMAIL_PATTERN.test(mail.trim())
  const passwordsMatch = confirmPassword.length === 0 || confirmPassword === password

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setTouchedConfirm(true)

    if (!firstName.trim() || !lastName.trim() || !username.trim() || !mail.trim() || password.length < 6) return
    if (!EMAIL_PATTERN.test(mail.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (submitting) return

    setSubmitting(true)
    setError(null)
    register({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      username: username.trim(),
      mail: mail.trim(),
      password,
    })
      .then(() => navigate('/', { replace: true }))
      .catch((err) => setError(getErrorMessage(err, 'Could not create your account.')))
      .finally(() => setSubmitting(false))
  }

  const canSubmit =
    firstName.trim() && lastName.trim() && username.trim() && mail.trim() && password.length >= 6 && confirmPassword.length >= 6

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Get set up in a minute."
      footer={
        <>
          Already have an account? <Link to="/login">Sign in</Link>
        </>
      }
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="firstName">
              First name
            </label>
            <input
              id="firstName"
              type="text"
              className={styles.input}
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              autoComplete="given-name"
              autoFocus
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="lastName">
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              className={styles.input}
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              autoComplete="family-name"
              required
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            className={styles.input}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="mail">
            Email
          </label>
          <input
            id="mail"
            type="email"
            className={emailValid ? styles.input : `${styles.input} ${styles.inputError}`}
            value={mail}
            onChange={(event) => setMail(event.target.value)}
            autoComplete="email"
            required
          />
          {!emailValid ? <span className={styles.fieldError}>Enter a valid email address.</span> : null}
        </div>

        <div className={styles.row}>
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
              autoComplete="new-password"
              minLength={6}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={passwordsMatch ? styles.input : `${styles.input} ${styles.inputError}`}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              onBlur={() => setTouchedConfirm(true)}
              autoComplete="new-password"
              required
            />
            {touchedConfirm && !passwordsMatch ? <span className={styles.fieldError}>Passwords don&apos;t match.</span> : null}
          </div>
        </div>

        {error ? <p className={styles.formError}>{error}</p> : null}

        <Button type="submit" variant="primary" className={styles.submitButton} disabled={submitting || !canSubmit}>
          {submitting ? (
            <>
              <span className={styles.spinner} aria-hidden="true" />
              Creating account…
            </>
          ) : (
            'Create account'
          )}
        </Button>
      </form>
    </AuthLayout>
  )
}
