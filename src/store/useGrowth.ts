import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Achievement {
  id: string
  title: string
  description: string
  category: 'milestone' | 'streak' | 'reliability' | 'star' | 'speed'
  icon: string
  progress: number
  maxProgress: number
  isUnlocked: boolean
  unlockedAt?: string
  xpAwarded: number
}

interface StudentProgression {
  xp: number
  nextLevelXp: number
  level: number
  currentStreak: number
  longestStreak: number
  achievements: Achievement[]
}

interface ProviderProgression {
  xp: number
  nextLevelXp: number
  level: number
  currentStreak: number
  longestStreak: number
  achievements: Achievement[]
}

interface GrowthState {
  studentProgression: StudentProgression
  providerProgression: ProviderProgression
  
  // Student Actions
  addStudentXp: (amount: number) => void
  incrementStudentMilestone: (id: string, amount: number) => void
  checkInStudentDaily: () => void
  
  // Provider Actions
  addProviderXp: (amount: number) => void
  incrementProviderMilestone: (id: string, amount: number) => void
  checkInProviderDaily: () => void
  
  // General
  resetProgression: () => void
}

const INITIAL_STUDENT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'st-1',
    title: 'First Hustle',
    description: 'Complete your first local gig on HustiQ.',
    category: 'milestone',
    icon: '🚀',
    progress: 1,
    maxProgress: 1,
    isUnlocked: true,
    unlockedAt: 'May 15, 2026',
    xpAwarded: 250
  },
  {
    id: 'st-2',
    title: 'Century Club',
    description: 'Complete 10 shifts on the platform.',
    category: 'milestone',
    icon: '💯',
    progress: 6,
    maxProgress: 10,
    isUnlocked: false,
    xpAwarded: 1000
  },
  {
    id: 'st-3',
    title: 'Elite Earner',
    description: 'Earn a total of ₹10,000 on HustiQ.',
    category: 'milestone',
    icon: '💰',
    progress: 8450,
    maxProgress: 10000,
    isUnlocked: false,
    xpAwarded: 1500
  },
  {
    id: 'st-4',
    title: 'Perfect 5-Star',
    description: 'Receive 5-star ratings on completed shifts.',
    category: 'star',
    icon: '⭐',
    progress: 3,
    maxProgress: 5,
    isUnlocked: false,
    xpAwarded: 500
  },
  {
    id: 'st-5',
    title: 'Streak Master',
    description: 'Maintain a 3-day active check-in streak.',
    category: 'streak',
    icon: '🔥',
    progress: 3,
    maxProgress: 3,
    isUnlocked: true,
    unlockedAt: 'May 20, 2026',
    xpAwarded: 300
  },
  {
    id: 'st-6',
    title: 'Iron Reliability',
    description: 'Fulfill 5 consecutive shifts with 100% attendance.',
    category: 'reliability',
    icon: '🛡️',
    progress: 4,
    maxProgress: 5,
    isUnlocked: false,
    xpAwarded: 800
  }
]

const INITIAL_PROVIDER_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'pr-1',
    title: 'First Match',
    description: 'Successfully hire your first student candidate.',
    category: 'milestone',
    icon: '🤝',
    progress: 1,
    maxProgress: 1,
    isUnlocked: true,
    unlockedAt: 'May 12, 2026',
    xpAwarded: 250
  },
  {
    id: 'pr-2',
    title: 'Talent Engine',
    description: 'Successfully hire 10 students.',
    category: 'milestone',
    icon: '⚡',
    progress: 4,
    maxProgress: 10,
    isUnlocked: false,
    xpAwarded: 1000
  },
  {
    id: 'pr-3',
    title: 'Lightning Dispatcher',
    description: 'Maintain an average candidate response time of under 2 hours.',
    category: 'speed',
    icon: '⚡',
    progress: 1,
    maxProgress: 1,
    isUnlocked: true,
    unlockedAt: 'May 22, 2026',
    xpAwarded: 500
  },
  {
    id: 'pr-4',
    title: 'Gig Patron',
    description: 'Disburse a total of ₹20,000 in student payouts.',
    category: 'milestone',
    icon: '💎',
    progress: 12800,
    maxProgress: 20000,
    isUnlocked: false,
    xpAwarded: 1200
  },
  {
    id: 'pr-5',
    title: 'Fulfillment King',
    description: 'Completely fulfill 5 posted jobs without student-side disputes.',
    category: 'reliability',
    icon: '👑',
    progress: 3,
    maxProgress: 5,
    isUnlocked: false,
    xpAwarded: 1000
  }
]

