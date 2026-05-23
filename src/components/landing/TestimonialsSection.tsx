import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  type: 'student' | 'provider'
  content: string
  initials: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Aarav P.',
    role: 'Computer Science Student',
    type: 'student',
    content: "I needed to cover some quick expenses without committing to a restrictive part-time job. Finding a 4-hour event gig right down the street was incredibly easy.",
    initials: 'AP'
  },
  {
    id: 't2',
    name: 'Priya S.',
    role: 'Cafe Owner',
    type: 'provider',
    content: "We frequently get unexpected weekend rushes. Being able to instantly connect with verified local students for an extra pair of hands has been an absolute lifesaver.",
    initials: 'PS'
  },
  {
    id: 't3',
    name: 'Neha K.',
    role: 'Design Student',
    type: 'student',
    content: "The flexibility is exactly what I needed. I can pick up short delivery tasks between my studio classes and get paid immediately. It completely removes the stress of rigid shifts.",
    initials: 'NK'
  },
  {
    id: 't4',
    name: 'Rahul M.',
    role: 'Event Coordinator',
    type: 'provider',
    content: "Hiring temporary event staff used to be a hassle of endless messages and unreliable turnouts. Now, I post a gig and have confirmed, reliable help in minutes.",
    initials: 'RM'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <motion.div 
      variants={cardVariants}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col p-8 md:p-10 rounded-[2.5rem] bg-background border border-border/50 shadow-sm transition-all duration-300 hover:shadow-soft-lg hover:border-border overflow-hidden"
    >
      {/* Decorative Quote Icon */}
      <Quote className="absolute top-8 right-8 w-12 h-12 text-muted/30 group-hover:text-primary/10 transition-colors duration-300 pointer-events-none" />
      
      <p className="text-foreground md:text-lg leading-relaxed mb-10 relative z-10 font-medium">
        "{testimonial.content}"
      </p>
      
      <div className="flex items-center gap-4 mt-auto relative z-10">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-foreground to-foreground/80 text-background font-bold tracking-tight shadow-sm">
          {testimonial.initials}
        </div>
        <div className="flex flex-col">
          <h4 className="font-bold text-foreground tracking-tight">{testimonial.name}</h4>
          <span className="text-sm text-muted-foreground">{testimonial.role}</span>
        </div>
      </div>
      
      {/* Subtle luxury accent line */}
      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-foreground origin-top transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
    </motion.div>
  )
}

export const TestimonialsSection = () => {
  return (
    <section className="w-full py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Subtle Premium Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="container max-w-screen-xl mx-auto px-4 flex flex-col items-center relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-3xl mb-16 md:mb-24"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm">Real Experiences</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Trusted by locals. <br className="hidden md:block"/> Powered by students.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-4">
            See how our platform is creating authentic, friction-free opportunities for the community every single day.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full"
        >
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
