'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import { 
  ChatBubbleLeftIcon, 
  HeartIcon 
} from '@heroicons/react/24/outline'

import { Post } from '@/types/post'
import { LoadingIndicator } from '@/components'
import { useFetchBoard, useFetchPosts } from '@/hooks'
import PostItem from '@/containers/posts/post-item'
import PostHeader from '@/containers/posts/post-item/post-header'
import DeletePostBtn from '@/containers/ui/delete-post-btn'
import PostListDropdown from '@/containers/ui/post-list-dropdown'

const PostListDashboard = () => {
  const {
    data: board,
  } = useFetchBoard()

  const boardSlug = board?.slug || ''

  const {
    data: posts, 
    isLoading, 
  } = useFetchPosts(board?._id || '')

  return (
    <>
      {
        isLoading 
          ? <div className="p-2.5 md:p-6"><LoadingIndicator /></div> 
          : null
      }
      <ul className="flex flex-col gap-1">
        {Array.isArray(posts) && posts?.map((item: Post) => {
          const {
            name, 
            status,
            slug,
            likes, 
            _id, 
            commentCount,
          } = item
          
          return (
            <li key={item._id} >
              <PostItem 
                header={<PostHeader name={name} />}
                postData={
                  <div className="flex flex-row gap-3 items-center">
                    <Link 
                      href={`/dashboard/p/${_id}`} 
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
                    boardSlug={boardSlug}
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