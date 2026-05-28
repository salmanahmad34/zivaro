import { PlusCircle, Zap, MessageSquare } from 'lucide-react'
import { usePostJob } from '@/store/usePostJob'

export const ProviderQuickActions = () => {
  const { open } = usePostJob()

  return (
    <div className="bg-card border border-border/40 shadow-sm rounded-[2rem] p-6 relative overflow-hidden group">
      {/* Subtle background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-500" />
      
      <h3 className="text-xl font-black text-foreground mb-4">Quick Actions</h3>
      
      <div className="flex flex-col gap-3 relative z-10">
        <button 
          onClick={open}
          className="flex items-center gap-3 w-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Post New Job</span>
        </button>
        
        <button className="flex items-center gap-3 w-full bg-background border border-border/50 hover:border-red-500/30 text-foreground hover:bg-red-500/5 hover:text-red-500 font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm active:scale-95 group/btn">
          <Zap className="w-5 h-5 group-hover/btn:fill-red-500/20" />
          <span>Create Urgent Hiring</span>
        </button>

        <button className="flex items-center gap-3 w-full bg-background border border-border/50 hover:border-primary/30 text-foreground hover:bg-primary/5 hover:text-primary font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm active:scale-95">
          <MessageSquare className="w-5 h-5" />
          <span>Message Applicants</span>
        </button>
      </div>
    </div>
  )
}
