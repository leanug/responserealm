import { transformLikedPosts } from '@/utils/transform-liked-posts'
import { LikedPost } from '@/types/liked-post'
import { useSession } from 'next-auth/react'
import { getLikedPostsByUserId } from '@/server'
import { useQuery } from 'react-query'
import { useState } from 'react'

export const useFetchLikedPosts = () => {
  const [indexLikedPosts, setIndexLikedPosts] = useState<Record<string, LikedPost>>({});

  const {data: session} =  useSession()
  const userId = session?.user?.id

  const {error, isLoading} = useQuery(
    ['likedPosts', userId],
    () => getLikedPostsByUserId(userId),
    {
      enabled: !!userId,
      onSuccess: (likedPosts: LikedPost[]) => {
        const transformedLikes = transformLikedPosts(likedPosts)
        setIndexLikedPosts(transformedLikes)
      }
    }
  )
  
  return {
    indexLikedPosts,
    error,
    isLoading
  }
}