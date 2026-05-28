import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Job } from '@/components/dashboard/JobCard'

export interface RecommendedJob {
  job: Job
  whyRecommended: string
  confidenceScore: number
  badgeText?: string
}

export interface RecommendedCandidate {
  id: string
  name: string
  avatar: string
  skills: string[]
  matchScore: number
  whyRecommended: string
  location: string
  distance: string
  availability: string
  attendanceRate: string
  responseSpeed: string
  isInvited?: boolean
  badgeText?: string
}

interface RecommendationsState {
  // Student Data sets
  recommendedForYouJobs: RecommendedJob[]
  nearCollegeJobs: RecommendedJob[]
  basedOnActivityJobs: RecommendedJob[]
  trendingJobs: RecommendedJob[]
  
  // Provider Data sets
  recommendedCandidates: RecommendedCandidate[]
  reliableNearbyCandidates: RecommendedCandidate[]
  fastResponderCandidates: RecommendedCandidate[]
  matchingAvailabilityCandidates: RecommendedCandidate[]
  
  // Actions
  dismissJob: (id: string, category: 'foryou' | 'college' | 'activity' | 'trending') => void
  dismissCandidate: (id: string, category: 'candidates' | 'nearby' | 'responders' | 'availability') => void
  inviteCandidate: (id: string) => void
}

const MOCK_FOR_YOU: RecommendedJob[] = [
  {
    confidenceScore: 98,
    whyRecommended: 'Perfect match for your Barista skills and previous experience at Blue Tokai.',
    badgeText: '98% Best Fit',
    job: {
      id: 'rec-j1',
      title: 'Weekend Barista shift',
      businessName: 'Third Wave Coffee',
      description: 'Looking for a skilled barista to support weekend rushes. Friendly environment.',
      payout: 900,
      payoutType: 'shift',
      isUrgent: true,
      isPremium: true,
      isVerified: true,
      location: 'Koramangala',
      distance: '1.2 km away',
      timing: 'Sat-Sun, 8 AM - 2 PM',
      postedTime: 'Posted 2 hours ago',
      tags: ['Cafe', 'Barista'],
      logoPlaceholder: '☕',
      isNearby: true
    }
  },
  {
    confidenceScore: 92,
    whyRecommended: 'Aligned with your interest in premium hospitality positions.',
    badgeText: 'Premium Cafe',
    job: {
      id: 'rec-j2',
      title: 'Head Store Assistant',
      businessName: 'Blue Tokai Cafe',
      description: 'Help manage customer queues, brew coffee, and oversee shift transitions.',
      payout: 850,
      payoutType: 'shift',
      isUrgent: false,
      isPremium: false,
      location: 'Indiranagar',
      distance: '3.4 km away',
      timing: 'Weekends, 9 AM - 4 PM',
      postedTime: 'Posted 5 hours ago',
      tags: ['Cafe', 'Customer Service'],
      logoPlaceholder: '☕',
      isNearby: false
    }
  }
]

const MOCK_COLLEGE: RecommendedJob[] = [
  {
    confidenceScore: 95,
    whyRecommended: 'Only 3 minutes walking distance from St. Xavier\'s College.',
    badgeText: '0.4km From College',
    job: {
      id: 'rec-j3',
      title: 'Grocery Deliveries Staff',
      businessName: 'Zepto Hub',
      description: 'Fast-paced deliveries within Koramangala. Perfect for in-between lectures.',
      payout: 450,
      payoutType: 'shift',
      isUrgent: true,
      isPremium: false,
      isVerified: true,
      location: 'Koramangala Hub',
      distance: '0.4 km away',
      timing: 'Flexible Hours',
      postedTime: 'Posted 1 hour ago',
      tags: ['Delivery', 'Flexible'],
      logoPlaceholder: '🛵',
      isNearby: true
    }
  },
  {
    confidenceScore: 88,
    whyRecommended: 'Highly popular shift among students of Christ University.',
    badgeText: 'Student Hub',
    job: {
      id: 'rec-j4',
      title: 'Registration Assistant',
      businessName: 'Bhartiya City Events',
      description: 'Assist with ticketing and registrations at the VIP gate. Fun atmosphere.',
      payout: 1200,
      payoutType: 'task',
      isUrgent: false,
      isPremium: true,
      location: 'Bhartiya City',
      distance: '2.5 km away',
      timing: 'Nov 25th, 4 PM',
      postedTime: 'Posted 1 day ago',
      tags: ['Events', 'Temporary'],
      logoPlaceholder: '🎟️',
      isNearby: true
    }
  }
]

