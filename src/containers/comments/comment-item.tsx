// src/containers/comments/comment-item.tsx
'use client'

import { useSession } from "next-auth/react";
import Image from 'next/image'

import { TrashIcon } from '@heroicons/react/24/solid'

import { Comment } from '@/types/comment'
import { useCommentActions } from '@/hooks/use-comment-actions'
import { LoadingIndicator } from '@/components'
import { usePathname } from 'next/navigation'

interface CommentProps {
  comment: Comment
}

const CommentItem: React.FC<CommentProps> = ({
  comment
}) => {
  const session = useSession()
  const userId = session?.data?.user?.id || ''
  
  const {content, user} = comment

  const pathname = usePathname()
  const isDashboard = pathname.includes('dashboard')

  const {handleCommentDelete, isProcessing} = useCommentActions()

  return (
    <div className="card">
      <div className="flex items-start">
        <Image
          src={user?.image as string}
          alt={user?.name || "User Avatar"}
          width={40}
          height={40}
          placeholder="empty"
          priority={false}
          className="rounded-full mr-4 mt-1"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-sm">
                {user?.name || 'Anonymous'}
              </p>
              <p className="text-sm">
                {new Date(comment?.createdAt).toLocaleString() || ''}
              </p>
            </div>
            {/* Conditionally show the delete button */}
            {
              user._id === userId || isDashboard ? (
                <button
                  onClick={() => handleCommentDelete(comment?._id || '', comment?.post || '')}
                  className="btn"
                  disabled={isProcessing}
                >
                  {
                    isProcessing 
                      ? <LoadingIndicator /> 
                      : <TrashIcon className="w-4 h-4" />
                  }
                </button>
              ) : null
            }
          </div>
          <p className="mt-2 text-sm">{content}</p>
        </div>
      </div>
    </div>
  )
}

export default CommentItem