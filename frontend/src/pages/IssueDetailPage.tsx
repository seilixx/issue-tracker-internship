import { useEffect, useState, type FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { issuesApi } from '../api/issues';
import { commentsApi } from '../api/comments';
import { usersApi } from '../api/users';
import { projectsApi } from '../api/projects';
import { Status, Priority, type Issue, type Comment, type User, type Project } from '../types';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import { useAuth } from '../context/AuthContext';

export default function IssueDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const [issue, setIssue] = useState<Issue | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // Edit form
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editStatus, setEditStatus] = useState<Status>(Status.OPEN);
  const [editPriority, setEditPriority] = useState<Priority>(Priority.MEDIUM);
  const [editAssignees, setEditAssignees] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  // Comment form
  const [commentTitle, setCommentTitle] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const fetchData = async () => {
    try {
      const issueRes = await issuesApi.getById(Number(id));
      const issueData = issueRes.data.data;
      setIssue(issueData);

      const [commentsRes, usersRes, projRes] = await Promise.all([
        commentsApi.getByIssueId(Number(id)),
        usersApi.getAll(),
        projectsApi.getById(issueData.projectId),
      ]);

      setComments(commentsRes.data.data || []);
      setUsers(usersRes.data.data || []);
      setProject(projRes.data.data);

      // Populate edit form
      setEditTitle(issueData.title);
      setEditDesc(issueData.description || '');
      setEditStatus(issueData.status || Status.OPEN);
      setEditPriority(issueData.priority);
      setEditAssignees(issueData.assignedUuids || []);
    } catch (err) {
      console.error('Failed to load issue', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleUpdateIssue = async (e: FormEvent) => {
    e.preventDefault();
    if (!issue) return;
    setSaving(true);
    try {
      await issuesApi.update(issue.id!, {
        title: editTitle,
        description: editDesc,
        status: editStatus,
        priority: editPriority,
        projectId: issue.projectId,
        assignedUuids: editAssignees,
      });
      setEditing(false);
      fetchData();
    } catch (err) {
      console.error('Failed to update issue', err);
    } finally {
      setSaving(false);
    }
  };

  const handleQuickStatusChange = async (newStatus: Status) => {
    if (!issue) return;
    try {
      await issuesApi.update(issue.id!, { ...issue, status: newStatus });
      fetchData();
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleAddComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!commentTitle.trim()) return;
    setAddingComment(true);
    try {
      await commentsApi.create({
        title: commentTitle,
        content: commentContent,
        issueId: Number(id),
      });
      setCommentTitle('');
      setCommentContent('');
      fetchData();
    } catch (err) {
      console.error('Failed to add comment', err);
    } finally {
      setAddingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (window.confirm('Delete this comment?')) {
      try {
        await commentsApi.delete(commentId);
        fetchData();
      } catch (err) {
        console.error('Failed to delete comment', err);
      }
    }
  };

  const toggleAssignee = (uuid: string) => {
    setEditAssignees((prev) =>
      prev.includes(uuid) ? prev.filter((u) => u !== uuid) : [...prev, uuid]
    );
  };

  const getUserName = (uuid: string) => {
    const u = users.find((user) => user.uuid === uuid);
    return u ? u.username : uuid.substring(0, 8);
  };

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner-lg"></div>
        <p>Loading issue...</p>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="page">
        <div className="empty-state">
          <p>Issue not found.</p>
          <button className="btn btn-primary" onClick={() => navigate('/issues')}>
            Back to Issues
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page issue-detail-page">
      <div className="page-header">
        <div>
          <button className="btn-back" onClick={() => navigate(-1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>
        </div>
      </div>

      <div className="issue-detail-layout">
        {/* Main Content */}
        <div className="issue-detail-main">
          {editing ? (
            <form onSubmit={handleUpdateIssue} className="issue-edit-form">
              <div className="form-group">
                <label htmlFor="editTitle">Title</label>
                <input
                  id="editTitle"
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="editDesc">Description</label>
                <textarea
                  id="editDesc"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  rows={6}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="editStatus">Status</label>
                  <select
                    id="editStatus"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as Status)}
                  >
                    <option value={Status.OPEN}>Open</option>
                    <option value={Status.IN_PROGRESS}>In Progress</option>
                    <option value={Status.DONE}>Done</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="editPriority">Priority</label>
                  <select
                    id="editPriority"
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value as Priority)}
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
                  <label>Assignees</label>
                  <div className="assignee-list">
                    {users.map((u) => (
                      <label key={u.uuid} className="assignee-option">
                        <input
                          type="checkbox"
                          checked={editAssignees.includes(u.uuid)}
                          onChange={() => toggleAssignee(u.uuid)}
                        />
                        <span>{u.username}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="issue-detail-header">
                <div className="issue-detail-title-row">
                  <h1>
                    <span className="issue-detail-id">#{issue.id}</span>
                    {issue.title}
                  </h1>
                  <button className="btn btn-secondary" onClick={() => setEditing(true)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit
                  </button>
                </div>
                <div className="issue-detail-meta">
                  <StatusBadge status={issue.status || Status.OPEN} />
                  <PriorityBadge priority={issue.priority} />
                  {project && (
                    <span className="issue-detail-project" onClick={() => navigate(`/projects/${project.id}`)}>
                      📁 {project.title}
                    </span>
                  )}
                </div>
              </div>

              {issue.description && (
                <div className="issue-detail-description">
                  <h3>Description</h3>
                  <p>{issue.description}</p>
                </div>
              )}
            </>
          )}

          {/* Comments Section */}
          <div className="comments-section">
            <h3>Comments ({comments.length})</h3>

            {comments.map((comment) => (
              <div key={comment.id} className="comment-card">
                <div className="comment-header">
                  <div className="comment-author">
                    <div className="comment-avatar">
                      {comment.authorUserName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <strong>{comment.authorUserName || 'Unknown'}</strong>
                      <span className="comment-date">
                        {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : ''}
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn-icon btn-icon-danger"
                    onClick={() => handleDeleteComment(comment.id!)}
                    title="Delete comment"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
                <h4 className="comment-title">{comment.title}</h4>
                {comment.content && <p className="comment-content">{comment.content}</p>}
              </div>
            ))}

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="comment-form">
              <div className="comment-form-avatar">
                {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="comment-form-fields">
                <input
                  type="text"
                  value={commentTitle}
                  onChange={(e) => setCommentTitle(e.target.value)}
                  placeholder="Comment title..."
                  required
                />
                <textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Write a comment..."
                  rows={3}
                />
                <button type="submit" className="btn btn-primary" disabled={addingComment}>
                  {addingComment ? 'Adding...' : 'Add Comment'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="issue-detail-sidebar">
          <div className="sidebar-section">
            <h4>Status</h4>
            <div className="status-buttons">
              {Object.values(Status).map((s) => (
                <button
                  key={s}
                  className={`status-btn ${issue.status === s ? 'active' : ''}`}
                  onClick={() => handleQuickStatusChange(s)}
                >
                  {s === Status.OPEN ? '○ Open' : s === Status.IN_PROGRESS ? '◑ In Progress' : '● Done'}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h4>Details</h4>
            <div className="detail-rows">
              <div className="detail-row">
                <span className="detail-label">Priority</span>
                <PriorityBadge priority={issue.priority} />
              </div>
              <div className="detail-row">
                <span className="detail-label">Project</span>
                <span className="detail-value">{project?.title || '-'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Created</span>
                <span className="detail-value">
                  {issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : '-'}
                </span>
              </div>
              {issue.updatedAt && (
                <div className="detail-row">
                  <span className="detail-label">Updated</span>
                  <span className="detail-value">
                    {new Date(issue.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
              {issue.closedAt && (
                <div className="detail-row">
                  <span className="detail-label">Closed</span>
                  <span className="detail-value">
                    {new Date(issue.closedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="sidebar-section">
            <h4>Assignees</h4>
            {issue.assignedUuids && issue.assignedUuids.length > 0 ? (
              <div className="assignees-display">
                {issue.assignedUuids.map((uuid) => (
                  <div key={uuid} className="assignee-chip">
                    <div className="assignee-chip-avatar">
                      {getUserName(uuid).charAt(0).toUpperCase()}
                    </div>
                    <span>{getUserName(uuid)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-assignees">No one assigned</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
