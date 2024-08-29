//src/containers/posts/post-list-dashboard.tsx
'use client'

import Link from 'next/link'

import { 
  ChatBubbleLeftIcon, 
  HeartIcon 
} from '@heroicons/react/24/outline'

import { Post } from '@/types/post'
import { usePosts } from '@/hooks/use-posts'
import { LoadingIndicator } from '@/components'
import PostItem from '@/containers/posts/post-item'
import PostHeader from '@/containers/posts/post-item/post-header'
import PostUpdatedAt from '@/containers/posts/post-item/post-updated'
import DeletePostBtn from '@/containers/ui/delete-post-btn'
import PostListDropdown from '@/containers/ui/post-list-dropdown'

interface PostListDashboardProps {
  boardId: string | null
  boardSlug: string | null
}

const PostListDashboard: React.FC<PostListDashboardProps> = ({
  boardId, 
  boardSlug
}) => {
  const {posts, loading} = usePosts({boardId})
      
  return (
    <>
      {loading && <LoadingIndicator />}
      {!loading && posts.length === 0 && <p>No posts</p>}
      <ul className="flex flex-col gap-1">
        {Array.isArray(posts) && posts?.map((item: Post) => {
          const {
            name, 
            status,
            slug,
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
                postUpdatedAt={<PostUpdatedAt updatedAt={updatedAt} />}
                postData={
                  <div className="flex flex-row gap-3 items-center">
                    <Link 
                      href={`/dashboard/${boardSlug}/p/${slug}`} 
                      className="btn btn-sm btn-ghost"
                    >
                      <ChatBubbleLeftIcon className="w-5 h-5" />
                      <span>{commentCount}</span>
                    </Link>
                    <div className="flex flex-row gap-2 items-center">
                      <HeartIcon className="w-5 h-5" />
                      <span>{likes}</span>
                    </div>
                  </div>
                }
                postActionBtn={<DeletePostBtn postId={_id} />}
                postActions={
                  <PostListDropdown
                    postId={_id}
                    status={status}
                  />
                }
              />
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default PostListDashboard