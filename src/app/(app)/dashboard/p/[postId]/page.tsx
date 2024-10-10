import { redirect } from "next/navigation"

import ContentWrapper from '@/components/layout/content-wrapper'
import CommentList from "@/containers/comments/comment-list"
import PageHeader from '@/containers/layout/page-header'
import GoBackBtn from '@/components/ui/buttons/go-back'
import { auth } from "@/auth"

const Page = async () => {
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
            <h1 className="font-semibold text-xl">
              💬 Comments
            </h1>
          </div>
        </PageHeader>
      </div>
      <section className="bg-base-100 border rounded-lg p-2.5 md:p-6">
        <CommentList />
      </section>
    </ContentWrapper>
  )
}

export default Page
