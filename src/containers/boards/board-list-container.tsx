'use client'

import { useFetchBoards } from '@/hooks';
import BoardItem from './board-item'
import { LoadingIndicator } from '@/components';

const BoardList = () => {
  const { 
    data: boards, 
    isLoading, 
    error 
  } = useFetchBoards()

  const boardCount = boards?.length || 0
  const boardText = boardCount === 1 ? 'Board' : 'Boards'

  if (isLoading) return <LoadingIndicator />
  if (error) return <div>An error occurred. Try again later.</div>

  return (
    <>
      <div className="flex flex-row gap-2 items-center mb-3">
        <span className="font-semibold">{boardCount} {boardText}</span>
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