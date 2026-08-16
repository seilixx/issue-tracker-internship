import api from './axios';
import type { GenericResponse, User } from '../types';

export const usersApi = {
  getAll: () =>
    api.get<GenericResponse<User[]>>('/users'),

  getByUuid: (uuid: string) =>
    api.get<GenericResponse<User>>(`/users/${uuid}`),
};
