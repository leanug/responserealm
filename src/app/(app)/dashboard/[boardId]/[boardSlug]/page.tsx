import { redirect } from "next/navigation"

import PostListDashboard from "@/containers/posts/post-list-dashboard"
import ContentWrapper from "@/components/layout/content-wrapper"
import PublicLink from "@/containers/dashboard/board/board-public-link"
import PageHeader from "@/containers/layout/page-header"
import DeleteBoardBtn from "@/containers/ui/delete-board-btn"
import GoBackBtn from "@/components/ui/buttons/go-back"
import BoardName from "@/containers/boards/board-name"
import { auth } from "@/auth"

async function FeedbackPage() {
  const session = await auth()

  if (!session) {
    redirect("/")
  }
  
  return (
    <ContentWrapper>
      <div className="bg-base-100 rounded-lg mb-2">
        <PageHeader>
          <div className="flex flex-row gap-3 items-center">
            <GoBackBtn />
            <BoardName />
            <DeleteBoardBtn />
          </div>
        </PageHeader>
      </div>
      <div className="bg-base-100 rounded-lg">
        <div className="p-6 pt-3 border-b">
          <PublicLink />
        </div>
        <PostListDashboard />
      </div>
    </ContentWrapper>
  )
}

export default FeedbackPage