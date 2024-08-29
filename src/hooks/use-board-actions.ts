import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { deleteBoardById } from '@/server/delete-board-by-id'
import { useBoardsStore } from '@/store/use-boards-store'
import { useNotificationStore } from '@/store/use-notification-store'

export const useBoardActions = () => {
  const [isDeleting, setIsDeleting] = useState(false)
  const { addNotification } = useNotificationStore()
  const { deleteBoard } = useBoardsStore()
  const router = useRouter()

  const handleDelete = async (boardId: string) => {
    if (!boardId) {
      addNotification(
        'Failed to delete board. Board ID is invalid.', 
        'error'
      )
      return false
    }

    setIsDeleting(true)
    const success = await deleteBoardById(boardId)
    setIsDeleting(false)

    if (success) {
      addNotification('Board deleted successfully', 'success')
      deleteBoard(boardId) // Delete board from store
      router.push('/dashboard')
      return true
    } else {
      addNotification('Failed to delete board', 'error')
      return false
    }
  }

  return {
    handleDelete,
    isDeleting
  }
}