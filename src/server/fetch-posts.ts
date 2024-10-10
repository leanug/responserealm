import { ENV } from '@/utils/constants'

import { Post } from "@/types/post"

export async function fetchPosts(boardId: string): Promise<Post[] | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const endpoint = ENV.ENDPOINTS.POST.GET_BY_BOARD_ID(boardId)
  const url = `${baseUrl}/${endpoint}`
  
  const response = await fetch(url, {cache: 'no-store'})
  
  if (!response.ok) {
    return null 
  }

  const result = await response.json()
  
  if (result && result.data && result.data.posts) {
    const { posts }: { posts: Post[] } = result.data
    
    return posts
  }

  return null
}