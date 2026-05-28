import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {
  fetchConversation,
  fetchConversations,
  sendMessage,
  markMessageAsRead
} from '@/services/supabase/db'
import type { Message, MessageInsert } from '@/types/database'

interface MessagesState {
  messages: Message[]
  conversations: Message[]
  isLoading: boolean
  error: string | null

  // Actions
  fetchConversation: (userId: string, recipientId: string) => Promise<void>
  fetchConversations: (userId: string) => Promise<void>
  sendMessage: (message: MessageInsert) => Promise<Message | null>
  markMessageAsRead: (messageId: string) => Promise<Message | null>
  clearError: () => void
}

export const useMessages = create<MessagesState>()(
  devtools(
    (set) => ({
      messages: [],
      conversations: [],
      isLoading: false,
      error: null,

      fetchConversation: async (userId: string, recipientId: string) => {
        set({ isLoading: true, error: null })
        try {
          const messages = await fetchConversation(userId, recipientId)
          set({ messages })
        } catch (err: any) {
          set({ error: err.message || 'Failed to fetch conversation' })
        } finally {
          set({ isLoading: false })
        }
      },

      fetchConversations: async (userId: string) => {
        set({ isLoading: true, error: null })
        try {
          const conversations = await fetchConversations(userId)
          set({ conversations })
        } catch (err: any) {
          set({ error: err.message || 'Failed to fetch conversations' })
        } finally {
          set({ isLoading: false })
        }
      },

      sendMessage: async (message: MessageInsert) => {
        set({ isLoading: true, error: null })
        try {
          const result = await sendMessage(message)
          if (result) {
            set((state) => ({
              messages: [...state.messages, result]
            }))
          }
          return result
        } catch (err: any) {
          set({ error: err.message || 'Failed to send message' })
          return null
        } finally {
          set({ isLoading: false })
        }
      },

      markMessageAsRead: async (messageId: string) => {
        try {
          const result = await markMessageAsRead(messageId)
          if (result) {
            set((state) => ({
              messages: state.messages.map((m) => (m.id === messageId ? result : m))
            }))
          }
          return result
        } catch (err: any) {
          set({ error: err.message || 'Failed to mark message as read' })
          return null
        }
      },

      clearError: () => set({ error: null })
    }),
    { name: 'MessagesStore' }
  )
)
