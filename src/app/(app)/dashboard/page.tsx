// src/app/(app)/dashboard/page.tsx

import { redirect } from "next/navigation"

import { auth } from "@/auth"
import { getBoardsByUserId } from "@/server/get-boards-by-user-id"
import { Board } from "@/types/board"
import BoardsPageDashboard from "@/components/pages/boards-page-dashboard"

export default async function BoardListPage() {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  const userId = session?.user?.id || ''
  const initialBoards: Board[] | null = await getBoardsByUserId(userId)
  
  //return <BoardsPageDashboard initialBoards={initialBoards} />

  return (
    <div>
      <p>baseURL: {process.env.BASE_URL} </p>
      Initial boards: {initialBoards?.length}
    </div>
  )
}
