import { ENV } from '@/utils/constants'

export async function deleteCommentById(id: string): Promise<boolean> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${ENV.ENDPOINTS.COMMENT.DELETE(id)}`

  const response = await fetch(url, {
    method: 'DELETE',
  })

  if (!response.ok) {
    return false
  }

  return true
}
