import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  signInUser,
  signUpUser,
  signOutUser,
  recoverSession,
  buildUserSession,
  getProfile,
  updateProfile,
  isSupabaseConfigured as checkSupabaseConfig
} from '@/services/supabase/auth'
import type { UserSession, Profile } from '@/types/database'
import { logger } from '@/lib/logger'

// ============================================
// AUTH STATE INTERFACE
// ============================================

interface AuthState {
  // State
  user: UserSession | null
  isAuthenticated: boolean
  isLoading: boolean
  isRecovering: boolean
  error: string | null

  // Actions
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string, role: 'student' | 'provider') => Promise<void>
  logout: () => Promise<void>
  recoverUserSession: () => Promise<void>
  refreshProfile: () => Promise<void>
  updateUserProfile: (updates: Partial<Profile>) => Promise<void>
  clearError: () => void
  setError: (error: string | null) => void
}

// ============================================
// ZUSTAND STORE
// ============================================

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isRecovering: false,
      error: null,

      // ============================================
      // LOGIN ACTION
      // ============================================
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          if (!checkSupabaseConfig()) {
            throw new Error('Supabase is not configured. Please check your environment variables.')
          }

          // Sign in with Supabase
          const data = await signInUser(email, password)

          if (data.user) {
            // Build complete user session with profile data
            const userSession = await buildUserSession(data.user.id, data.user.email || '')

            if (!userSession) {
              throw new Error('Failed to load user profile')
            }

            set({
              isAuthenticated: true,
              user: userSession,
              error: null
            })
          }
        } catch (err: any) {
          const errorMessage = err.message || 'Login failed'
          set({
            isAuthenticated: false,
            user: null,
            error: errorMessage
          })
          throw err
        } finally {
          set({ isLoading: false })
        }
      },

      // ============================================
      // SIGNUP ACTION
      // ============================================
      signup: async (email: string, password: string, name: string, role: 'student' | 'provider') => {
        set({ isLoading: true, error: null })
        try {
          if (!checkSupabaseConfig()) {
            throw new Error('Supabase is not configured. Please check your environment variables.')
          }

          // Sign up with Supabase
          // This triggers the database trigger which creates a profile automatically
          const data = await signUpUser(email, password, name, role)

          if (data.user) {
            // Build user session
            const userSession = await buildUserSession(data.user.id, data.user.email || '')

            if (!userSession) {
              throw new Error('Failed to create user profile')
            }

            set({
              isAuthenticated: true,
              user: userSession,
              error: null
            })
          }
        } catch (err: any) {
          const errorMessage = err.message || 'Signup failed'
          set({
            isAuthenticated: false,
            user: null,
            error: errorMessage
          })
          throw err
        } finally {
          set({ isLoading: false })
        }
      },

      // ============================================
      // LOGOUT ACTION
      // ============================================
      logout: async () => {
        set({ isLoading: true, error: null })
        try {
          if (checkSupabaseConfig()) {
            await signOutUser()
          }

          set({
            isAuthenticated: false,
            user: null,
            error: null
          })
        } catch (err: any) {
          const errorMessage = err.message || 'Logout failed'
          set({ error: errorMessage })
          throw err
        } finally {
          set({ isLoading: false })
        }
      },

      // ============================================
      // SESSION RECOVERY ACTION
      // ============================================
      recoverUserSession: async () => {
        set({ isRecovering: true, error: null })
        try {
          if (!checkSupabaseConfig()) {
            set({ isAuthenticated: false, isRecovering: false })
            return
          }

          const session = await recoverSession()

          if (session?.user) {
            // Build complete user session
            const userSession = await buildUserSession(session.user.id, session.user.email || '')

            if (userSession) {
              set({
                isAuthenticated: true,
                user: userSession,
                error: null
              })
            } else {
              // Session exists but profile couldn't be loaded
              set({
                isAuthenticated: false,
                user: null,
                error: 'Failed to load user profile'
              })
            }
          } else {
            // No active session
            set({
              isAuthenticated: false,
              user: null
            })
          }
        } catch (err: any) {
          logger.error('Session recovery error:', err)
          set({
            isAuthenticated: false,
            user: null,
            error: null // Don't show recovery errors to user
          })
        } finally {
          set({ isRecovering: false })
        }
      },

      // ============================================
      // REFRESH PROFILE ACTION
      // ============================================
      refreshProfile: async () => {
        const state = get()
        if (!state.user) return

        try {
          if (!checkSupabaseConfig()) return

          const profile = await getProfile(state.user.id)
          if (profile) {
            set({
              user: {
                ...state.user,
                name: profile.name || state.user.name,
                role: profile.role,
                onboarding_completed: profile.onboarding_completed,
                metadata: profile.metadata
              }
            })
          }
        } catch (err) {
          logger.error('Error refreshing profile:', err)
        }
      },

      // ============================================
      // UPDATE PROFILE ACTION
      // ============================================
      updateUserProfile: async (updates: Partial<Profile>) => {
        const state = get()
        if (!state.user) {
          throw new Error('No user session')
        }

        set({ isLoading: true, error: null })
        try {
          if (!checkSupabaseConfig()) {
            throw new Error('Supabase is not configured')
          }

          const updated = await updateProfile(state.user.id, updates)

          if (updated) {
            set({
              user: {
                ...state.user,
                name: updated.name || state.user.name,
                role: updated.role,
                onboarding_completed: updated.onboarding_completed,
                metadata: updated.metadata
              }
            })
          }
        } catch (err: any) {
          const errorMessage = err.message || 'Failed to update profile'
          set({ error: errorMessage })
          throw err
        } finally {
          set({ isLoading: false })
        }
      },

      // ============================================
      // ERROR MANAGEMENT ACTIONS
      // ============================================
      clearError: () => set({ error: null }),
      setError: (error: string | null) => set({ error })
    }),

    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)
