import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WifiOff, Wifi, RotateCw, X } from 'lucide-react'

export const NetworkStatusDetector = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [showStatus, setShowStatus] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowStatus(true)
      // Hide the success banner after 3 seconds
      const timer = setTimeout(() => setShowStatus(false), 3000)
      return () => clearTimeout(timer)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowStatus(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Initial check: if offline on mount, show the banner
    if (!navigator.onLine) {
      setShowStatus(true)
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleCheckConnection = async () => {
    setIsChecking(true)
    // Simulate checking connection by pinging a lightweight endpoint
    try {
      await fetch('https://www.google.com', { mode: 'no-cors', cache: 'no-store' })
      setIsOnline(true)
      setIsChecking(false)
      setShowStatus(true)
      setTimeout(() => setShowStatus(false), 3000)
    } catch (err) {
      // Still offline
      setTimeout(() => {
        setIsChecking(false)
        setIsOnline(false)
      }, 800)
    }
  }

  return (
    <AnimatePresence>
      {showStatus && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="fixed bottom-20 md:bottom-6 right-4 z-[9999] max-w-sm w-[calc(100vw-2rem)]"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/85 backdrop-blur-md p-4 shadow-2xl">
            {/* Glow accent */}
            <div 
              className={`absolute top-0 left-0 w-full h-1 transition-colors duration-500 ${
                isOnline ? 'bg-emerald-500' : 'bg-destructive'
              }`} 
            />

            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl shrink-0 ${
                isOnline ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'
              }`}>
                {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-foreground">
                  {isOnline ? 'Internet Restored' : 'Connection Lost'}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {isOnline 
                    ? 'You are back online. All features are fully functional.' 
                    : 'Working in offline preview. Some realtime features are temporarily suspended.'
                  }
                </p>
                
                {!isOnline && (
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={handleCheckConnection}
                      disabled={isChecking}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-bold hover:bg-foreground/90 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
                    >
                      <RotateCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
                      {isChecking ? 'Checking...' : 'Check Connection'}
                    </button>
                    <button
                      onClick={() => setShowStatus(false)}
                      className="inline-flex items-center justify-center p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
