import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/store/useAuth'

export const PublicRoute = () => {
  const { isAuthenticated, isRecovering } = useAuth()

  // Don't redirect while recovering session
  if (isRecovering) {
    return <Outlet />
  }

  // Redirect authenticated users to dashboard
  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return <Outlet />
}
