import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { MainPlaceholder } from '@/components/layout/MainPlaceholder'
import { IssuesView } from '@/features/issues/IssuesView'
import { ProfileEditPage } from '@/features/users/ProfileEditPage'
import { ProfilePage } from '@/features/users/ProfilePage'
import { UserSearchPage } from '@/features/users/UserSearchPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <IssuesView />,
      },
      {
        path: 'my-issues',
        element: (
          <MainPlaceholder
            title="My Issues"
            description="Issues you report or are assigned to will show up here."
          />
        ),
      },
      {
        path: 'filters/:status',
        element: (
          <MainPlaceholder
            title="Filtered issues"
            description="The board and list views land in the next step."
          />
        ),
      },
      {
        path: 'projects/:projectId',
        element: (
          <MainPlaceholder
            title="Project board"
            description="The board and list views land in the next step."
          />
        ),
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
])
