import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface MasonryFeedProps {
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

export const MasonryFeed = ({ children }: MasonryFeedProps) => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "100px" }}
      className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6 w-full"
    >
      {children}
    </motion.div>
  )
}
