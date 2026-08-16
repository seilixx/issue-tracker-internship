// ========================
// TypeScript Types — Miroir des DTOs Java du backend
// ========================

// ---- Status & Priority (string literal unions, compatible with erasableSyntaxOnly) ----

export const Status = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
} as const;
export type Status = (typeof Status)[keyof typeof Status];

export const Priority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL',
} as const;
export type Priority = (typeof Priority)[keyof typeof Priority];

// ---- Réponse générique du backend ----
export interface GenericResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ---- User ----
export interface User {
  uuid: string;
  firstName: string;
  lastName: string;
  username: string;
}

// ---- Auth ----
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  mail: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  uuid: string;
}

// ---- Comment ----
export interface Comment {
  id?: number;
  title: string;
  content: string;
  issueId: number;
  authorUuid?: string;
  authorUserName?: string;
  createdAt?: string;
}

// ---- Issue ----
export interface Issue {
  id?: number;
  title: string;
  description?: string;
  status?: Status;
  priority: Priority;
  projectId: number;
  creatorUuid?: string;
  createdAt?: string;
  updatedAt?: string;
  closedAt?: string;
  assignedUuids?: string[];
  comments?: Comment[];
}

// ---- Project ----
export interface Project {
  id?: number;
  title: string;
  description?: string;
  issues?: Issue[];
}
