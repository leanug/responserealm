import PageHeader from "@/containers/layout/page-header"
import CommentList from '@/containers/comments/comment-list'
import NewCommentForm from '@/containers/forms/comment'
import GoBackBtn from '@/components/ui/buttons/go-back'

import ContentWrapper from '@/components/layout/content-wrapper'
import PostItemContainer from '@/containers/posts/post-item-container'
import CommentListHeader from '@/containers/comments/comment-list-header'

const CommentsPage = () => {
  return (
    <ContentWrapper>
      <div className="bg-base-100 rounded-lg mb-2">
        <PageHeader>
          <div className="flex flex-row gap-3.5 items-center">
            <GoBackBtn />
            <CommentListHeader />
          </div>
        </PageHeader>
      </div>
      <div className="bg-base-100 rounded-lg border">
        <PostItemContainer />
        <div className="p-6">
          <NewCommentForm />
        </div>
        <div className="border-t p-2.5 md:p-6">
          <h2 className="font-semibold mb-4">Recent comments</h2>
          <CommentList />
        </div>
      </div>
    </ContentWrapper>
  )
}

export default CommentsPage