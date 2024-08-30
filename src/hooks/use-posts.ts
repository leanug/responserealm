// src/hooks/use-posts.ts
import { useState, useEffect } from 'react'

import { useNotificationStore } from '@/store/use-notification-store'
import { usePostStore } from '@/store/use-post-store'
import { getPostsByBoardId } from '@/server/get-posts-by-board-id'

interface UsePostsProps {
  boardId: string | null
}

export const usePosts = ({ boardId }: UsePostsProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  const {posts, setPosts} = usePostStore()
  const { addNotification } = useNotificationStore()

  // Get board id value from zustand
  const storeBoardId = posts[0] ? posts[0].board : ''
  
  // Reset store on board change
  useEffect(() => {
    if (boardId !== storeBoardId) {
      setPosts([])
    }
  }, [boardId, setPosts, storeBoardId])

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true)
      
      try {
        const fetchedPosts = await getPostsByBoardId(boardId || '')
        setPosts(fetchedPosts || [])
      } catch (err) {
        addNotification(
          'Failed to fetch posts. Please try again later.', 
          'error'
        )
      } finally {
        setLoading(false)
      }
    }
     
    if (boardId !== storeBoardId) {
      loadPosts()
    }
  }, [boardId, setPosts, setLoading, addNotification, storeBoardId])

  return { loading, posts }
}
