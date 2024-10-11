import Link from 'next/link'

import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'

type PostCommentsProps = {
  commentCount: number
  postId: string
  boardSlug: string | null
}

const PostComments: React.FC<PostCommentsProps> = ({ 
  commentCount, 
  postId, 
  boardSlug 
}) => {
  return (
    <Link 
      href={`/b/${boardSlug}/p/${postId}`}
      className="btn"
    >
      <ChatBubbleLeftIcon className="w-5 h-5" />
      <span>{commentCount}</span>
    </Link>
  )
}

export default PostComments
