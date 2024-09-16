'use client'

import { useParams } from 'next/navigation'

import PageHeader from "@/containers/layout/page-header";
import CommentList from '@/containers/comments/comment-list'
import NewCommentForm from '@/containers/forms/comment'
import GoBackBtn from '@/components/ui/buttons/go-back'
import PostHeader from '@/containers/posts/post-item/post-header'
import UserAvatar from '@/components/ui/avatar/user-avatar'
import PostActions from '@/containers/posts/post-item/post-actions'
import PostItem from '@/containers/posts/post-item'
import PostDescription from '@/containers/posts/post-item/post-description'
import ContentWrapper from '@/components/layout/content-wrapper';
import { usePost } from '@/hooks/use-post'
import { LoadingIndicator } from '@/components/ui/loading-indicator'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

const CommentsPage = () => {
  const params = useParams<{ boardSlug: string; postSlug: string }>()
  const {postSlug} = params

  // If there are no posts in store, fetch the post
  const {loading, post} = usePost(postSlug)
  
  if (loading) {
    return <div className="mx-auto w-full max-w-xl"><LoadingIndicator /></div>
  }

  if (!post) {
    return (
      <div className="mx-auto w-full max-w-xl">
        <div role="alert" className="alert rounded-lg">
          <InformationCircleIcon className="w-6 h-6 text-blue-300" />
          <span>Post not found.</span>
        </div>
      </div>
    )
  }

  return (
    <ContentWrapper>
      <div className="bg-base-100 rounded-lg mb-2">
        <PageHeader>
          <div className="flex flex-row gap-3.5 items-center">
            <GoBackBtn />
            <div className="breadcrumbs text-sm hidden md:block">
              <ul>
                <li>Posts</li>
                <li>{post?.name}</li>
              </ul>
            </div>
          </div>
        </PageHeader>
      </div>
      <div className="bg-base-100 rounded-lg border">
        <PostItem
          header={<PostHeader name={post?.name} />}
          description={<PostDescription description={post?.description} />}
          postData={
            <UserAvatar
              imageSrc={post?.user?.image as string}
              userName={post?.user?.name || "Anonymous"}
              createdAt={post?.createdAt}
            />
          }
          postActions={
            <PostActions
              likes={post?.likes}
              postId={post?._id}
            />
          }
        />
        <div className="p-6">
          <NewCommentForm postId={post?._id || ''} />
        </div>
        <div className="border-t p-2.5 md:p-6">
          <h2 className="font-semibold mb-4">Recent comments</h2>
          <CommentList postId={post?._id || ''} />
        </div>
      </div>
    </ContentWrapper>
  )
}

export default CommentsPage
