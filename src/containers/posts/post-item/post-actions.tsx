// src/containers/posts/post-item/post-actions.tsx
'use client'

import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

import { LoadingIndicator } from '@/components'
import useLikedPostActions from '@/hooks/use-liked-post-actions'
import { useLikedPostsStore } from '@/store/use-liked-posts-store'
import { useSession } from 'next-auth/react'
import { useModalStore } from '@/store/use-modal-store'

interface PostActionsProps {
  likes: number
  postId: string
}

const PostActions: React.FC<PostActionsProps> = ({likes, postId}) => {
  const {likedPosts} = useLikedPostsStore()
  const isLiked = Boolean(likedPosts[postId])
  
  const likedPostId = likedPosts[postId]?._id
  const session = useSession() 
  
  const {setOpenModal} = useModalStore()

  const { 
    handleLike, 
    handleDislike, 
    isProcessing 
  } = useLikedPostActions()

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        
        if (session && session.status === 'authenticated') {
          isLiked ? handleDislike(postId, likedPostId) : handleLike(postId)
        } else {
          setOpenModal('login-modal')
          console.log('User is not logged in. Button click logged.')
        }
      }}
      disabled={isProcessing}
      className={`btn`}
    >
      {isProcessing 
        ? <LoadingIndicator /> 
        : (
          <>
            {isLiked 
              ? <HeartIconSolid className="w-4 h-4" /> 
              : <HeartIcon className="w-4 h-4" />
            } 
            {likes}
          </>
        )
      }
    </button>
  )
}

export default PostActions
