import { ENV } from '@/utils/constants'

export async function deleteBoardById(id: string): Promise<boolean> {
  const url = `${process.env.BASE_URL}/${ENV.ENDPOINTS.BOARD.DELETE(id)}`

  const response = await fetch(url, {
    method: 'DELETE',
  })

  if (!response.ok) {
    return false
  }

  return true
}
