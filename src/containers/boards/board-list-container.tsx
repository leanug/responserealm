'use client'

import { useFetchBoards } from '@/hooks';
import BoardList from './board-list'
import { LoadingIndicator } from '@/components';
import ErrorDisplay from '@/components/ui/error-display';
import BoardListHeader from './board-list-header';

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