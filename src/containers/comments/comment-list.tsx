// src/containers/comments/comment-list.tsx
'use client'

import { Comment } from '@/types/comment'
import { useComments } from '@/hooks/use-comments'
import CommentItem from './comment-item'
import { LoadingIndicator } from '@/components/ui/loading-indicator'

interface CommentListProps {
  postId: string | null
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const {loading, comments} = useComments({ postId })

  return (
    <>
      {loading && <LoadingIndicator />}
      {!loading && comments.length === 0 && <p>No comments.</p>}
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