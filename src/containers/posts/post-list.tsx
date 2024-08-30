'use client'

import { Suspense, useEffect } from "react"

import { Post } from '@/types/post'
import { LoadingIndicator } from '@/components'
import { 
  usePostFilterStore, 
  usePostStore, 
  useLikedPostsStore 
} from '@/store'
import PostHeader from '@/containers/posts/post-item/post-header'
import PostStatus from '@/containers/posts/post-item/post-status'
import PostActions from '@/containers/posts/post-item/post-actions'
import PostComments from '@/containers/posts/post-item/post-comments'
import PostDescription from '@/containers/posts/post-item/post-description'
import PostUpdatedAt from '@/containers/posts/post-item/post-updated'
import PostItem from '@/containers/posts/post-item'
import { LikedPost } from '@/types/liked-post'

interface PostListProps {
  boardId: string | null
  boardSlug: string | null
  initPosts: Post[]
  indexLikedPosts: Record<string, LikedPost>
}

const PostList: React.FC<PostListProps> = ({boardSlug, initPosts, indexLikedPosts}) => {
  const {statusFilter} = usePostFilterStore()
  const {posts, setPosts} = usePostStore()
  const {setLikedPosts} = useLikedPostsStore()

  useEffect(() => {
    setPosts(initPosts)
    setLikedPosts(indexLikedPosts)
  }, [initPosts, setPosts, setLikedPosts, indexLikedPosts])

  // Filter posts based on the selected status filter
  const filteredPosts = posts.filter((post) => {
    if (statusFilter === 'All') return true;
    return post.status === statusFilter;
  })
  
  return (
    <Suspense fallback={<div>Loading...</div>}>

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
    </Suspense>

  )
}

export default PostList