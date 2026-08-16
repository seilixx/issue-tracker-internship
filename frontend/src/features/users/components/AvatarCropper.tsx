import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import styles from './AvatarCropper.module.css'

const VIEWPORT = 240
const OUTPUT = 320
const ZOOM_MIN = 1
const ZOOM_MAX = 3

interface AvatarCropperProps {
  file: File
  onCropped: (blob: Blob) => void
  onCancel: () => void
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function AvatarCropper({ file, onCropped, onCancel }: AvatarCropperProps) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null)
  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number } | null>(null)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ left: 0, top: 0 })
  const [dragging, setDragging] = useState(false)

  const imgRef = useRef<HTMLImageElement>(null)
  const dragStateRef = useRef({ startX: 0, startY: 0, startLeft: 0, startTop: 0 })

  useEffect(() => {
    const url = URL.createObjectURL(file)
    setObjectUrl(url)
    const img = new Image()
    img.onload = () => {
      const baseScale = Math.max(VIEWPORT / img.naturalWidth, VIEWPORT / img.naturalHeight)
      setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight })
      setZoom(1)
      setPosition({
        left: (VIEWPORT - img.naturalWidth * baseScale) / 2,
        top: (VIEWPORT - img.naturalHeight * baseScale) / 2,
      })
    }
    img.src = url
    return () => URL.revokeObjectURL(url)
  }, [file])

  if (!objectUrl || !naturalSize) {
    return null
  }

  const baseScale = Math.max(VIEWPORT / naturalSize.width, VIEWPORT / naturalSize.height)
  const scale = baseScale * zoom
  const displayedWidth = naturalSize.width * scale
  const displayedHeight = naturalSize.height * scale
  const minLeft = VIEWPORT - displayedWidth
  const minTop = VIEWPORT - displayedHeight

  function clampPosition(left: number, top: number) {
    return { left: clamp(left, minLeft, 0), top: clamp(top, minTop, 0) }
  }

  function handleZoomChange(nextZoom: number) {
    setZoom(nextZoom)
    const nextScale = baseScale * nextZoom
    const nextMinLeft = VIEWPORT - naturalSize!.width * nextScale
    const nextMinTop = VIEWPORT - naturalSize!.height * nextScale
    setPosition((prev) => ({
      left: clamp(prev.left, nextMinLeft, 0),
      top: clamp(prev.top, nextMinTop, 0),
    }))
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging(true)
    dragStateRef.current = { startX: event.clientX, startY: event.clientY, startLeft: position.left, startTop: position.top }
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging) return
    const dx = event.clientX - dragStateRef.current.startX
    const dy = event.clientY - dragStateRef.current.startY
    setPosition(clampPosition(dragStateRef.current.startLeft + dx, dragStateRef.current.startTop + dy))
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    event.currentTarget.releasePointerCapture(event.pointerId)
    setDragging(false)
  }

  function handleSave() {
    const canvas = document.createElement('canvas')
    canvas.width = OUTPUT
    canvas.height = OUTPUT
    const ctx = canvas.getContext('2d')
    if (!ctx || !imgRef.current) return

    const exportRatio = OUTPUT / VIEWPORT
    ctx.drawImage(
      imgRef.current,
      position.left * exportRatio,
      position.top * exportRatio,
      displayedWidth * exportRatio,
      displayedHeight * exportRatio,
    )
    canvas.toBlob((blob) => {
      if (blob) onCropped(blob)
    }, 'image/png')
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.card}>
        <h3 className={styles.title}>Crop your avatar</h3>

        <div
          className={dragging ? `${styles.viewport} ${styles.viewportDragging}` : styles.viewport}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <img
            ref={imgRef}
            src={objectUrl}
            alt=""
            draggable={false}
            className={styles.image}
            style={{ left: position.left, top: position.top, width: displayedWidth, height: displayedHeight }}
          />
        </div>

        <div className={styles.zoomRow}>
          <span>−</span>
          <input
            type="range"
            className={styles.zoomSlider}
            min={ZOOM_MIN}
            max={ZOOM_MAX}
            step={0.05}
            value={zoom}
            onChange={(event) => handleZoomChange(Number(event.target.value))}
          />
          <span>+</span>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className={styles.saveButton} onClick={handleSave}>
            Use this photo
          </button>
        </div>
      </div>
    </div>
  )
}
