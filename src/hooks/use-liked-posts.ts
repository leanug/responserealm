//src/hooks/use-liked-posts.ts
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import { getLikedPostsByUserId } from '@/server/get-liked-posts-by-user-id'
import { transformLikedPosts } from '@/utils/transform-liked-posts'
import { useLikedPostsStore } from '@/store/use-liked-posts-store'

export const useLikedPosts = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const {setLikedPosts, likedPosts} = useLikedPostsStore()

  const { data: session } = useSession()
  
  const userId = session?.user?.id || ''
  const dataHasBeenLoaded = Object.keys(likedPosts).length > 0
  
  useEffect(() => {
    const loadLikedPosts = async () => {
      setLoading(true)

      const fetchedLikedPosts = await getLikedPostsByUserId(userId || '')
      
      if (fetchedLikedPosts) {
        const indexLikedPosts = transformLikedPosts(fetchedLikedPosts)
        setLikedPosts(indexLikedPosts)
      } 

      setLoading(false)
    }
    
    if (userId && !dataHasBeenLoaded) {
      loadLikedPosts()
    }
  }, [userId, setLikedPosts, dataHasBeenLoaded])

  return { loading, likedPosts }
}
