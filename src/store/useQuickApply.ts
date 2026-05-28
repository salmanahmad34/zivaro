import { create } from 'zustand'
import { type Job } from '@/components/dashboard/JobCard'
import { useAppliedJobs } from '@/store/useAppliedJobs'

interface QuickApplyState {
  selectedJob: Job | null
  isOpen: boolean
  isSuccess: boolean
  open: (job: Job) => void
  close: () => void
  submitApplication: () => void
  reset: () => void
}

export const useQuickApply = create<QuickApplyState>((set, get) => ({
  selectedJob: null,
  isOpen: false,
  isSuccess: false,
  open: (job) => set({ selectedJob: job, isOpen: true, isSuccess: false }),
  close: () => set({ isOpen: false }),
  submitApplication: () => {
    const job = get().selectedJob
    if (job) {
      useAppliedJobs.getState().addAppliedJob(job.id)
    }
    set({ isSuccess: true })
    // Auto close after success animation
    setTimeout(() => {
      set({ isOpen: false })
      setTimeout(() => set({ isSuccess: false, selectedJob: null }), 300) // cleanup after exit animation
    }, 2500)
  },
  reset: () => set({ isSuccess: false, selectedJob: null, isOpen: false })
}))
