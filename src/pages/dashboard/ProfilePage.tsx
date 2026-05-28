import { motion } from 'framer-motion'
import { useState } from 'react'
import { MapPin, BadgeCheck, Mail, Phone, Building2, Briefcase, GraduationCap, Clock, Edit2, Wallet, Camera } from 'lucide-react'
import { ZivaroBrandIcon } from '@/components/brand/ZivaroBrandIcon'
import { TrustBanner } from '@/components/trust/TrustSystem'
import { ReputationSummary } from '@/components/reviews/ReviewDisplay'
import { ReviewModal } from '@/components/reviews/ReviewModal'
import { useAuth } from '@/store/useAuth'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

// Spring physics for snappy app-like feel
const springTransition = { type: "spring" as const, stiffness: 400, damping: 30 }

// Staggered list animation wrapper
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: springTransition }
} as const

export const ProfilePage = () => {
  const { user } = useAuth()
  const isProvider = user?.role === 'provider'
  const [reviewModalOpen, setReviewModalOpen] = useState(false)

  // subjectId for demo: students review the mock provider, providers review the mock student
  const reviewSubjectId = isProvider ? 'mock-student' : 'mock-provider'
  const reviewSubjectName = isProvider ? 'HustiQ Student' : 'Third Wave Coffee'
  const reviewSubjectAvatar = isProvider ? 'H' : '☕'

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* 1. Premium Header Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springTransition}
        className="relative w-full rounded-3xl bg-card border border-border/50 shadow-soft-lg overflow-hidden"
      >
        {/* Cover Gradient */}
        <div className="h-40 sm:h-48 w-full bg-gradient-to-r from-primary/30 via-accent/20 to-primary/10 relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
           {/* Decorative blur orbs */}
           <div className="absolute top-[-50%] left-[-10%] w-64 h-64 bg-primary/40 rounded-full blur-[80px]" />
           <div className="absolute bottom-[-50%] right-[-10%] w-64 h-64 bg-accent/40 rounded-full blur-[80px]" />
           
           {/* Edit Cover Button */}
           <button className="absolute top-4 right-4 p-2 bg-background/50 hover:bg-background/80 backdrop-blur-md rounded-full text-foreground transition-all shadow-sm">
             <Camera className="w-4 h-4" />
           </button>
        </div>

        {/* Profile Identity Area */}
        <div className="px-6 sm:px-10 pb-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-8 -mt-16 sm:-mt-20 relative z-10">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-card bg-muted flex items-center justify-center text-4xl sm:text-5xl font-bold text-muted-foreground shadow-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                {user?.avatarPlaceholder || 'Z'}
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-foreground text-background rounded-full shadow-lg hover:scale-105 transition-transform">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Name & Badges */}
            <div className="flex-1 space-y-2 pb-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  {user?.name || 'HustiQ User'}
                  <BadgeCheck className="w-6 h-6 text-primary" />
                </h1>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {isProvider ? <Building2 className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                  {isProvider ? 'Verified Provider' : 'Verified Student'}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  Mumbai, Maharashtra
                </span>
              </div>

              {/* Trust Banner */}
              <TrustBanner
                role={user?.role ?? 'student'}
                isVerified={true}
                trustScore={88}
                responseRate={isProvider ? 94 : undefined}
                completedJobs={isProvider ? undefined : 7}
                reliabilityLevel={isProvider ? 'high' : undefined}
                className="mt-1"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pb-2 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-6 py-2.5 bg-foreground text-background font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                <Edit2 className="w-4 h-4" /> Edit Profile
              </button>
              <button
                onClick={() => setReviewModalOpen(true)}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-muted border border-border text-foreground font-bold rounded-xl hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
              >
                ★ Leave a Review
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Content Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        
        {/* Left Column: Stats & Metadata */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Role-Based Stats Card */}
          <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl space-y-6 shadow-soft-lg">
            <h3 className="font-bold text-lg text-foreground flex items-center gap-2 border-b border-border/50 pb-4">
              <ZivaroBrandIcon />
              {isProvider ? 'Business Overview' : 'Hustle Stats'}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {isProvider ? (
                <>
                  <div className="space-y-1 p-4 bg-muted/30 rounded-xl border border-border/50">
                    <p className="text-sm text-muted-foreground font-medium">Active Jobs</p>
                    <p className="text-2xl font-bold text-foreground">12</p>
                  </div>
                  <div className="space-y-1 p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <p className="text-sm text-primary font-medium">Applicants</p>
                    <p className="text-2xl font-bold text-primary">48</p>
                  </div>
                  <div className="space-y-1 p-4 bg-muted/30 rounded-xl border border-border/50">
                    <p className="text-sm text-muted-foreground font-medium">Category</p>
                    <p className="text-sm font-bold text-foreground flex items-center gap-1.5 mt-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-primary" /> Hospitality
                    </p>
                  </div>
                  <Link 
                    to={ROUTES.WALLET}
                    className="space-y-1 p-4 bg-muted/30 hover:bg-muted/50 rounded-xl border border-border/50 hover:border-primary/20 transition-all cursor-pointer block group text-left"
                  >
                    <p className="text-xs text-muted-foreground font-semibold group-hover:text-primary transition-colors flex justify-between items-center">
                      <span>Expenses</span>
                      <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold transition-opacity text-primary font-sans">&rarr;</span>
                    </p>
                    <p className="text-base font-extrabold text-foreground flex items-center gap-1.5 mt-1.5">
                      <Wallet className="w-3.5 h-3.5 text-emerald-500 group-hover:scale-110 transition-transform" /> ₹82.4K <span className="text-[10px] font-normal text-muted-foreground">spent</span>
                    </p>
                  </Link>
                </>
              ) : (
                <>
                  <div className="space-y-1 p-4 bg-muted/30 rounded-xl border border-border/50">
                    <p className="text-sm text-muted-foreground font-medium">Applications</p>
                    <p className="text-2xl font-bold text-foreground">8</p>
                  </div>
                  <div className="space-y-1 p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <p className="text-sm text-primary font-medium">Saved Jobs</p>
                    <p className="text-2xl font-bold text-primary">14</p>
                  </div>
                  <Link 
                    to={ROUTES.WALLET}
                    className="col-span-2 space-y-1 p-4 bg-muted/30 hover:bg-muted/50 rounded-xl border border-border/50 hover:border-primary/20 transition-all cursor-pointer block group text-left"
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground font-semibold group-hover:text-primary transition-colors">Est. Earnings</p>
                      <span className="text-[9px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity font-sans">View Wallet &rarr;</span>
                    </div>
                    <p className="text-xl font-bold text-foreground flex items-center gap-2 mt-1">
                      <Wallet className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" /> ₹18,450 <span className="text-sm font-normal text-muted-foreground">overall</span>
                    </p>
                  </Link>
                </>
              )}
            </div>
          </motion.div>

          {/* Role-Based Tags/Details */}
          <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl space-y-6 shadow-soft-lg">
            <h3 className="font-bold text-lg text-foreground flex items-center gap-2 border-b border-border/50 pb-4">
              {isProvider ? <Building2 className="w-5 h-5 text-primary" /> : <Clock className="w-5 h-5 text-primary" />}
              {isProvider ? 'Business Details' : 'Availability & Skills'}
            </h3>
            
            {isProvider ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Hiring Needs</p>
                  <div className="flex flex-wrap gap-2">
                    {['Baristas', 'Wait Staff', 'Event Management'].map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-muted text-foreground text-sm rounded-lg font-medium border border-border">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Top Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {['Data Entry', 'Event Staffing', 'Design', 'Tech Support'].map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-muted text-foreground text-sm rounded-lg font-medium border border-border">{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Weekly Availability</p>
                  <div className="p-3 bg-primary/5 text-primary font-semibold rounded-xl border border-primary/20 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Weekends Only
                  </div>
                </div>
              </div>
            )}
          </motion.div>

        </div>

        {/* Right Column: Editable Settings */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div variants={itemVariants} className="glass-card rounded-2xl shadow-soft-lg overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-border/50 bg-muted/10">
              <h2 className="text-xl font-bold text-foreground">Profile Information</h2>
              <p className="text-sm text-muted-foreground mt-1">Update your personal details and public presence.</p>
            </div>
            
            <div className="p-6 sm:p-8 space-y-6">
              {/* Bio Section */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">{isProvider ? 'Business Description' : 'About Me'}</label>
                <textarea 
                  className="w-full h-32 bg-background border border-border rounded-xl p-4 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none leading-relaxed"
                  placeholder={isProvider ? "Describe your business, culture, and what kind of students you're looking for..." : "Write a short bio about yourself, your studies, and the types of gigs you prefer..."}
                />
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" /> Email Address
                  </label>
                  <input 
                    type="email" 
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    defaultValue={user?.email || ''}
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" /> Phone Number
                  </label>
                  <input 
                    type="tel" 
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>
              </div>

              {/* Save Actions */}
              <div className="pt-6 mt-6 border-t border-border/50 flex items-center justify-end gap-4">
                <button className="px-6 py-2.5 font-bold text-muted-foreground hover:text-foreground transition-colors">
                  Cancel
                </button>
                <button className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>

          {/* Reputation Summary */}
          <motion.div variants={itemVariants}>
            <ReputationSummary
              subjectId={isProvider ? 'mock-provider' : 'mock-student'}
              title={isProvider ? 'Your Business Reviews' : 'Your Reviews'}
              onWriteReview={() => setReviewModalOpen(true)}
            />
          </motion.div>
        </div>

      </motion.div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        subjectId={reviewSubjectId}
        subjectName={reviewSubjectName}
        subjectAvatar={reviewSubjectAvatar}
        jobTitle="Weekend Barista"
      />
    </div>
  )
}
