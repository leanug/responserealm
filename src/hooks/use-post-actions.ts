// src/hooks/use-post-actions.ts
import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { useParams } from 'next/navigation'

import { usePostStore } from '@/store/use-post-store'
import { useNotificationStore } from '@/store/use-notification-store'
import { ENV } from '@/utils/constants'
import { Board, Post } from '@/types'

export const usePostActions = () => {
  const [isDeleting, setIsDeleting] = useState(false)
  const queryClient = useQueryClient()

  const params = useParams<{ boardSlug: string }>()
  const {boardSlug} = params

  const board: Board | undefined = queryClient.getQueryData(['board', boardSlug])
  const boardId = board?._id

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
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${ENV.ENDPOINTS.POST.DELETE(postId)}`
      const response = await fetch(url, {
        method: 'DELETE',
      })

      if (response.ok) {
        queryClient.setQueryData(['posts', boardId], (oldData: Post[]) => {
          // Use the previously mapped `updatedPosts` logic
          const updatedPosts = oldData?.map((item: Post) =>
            item._id === postId
              ? { ...item, commentCount: item.commentCount + 1 }
              : item
          );
        
          return updatedPosts
        });
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
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${ENV.ENDPOINTS.POST.COMMENT(postId, 'addComment')}`
      
      const response = await fetch(url, {
        method: 'PATCH',
      })

      if (response.ok) {
        // Increment commentCount in post by 1 in posts useQuery cache
        queryClient.setQueryData(['posts', boardId], (oldData: Post[]) => {
          // Use the previously mapped `updatedPosts` logic
          const updatedPosts = oldData?.map((item: Post) =>
            item._id === postId
              ? { ...item, commentCount: item.commentCount + 1 }
              : item
          );
        
          return updatedPosts
        });
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
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${ENV.ENDPOINTS.POST.COMMENT(postId, 'deleteComment')}`
      const response = await fetch(url, {
        method: 'PATCH',
      })
      
      if (response.ok) {
        // Decrement commentCount in post by 1 in store
        queryClient.setQueryData(['posts', boardId], (oldData: Post[]) => {
          // Use the previously mapped `updatedPosts` logic
          const updatedPosts = oldData?.map((item: Post) =>
            item._id === postId
              ? { ...item, commentCount: item.commentCount - 1 }
              : item
          );
        
          return updatedPosts
        })
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
