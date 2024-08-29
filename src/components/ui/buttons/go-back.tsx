'use client'

import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"

const GoBackBtn: React.FC = () => {
  const router = useRouter()

  return (
    <button
      className="btn"
      onClick={router.back}
    >
      <ArrowUturnLeftIcon className="w-5 h-5" />
    </button>
  )
}

export default GoBackBtn