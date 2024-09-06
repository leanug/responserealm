'use client'

import { PlusIcon } from "@heroicons/react/24/solid"

import { useModalStore } from "@/store"

const NewProjectBtn: React.FC = () => {
  const {setOpenModal} = useModalStore()

  return (
    <button
      className="btn btn-primary btn-lg btn-block"
      onClick={() => setOpenModal('project-modal')}
    >
      <PlusIcon className="w-5 h-5" />
      New project
    </button>
  )
}

export default NewProjectBtn