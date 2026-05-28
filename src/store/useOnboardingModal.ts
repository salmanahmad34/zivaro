import { create } from 'zustand'

export type Role = 'student' | 'provider' | null

interface OnboardingModalState {
  isOpen: boolean
  selectedRole: Role
  openModal: () => void
  closeModal: () => void
  setRole: (role: Role) => void
}

export const useOnboardingModal = create<OnboardingModalState>((set) => ({
  isOpen: false,
  selectedRole: null,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  setRole: (role) => set({ selectedRole: role })
}))
