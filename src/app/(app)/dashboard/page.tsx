import { redirect } from "next/navigation"

import { auth } from "@/auth"
import BoardListContainer from "@/containers/boards/board-list-container"
import NewBoardForm from "@/containers/forms/board"
import PageHeader from "@/containers/layout/page-header"
import ContentWrapper from '@/components/layout/content-wrapper'

export default async function BoardListPage() {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return (
    <ContentWrapper>
      <div className="bg-base-100 rounded-lg mb-2">
        <PageHeader>
          <div className="flex flex-row gap-3 items-center">
            <h1 className="font-bold text-xl">
              🗂️ Boards
            </h1>
          </div>
        </PageHeader>
      </div>
      <div className="bg-base-100 border rounded-lg p-2.5 md:p-6">
        <p className="text-lg">
          👉 Explore ideas on improving user experience and adding features 
          that truly matter to users and clients.
        </p>
        <div className="my-5">
          <div className="bg-base-100 border p-6 rounded-lg">
            <p className="mb-2">
              Suggestion: use the name of your <b>business</b>
            </p> 
            <NewBoardForm />
          </div>
        </div>
        <section>
          <BoardListContainer />
        </section>
      </div>
    </ContentWrapper>
  )
}
