import { create } from 'zustand'

export interface JobDraftData {
  title: string
  category: string
  payout: string
  payoutType: 'hr' | 'shift' | 'task' | 'month'
  duration: string
  shiftTiming: string
  location: string
  skills: string
  notes: string
  isUrgent: boolean
}

const initialDraft: JobDraftData = {
  title: '',
  category: 'Cafe',
  payout: '',
  payoutType: 'shift',
  duration: 'Weekend',
  shiftTiming: '',
  location: '',
  skills: '',
  notes: '',
  isUrgent: false
}

interface PostJobState {
  isOpen: boolean
  currentStep: number
  draftData: JobDraftData
  isSuccess: boolean
  
  open: () => void
  close: () => void
  nextStep: () => void
  prevStep: () => void
  setStep: (step: number) => void
  updateDraft: (data: Partial<JobDraftData>) => void
  setSuccess: (val: boolean) => void
  reset: () => void
}

export const usePostJob = create<PostJobState>((set) => ({
  isOpen: false,
  currentStep: 1,
  draftData: initialDraft,
  isSuccess: false,
  
  open: () => set({ isOpen: true, currentStep: 1, isSuccess: false, draftData: initialDraft }),
  close: () => set({ isOpen: false }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 4) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  setStep: (step) => set({ currentStep: step }),
  updateDraft: (data) => set((state) => ({ draftData: { ...state.draftData, ...data } })),
  setSuccess: (val) => set({ isSuccess: val }),
  reset: () => set({ currentStep: 1, draftData: initialDraft, isSuccess: false })
}))
