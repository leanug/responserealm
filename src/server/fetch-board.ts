import { ENV } from '@/utils/constants'
import { Board } from '@/types/board'

/**
 * Fetches a board by its id from the API.
 * 
 * @param slug - The slug of the board to fetch.
 * @returns The board data if successful, or an empty array if no data is found.
 */
export async function fetchBoard(slug: string): Promise<Board | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const endpoint = ENV.ENDPOINTS.BOARD.GET_BY_SLUG(slug)
  const url = `${baseUrl}/${endpoint}`
  
  const response = await fetch(url, {cache: 'no-store'})
  
  if (!response.ok) {
    return null
  }

  const result = await response.json()

  if (result && result.data && result.data.board) {
    const { board }: { board: Board } = result.data
    return board
  }
  
  return null
}