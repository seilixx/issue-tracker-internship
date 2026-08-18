import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '@/components/toast/useToast'
import { useAuth } from '@/features/auth/useAuth'
import { getErrorMessage } from '@/utils/apiClient'
import { getInitials } from '@/utils/format'
import { updateMyProfile } from './api'
import { AvatarUploadControl } from './components/AvatarUploadControl'
import { setCachedUser } from './userCache'
import type { UserSummary } from './types'
import styles from './ProfileEditPage.module.css'

export function ProfileEditPage() {
  // Reads straight from the session (AuthProvider already loaded it at mount) —
  // no separate fetch/loading state needed, and it's the single source of truth
  // this page writes back to via auth.setUser() below.
  const { user, setUser } = useAuth()
  const { showToast } = useToast()

  const [firstName, setFirstName] = useState(user?.firstName ?? '')
  const [lastName, setLastName] = useState(user?.lastName ?? '')
  const [bio, setBio] = useState(user?.bio ?? '')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  if (!user) return null

  function applyUpdate(updated: UserSummary) {
    setUser(updated)
    setCachedUser(updated)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSaving(true)
    setSaveError(null)
    setSaved(false)
    updateMyProfile({ firstName: firstName.trim(), lastName: lastName.trim(), bio: bio.trim() || undefined })
      .then((updated) => {
        applyUpdate(updated)
        setSaved(true)
        showToast('Profile updated.', 'success')
      })
      .catch((err) => setSaveError(getErrorMessage(err, 'Could not save your profile.')))
      .finally(() => setSaving(false))
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Edit profile</h1>

      <AvatarUploadControl avatarUrl={user.avatarUrl} initials={getInitials(user.firstName, user.lastName)} onUploaded={applyUpdate} />

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
