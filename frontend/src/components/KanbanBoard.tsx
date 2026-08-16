import { Status, type Issue } from '../types';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { useNavigate } from 'react-router-dom';

interface KanbanBoardProps {
  issues: Issue[];
  onStatusChange: (issueId: number, newStatus: Status) => void;
}

const columns: { status: Status; title: string; icon: string }[] = [
  { status: Status.OPEN, title: 'Open', icon: '○' },
  { status: Status.IN_PROGRESS, title: 'In Progress', icon: '◑' },
  { status: Status.DONE, title: 'Done', icon: '●' },
];

export default function KanbanBoard({ issues, onStatusChange }: KanbanBoardProps) {
  const navigate = useNavigate();

  const getIssuesByStatus = (status: Status) =>
    issues.filter((issue) => issue.status === status);

  const handleDragStart = (e: React.DragEvent, issueId: number) => {
    e.dataTransfer.setData('issueId', String(issueId));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).classList.add('kanban-column-drag-over');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).classList.remove('kanban-column-drag-over');
  };

  const handleDrop = (e: React.DragEvent, status: Status) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).classList.remove('kanban-column-drag-over');
    const issueId = Number(e.dataTransfer.getData('issueId'));
    if (issueId) {
      onStatusChange(issueId, status);
    }
  };

  return (
    <div className="kanban-board">
      {columns.map((col) => {
        const columnIssues = getIssuesByStatus(col.status);
        return (
          <div
            key={col.status}
            className="kanban-column"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, col.status)}
          >
            <div className="kanban-column-header">
              <span className="kanban-column-icon">{col.icon}</span>
              <span className="kanban-column-title">{col.title}</span>
              <span className="kanban-column-count">{columnIssues.length}</span>
            </div>
            <div className="kanban-column-body">
              {columnIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="kanban-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, issue.id!)}
                  onClick={() => navigate(`/issues/${issue.id}`)}
                >
                  <div className="kanban-card-header">
                    <span className="kanban-card-id">#{issue.id}</span>
                    <PriorityBadge priority={issue.priority} />
                  </div>
                  <h4 className="kanban-card-title">{issue.title}</h4>
                  {issue.description && (
                    <p className="kanban-card-desc">
                      {issue.description.length > 80
                        ? issue.description.substring(0, 80) + '...'
                        : issue.description}
                    </p>
                  )}
                  <div className="kanban-card-footer">
                    <StatusBadge status={issue.status!} />
                    {issue.assignedUuids && issue.assignedUuids.length > 0 && (
                      <span className="kanban-card-assignees">
                        {issue.assignedUuids.length} assigned
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {columnIssues.length === 0 && (
                <div className="kanban-empty">
                  No issues
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
