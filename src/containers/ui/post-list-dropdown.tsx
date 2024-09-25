// src/containers/posts/post-list-dropdown.tsx
import React, { useState, useEffect } from 'react'

import { ENV } from '@/utils/constants'
import { useNotificationStore } from '@/store/use-notification-store'
import { 
  CheckBadgeIcon, 
  StarIcon, 
  XCircleIcon 
  } from '@heroicons/react/24/outline'
import { usePostActions } from '@/hooks/use-post-actions'

type PostListDropdownProps = {
  postId: string
  status: string | null
  boardId: string
}

const PostListDropdown: React.FC<PostListDropdownProps> = ({
  postId, status, boardId
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(status || 'New')

  const {addNotification} = useNotificationStore()
  const {changePostStatus} = usePostActions()

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = async (value: string) => {
    setSelectedValue(value) // Set state status
    setIsOpen(false) // Close dropdown

    // Change post status database
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${ENV.ENDPOINTS.POST.UPDATE_STATUS(postId, value)}`
    const response = await fetch(url, {
      method: 'PATCH'
    })

    if (!response.ok) {
      addNotification('An error occured. Try again later.')
    } else {
      changePostStatus(boardId, postId, value) // Change status in store
    }
  }

  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  // Function to get the appropriate icon based on selected value
  const getIconForValue = (value: string | null) => {
    switch (value) {
      case 'New':
        return <StarIcon className="h-5 w-5" />;
      case 'Fulfilled':
        return <CheckBadgeIcon className="h-5 w-5" />;
      case 'Underway':
        return <span className="loading loading-dots loading-sm"></span>;
      case 'Canceled':
        return <XCircleIcon className="h-5 w-5" />;
      default:
        return <StarIcon className="h-5 w-5" />; // Default icon if no value is selected
    }
  }

  return (
    <div className="relative inline-block text-left">
      <button 
        className="btn btn-sm m-1 w-28"
        onClick={handleToggle}
      >
        {selectedValue || 'open or close'}
      </button>
      {isOpen && (
        <ul
          className="
            menu dropdown-content bg-base-100 rounded-lg 
            z-[1] shadow-md absolute min-w-44 right-0
          "
          onClick={(e) => e.stopPropagation()}
        >
          <li>
            <button onClick={() => handleSelect('New')}>
              <StarIcon className="h-5 w-5" />
              New
            </button>
          </li>
          <li>
            <button onClick={() => handleSelect('Fulfilled')}>
              <CheckBadgeIcon className="h-5 w-5" />
              Fulfilled
            </button>
          </li>
          <li>
            <button onClick={() => handleSelect('Underway')}>
              <span className="loading loading-dots loading-sm"></span>
              Underway
            </button>
          </li>
          <li>
            <button onClick={() => handleSelect('Canceled')}>
              <XCircleIcon className="h-5 w-5" />
              Canceled
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default PostListDropdown
