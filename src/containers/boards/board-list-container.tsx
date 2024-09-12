'use client'

import { LoadingIndicator } from '@/components'
import { useFetchBoards } from '@/hooks'
import ErrorDisplay from '@/components/ui/error-display'
import BoardListHeader from './board-list-header'
import BoardList from './board-list'

const BoardListContainer = () => {
  const { 
    data: boards, 
    isLoading, 
    error 
  } = useFetchBoards()

  if (isLoading) return <LoadingIndicator />
  if (error) return <ErrorDisplay />

  return (
    boards && (
      <>
        <BoardListHeader boardCount={boards?.length || 0} />
        <BoardList boards={boards} />
      </>
    )
  )
}

export default BoardListContainer