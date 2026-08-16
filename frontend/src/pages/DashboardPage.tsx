import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsApi } from '../api/projects';
import { issuesApi } from '../api/issues';
import { Status, type Project, type Issue } from '../types';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, issueRes] = await Promise.all([
          projectsApi.getAll(),
          issuesApi.getAll(),
        ]);
        setProjects(projRes.data.data || []);
        setIssues(issueRes.data.data || []);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openCount = issues.filter((i) => i.status === Status.OPEN).length;
  const inProgressCount = issues.filter((i) => i.status === Status.IN_PROGRESS).length;
  const doneCount = issues.filter((i) => i.status === Status.DONE).length;

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner-lg"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="page dashboard-page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="page-subtitle">Welcome back, <strong>{user?.username}</strong></p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-card-total">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-value">{projects.length}</span>
            <span className="stat-label">Projects</span>
          </div>
        </div>

        <div className="stat-card stat-card-open">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-value">{openCount}</span>
            <span className="stat-label">Open Issues</span>
          </div>
        </div>

        <div className="stat-card stat-card-progress">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-value">{inProgressCount}</span>
            <span className="stat-label">In Progress</span>
          </div>
        </div>

        <div className="stat-card stat-card-done">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-value">{doneCount}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Projects</h2>
          <button className="btn btn-secondary" onClick={() => navigate('/projects')}>
            View All
          </button>
        </div>
        <div className="projects-grid">
          {projects.slice(0, 6).map((project) => {
            const projectIssues = issues.filter((i) => i.projectId === project.id);
            const projectDone = projectIssues.filter((i) => i.status === Status.DONE).length;
            const progress = projectIssues.length > 0
              ? Math.round((projectDone / projectIssues.length) * 100)
              : 0;

            return (
              <div
                key={project.id}
                className="project-card"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                <div className="project-card-header">
                  <h3>{project.title}</h3>
                  <span className="project-card-count">{projectIssues.length} issues</span>
                </div>
                {project.description && (
                  <p className="project-card-desc">
                    {project.description.length > 100
                      ? project.description.substring(0, 100) + '...'
                      : project.description}
                  </p>
                )}
                <div className="project-card-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                  </div>
                  <span className="progress-text">{progress}% complete</span>
                </div>
              </div>
            );
          })}
          {projects.length === 0 && (
            <div className="empty-state">
              <p>No projects yet. Create your first project!</p>
              <button className="btn btn-primary" onClick={() => navigate('/projects')}>
                Create Project
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Issues */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Issues</h2>
          <button className="btn btn-secondary" onClick={() => navigate('/issues')}>
            View All
          </button>
        </div>
        <div className="issues-table-container">
          {issues.length > 0 ? (
            <table className="issues-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {issues.slice(0, 8).map((issue) => (
                  <tr key={issue.id} onClick={() => navigate(`/issues/${issue.id}`)}>
                    <td className="issue-id">#{issue.id}</td>
                    <td className="issue-title-cell">{issue.title}</td>
                    <td>
                      <span className={`badge badge-${issue.status?.toLowerCase().replace('_', '-')}`}>
                        {issue.status === 'OPEN' ? 'Open' : issue.status === 'IN_PROGRESS' ? 'In Progress' : 'Done'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-${issue.priority?.toLowerCase()}`}>
                        {issue.priority}
                      </span>
                    </td>
                    <td className="issue-date">
                      {issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <p>No issues yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
