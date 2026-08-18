import { createBrowserRouter, Outlet } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { ToastProvider } from '@/components/toast/ToastProvider'
import { MainPlaceholder } from '@/components/layout/MainPlaceholder'
import { AuthProvider } from '@/features/auth/AuthProvider'
import { LoginPage } from '@/features/auth/LoginPage'
import { ProtectedRoute } from '@/features/auth/ProtectedRoute'
import { RegisterPage } from '@/features/auth/RegisterPage'
import { DashboardPage } from '@/features/dashboard/DashboardPage'
import { ProjectBoardPage } from '@/features/projects/ProjectBoardPage'
import { ProfileEditPage } from '@/features/users/ProfileEditPage'
import { ProfilePage } from '@/features/users/ProfilePage'
import { UserSearchPage } from '@/features/users/UserSearchPage'

export const router = createBrowserRouter([
  {
    // Pathless layout route: AuthProvider needs router context (useNavigate) to
    // handle logout/session-expiry, so it has to live inside the router tree
    // rather than wrapping <RouterProvider> from the outside.
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            // ToastProvider wraps the whole authenticated shell so the sidebar,
            // topbar and every page can fire feedback toasts.
            element: (
              <ToastProvider>
                <AppShell />
              </ToastProvider>
            ),
            children: [
              {
                index: true,
                element: <DashboardPage />,
              },
              {
                path: 'projects/:projectId',
                element: <ProjectBoardPage />,
              },
              {
                path: 'profile/edit',
                element: <ProfileEditPage />,
              },
              {
                path: 'profile/:uuid',
                element: <ProfilePage />,
              },
              {
                path: 'users/search',
                element: <UserSearchPage />,
              },
              {
                path: '*',
                element: (
                  <MainPlaceholder title="Not found" description="This page doesn't exist." />
                ),
              },
            ],
          },
        ],
      },
    ],
  },
])
