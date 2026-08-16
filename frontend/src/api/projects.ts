import api from './axios';
import type { GenericResponse, Project } from '../types';

export const projectsApi = {
  getAll: () =>
    api.get<GenericResponse<Project[]>>('/projects'),

  getById: (id: number) =>
    api.get<GenericResponse<Project>>(`/projects/${id}`),

  create: (data: Partial<Project>) =>
    api.post<GenericResponse<Project>>('/projects', data),

  update: (id: number, data: Partial<Project>) =>
    api.put<GenericResponse<Project>>(`/projects/${id}`, data),

  delete: (id: number) =>
    api.delete<GenericResponse<void>>(`/projects/${id}`),
};
