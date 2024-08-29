// src/app/(app)/dashboard/page.tsx

import { redirect } from "next/navigation"

import { auth } from "@/auth"
import BoardsPageDashboard from "@/components/pages/boards-page-dashboard"
import { getBoardsByUserId } from "@/server/get-boards-by-user-id"
import { Board } from "@/types/board"

export default async function BoardListPage() {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  const userId = session?.user?.id || ''
  const initialBoards: Board[] | null = await getBoardsByUserId(userId)
  
  return <BoardsPageDashboard initialBoards={initialBoards} />
}
