//src/hooks/use-liked-posts-actions.ts
'use client'

import { useState } from 'react'

import { useNotificationStore } from '@/store/use-notification-store'
import { usePostStore } from '@/store/use-post-store'
import { ENV } from '@/utils/constants'
import { useLikedPostsStore } from '@/store/use-liked-posts-store'

const useLikedPostActions = () => {
  const [isProcessing, setIsProcessing] = useState(false)

  const { addNotification } = useNotificationStore()
  const { likePost, dislikePost } = usePostStore()
  const { addLikedPost, removeLikedPost } = useLikedPostsStore()
  

  const handleLike = async (postId: string) => {
    setIsProcessing(true)

    if (!postId) {
      addNotification('An error occurred.', 'error')
      ENV.IS_DEV && console.error('postId undefined')
      setIsProcessing(false)
      return
    }
    
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${ENV.ENDPOINTS.LIKED_POST.CREATE}`
    const data = {
      postId
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      // Add post to liked posts store
      const newLikedPost = await response.json()
      const { likedPost } = newLikedPost.data

      addLikedPost({
        _id: likedPost._id,
        postId
      })

      // Increment database post likes counter
      const updateLikesUrl = `
        ${process.env.NEXT_PUBLIC_BASE_URL}/${ENV.ENDPOINTS.POST.LIKE(postId, 'like')}
      `
      const updateLikesResponse = await fetch(updateLikesUrl, { 
        method: 'PATCH'
      })

      if (!updateLikesResponse.ok) {
        addNotification('An error occured.', 'error')
      } else {
        likePost(postId) // Increment store post likes by 1
      }
    } else {
      addNotification('An error occurred. Please try again later.', 'error')
    }
   
    setIsProcessing(false)
  }

  // Substract one like from post
  // Remove from liked posts store
  const handleDislike = async (postId: string, likedPostId: string) => {    
    setIsProcessing(true)

    if (!postId || !likedPostId) {
      addNotification('An error occurred.', 'error')
      ENV.IS_DEV && console.error('postId or likedPostId undefined')
      setIsProcessing(false)
      return
    }

    const url = `
      ${process.env.NEXT_PUBLIC_BASE_URL}/${ENV.ENDPOINTS.LIKED_POST.DELETE(likedPostId)}
    `

    const response = await fetch(url, {method: 'DELETE'})

    if (response.ok) {
      removeLikedPost(likedPostId) // Delete post from liked posts store

      // Decrement database post likes counter
      const updateLikesUrl = `
        ${process.env.NEXT_PUBLIC_BASE_URL}/${ENV.ENDPOINTS.POST.LIKE(postId, 'dislike')}
      `
      const updateLikesResponse = await fetch(updateLikesUrl, { 
        method: 'PATCH'
      })

      if (!updateLikesResponse.ok) {
        addNotification('An error occured.', 'error')
      } else {
        dislikePost(postId) // Decrement store post likes by 1
      }
    } else {
      addNotification(
        'Failed to dislike post. Please try again.', 
        'error'
      )
    }
  
    setIsProcessing(false)
  }

  return { isProcessing, handleLike, handleDislike }
}

export default useLikedPostActions
