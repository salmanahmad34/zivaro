import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { fetchSavedJobs, saveJob, unsaveJob, isJobSaved } from '@/services/supabase/db'
import type { SavedJob, SavedJobInsert } from '@/types/database'

interface SavedJobsState {
  savedJobs: SavedJob[]
  isLoading: boolean
  error: string | null

  // Actions
  fetchSavedJobs: (studentId: string) => Promise<void>
  saveJob: (saved: SavedJobInsert) => Promise<SavedJob | null>
  unsaveJob: (jobId: string, studentId: string) => Promise<boolean>
  isJobSaved: (jobId: string, studentId: string) => Promise<boolean>
  clearError: () => void
}

export const useSavedJobs = create<SavedJobsState>()(
  devtools(
    (set) => ({
      savedJobs: [],
      isLoading: false,
      error: null,

      fetchSavedJobs: async (studentId: string) => {
        set({ isLoading: true, error: null })
        try {
          const savedJobs = await fetchSavedJobs(studentId)
          set({ savedJobs })
        } catch (err: any) {
          set({ error: err.message || 'Failed to fetch saved jobs' })
        } finally {
          set({ isLoading: false })
        }
      },

      saveJob: async (saved: SavedJobInsert) => {
        set({ isLoading: true, error: null })
        try {
          const result = await saveJob(saved)
          if (result) {
            set((state) => ({
              savedJobs: [result, ...state.savedJobs]
            }))
          }
          return result
        } catch (err: any) {
          set({ error: err.message || 'Failed to save job' })
          return null
        } finally {
          set({ isLoading: false })
        }
      },

      unsaveJob: async (jobId: string, studentId: string) => {
        set({ isLoading: true, error: null })
        try {
          const success = await unsaveJob(jobId, studentId)
          if (success) {
            set((state) => ({
              savedJobs: state.savedJobs.filter((sj) => !(sj.job_id === jobId && sj.student_id === studentId))
            }))
          }
          return success
        } catch (err: any) {
          set({ error: err.message || 'Failed to unsave job' })
          return false
        } finally {
          set({ isLoading: false })
        }
      },

      isJobSaved: async (jobId: string, studentId: string) => {
        try {
          return await isJobSaved(jobId, studentId)
        } catch (err: any) {
          console.error('Failed to check if job is saved:', err)
          return false
        }
      },

      clearError: () => set({ error: null })
    }),
    { name: 'SavedJobsStore' }
  )
)
