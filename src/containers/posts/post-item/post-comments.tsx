// src/containers/posts/post-item/post-comments.tsx

import Link from 'next/link'

import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'

interface PostCommentsProps {
  commentCount: number
  itemSlug: string
  boardSlug: string | null
}

const PostComments: React.FC<PostCommentsProps> = ({ 
  commentCount, 
  itemSlug, 
  boardSlug 
}) => {
  return (
    <Link 
      href={`/b/${boardSlug}/p/${itemSlug}`}
      className="btn"
    >
      <ChatBubbleLeftIcon className="w-5 h-5" />
      <span>{commentCount}</span>
    </Link>
  )
}

export default PostComments
