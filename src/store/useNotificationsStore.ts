// @ts-nocheck
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {
  fetchNotifications,
  createNotification,
  markNotificationAsRead,
  deleteNotification
} from '@/services/supabase/db'
import type { Notification, NotificationInsert, NotificationUpdate } from '@/types/database'

interface NotificationsState {
  notifications: Notification[]
  isLoading: boolean
  error: string | null

  // Actions
  fetchNotifications: (userId: string) => Promise<void>
  createNotification: (notification: NotificationInsert) => Promise<Notification | null>
  markAsRead: (notificationId: string) => Promise<Notification | null>
  deleteNotification: (notificationId: string) => Promise<boolean>
  clearError: () => void
}

export const useNotificationsStore = create<NotificationsState>()(
  devtools(
    (set) => ({
      notifications: [],
      isLoading: false,
      error: null,

      fetchNotifications: async (userId: string) => {
        set({ isLoading: true, error: null })
        try {
          const notifications = await fetchNotifications(userId)
          set({ notifications })
        } catch (err: any) {
          set({ error: err.message || 'Failed to fetch notifications' })
        } finally {
          set({ isLoading: false })
        }
      },

      createNotification: async (notification: NotificationInsert) => {
        set({ isLoading: true, error: null })
        try {
          const result = await createNotification(notification)
          if (result) {
            set((state) => ({
              notifications: [result, ...state.notifications]
            }))
          }
          return result
        } catch (err: any) {
          set({ error: err.message || 'Failed to create notification' })
          return null
        } finally {
          set({ isLoading: false })
        }
      },

      markAsRead: async (notificationId: string) => {
        try {
          const result = await markNotificationAsRead(notificationId)
          if (result) {
            set((state) => ({
              notifications: state.notifications.map((n) => (n.id === notificationId ? result : n))
            }))
          }
          return result
        } catch (err: any) {
          set({ error: err.message || 'Failed to mark notification as read' })
          return null
        }
      },

      deleteNotification: async (notificationId: string) => {
        set({ isLoading: true, error: null })
        try {
          const success = await deleteNotification(notificationId)
          if (success) {
            set((state) => ({
              notifications: state.notifications.filter((n) => n.id !== notificationId)
            }))
          }
          return success
        } catch (err: any) {
          set({ error: err.message || 'Failed to delete notification' })
          return false
        } finally {
          set({ isLoading: false })
        }
      },

      clearError: () => set({ error: null })
    }),
    { name: 'NotificationsStore' }
  )
)
