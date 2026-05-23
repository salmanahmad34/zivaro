import { Outlet } from 'react-router-dom'
import { LandingNavbar } from '@/components/landing/LandingNavbar'

export const LandingLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col scroll-smooth">
      <LandingNavbar />
      
      <main className="flex-1 w-full flex flex-col items-center">
        <Outlet />
      </main>
    </div>
  )
}
