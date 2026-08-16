import { useRef, useState, type ChangeEvent } from 'react'
import { getErrorMessage } from '@/utils/apiClient'
import { uploadMyAvatar } from '../api'
import type { UserSummary } from '../types'
import { AvatarCropper } from './AvatarCropper'
import styles from './AvatarUploadControl.module.css'

interface AvatarUploadControlProps {
  avatarUrl: string | null | undefined
  initials: string
  onUploaded: (user: UserSummary) => void
}

export function AvatarUploadControl({ avatarUrl, initials, onUploaded }: AvatarUploadControlProps) {
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.')
      return
    }
    setError(null)
    setPendingFile(file)
  }

  function handleCropped(blob: Blob) {
    setPendingFile(null)
    setUploading(true)
    setError(null)
    uploadMyAvatar(blob)
      .then(onUploaded)
      .catch((err) => setError(getErrorMessage(err, 'Could not upload the avatar.')))
      .finally(() => setUploading(false))
  }

  return (
    <div className={styles.wrapper}>
      {avatarUrl ? (
        <img src={avatarUrl} alt="" className={styles.preview} />
      ) : (
        <span className={styles.previewFallback}>{initials}</span>
      )}

      <div className={styles.controls}>
        <button type="button" className={styles.changeButton} disabled={uploading} onClick={() => fileInputRef.current?.click()}>
          {uploading ? 'Uploading…' : 'Change photo'}
        </button>
        <p className={styles.hint}>PNG, JPEG, GIF or WebP, up to 3MB.</p>
        {error ? <p className={styles.error}>{error}</p> : null}
        <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleFileChange} />
      </div>

      {pendingFile ? <AvatarCropper file={pendingFile} onCropped={handleCropped} onCancel={() => setPendingFile(null)} /> : null}
    </div>
  )
}
