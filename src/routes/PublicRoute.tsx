import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export const PublicRoute = () => {
  // Placeholder for real auth check
  const isAuthenticated = false // Replace with real Zustand/Supabase logic

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return <Outlet />
}
