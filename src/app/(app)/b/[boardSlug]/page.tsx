import PostList from "@/containers/posts/post-list"
import PageHeader from "@/containers/layout/page-header"
import PostHeader from "@/containers/layout/post-header"
import PostStatusFilter from "@/containers/ui/filters/post-status-filter"
import NewPostBtn from "@/containers/ui/new-post-btn"
import ContentWrapper from "@/components/layout/content-wrapper"
import BoardName from "@/containers/boards/board-name"

export default async function Page() {
  return (
    <ContentWrapper>
        <PageHeader>
          <BoardName />
        </PageHeader>
        <div className="mx-auto mt-3">
          <div className="bg-base-100 rounded-lg border">
            <PostHeader >
              <PostStatusFilter />
              <NewPostBtn />
            </PostHeader>
            <PostList />
          </div>
        </div>
    </ContentWrapper>
  )
}
