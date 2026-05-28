import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useJobDetails } from '@/store/useJobDetails'
import { useQuickApply } from '@/store/useQuickApply'
import { useAppliedJobs } from '@/store/useAppliedJobs'
import { X, MapPin, Clock, IndianRupee, ShieldCheck, Zap, Share2, Bookmark, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export const JobDetailsPanel = () => {
  const { selectedJob, close } = useJobDetails()
  const { open: openQuickApply } = useQuickApply()
  const [isMobile, setIsMobile] = useState(false)
  const isApplied = useAppliedJobs((state) => selectedJob ? state.isApplied(selectedJob.id) : false)

  // Listen for window resize to determine if we are on mobile (for animation variants)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Lock body scroll when panel is open
  useEffect(() => {
    if (selectedJob) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedJob])

  if (!selectedJob) return null

  // Framer motion variants for responsive sliding
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  } as const

  const panelVariants = {
    hidden: isMobile ? { y: '100%' } : { x: '100%' },
    visible: isMobile 
      ? { y: 0, transition: { type: 'spring' as const, damping: 25, stiffness: 200 } } 
      : { x: 0, transition: { type: 'spring' as const, damping: 25, stiffness: 200 } }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex justify-end">
        {/* Backdrop */}
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={close}
          className="absolute inset-0 bg-background/80"
        />

        {/* Panel */}
        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={cn(
            "relative bg-card flex flex-col shadow-2xl overflow-hidden",
            isMobile 
              ? "w-full h-[95vh] mt-auto rounded-t-[2.5rem]" // Mobile Sheet
              : "w-full max-w-[550px] h-full border-l border-border/50" // Desktop Sliding Panel
          )}
        >
          {/* Subtle Glow Underlay */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          {/* Sticky Header Actions */}
          <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-center z-20">
            <button 
              onClick={close}
              className="w-10 h-10 rounded-full bg-background/80 backdrop-blur border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-sm">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-sm">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="px-6 sm:px-10 pt-24 pb-8 flex flex-col gap-8">
              
              {/* TOP SECTION: Hero & Metadata */}
              <div className="flex flex-col gap-6 relative z-10">
                <div className="flex justify-between items-start gap-4">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-muted/30 border border-border flex items-center justify-center text-4xl shadow-sm shrink-0">
                    {selectedJob.logoPlaceholder}
                  </div>
                  {selectedJob.isUrgent && (
                    <div className="flex items-center gap-1.5 bg-destructive/10 text-destructive text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                      <Zap className="w-4 h-4" /> Urgent Hiring
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground/80">{selectedJob.businessName}</span>
                    {selectedJob.isPremium && <ShieldCheck className="w-4 h-4 text-blue-500" />}
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black text-foreground leading-[1.1] tracking-tight">
                    {selectedJob.title}
                  </h1>
                </div>

                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center gap-2 text-sm text-foreground font-medium bg-muted/40 px-4 py-2 rounded-xl border border-border/40">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{selectedJob.location}</span>
                    <span className="text-muted-foreground ml-1">({selectedJob.distance})</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground font-medium bg-muted/40 px-4 py-2 rounded-xl border border-border/40">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{selectedJob.timing}</span>
                  </div>
                </div>
              </div>

              {/* MIDDLE SECTION: Details */}
              <div className="flex flex-col gap-8 relative z-10">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-foreground">About the role</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {selectedJob.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-foreground">Requirements</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">No prior experience strictly necessary, just a great attitude.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">Must be available during the specified shift timings.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">Good communication skills and ability to work in a fast-paced environment.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-foreground">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.tags.map(tag => (
                      <span key={tag} className="px-4 py-2 rounded-xl bg-background border border-border/50 text-xs font-semibold text-foreground/80 shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* BOTTOM SECTION: Sticky Payout & Action */}
          <div className="relative z-20 p-6 sm:p-8 bg-background border-t border-border/40 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex flex-col w-full sm:w-auto">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Guaranteed Payout</span>
              <div className="flex items-baseline gap-1">
                <IndianRupee className="w-6 h-6 -mr-1.5 text-primary" />
                <span className="text-4xl sm:text-5xl font-black text-foreground tracking-tighter">{selectedJob.payout}</span>
                <span className="text-sm font-semibold text-muted-foreground ml-1 shrink-0">/ {selectedJob.payoutType}</span>
              </div>
            </div>
            <button 
              onClick={() => !isApplied && openQuickApply(selectedJob)}
              disabled={isApplied}
              className={cn(
                "w-full sm:w-auto font-bold px-10 py-4 rounded-2xl transition-all text-base sm:text-lg",
                isApplied 
                  ? "bg-muted/50 text-muted-foreground cursor-not-allowed" 
                  : "bg-foreground text-background hover:bg-primary hover:text-primary-foreground hover:shadow-xl hover:shadow-primary/20 active:scale-95"
              )}
            >
              {isApplied ? "✓ Applied" : "Quick Apply"}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  )
}
