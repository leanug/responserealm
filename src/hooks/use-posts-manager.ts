import { useEffect } from 'react'

import { usePostStore } from '@/store/use-post-store'
import { Post } from '@/types/post'

export const usePostsManager = (initPosts: Post[]) => {
  const { posts, setPosts } = usePostStore()

  useEffect(() => {
    if (posts.length === 0 && initPosts) {
      setPosts(initPosts)
    }
  }, [initPosts, setPosts, posts])

  return {posts}
}