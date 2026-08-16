import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { issuesApi } from '../api/issues';
import { projectsApi } from '../api/projects';
import { usersApi } from '../api/users';
import { Status, Priority, type Issue, type Project, type User } from '../types';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import Modal from '../components/Modal';

export default function IssuesPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Filters
  const [filterProject, setFilterProject] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterPriority, setFilterPriority] = useState<string>('');

  // Form
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPriority, setFormPriority] = useState<Priority>(Priority.MEDIUM);
  const [formProjectId, setFormProjectId] = useState<string>('');
  const [formAssignees, setFormAssignees] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const filters: any = {};
      if (filterProject) filters.projectId = Number(filterProject);
      if (filterStatus) filters.status = filterStatus;
      if (filterPriority) filters.priority = filterPriority;

      const [issuesRes, projRes, usersRes] = await Promise.all([
        issuesApi.getAll(filters),
        projectsApi.getAll(),
        usersApi.getAll(),
      ]);
      setIssues(issuesRes.data.data || []);
      setProjects(projRes.data.data || []);
      setUsers(usersRes.data.data || []);
    } catch (err) {
      console.error('Failed to fetch issues', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterProject, filterStatus, filterPriority]);

  const handleCreateIssue = async (e: FormEvent) => {
    e.preventDefault();
    if (!formProjectId) return;
    setSubmitting(true);
    try {
      await issuesApi.create({
        title: formTitle,
        description: formDesc,
        priority: formPriority,
        projectId: Number(formProjectId),
        assignedUuids: formAssignees,
      });
      setModalOpen(false);
      setFormTitle('');
      setFormDesc('');
      setFormPriority(Priority.MEDIUM);
      setFormProjectId('');
      setFormAssignees([]);
      fetchData();
    } catch (err) {
      console.error('Failed to create issue', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this issue?')) {
      try {
        await issuesApi.delete(id);
        fetchData();
      } catch (err) {
        console.error('Failed to delete issue', err);
      }
    }
  };

  const toggleAssignee = (uuid: string) => {
    setFormAssignees((prev) =>
      prev.includes(uuid) ? prev.filter((u) => u !== uuid) : [...prev, uuid]
    );
  };

  const getProjectName = (projectId: number) => {
    return projects.find((p) => p.id === projectId)?.title || `Project #${projectId}`;
  };

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner-lg"></div>
        <p>Loading issues...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Issues</h1>
          <p className="page-subtitle">{issues.length} issue{issues.length !== 1 ? 's' : ''} total</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Issue
        </button>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="filter-group">
          <label>Project</label>
          <select value={filterProject} onChange={(e) => setFilterProject(e.target.value)}>
            <option value="">All Projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Status</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Priority</label>
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
            <option value="">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>
        {(filterProject || filterStatus || filterPriority) && (
          <button
            className="btn btn-ghost"
            onClick={() => {
              setFilterProject('');
              setFilterStatus('');
              setFilterPriority('');
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Issues Table */}
      <div className="issues-table-container">
        {issues.length > 0 ? (
          <table className="issues-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Project</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id} onClick={() => navigate(`/issues/${issue.id}`)}>
                  <td className="issue-id">#{issue.id}</td>
                  <td className="issue-title-cell">{issue.title}</td>
                  <td className="issue-project">{getProjectName(issue.projectId)}</td>
                  <td>{issue.status && <StatusBadge status={issue.status} />}</td>
                  <td><PriorityBadge priority={issue.priority} /></td>
                  <td className="issue-date">
                    {issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : '-'}
                  </td>
                  <td>
                    <button
                      className="btn-icon btn-icon-danger"
                      onClick={(e) => handleDelete(issue.id!, e)}
                      title="Delete"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <p>No issues found.</p>
          </div>
        )}
      </div>

      {/* Create Issue Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="New Issue"
      >
        <form onSubmit={handleCreateIssue} className="modal-form">
          <div className="form-group">
            <label htmlFor="issueTitle">Title</label>
            <input
              id="issueTitle"
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="Issue title"
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="issueDesc">Description</label>
            <textarea
              id="issueDesc"
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              placeholder="Describe the issue..."
              rows={4}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="issueProject">Project</label>
              <select
                id="issueProject"
                value={formProjectId}
                onChange={(e) => setFormProjectId(e.target.value)}
                required
              >
                <option value="">Select project</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="issuePriority">Priority</label>
              <select
                id="issuePriority"
                value={formPriority}
                onChange={(e) => setFormPriority(e.target.value as Priority)}
              >
                <option value={Priority.LOW}>Low</option>
                <option value={Priority.MEDIUM}>Medium</option>
                <option value={Priority.HIGH}>High</option>
                <option value={Priority.CRITICAL}>Critical</option>
              </select>
            </div>
          </div>
          {users.length > 0 && (
            <div className="form-group">
              <label>Assign to</label>
              <div className="assignee-list">
                {users.map((u) => (
                  <label key={u.uuid} className="assignee-option">
                    <input
                      type="checkbox"
                      checked={formAssignees.includes(u.uuid)}
                      onChange={() => toggleAssignee(u.uuid)}
                    />
                    <span>{u.username}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create Issue'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
