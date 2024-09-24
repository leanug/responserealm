'use client'

import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"

type GoBackBtnProps = {
  defaultRoute?: string;
}


const GoBackBtn: React.FC<GoBackBtnProps> = ({defaultRoute = '/'}) => {
  const router = useRouter()

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back() // Go back if there's history
    } else {
      router.push(defaultRoute) // Redirect to default route as fallback
    }
  }

  return (
    <button
      className="btn"
      onClick={handleGoBack}
    >
      <ArrowUturnLeftIcon className="w-5 h-5" />
    </button>
  )
}

export default GoBackBtn