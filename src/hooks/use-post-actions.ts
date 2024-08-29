// src/hooks/use-post-actions.ts
import { useState } from 'react'

import { usePostStore } from '@/store/use-post-store'
import { useNotificationStore } from '@/store/use-notification-store'
import { ENV } from '@/utils/constants'

export const usePostActions = () => {
  const [isDeleting, setIsDeleting] = useState(false)

  const { addNotification } = useNotificationStore()
  const { 
    deletePost, 
    changePostStatus,
    incrementCommentCount: incrementCommentCountStore,
    decrementCommentCount: decrementCommentCountStore 
  } = usePostStore()

  const handleDelete = async (postId: string) => {
    setIsDeleting(true)
    try {
      const url = `${ENV.BASE_URL}/${ENV.ENDPOINTS.POST.DELETE(postId)}`
      const response = await fetch(url, {
        method: 'DELETE',
      })

      if (response.ok) {
        deletePost(postId)
        addNotification('Post deleted successfully', 'success')
      } else {
        addNotification('Failed to delete post. Please try again.', 'error')
      }
    } catch (error) {
      addNotification('An error occurred. Please try again later.', 'error')
    } finally {
      setIsDeleting(false)
    }
  }

  const incrementCommentCount = async (postId: string) => {
    try {
      const url = `${ENV.BASE_URL}/${ENV.ENDPOINTS.POST.COMMENT(postId, 'addComment')}`
      
      const response = await fetch(url, {
        method: 'PATCH',
      })

      if (response.ok) {
        incrementCommentCountStore(postId) // Increment commentCount in post by 1 in store
        return true
      } else {
        addNotification('Failed to update comment count. Please try again.', 'error')
        return false
      }
    } catch (error) {
      addNotification(
        'An error occurred while updating comment count. Please try again later.', 
        'error'
      )
      return false
    }
  }

  const decrementCommentCount = async (postId: string) => {
    try {
      const url = `${ENV.BASE_URL}/${ENV.ENDPOINTS.POST.COMMENT(postId, 'deleteComment')}`
      const response = await fetch(url, {
        method: 'PATCH',
      })
      
      if (response.ok) {
        decrementCommentCountStore(postId) // Decrement commentCount in post by 1 in store
        return true
      } else {
        addNotification('Failed to decrease comment count. Please try again.', 'error')
        return false
      }

    } catch (error) {
      addNotification(
        'An error occurred while decreasing comment count. Please try again later.', 
        'error'
      )
      return false
    }
  }

  return { 
    isDeleting, 
    handleDelete, 
    changePostStatus,
    incrementCommentCount,
    decrementCommentCount
  }
}
