'use client'

import { useParams } from 'next/navigation'
import { useQuery } from 'react-query'

import { getBoardBySlug } from '@/server'
import { LoadingIndicator } from '@/components'

function BoardName() {
  const params = useParams<{ boardSlug: string }>()
  const {boardSlug} = params

  const {
    data: board, 
    isLoading, 
    error
  } = useQuery(
    ['board', boardSlug],
    () => getBoardBySlug(boardSlug)
  )

  return (
    <>
      {isLoading && <LoadingIndicator />}
      {error && <h1 className="text-xl font-semibold">{'Board name'}</h1>}
      {board && <h1 className="text-xl font-semibold">{board.name}</h1>}
    </>
  )
}

export default BoardName