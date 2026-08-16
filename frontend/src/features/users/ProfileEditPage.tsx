import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { EmptyState } from '@/components/EmptyState'
import { Skeleton } from '@/components/Skeleton'
import { IconAlertTriangle } from '@/components/icons'
import { getErrorMessage } from '@/utils/apiClient'
import { getInitials } from '@/utils/format'
import { fetchMyProfile, updateMyProfile } from './api'
import { AvatarUploadControl } from './components/AvatarUploadControl'
import type { UserSummary } from './types'
import styles from './ProfileEditPage.module.css'

export function ProfileEditPage() {
  const [user, setUser] = useState<UserSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [bio, setBio] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchMyProfile()
      .then((me) => {
        if (cancelled) return
        setUser(me)
        setFirstName(me.firstName)
        setLastName(me.lastName)
        setBio(me.bio ?? '')
      })
      .catch((err) => {
        if (!cancelled) setLoadError(getErrorMessage(err, 'Could not load your profile.'))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSaving(true)
    setSaveError(null)
    setSaved(false)
    updateMyProfile({ firstName: firstName.trim(), lastName: lastName.trim(), bio: bio.trim() || undefined })
      .then((updated) => {
        setUser(updated)
        setSaved(true)
      })
      .catch((err) => setSaveError(getErrorMessage(err, 'Could not save your profile.')))
      .finally(() => setSaving(false))
  }

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <Skeleton width="40%" height={28} />
        <Skeleton height={80} />
        <Skeleton height={120} />
      </div>
    )
  }

  if (loadError || !user) {
    return (
      <EmptyState
        tone="error"
        icon={<IconAlertTriangle size={22} />}
        title="Couldn't load your profile"
        description={loadError ?? 'Unknown error'}
      />
    )
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Edit profile</h1>

      <AvatarUploadControl
        avatarUrl={user.avatarUrl}
        initials={getInitials(user.firstName, user.lastName)}
        onUploaded={(updated) => setUser(updated)}
      />

      <form className={styles.form} onSubmit={handleSubmit}>
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
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="bio">
            Bio
          </label>
          <textarea id="bio" className={styles.textarea} value={bio} onChange={(event) => setBio(event.target.value)} rows={4} />
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.saveButton} disabled={saving || !firstName.trim() || !lastName.trim()}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          <Link to={`/profile/${user.uuid}`} className={styles.cancelButton}>
            Cancel
          </Link>
        </div>

        {saveError ? <p className={styles.error}>{saveError}</p> : null}
        {saved ? <p className={styles.success}>Profile updated.</p> : null}
      </form>
    </div>
  )
}
