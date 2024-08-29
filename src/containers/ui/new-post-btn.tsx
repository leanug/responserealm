'use client'

import { PlusIcon } from '@heroicons/react/24/outline'

import { useModalStore, useBoardStore } from '@/store'

function NewPostBtn({boardId}: {boardId: string}) {
  const {setOpenModal} = useModalStore()
  const {setCurrentBoardId} = useBoardStore()

  const handleClick = () => {
    setCurrentBoardId(boardId); // Set the current board ID
    setOpenModal('post-modal'); // Open the modal
  };

  return (
    <button 
      className="btn btn-primary"
      onClick={handleClick}
    >
      <PlusIcon className="w-5 h-5" />
    </button>
  )
}

export default NewPostBtn