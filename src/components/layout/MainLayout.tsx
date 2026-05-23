import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center">
          <div className="mr-4 font-bold text-xl gradient-text">Zivaro</div>
          <div className="flex flex-1 items-center space-x-2 justify-end">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Home</a>
              <a href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">Dashboard</a>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container max-w-screen-2xl py-6 md:py-10">
        <Outlet />
      </main>

      <footer className="py-6 md:px-8 md:py-0 border-t border-border/40">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row max-w-screen-2xl">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for Zivaro. Startup Architecture.
          </p>
        </div>
      </footer>
    </div>
  )
}
