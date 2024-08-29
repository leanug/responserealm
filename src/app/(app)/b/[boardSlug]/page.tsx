// src/app/(app)/b/[boardSlug]/page.tsx

import { Suspense } from "react";

import PostList from "@/containers/posts/post-list";
import PageHeader from "@/containers/layout/page-header";
import PostHeader from "@/containers/layout/post-header";
import PostStatusFilter from "@/containers/ui/filters/post-status-filter";
import NewPostBtn from "@/containers/ui/new-post-btn";
import { getBoardBySlug } from "@/server/get-board-by-slug";
import ContentWrapper from "@/components/layout/content-wrapper";

interface Params {
  boardSlug: string
}

export default async function Page({ params }: { params: Params }) {
  const { boardSlug } = params
  const board = await getBoardBySlug(boardSlug)
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return (
    <ContentWrapper>
      <Suspense fallback={<p>Loading feed...</p>}>
      <PageHeader>
        <h1 className="text-xl font-semibold">{board?.name}</h1>
      </PageHeader>
      <div className="mx-auto mt-3">
        {!board ? (
          <p>Failed to load board. Please try again later.</p>
        ) : (
          <div className="bg-base-100 rounded-lg border">
            <PostHeader >
              <PostStatusFilter />
              <NewPostBtn boardId={board._id} />
            </PostHeader>
            <PostList
              boardId={board._id}
              boardSlug={boardSlug}
            />
          </div>
        )}
      </div>
      </Suspense>
    </ContentWrapper>
  )
}
