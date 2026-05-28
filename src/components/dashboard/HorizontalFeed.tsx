import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface HorizontalFeedProps {
  children: ReactNode
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const HorizontalFeed = ({ children }: HorizontalFeedProps) => {
  return (
    <div className="w-full relative -mx-4 md:mx-0">
      {/* Hide scrollbar but keep functionality */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory px-4 md:px-0 pb-8 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {children}
        {/* Spacer at the end for mobile breathing room */}
        <div className="w-4 shrink-0 md:hidden" />
      </motion.div>
    </div>
  )
}
