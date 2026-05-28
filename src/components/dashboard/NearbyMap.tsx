import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Navigation, IndianRupee, ArrowUpRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type Job } from '@/components/dashboard/JobCard'
import { useJobDetails } from '@/store/useJobDetails'

interface NearbyMapProps {
  jobs: Job[]
}

// Fixed positions for mock demonstration (top/left percentages)
const MOCK_POSITIONS = [
  { top: '30%', left: '40%' },
  { top: '60%', left: '65%' },
  { top: '45%', left: '20%' },
  { top: '70%', left: '35%' },
  { top: '25%', left: '75%' },
  { top: '80%', left: '80%' },
]

export const NearbyMap = ({ jobs }: NearbyMapProps) => {
  const [activeJobId, setActiveJobId] = useState<string | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const { open: openDetails } = useJobDetails()

  // Click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mapRef.current && !mapRef.current.contains(event.target as Node)) {
        setActiveJobId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div 
      className="relative w-full h-[400px] sm:h-[500px] bg-muted/20 border border-border/50 rounded-[2.5rem] shadow-sm overflow-hidden"
      ref={mapRef}
    >
      {/* Abstract Map Background Grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }}
      />

      {/* Map Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Center "You are here" indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
          className="absolute w-12 h-12 bg-primary/30 rounded-full"
        />
        <div className="w-4 h-4 bg-primary rounded-full border-2 border-background shadow-md relative z-10" />
      </div>

      {/* Job Pins */}
      {jobs.map((job, idx) => {
        const isActive = activeJobId === job.id
        const pos = MOCK_POSITIONS[idx % MOCK_POSITIONS.length]

        return (
          <div 
            key={job.id} 
            className="absolute z-20"
            style={{ top: pos.top, left: pos.left }}
          >
            {/* The Pin */}
            <button 
              onClick={(e) => {
                e.stopPropagation()
                setActiveJobId(job.id)
              }}
              className={cn(
                "relative flex items-center justify-center -translate-x-1/2 -translate-y-full transition-transform hover:scale-110",
                isActive ? "z-30 scale-110" : "z-20"
              )}
            >
              <motion.div 
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                className="relative"
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2",
                  isActive ? "bg-foreground border-foreground text-background" : "bg-card border-border text-foreground hover:border-primary"
                )}>
                  <MapPin className="w-4 h-4" />
                </div>
                {/* Pin Tail */}
                <div className={cn(
                  "absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-r-2 border-b-2 shadow-sm rounded-br-sm",
                  isActive ? "bg-foreground border-foreground" : "bg-card border-border"
                )} />
              </motion.div>
            </button>

            {/* The Popup */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden z-40"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4 flex flex-col gap-3 relative">
                    <button 
                      onClick={() => setActiveJobId(null)}
                      className="absolute top-3 right-3 w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    
                    <div className="flex gap-3 items-center pr-6">
                      <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-lg shrink-0">
                        {job.logoPlaceholder}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-bold uppercase text-emerald-500 tracking-wider flex items-center gap-1">
                          <Navigation className="w-2.5 h-2.5" /> {job.distance}
                        </span>
                        <h4 className="font-bold text-foreground text-sm truncate">{job.title}</h4>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-baseline gap-0.5 text-foreground font-bold">
                        <IndianRupee className="w-3 h-3 text-primary" />
                        <span className="text-base">{job.payout}</span>
                        <span className="text-[10px] text-muted-foreground font-semibold">/{job.payoutType}</span>
                      </div>
                      
                      <button 
                        onClick={() => openDetails(job)}
                        className="flex items-center gap-1 text-xs font-bold bg-foreground text-background hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded-lg transition-colors active:scale-95"
                      >
                        View <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}

      {/* Floating Meta Pills */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <div className="bg-background/80 backdrop-blur-md border border-border/50 shadow-sm px-3 py-1.5 rounded-full text-xs font-bold text-foreground flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          {jobs.length} Active Jobs Nearby
        </div>
      </div>
    </div>
  )
}
