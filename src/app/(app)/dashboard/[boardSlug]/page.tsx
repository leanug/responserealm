import { redirect } from "next/navigation"

import { getBoardBySlug } from "@/server/get-board-by-slug"
import { auth } from "@/auth"
import PostListDashboard from "@/containers/posts/post-list-dashboard"
import ContentWrapper from "@/components/layout/content-wrapper"
import PublicLink from "@/containers/dashboard/board/board-public-link"
import PageHeader from "@/containers/layout/page-header"
import DeleteBoardBtn from "@/containers/ui/delete-board-btn"
import GoBackBtn from "@/components/ui/buttons/go-back"

interface Params {
  boardSlug: string
}

async function FeedbackPage({params}: {params: Params}) {
  const {boardSlug} = params

  const session = await auth()

  if (!session) {
    redirect("/")
  }

  const board = await getBoardBySlug(boardSlug)
  
  return (
    <ContentWrapper>
      <div className="bg-base-100 rounded-lg mb-2">
        <PageHeader>
          <div className="flex flex-row gap-3 items-center">
            <GoBackBtn />
            <h1 className="font-bold text-xl">
              {board?.name || 'Board name'}
            </h1>
            <DeleteBoardBtn boardId={board?._id || ''} />
          </div>
        </PageHeader>
      </div>
      <div className="bg-base-100 rounded-lg">
        <div className="p-6 pt-3 border-b">
          <PublicLink slug={board?.slug || ''} />
        </div>
        <PostListDashboard 
          boardSlug={boardSlug || ''} 
          boardId={board?._id || ''} 
        />
      </div>
    </ContentWrapper>
  )
}

export default FeedbackPage