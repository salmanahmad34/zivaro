import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/services/supabase/supabaseClient'
import { useAuth } from '@/store/useAuth'
import { ROUTES } from '@/constants/routes'

export const OAuthCallback = () => {
  const navigate = useNavigate()
  const { recoverUserSession, user } = useAuth()

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Supabase client automatically processes the hash fragment from URL
        // and establishes the session. We just need to recover it in our store.
        
        // Wait a small bit for Supabase to complete local storage sync if needed
        await new Promise(resolve => setTimeout(resolve, 500))
        
        await recoverUserSession()

        // Check if user has completed onboarding
        const session = await supabase.auth.getSession()
        
        if (session.data.session) {
          // Determine where to send them based on profile state
          // Using our store which populated the user data
          // Actually, let's fetch profile directly to be absolutely sure
          const { data: profile } = await supabase
            .from('profiles')
            .select('onboarding_completed')
            .eq('id', session.data.session.user.id)
            .single()

          if (profile && !profile.onboarding_completed) {
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
