import { useState, useEffect } from 'react'
import { useNotificationStore } from '@/store/use-notification-store'
import { useCommentsStore } from '@/store/use-comments-store'
import { getCommentsByPostId } from '@/server/get-comments-by-post-id'

interface UseCommentsProps {
  postId: string | null
}

export const useComments = ({ postId }: UseCommentsProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { comments, setComments } = useCommentsStore()
  const { addNotification } = useNotificationStore()

  const storePostId = comments[0] ? comments[0].post : ''

  // Reset store on board change
  useEffect(() => {
    if (postId !== storePostId) {
      setComments([])
    }
  }, [postId, setComments, storePostId])
  
  useEffect(() => {
    const loadComments = async () => {
      setLoading(true)

      try {
        const fetchedComments = await getCommentsByPostId(postId || '')
        setComments(fetchedComments || [])
      } catch (err) {
        addNotification(
          'Failed to fetch comments. Please try again later.', 
          'error'
        )
      } finally {
        setLoading(false)
      }
    }

    if (postId !== storePostId) {
      loadComments()
    }
  }, [postId, setComments, addNotification, storePostId])

  return { loading, comments }
}
