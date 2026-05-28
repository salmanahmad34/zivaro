import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ─── Types ────────────────────────────────────────────────
export type ReviewerRole = 'student' | 'provider'

export type ProviderTag =
  | 'Paid On Time'
  | 'Friendly Environment'
  | 'Flexible Timing'
  | 'Respectful Communication'
  | 'Great Learning Opportunity'
  | 'Would Work Again'

export type StudentTag =
  | 'Reliable'
  | 'On Time'
  | 'Professional'
  | 'Helpful'
  | 'Quick Learner'
  | 'Team Player'

export type ReviewTag = ProviderTag | StudentTag

export interface Review {
  id: string
  /** Who wrote this review */
  reviewerRole: ReviewerRole
  reviewerName: string
  reviewerAvatar: string
  /** Subject being reviewed (provider business name or student name) */
  subjectId: string
  subjectName: string
  /** 1–5 star rating */
  rating: number
  /** Quick-select tags */
  tags: ReviewTag[]
  /** Optional short note */
  note?: string
  /** Job this review is linked to */
  jobTitle: string
  createdAt: number
}

export interface ReviewsState {
  reviews: Review[]
  /** Add a new review */
  submitReview: (review: Omit<Review, 'id' | 'createdAt'>) => void
  /** Get all reviews for a given subject */
  getReviewsFor: (subjectId: string) => Review[]
  /** Average star rating for a subject */
  getAverageRating: (subjectId: string) => number
  /** All unique tags mentioned for a subject, sorted by frequency */
  getTopTags: (subjectId: string, limit?: number) => ReviewTag[]
}

// ─── Provider tags available to students reviewing providers ───
export const PROVIDER_REVIEW_TAGS: ProviderTag[] = [
  'Paid On Time',
  'Friendly Environment',
  'Flexible Timing',
  'Respectful Communication',
  'Great Learning Opportunity',
  'Would Work Again',
]

// ─── Student tags available to providers reviewing students ────
export const STUDENT_REVIEW_TAGS: StudentTag[] = [
  'Reliable',
  'On Time',
  'Professional',
  'Helpful',
  'Quick Learner',
  'Team Player',
]

// ─── Mock seed reviews so the UI shows real data immediately ──
const SEED_REVIEWS: Review[] = [
  {
    id: 'rev-001',
    reviewerRole: 'student',
    reviewerName: 'Priya S.',
    reviewerAvatar: 'P',
    subjectId: 'mock-provider',
    subjectName: 'Third Wave Coffee',
    rating: 5,
    tags: ['Paid On Time', 'Friendly Environment', 'Would Work Again'],
    note: 'Super smooth experience. The manager was kind and payout was instant.',
    jobTitle: 'Weekend Barista',
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
  },
  {
    id: 'rev-002',
    reviewerRole: 'student',
    reviewerName: 'Aryan M.',
    reviewerAvatar: 'A',
    subjectId: 'mock-provider',
    subjectName: 'Third Wave Coffee',
    rating: 4,
    tags: ['Paid On Time', 'Flexible Timing'],
    note: 'Great first gig, they were flexible with timings.',
    jobTitle: 'Weekend Barista',
    createdAt: Date.now() - 1000 * 60 * 60 * 72,
  },
  {
    id: 'rev-003',
    reviewerRole: 'provider',
    reviewerName: 'Third Wave Coffee',
    reviewerAvatar: '☕',
    subjectId: 'mock-student',
    subjectName: 'HustiQ Student',
    rating: 5,
    tags: ['Reliable', 'On Time', 'Professional'],
    note: 'One of the best students we have worked with!',
    jobTitle: 'Weekend Barista',
    createdAt: Date.now() - 1000 * 60 * 60 * 50,
  },
]

// ─── Store ────────────────────────────────────────────────
export const useReviews = create<ReviewsState>()(
  persist(
    (set, get) => ({
      reviews: SEED_REVIEWS,

      submitReview: (reviewData) => {
        const newReview: Review = {
          ...reviewData,
          id: `rev-${Date.now()}`,
          createdAt: Date.now(),
        }
        set((state) => ({ reviews: [...state.reviews, newReview] }))
      },

      getReviewsFor: (subjectId) =>
        get().reviews.filter((r) => r.subjectId === subjectId),

      getAverageRating: (subjectId) => {
        const relevant = get().reviews.filter((r) => r.subjectId === subjectId)
        if (relevant.length === 0) return 0
        return (
          Math.round(
            (relevant.reduce((sum, r) => sum + r.rating, 0) / relevant.length) * 10
          ) / 10
        )
      },

      getTopTags: (subjectId, limit = 3) => {
        const relevant = get().reviews.filter((r) => r.subjectId === subjectId)
        const freq: Record<string, number> = {}
        relevant.forEach((r) => r.tags.forEach((t) => (freq[t] = (freq[t] || 0) + 1)))
        return Object.entries(freq)
          .sort((a, b) => b[1] - a[1])
          .slice(0, limit)
          .map(([tag]) => tag as ReviewTag)
      },
    }),
    { name: 'zivaro-reviews' }
  )
)
