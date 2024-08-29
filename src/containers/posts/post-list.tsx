// src/containers/posts/post-list.tsx
'use client'

import { Post } from '@/types/post'
import { usePosts, useLikedPosts } from '@/hooks'
import { LoadingIndicator } from '@/components'
import { usePostFilterStore } from '@/store'
import PostHeader from '@/containers/posts/post-item/post-header'
import PostStatus from '@/containers/posts/post-item/post-status'
import PostActions from '@/containers/posts/post-item/post-actions'
import PostComments from '@/containers/posts/post-item/post-comments'
import PostDescription from '@/containers/posts/post-item/post-description'
import PostUpdatedAt from '@/containers/posts/post-item/post-updated'
import PostItem from '@/containers/posts/post-item'

interface PostListProps {
  boardId: string | null
  boardSlug: string | null
}

const PostList: React.FC<PostListProps> = ({boardId, boardSlug}) => {
  const {posts, loading: postsLoading} = usePosts({boardId})
  const {loading: likedPostsLoading} = useLikedPosts()
  const {statusFilter} = usePostFilterStore()

  // Combine loading states
  const loading = postsLoading || likedPostsLoading

  // Filter posts based on the selected status filter
  const filteredPosts = posts.filter((post) => {
    if (statusFilter === 'All') return true;
    return post.status === statusFilter;
  })
  
  return (
    <section className="w-full">
      {loading && <LoadingIndicator />}
      {!loading && posts.length === 0 && <p>No posts</p>}
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
            <li 
              className="w-full" 
              key={item._id}
            >
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
    </section>
  )
}

export default PostList