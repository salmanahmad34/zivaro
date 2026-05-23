import { motion } from 'framer-motion'
import { PlusCircle, Bell, MousePointerClick, CheckCircle2, Briefcase, CreditCard } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  id: number
  title: string
  description: string
  icon: LucideIcon
}

const WORKFLOW_STEPS: Step[] = [
  {
    id: 1,
    title: "Post a Nearby Job",
    description: "Providers easily list local flexible gigs, detailing the requirements and compensation instantly.",
    icon: PlusCircle,
  },
  {
    id: 2,
    title: "Students Notified",
    description: "Our algorithm matches the gig and instantly alerts verified students in the immediate vicinity.",
    icon: Bell,
  },
  {
    id: 3,
    title: "One-Tap Apply",
    description: "Students review the opportunity and apply with a single, frictionless tap.",
    icon: MousePointerClick,
  },
  {
    id: 4,
    title: "Quick Approval",
    description: "Providers review profiles and quickly approve the best student for the job.",
    icon: CheckCircle2,
  },
  {
    id: 5,
    title: "Work Completed",
    description: "The student arrives, executes the task professionally, and marks it as completed.",
    icon: Briefcase,
  },
  {
    id: 6,
    title: "Payment Processed",
    description: "Secure, automated payouts are instantly transferred directly to the student.",
    icon: CreditCard,
  }
]

const WorkflowStepCard = ({ step, index }: { step: Step; index: number }) => {
  const isEven = index % 2 === 0
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={cn(
        "flex flex-col md:flex-row items-start md:items-center w-full relative",
        isEven ? "md:flex-row-reverse" : ""
      )}
    >
      {/* Timeline Node Icon */}
      <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-2xl bg-background border border-border shadow-soft-lg z-10 transition-transform duration-300 hover:scale-110 hover:border-primary/40 group">
        <step.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
      </div>

      {/* Content Container */}
      <div className={cn(
        "w-full md:w-1/2 pl-24 md:pl-0",
        isEven ? "md:pr-24 text-left md:text-right" : "md:pl-24 text-left"
      )}>
        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-6 md:p-8 rounded-[2rem] group transition-all duration-300 hover:shadow-soft-lg border border-transparent hover:border-border bg-background/50 hover:bg-background/80"
        >
          <div className={cn(
            "flex items-center gap-4 mb-4",
            isEven ? "md:flex-row-reverse" : ""
          )}>
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-foreground text-background font-bold text-sm shadow-sm transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              {step.id}
            </span>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">{step.title}</h3>
          </div>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {step.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export const WorkflowSection = () => {
  return (
    <section id="workflow" className="w-full py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Abstract Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="container max-w-screen-xl mx-auto px-4 flex flex-col items-center relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-3xl mb-20 md:mb-32"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm">How It Works</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            A frictionless workflow <br className="hidden md:block"/> built for momentum.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-4">
            We've removed the friction from local gig work. Experience a seamless connection from posting to payment.
          </p>
        </motion.div>

        {/* Timeline Flow */}
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Animated Central Connecting Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-[28px] md:left-1/2 top-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent" 
          />

          <div className="space-y-12 md:space-y-24 relative py-4">
            {WORKFLOW_STEPS.map((step, index) => (
              <WorkflowStepCard key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
