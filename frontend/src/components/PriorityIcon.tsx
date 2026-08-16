import { IconArrowDown, IconArrowUp, IconChevronsUp, IconMinus } from '@/components/icons'
import type { Priority } from '@/utils/apiTypes'

const PRIORITY_META: Record<Priority, { label: string; tokenVar: string; Icon: typeof IconMinus }> = {
  LOW: { label: 'Low', tokenVar: '--color-priority-low', Icon: IconArrowDown },
  MEDIUM: { label: 'Medium', tokenVar: '--color-priority-medium', Icon: IconMinus },
  HIGH: { label: 'High', tokenVar: '--color-priority-high', Icon: IconArrowUp },
  CRITICAL: { label: 'Critical', tokenVar: '--color-accent', Icon: IconChevronsUp },
}

interface PriorityIconProps {
  priority: Priority
  size?: number
  showLabel?: boolean
  className?: string
}

export function PriorityIcon({ priority, size = 15, showLabel = false, className }: PriorityIconProps) {
  const meta = PRIORITY_META[priority]
  const Icon = meta.Icon

  return (
    <span
      className={className}
      style={{ color: `var(${meta.tokenVar})`, display: 'inline-flex', alignItems: 'center', gap: 4 }}
      title={meta.label}
    >
      <Icon size={size} />
      {showLabel ? meta.label : null}
    </span>
  )
}
