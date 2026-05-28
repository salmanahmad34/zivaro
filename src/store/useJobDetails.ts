import { create } from 'zustand'
import { type Job } from '@/components/dashboard/JobCard'

interface JobDetailsState {
  selectedJob: Job | null
  open: (job: Job) => void
  close: () => void
}

export const useJobDetails = create<JobDetailsState>((set) => ({
  selectedJob: null,
  open: (job) => set({ selectedJob: job }),
  close: () => set({ selectedJob: null })
}))
