// src/containers/posts/post-item/post-actions.tsx
'use client'

import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

import useLikedPostActions from '@/hooks/use-liked-post-actions'
import { LoadingIndicator } from '@/components'
import { useSession } from 'next-auth/react'
import { useModalStore } from '@/store/use-modal-store'

type PostActionsProps = {
  likes: number
  postId: string
  isLiked: boolean
  likedPostId: string
  islikedPostsMapLoading: boolean
}

const PostActions: React.FC<PostActionsProps> = ({
  likes, 
  postId, 
  islikedPostsMapLoading, 
  isLiked, 
  likedPostId
}) => {
  const session = useSession() 
  const {setOpenModal} = useModalStore()

  const { 
    handleLike, 
    handleDislike, 
    isProcessing 
  } = useLikedPostActions()

  const loading: boolean = islikedPostsMapLoading || isProcessing
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
      disabled={loading}
      className={`btn`}
    >
      {loading 
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
