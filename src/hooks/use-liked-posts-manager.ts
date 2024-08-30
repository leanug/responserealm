import { useEffect } from 'react'

import { useLikedPostsStore } from '@/store'
import { LikedPost } from "@/types/liked-post"

export const useLikedPostsManager = (indexLikedPosts: Record<string, LikedPost>) => {
  const { likedPosts, setLikedPosts } = useLikedPostsStore()

  useEffect(() => {
    if (Object.keys(likedPosts).length === 0 && indexLikedPosts) {
      setLikedPosts(indexLikedPosts)
    }
  }, [indexLikedPosts, setLikedPosts, likedPosts])

  return {likedPosts}
}