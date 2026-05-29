import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQ {
  id: string
  question: string
  answer: string
}

const FAQS: FAQ[] = [
  {
    id: 'how-it-works',
    question: 'How exactly does HustiQ work?',
    answer: 'HustiQ instantly connects verified local students with nearby providers needing temporary help. Providers post a gig with requirements and pay, and students in the vicinity receive an alert. A student applies, the provider approves, and the gig is on.'
  },
  {
    id: 'matching',
    question: 'How does nearby opportunity matching work?',
    answer: 'Our proprietary algorithm uses real-time location data to match providers with students who are within a set radius (e.g., 2 km). This ensures minimal commute time and instant availability, keeping the entire ecosystem local and fast.'
  },
  {
    id: 'payment',
    question: 'How is payment safety guaranteed?',
    answer: 'All payments are held securely in escrow the moment a gig is confirmed. Once the work is marked as completed by both parties, the funds are instantly released directly to the student’s connected bank account. No cash handling required.'
  },
  {
    id: 'verification',
    question: 'How are providers and students verified?',
    answer: 'Trust is our foundation. Every student undergoes an identity check and university verification. Providers are similarly vetted to ensure a safe, professional environment for all local gigs.'
  },
  {
    id: 'cancellation',
    question: 'What is the cancellation policy?',
    answer: 'We maintain a strict but fair cancellation system. If a provider cancels last-minute, the student receives partial compensation. If a student cancels without notice, it negatively impacts their reliability score, prioritizing dependable workers.'
  },
  {
    id: 'premium',
    question: 'What are HustiQ Premium plans?',
    answer: 'While the core platform is free to use, HustiQ Premium offers providers priority listing visibility and advanced matching filters. For students, Premium unlocks immediate payout routing and early access to high-paying local gigs.'
  }
]

const FAQAccordion = ({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="border-b border-border/60 last:border-0"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 md:py-8 text-left focus:outline-none group"
      >
        <h3 className={cn(
          "text-lg md:text-xl font-bold tracking-tight transition-colors duration-300",
          isOpen ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
        )}>
          {faq.question}
        </h3>
        <div className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 flex-shrink-0 ml-4",
          isOpen ? "bg-foreground border-foreground text-background shadow-sm" : "bg-transparent border-border text-foreground group-hover:border-foreground"
        )}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-muted-foreground leading-relaxed text-base md:text-lg pr-8 md:pr-16">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export const FAQSection = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id)

  return (
    <section id="faq" className="w-full py-24 md:py-32 relative overflow-hidden bg-muted/20">
      <div className="container max-w-screen-xl mx-auto px-4 flex flex-col items-center relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-3xl mb-16 md:mb-20"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm">Platform Support</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Frequently asked questions.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-4">
            Everything you need to know about the product and how it works. Can't find the answer? Reach out to our team.
          </p>
        </motion.div>

        {/* FAQ Container */}
        <div className="w-full max-w-4xl mx-auto glass-card rounded-[2.5rem] bg-background border border-border/50 shadow-sm p-6 md:p-12">
          {FAQS.map((faq) => (
            <FAQAccordion 
              key={faq.id} 
              faq={faq} 
              isOpen={openId === faq.id} 
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)} 
            />
          ))}
        </div>

      </div>
    </section>
  )
}
