import api from './axios';
import type { GenericResponse, Issue } from '../types';
import type { Status, Priority } from '../types';

interface IssueFilters {
  projectId?: number;
  status?: Status;
  priority?: Priority;
  assigneeUuid?: string;
}

export const issuesApi = {
  getAll: (filters?: IssueFilters) => {
    const params = new URLSearchParams();
    if (filters?.projectId) params.append('projectId', String(filters.projectId));
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.assigneeUuid) params.append('assigneeUuid', filters.assigneeUuid);
    return api.get<GenericResponse<Issue[]>>(`/issues?${params.toString()}`);
  },

  getById: (id: number) =>
    api.get<GenericResponse<Issue>>(`/issues/${id}`),

  create: (data: Partial<Issue>) =>
    api.post<GenericResponse<Issue>>('/issues', data),

  update: (id: number, data: Partial<Issue>) =>
    api.put<GenericResponse<Issue>>(`/issues/${id}`, data),

  delete: (id: number) =>
    api.delete<GenericResponse<void>>(`/issues/${id}`),
};
