import { ENV } from '@/utils/constants'

import { Post } from "@/types/post"

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${ENV.ENDPOINTS.POST.GET_BY_SLUG(slug)}`

  const response = await fetch(url, {
    method: 'GET'
  })
  
  if (!response.ok) {
    return null
  }

  const result = await response.json()

  if (result && result.data && result.data.post) {
    const { post }: { post: Post } = result.data
    return post
  }

  return null
}