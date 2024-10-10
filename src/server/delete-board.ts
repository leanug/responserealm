import { ENV } from '@/utils/constants'

export async function deleteBoard(id: string): Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const endpoint = ENV.ENDPOINTS.BOARD.DELETE(id)
  const url = `${baseUrl}/${endpoint}`

  const response = await fetch(url, {
    method: 'DELETE',
  })

  if (!response.ok) {
    return false
  }

  return true
}
