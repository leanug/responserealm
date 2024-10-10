'use client'

import { LoadingIndicator } from '@/components'
import { useFetchBoard } from '@/hooks'

function BoardName() {
  const {
    data: board, 
    isLoading, 
    error
  } = useFetchBoard()
  
  return (
    <>
      {isLoading && <LoadingIndicator />}
      {error && <h1 className="text-xl font-semibold">{'Board name'}</h1>}
      {board && <h1 className="text-xl font-semibold">{board.name}</h1>}
    </>
  )
}

export default BoardName