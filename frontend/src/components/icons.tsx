interface IconProps {
  size?: number
  className?: string
}

const defaultProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
}

export function IconSearch({ size = 18, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

export function IconPlus({ size = 18, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

export function IconInbox({ size = 18, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z" />
    </svg>
  )
}

export function IconFolder({ size = 18, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M4 4h5l2 3h9a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
    </svg>
  )
}

export function IconChevronDown({ size = 16, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export function IconLogOut({ size = 16, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

export function IconUserCircle({ size = 16, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6.5 19a5.5 5.5 0 0 1 11 0" />
    </svg>
  )
}

export function IconLayoutBoard({ size = 16, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="9" y1="4" x2="9" y2="20" />
      <line x1="15" y1="4" x2="15" y2="20" />
    </svg>
  )
}

export function IconList({ size = 16, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  )
}

export function IconArrowUp({ size = 14, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="6 11 12 5 18 11" />
    </svg>
  )
}

export function IconArrowDown({ size = 14, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="18 13 12 19 6 13" />
    </svg>
  )
}

export function IconChevronsUp({ size = 14, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <polyline points="17 11 12 6 7 11" />
      <polyline points="17 18 12 13 7 18" />
    </svg>
  )
}

export function IconMinus({ size = 14, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

export function IconX({ size = 14, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export function IconAlertTriangle({ size = 20, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

export function IconChevronUp({ size = 14, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <polyline points="18 15 12 9 6 15" />
    </svg>
  )
}

export function IconLock({ size = 14, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

export function IconPaperclip({ size = 16, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M21.44 11.05 12.25 20.24a5.5 5.5 0 0 1-7.78-7.78l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95L9.41 17.41a1.5 1.5 0 0 1-2.12-2.12l8.49-8.49" />
    </svg>
  )
}

export function IconMessageCircle({ size = 16, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  )
}

export function IconSend({ size = 15, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

export function IconTrash({ size = 14, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  )
}

export function IconCornerDownRight({ size = 13, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <polyline points="9 10 4 15 9 20" />
      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
    </svg>
  )
}

export function IconUpload({ size = 16, className }: IconProps) {
  return (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}
