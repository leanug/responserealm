'use client'

import { useNotificationStore } from '@/store/use-notification-store'
import { deleteCommentById } from '@/server/delete-comment-by-id'
import { useState } from 'react'
import { usePostActions } from './use-post-actions'
import { useQueryClient } from 'react-query'
import { Comment } from '@/types'

export const useCommentActions = () => {
  const [isProcessing, setIsProcessing] = useState(false)

  const { addNotification } = useNotificationStore()

  const { decrementCommentCount } = usePostActions()

  const queryClient = useQueryClient()

  const handleCommentDelete = async (commentId: string, postId: string) => {
    setIsProcessing(true)
    const response: boolean = await deleteCommentById(commentId)
    if (response) {
      queryClient.setQueryData(['comments', postId], (oldData: Comment[] | undefined) => {
        if (!oldData) return []

        // Use the previously mapped `updatedComments` logic
        const updatedComments = oldData?.filter((comment: Comment) => comment._id !== commentId)
        return updatedComments
      })

      decrementCommentCount(postId) // Decrement commentCount in post by 1
    } else {
      addNotification('Failed to delete comment', 'error')
    }

    setIsProcessing(false)
  }

  return {
    handleCommentDelete,
    isProcessing
  }
}
