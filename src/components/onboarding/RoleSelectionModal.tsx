import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, GraduationCap, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react'
import { useOnboardingModal } from '@/store/useOnboardingModal'
import type { Role } from '@/store/useOnboardingModal'
import { useAuthModal } from '@/store/useAuthModal'
import { cn } from '@/lib/utils'

const ROLES = [
  {
    id: 'student' as Role,
    title: 'Student',
    icon: GraduationCap,
    description: 'Find flexible local gigs that fit perfectly around your class schedule.',
    benefits: ['Flexible earning', 'Nearby opportunities', 'Work anytime']
  },
  {
    id: 'provider' as Role,
    title: 'Provider',
    icon: Briefcase,
    description: 'Instantly connect with verified local students for short-term help.',
    benefits: ['Quick local hiring', 'Nearby student workers', 'Flexible staffing']
  }
]

export const RoleSelectionModal = () => {
  const { isOpen, selectedRole, setRole, closeModal } = useOnboardingModal()
  const openAuthModal = useAuthModal(state => state.openModal)

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeModal])

  const handleContinue = () => {
    if (!selectedRole) return
    closeModal()
    // Staggered transition to Auth Modal
    setTimeout(() => {
      openAuthModal('signup')
    }, 150)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-background border border-border shadow-2xl rounded-[2.5rem] overflow-hidden flex flex-col"
          >
            {/* Abstract Header Glow */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors z-50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 sm:p-12 flex flex-col relative z-10">
              
              {/* Header */}
              <div className="text-center mb-10 max-w-lg mx-auto">
                <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">Welcome to HustiQ</span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
                  How will you use the platform?
                </h2>
                <p className="text-muted-foreground text-lg">
                  Choose your path to get started. You can always create a secondary profile later.
                </p>
              </div>

              {/* Role Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {ROLES.map((role) => {
                  const isActive = selectedRole === role.id
                  return (
                    <motion.button
                      key={role.id}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setRole(role.id)}
                      className={cn(
                        "relative text-left p-8 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-start overflow-hidden group focus:outline-none",
                        isActive 
                          ? "border-foreground bg-foreground text-background shadow-xl" 
                          : "border-border/60 bg-background hover:border-foreground/30 hover:shadow-soft-lg"
                      )}
                    >
                      {/* Active Indicator Glow */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                      )}

                      <div className="flex w-full items-start justify-between mb-6 relative z-10">
                        <div className={cn(
                          "w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300",
                          isActive ? "bg-background/20 text-background" : "bg-muted text-foreground group-hover:bg-primary/10 group-hover:text-primary"
                        )}>
                          <role.icon className="w-7 h-7" />
                        </div>
                        {isActive && (
                          <motion.div 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-background text-foreground rounded-full p-1"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                          </motion.div>
                        )}
                      </div>

                      <h3 className={cn(
                        "text-2xl font-bold tracking-tight mb-3 relative z-10",
                        isActive ? "text-background" : "text-foreground"
                      )}>
                        I'm a {role.title}
                      </h3>
                      
                      <p className={cn(
                        "leading-relaxed mb-8 relative z-10",
                        isActive ? "text-background/80" : "text-muted-foreground"
                      )}>
                        {role.description}
                      </p>

                      <ul className="space-y-3 mt-auto relative z-10 w-full">
                        {role.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <CheckCircle2 className={cn(
                              "w-4 h-4 flex-shrink-0",
                              isActive ? "text-background/60" : "text-primary"
                            )} />
                            <span className={cn(
                              "text-sm font-medium",
                              isActive ? "text-background/90" : "text-foreground/80"
                            )}>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.button>
                  )
                })}
              </div>

              {/* Footer Action */}
              <div className="flex justify-center mt-auto">
                <motion.button
                  whileHover={selectedRole ? { scale: 1.02 } : {}}
                  whileTap={selectedRole ? { scale: 0.98 } : {}}
                  onClick={handleContinue}
                  disabled={!selectedRole}
                  className={cn(
                    "flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 w-full sm:w-auto",
                    selectedRole 
                      ? "bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:bg-primary/90 cursor-pointer" 
                      : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                  )}
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
