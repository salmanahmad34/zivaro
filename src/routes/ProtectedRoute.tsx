import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export const ProtectedRoute = () => {
  // Placeholder for real auth check
  const isAuthenticated = true // Replace with real Zustand/Supabase logic

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <Outlet />
}
