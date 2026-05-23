import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

// Layouts
import { LandingLayout } from '@/components/layout/LandingLayout'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'

// Route Wrappers
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { PublicRoute } from '@/routes/PublicRoute'

// Pages
import { LandingPage } from '@/pages/public/LandingPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { SignupPage } from '@/pages/auth/SignupPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { NotificationsPage } from '@/pages/dashboard/NotificationsPage'
import { MessagesPage } from '@/pages/dashboard/MessagesPage'
import { ProfilePage } from '@/pages/dashboard/ProfilePage'
import { JobsPage } from '@/pages/dashboard/JobsPage'
import { PremiumPage } from '@/pages/dashboard/PremiumPage'

const router = createBrowserRouter([
  // Public Routes (Landing)
  {
    path: ROUTES.HOME,
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
  // Auth Routes (Only accessible if NOT logged in)
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.LOGIN,
            element: <LoginPage />,
          },
          {
            path: ROUTES.SIGNUP,
            element: <SignupPage />,
          },
        ],
      },
    ],
  },
  // Dashboard Routes (Only accessible if logged in)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: ROUTES.DASHBOARD,
            element: <DashboardPage />,
          },
          {
            path: ROUTES.NOTIFICATIONS,
            element: <NotificationsPage />,
          },
          {
            path: ROUTES.MESSAGES,
            element: <MessagesPage />,
          },
          {
            path: ROUTES.PROFILE,
            element: <ProfilePage />,
          },
          {
            path: ROUTES.JOBS,
            element: <JobsPage />,
          },
          {
            path: ROUTES.PREMIUM,
            element: <PremiumPage />,
          },
        ],
      },
    ],
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}
