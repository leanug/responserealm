import { useSession } from 'next-auth/react'
import { fetchLikedPosts } from '@/server'
import { useQuery } from 'react-query'

export const useFetchLikedPosts = () => {
  const {data: session} =  useSession()
  const userId = session?.user?.id

  const {data: likedPostsMap, error, isLoading} = useQuery(
    ['likedPosts', userId],
    () => fetchLikedPosts(userId),
    {
      enabled: !!userId,
    }
  )
  
  return {
    likedPostsMap,
    error,
    isLoading
  }
}