import api from './axios';
import type { GenericResponse, Comment } from '../types';

export const commentsApi = {
  getAll: () =>
    api.get<GenericResponse<Comment[]>>('/comments'),

  getByIssueId: (issueId: number) =>
    api.get<GenericResponse<Comment[]>>(`/comments/issue/${issueId}`),

  getById: (id: number) =>
    api.get<GenericResponse<Comment>>(`/comments/${id}`),

  create: (data: Partial<Comment>) =>
    api.post<GenericResponse<Comment>>('/comments', data),

  update: (id: number, data: Partial<Comment>) =>
    api.put<GenericResponse<Comment>>(`/comments/${id}`, data),

  delete: (id: number) =>
    api.delete<GenericResponse<void>>(`/comments/${id}`),
};
