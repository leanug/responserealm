// src/containers/posts/post-item/post-actions.tsx
'use client'

import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

import useLikedPostActions from '@/hooks/use-liked-post-actions'
import { LoadingIndicator } from '@/components'
import { useSession } from 'next-auth/react'
import { useModalStore } from '@/store/use-modal-store'
import { useFetchLikedPosts } from '@/hooks'

interface PostActionsProps {
  likes: number
  postId: string
}

const PostActions: React.FC<PostActionsProps> = ({likes, postId}) => {
  const session = useSession() 
  const {setOpenModal} = useModalStore()

  const { 
    handleLike, 
    handleDislike, 
    isProcessing 
  } = useLikedPostActions()

  // get liked posts
  const {
    indexLikedPosts,
    isLoading,
    error
  } = useFetchLikedPosts()

  const isLiked = !isLoading && Boolean(indexLikedPosts[postId])
  const likedPostId = !isLoading && indexLikedPosts[postId]?._id

  const loading: boolean = isLoading || isProcessing

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
      disabled={loading || error ? true : false}
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
