import { Status } from '../types';

interface StatusBadgeProps {
  status: Status;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  [Status.OPEN]: { label: 'Open', className: 'badge-open' },
  [Status.IN_PROGRESS]: { label: 'In Progress', className: 'badge-in-progress' },
  [Status.DONE]: { label: 'Done', className: 'badge-done' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, className: '' };
  return <span className={`badge ${config.className}`}>{config.label}</span>;
}
