// src/components/notification/notification-list.tsx
import React from 'react'

import { useNotificationStore } from '@/store/use-notification-store'
import { Notification } from './notification-item'

export const NotificationList = () => {
  const { notifications, removeNotification } = useNotificationStore()
  
  return (
    <ul className="flex flex-col gap-2.5">
      {
        notifications?.map((notification) => (
          <li key={notification.id} >
            <Notification 
              id={notification.id} 
              message={notification.message} 
              type={ notification.type }
              removeNotification={ removeNotification }
            />
          </li>
          
        ))
      }
    </ul>
  )
}