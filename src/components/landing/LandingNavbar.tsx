import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

const navLinks = [
  { name: 'Home', href: ROUTES.HOME },
  { name: 'How It Works', href: '#workflow' },
  { name: 'Benefits', href: '#benefits' },
  { name: 'Premium', href: '#premium' },
  { name: 'FAQ', href: '#faq' },
]

export const LandingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300',
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border/40 py-3 shadow-sm' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container max-w-screen-2xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="font-bold text-2xl tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-indigo-500 flex items-center justify-center">
            <span className="text-white font-black text-lg leading-none">Z</span>
          </div>
          <span className="gradient-text">Zivaro</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to={ROUTES.LOGIN} className="text-sm font-medium hover:text-foreground/80 transition-colors">
            Log in
          </Link>
          <Link 
            to={ROUTES.SIGNUP} 
            className="text-sm font-medium bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 -mr-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border/40 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="container px-4 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-foreground/80 hover:text-primary py-2 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-border/40 flex flex-col space-y-4">
                <Link 
                  to={ROUTES.LOGIN} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center text-lg font-medium py-2"
                >
                  Log in
                </Link>
                <Link 
                  to={ROUTES.SIGNUP}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center text-lg font-medium bg-primary text-primary-foreground py-3 rounded-xl shadow-soft"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
