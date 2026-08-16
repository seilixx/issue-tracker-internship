import type { UserSummary } from './types'

// TODO: replace with the real authenticated user (login/JWT) once the auth
// feature is built. Until then this is "me" everywhere permissions are
// computed (see features/issues/permissions.ts) and in UserMenu. Deliberately
// role: 'USER' (not ADMIN/MANAGER) so permission gating is actually
// exercised instead of trivially always-true.
export const CURRENT_USER: UserSummary = {
  uuid: 'current-user-mock-uuid',
  firstName: 'Alex',
  lastName: 'Morgan',
  username: 'alex.morgan',
  role: 'USER',
}
