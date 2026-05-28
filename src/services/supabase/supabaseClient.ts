// @ts-nocheck
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

/**
 * Supabase Client Instance
 * Initialized with environment variables from .env
 * Throws error if credentials are missing (caught at app level)
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

/**
 * Helper to check if Supabase is properly configured
 */
export const isSupabaseConfigured = (): boolean => {
  return !!(supabaseUrl && supabaseAnonKey)
}

/**
 * Helper to get current auth session
 * @returns Current session or null if not authenticated
 */
export const getCurrentSession = async () => {
  try {
    if (!isSupabaseConfigured()) return null
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data.session
  } catch (error) {
    console.error('Error getting current session:', error)
    return null
  }
}

/**
 * Helper to get current authenticated user
 * @returns Current user or null if not authenticated
 */
export const getCurrentUser = async () => {
  try {
    if (!isSupabaseConfigured()) return null
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error
    return data.user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Set up auth state listener
 * Useful for monitoring auth changes across the app
 */
export const onAuthStateChange = (callback: (authenticated: boolean, user?: any) => void) => {
  if (!isSupabaseConfigured()) return () => {}

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    const isAuthenticated = !!session?.user
    callback(isAuthenticated, session?.user)
  })

  return () => subscription?.unsubscribe()
}
