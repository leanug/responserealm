'use client'
import { useQuery } from 'react-query'
import { Comment } from '@/types/comment'
import CommentItem from './comment-item'
import { LoadingIndicator } from '@/components/ui/loading-indicator'
import { useParams } from 'next/navigation'
import { fetchComments } from '@/server/fetch-comments'
import ErrorDisplay from '@/components/ui/error-display'

const CommentList = () => {
  const params = useParams<{ postId: string }>()
  const {postId} = params

  const { 
    data: comments,
    isLoading,
    error
  } = useQuery(
    ['comments', postId],
    () => fetchComments(postId)
  )

  return (
    <>
      {error && <ErrorDisplay />}
      {isLoading && <LoadingIndicator />}
      {!isLoading && comments?.length === 0 && <p>No comments yet.</p>}
      <ul className="flex flex-col gap-6">
        {Array.isArray(comments) && comments.map((item: Comment) => (
          <li className="w-full" key={item._id}>
            <CommentItem comment={item} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default CommentList