'use client'

import { TrashIcon } from '@heroicons/react/24/outline'

import { useBoardActions, useFetchBoard } from '@/hooks'
import { LoadingIndicator } from '@/components'

function DeleteBoardBtn() {
  const {handleDelete, isDeleting} = useBoardActions()

  const {
    data: board, 
  } = useFetchBoard()

  const handleShowConfirm = () => {
    if (window.confirm('Are you sure you want to delete this board?')) {
      handleDelete(board?._id || '')
    }
  }

  return (
    board &&
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