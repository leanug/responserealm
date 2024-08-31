'use client'

import PostHeader from '@/containers/posts/post-item/post-header'
import PostStatus from '@/containers/posts/post-item/post-status'
import PostActions from '@/containers/posts/post-item/post-actions'
import PostComments from '@/containers/posts/post-item/post-comments'
import PostDescription from '@/containers/posts/post-item/post-description'
import PostUpdatedAt from '@/containers/posts/post-item/post-updated'
import PostItem from '@/containers/posts/post-item'
import { LikedPost } from '@/types/liked-post'
import { Post } from '@/types/post'
import { usePostsManager, useLikedPostsManager } from "@/hooks"
import { usePostFilterStore } from '@/store'
import { postsFilter } from '@/utils'

interface PostListProps {
  boardId: string | null
  boardSlug: string | null
  initPosts: Post[]
  indexLikedPosts: Record<string, LikedPost>
}

const PostList: React.FC<PostListProps> = ({
  boardSlug, 
  initPosts, 
  indexLikedPosts
}) => {
  const {posts} = usePostsManager(initPosts)
  useLikedPostsManager(indexLikedPosts)

  const {statusFilter} = usePostFilterStore()

  // Filter posts based on the selected status filter
  const filteredPosts = postsFilter(posts, statusFilter)
  
  return (
    <ul className="flex flex-col">
      {Array.isArray(filteredPosts) && filteredPosts?.map((item: Post) => {
        const {
          name, 
          description, 
          status, 
          likes, 
          _id, 
          commentCount,
          updatedAt
        } = item
        return (
          <li key={item._id}>
            <PostItem 
              header={<PostHeader name={name} />}
              description={<PostDescription description={description} />}
              postStatus={<PostStatus status={status} />}
              postActionBtn={
                <PostComments  
                  itemSlug={item.slug} 
                  boardSlug={boardSlug}
                  commentCount={commentCount} 
                />
              }
              postUpdatedAt={<PostUpdatedAt updatedAt={updatedAt} />}
              postActions={
                <PostActions
                  likes={likes}
                  postId={_id}
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