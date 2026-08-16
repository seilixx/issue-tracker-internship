import api from './axios';
import type { GenericResponse, AuthResponse, LoginRequest, RegisterRequest } from '../types';

export const authApi = {
  login: (data: LoginRequest) =>
    api.post<GenericResponse<AuthResponse>>('/auth/login', data),

  register: (data: RegisterRequest) =>
    api.post<GenericResponse<AuthResponse>>('/auth/register', data),
};
