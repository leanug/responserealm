import { ENV } from '@/utils/constants'

import { Comment } from "@/types/comment"

export async function getCommentsByPostId(postId: string): Promise<Post[] | null> {
  const url = `${ENV.BASE_URL}/${ENV.ENDPOINTS.COMMENT.GET_BY_POST_ID(postId)}`
  
  const response = await fetch(url, {
    method: 'GET'
  })

  if (!response.ok) {
    return null 
  }

  const result = await response.json()
  
  if (result && result.data && result.data.comments) {
    const { comments }: { comments: Comment[] } = result.data
    
    return comments
  }

  return null
}