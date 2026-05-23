import { Zap } from 'lucide-react'

export const PremiumPage = () => {
  return (
    <div className="space-y-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <Zap className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight">Upgrade to Premium</h1>
      <p className="text-xl text-muted-foreground max-w-md">
        Unlock advanced startup tools, priority support, and exclusive networking opportunities.
      </p>
      <div className="glass-card p-8 rounded-2xl mt-8 border-primary/20">
        <p className="text-muted-foreground">Pricing plans placeholder</p>
      </div>
    </div>
  )
}
