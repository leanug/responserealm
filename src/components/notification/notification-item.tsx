// src/components/notification/notification-item.tsx
'use client'

import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useEffect } from 'react'

export const Notification: React.FC<any> = ({ id, message, type, removeNotification }) => {
  let alertModifier

  if (type === 'error') {
    alertModifier = 'alert-error'
  } else if (type === 'info') {
    alertModifier = 'alert-info'
  } else if (type === 'success') {
    alertModifier = 'alert-success'
  } else if (type === 'warning') {
    alertModifier = 'alert-warning'
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      // Automatically close the notification after a few seconds
      removeNotification(id)
    }, 5000) // Adjust the duration as needed

    return () => clearTimeout(timer)
  }, [id, removeNotification])

  const handleClose = () => {
    // Close the notification when the close button is clicked
    removeNotification(id)
  }

  return (
    <div role="alert" className="alert bg-base-100 shadow-lg">
      <InformationCircleIcon className="w-6 h-6 stroke-info" />
      <div>
        <span>{message}</span>
      </div>
      <button className="btn btn-sm" onClick={handleClose}>
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  )
}
