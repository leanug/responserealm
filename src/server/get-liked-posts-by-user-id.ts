import { ENV } from '@/utils/constants'

import { LikedPost } from "@/types/liked-post"

export async function getLikedPostsByUserId(userId: string): Promise<LikedPost[] | null> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${ENV.ENDPOINTS.LIKED_POST.GET_BY_USER_ID(userId)}`
  const response = await fetch(url, {cache: 'no-store'})

  if (!response.ok) {
    return null 
  }

  const result = await response.json()
  
  if (result && result.data && result.data.likedPosts) {
    const { likedPosts }: { likedPosts: any } = result.data
    
    return likedPosts
  }

  return null
}