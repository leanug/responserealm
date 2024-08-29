// src/hooks/use-comment-actions.ts
'use client'

import { useCommentsStore } from '@/store/use-comments-store'
import { useNotificationStore } from '@/store/use-notification-store'
import { deleteCommentById } from '@/server/delete-comment-by-id'
import { useState } from 'react'
import { usePostActions } from './use-post-actions'

export const useCommentActions = () => {
  const [isProcessing, setIsProcessing] = useState(false)

  const { deleteComment } = useCommentsStore()
  const { addNotification } = useNotificationStore()

  const { decrementCommentCount } = usePostActions()

  const handleCommentDelete = async (commentId: string, postId: string) => {
    setIsProcessing(true)
    const response: boolean = await deleteCommentById(commentId)

    if (response) {
      deleteComment(commentId) // Delete comment from store
      decrementCommentCount(postId) // Decrement commentCount in post by 1

      addNotification('Comment deleted successfully', 'success')
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