const MOCK_ACTIVITY: RecommendedJob[] = [
  {
    confidenceScore: 90,
    whyRecommended: 'Similar to the Event assistant job you completed last week.',
    badgeText: 'Activity Match',
    job: {
      id: 'rec-j5',
      title: 'Tech Summit Event Assistant',
      businessName: 'Vikas Tech Center',
      description: 'Help manage check-in desks, direct visitors, and provide technical guidance.',
      payout: 1500,
      payoutType: 'task', // represented as task credit
      isUrgent: false,
      isPremium: true,
      isVerified: true,
      location: 'Whitefield',
      distance: '5 km away',
      timing: 'May 28th, 9 AM',
      postedTime: 'Posted 2 days ago',
      tags: ['Events', 'Professional'],
      logoPlaceholder: '💼',
      isNearby: false
    }
  }
]

const MOCK_TRENDING: RecommendedJob[] = [
  {
    confidenceScore: 86,
    whyRecommended: 'High applicant conversion rate and premium shift bonuses this weekend.',
    badgeText: 'Trending Choice 🔥',
    job: {
      id: 'rec-j6',
      title: 'Retail Store Assistant',
      businessName: 'Reliance Smart',
      description: 'Assist with stock management, organize retail aisles, and resolve customer queries.',
      payout: 350,
      payoutType: 'hr',
      isUrgent: true,
      isPremium: false,
      location: 'Andheri East',
      distance: '2.0 km away',
      timing: 'Mon-Fri, 5 PM - 9 PM',
      postedTime: 'Posted 1 day ago',
      tags: ['Retail', 'Evening Shift'],
      logoPlaceholder: '🛒',
      isNearby: true
    }
  }
]

// --- Candidate Recommendation Sets ---
const MOCK_CANDIDATES: RecommendedCandidate[] = [
  {
    id: 'rec-c1',
    name: 'Rahul Sharma',
    avatar: '👨🏽‍🎓',
    skills: ['Coffee Brewing', 'Customer Service', 'Inventory Control'],
    matchScore: 98,
    whyRecommended: 'Perfect 98% skill alignment with your Weekend Barista needs. Previous experience at Blue Tokai.',
    location: 'Koramangala',
    distance: '1.2 km away',
    availability: 'Weekends, Morning',
    attendanceRate: '100% attendance',
    responseSpeed: 'Replies in 3m',
    badgeText: '98% Perfect Match'
  },
  {
    id: 'rec-c2',
    name: 'Priya Patel',
    avatar: '👩🏽‍🎓',
    skills: ['POS Management', 'Cashier', 'Fluent English'],
    matchScore: 94,
    whyRecommended: 'Highly rated for front-desk cafe hospitality. Highly reliable with five-star reviews.',
    location: 'HSR Layout',
    distance: '3.1 km away',
    availability: 'Flexible Shifts',
    attendanceRate: '98% attendance',
    responseSpeed: 'Replies in 5m',
    badgeText: 'Top Rated Star ⭐'
  }
]

const MOCK_NEARBY_CANDIDATES: RecommendedCandidate[] = [
  {
    id: 'rec-c3',
    name: 'Amit Kumar',
    avatar: '👨🏽‍💻',
    skills: ['POS Operation', 'Cafe Management', 'Team Lead'],
    matchScore: 91,
    whyRecommended: 'Located only 0.8 km away. Has completed 10 successful shifts in Bandra West.',
    location: 'Bandra West Outlet',
    distance: '0.8 km away',
    availability: 'Full Time, Flex',
    attendanceRate: '100% attendance',
    responseSpeed: 'Replies in 1m',
    badgeText: '0.8km Away Nearby'
  }
]

