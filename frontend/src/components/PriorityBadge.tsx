import { Priority } from '../types';

interface PriorityBadgeProps {
  priority: Priority;
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  [Priority.LOW]: { label: 'Low', className: 'badge-low' },
  [Priority.MEDIUM]: { label: 'Medium', className: 'badge-medium' },
  [Priority.HIGH]: { label: 'High', className: 'badge-high' },
  [Priority.CRITICAL]: { label: 'Critical', className: 'badge-critical' },
};

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = priorityConfig[priority] || { label: priority, className: '' };
  return <span className={`badge ${config.className}`}>{config.label}</span>;
}
