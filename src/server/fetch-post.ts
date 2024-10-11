import { ENV } from '@/utils/constants'

import { Post } from "@/types/post"

export async function fetchPost({ id }: { id: string }): Promise<Post | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const endpoint = ENV.ENDPOINTS.POST.GET_BY_ID(id)
  const url = `${baseUrl}/${endpoint}`;

  const response = await fetch(url, {
    method: 'GET'
  });

  if (!response.ok) {
    return null
  }

  const result = await response.json()
  
  if (result && result.data && result.data.post) {
    const { post }: { post: Post[] } = result.data;
    return post[0];
  }

  return null;
}
