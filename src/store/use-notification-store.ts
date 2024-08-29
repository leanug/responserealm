import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

import { Notification } from '@/components/notification/types'

// Define the NotificationStore interface
interface NotificationStore {
  notifications: Notification[];
  addNotification: (message: string, type?: Notification['type']) => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [], // Initialize notifications array
  addNotification: (message, type = 'info') =>
    set((state) => ({
      notifications: [...state.notifications, { id: uuidv4(), message, type }],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id,
      ),
    })),
}))
