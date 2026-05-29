import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/store/useAuth'

export const ProtectedRoute = () => {
  const { isAuthenticated, isRecovering, recoverUserSession } = useAuth()
  const [isInitializing, setIsInitializing] = useState(true)

  console.log('[ProtectedRoute Diagnostic] Render:', {
    pathname: window.location.pathname,
    hash: window.location.hash,
    isAuthenticated,
    isInitializing,
    isRecovering,
    basename: import.meta.env.BASE_URL
  })

  // Attempt to recover session on mount
  useEffect(() => {
    let isMounted = true

    const handleInitialSession = async () => {
      // Check if we just returned from OAuth with tokens in the hash
      if (window.location.hash && window.location.hash.includes('access_token')) {
        // Give Supabase client a moment to automatically process the hash
        // and persist tokens to local storage before we try to read them
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Clean up the URL to remove sensitive tokens from the hash
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }
      
      // Proceed to recover the session state into Zustand
      await recoverUserSession()

      if (isMounted) {
        setIsInitializing(false)
      }
    }

    handleInitialSession()

    return () => {
      isMounted = false
    }
  }, [recoverUserSession])

  // Show nothing while recovering session
  if (isInitializing || isRecovering) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-sm font-semibold text-muted-foreground">Loading your workspace...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  // Render protected routes
  return <Outlet />
}
