'use client'

import { useBoardActions } from '@/hooks'
import { LoadingIndicator } from '@/components'
import { TrashIcon } from '@heroicons/react/24/outline'

function DeleteBoardBtn({boardId}: {boardId: string}) {
  const {handleDelete, isDeleting} = useBoardActions()

  const handleShowConfirm = () => {
    if (window.confirm('Are you sure you want to delete this board?')) {
      handleDelete(boardId || '')
    }
  }

  return (
    <div 
      className="tooltip tooltip-right" 
      data-tip="Delete board"
    >
      <button 
        onClick={handleShowConfirm} 
        disabled={isDeleting}
        className="btn btn-ghost btn-sm"
      >
        {
          isDeleting 
            ? <LoadingIndicator /> 
            : <TrashIcon className="w-5 h-5" 
          />
        }
      </button>
    </div>
  )
}

export default DeleteBoardBtn