const INITIAL_STUDENT_PROGRESSION: StudentProgression = {
  xp: 1450,
  nextLevelXp: 2500,
  level: 2,
  currentStreak: 3,
  longestStreak: 7,
  achievements: INITIAL_STUDENT_ACHIEVEMENTS
}

const INITIAL_PROVIDER_PROGRESSION: ProviderProgression = {
  xp: 1750,
  nextLevelXp: 3000,
  level: 2,
  currentStreak: 2,
  longestStreak: 5,
  achievements: INITIAL_PROVIDER_ACHIEVEMENTS
}

export const useGrowth = create<GrowthState>()(
  persist(
    (set, get) => ({
      studentProgression: INITIAL_STUDENT_PROGRESSION,
      providerProgression: INITIAL_PROVIDER_PROGRESSION,

      addStudentXp: (amount) => {
        const prog = get().studentProgression
        let newXp = prog.xp + amount
        let newLevel = prog.level
        let newNextXp = prog.nextLevelXp

        while (newXp >= newNextXp) {
          newXp -= newNextXp
          newLevel += 1
          newNextXp = Math.floor(newNextXp * 1.5) // level scaling
        }

        set({
          studentProgression: {
            ...prog,
            xp: newXp,
            level: newLevel,
            nextLevelXp: newNextXp
          }
        })
      },

      incrementStudentMilestone: (id, amount) => {
        const prog = get().studentProgression
        let xpGained = 0

        const updatedAchievements = prog.achievements.map((achievement) => {
          if (achievement.id !== id || achievement.isUnlocked) return achievement

          const newProgress = Math.min(achievement.progress + amount, achievement.maxProgress)
          const isNowUnlocked = newProgress === achievement.maxProgress

          if (isNowUnlocked) {
            xpGained += achievement.xpAwarded
          }

          return {
            ...achievement,
            progress: newProgress,
            isUnlocked: isNowUnlocked,
            unlockedAt: isNowUnlocked ? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : undefined
          }
        })

        set({
          studentProgression: {
            ...prog,
            achievements: updatedAchievements
          }
        })

        if (xpGained > 0) {
          get().addStudentXp(xpGained)
        }
      },

      checkInStudentDaily: () => {
        const prog = get().studentProgression
        const newStreak = prog.currentStreak + 1
        const newLongest = Math.max(newStreak, prog.longestStreak)

        set({
          studentProgression: {
            ...prog,
            currentStreak: newStreak,
            longestStreak: newLongest
          }
        })

        // Check if consistency milestone is complete
        get().incrementStudentMilestone('st-5', 1)
        // Award streak check-in XP
        get().addStudentXp(100)
      },

      addProviderXp: (amount) => {
        const prog = get().providerProgression
        let newXp = prog.xp + amount
        let newLevel = prog.level
        let newNextXp = prog.nextLevelXp

        while (newXp >= newNextXp) {
          newXp -= newNextXp
          newLevel += 1
          newNextXp = Math.floor(newNextXp * 1.5)
        }

        set({
          providerProgression: {
            ...prog,
            xp: newXp,
            level: newLevel,
            nextLevelXp: newNextXp
          }
        })
      },

      incrementProviderMilestone: (id, amount) => {
        const prog = get().providerProgression
        let xpGained = 0

        const updatedAchievements = prog.achievements.map((achievement) => {
          if (achievement.id !== id || achievement.isUnlocked) return achievement

          const newProgress = Math.min(achievement.progress + amount, achievement.maxProgress)
          const isNowUnlocked = newProgress === achievement.maxProgress

          if (isNowUnlocked) {
            xpGained += achievement.xpAwarded
          }

          return {
            ...achievement,
            progress: newProgress,
            isUnlocked: isNowUnlocked,
            unlockedAt: isNowUnlocked ? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : undefined
          }
        })

        set({
          providerProgression: {
            ...prog,
            achievements: updatedAchievements
          }
        })

        if (xpGained > 0) {
          get().addProviderXp(xpGained)
        }
      },

      checkInProviderDaily: () => {
        const prog = get().providerProgression
        const newStreak = prog.currentStreak + 1
        const newLongest = Math.max(newStreak, prog.longestStreak)

        set({
          providerProgression: {
            ...prog,
            currentStreak: newStreak,
            longestStreak: newLongest
          }
        })

        get().addProviderXp(150) // Higher daily XP for provider check-ins
      },

      resetProgression: () => {
        set({
          studentProgression: INITIAL_STUDENT_PROGRESSION,
          providerProgression: INITIAL_PROVIDER_PROGRESSION
        })
      }
    }),
    {
      name: 'zivaro-growth-storage'
    }
  )
)
