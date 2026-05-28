import { AnimatePresence } from 'framer-motion'
import { Search, Bell, Plus } from 'lucide-react'

import { ActiveJobCard } from '@/components/dashboard/provider/ActiveJobCard'
import { ApplicantCard } from '@/components/dashboard/provider/ApplicantCard'
import { ProviderQuickActions } from '@/components/dashboard/provider/ProviderQuickActions'
import { ProfileDropdown } from '@/components/dashboard/ProfileDropdown'
import { NotificationDropdown } from '@/components/dashboard/NotificationDropdown'
import { FirstTimeGuidance } from '@/components/shared/FirstTimeGuidance'

import { usePostJob } from '@/store/usePostJob'
import { useNotifications } from '@/store/useNotifications'

const MOCK_ACTIVE_JOBS = [
  {
    id: 'pj-1',
    title: 'Weekend Barista',
    applicantsCount: 12,
    newApplicants: 3,
    isUrgent: true,
    isActive: true,
    payout: 450,
    payoutType: 'shift',
    postedDate: '2d ago'
  },
  {
    id: 'pj-2',
    title: 'Cafe Manager',
    applicantsCount: 4,
    newApplicants: 0,
    isUrgent: false,
    isActive: true,
    payout: 35000,
    payoutType: 'month',
    postedDate: '1w ago'
  },
  {
    id: 'pj-3',
    title: 'Evening Server',
    applicantsCount: 28,
    newApplicants: 0,
    isUrgent: false,
    isActive: false,
    payout: 300,
    payoutType: 'shift',
    postedDate: '1m ago'
  }
]

const MOCK_APPLICANTS = [
  {
    id: 'app-1',
    name: 'Rahul Sharma',
    avatar: '👨🏽‍🎓',
    jobApplied: 'Weekend Barista',
    distance: '1.2km',
    availability: 'Weekends',
    skills: ['Coffee Brewing', 'Customer Service'],
    matchScore: 95
  },
  {
    id: 'app-2',
    name: 'Priya Patel',
    avatar: '👩🏽‍🎓',
    jobApplied: 'Weekend Barista',
    distance: '3.5km',
    availability: 'Flexible',
    skills: ['Cashier', 'Fast Learner'],
    matchScore: 88
  },
  {
    id: 'app-3',
    name: 'Amit Kumar',
    avatar: '👨🏽‍💻',
    jobApplied: 'Cafe Manager',
    distance: '5km',
    availability: 'Full-time',
    skills: ['Inventory', 'Team Lead', 'POS'],
    matchScore: 92
  }
]

export const ProviderDashboardPage = () => {
  const { open: openPostJob } = usePostJob()
  const { toggleOpen, notifications } = useNotifications()

  const hasUnread = notifications
    .filter(n => n.role === 'provider')
    .some(n => n.isUnread)

  return (
    <div className="flex flex-col h-full w-full pb-20 md:pb-0">

      {/* Provider Topbar */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md pt-4 pb-4 px-2 -mx-2 sm:px-0 sm:mx-0 border-b border-border/40 mb-6">
        <div className="flex items-center justify-between gap-4 relative">

          <div className="relative flex-1 max-w-xl hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

            <input
              type="text"
              placeholder="Search jobs, applicants, or messages..."
              className="w-full bg-muted/30 border border-border/50 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/60 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">

            {/* Primary Post Job CTA */}
            <button
              id="post-job-btn"
              onClick={openPostJob}
              className="hidden sm:flex items-center gap-2 bg-foreground text-background font-bold py-2.5 px-5 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-primary/20 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Post Job
            </button>

            <div className="w-[1px] h-6 bg-border/50 hidden sm:block mx-1" />

            <div className="relative">
              <button
                id="notification-bell-btn"
                onClick={toggleOpen}
                className="relative w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors border border-border/50 shadow-sm"
              >
                <Bell className="w-5 h-5" />

                {hasUnread && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background" />
                )}
              </button>

              <NotificationDropdown />
            </div>

            <div className="flex items-center gap-3 pl-2 sm:pl-4 sm:border-l border-border/40">

              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-bold text-foreground leading-tight">
                  Third Wave Coffee
                </span>

                <span className="text-xs font-semibold text-primary">
                  Provider Account
                </span>
              </div>

              <ProfileDropdown isMobile={true} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-[1600px] mx-auto px-2 sm:px-0">

        {/* Left Column: Active Jobs */}
        <div className="flex-1 flex flex-col gap-6">

          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-2">
              Hiring Workspace
            </h1>

            <p className="text-muted-foreground font-medium">
              Manage your active job postings and track applicant metrics.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <AnimatePresence>
              {MOCK_ACTIVE_JOBS.map((job, index) => (
                <ActiveJobCard
                  key={job.id}
                  job={job}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Applicants & Actions */}
        <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 flex flex-col gap-8">

          <div id="quick-actions-container">
            <ProviderQuickActions />
          </div>

          <div
            id="applicants-queue-container"
            className="flex flex-col gap-4"
          >

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">
                Applicants Queue
              </h2>

              <button className="text-sm font-bold text-primary hover:underline">
                View All
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <AnimatePresence>
                {MOCK_APPLICANTS.map((app, index) => (
                  <ApplicantCard
                    key={app.id}
                    applicant={app}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

      <FirstTimeGuidance />
    </div>
  )
}