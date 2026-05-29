import { motion } from 'framer-motion'
import { MapPin, Clock, Banknote, TrendingUp, Navigation, FastForward, Users, ShieldCheck, Activity, Briefcase } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Benefit {
  title: string
  description: string
  icon: LucideIcon
}

const STUDENT_BENEFITS: Benefit[] = [
  { title: "Nearby Opportunities", description: "Find verified gigs exactly where you live or study.", icon: MapPin },
  { title: "Flexible Work Timing", description: "Hustle on your own schedule, perfectly around classes.", icon: Clock },
  { title: "Quick Earning", description: "Get paid securely and instantly upon task completion.", icon: Banknote },
  { title: "Skill Growth", description: "Build a robust profile and unlock higher-paying jobs.", icon: TrendingUp },
  { title: "Local Convenience", description: "Skip the commute. Work strictly in your neighborhood.", icon: Navigation },
]

const PROVIDER_BENEFITS: Benefit[] = [
  { title: "Fast Local Hiring", description: "Instantly connect with talent ready to work right now.", icon: FastForward },
  { title: "Nearby Students", description: "Access a pool of eager, local students immediately.", icon: Users },
  { title: "Verified Workers", description: "Every student is background-checked and identity-verified.", icon: ShieldCheck },
  { title: "Rush Hour Support", description: "Get temporary help exactly when your business spikes.", icon: Activity },
  { title: "Flexible Hiring", description: "No long-term commitments. Hire exactly when you need it.", icon: Briefcase },
]

const LightBenefitCard = ({ benefit, index }: { benefit: Benefit; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="flex items-start gap-4 p-4 md:p-5 rounded-2xl transition-all duration-300 hover:bg-background shadow-none hover:shadow-soft-lg border border-transparent hover:border-border group"
    >
      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-muted group-hover:bg-foreground transition-colors duration-300">
        <benefit.icon className="w-5 h-5 text-foreground group-hover:text-background transition-colors duration-300" />
      </div>
      <div className="flex flex-col">
        <h4 className="text-lg font-bold text-foreground tracking-tight">{benefit.title}</h4>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{benefit.description}</p>
      </div>
    </motion.div>
  )
}

const DarkBenefitCard = ({ benefit, index }: { benefit: Benefit; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="flex items-start gap-4 p-4 md:p-5 rounded-2xl transition-all duration-300 hover:bg-background/10 border border-transparent hover:border-background/20 group"
    >
      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-background/10 group-hover:bg-primary transition-colors duration-300 shadow-sm">
        <benefit.icon className="w-5 h-5 text-background group-hover:text-primary-foreground transition-colors duration-300" />
      </div>
      <div className="flex flex-col">
        <h4 className="text-lg font-bold text-background tracking-tight">{benefit.title}</h4>
        <p className="text-background/70 mt-1 text-sm leading-relaxed">{benefit.description}</p>
      </div>
    </motion.div>
  )
}

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="w-full py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Subtle Premium Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-[10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="container max-w-screen-xl mx-auto px-4 flex flex-col items-center relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm">Value Proposition</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            A win-win ecosystem <br className="hidden md:block"/> for everyone involved.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-4">
            HustiQ is meticulously designed to eliminate hiring friction for local businesses while maximizing earning potential for students.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 w-full">
          
          {/* Students Area */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative glass-card p-6 md:p-10 lg:p-12 rounded-[2.5rem] border border-border bg-muted/30"
          >
            <div className="mb-8 border-b border-border/50 pb-6">
              <h3 className="text-3xl font-extrabold tracking-tight text-foreground">For Students</h3>
              <p className="text-muted-foreground mt-2 font-medium">Hustle on your terms and boost your income.</p>
            </div>
            <div className="space-y-2">
              {STUDENT_BENEFITS.map((benefit, i) => (
                <LightBenefitCard key={i} benefit={benefit} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Providers Area */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-foreground text-background p-6 md:p-10 lg:p-12 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Dark Card Subtle Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="mb-8 border-b border-background/10 pb-6 relative z-10">
              <h3 className="text-3xl font-extrabold tracking-tight text-background">For Providers</h3>
              <p className="text-background/70 mt-2 font-medium">Hire trusted local talent exactly when needed.</p>
            </div>
            <div className="space-y-2 relative z-10">
              {PROVIDER_BENEFITS.map((benefit, i) => (
                <DarkBenefitCard key={i} benefit={benefit} index={i} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