const MOCK_FAST_RESPONDERS: RecommendedCandidate[] = [
  {
    id: 'rec-c4',
    name: 'Dev Patel',
    avatar: '👨🏽‍🎓',
    skills: ['Grocery Sorting', 'Rapid Logistics', 'Bike Owner'],
    matchScore: 89,
    whyRecommended: 'Average chat response time of 2 minutes. Superb option for filling emergency vacancies.',
    location: 'Indiranagar',
    distance: '4.0 km away',
    availability: 'Evenings, Weekends',
    attendanceRate: '96% attendance',
    responseSpeed: 'Replies in 2m',
    badgeText: 'Replies Instantly ⚡'
  }
]

const MOCK_AVAILABILITY_CANDIDATES: RecommendedCandidate[] = [
  {
    id: 'rec-c5',
    name: 'Sneha Reddy',
    avatar: '👩🏽‍🎓',
    skills: ['Ticket Registrations', 'Customer Service', 'Excel'],
    matchScore: 87,
    whyRecommended: 'Saturday morning availability matches your active event post precisely.',
    location: 'Bhartiya City',
    distance: '2.5 km away',
    availability: 'Saturdays, 8 AM - 4 PM',
    attendanceRate: '95% attendance',
    responseSpeed: 'Replies in 8m',
    badgeText: 'Perfect Schedule Fit'
  }
]

export const useRecommendations = create<RecommendationsState>()(
  persist(
    (set) => ({
      recommendedForYouJobs: MOCK_FOR_YOU,
      nearCollegeJobs: MOCK_COLLEGE,
      basedOnActivityJobs: MOCK_ACTIVITY,
      trendingJobs: MOCK_TRENDING,
      
      recommendedCandidates: MOCK_CANDIDATES,
      reliableNearbyCandidates: MOCK_NEARBY_CANDIDATES,
      fastResponderCandidates: MOCK_FAST_RESPONDERS,
      matchingAvailabilityCandidates: MOCK_AVAILABILITY_CANDIDATES,

      dismissJob: (id, category) => set((state) => {
        if (category === 'foryou') {
          return { recommendedForYouJobs: state.recommendedForYouJobs.filter(r => r.job.id !== id) }
        }
        if (category === 'college') {
          return { nearCollegeJobs: state.nearCollegeJobs.filter(r => r.job.id !== id) }
        }
        if (category === 'activity') {
          return { basedOnActivityJobs: state.basedOnActivityJobs.filter(r => r.job.id !== id) }
        }
        return { trendingJobs: state.trendingJobs.filter(r => r.job.id !== id) }
      }),

      dismissCandidate: (id, category) => set((state) => {
        if (category === 'candidates') {
          return { recommendedCandidates: state.recommendedCandidates.filter(r => r.id !== id) }
        }
        if (category === 'nearby') {
          return { reliableNearbyCandidates: state.reliableNearbyCandidates.filter(r => r.id !== id) }
        }
        if (category === 'responders') {
          return { fastResponderCandidates: state.fastResponderCandidates.filter(r => r.id !== id) }
        }
        return { matchingAvailabilityCandidates: state.matchingAvailabilityCandidates.filter(r => r.id !== id) }
      }),

      inviteCandidate: (id) => set((state) => {
        const update = (list: RecommendedCandidate[]) => list.map(c => c.id === id ? { ...c, isInvited: true } : c)
        return {
          recommendedCandidates: update(state.recommendedCandidates),
          reliableNearbyCandidates: update(state.reliableNearbyCandidates),
          fastResponderCandidates: update(state.fastResponderCandidates),
          matchingAvailabilityCandidates: update(state.matchingAvailabilityCandidates)
        }
      })
    }),
    {
      name: 'zivaro-recommendations-storage'
    }
  )
)
