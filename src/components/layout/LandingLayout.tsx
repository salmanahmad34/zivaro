import { Outlet } from 'react-router-dom'
import { LandingNavbar } from '@/components/landing/LandingNavbar'

export const LandingLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col scroll-smooth">
      <LandingNavbar />
      
      <main className="flex-1 w-full flex flex-col items-center">
        <Outlet />
      </main>

      <footer className="py-12 border-t border-border/40 bg-background">
        <div className="container flex flex-col items-center justify-between gap-6 md:h-24 md:flex-row max-w-screen-2xl">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Zivaro Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
