// src/containers/posts/PostPageDashboard.tsx
'use client'

import { useParams } from 'next/navigation'

import PageHeader from '@/containers/layout/page-header'
import CommentList from '@/containers/comments/comment-list'
import GoBackBtn from '@/components/ui/buttons/go-back'
import PostHeader from '@/containers/posts/post-item/post-header'
import PostItem from '@/containers/posts/post-item'
import ContentWrapper from '@/components/layout/content-wrapper'
import { usePost } from '@/hooks/use-post'
import { LoadingIndicator } from '../ui/loading-indicator'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

const PostPageDashboard = () => {
  const params = useParams<{ boardSlug: string; postSlug: string }>()
  const {postSlug} = params
  
  // If there are no posts in store, fetch the post
  const {loading, post} = usePost(postSlug)
  
  return (
    <ContentWrapper>
      {
        loading ? (
          <LoadingIndicator />
        ) : !post ? (
          <div role="alert" className="alert rounded-lg">
            <InformationCircleIcon className="w-6 h-6 text-blue-300" />
            <span>Post not found.</span>
          </div>
        ) : (
          <>
            <div className="mb-2">
              <PageHeader>
                <div className="flex flex-row gap-3 items-center">
                  <GoBackBtn />
                  <h1 className="font-semibold text-xl">
                    💬 Comments
                  </h1>
                </div>
              </PageHeader>
            </div>
            <div className="bg-base-100 rounded-lg">
              <PostItem header={<PostHeader name={post.name} />} />
              <div className="p-6">
                <CommentList postId={post?._id || ''} />
              </div>
            </div>
          </>
        )
      }
    </ContentWrapper>
  )
}

export default PostPageDashboard
