import { Outlet, Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export const LandingLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col scroll-smooth">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <div className="font-bold text-2xl gradient-text tracking-tight">Zivaro</div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#features" className="transition-colors hover:text-foreground/80 text-foreground/60">Features</a>
            <a href="#pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">Pricing</a>
            <a href="#about" className="transition-colors hover:text-foreground/80 text-foreground/60">About</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to={ROUTES.LOGIN} className="text-sm font-medium hover:text-foreground/80">Log in</Link>
            <Link to={ROUTES.SIGNUP} className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </header>
      
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
