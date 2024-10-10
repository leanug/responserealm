'use client'

import { useParams } from 'next/navigation'

import PostHeader from '@/containers/posts/post-item/post-header'
import PostStatus from '@/containers/posts/post-item/post-status'
import PostActions from '@/containers/posts/post-item/post-actions'
import PostComments from '@/containers/posts/post-item/post-comments'
import PostDescription from '@/containers/posts/post-item/post-description'
import PostUpdatedAt from '@/containers/posts/post-item/post-updated'
import PostItem from '@/containers/posts/post-item'
import ErrorDisplay from '@/components/ui/error-display'
import { Post } from '@/types/post'
import { usePostFilterStore } from '@/store'
import { postsFilter } from '@/utils'
import { LoadingIndicator } from '@/components'
import { useFetchLikedPosts, useFetchBoard, useFetchPosts } from '@/hooks'

const PostList = () => {
  const params = useParams<{ boardSlug: string }>()
  const {boardSlug} = params
  const {statusFilter} = usePostFilterStore()
  
  const {
    data: board,
  } = useFetchBoard()

  const {
    likedPostsMap,
    isLoading: islikedPostsMapLoading,
  } = useFetchLikedPosts()

  const {
    data: posts, 
    isLoading, 
    error: postsFetchError
  } = useFetchPosts(board?._id || '')
  
  const filteredPosts = postsFilter(posts || [], statusFilter)

  if (isLoading)
    return <div className="p-2.5 md:p-6 border-b"><LoadingIndicator /></div>
  
  if (postsFetchError) return <ErrorDisplay />

  return (
    <ul className="flex flex-col">
      {Array.isArray(filteredPosts) && filteredPosts?.map((item: Post) => {
        const {
          _id,
          commentCount,
          name,
          description,
          status,
          likes,
          updatedAt
        } = item

        const isLiked = likedPostsMap ? Boolean(likedPostsMap[_id]) : false
        const likedPostId = likedPostsMap ? likedPostsMap[_id]?._id : ''
        
        return (
          <li key={_id}>
            <PostItem 
              header={<PostHeader name={name} />}
              description={<PostDescription description={description} />}
              postStatus={<PostStatus status={status} />}
              postActionBtn={
                <PostComments  
                  postId={_id}
                  boardId={board?._id || ''}
                  boardSlug={boardSlug}
                  commentCount={commentCount} 
                />
              }
              postUpdatedAt={<PostUpdatedAt updatedAt={updatedAt} />}
              postActions={
                <PostActions
                  likes={likes}
                  postId={_id}
                  isLiked={isLiked}
                  likedPostId={likedPostId}
                  islikedPostsMapLoading={islikedPostsMapLoading}
                />
              }
            />
          </li>
        )
      })}
    </ul>
  )
}

export default PostList