import Link from 'next/link'

import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'

type PostCommentsProps = {
  commentCount: number
  postId: string
  boardSlug: string | null
  boardId: string
}

const PostComments: React.FC<PostCommentsProps> = ({ 
  commentCount, 
  boardId,
  postId, 
  boardSlug 
}) => {
  return (
    <Link 
      href={`/b/${boardId}/${boardSlug}/p/${postId}`}
      className="btn"
    >
      <ChatBubbleLeftIcon className="w-5 h-5" />
      <span>{commentCount}</span>
    </Link>
  )
}

export default PostComments
