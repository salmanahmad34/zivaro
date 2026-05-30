import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/services/supabase/supabaseClient'
import { useAuth } from '@/store/useAuth'
import { ROUTES } from '@/constants/routes'

export const OAuthCallback = () => {
  const navigate = useNavigate()
  const { recoverUserSession } = useAuth()

  useEffect(() => {
    console.log('[OAuthCallback] Mounted')
    console.log('[OAuthCallback] Current pathname:', window.location.pathname)
    console.log('[OAuthCallback] Current hash:', window.location.hash)

    const handleOAuthCallback = async () => {
      try {
        // Supabase client automatically processes the hash fragment from URL
        // and establishes the session. We just need to recover it in our store.
        
        // Wait a small bit for Supabase to complete local storage sync if needed
        await new Promise(resolve => setTimeout(resolve, 500))
        
        await recoverUserSession()

        // Check if user has completed onboarding
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Error fetching session:', sessionError)
          navigate(ROUTES.LOGIN, { replace: true })
          return
        }
        
        if (session) {
          // Add correct typing for user metadata
          interface UserMetadata {
            onboarding_completed?: boolean;
            [key: string]: any;
          }
          
          const userMetadata = session.user.user_metadata as UserMetadata;

          if (!userMetadata.onboarding_completed) {
            // Need to show onboarding modal (can be triggered in dashboard)
            navigate(ROUTES.DASHBOARD, { replace: true })
          } else {
            // Full dashboard access
            navigate(ROUTES.DASHBOARD, { replace: true })
          }
        } else {
          // Session extraction failed
          navigate(ROUTES.LOGIN, { replace: true })
        }
      } catch (error) {
        console.error('Error during OAuth callback processing:', error)
        navigate(ROUTES.LOGIN, { replace: true })
      }
    }

    handleOAuthCallback()
  }, [navigate, recoverUserSession])

  return (
    <div className="flex items-center justify-center w-full h-screen bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto mb-4" />
        <p className="text-sm font-semibold text-muted-foreground">Authenticating your account...</p>
      </div>
    </div>
  )
}
