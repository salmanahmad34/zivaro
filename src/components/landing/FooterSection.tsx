import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'


const FOOTER_LINKS = {
  Product: [
    { name: 'Browse Gigs', href: '/jobs' },
    { name: 'Post a Gig', href: '/jobs/new' },
    { name: 'Zivaro Premium', href: '/premium' },
    { name: 'How it Works', href: '#workflow' }
  ],
  Company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Support', href: '/contact' }
  ],
  Legal: [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Trust & Safety', href: '/safety' },
    { name: 'Cookie Policy', href: '/cookies' }
  ]
}

const SOCIAL_LINKS = [
  { name: 'X/Twitter', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'LinkedIn', href: '#' }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

export const FooterSection = () => {
  return (
    <footer className="w-full bg-foreground text-background border-t border-background/10 py-16 md:py-24 relative overflow-hidden">
      <div className="container max-w-screen-xl mx-auto px-4 relative z-10">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col space-y-6">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="relative flex items-center justify-center w-8 h-8">
                {/* Geometric upward growth symbol (Inverted for Dark Footer) */}
                <div className="absolute w-4 h-4 border-[2.5px] border-background rounded-[3px] transition-colors duration-300 group-hover:border-primary" />
                <div className="absolute w-4 h-4 border-[2.5px] border-background/40 rounded-[3px] translate-x-1.5 -translate-y-1.5 transition-all duration-300 group-hover:border-primary/50 group-hover:translate-x-2.5 group-hover:-translate-y-2.5" />
                <div className="absolute w-1.5 h-1.5 bg-primary rounded-[2px] translate-x-1.5 -translate-y-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-4 group-hover:-translate-y-4" />
              </div>
              <span className="font-sans font-bold text-[22px] tracking-tighter text-background uppercase">
                Zivaro
              </span>
            </Link>
            
            <p className="text-background/60 max-w-sm leading-relaxed">
              The premium local platform connecting ambitious students with flexible neighborhood opportunities. Build your future on your own terms.
            </p>
            
            <div className="flex items-center gap-5 pt-2">
              {SOCIAL_LINKS.map((social, idx) => (
                <a key={idx} href={social.href} className="text-background/40 hover:text-primary transition-all hover:-translate-y-1 duration-300 text-sm font-medium">
                  {social.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <motion.div variants={itemVariants} key={title} className="flex flex-col space-y-6">
              <h4 className="font-bold text-background tracking-tight">{title}</h4>
              <ul className="flex flex-col space-y-4">
                {links.map(link => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-background/60 hover:text-background hover:translate-x-1 transition-all duration-300 text-sm font-medium inline-block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 md:mt-24 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/40"
        >
          <p>© {new Date().getFullYear()} Zivaro Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-8 font-medium">
            <Link to="/privacy" className="hover:text-background transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-background transition-colors">Terms of Service</Link>
          </div>
        </motion.div>

      </div>
    </footer>
  )
}
