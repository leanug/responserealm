'use client'

import { useSession } from 'next-auth/react'
import { useQuery } from 'react-query';

import BoardItem from './board-item'
import { getBoardsByUserId } from '@/server'
import { LoadingIndicator } from '@/components';

const BoardList = () => {
  const {data: session} = useSession()

  const userId = session?.user?.id || ''

  // The query below will be updated with the response from the
  // successful mutation
  const { data: boards, isLoading, error } = useQuery(
    ['boards', userId], // The query key, including userId as a dependency
    () => getBoardsByUserId(userId) // The fetch function that takes userId as an argument
  )

  const boardCount = boards?.length || 0
  const boardText = boardCount === 1 ? 'Board' : 'Boards'

  if (isLoading) return <LoadingIndicator />
  if (!userId) return <div>User not found.</div>
  if (error) return <div>An error occurred. Try again later.</div>

  return (
    <>
      <div className="flex flex-row gap-2 items-center mb-3">
        <span className="font-semibold">{boardCount} {boardText}</span>
      </div>
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
    </>
  )
}

export default BoardList