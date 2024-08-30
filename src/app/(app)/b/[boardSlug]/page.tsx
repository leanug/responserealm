// src/app/(app)/b/[boardSlug]/page.tsx
import { auth } from "@/auth"

import PostList from "@/containers/posts/post-list"
import PageHeader from "@/containers/layout/page-header"
import PostHeader from "@/containers/layout/post-header"
import PostStatusFilter from "@/containers/ui/filters/post-status-filter"
import NewPostBtn from "@/containers/ui/new-post-btn"
import ContentWrapper from "@/components/layout/content-wrapper"
import { getBoardBySlug } from "@/server/get-board-by-slug"
import { getPostsByBoardId } from "@/server/get-posts-by-board-id"
import { getLikedPostsByUserId } from "@/server/get-liked-posts-by-user-id"
import { transformLikedPosts } from "@/utils/transform-liked-posts"

interface Params {
  boardSlug: string
}

export default async function Page({ params }: { params: Params }) {
  const { boardSlug } = params

  const session = await auth()
  const userId = session?.user?.id || ''

  const board = await getBoardBySlug(boardSlug)
  const posts = await getPostsByBoardId(board?._id || '')
  const fetchedLikedPosts = await getLikedPostsByUserId(userId || '')

  let indexLikedPosts = {}
  if (fetchedLikedPosts) {
    indexLikedPosts = transformLikedPosts(fetchedLikedPosts)
  }

  if (!board || !posts || !fetchedLikedPosts)
    return (
      <ContentWrapper>
        <p>
          An error occured while fetching post data. Please try again later.
        </p>
      </ContentWrapper>
    )

  return (
    <ContentWrapper>

      <PageHeader>
        <h1 className="text-xl font-semibold">{board?.name}</h1>
      </PageHeader>
      <div className="mx-auto mt-3">
        <div className="bg-base-100 rounded-lg border">
          <PostHeader >
            <PostStatusFilter />
            <NewPostBtn boardId={board._id} />
          </PostHeader>
          <PostList
            boardId={board._id}
            boardSlug={boardSlug}
            initPosts={posts}
            indexLikedPosts={indexLikedPosts}
          />
        </div>
      </div>
    </ContentWrapper>
  )
}
