'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useQueryClient } from 'react-query'

import { useNotificationStore } from '@/store/use-notification-store'
import { ENV } from '@/utils/constants'
import { LikedPost } from '@/types/liked-post'
import { Post, Board } from '@/types'

const useLikedPostActions = () => {
  const [isProcessing, setIsProcessing] = useState(false)

  const params = useParams<{ boardSlug: string }>()
  const {boardSlug} = params
  
  const { addNotification } = useNotificationStore()

  const queryClient = useQueryClient()
  const board: Board | undefined = queryClient.getQueryData(['board', boardSlug])
  const boardId = board?._id || ''

  const {data: session} = useSession()
  const userId = session?.user?.id
  
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

      // Add or update the liked post in the cache
      queryClient.setQueryData(['likedPosts', userId], (oldCache: Record<string, LikedPost> | undefined) => {
        if (!oldCache) return {}; // Handle the case where the cache doesn't exist yet
        const updatedLikedPosts = {
          ...oldCache,
          [postId]: likedPost, // Add or update the post in the cache
        }
        
        return updatedLikedPosts
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
        // Increment store post likes by 1
        queryClient.setQueryData(['posts', boardId], (oldCache: Post[] | undefined): Post[] => {
          if (!oldCache) return [] // Handle the case where the cache doesn't exist yet

          const updatedPosts: Post[] = oldCache?.map((post: Post) =>
            post._id === postId ? { ...post, likes: post.likes + 1 } : post
          )
          return updatedPosts
        })
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
      // Remove liked post from liked posts cache
      queryClient.setQueryData(['likedPosts', userId], (oldCache: Record<string, LikedPost> | undefined) => {
        if (!oldCache) return {} // Handle the case where the cache doesn't exist yet

        const updatedLikedPosts = Object.keys(oldCache).reduce((acc, key) => {
          if (oldCache[key]._id !== likedPostId) {
            acc[key] = oldCache[key]
          }
          return acc
        }, {} as Record<string, LikedPost>)

        return updatedLikedPosts
      })

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
        // Decrement store post likes by 1
        queryClient.setQueryData(['posts', boardId], (oldCache: Post[] | undefined): Post[] => {
          if (!oldCache) return [] // Handle the case where the cache doesn't exist yet

          const updatedPosts: Post[] = oldCache?.map((post) =>
            post._id === postId ? { ...post, likes: post.likes - 1 } : post
          )
          return updatedPosts
        })
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
