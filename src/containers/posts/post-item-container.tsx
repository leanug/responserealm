'use client'

import { useParams } from "next/navigation"

import { useFetchLikedPosts, useFetchPosts } from "@/hooks"
import { LoadingIndicator } from "@/components"
import { Post } from "@/types"
import UserAvatar from '@/components/ui/avatar/user-avatar'
import PostHeader from '@/containers/posts/post-item/post-header'
import PostActions from '@/containers/posts/post-item/post-actions'
import PostItem from '@/containers/posts/post-item'
import PostDescription from '@/containers/posts/post-item/post-description'
import ErrorDisplay from "@/components/ui/error-display"

function PostItemContainer() {
  const params = useParams()
  const {postId, boardId} = params

  // Get liked posts
  const {
    likedPostsMap,
    isLoading: islikedPostsMapLoading,
  } = useFetchLikedPosts()

  const boardIdParam = Array.isArray(boardId) ? boardId[0] : boardId;
  const {
    data: posts, 
    isLoading: isPostsLoading, 
    isError
  } = useFetchPosts(boardIdParam)
  
  let isLiked: boolean = false
  let likedPostId: string = ''

  const loading = isPostsLoading || islikedPostsMapLoading

  if (loading) return <div className="p-2.5 md:p-6"><LoadingIndicator /></div>
  if (isError) return <div className="p-2.5 md:p-6"><ErrorDisplay /></div>

  const post: Post | undefined = posts?.find((post: Post) => postId === post._id);

  if (!post) return <div className="p-2.5 md:p-6">Post not found</div>

  isLiked = likedPostsMap ? Boolean(likedPostsMap[post?._id]) : false
  likedPostId = likedPostsMap ? likedPostsMap[post?._id]?._id : ''

  return (
    <PostItem
      header={<PostHeader name={post?.name || ''} />}
      description={<PostDescription description={post?.description || ''} />}
      postData={
        <UserAvatar
          imageSrc={post?.user?.image as string}
          userName={post?.user?.name || "Anonymous"}
          createdAt={post?.createdAt || ''}
        />
      }
      postActions={
        <PostActions
          likes={post?.likes || 0}
          postId={post?._id || ''}
          isLiked={isLiked}
          likedPostId={likedPostId}
          islikedPostsMapLoading={islikedPostsMapLoading}
        />
      }
    />
  )
}

export default PostItemContainer