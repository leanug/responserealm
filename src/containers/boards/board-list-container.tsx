'use client'

import { useFetchBoards } from '@/hooks';
import BoardItem from './board-item'
import { LoadingIndicator } from '@/components';
import ErrorDisplay from '@/components/ui/error-display';
import BoardListHeader from './board-list-header';

const BoardList = () => {
  const { 
    data: boards, 
    isLoading, 
    error 
  } = useFetchBoards()

  if (isLoading) return <LoadingIndicator />
  if (error) return <ErrorDisplay />

  return (
    <>
      <div className="flex flex-row gap-2 items-center mb-3">
        <BoardListHeader boardCount={boards?.length || 0} />
      </div>
      {
        boards &&
        <ul className="flex flex-wrap mx-auto gap-1.5 justify-center">
          {boards?.map((item: any) => {
            return (
              <li className="w-full" key={item._id}>
                <BoardItem 
                  name={item.name} 
                  slug={item.slug} 
                />
              </li>
            )
          })}
        </ul>
      }
    </>
  )
}

export default BoardList