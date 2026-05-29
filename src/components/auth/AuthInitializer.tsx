import { useEffect, useState } from 'react'
import { useAuth } from '@/store/useAuth'

export const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const { recoverUserSession } = useAuth()
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    let isMounted = true

    const initializeAuth = async () => {
      try {
        // If coming back from OAuth, wait for Supabase to parse the URL hash
        if (window.location.hash && window.location.hash.includes('access_token')) {
          console.log('[AuthInitializer] Detected OAuth hash. Waiting for Supabase processing...')
          await new Promise(resolve => setTimeout(resolve, 500))
          
          // Clean the URL hash securely without triggering a router navigation
          window.history.replaceState(null, '', window.location.pathname + window.location.search)
          console.log('[AuthInitializer] OAuth hash cleaned.')
        }

        // Recover the session globally
        await recoverUserSession()
      } catch (error) {
        console.error('[AuthInitializer] Error during initialization:', error)
      } finally {
        if (isMounted) {
          setIsInitializing(false)
        }
      }
    }

    initializeAuth()

    return () => {
      isMounted = false
    }
  }, [recoverUserSession])

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-sm font-semibold text-muted-foreground">Authenticating session...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
