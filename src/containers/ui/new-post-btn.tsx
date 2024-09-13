'use client'

import { PlusIcon } from '@heroicons/react/24/outline'

import { useModalStore } from '@/store'

function NewPostBtn() {
  const {setOpenModal} = useModalStore()

  const handleClick = () => {
    setOpenModal('post-modal')
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