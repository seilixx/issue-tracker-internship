import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { StoreProvider } from '@/store/AppStore'
import {
  AuthRoute,
  BoardRoute,
  DashboardRoute,
  LegacyProfileRedirect,
  NotFound,
  ProjectRoute,
  Shell,
  UserProfileRoute,
} from '@/App'
import { TeamPage } from '@/pages/TeamPage'
import { MyProfilePage } from '@/pages/Profiles'
import { AdminUsersPage } from '@/pages/AdminUsers'

export const router = createBrowserRouter([
  {
    // Pathless layout route: StoreProvider needs router context (useNavigate)
    // for logout/session-expiry redirects, so it lives inside the router tree.
    element: (
      <StoreProvider>
        <Outlet />
      </StoreProvider>
    ),
    children: [
      { path: '/login', element: <AuthRoute view="login" /> },
      { path: '/register', element: <AuthRoute view="register" /> },
      {
        // Authenticated shell — redirects to /login when there is no session.
        element: <Shell />,
        children: [
          // Legacy bookmarks: the dashboard used to live at "/".
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: <DashboardRoute /> },
          { path: 'board', element: <BoardRoute /> },
          { path: 'projects/:projectId', element: <ProjectRoute /> },
          { path: 'team', element: <TeamPage /> },
          { path: 'profile', element: <MyProfilePage /> },
          { path: 'users/:uuid', element: <UserProfileRoute /> },
          { path: 'admin/users', element: <AdminUsersPage /> },
          // Legacy paths from the previous UI — kept as redirects so old
          // bookmarks and links keep working.
          { path: 'users/search', element: <Navigate to="/team" replace /> },
          { path: 'profile/edit', element: <Navigate to="/profile" replace /> },
          { path: 'profile/:uuid', element: <LegacyProfileRedirect /> },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
  },
])
