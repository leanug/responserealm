import { ENV } from '@/utils/constants'

import { Post } from "@/types/post"

export async function getPostsByBoardId(boardId: string): Promise<Post[] | null> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${ENV.ENDPOINTS.POST.GET_BY_BOARD_ID(boardId)}`
  
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