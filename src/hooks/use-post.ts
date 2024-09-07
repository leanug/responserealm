'use client'

import { useEffect, useState } from 'react'
import { usePostStore } from '@/store/use-post-store'
import { getPostBySlug } from '@/server/get-post-by-slug'
import { Post } from '@/types/post'
import { useNotificationStore } from '@/store/use-notification-store'

export const usePost = (postSlug: string) => {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  const {addNotification} = useNotificationStore()
  const { posts } = usePostStore()

  useEffect(() => {
    const existingPost = posts.find(p => p.slug === postSlug)
    if (existingPost) {
      setPost(existingPost)
      setLoading(false)
    } else {
      const fetchPost = async () => {
        setLoading(true)
        const fetchedPosts: Post | null = await getPostBySlug(postSlug)
        const post = fetchedPosts && fetchedPosts.constructor === Array 
          ? fetchedPosts?.[0] 
          : null
        if (post) {
          setPost(post)
        } else {
          addNotification('Oops! An error occured.', 'error')
        }
        setLoading(false)
      }
      fetchPost()
    }
  }, [postSlug, posts, addNotification])

  return { post, loading }
}
