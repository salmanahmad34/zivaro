import { create } from 'zustand'

export type AuthMode = 'login' | 'signup'

interface AuthModalState {
  isOpen: boolean
  mode: AuthMode
  openModal: (mode?: AuthMode) => void
  closeModal: () => void
  toggleMode: () => void
}

export const useAuthModal = create<AuthModalState>((set) => ({
  isOpen: false,
  mode: 'signup',
  openModal: (mode = 'signup') => set({ isOpen: true, mode }),
  closeModal: () => set({ isOpen: false }),
  toggleMode: () => set((state) => ({ mode: state.mode === 'login' ? 'signup' : 'login' }))
}))
