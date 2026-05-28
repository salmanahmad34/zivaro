import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { fetchUserReviews, submitReview, calculateAverageRating } from '@/services/supabase/db'
import type { Review, ReviewInsert } from '@/types/database'

interface ReviewsState {
  reviews: Review[]
  averageRating: number | null
  isLoading: boolean
  error: string | null

  // Actions
  fetchUserReviews: (userId: string) => Promise<void>
  submitReview: (review: ReviewInsert) => Promise<Review | null>
  fetchAverageRating: (userId: string) => Promise<void>
  clearError: () => void
}

export const useReviewsStore = create<ReviewsState>()(
  devtools(
    (set) => ({
      reviews: [],
      averageRating: null,
      isLoading: false,
      error: null,

      fetchUserReviews: async (userId: string) => {
        set({ isLoading: true, error: null })
        try {
          const reviews = await fetchUserReviews(userId)
          set({ reviews })
        } catch (err: any) {
          set({ error: err.message || 'Failed to fetch reviews' })
        } finally {
          set({ isLoading: false })
        }
      },

      submitReview: async (review: ReviewInsert) => {
        set({ isLoading: true, error: null })
        try {
          const result = await submitReview(review)
          if (result) {
            set((state) => ({
              reviews: [result, ...state.reviews]
            }))
          }
          return result
        } catch (err: any) {
          set({ error: err.message || 'Failed to submit review' })
          return null
        } finally {
          set({ isLoading: false })
        }
      },

      fetchAverageRating: async (userId: string) => {
        try {
          const averageRating = await calculateAverageRating(userId)
          set({ averageRating })
        } catch (err: any) {
          console.error('Failed to fetch average rating:', err)
        }
      },

      clearError: () => set({ error: null })
    }),
    { name: 'ReviewsStore' }
  )
)
