import { motion } from 'framer-motion'
import { ShoppingBag, Coffee, Truck, CalendarDays, Box, Laptop } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Category {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

const CATEGORIES: Category[] = [
  { 
    id: 'retail', 
    title: 'Retail', 
    description: 'Stocking shelves, assisting customers, and managing inventory during busy shifts.', 
    icon: ShoppingBag 
  },
  { 
    id: 'cafe', 
    title: 'Cafe & Dining', 
    description: 'Barista support, waiting tables, and kitchen assistance for local restaurants.', 
    icon: Coffee 
  },
  { 
    id: 'delivery', 
    title: 'Delivery', 
    description: 'Local courier tasks, food delivery, and fast document transportation.', 
    icon: Truck 
  },
  { 
    id: 'events', 
    title: 'Events', 
    description: 'Event setup, ushering, ticketing, and general staff support for local venues.', 
    icon: CalendarDays 
  },
  { 
    id: 'packing', 
    title: 'Packing & Moving', 
    description: 'Warehouse packing, organizing inventory, and local relocation assistance.', 
    icon: Box 
  },
  { 
    id: 'online', 
    title: 'Online Tasks', 
    description: 'Data entry, virtual assistance, content moderation, and remote admin work.', 
    icon: Laptop 
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
} as const

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <motion.div 
      variants={cardVariants}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col items-start p-8 rounded-[2rem] bg-background border border-border/50 shadow-sm transition-all duration-300 hover:shadow-soft-lg hover:border-border overflow-hidden"
    >
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-muted group-hover:bg-foreground transition-colors duration-300 mb-6 shadow-sm">
        <category.icon className="w-6 h-6 text-foreground group-hover:text-background transition-colors duration-300" />
      </div>
      <h3 className="text-xl font-bold text-foreground tracking-tight mb-2">{category.title}</h3>
      <p className="text-muted-foreground leading-relaxed">{category.description}</p>
      
      {/* Subtle luxury accent line that expands on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-foreground origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
    </motion.div>
  )
}

export const CategoriesSection = () => {
  return (
    <section className="w-full py-24 md:py-32 relative overflow-hidden bg-muted/20">
      {/* Subtle Premium Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container max-w-screen-xl mx-auto px-4 flex flex-col relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left space-y-4 max-w-2xl mb-16 md:mb-20"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm">Explore Opportunities</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            A flexible gig <br className="hidden md:block"/> for every schedule.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-4">
            Whether you want to be on your feet or behind a screen, find local work that perfectly fits your skills and availability.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
