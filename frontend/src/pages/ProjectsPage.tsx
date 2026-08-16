import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsApi } from '../api/projects';
import type { Project } from '../types';
import Modal from '../components/Modal';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await projectsApi.getAll();
      setProjects(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch projects', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormTitle('');
    setFormDesc('');
    setModalOpen(true);
  };

  const openEditModal = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingProject(project);
    setFormTitle(project.title);
    setFormDesc(project.description || '');
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingProject) {
        await projectsApi.update(editingProject.id!, { title: formTitle, description: formDesc });
      } else {
        await projectsApi.create({ title: formTitle, description: formDesc });
      }
      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      console.error('Failed to save project', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsApi.delete(id);
        fetchProjects();
      } catch (err) {
        console.error('Failed to delete project', err);
      }
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner-lg"></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Projects</h1>
          <p className="page-subtitle">{projects.length} project{projects.length !== 1 ? 's' : ''} total</p>
        </div>
        <button className="btn btn-primary" onClick={openCreateModal}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Project
        </button>
      </div>

      <div className="search-bar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="project-card"
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            <div className="project-card-header">
              <h3>{project.title}</h3>
              <div className="project-card-actions">
                <button className="btn-icon" onClick={(e) => openEditModal(project, e)} title="Edit">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button className="btn-icon btn-icon-danger" onClick={(e) => handleDelete(project.id!, e)} title="Delete">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </div>
            {project.description && (
              <p className="project-card-desc">
                {project.description.length > 120
                  ? project.description.substring(0, 120) + '...'
                  : project.description}
              </p>
            )}
            <div className="project-card-footer">
              <span className="project-card-count">
                {project.issues?.length || 0} issues
              </span>
            </div>
          </div>
        ))}
        {filteredProjects.length === 0 && (
          <div className="empty-state">
            <p>{search ? 'No projects match your search.' : 'No projects yet. Create your first one!'}</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'New Project'}
      >
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="projectTitle">Title</label>
            <input
              id="projectTitle"
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="Project name"
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="projectDesc">Description</label>
            <textarea
              id="projectDesc"
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              placeholder="Describe the project..."
              rows={4}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : editingProject ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
