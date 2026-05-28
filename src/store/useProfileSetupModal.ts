import { create } from 'zustand'

export interface ProfileSetupData {
  fullName: string
  city: string
  bio: string
  skills: string
  availability: string
  businessName: string
  category: string
  hiringNeeds: string
}

interface ProfileSetupModalState {
  isOpen: boolean
  step: number
  formData: Partial<ProfileSetupData>
  openModal: () => void
  closeModal: () => void
  nextStep: () => void
  prevStep: () => void
  updateData: (data: Partial<ProfileSetupData>) => void
  reset: () => void
}

export const useProfileSetupModal = create<ProfileSetupModalState>((set) => ({
  isOpen: false,
  step: 1,
  formData: {},
  openModal: () => set({ isOpen: true, step: 1 }),
  closeModal: () => set({ isOpen: false }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
  updateData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  reset: () => set({ step: 1, formData: {} })
}))
