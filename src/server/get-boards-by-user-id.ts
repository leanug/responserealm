//utils/get-boards-by-user-id.ts

import { ENV } from "@/utils/constants"

import { Board } from "@/types/board"

export async function getBoardsByUserId(userId: string) {
  const url = `
    ${process.env.BASE_URL}/${ENV.ENDPOINTS.BOARD.GET_BY_USER_ID(userId)}
  `
  const response = await fetch(url, { cache: 'no-store' })
  
  if (!response.ok) {
    return null
  }

  const result = await response.json()

  if (result && result.data && result.data.boards) {
    const { boards }: { boards: Board[] | null } = result.data
    return boards
  }

  return null
}