export interface LoginPayload {
  username: string
  password: string
}

export interface RegisterPayload {
  firstName: string
  lastName: string
  username: string
  mail: string
  password: string
}

// Matches backend AuthenticationResponse exactly — note it carries no role/bio/avatar,
// just enough to identify the session; the full profile is fetched separately via /users/me.
export interface AuthResponse {
  token: string
  refreshToken: string
  username: string
  uuid: string
}
