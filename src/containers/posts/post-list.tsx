'use client'

import { useParams } from 'next/navigation'
import { useQuery } from 'react-query'

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
import { getBoardBySlug, getPostsByBoardId } from '@/server'
import { LoadingIndicator } from '@/components'
import { useFetchLikedPosts } from '@/hooks'

const PostList = () => {
  const params = useParams<{ boardSlug: string }>()
  const {boardSlug} = params
  const {statusFilter} = usePostFilterStore()
  
  // get liked posts
  const {
    likedPostsMap,
    isLoading: islikedPostsMapLoading,
    error
  } = useFetchLikedPosts()

  const {
    data: board,
    isLoading: isBoardLoading, 
    error: boardFetchError
  } = useQuery(
    ['board', boardSlug],
    () => getBoardBySlug(boardSlug)
  )
  const boardId = board?._id
  
  const {
    data: posts, 
    isLoading: arePostsLoading, 
    error: postsFetchError
  } = useQuery(
    ['posts', boardId],
    () => getPostsByBoardId(boardId || ''),
    {
      enabled: !!boardId,  // Only run query if board._id is defined
    }
  )

  // Filter posts based on the selected status filter
  const filteredPosts = postsFilter(posts || [], statusFilter)
  const loading = arePostsLoading || isBoardLoading

  if (loading)
    return <div className="p-2.5 md:p-6 border-b"><LoadingIndicator /></div>
  
  if (boardFetchError || postsFetchError) return <ErrorDisplay />

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
          slug,
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
                  itemSlug={slug} 
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