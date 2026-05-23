import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { AuthModal } from '@/components/auth/AuthModal'
import { RoleSelectionModal } from '@/components/onboarding/RoleSelectionModal'
import { useAuthModal } from '@/store/useAuthModal'
import { useOnboardingModal } from '@/store/useOnboardingModal'

const GlobalAuthInterceptor = () => {
  const openAuthModal = useAuthModal(state => state.openModal)
  const openOnboardingModal = useOnboardingModal(state => state.openModal)

  useEffect(() => {
    // We must use the CAPTURE phase to intercept the click BEFORE React Router's <Link> synthetic events process it.
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      
      if (link) {
        const href = link.getAttribute('href')
        if (href === '/signup') {
          e.preventDefault()
          e.stopPropagation() // Prevent React Router from navigating away
          openOnboardingModal()
        } else if (href === '/login') {
          e.preventDefault()
          e.stopPropagation()
          openAuthModal('login')
        }
      }
    }

    document.addEventListener('click', handleClick, { capture: true })
    return () => document.removeEventListener('click', handleClick, { capture: true })
  }, [openAuthModal, openOnboardingModal])

  return null
}

export const LandingLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col scroll-smooth">
      <GlobalAuthInterceptor />
      <LandingNavbar />
      
      <main className="flex-1 w-full flex flex-col items-center">
        <Outlet />
      </main>

      <AuthModal />
      <RoleSelectionModal />
    </div>
  )
}
