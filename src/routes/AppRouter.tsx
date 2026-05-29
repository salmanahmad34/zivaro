import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

// Layouts
import { LandingLayout } from '@/components/layout/LandingLayout'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'

// Route Wrappers
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { PublicRoute } from '@/routes/PublicRoute'

// Pages (Lazy Loaded)
const LandingPage = lazy(() => import('@/pages/public/LandingPage').then(m => ({ default: m.LandingPage })))
const LoginPage = lazy(() => import('@/pages/auth/LoginPage').then(m => ({ default: m.LoginPage })))
const SignupPage = lazy(() => import('@/pages/auth/SignupPage').then(m => ({ default: m.SignupPage })))
const OAuthCallback = lazy(() => import('@/pages/auth/OAuthCallback').then(m => ({ default: m.OAuthCallback })))
const DashboardIndex = lazy(() => import('@/pages/dashboard/DashboardIndex').then(m => ({ default: m.DashboardIndex })))
const NotificationsPage = lazy(() => import('@/pages/dashboard/NotificationsPage').then(m => ({ default: m.NotificationsPage })))
const MessagesPage = lazy(() => import('@/pages/dashboard/MessagesPage').then(m => ({ default: m.MessagesPage })))
const ProfilePage = lazy(() => import('@/pages/dashboard/ProfilePage').then(m => ({ default: m.ProfilePage })))
const JobsPage = lazy(() => import('@/pages/dashboard/JobsPage').then(m => ({ default: m.JobsPage })))
const SavedJobsPage = lazy(() => import('@/pages/dashboard/SavedJobsPage').then(m => ({ default: m.SavedJobsPage })))
const PremiumPage = lazy(() => import('@/pages/dashboard/PremiumPage').then(m => ({ default: m.PremiumPage })))
const WalletPage = lazy(() => import('@/pages/dashboard/WalletPage').then(m => ({ default: m.WalletPage })))
const RecommendationsPage = lazy(() => import('@/pages/dashboard/RecommendationsPage').then(m => ({ default: m.RecommendationsPage })))
const GrowthPage = lazy(() => import('@/pages/dashboard/GrowthPage').then(m => ({ default: m.GrowthPage })))

const PageLoader = () => (
  <div className="w-full h-full min-h-[50vh] flex flex-col items-center justify-center gap-4">
    <div className="w-8 h-8 rounded-full border-4 border-muted border-t-primary animate-spin" />
    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest animate-pulse">Loading Workspace...</span>
  </div>
)

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
)

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: withSuspense(LandingPage),
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.LOGIN,
            element: withSuspense(LoginPage),
          },
          {
            path: ROUTES.SIGNUP,
            element: withSuspense(SignupPage),
          },
          {
            path: '/auth/callback',
            element: withSuspense(OAuthCallback),
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: ROUTES.DASHBOARD,
            element: withSuspense(DashboardIndex),
          },
          {
            path: ROUTES.NOTIFICATIONS,
            element: withSuspense(NotificationsPage),
          },
          {
            path: ROUTES.MESSAGES,
            element: withSuspense(MessagesPage),
          },
          {
            path: ROUTES.PROFILE,
            element: withSuspense(ProfilePage),
          },
          {
            path: ROUTES.JOBS,
            element: withSuspense(JobsPage),
          },
          {
            path: ROUTES.SAVED,
            element: withSuspense(SavedJobsPage),
          },
          {
            path: ROUTES.PREMIUM,
            element: withSuspense(PremiumPage),
          },
          {
            path: ROUTES.WALLET,
            element: withSuspense(WalletPage),
          },
          {
            path: ROUTES.RECOMMENDATIONS,
            element: withSuspense(RecommendationsPage),
          },
          {
            path: ROUTES.GROWTH,
            element: withSuspense(GrowthPage),
          },
        ],
      },
    ],
  },
], {
  // YEH BASENAME ADD KARNA ZAROORI THA! Iske bina GitHub pages blank dikhayega
  basename: import.meta.env.BASE_URL
})

export const AppRouter = () => {
  return <RouterProvider router={router} />
}
