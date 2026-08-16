import { useEffect, useState, type FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectsApi } from '../api/projects';
import { issuesApi } from '../api/issues';
import { usersApi } from '../api/users';
import { Status, Priority, type Project, type Issue, type User } from '../types';
import KanbanBoard from '../components/KanbanBoard';
import Modal from '../components/Modal';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPriority, setFormPriority] = useState<Priority>(Priority.MEDIUM);
  const [formAssignees, setFormAssignees] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      const [projRes, issuesRes, usersRes] = await Promise.all([
        projectsApi.getById(Number(id)),
        issuesApi.getAll({ projectId: Number(id) }),
        usersApi.getAll(),
      ]);
      setProject(projRes.data.data);
      setIssues(issuesRes.data.data || []);
      setUsers(usersRes.data.data || []);
    } catch (err) {
      console.error('Failed to load project', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleStatusChange = async (issueId: number, newStatus: Status) => {
    const issue = issues.find((i) => i.id === issueId);
    if (!issue) return;
    try {
      await issuesApi.update(issueId, { ...issue, status: newStatus });
      fetchData();
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleCreateIssue = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await issuesApi.create({
        title: formTitle,
        description: formDesc,
        priority: formPriority,
        projectId: Number(id),
        assignedUuids: formAssignees,
      });
      setModalOpen(false);
      setFormTitle('');
      setFormDesc('');
      setFormPriority(Priority.MEDIUM);
      setFormAssignees([]);
      fetchData();
    } catch (err) {
      console.error('Failed to create issue', err);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleAssignee = (uuid: string) => {
    setFormAssignees((prev) =>
      prev.includes(uuid) ? prev.filter((u) => u !== uuid) : [...prev, uuid]
    );
  };

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner-lg"></div>
        <p>Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="page">
        <div className="empty-state">
          <p>Project not found.</p>
          <button className="btn btn-primary" onClick={() => navigate('/projects')}>
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <button className="btn-back" onClick={() => navigate('/projects')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>
          <h1>{project.title}</h1>
          {project.description && <p className="page-subtitle">{project.description}</p>}
        </div>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Issue
        </button>
      </div>

      <KanbanBoard issues={issues} onStatusChange={handleStatusChange} />

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
