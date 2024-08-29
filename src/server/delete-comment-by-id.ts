import { ENV } from '@/utils/constants'

export async function deleteCommentById(id: string): Promise<boolean> {
  const url = `${ENV.BASE_URL}/${ENV.ENDPOINTS.COMMENT.DELETE(id)}`

  const response = await fetch(url, {
    method: 'DELETE',
  })

  if (!response.ok) {
    return false
  }

  return true
}
