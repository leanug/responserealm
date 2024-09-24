import { ENV } from '@/utils/constants'

import { Post } from "@/types/post"

export async function fetchPost({
  slug,
  id
}: { slug?: string, id?: string }): Promise<Post | null> {
  let url: string;

  if (slug) {
    url = `${process.env.NEXT_PUBLIC_BASE_URL}/${ENV.ENDPOINTS.POST.GET_BY_SLUG(slug)}`;
  } else if (id) {
    url = `${process.env.NEXT_PUBLIC_BASE_URL}/${ENV.ENDPOINTS.POST.GET_BY_ID(id)}`;
  } else {
    throw new Error("Either slug or id must be provided.");
  }
  
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
