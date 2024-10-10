import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { useQueryClient } from 'react-query'

import { deleteBoard } from '@/server'
import { useNotificationStore } from '@/store/use-notification-store'

export const useBoardActions = () => {
  const [isDeleting, setIsDeleting] = useState(false)
  const { addNotification } = useNotificationStore()
  const router = useRouter()

  const {data: session} = useSession()
  const userId = session?.user?.id || ''

  const queryClient = useQueryClient()

  const handleDelete = async (boardId: string) => {
    if (!boardId) {
      addNotification(
        'Failed to delete board. Board ID is invalid.', 
        'error'
      )
      return false
    }

    setIsDeleting(true)
    const success = await deleteBoard(boardId)
    setIsDeleting(false)

    if (success) {
      addNotification('Board deleted successfully', 'success')
     
      queryClient.setQueryData(['boards', userId], (oldData: any) => {
        if (!oldData) return []
    
        // Assuming oldData is an array of boards
        return oldData.filter((board: { id: string }) => board.id !== boardId)
      })

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