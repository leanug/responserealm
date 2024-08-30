import { ENV } from '@/utils/constants'
import { Board } from '@/types/board'

/**
 * Fetches a board by its slug from the API.
 * 
 * @param slug - The slug of the board to fetch.
 * @returns The board data if successful, or an empty array if no data is found.
 */
export async function getBoardBySlug(slug: string): Promise<Board | null> {
  const url = `${ENV.BASE_URL}/${ENV.ENDPOINTS.BOARD.GET_BY_SLUG(slug)}`
  
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